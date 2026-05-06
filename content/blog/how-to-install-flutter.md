---
title: How to Install Flutter on Windows, macOS & Linux (No Cap, It's Easy)
cover: /Flutter-logo.svg
description: "Thinking about building cross-platform apps but scared of the Flutter setup process? Trust me, it's not that deep. Here is the ultimate no-nonsense guide to getting Flutter up and running on Windows, macOS, and Linux so you can start shipping to iOS and Android from one codebase."
draft: false
featured: false
navigation:
  description: "Thinking about building cross-platform apps but scared of the Flutter setup process? Trust me, it's not that deep. Here is the ultimate no-nonsense guide to getting Flutter up and running on Windows, macOS, and Linux so you can start shipping to iOS and Android from one codebase."
  title: How to Install Flutter on Windows, macOS & Linux
  icon: i-akar-icons:mobile-device
publishedAt: 2026-05-06 12:15:00
readTime: 12
tags:
  - flutter
  - mobile-dev
  - setup
updatedAt: 2026-05-06 12:15:00
---

Thinking about building cross-platform apps but scared of the Flutter setup process? Trust me, it's not that deep. Setting up Flutter gives you the superpower to ship native apps to iOS, Android, Web, and Desktop all from one single Dart codebase. 

Whether you're daily-driving Windows, flexing on a Mac, or living in the terminal on Linux, this no-fluff guide will get your environment ready for `flutter run` in no time.

---

## 🪟 Windows

If you are on Windows, you'll be primarily targeting Android apps (or Windows desktop apps). 

### Step 1: Get the Prerequisites
You need a few basic tools before Flutter can thrive. Open PowerShell and make sure you have Git installed. If not, grab it from [git-scm.com](https://git-scm.com/).

### Step 2: Download the Flutter SDK
1. Go to the [Flutter Windows Download page](https://docs.flutter.dev/get-started/install/windows).
2. Download the latest stable `.zip` file.
3. Extract the zip file and place the `flutter` folder somewhere permanent like `C:\src\flutter`.
   > **Warning:** Do NOT put Flutter in a directory like `C:\Program Files\` that requires elevated privileges.

### Step 3: Update your PATH
You need to tell Windows where Flutter lives.
1. Click the Windows Start Search, type "env" and select **Edit the system environment variables**.
2. Click **Environment Variables**.
3. Under **User variables**, select `Path` and click **Edit**.
4. Click **New** and paste the path to your Flutter bin directory (e.g., `C:\src\flutter\bin`).
5. Hit OK and restart your terminal.

### Step 4: Run Flutter Doctor
Open a new terminal and run:
```bash
flutter doctor
```
This command is your best friend. It will check your environment and tell you exactly what you are missing (usually Android Studio and the Android toolchain).

---

## 🍎 macOS

Mac developers have the ultimate flex: you can build for *both* iOS and Android. 

### Step 1: Install Rosetta 2 (Apple Silicon only)
If you're on an M1/M2/M3/M4 Mac, you need Rosetta 2 for some components to run. Open your terminal:
```bash
sudo softwareupdate --install-rosetta --agree-to-license
```

### Step 2: Download the SDK
You can download the zip from the website, but honestly, if you're on a Mac and not using Homebrew or just standard Git cloning, what are we doing? 

Let's just clone it directly to your home directory:
```bash
git clone https://github.com/flutter/flutter.git -b stable ~/development/flutter
```

### Step 3: Add Flutter to your PATH
Add this to your `~/.zshrc` (or `~/.bashrc`):
```bash
export PATH="$PATH:$HOME/development/flutter/bin"
```
Then run `source ~/.zshrc` to refresh.

### Step 4: Xcode & iOS Setup
To build iOS apps, you *must* have Xcode installed from the Mac App Store. Once installed, configure the command-line tools:
```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Run `flutter doctor` to verify everything is chilling.

---

## 🐧 Linux (Ubuntu/Debian)

Linux setup is famously smooth for Flutter, especially if you use `snap`.

### Method 1: The Snap Way (Easiest)
If you're on Ubuntu, Snap is already baked in. Just run:
```bash
sudo snap install flutter --classic
```
Boom. You're done. Snap handles the PATH for you. 

### Method 2: The Manual Way (For the Purists)
If you hate Snap (we've all been there), do it the manual way:

1. Install dependencies:
```bash
sudo apt update
sudo apt install curl git unzip xz-utils zip libglu1-mesa
```

2. Clone the repo:
```bash
git clone https://github.com/flutter/flutter.git -b stable ~/development/flutter
```

3. Update your `~/.bashrc` or `~/.zshrc`:
```bash
export PATH="$PATH:$HOME/development/flutter/bin"
```
Source your config, and run `flutter doctor`.

---

## The Final Boss: Android Studio 🤖

No matter what OS you're on, if you want to build for Android, you need Android Studio. 

1. Download it from [developer.android.com/studio](https://developer.android.com/studio).
2. Go through the standard installation wizard. This installs the Android SDK, Android SDK Command-line Tools, and Android SDK Build-Tools.
3. Open Android Studio, go to **Plugins**, and search for the **Flutter** plugin. Install it (it will ask to install the Dart plugin too — say yes).

Finally, accept the Android licenses so `flutter doctor` stops yelling at you:
```bash
flutter doctor --android-licenses
```
Just spam `y` and hit enter until it's done.

## Wrap Up

Run `flutter doctor` one last time. If you see all green checkmarks (or at least green for the platforms you care about), you are officially ready to code. 

Run `flutter create my_first_app` and let's get it! 🚀
