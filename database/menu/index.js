import mongoose from "mongoose";

const MenuSchema = new mongoose.SchemaTypes({
    menus: [{ //array of objects that's why in []
        name: { type: String, required: true },
        items: [{
            type: mongoose.Types.ObjectId,
            ref: "Foods"
        }]
    }],
    recommended: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods",
        unique: true
    }]
}, {
    timestamps: true
});

export const MenuModel = mongoose.model("Menu", MenuSchema);