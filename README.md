# Open Check Now

Build a website called OpenCheck.

OpenCheck will eventually be a free, privacy-focused plagiarism checker for students, writers, and researchers.

For this first version, focus ONLY on creating the website's frontend and user interface. Do NOT implement fake plagiarism detection or generate random similarity scores.

Main purpose

Users will eventually be able to paste text or upload a document, run a plagiarism check, and see:

Overall similarity percentage

Matching sentences or phrases

Potentially matching sources

A clear explanation that similarity does not automatically prove plagiarism

Pages

Create these pages:

Home

Plagiarism Checker

How It Works

About

Blog

Contact

Privacy Policy

Terms of Service

Home page

Create:

A clear headline explaining OpenCheck

Short description of the plagiarism checker

A prominent "Check Plagiarism" button

A preview of the checker

Benefits/features section

"How it works" section

Explanation of why plagiarism results are only indicators

Clean footer with navigation links

Plagiarism Checker page

Create:

Large text input area

Word and character count

"Check Plagiarism" button

File upload interface for future TXT, DOCX and PDF support

Empty results area showing where future results will appear

IMPORTANT:
Do NOT create fake plagiarism results.
Do NOT create a fake backend.
Do NOT claim that plagiarism detection is already working.

Design

Make it:

Modern

Clean

Professional

Student-friendly

Trustworthy

Responsive on desktop and mobile

Easy to navigate

Accessible

Not overly flashy

Avoid excessive gradients, unnecessary animations, AI-themed robot graphics, and generic "AI tool" styling.

Future architecture

Structure the frontend cleanly so we can later connect a separate Python/FastAPI backend containing our actual plagiarism detection engine.

Keep the plagiarism detection logic completely separate from the frontend.

Important restrictions

OpenCheck will NOT provide:

AI humanization

Paraphrasing

Text rewriting

AI-content detection

The main purpose is plagiarism/similarity detection.

Build the initial website now and keep the code organized and reusable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/45f9897b-8403-4df7-8aa3-da21cdfa7077).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
