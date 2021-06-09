import mongoose from "mongoose";
const { Schema, model } = mongoose;

//Use data
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
}
);
const Modelo = model("Note", NoteSchema);
export { Modelo };