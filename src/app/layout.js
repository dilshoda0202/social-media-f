'use client';
import './globals.css';
import {Inter} from 'next/font/google'
import Link from "next/link";
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ['latin']});

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
                <div className="border border-gray-300 rounded-md w-1/3 p-3">
                    <div>
                        <Link href="/users/profile/">Feed</Link>
                    </div>
                    <div>
                        <Link href="/users/profile/">Profile</Link>
                    </div>
                    <div>
                        <Link href="/users/profile/">Posts</Link>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function RootLayout({children}) {
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
