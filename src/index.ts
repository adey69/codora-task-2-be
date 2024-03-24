import express from "express";
import mongoose from "mongoose";
import { validateRegisterBody } from "./utils/validators";
import { User } from "./models/user";

const app = express();

app.use(express.json());

// Adding it here instead of .env because it's not an actual project
const MONGO_URL =
	"mongodb+srv://madnanpak69:3DS0gcx8f8uf44et@cluster0.d4zuvjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.listen(3000);

mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("open", () => {
	console.log("Connected to MongoDB!");
});

app.post("/signup", async (req: express.Request<IRegisterUserPayload>, res) => {
	if (req.body) {
		const error = validateRegisterBody(req.body);
		if (error) {
			console.log({ error });
			res.status(400).send(error);
		} else {
			const user = new User();
			user.name = req.body.name;
			user.password = req.body.password;
			await user.save();

			res.send("User Registered");
		}
	} else {
		res.status(400).send("Invalid request body");
	}
});
