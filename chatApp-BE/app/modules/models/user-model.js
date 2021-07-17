import mongoose from 'mongoose';

const schema = mongoose.Schema;

// trim - removes the spaces before and after while saving into DB

var userSchema = new schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '../../../assets/images/profilePic.png' },
    // phone: { type: String },
    // gender: { type: String },
    // age: { type: Number },
    // lastActive: { type: Date },
    // created_at: { type: Date, default: Date.now },
    // isActive: { type: Boolean, default: 'false' },
    // role: { type: String },
    // member_in_groups: [{ type: String }]

}, {
    timestamps: true
})

var userSchema = mongoose.model('User', userSchema);

export default userSchema;