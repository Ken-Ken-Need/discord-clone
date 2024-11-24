import { Member } from '@/database/models';
import connectDB from '@/database/connectDB';
import { initialProfile } from '@/lib/initial-profile';
import React from 'react';
import { redirect } from 'next/navigation';
import { InitialModal } from '@/components/ui/modals/initialModal';


const setUpPage = async() => {
    try {
        await connectDB();
        const user = await initialProfile();   
        const member = await Member.findOne({user}).populate('server');
        if (!member) {
        } else {
            const server = member.server;
            return redirect(`/server/${server.id}`);
        }
        
        return (
            <InitialModal/>
        )
    } catch (e) {
        console.log(e);
    }
}

export default setUpPage;
