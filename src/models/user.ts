import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema({
	name: String,
	password: String,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10); // Adjust cost factor as needed
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

export const User = mongoose.model("User", userSchema);
