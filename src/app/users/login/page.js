'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export default function Login() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        // fill in code
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        // fill in code
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password })
            .then(response => {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.userData.exp);
                setAuthToken(response.data.token);
                let decoded = jwtDecode(response.data.token);
                setRedirect(true);
            })
            .catch(error => {
                if (error.response.data.message === 'Email already exists') {
                    console.log('===> Error in Signup', error.response.data.message);
                    setError(true);
                }
            });

    };

    if (redirect) {
        router.push('/');
    }
    if (error) {
        return (
            <div>

                <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                    <div className="card-body text-center">
                        <div>
                            <p>Email already exists</p>
                            <br />
                            <h2>Login</h2>
                            <p>Sign In to your account</p>
                            <a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
                            <span>  </span>
                            <a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-40 h-screen w-full">
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="container mx-auto">
                    <h1 className="text-3xl">Login</h1>
                    <p className="text-gray-700">Sign In to your account</p>
                    <div>
                        <input type="text" className="border border-gray-300 p-2 py-3 rounded-md w-full" placeholder="Email"
                            value={email}
                            onChange={handleEmail} required />
                    </div>
                    <div>
                        <input type="password" className="border border-gray-300 p-2 py-3 rounded-md w-full"
                            placeholder="Password" value={password}
                            onChange={handlePassword} required />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white rounded-md py-3 w-full">Login</button>
                </form>
            </div>
            <img src="/icon.svg" alt="..." width="600" />
        </div>
    );
}