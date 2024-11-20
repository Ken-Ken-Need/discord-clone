import { Server } from '@/database/models';
import { initialProfile } from '@/lib/initial-profile';
import React from 'react';


const setUpPage = async() => {
    const user = initialProfile();
    const server = Server.findOne;
    return (
        <div>Create a server</div>
    )
}

export default setUpPage;
