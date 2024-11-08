import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
});


const serverSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});


const channelSchema = new Schema({
    name: { type: String, required: true },
    server: { type: Schema.Types.ObjectId, ref: 'Server', required: true },
    createdAt: { type: Date, default: Date.now }
});

const messageSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    createdAt: { type: Date, default: Date.now }
});


export const User = model('User', userSchema);
export const Channel = model('Channel', channelSchema);
export const Server = model('Server', serverSchema);
export const Message = model('Message', messageSchema);
