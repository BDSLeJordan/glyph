import dotenv from "dotenv";
dotenv.config();
const config = {
	emojisDir: "emojis",
	fileIndex: true,
	botToken: process.env.BOT_TOKEN,
};

export default config;
