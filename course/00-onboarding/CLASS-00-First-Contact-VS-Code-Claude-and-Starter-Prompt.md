# Class 00 — First Contact: VS Code, Claude, and Your Starter Prompt

## Purpose

This is the first message students receive before the bootcamp begins. Its purpose is to help every student arrive with an AI-assisted development workspace ready to use.

---

## WhatsApp message — ready to send

👋 **Welcome to the Full Stack + AI Bootcamp!**

Before our first class, prepare your development workspace by completing these steps:

### 1. Install Visual Studio Code

Download **Visual Studio Code (VS Code)** from its official website:

https://code.visualstudio.com/

Choose the version for your operating system and complete the installation using the default options.

> Make sure you install **Visual Studio Code**, not Visual Studio. They are different applications.

### 2. Open VS Code

Launch VS Code after the installation finishes. You should see the welcome screen.

### 3. Add Claude to the right side of VS Code

1. Open the **Extensions** panel by clicking the blocks icon on the left side of VS Code.
2. Search for **Claude Code**.
3. Confirm that the extension is the official extension published by **Anthropic**.
4. Click **Install**.
5. Follow the instructions to create or sign in to your Anthropic account.
6. If Claude asks you to choose a subscription, select the **minimum paid individual plan that includes access to Claude Code**. Budget approximately **US$25 per month**; the exact price may vary by country, currency, taxes, and Anthropic's current pricing. Check the final amount before confirming the purchase—there is no need to select a more expensive plan for the bootcamp.
7. Open Claude and move or dock its agent panel on the **right side** of VS Code.

> **Important:** The course workspace should have three columns from left to right: **Explorer on the left → the document you are working on in the center → the Claude agent on the right**. Use the Claude agent panel—not Claude in the terminal.

Only install the official Anthropic extension and subscribe through Anthropic's official account and payment pages. Do not install extensions with similar names or enter payment details on pages from unknown publishers.

### 4. Create and open your course folder

1. Create a new folder on your computer named `full-stack-ai-bootcamp`.
2. In VS Code, select **File → Open Folder…**.
3. Choose the `full-stack-ai-bootcamp` folder you just created.
4. If VS Code asks whether you trust the authors of the files in this folder, confirm that you trust it because it is your own folder.
5. Check that the folder name appears in the **Explorer** panel on the left.

Claude needs an open project folder so it can work with the course files and understand their context.

### 5. Start a new Claude agent

1. Open the **Claude panel on the right side**.
2. Select **New Agent** to start a clean conversation for the course.
3. Keep this agent visible on the right and use it for the starter prompt below.

Do not paste the prompt into the terminal or into an unrelated chat window. Paste it into the new Claude agent in the right-side panel.

Before continuing, check the layout from left to right:

1. **Left:** Explorer and the open `full-stack-ai-bootcamp` folder.
2. **Center:** The document or code file you are working on.
3. **Right:** The Claude agent.

### 6. Send Claude this first prompt

Copy and paste the following message into the new Claude agent:

```text
Hello, Claude. I am starting the Full Stack + AI Bootcamp. Help me connect this VS Code workspace to the private course repository and download its contents.

The repository is:
https://github.com/amigo2/let-the-nerds-lead

I may have no programming experience. Guide me one step at a time and ask only one question at a time. First ask which operating system I use: Windows, macOS, or Linux. Then help me verify or install Git, confirm that I have a GitHub account and repository access, sign in safely, clone the repository into this workspace without creating confusing nested folders, and open its root in VS Code.

Never ask me to paste a password, access token, private key, or other secret into this chat. Before every command, explain in one short sentence what it does. Ask for confirmation before installing software, authenticating, overwriting files, deleting files, or using administrator permission. Do not claim that something worked unless we verify it from visible output or files.

At the end, verify that README.md, .gitignore, and the course folder appear in Explorer. Open README.md in the center and keep your agent visible on the right. Then tell me to continue with the larger second prompt in README.md.

Start by introducing yourself in two sentences, then ask which operating system I use. Do not give me all the steps at once.
```

### 7. Continue one step at a time

Reply to Claude with your operating system and follow its instructions one step at a time.

If you get stuck, take a screenshot of the complete VS Code window and bring it to the first class. Do not worry—we will finish the setup together.

✅ **Your goal before class:** VS Code opens with Explorer on the left, the working document in the center, and a new Claude course agent on the right. Claude responds to the starter prompt in that panel.

---

## Instructor notes

### Learning objective

By the end of this first contact, the student should be able to:

- Distinguish Visual Studio Code from Visual Studio.
- Install and open VS Code.
- Identify and install the official Claude Code extension from Anthropic.
- Create and open the course project folder.
- Arrange Explorer on the left, the working document in the center, and Claude on the right.
- Use the Claude agent panel instead of Claude in the terminal.
- Start a new Claude agent for the course.
- Understand that AI should explain, guide, and verify—not replace the student's thinking.

### Why the first prompt is intentionally short

This is an onboarding prompt, not the complete course prompt. It minimizes cognitive load and gives Claude one narrow responsibility: verify the workspace interactively and adapt its instructions to the student's operating system.

The complete bootcamp prompt will later add rules for:

- Socratic guidance and progressive hints.
- Planning before implementation.
- Explaining unfamiliar code and terminology.
- Reading errors before attempting fixes.
- Verifying generated code with tests and observable evidence.
- Protecting secrets and personal information.
- Avoiding fabricated commands, APIs, files, and results.
- Tracking what the student understands and what requires practice.

### Safety and support rules

- Students should download software only from official sources.
- Students must verify that Anthropic is the extension publisher.
- Students should never paste passwords, API keys, access tokens, private keys, or other secrets into an AI conversation.
- Claude should explain commands before the student runs them.
- Students should stop and ask an instructor if a command requests administrator access or if its purpose is unclear.
- Screenshots shared for support should be checked for personal information and secrets first.

### Instructor checklist for the first class

- [ ] VS Code is installed and launches correctly.
- [ ] The student installed the official Claude Code extension.
- [ ] Authentication or account access works.
- [ ] The `full-stack-ai-bootcamp` folder exists and is open in VS Code.
- [ ] Explorer is visible on the left and the working document is visible in the center.
- [ ] The Claude agent panel is visible on the right, not in the terminal.
- [ ] The student started a new Claude agent for the course.
- [ ] Claude responds to the starter prompt inside that agent.
- [ ] The student knows which operating system they use.
- [ ] The student understands the rule: ask AI for guidance, then validate the result.
