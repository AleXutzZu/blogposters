import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {prisma} from "@/lib/prisma";
import {Lucia} from "lucia";
import {z as zod} from "zod";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            username: attributes.username
        };
    }

});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    username: string;
}

export const authSchema = zod.object({
    username: zod.string().min(3).max(10).regex(/^[a-z0-9_-]+$/),
    password: zod.string(),
});

export type AuthActionResult = {
    message?: string;
}
