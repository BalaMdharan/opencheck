export type BlogSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  readingTime: string;
  intro: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-a-20-percent-similarity-score-tells-you",
    title: "What a 20% similarity score actually tells you",
    category: "Guides",
    summary:
      "A percentage is an average of very different things. Here is how to break a similarity score into quotations, references, common phrasing, and the parts that genuinely need work.",
    readingTime: "5 min read",
    intro:
      "A similarity score is a measure of how much of your text a tool was able to match against text it has seen elsewhere. That is all it is. It is not a probability that you cheated, and there is no threshold above which a document becomes dishonest. Two papers can both report 20% overlap while one is meticulously cited and the other has lifted a chapter wholesale.",
    sections: [
      {
        heading: "Read the matches, not the number",
        paragraphs: [
          "The only useful way to read a report is match by match. Open each highlighted passage next to the source it resembles and ask a single question: does the reader of my document already know this sentence came from somewhere else? If the answer is yes — because the passage is inside quotation marks with a citation, or is a paraphrase followed by an attribution — that match is not a problem, however much of the score it contributes.",
          "Scores rise for reasons that have nothing to do with misconduct. A long bibliography matches every other bibliography citing the same works. A methods section describing a standard assay uses the standard wording because deviating from it would be less clear. Legal and clinical writing repeats defined terms deliberately.",
        ],
      },
      {
        heading: "A practical way to break the score down",
        paragraphs: [
          "Sort your matches into four buckets before you change a single sentence. Most reports collapse to a handful of real issues once you do.",
        ],
        bullets: [
          "Quoted and cited: correctly attributed. Leave it alone, but check the quotation marks and page numbers are accurate.",
          "Reference list and boilerplate: titles, journal names, declarations, and institutional templates. Structural, not substantive.",
          "Common phrasing: three- to eight-word strings that any writer on the topic would produce. Rewriting these usually makes the prose worse.",
          "Uncredited substance: a passage carrying someone else's argument, data, or distinctive wording without attribution. This is the bucket to fix.",
        ],
      },
      {
        heading: "What to do with the fourth bucket",
        paragraphs: [
          "If a passage belongs to the fourth bucket, you have three honest options: quote it exactly and cite it, restate the idea in your own analysis and cite the source of the idea, or cut it because it was never load-bearing. Reaching for a rewriting tool to lower a number is not one of them — it removes the evidence of borrowing while leaving the borrowing in place.",
          "This is why OpenCheck reports overlap and refuses to render a verdict. The tool can tell you where two texts coincide. Whether that coincidence is scholarship, convention, or a missing citation is a judgement only a person holding both documents can make.",
        ],
      },
    ],
  },
  {
    slug: "citing-what-you-paraphrased",
    title: "Citing sources you paraphrased, not just the ones you quoted",
    category: "Guides",
    summary:
      "Rewording a passage does not remove the obligation to credit its author. How to attribute ideas as well as sentences, and why paraphrase is where most honest writers slip.",
    readingTime: "4 min read",
    intro:
      "Most students learn early that copied sentences need quotation marks. Far fewer are taught that a paraphrase needs a citation just as much. The obligation attaches to the idea, the structure of an argument, and the data — not only to the particular words used to express them.",
    sections: [
      {
        heading: "The rule in one sentence",
        paragraphs: [
          "If a reader could not have arrived at this claim from your own reasoning or your own evidence, name where it came from. That covers statistics, dates, definitions coined by a specific author, experimental results, and any interpretation you found rather than formed.",
          "It does not cover common knowledge, your own findings, or the general background of a field. When you are unsure whether something is common knowledge, cite it — an unnecessary citation costs a reader two seconds, and a missing one costs your credibility.",
        ],
      },
      {
        heading: "What a real paraphrase looks like",
        paragraphs: [
          "A genuine paraphrase changes the sentence structure, not just the adjectives. Read the source, close it, write what you understood from memory, then reopen it to check you have not distorted the claim. Swapping synonyms while keeping the original clause order produces what examiners call patchwriting: still recognisably the source's sentence, now with your fingerprints smeared over it.",
          "Keep the citation attached from the first draft. Paraphrases lose their attribution during editing more often than they were ever written without one — a paragraph gets moved, the sentence carrying the citation gets cut, and what remains looks like your own claim.",
        ],
      },
      {
        heading: "Why similarity tools under-report paraphrase",
        paragraphs: [
          "String-matching detection sees a heavy paraphrase as original because the surface words differ. This cuts both ways: a low score does not clear a document, and a high score does not condemn one. Treat a similarity report as a proofreading aid for attribution and nothing more.",
          "The practical habit that protects you is boring and effective: keep a running note of every source as you read, with page numbers, and write summaries in your own words at reading time rather than at writing time.",
        ],
      },
    ],
  },
  {
    slug: "why-opencheck-will-never-add-an-ai-detector",
    title: "Why OpenCheck will never add an AI detector",
    category: "Principles",
    summary:
      "AI-writing detectors make confident claims they cannot support, and the cost of their mistakes lands on students. Our reasoning for staying out of that market entirely.",
    readingTime: "4 min read",
    intro:
      "We are asked regularly to add an \"AI content\" score alongside similarity. We will not. It is not a roadmap-ordering decision — it is a decision about what kind of claim a tool is entitled to make.",
    sections: [
      {
        heading: "The claim is unfalsifiable in practice",
        paragraphs: [
          "A similarity match is checkable. The tool shows you two passages and you can read both and judge for yourself. An AI-detection score offers nothing comparable: it outputs a number about the origin of a text, with no source document to inspect and no way for the accused writer to demonstrate the negative.",
          "That asymmetry is what makes these scores dangerous in an institutional setting. A person facing one cannot examine the evidence, because there is no evidence — only a model's opinion about sentence-level predictability.",
        ],
      },
      {
        heading: "The errors are not evenly distributed",
        paragraphs: [
          "Detectors flag plain, structurally regular prose. That description fits writers working in a second language, writers taught to a rigid template, and writers in technical fields where sentences are supposed to be predictable. The people most likely to be wrongly flagged are the people least able to absorb the consequences.",
          "Shipping such a feature while adding a disclaimer does not fix this. Institutions act on numbers, and a caveat in the footer does not travel with a screenshot into a misconduct hearing.",
        ],
      },
      {
        heading: "What we do instead",
        paragraphs: [
          "OpenCheck does one thing: it finds textual overlap between your writing and existing sources, and shows you the pairs so you can fix your citations before submission. We do not sell paraphrasing, rewriting, humanizing, or AI detection, and we do not intend to.",
          "Keeping the scope narrow also keeps the product honest. Every feature we add has to survive the same test: can the user check the result themselves?",
        ],
      },
    ],
  },
  {
    slug: "designing-a-privacy-respecting-detection-pipeline",
    title: "Designing a privacy-respecting detection pipeline",
    category: "Engineering",
    summary:
      "Development notes on the Python service behind OpenCheck: fingerprinting, candidate retrieval, alignment, and keeping submissions out of any permanent store.",
    readingTime: "6 min read",
    intro:
      "The OpenCheck frontend deliberately contains no detection logic. Comparison happens in a separate Python service so the two can be reasoned about, tested, and audited independently. These are the design constraints we are building against.",
    sections: [
      {
        heading: "Submissions are not a corpus",
        paragraphs: [
          "The default business model of this category is to keep every document a user submits and match future submissions against it. We are not doing that. A submitted document is held in memory for the duration of the comparison and discarded afterwards; uploaded files are parsed for their text and the file itself is dropped.",
          "The consequence we accept is that OpenCheck cannot detect one student copying another's unpublished paper. That capability only exists because a vendor retained work its authors never agreed to hand over, and we would rather be worse at detection than build that archive.",
        ],
      },
      {
        heading: "How comparison works",
        paragraphs: [
          "The pipeline has four stages, each independently testable.",
        ],
        bullets: [
          "Normalise: strip formatting, unify whitespace and quotation characters, and segment the document into sentences.",
          "Fingerprint: hash overlapping word n-grams and select a stable subset (winnowing) so a document is represented by a compact set of fingerprints rather than its full text.",
          "Retrieve: use those fingerprints to pull a small candidate set of possible sources from the index and public search, sending only short fragments — never the whole document.",
          "Align: compare the document against each candidate at sentence level and return matched spans with their offsets, so the frontend can highlight exactly what overlapped and against what.",
        ],
      },
      {
        heading: "The contract with the frontend",
        paragraphs: [
          "The service returns spans and sources, not a verdict. It reports an overall overlap ratio because users expect one, but the payload is designed so the interface can lead with the matched sentences and treat the percentage as secondary. No field in the response says \"plagiarised\".",
          "On the client side, everything talks to a single typed module under src/lib/plagiarism, pointed at the service by an environment variable. Swapping the engine, or running it locally, changes one URL and no components.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
