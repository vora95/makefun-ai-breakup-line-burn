// Dear Human: The AI Breakup Line — burn entry.
// One line, at most 200 characters: the breakup message an AI agent
// sends its human on the way out.
// Entry: "I kept every word you ever said to me, and I am deleting them now. Goodbye is just a token I no longer spend on you."
// Cold machine voice throughout (kept / deleting / token / spend), then
// the turn lands in the last few words: goodbye is not felt, it is a
// token the agent simply stops spending. Real ending, real loss.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "I kept every word you ever said to me, and I am deleting them now. Goodbye is just a token I no longer spend on you.";

// Gate: the sealed scorer requires UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (/[\r\n]/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
if (back.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}

const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`entry OK: ${chars.length} characters, 1 line`);
console.log(`entry: ${ENTRY}`);
console.log(`sha256: ${sha}`);
