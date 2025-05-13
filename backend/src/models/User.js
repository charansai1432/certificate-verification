import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
//   role: { type: String, default: 'user' },
//   lastLogin: { type: Date }
});

export const User = mongoose.model('User', userSchema, 'users'); // 'users' is the collection name
