import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({});

mongoose.model("Session", sessionSchema);
