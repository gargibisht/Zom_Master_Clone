import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ detail: { type: String }, for: { type: String } }],
        phoneNumber: [{ type: Number }]
    },

    {
        timestamps: true
    });


UserSchema.statics.findEmailAndPhone = async(email, phoneNumber) => {
    //check whether the email exists
    const checkUserByEmail = await UserModel.findOne({ email });

    //check whether the phoneNumber exists
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User Already exists");
    }
    return false;
};


export const UserModel = mongoose.model("Users", UserSchema);