import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {prisma} from "@/lib/prisma";
import {Lucia} from "lucia";

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
