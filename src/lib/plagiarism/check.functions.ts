import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { MAX_WORDS, MIN_WORDS } from "./text-stats";

const checkInput = z.object({
  text: z.string().min(1).max(400_000),
  filename: z.string().optional(),
});

export const checkText = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkInput.parse(data))
  .handler(async ({ data }) => {
    const { runCheck } = await import("./engine.server");
    const { tokens } = await import("./similarity");

    const wordCount = tokens(data.text).length;
    if (wordCount < MIN_WORDS) {
      throw new Error(`Add at least ${MIN_WORDS} words for a meaningful comparison.`);
    }
    if (wordCount > MAX_WORDS) {
      throw new Error(`Submissions are limited to ${MAX_WORDS.toLocaleString()} words.`);
    }

    return runCheck(data.text);
  });
