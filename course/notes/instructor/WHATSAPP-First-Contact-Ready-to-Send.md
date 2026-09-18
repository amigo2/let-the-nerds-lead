# WhatsApp — First Contact (Ready to Send)

Copy everything between **START OF MESSAGE** and **END OF MESSAGE** and send it to the student.

---

## START OF MESSAGE

👋 **Welcome to the Full Stack + AI Bootcamp!**

Before we begin, prepare your workspace by following these steps:

**1. Install Visual Studio Code**

Download it from the official website:
https://code.visualstudio.com/

Install **Visual Studio Code**, not Visual Studio—they are different applications.

**2. Install Claude Code in VS Code**

- Open VS Code.
- Click the Extensions icon (the blocks icon on the left).
- Search for **Claude Code**.
- Confirm that the publisher is **Anthropic**.
- Install only the official Anthropic extension.
- Sign in or create your Anthropic account.
- If a subscription is required, choose the **minimum paid individual plan that includes Claude Code**. Budget approximately **US$25 per month**, but check the current price, currency, and taxes before purchasing. You do not need a more expensive plan for the bootcamp.

**3. Prepare the workspace**

- Create an empty folder named `full-stack-ai-bootcamp` on your computer.
- In VS Code, select **File → Open Folder…** and open that folder.
- Open the **Claude Code panel on the right side** of VS Code. Do not use it in the terminal.

Your VS Code layout should be:

**Explorer on the left → working area in the center → Claude Code on the right**

**4. Copy and paste this prompt into Claude Code:**

```text
Hello. I am starting the Full Stack + AI Bootcamp and this workspace is empty.

Clone the private course repository into this workspace:
https://github.com/amigo2/let-the-nerds-lead

I may have no programming experience. Guide me one step at a time and ask only one question
at a time.

Steps:
1. Tell me which operating system I am on and check whether Git is installed.
2. If Git is missing, help me install it from its official source.
3. Help me sign in to GitHub safely and confirm I can access the private repository.
4. Clone the repository here, without creating a confusing nested folder.
5. Confirm that README.md, CLAUDE.md, the .claude folder, and the course folder exist.
6. Read CLAUDE.md and tell me, in your own words, the rules you will now follow.
7. Open course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md
   in the center editor.

Explain in one short sentence what each command does before you run it. Ask my confirmation
before installing anything, authenticating, or changing settings. Never ask me to paste a
password, token, or key into this chat. Do not tell me a step worked unless we can see proof.

Start by introducing yourself in two sentences, then ask which operating system I use.
```

**5. Important — start a new session after the download finishes**

Once the course files appear, **open a new Claude Code session**. The course includes a file called `CLAUDE.md` that configures your tutor automatically, and it is read when a session starts. Your first session began in an empty folder, so it did not see it yet.

In the new session, type:

```text
/start-session
```

That is the only prompt you need from now on. This course already contains its own instructions for Claude, so you will never have to paste long prompts.

**6. The course updates while you study it**

New guides and corrections are added regularly. Claude checks for you at the start of every session, and you download them with:

```text
/update-course
```

One important habit: **keep your notes and your code in your own folders, outside the course folder.** If you write inside the course files, updating gets messy. If you do not, it takes one second.

If you get stuck, take a screenshot of the complete VS Code window. Before sharing it, check that it does not show a password, token, payment information, or another secret. We will finish the setup together.

✅ **Your goal:** Explorer on the left showing `CLAUDE.md` and the `course` folder, Class 00 open in the center, and Claude Code on the right responding to `/start-session`.

## END OF MESSAGE
