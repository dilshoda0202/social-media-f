'use client'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Home() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('jwtToken')) {
                fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                    .then((res) => res.json())
                    .then((data) => {
                        let userData = jwtDecode(localStorage.getItem('jwtToken'));
                        if (userData.email === localStorage.getItem('email')) {
                            setData(data.user[0]);
                            setLoading(false);
                        } else {
                            router.push('/users/home');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        router.push('/users/home');
                    });
            } else {
                router.push('/users/home');
            }
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <div className="container" style={{ background: "linear-gradient(to bottom, gold, silver)", height: '100vh' }}>
            <div className="main-body">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
                        <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
                    </ol>
                </nav>
            </div>
            <div className='max-w-xl mx-auto border-l border-r min-h-screen'>
                <h1 className="text-lg font-bold p-4">Home</h1>
                <form className='mx-5'>
                    <div className='flex'>
                        <div className='rounded-full overflow-hidden w-12'>
                            {/* add user img */}
                        </div>
                        <div className='grow pl-4'>
                            <textarea className='w-full p-2' placeholder={"What's new?"}></textarea>
                        </div>
                    </div>
                </form>

            </div >
        </div >


    );
}
