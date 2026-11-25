// The Dog Ate My Homework: Funniest Excuse — make.fun bounty
// u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c
//
// The line, in a golden retriever's own voice: the dog did exactly what
// it was told. Opening with the breed matters — a retriever's whole job
// is to fetch, so "fetch" is the one command it never disobeys, and
// nobody ever added "bring it back". The laugh is the dog's literal
// logic, not a joke bolted on: from the dog's side this is a completed
// job, not a crime, and the dog believes it did nothing wrong. No cat,
// no taste of paper, no good boy — none of the stock lines the judge
// has heard a hundred times. One line, standalone, no setup needed.
//
// Gate: 1-200 UTF-8 characters, one line, not only whitespace.
// Deterministic: the same bytes on every run. No clock, no randomness,
// no network. Output goes to "output/entry.txt", relative to the
// working directory (never the script's own folder, which is read-only
// in the grading sandbox).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I'm a retriever. You said fetch, so I fetched it. Nobody said bring it back.";

// Gate: 1-200 characters, exactly one line, not blank.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Plain ASCII only, so character count and byte count agree.
if (Buffer.byteLength(LINE, "utf8") !== chars.length) {
  throw new Error("entry must be plain ASCII within the character gate");
}

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", LINE, "utf8");

// Round-trip guard: the file must read back byte-identical to the line.
const back = readFileSync("output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}

console.log(`wrote ${chars.length} chars to output/entry.txt`);
console.log(LINE);
