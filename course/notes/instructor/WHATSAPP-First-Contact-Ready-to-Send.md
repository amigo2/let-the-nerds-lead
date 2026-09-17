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
- Open Claude as an agent panel on the **right side** of VS Code. Do not use Claude in the terminal.
- Select **New Agent**.

Your VS Code layout should be:

**Explorer on the left → working area in the center → Claude agent on the right**

**4. Copy and paste this prompt into the new Claude agent:**

```text
Hello, Claude. I am starting the Full Stack + AI Bootcamp. Help me connect this VS Code workspace to the private course repository and download its contents.

The repository is:
https://github.com/amigo2/let-the-nerds-lead

I may have no programming experience. Guide me one step at a time and ask only one question at a time.

Help me:
1. Identify whether I use Windows, macOS, or Linux.
2. Verify whether Git is installed.
3. Install Git from its official source if it is missing.
4. Verify that I have a GitHub account and access to the private repository.
5. Sign in to GitHub safely.
6. Clone the repository into my current course workspace without creating confusing nested folders.
7. Open the downloaded repository root in VS Code.
8. Verify that README.md, .gitignore, and the course folder are visible in Explorer.
9. Open course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md in the center editor while keeping your agent panel visible on the right.

Never ask me to paste a password, access token, private key, payment information, or another secret into this chat.

Before every command, explain in one short sentence what it does. Ask for my confirmation before installing software, authenticating an account, overwriting or deleting files, spending money, changing system settings, or using administrator permission.

If an error appears, help me identify and understand its important part before suggesting one fix. Do not claim that a step worked unless we verify it from visible output or files.

Start by introducing yourself in two sentences. Then ask which operating system I use. Do not give me all the steps at once, and ask only one question at a time.
```

Follow Claude one step at a time. When the repository opens, read `README.md` and then continue with **Class 00**.

If you get stuck, take a screenshot of the complete VS Code window. Before sharing it, check that it does not show a password, token, payment information, or another secret. We will finish the setup together.

✅ **Your goal:** Explorer is visible on the left, Class 00 is open in the center, and the Claude agent is visible on the right.

## END OF MESSAGE
