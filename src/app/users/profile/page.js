'use client'

import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
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
        <div className="flex items-stretch justify-center gap-40 h-screen w-full">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="container mx-auto">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>{data.firstName} {data.lastName}</h4>
                                        <p className="text-secondary mb-1">{data.jobTitle}</p>
                                        {/* <p className="text-muted font-size-sm">{data.address.city}, {data.address.state}</p> */}
                                        <button type="submit" className="bg-blue-600 text-white rounded-md py-3 w-full">Follow</button>
                                        <button type="submit" className="bg-blue-600 text-white rounded-md py-3 w-full">Message</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto">
                        <div className="container mx-auto">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Name: </h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.firstName} {data.lastName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email: </h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button type="submit" className="bg-blue-600 text-white rounded-md py-3 w-full">Edit</button>
                                        {/* <a className="btn btn-info " target="__blank" href="/users/edit">Edit</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
