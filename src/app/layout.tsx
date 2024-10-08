import type {Metadata} from "next";
import "./globals.css";
import NavMenu from "@/app/NavMenu";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="bg-gray-300 p-2 flex flex-col min-h-screen">
        <NavMenu/>
        {children}
        </body>
        </html>
    );
}
