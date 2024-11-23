import { Member } from '@/database/models';
import connectDB from '@/database/connectDB';
import { initialProfile } from '@/lib/initial-profile';
import React from 'react';
import { redirect } from 'next/navigation';


const setUpPage = async() => {
    try {
        await connectDB();
        const user = await initialProfile();   
        console.log(user);
        const member = await Member.findOne({user}).populate('server');
        if (!member) {
        } else {
            const server = member.server;
            return redirect(`/server/${server.id}`);
        }
        
        return (
            <div>Create a server</div>
        )
    } catch (e) {
        console.log(e);
    }
}

export default setUpPage;
