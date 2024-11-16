import { User } from "../database/models"
import connectDB from "@/database/connectDB";
import { NextApiRequest, NextApiResponse } from "next";


export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } res.status(200).json(user);
        } catch (error) { res.status(500).json({ message: error }); }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 