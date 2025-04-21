import mongoose from 'mongoose';

const changeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  updatedFields: mongoose.Schema.Types.Mixed,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a username"],
    unique: [true, "User already exists"]
  },
  email: {
    type: String,
    required: [true, "Please Provide an email"],
    unique: [true, "User already exists"]
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
  verifyToken: String,
  verifyExpires: Date,
  changeHistory: [changeSchema],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
