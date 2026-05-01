---
title: How to Install Node.js on Ubuntu, macOS & Windows (No Cap, It's Easy) file
cover: /Node.js-logo.svg
description: "POV: you just found a sick tutorial online, copied the commands, and got hit with node: command not found. Yeah, we've all been there. Node.js is basically the backbone of modern web dev — if you're building with React, Next.js, Express, or really anything JavaScript outside the browser — you need it installed first."
draft: false
featured: true
navigation:
  description: "POV: you just found a sick tutorial online, copied the commands, and got hit with node: command not found. Yeah, we've all been there. Node.js is basically the backbone of modern web dev — if you're building with React, Next.js, Express, or really anything JavaScript outside the browser — you need it installed first."
  title: How to Install Node.js on Ubuntu, macOS & Windows (No Cap, It's Easy) file
  icon: i-akar-icons:node-fill
publishedAt: 2026-05-01 17:09:00
readTime: 10
tags:
  - nodejs
updatedAt: 2026-05-01 17:09:00
---

POV: you just found a sick tutorial online, copied the commands, and got hit with `node: command not found`. Yeah, we've all been there. Node.js is basically the backbone of modern web dev — if you're building with React, Next.js, Express, or really *anything* JavaScript outside the browser — you need it installed first.

This is your no-fluff, get-it-done guide. Pick your OS and let's go.

---

## First, What Even Is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine. Translation: it lets you run JavaScript code *outside* the browser — on your server, your terminal, your machine. npm (Node Package Manager) comes bundled with it, which is how you install literally every package you'll ever need.

> **LTS vs Current?** Always grab the **LTS (Long-Term Support)** version unless you have a specific reason not to. It's stable, battle-tested, and won't randomly break your project.

---

## 🐧 Ubuntu

You've got three methods. The NVM route is the most goated — it lets you switch between Node versions like switching fits.

## Method 1: Quick Install via APT (Fast & Easy)

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Then verify with: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

```bash
node -v
npm -v
```

[]{style="font-size: inherit; font-family: inherit; background: transparent; color: rgb(214, 208, 200); border-radius: 3px; display: flex; line-height: 1.42857; overflow-x: auto; white-space: pre; --scrollbar-thumb: oklch(var(--foreground-color) / 0.15); --scrollbar-track: transparent; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);"}Done. Minimal effort. But you're locked into whatever version Ubuntu's repo has, which might be kinda old.

## Method 2: NodeSource PPA (Specific Version)

Want a specific, up-to-date LTS version? This is your move: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

The NodeSource `nodejs` package includes both `node` and `npm` — no separate install needed. []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

## Method 3: NVM (The Pro Move 🏆)

This is the **recommended** path if you work on multiple projects. NVM lets you install, switch, and manage multiple Node versions without the drama: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

[]{style="font-size: inherit; font-family: inherit; background: transparent; color: rgb(214, 208, 200); border-radius: 3px; display: flex; line-height: 1.42857; overflow-x: auto; white-space: pre; --scrollbar-thumb: oklch(var(--foreground-color) / 0.15); --scrollbar-track: transparent; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);"}Restart your terminal (or run `source ~/.bashrc`), then:

```bash
nvm install --lts
nvm use --lts
node -v
```

---

## 🍎 macOS

Three routes here too, but **Homebrew is the fan-favorite** for Mac devs.

## Method 1: Official Installer (.pkg)

The click-and-pray method — totally valid: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

1. Go to [nodejs.org](http://nodejs.org)
2. Download the **macOS Installer (LTS)**
3. Run the `.pkg` file, accept the license, follow the prompts
4. Verify: `node -v` && `npm -v` in your terminal

## Method 2: Homebrew (Recommended ✨)

If you're a Mac dev and *don't* have Homebrew\... it's giving unserious. Install it first at [brew.sh](http://brew.sh), then: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

```bash
brew install node
```

Check it:

```bash
node -v
npm -v
```

[]{style="font-size: inherit; font-family: inherit; background: transparent; color: rgb(214, 208, 200); border-radius: 3px; display: flex; line-height: 1.42857; overflow-x: auto; white-space: pre; --scrollbar-thumb: oklch(var(--foreground-color) / 0.15); --scrollbar-track: transparent; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);"}[]{.token.token style="color: rgb(210, 168, 255);"} Clean, simple, updatable with one command later.

## Method 3: NVM on Mac

Best for M1/M2/M3 chip owners who juggle projects: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

```bash
brew install nvm
mkdir ~/.nvm
```

[]Add NVM to your shell config (`~/.zshrc`), then:

```bash
nvm install --lts
nvm use --lts
```

---

## 🪟 Windows

Windows folks, Microsoft actually has solid docs on this now — and the recommended approach is **[nvm-windows](http://nvm-windows.learn.microsoft)**[.](http://nvm-windows.learn.microsoft)

## Method 1: Official Installer (Easiest)

No terminal needed for this one: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[]{.inline-block.!mt-0.![vertical-align:unset].mr-xs}[youtube]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

1. Go to [nodejs.org](http://nodejs.org)
2. Download the **LTS** `.msi` **installer**
3. Run it, accept the license, choose your install folder
4. ✅ Make sure **"Add to PATH"** is checked
5. Click Install, then open **Command Prompt** and run:

```bash
node -v
npm -v
```

## Method 2: nvm-windows (The Smart Play 🎯)

If you're working on multiple projects or will be switching Node versions, use this: []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[learn.microsoft](http://learn.microsoft)

1. Go to the [nvm-windows GitHub releases page]{.text-box-trim-both}
2. Download **[nvm-setup.zip](http://nvm-setup.zip)**, extract, run **nvm-setup.exe**
3. Follow the setup wizard
4. Open **PowerShell as Admin**, then:

```bash
nvm install lts
nvm use lts
node -v
```

---

## Quick Cheat Sheet 📋

| OS      | Easiest Method              | Pro Method     |
| ------- | --------------------------- | -------------- |
| Ubuntu  | sudo apt install nodejs npm | NVM            |
| macOS   | .pkg from nodejs.org        | Homebrew + NVM |
| Windows | .msi from nodejs.org        | nvm-windows    |

---

## One Last Thing

After any install, always run `node -v` and `npm -v` to confirm everything's working. If you see version numbers — you're locked in. If not, check your PATH settings (especially on Windows). []{.citation-nbsp}[]{.inline-flex}[]{.citation.inline}[]{.relative.-mt-px.max-w-full.min-w-0.whitespace-nowrap.-top-px.font-sans.text-base.text-foreground.select-none.selection:bg-super/50.selection:text-foreground.dark:selection:bg-super/10.dark:selection:text-super}[]{.text-3xs.rounded-badge.group.min-w-4.max-w-full.cursor-pointer.text-center.align-middle.font-mono.tabular-nums.font-normal.transition-colors.duration-150.inline-flex.items-center.leading-snug.[@media(hover:hover)]:hover:bg-subtle.border-subtlest.ring-subtlest.divide-subtlest.bg-quiet class="py-[0.1875rem] px-[0.3rem] group-data-[state=open]/trigger:bg-subtle"}[dev]{.inline-block.relative.!mt-0.![vertical-align:unset].max-w-[25ch].overflow-hidden}

Now go build something. Drop a comment if you're stuck on a step or if your OS decided to be *cooked* mid-install. We got you. 🛠
