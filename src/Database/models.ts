import { Schema, model, models } from 'mongoose';


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    userID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }],
});


const serverSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
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


const User = models.User || model('User', userSchema);
const Member = models.Member || model('Member', memberSchema);
const Channel = models.Channel || model('Channel', channelSchema);
const Server = models.Server || model('Server', serverSchema);
const Message = models.Message || model('Message', messageSchema);
export { User, Member, Server, Channel, Message };
