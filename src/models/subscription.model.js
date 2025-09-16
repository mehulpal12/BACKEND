import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber:{
        type:Schema.Types.ObjectId, // one who is subsribing
        ref:"User",
    },
    channel:{
        type:Schema.Types.ObjectId, // one to whom is subsribing
        ref:"User",
    }
  },
  { timestamps: true }
);


const subscription = mongoose.model("subscription", subscriptionSchema);

export { subscription };