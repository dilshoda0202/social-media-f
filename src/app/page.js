'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import handleLogout from '@/app/utils/handleLogout';
import { useRouter } from 'next/navigation';

import { UserCircle } from "@phosphor-icons/react";

const NewPost = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [content, setContent] = useState('');
    const [newPost, setNewPost] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.posts)
                setNewPost(false)
            })
    }, [currentUser, newPost])
    console.log(posts)

    useEffect(() => {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        const currentTime = Date.now();
        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
        if (localStorage.getItem('jwtToken')) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((res) => res.json())
                .then((data) => {
                    const userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setCurrentUser(data.user[0]);

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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            content
        };
        axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/new`, newPost)
            .then((response) => {
                setNewPost(true)
            })
            .catch((error) => console.log('===> Error in Post', error));
    };

    return (
        <div className="border border-gray-300 rounded-md w-full px-8 pt-8 pb-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-3 text-xl items-center">
                    <label htmlFor="email">Content</label>
                    <input autoFocus type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-md text-white py-2 px-4">Post</button>
                </div>
            </form>

            {posts.length > 0 && posts.map(post => (
                <div key={post._id} className="flex flex-col gap-5 mt-10" >
                    <p>
                        {post.content}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default NewPost;


// function post(data) {
//     return (
//         <div className="border border-gray-300 rounded-md p-5">
//             <div className="flex gap-3 text-xl items-center">
//                 <UserCircle size={45}></UserCircle>
//                 {data.user}
//             </div>
//             <div className="text-gray-700 text-sm mt-4">
//                 {data.content}
//             </div>
//         </div>
//     )
// }

// export default function Home() {
//     const posts = [
//         {
//             user: 'Dee',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
//         },
//         {
//             user: 'Dee',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
//         },
//         {
//             user: 'Dee',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
//         },
//         {
//             user: 'Dee',
//             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
//         },
//     ];

//     const postRows = posts.map(post);

//     return (
//         <div className="w-full">
//             <div className="border border-gray-300 rounded-md w-full px-8 pt-8 pb-4">
//                 <textarea className="w-full focus:outline-none" placeholder="What is on your mind?" rows="5"
//                     style={{ resize: "none" }}>
//                 </textarea>
//                 <div className="flex justify-end">
//                     <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-md text-white py-2 px-4">Post</button>
//                 </div>
//             </div>
//             <div className="flex flex-col gap-5 mt-10">
//                 {postRows}
//             </div>
//         </div>
//     )
// }
