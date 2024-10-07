import React from "react";
import ProtectRouteWrapper from "@/components/ProtectRouteWrapper";

export default function LoginLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectRouteWrapper redirectTo={"/login"}>
            {children}
        </ProtectRouteWrapper>
    );
}