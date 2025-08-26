import { existsSync } from "fs";
import { resolve } from "path";

export interface GlyphConfig {
	emojisDir: string;
	fileIndex: boolean;
	botToken?: string;
}

export const DEFAULT_CONFIG: GlyphConfig = {
	emojisDir: "./emojis",
	fileIndex: true,
	botToken: undefined,
};

export async function loadConfig(): Promise<GlyphConfig> {
	const configPath = resolve("glyph.config.js");
	try {
		if (existsSync(configPath)) {
			const config = (await import(configPath))
				.default as Partial<GlyphConfig>;
			return {
				emojisDir:
					typeof config.emojisDir === "string" &&
					config.emojisDir.trim()
						? config.emojisDir
						: DEFAULT_CONFIG.emojisDir,
				fileIndex:
					typeof config.fileIndex === "boolean"
						? config.fileIndex
						: DEFAULT_CONFIG.fileIndex,
				botToken:
					typeof config.botToken === "string"
						? config.botToken
						: DEFAULT_CONFIG.botToken,
			};
		}
	} catch (error) {
		console.log(error);
	}
	return DEFAULT_CONFIG;
}
