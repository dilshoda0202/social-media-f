'use client';
import './globals.css';
import Link from "next/link";
import { Inter } from 'next/font/google'
import { House, User, NoteBlank, SignOut } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

function defaultLayout(children) {
    return (
        <div>
            {children}
        </div>
    )
}

function authenticatedLayout(children) {
    return (
        <div className="container mx-auto mt-10">
            <div className="flex gap-10">
                <div className="flex flex-col gap-8 border border-gray-300 rounded-md w-1/3 p-6">
                    <div className="flex gap-2 hover:bg-gray-100 rounded-md p-2.5">
                        <House size={24}></House>
                        <a href="/">Home</a>
                    </div>
                    <div className="flex gap-2 hover:bg-gray-100 rounded-md p-2.5">
                        <User size={24}></User>
                        <Link href="/users/profile/">Profile</Link>
                    </div>
                    <div className="flex gap-2 hover:bg-gray-100 rounded-md p-2.5">
                        <NoteBlank size={24}></NoteBlank>
                        <Link href="/">Posts</Link>
                    </div>
                    <div className="flex gap-2 hover:bg-gray-100 rounded-md p-2.5">
                        <SignOut size={24}></SignOut>
                        <Link href="/users/logout/">Logout</Link>
                    </div>

                </div>
                <div className="w-2/3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const isDefaultLayout = pathname === '/users/login' || pathname === '/users/signup';
    return (
        <html lang="en">
            <body className={inter.className}>
                {isDefaultLayout ? defaultLayout(children) : authenticatedLayout(children)}
            </body>
        </html>
    )
}
