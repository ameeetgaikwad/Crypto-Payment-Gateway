import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://ameeetgaikwad:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@cryptopayindia.wsredxt.mongodb.net/PurchasedCourse`
);

const UserSchema = new mongoose.Schema({
  email: String,
});

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
