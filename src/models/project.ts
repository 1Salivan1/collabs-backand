import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Project", projectSchema);
