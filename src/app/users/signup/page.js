'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();

    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [firstName, setfirstName] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlefirstName = (e) => {
        setfirstName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            firstName,
            email,
            password,
        };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
            .then(response => {
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
        router.push('/users/login');
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
            <div className="min-w-[400px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-3xl">Welcome to the Mom Network!</h1>
                    <p className="text-gray-700">Create an account below to get started</p>
                    <div>
                        <input type="text" className="border border-gray-300 p-2 py-3 rounded-md w-full" placeholder="First Name"
                            value={firstName} onChange={handlefirstName} required />
                    </div>
                    <div>
                        <input type="email" className="border border-gray-300 p-2 py-3 rounded-md w-full" placeholder="Email" value={email}
                            onChange={handleEmail} required />
                    </div>
                    <div>
                        <input type="password" className="border border-gray-300 p-2 py-3 rounded-md w-full" placeholder="Password"
                            value={password} onChange={handlePassword} required />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 w-full">Sign Up</button>
                </form>
                <br></br>
                <p>Sign In to your account:</p>
                <br></br>
                <a href="/users/login" type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 w-full">Login</a>

            </div>
            <img src="/icon.svg" alt="..." width="600" />
        </div>
    );
};

export default Signup;
