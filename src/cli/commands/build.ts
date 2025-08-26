import { Command } from "commander";
import { loadConfig } from "../GlyphConfig";

export function runBuild(app: Command) {
	app.command("build")
		.description("Builds")
		.action(async () => {
			const config = await loadConfig();
			console.log("glyph build");
			console.log("emojisDir:", config.emojisDir);
			console.log("fileIndex:", config.fileIndex);
			console.log("botToken:", config.botToken ? "(loaded)" : "(missing)");
		});
}
