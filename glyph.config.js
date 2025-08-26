import dotenv from "dotenv";
dotenv.config();
const config = {
	emojisDir: "emojis",
	fileIndex: false,
	botToken: process.env.BOT_TOKEN,
};

export default config;
