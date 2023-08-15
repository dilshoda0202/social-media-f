'use client';


import {UserCircle} from "@phosphor-icons/react";

function post(data) {
    return (
        <div className="border border-gray-300 rounded-md p-5">
            <div className="flex gap-3 text-xl items-center">
                <UserCircle size={45}></UserCircle>
                {data.user}
            </div>
            <div className="text-gray-700 text-sm mt-4">
                {data.content}
            </div>
        </div>
    )
}

export default function Home() {
    const posts = [
        {
            user: 'Dilshoda Abdualimova',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
        },
        {
            user: 'Dilshoda Abdualimova',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
        },
        {
            user: 'Dilshoda Abdualimova',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
        },
        {
            user: 'Dilshoda Abdualimova',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut diam dui, posuere nec nisi sed, mollis pretium ante. Donec tempor arcu ex, ac ullamcorper sapien blandit eget. Sed vulputate dui augue, ac pulvinar risus convallis sed. Ut ac nulla purus. Phasellus tortor sem, vestibulum non ultricies id, scelerisque a metus. Etiam porttitor volutpat dolor, nec viverra diam euismod eget. Sed vehicula laoreet elit, nec porta leo consectetur nec. Nulla porta ipsum id nibh congue tincidunt. Phasellus sed magna tincidunt, imperdiet enim quis, eleifend dolor. Aenean mauris risus, hendrerit quis sapien sed, interdum aliquam felis. Duis pulvinar imperdiet tincidunt. Ut a leo id dui auctor placerat sit amet et mauris. Nulla non aliquet mauris, at volutpat velit.',
        },
    ];

    const postRows = posts.map(post);

    return (
        <div className="w-full">
            <div className="border border-gray-300 rounded-md w-full px-8 pt-8 pb-4">
            <textarea className="w-full focus:outline-none" placeholder="What is on your mind?" rows="5"
                      style={{resize: "none"}}>
            </textarea>
                <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-md text-white py-2 px-4">Post</button>
                </div>
            </div>
            <div className="flex flex-col gap-5 mt-10">
                {postRows}
            </div>
        </div>
    )
}
