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
  {
    slug: "is-a-15-percent-plagiarism-score-bad",
    title: "Is a 15% plagiarism score bad?",
    category: "Questions",
    summary:
      "There is no universal pass mark for a similarity score. What matters is which sentences make up the percentage and whether each one is attributed.",
    readingTime: "5 min read",
    intro:
      "Students ask this more than any other question, usually the night before a deadline. The honest answer is that 15% tells you almost nothing on its own: it can describe a well-cited literature review or a paragraph copied from a website. The number is a starting point for reading, not a grade.",
    sections: [
      {
        heading: "Why there is no safe threshold",
        paragraphs: [
          "Institutions sometimes circulate rules of thumb — under 10% is fine, over 25% needs review — but no similarity tool produces a score that means the same thing across two documents. The percentage depends on the length of your text, whether the reference list is included in the calculation, how many standard phrases your field uses, and how large the comparison corpus is.",
          "A five-page essay with two long quoted passages can score higher than a dissertation containing an uncited paraphrase, because the quoted text is a larger share of a short document. Ranking documents by percentage would put the honest one at greater risk.",
        ],
      },
      {
        heading: "What to check when you see 15%",
        paragraphs: [
          "Open the report and work through the matches individually. In most 15% reports, the majority of the score disappears into categories that were never a problem.",
        ],
        bullets: [
          "Is the match a quotation you marked and cited? Confirm the quotation marks and page number, then move on.",
          "Is it part of your reference list? Bibliographies match other bibliographies by design.",
          "Is it a common phrase of four to eight words that any writer in your field would produce? Rewriting it usually makes the sentence worse.",
          "Is it a passage carrying someone else's argument or data with no attribution? That is the only category that needs work.",
        ],
      },
      {
        heading: "If your institution has a stated limit",
        paragraphs: [
          "Some departments do publish a threshold. Treat it as an administrative trigger for a human to look at the report, not as a definition of misconduct. If your score sits above the limit because of correctly quoted material, keep the citations and say so in your submission note — reducing the score by removing quotation marks would be the actual offence.",
          "Run your check early enough to fix attribution rather than to game a figure. A report read a week before submission is a proofreading tool; the same report read an hour before is only a source of panic.",
        ],
      },
    ],
  },
  {
    slug: "check-plagiarism-free-without-uploading-your-document",
    title: "How to check plagiarism for free without handing over your document",
    category: "Questions",
    summary:
      "Most free checkers pay for themselves by keeping your submission. Here is how to tell which ones retain your text and how to check a draft without adding it to someone's database.",
    readingTime: "5 min read",
    intro:
      "Free similarity checking is genuinely possible, but the word free hides several different business models. Some tools are free because they are limited; others are free because your unpublished writing is the product. Knowing which one you are using matters more than the score you get back.",
    sections: [
      {
        heading: "Read the retention clause, not the marketing",
        paragraphs: [
          "Open the privacy policy and search for the words retain, store, database, and improve our services. A tool that adds submissions to its comparison corpus will say so, usually in a sentence explaining that this improves detection for everyone. The practical effect is that your draft becomes a source future documents are matched against — including, sometimes, your own resubmission of the same paper.",
          "Also look for how long files are kept, whether deletion is available on request, and whether text is used to train models. A checker that cannot answer these questions in plain language has answered them.",
        ],
      },
      {
        heading: "Practical ways to reduce exposure",
        paragraphs: [
          "You do not have to choose between checking your work and keeping it private.",
        ],
        bullets: [
          "Prefer tools that process text in memory and discard it after the comparison, and that say so explicitly.",
          "Paste text rather than uploading a file when you can — documents carry author names, revision history, and comments in their metadata.",
          "Check sections rather than the whole manuscript if you are working on unpublished research.",
          "Avoid checkers bundled with paraphrasing or humanizing tools; the incentive there is to sell you a rewrite, not to help you cite.",
        ],
      },
      {
        heading: "How OpenCheck handles this",
        paragraphs: [
          "OpenCheck compares your text against public sources and then discards it. Submissions are not added to a corpus, there is no account to create, and there is no word-count paywall waiting at the end of the check. The trade-off is that OpenCheck cannot detect one student copying another's unpublished essay — that capability only exists for vendors who kept the essays.",
          "Whichever tool you use, run the check early. A report read a week before the deadline is a proofreading aid for your citations; the same report an hour before submission is only a source of panic.",
        ],
      },
    ],
  },
  {
    slug: "self-plagiarism-reusing-your-own-work",
    title: "Is reusing your own work plagiarism?",
    category: "Questions",
    summary:
      "Submitting the same text twice can breach academic rules even though nobody else wrote it. When self-plagiarism counts, and how to reuse your material properly.",
    readingTime: "4 min read",
    intro:
      "Self-plagiarism sounds like a contradiction — you cannot steal from yourself. But academic and publishing rules are not only about ownership; they are about representing work as new when it has already been submitted or published elsewhere.",
    sections: [
      {
        heading: "Where the rule actually bites",
        paragraphs: [
          "The common cases are resubmitting an assignment for a second module, reusing a methods section across two papers, and publishing overlapping findings in more than one journal. In each case the reader is led to believe they are seeing original work produced for that context.",
          "Similarity tools do detect this when the earlier text is in the corpus — which is exactly why institutional checkers keep student submissions. A checker that discards submissions, including OpenCheck, will not flag your own earlier essay.",
        ],
      },
      {
        heading: "How to reuse your material legitimately",
        paragraphs: [
          "Reuse is usually allowed when it is disclosed and permitted. Ask your supervisor or editor first, cite your earlier work like any other source, and keep the reused portion proportionate — a repeated methods paragraph is routine, a repeated discussion chapter is not.",
          "For theses built from published papers, most institutions have an explicit policy on incorporating your own articles, including how to declare co-author contributions. Follow it in writing rather than assuming tolerance.",
        ],
      },
    ],
  },
  {
    slug: "do-quotes-and-references-count-in-a-plagiarism-check",
    title: "Do quotes and references count towards your similarity score?",
    category: "Questions",
    summary:
      "Quoted passages and bibliographies inflate similarity scores even when they are perfectly cited. What is being counted, and what to do about it.",
    readingTime: "4 min read",
    intro:
      "Yes — unless the tool has been configured to exclude them, quotations and reference lists are matched like any other text. That surprises people who assume a checker understands citation. It does not: it matches strings.",
    sections: [
      {
        heading: "Why bibliographies match so heavily",
        paragraphs: [
          "A reference entry contains an author name, a title, a journal, a year, and a page range in a fixed order. Every other paper citing the same work produces a nearly identical string. A long reference list can therefore account for several percentage points on its own, and in short documents it can dominate the score.",
          "Block quotations behave the same way. A correctly indented, correctly cited 60-word quotation is 60 words of exact match.",
        ],
      },
      {
        heading: "What to do instead of deleting them",
        paragraphs: [
          "Do not remove quotation marks or trim citations to lower a number — that converts a cited passage into an uncited one and turns a cosmetic problem into a real one.",
        ],
        bullets: [
          "If your tool offers exclusion settings, exclude the bibliography and quoted material, then read the remaining matches.",
          "If it does not, mentally subtract those matches and judge the rest of the report.",
          "Check that every quotation actually carries a citation and accurate page number — the report is a good moment to catch a missing one.",
          "Consider whether long quotations are earning their space; often a shorter quote plus your own analysis reads better and scores lower as a side effect.",
        ],
      },
    ],
  },
  {
    slug: "how-to-lower-your-similarity-score-honestly",
    title: "How to lower your similarity score without cheating",
    category: "Guides",
    summary:
      "Synonym-swapping tools hide borrowing instead of fixing it. The legitimate ways to reduce overlap all involve writing more of the paper yourself.",
    readingTime: "5 min read",
    intro:
      "Search results for lowering a similarity score are full of rewriting tools that promise to make matched text disappear. They work, in the narrow sense that the string no longer matches. They also leave the borrowing in place and remove the evidence that it happened, which is the definition of the problem the check exists to catch.",
    sections: [
      {
        heading: "What actually reduces overlap",
        paragraphs: [
          "Every honest technique has the same shape: increase the proportion of the document that is your own reasoning.",
        ],
        bullets: [
          "Replace a long quotation with a short one plus two sentences of your own analysis of it.",
          "Summarise a source's argument from memory, then reopen it to verify you have not distorted the claim — and cite it.",
          "Cut background material that restates textbook content without advancing your argument.",
          "Merge two sources into a comparison rather than describing each in the source's own words.",
          "Write your own descriptions of your own data, figures, and results.",
        ],
      },
      {
        heading: "Why patchwriting still shows",
        paragraphs: [
          "Swapping adjectives while keeping the original clause order produces text that reads awkwardly and remains recognisably someone else's sentence to a human marker. Markers spot register shifts long before a tool does: a paragraph of fluent, oddly formal prose sitting between your own sentences is more conspicuous than the match would have been.",
          "The reliable habit is to take notes in your own words while reading, with page numbers, rather than pasting passages into a draft with the intention of rewriting them later. Very few drafts survive that intention.",
        ],
      },
      {
        heading: "When a high score is fine",
        paragraphs: [
          "If your remaining matches are quotations, references, and standard field phrasing, stop. Rewriting a standard definition of a statistical test to lower a number makes your paper harder to read for no ethical gain. The purpose of the check is a correctly attributed document, not a small percentage.",
        ],
      },
    ],
  },
  {
    slug: "plagiarism-check-before-submitting-your-thesis",
    title: "What to check in your thesis before you submit it",
    category: "Guides",
    summary:
      "A submission-week checklist for long documents: which sections generate false alarms, what to run separately, and the attribution mistakes that survive proofreading.",
    readingTime: "6 min read",
    intro:
      "A thesis is long enough that a single similarity figure is close to meaningless. Checking it well means checking it in pieces, knowing which pieces are expected to match, and leaving enough time to repair citations rather than paper over them.",
    sections: [
      {
        heading: "Check chapter by chapter",
        paragraphs: [
          "Run each chapter separately. A whole-thesis percentage averages a literature review that legitimately quotes heavily with a results chapter that should be almost entirely original, and hides both signals. Chapter-level reports also stay short enough to read match by match.",
          "Expect the literature review and methods chapter to score highest. Expect the discussion and conclusion to score lowest — a match there is worth investigating, because those chapters should be your own reasoning.",
        ],
      },
      {
        heading: "Sections that raise harmless flags",
        paragraphs: [
          "Before you start editing, know which matches you can dismiss quickly.",
        ],
        bullets: [
          "Reference list, appendices of published instruments, and ethics declarations.",
          "Standard protocol descriptions and named statistical procedures.",
          "Institutional title pages, declarations, and formatting boilerplate.",
          "Your own published papers, where your institution's policy permits incorporation and you have declared it.",
        ],
      },
      {
        heading: "The mistakes that survive proofreading",
        paragraphs: [
          "Attribution errors usually appear during editing rather than drafting. A paragraph gets moved and leaves its citation behind. A summary of three sources ends with one reference. A figure is redrawn from a paper without a source note. A quotation loses its closing mark during a reformatting pass and now reads as your sentence.",
          "Give yourself at least a week between the check and the deadline. Fixing attribution means returning to sources and confirming page numbers, and that work cannot be compressed into the final evening.",
        ],
      },
      {
        heading: "One last pass",
        paragraphs: [
          "After edits, re-run the chapters you changed. Confirm that every remaining match falls into a category you can explain out loud to a supervisor, and that nothing was reworded rather than cited. If you can defend each match in one sentence, the document is ready.",
        ],
      },
    ],
  },
  {
    slug: "does-turnitin-detect-paraphrasing",
    title: "Does Turnitin detect paraphrasing?",
    category: "Questions",
    summary:
      "What similarity software can and cannot see when a passage has been reworded, and why the safer question is whether the idea was credited.",
    readingTime: "4 min read",
    intro:
      "Students ask this constantly, usually while staring at a paragraph they have already rewritten twice. The honest answer is: sometimes, partly, and less reliably than people assume — but that is the wrong thing to optimise for.",
    sections: [
      {
        heading: "What the software actually compares",
        paragraphs: [
          "Similarity tools index text and look for overlapping strings of words. A light paraphrase that keeps the sentence structure and swaps a few synonyms usually still trips a match, because enough consecutive words survive. A genuine restatement — different structure, different emphasis, your own analysis threaded through — often does not produce a string match at all.",
          "Some systems add sentence-level comparison that is less dependent on exact wording, so heavily reworded passages can still surface. Coverage varies by product and by what is in the index, which is why nobody can promise you a specific outcome.",
        ],
      },
      {
        heading: "Why detection is the wrong target",
        paragraphs: [
          "A paraphrase that escapes detection is still plagiarism if the idea came from a source and the source is not credited. Academic misconduct is defined by attribution, not by whether software noticed. Markers read for argument, and an uncited claim that clearly belongs to someone else is visible to a human long before it is visible to a tool.",
          "Turn it around: if you cite the source, it does not matter whether the paraphrase is detected. The match becomes explainable in one sentence, which is the standard any passage in your document should meet.",
        ],
      },
      {
        heading: "How to paraphrase properly",
        paragraphs: [
          "Close the source. Write what you understood in your own words, from memory. Reopen the source only to check accuracy and to add the citation. If you cannot restate the point without the original in front of you, quote it instead.",
        ],
        bullets: [
          "Change structure and emphasis, not just vocabulary.",
          "Add your own reasoning about why the point matters.",
          "Cite the source even when no words are shared.",
          "Quote directly when the original phrasing is the point.",
        ],
      },
    ],
  },
  {
    slug: "plagiarism-checker-that-does-not-store-your-work",
    title: "How to find a plagiarism checker that does not store your work",
    category: "Privacy",
    summary:
      "Many free checkers keep a copy of what you submit. What to look for in the terms, and why storage matters for unpublished coursework.",
    readingTime: "4 min read",
    intro:
      "Free tools have to pay for themselves somehow. For a fair number of plagiarism checkers, the payment is your text: submitted documents are retained, indexed, and used to grow the corpus other users are checked against.",
    sections: [
      {
        heading: "Why retention is a real problem",
        paragraphs: [
          "If your unpublished draft enters a reuse database, a later check of your own final version can match against your earlier submission. Students have been asked to explain similarity against a document they wrote themselves. For researchers, an unpublished manuscript sitting in a third-party index is a confidentiality issue before it is anything else.",
        ],
      },
      {
        heading: "What to look for",
        paragraphs: [
          "Read the privacy policy for the words retain, store, index, and improve our services. Vague commitments to security are not commitments to deletion.",
        ],
        bullets: [
          "An explicit statement that submitted text is not retained after the check.",
          "No requirement to create an account before checking.",
          "No clause granting a licence to use your content.",
          "A clear answer on whether submissions join a comparison database.",
        ],
      },
      {
        heading: "How OpenCheck handles it",
        paragraphs: [
          "Text you paste is compared in memory during the request and discarded when the response is sent. It is not written to a database, not added to a corpus, and not used to check anyone else's work. There is no account, so there is nothing to attach a document history to.",
        ],
      },
    ],
  },
  {
    slug: "how-to-cite-sources-correctly",
    title: "How to cite sources correctly and avoid accidental plagiarism",
    category: "Guides",
    summary:
      "Most plagiarism in student work is accidental. A short, practical routine for keeping attribution straight from first note to final draft.",
    readingTime: "5 min read",
    intro:
      "Very few students set out to plagiarise. Far more lose track of which sentence in their notes was copied and which was their own summary, then discover the problem after submission.",
    sections: [
      {
        heading: "The problem starts at note-taking",
        paragraphs: [
          "If your notes mix verbatim extracts with your own paraphrases and no markers between them, the draft you write from those notes will inherit the confusion. Fix it at the source: put every copied string in quotation marks with a page number the moment you record it, and prefix your own thoughts with a bracketed note.",
        ],
      },
      {
        heading: "What always needs a citation",
        paragraphs: [
          "Attribution is owed to the idea, not only to the wording. When in doubt, cite — an unnecessary citation costs nothing.",
        ],
        bullets: [
          "Direct quotations, however short.",
          "Paraphrases and summaries of another author's argument.",
          "Data, figures, and results you did not generate.",
          "A distinctive framing, taxonomy, or method attributable to someone.",
          "Images, tables, and diagrams reproduced or adapted.",
        ],
      },
      {
        heading: "What does not need one",
        paragraphs: [
          "Common knowledge in your field, and your own original analysis. If the fact appears without attribution in several general sources, you do not need to cite it. If you are unsure whether something counts as common knowledge in your discipline, ask your supervisor rather than guessing.",
        ],
      },
      {
        heading: "A final check before submitting",
        paragraphs: [
          "Run the finished draft through a similarity check with the quotes still in, then read each match and confirm it is either credited or genuinely common phrasing. That single pass catches almost every accidental omission.",
        ],
      },
    ],
  },
  {
    slug: "plagiarism-checker-for-bloggers-and-writers",
    title: "Plagiarism checking for bloggers, freelancers, and content teams",
    category: "Guides",
    summary:
      "Duplicate content risks, checking work from freelance writers, and how to verify originality without sending client drafts into someone's database.",
    readingTime: "4 min read",
    intro:
      "Plagiarism checking is not just an academic concern. If you publish for clients or commission writing, unoriginal copy is a reputational and search-visibility problem before it is an ethical one.",
    sections: [
      {
        heading: "Why publishers check",
        paragraphs: [
          "Commissioned articles occasionally arrive with passages lifted from the first page of search results. Publishing them exposes you to takedown requests, client disputes, and search engines treating your page as a duplicate of an older, stronger one.",
          "A quick similarity pass before publication catches the obvious cases: whole paragraphs copied from a competitor, product descriptions pasted from a manufacturer, or a rewrite so light the original is still visible.",
        ],
      },
      {
        heading: "Reading results for web content",
        paragraphs: [
          "Expect some overlap on any factual topic. Product names, statistics, standard definitions, and short common phrases will match. What matters is contiguous, substantive passages that mirror one specific source.",
        ],
        bullets: [
          "Long matched runs against a single source: investigate.",
          "Scattered short matches across many sources: usually normal phrasing.",
          "Quoted expert commentary: fine, if attributed.",
        ],
      },
      {
        heading: "Keeping client work private",
        paragraphs: [
          "Unpublished client drafts should not be retained by a checking service. OpenCheck compares text in memory and discards it, with no account and no stored history — which makes it usable for drafts you are contractually required to keep confidential.",
        ],
      },
    ],
  },
  {
    slug: "what-happens-if-you-are-accused-of-plagiarism",
    title: "What happens if you are accused of plagiarism",
    category: "Questions",
    summary:
      "The usual process at a university, what evidence matters, and the practical steps to take if a similarity report is raised against your work.",
    readingTime: "5 min read",
    intro:
      "An academic integrity query is frightening, but it is a process with defined stages, and a high similarity score on its own is not a finding of misconduct.",
    sections: [
      {
        heading: "How the process usually runs",
        paragraphs: [
          "Typically a marker flags a concern, the department reviews the report alongside the submission, and you are invited to respond — often in a short meeting. Most cases end there, either because the overlap is explainable or because it is treated as a citation error rather than misconduct. Formal panels are for serious or repeated cases.",
        ],
      },
      {
        heading: "What actually helps your case",
        paragraphs: [
          "Evidence of process. Drafts, notes with sources recorded, reading lists, and version history all demonstrate that the work was built rather than assembled.",
        ],
        bullets: [
          "Keep dated drafts and research notes for every assignment.",
          "Be able to explain each matched passage in one sentence.",
          "Respond promptly and factually; do not improvise explanations.",
          "Ask your students' union or an academic adviser for support early.",
        ],
      },
      {
        heading: "Preventing it next time",
        paragraphs: [
          "The habits that protect you are unglamorous: mark quotations in your notes, cite paraphrases, and run a similarity check on the finished draft with enough time to fix what it finds. Nearly every accidental case traces back to notes that lost track of what was copied.",
        ],
      },
    ],
  },
  {
    slug: "free-vs-paid-plagiarism-checkers",
    title: "Free vs paid plagiarism checkers: what you actually get",
    category: "Questions",
    summary:
      "Where paid tools genuinely differ, where free ones are sufficient, and the hidden cost of free checkers that keep your text.",
    readingTime: "4 min read",
    intro:
      "Paid checkers are not simply better versions of free ones. The real difference is what they compare against and who they answer to.",
    sections: [
      {
        heading: "What paid tools buy you",
        paragraphs: [
          "Mostly index size and institutional context. Systems used by universities compare against a repository of previously submitted student papers, which no public tool can access. They also integrate with submission workflows and produce reports markers already know how to read.",
          "That repository is the reason no free tool can predict an institutional score. It is not a matter of algorithm quality.",
        ],
      },
      {
        heading: "What free tools are genuinely good for",
        paragraphs: [
          "Catching the problems you can still fix: uncredited passages, forgotten quotation marks, paraphrases too close to the original. That is the majority of accidental plagiarism, and it does not require a private corpus to find.",
        ],
      },
      {
        heading: "The hidden cost",
        paragraphs: [
          "Many free checkers pay for themselves by keeping what you submit. Before pasting an unpublished draft anywhere, check whether the service retains it. A tool that discards your text after the check — as OpenCheck does — costs nothing and takes nothing.",
        ],
        bullets: [
          "Free and retained: your draft becomes part of someone's product.",
          "Free and stateless: text compared in memory, then gone.",
          "Paid institutional: the only route to a repository-backed score.",
        ],
      },
    ],
  },
  {
    slug: "how-to-check-plagiarism-in-an-essay",
    title: "How to check plagiarism in an essay, step by step",
    category: "Guides",
    summary:
      "A practical checking routine for an essay: what to check, in what order, and how to act on the report without rewriting good prose.",
    readingTime: "4 min read",
    intro:
      "Checking an essay for plagiarism is a ten-minute job if you do it in the right order. Most of the time people lose is spent rewriting sentences that never needed changing.",
    sections: [
      {
        heading: "Check the finished draft, not a work in progress",
        paragraphs: [
          "Run the check once the argument is settled and the citations are in. Checking an early draft produces matches for passages you are about to cut, and checking after submission is too late to be useful.",
          "Paste the body text. You can leave the reference list out of the check: it will match every other bibliography citing the same works, and those matches tell you nothing.",
        ],
      },
      {
        heading: "Work through the report match by match",
        paragraphs: [
          "For each highlighted passage, open the source beside it and ask whether a reader already knows the words came from elsewhere. If the passage is quoted and cited, or paraphrased and attributed, it is fine regardless of how much of the score it accounts for.",
        ],
        bullets: [
          "Quoted with a citation: verify the quotation marks and page number, then move on.",
          "Standard phrasing on a common topic: leave it; rewriting makes the prose worse.",
          "A close paraphrase with no citation: add the citation, or quote it properly.",
          "Someone else's argument or data presented as yours: cite the source, or cut it.",
        ],
      },
      {
        heading: "Leave time to fix what you find",
        paragraphs: [
          "The only failure mode that matters is finding a real problem an hour before the deadline. Check the day before, so an added citation is a two-minute edit rather than a panic.",
          "OpenCheck reports where your text overlaps with published sources and stops there. It does not score your honesty, and it does not keep your draft.",
        ],
      },
    ],
  },
  {
    slug: "plagiarism-checker-for-research-papers",
    title: "Using a plagiarism checker on a research paper before submission",
    category: "Guides",
    summary:
      "Why methods sections and literature reviews inflate similarity scores, and what journal editors actually look for.",
    readingTime: "4 min read",
    intro:
      "Research papers produce higher similarity scores than essays, and for structural reasons rather than dishonest ones. Knowing which parts of your paper generate matches makes the report far easier to read.",
    sections: [
      {
        heading: "Where the matches come from",
        paragraphs: [
          "Methods sections describe standard procedures in standard language, because deviating from the accepted wording makes a protocol harder to reproduce. Literature reviews restate published findings. Both generate overlap that a marker or editor expects to see.",
          "Titles, journal names, funding declarations and ethics statements match too. None of it is a finding.",
        ],
      },
      {
        heading: "What editors actually screen for",
        paragraphs: [
          "Editors look for substantive reuse: a discussion section lifted from another paper, results text recycled from your own earlier publication without disclosure, or paragraphs of a review reproduced verbatim. A high overall percentage spread across a methods section and a reference list rarely concerns anyone.",
          "Reusing your own previously published text counts too. Disclose it and cite the earlier paper rather than hoping the overlap goes unnoticed.",
        ],
      },
      {
        heading: "A pre-submission pass",
        paragraphs: [
          "Check the sections you wrote from scratch — introduction, discussion, conclusion — with the most attention. That is where uncredited borrowing hides, and where a citation fixes it entirely.",
        ],
        bullets: [
          "Confirm every quoted passage is marked and cited.",
          "Confirm every paraphrased finding names its source.",
          "Disclose any text reused from your own earlier work.",
          "Ignore matches in references, declarations and standard protocols.",
        ],
      },
    ],
  },
  {
    slug: "why-similarity-scores-differ-between-tools",
    title: "Why two plagiarism checkers give you different scores",
    category: "Questions",
    summary:
      "Different tools compare against different text. The number is a property of the index, not of your writing.",
    readingTime: "3 min read",
    intro:
      "Running the same document through two checkers and getting two different percentages is normal, and it is not evidence that one of them is broken.",
    sections: [
      {
        heading: "The index decides the score",
        paragraphs: [
          "A similarity score answers one question: how much of this text matched something in the corpus I searched? Change the corpus and the answer changes. A tool with access to a repository of student submissions will find matches a public tool cannot see, and a tool indexing academic publishers will find matches a general web search misses.",
          "Two honest tools with different indexes will disagree about the same document. Neither number is the true score, because there is no true score.",
        ],
      },
      {
        heading: "Matching rules matter too",
        paragraphs: [
          "Tools differ in how long a matched string must be before it counts, whether they exclude quotations and reference lists, and whether they count near-matches or only exact ones. Those choices can move a percentage by ten points without a single word of your text changing.",
        ],
      },
      {
        heading: "What to do with the disagreement",
        paragraphs: [
          "Treat every score as a pointer to passages worth reading, not as a grade. If one tool flags a paragraph the other missed, read that paragraph — the flag is useful even when the percentage is not comparable.",
          "This is why OpenCheck shows you the matched passages and the sources rather than presenting a percentage as a verdict.",
        ],
      },
    ],
  },
  {
    slug: "common-types-of-plagiarism",
    title: "The common types of plagiarism, and which ones catch honest writers",
    category: "Guides",
    summary:
      "Direct copying is the rarest kind. Mosaic plagiarism, unattributed paraphrase and lost citations account for most real cases.",
    readingTime: "4 min read",
    intro:
      "Deliberate copying is easy to describe and comparatively rare. The cases that catch careful writers are the ones that begin as sloppy note-taking.",
    sections: [
      {
        heading: "Direct plagiarism",
        paragraphs: [
          "Copying a passage word for word with no quotation marks and no citation. Obvious, and easily avoided — but also what happens accidentally when a quotation is pasted into notes and later drafted around.",
        ],
      },
      {
        heading: "Mosaic or patchwork plagiarism",
        paragraphs: [
          "Weaving phrases from a source into your own sentences, swapping a few words, and citing nothing. This is the most common form in student work, and it usually reflects a writer working with the source open beside them rather than an intent to deceive.",
        ],
      },
      {
        heading: "Unattributed paraphrase",
        paragraphs: [
          "Restating someone else's argument or data in your own words without naming them. The obligation attaches to the idea, not only to the wording, so rewording does not discharge it.",
        ],
      },
      {
        heading: "Self-plagiarism and lost citations",
        paragraphs: [
          "Reusing your own submitted or published work without disclosure counts in most institutions. So does a citation that fell out during editing — the text now presents borrowed material as original even though you never intended it to.",
        ],
        bullets: [
          "Mark quotations in your notes the moment you copy them.",
          "Record the source and page for every paraphrase as you write it.",
          "Re-check citations after any heavy round of editing.",
          "Disclose reuse of your own earlier work.",
        ],
      },
    ],
  },
  {
    slug: "is-it-safe-to-upload-your-essay-to-a-plagiarism-checker",
    title: "Is it safe to upload your essay to a plagiarism checker?",
    category: "Privacy",
    summary:
      "What can happen to a document you submit to a checking service, and how to tell whether a tool keeps your text.",
    readingTime: "4 min read",
    intro:
      "It depends entirely on what the service does with your file after the check, and most tools do not make that obvious.",
    sections: [
      {
        heading: "The real risks",
        paragraphs: [
          "The concern is not usually a data breach. It is retention: a service that stores your draft can index it, so a passage of your own unpublished work reappears as a match when you or someone else checks later. Some tools also state in their terms that submissions may be used to improve their product.",
          "For an unpublished thesis or paid client work, that is a genuine problem rather than a theoretical one.",
        ],
      },
      {
        heading: "How to tell before you paste",
        paragraphs: [
          "Look for an explicit statement about what happens to your text, not a general privacy policy. The wording you want is that submissions are processed in memory and discarded, and that they are not added to any index or used for training.",
        ],
        bullets: [
          "Does the service say it stores submissions? If it is silent, assume it does.",
          "Does it require an account before checking? Accounts exist to link submissions to you.",
          "Does it offer to keep a history of your checks? That history is stored text.",
          "Do the terms mention using submissions to improve the service?",
        ],
      },
      {
        heading: "The stateless alternative",
        paragraphs: [
          "OpenCheck compares your text against public sources in memory and discards it when the response is returned. There is no account, no history, and nothing added to an index — which also means we cannot show you a past report, because we do not have one.",
        ],
      },
    ],
  },
  {
    slug: "how-plagiarism-detection-works",
    title: "How plagiarism detection actually works",
    category: "Explainers",
    summary:
      "Text splitting, fingerprinting, candidate retrieval and similarity scoring — the mechanics behind a similarity report, without the marketing.",
    readingTime: "5 min read",
    intro:
      "Plagiarism detection is text comparison, not judgement. Understanding the four steps involved explains most of the surprising things a report does.",
    sections: [
      {
        heading: "Step one: splitting the text",
        paragraphs: [
          "Your document is broken into units — sentences, or overlapping windows of a fixed number of words. Comparison happens per unit, which is why a report can highlight one sentence in a paragraph and ignore the rest.",
        ],
      },
      {
        heading: "Step two: finding candidates",
        paragraphs: [
          "No system compares your text against the whole internet. It picks distinctive phrases and retrieves a shortlist of documents likely to be relevant, then compares against those. This is the step that determines what a tool can possibly find, and it is why index size matters more than algorithm cleverness.",
        ],
      },
      {
        heading: "Step three: measuring overlap",
        paragraphs: [
          "Two measures do most of the work. Verbatim matching looks for runs of identical words — typically four or more in sequence — which catches copying directly. Vector similarity compares word-frequency profiles, which catches restructured text that reuses the same vocabulary.",
          "Combining them is what lets a tool distinguish a copied sentence from a page that merely discusses the same subject.",
        ],
      },
      {
        heading: "Step four: reporting, not deciding",
        paragraphs: [
          "The output is a set of matched passages with the sources they resemble, and a percentage derived from how much of the document those passages cover. Nothing in the pipeline knows whether a match is a cited quotation or an uncredited lift — that distinction lives in the citation, which is a human decision.",
          "Any tool claiming to detect intent is overstating what the mechanics can support.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
