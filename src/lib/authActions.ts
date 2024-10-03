"use server";

import {hash, verify} from "@node-rs/argon2";
import {generateIdFromEntropySize} from "lucia";
import {prisma} from "@/lib/prisma";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {AuthActionResult, authSchema, lucia, validateRequest} from "@/lib/auth";

export async function signUpAction(_prevState: AuthActionResult, formData: FormData): Promise<AuthActionResult> {
    const validatedFields = authSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) return {message: "Invalid inputs"};

    const passwordHash = await hash(validatedFields.data.password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long

    const user = await prisma.user.findFirst({where: {username: validatedFields.data.username}});
    if (user) return {message: "Invalid inputs"};

    await prisma.user.create({
        data: {
            id: userId,
            password_hash: passwordHash,
            username: validatedFields.data.username,
        }
    })

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function loginAction(_prevState: AuthActionResult, formData: FormData): Promise<AuthActionResult> {
    const validatedFields = authSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) return {message: "Invalid inputs"};

    const user = await prisma.user.findUnique({
        where: {
            username: validatedFields.data.username,
        }
    });

    if (!user) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid usernames from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid usernames.
        // However, valid usernames can be already be revealed with the signup page among other methods.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If usernames are public, you may outright tell the user that the username is invalid.
        return {message: "Invalid inputs"};
    }

    const validPassword = await verify(user.password_hash, validatedFields.data.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    if (!validPassword) return {message: "Invalid inputs"};

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function logoutAction(): Promise<AuthActionResult> {
    const {session} = await validateRequest();
    if (!session) {
        return {
            message: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}
