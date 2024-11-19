import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }],
});


const serverSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    createdAt: { type: Date, default: Date.now },
    inviteCode: { type: String, required: true }
});

const memberSchema = new Schema({
    role: { type: String, enum: ['USER', 'MOD'], default: 'USER' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    server: { type: Schema.Types.ObjectId, ref: 'Server', required: true },

})

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
export const Member = model('Member', memberSchema);
export const Channel = model('Channel', channelSchema);
export const Server = model('Server', serverSchema);
export const Message = model('Message', messageSchema);
