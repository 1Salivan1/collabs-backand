import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  needs: {
    type: Array,
    required: true,
  },
  socials: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
