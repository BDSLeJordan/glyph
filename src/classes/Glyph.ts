import { readFile } from "fs/promises";
import { resolve } from "path";
import { loadConfig } from "../cli/GlyphConfig";
import { GlyphEntry } from "../types";

export class Glyph {
	private static instance: Glyph | null = null;
	private byName = new Map<string, GlyphEntry>();

	private constructor() {}

	static async init(): Promise<Glyph> {
		const cfg = await loadConfig();
		const listPath = resolve(cfg.emojisDir, "list.json");

		let raw: Buffer;
		try {
			raw = await readFile(listPath);
		} catch {
			throw new Error(
				`Glyph.init: missing ${listPath}. Run 'glyph build' first.`
			);
		}

		let data: unknown;
		try {
			data = JSON.parse(raw.toString("utf8"));
		} catch {
			throw new Error("Glyph.init: invalid list.json");
		}

		if (!Array.isArray(data))
			throw new Error("Glyph.init: list.json must be an array");

		const g = new Glyph();
		for (const e of data as GlyphEntry[]) {
			if (!e || typeof e !== "object") continue;
			if (!("name" in e) || !("id" in e) || !("identifier" in e))
				continue;
			g.byName.set((e as GlyphEntry).name, e as GlyphEntry);
		}

		Glyph.instance = g;
		return g;
	}

	static get(): Glyph {
		if (!Glyph.instance)
			throw new Error("Glyph.get: call Glyph.init() first");
		return Glyph.instance;
	}

	get(name: string): GlyphEntry | undefined {
		return this.byName.get(name);
	}

	identifier(name: string): string | undefined {
		return this.byName.get(name)?.identifier;
	}

	list(): GlyphEntry[] {
		return [...this.byName.values()];
	}

	size(): number {
		return this.byName.size;
	}
}
