import { Member } from '@/database/models';
import connectDB from '@/database/connectDB';
import { initialProfile } from '@/lib/initial-profile';
import React from 'react';
import { redirect } from 'next/navigation';
import { InitialModal } from '@/components/ui/modals/initialModal';


const setUpPage = async () => {
    let user;
    let member;
    try {
        await connectDB();
        user = await initialProfile();
        member = await Member.findOne({ user }).populate('server');
    } catch (e) {
        console.log(e);
    }

    if (!member) {
        console.log("member doesn't exist");
        return (
            <InitialModal />
        )
    } else {
        const server = member.server;
        return redirect(`/server/${server.id}`);
    }
}

export default setUpPage;
