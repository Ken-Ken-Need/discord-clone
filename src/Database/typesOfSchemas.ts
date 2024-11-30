import { Schema } from "mongoose";
export interface ServerType {
    name: string,
    members: [Schema.Types.ObjectId],
    channels: [Schema.Types.ObjectId],
    owner: Schema.Types.ObjectId,
    createdAt: Date,
    inviteCode: string
}