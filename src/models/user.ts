import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  git: {
    type: String,
  },
  tags: {
    type: Array,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  socials: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
