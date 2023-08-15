'use client'

import {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import {useRouter} from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';

export default function Profile() {
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
                            router.push('/users/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        router.push('/users/login');
                    });
            } else {
                router.push('/users/login');
            }
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;

    return (
        <div className="flex justify-between">
            <div className="1/3">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle"
                     width="150"/>
                <h4 className="text-3xl mt-4">{data.firstName} {data.lastName}</h4>
            </div>
            <div className="flex flex-col gap-5 w-2/3">
                <div className="flex gap-4">
                    <h6 className="text-gray-700">Name:</h6>
                    <div>
                        {data.firstName} {data.lastName}
                    </div>
                </div>
                <hr/>
                <div className="flex gap-4">
                    <h6 className="text-gray-700">Email:</h6>
                    <div>
                        {data.email}
                    </div>
                </div>
                <hr/>
                <button type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 w-full">
                    Edit
                </button>
            </div>
        </div>
    );
}
