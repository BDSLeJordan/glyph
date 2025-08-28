import { readFileSync } from "fs";
import { resolve } from "path";
import { GlyphEntry } from "../types";
import type { Emojis, EmojisRecord } from "../../emojis/emojis";

export type GlyphInitOptions = Partial<{ emojisDir: string }>;
export class Glyph {
	private static instance: Glyph;
	private byName = new Map<string, GlyphEntry>();
	private record: EmojisRecord | null = null;

	static async init(options: GlyphInitOptions = { emojisDir: "./emojis" }) {
		if (Glyph.instance) throw new Error("Glyph already Initialized");

		if (!options.emojisDir) options.emojisDir = "./emojis";

		const dir = options?.emojisDir;
		const list = JSON.parse(
			readFileSync(resolve(dir, "list.json"), "utf-8")
		) as GlyphEntry[];

		const g = new Glyph();
		for (const e of list) g.byName.set(e.name, e);
		g.record = Object.fromEntries(g.byName) as EmojisRecord;

		Glyph.instance = g;
	}

	public static get(name: Emojis): EmojisRecord[Emojis];
	public static get(): Glyph;
	public static get(name?: Emojis): any {
		if (!Glyph.instance) throw new Error("Glyph not initialized");
		if (typeof name === "string") {
			return Glyph.instance.record?.[name];
		}
		return Glyph.instance;
	}

	public identifier(name: Emojis): string | undefined {
		return this.byName.get(name)?.identifier;
	}

	public size(): number {
		return this.byName.size;
	}
}