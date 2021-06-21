import { Schema, model } from "mongoose";

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

export default model("Note", NoteSchema);
