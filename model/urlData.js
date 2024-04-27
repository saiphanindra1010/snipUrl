import mongoose from "mongoose";

const urlData = new mongoose.Schema(
  {
    shortData: { type: String, require: true, unique: true },
    redirecUrl: { type: String, require: true },
    TotalClicks: [{ timeStamp: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("url", urlData);

export default URL;
