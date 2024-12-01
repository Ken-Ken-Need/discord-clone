import { Schema } from "mongoose";
export interface ServerType {
    _id: string,
    name: string,
    members: [Schema.Types.ObjectId],
    channels: [Schema.Types.ObjectId],
    owner: Schema.Types.ObjectId,
    createdAt: Date,
    inviteCode: string
}