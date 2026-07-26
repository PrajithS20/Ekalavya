# EKALAVYA: The Agentic Career Acceleration Ecosystem 🌱

**EKALAVYA** is a revolutionary, AI-powered career acceleration platform designed specifically to bridge the massive gap between academic learning and industry readiness. Powered by a multi-agent AI system via the **NitroStack Model Context Protocol (MCP)**, EKALAVYA goes beyond traditional "chatbots" to act as an active, autonomous career architect—assessing your skills, orchestrating personalized portfolio projects, and verifying your actual work through simulated code reviews and Vision AI.

---

## 🛑 The Problem Statement (A Manifold Challenge)

The modern education-to-employment pipeline is severely broken. Students and early-career professionals face a multifaceted crisis:
1. **The "Experience Paradox"**: Entry-level jobs require experience, but students cannot get experience without a job.
2. **Generic Portfolios**: Students often build the same 3 tutorial-based projects (e.g., Todo apps, calculators) that fail to impress recruiters or solve real-world problems.
3. **The Feedback Void**: Self-taught developers lack senior engineering oversight. They don't know if their code is scalable, clean, or industry-standard.
4. **The Language Barrier**: In developing nations, brilliant minds are often held back by a lack of fluency in English, struggling to articulate their technical prowess.
5. **Passive AI Reliance**: Existing AI tools (like ChatGPT) encourage passive copying and pasting ("prompt-and-response") rather than active problem-solving and critical thinking.

---

## 🎯 Multi-Layered Impactful Solutions

EKALAVYA tackles this manifold problem through a holistic, multi-layered approach:

*   **Layer 1: Deep Skill Auditing**: Instead of asking "what do you know?", the system parses your raw resume and extracts a latent skills matrix to identify exact industry gaps.
*   **Layer 2: Hyper-Personalized Project Generation**: The system does not give generic ideas. It generates unique, market-relevant project blueprints (The Foundry) tailored specifically to fill the gaps found in Layer 1.
*   **Layer 3: Supervised Execution**: EKALAVYA provides an integrated IDE environment where "The Architect" AI agent oversees your code, providing hints rather than raw answers, forcing you to learn.
*   **Layer 4: Vision-Based Verification**: You cannot fake progress. The AI uses Vision models to visually inspect screenshots of your UI and architecture to verify completion before unlocking the next milestone.
*   **Layer 5: Automated Translation to Value**: Once a project is verified, the AI automatically extracts your achievements and translates them into a professional, STAR-method (Situation, Task, Action, Result) resume ready for PDF export.

---

## 🤖 Why is it "Agentic" and How? (Moving Beyond Prompt-Response)

EKALAVYA is fundamentally different from standard LLM wrappers. 

**Standard AI (Prompt-Response):**
*   User: "Give me a project idea."
*   AI: "Build a weather app." *(Interaction ends)*

**EKALAVYA (Agentic AI Logic):**
1. **Autonomous Tool Invocation**: Through the **Model Context Protocol (MCP)**, the AI acts as a router. When you upload a resume, the LLM doesn't just read it; it autonomously triggers a specific `resume_analyze` tool, formats the data, and stores it in the global state.
2. **Stateful Context**: The AI maintains a continuous memory of your skills, your current project phase, and your historical struggles. It knows if you struggled with React hooks 3 days ago.
3. **Proactive Intervention**: The agents don't wait for your prompt. In "The Foundry," the Architect agent evaluates your milestone progress based on strict criteria and decides internally whether you pass or fail, using **Vision AI** to verify your UI screenshots.
4. **Multi-Agent Orchestration**: EKALAVYA utilizes a swarm of specialized agents:
    *   *The Market Agent*: Scrapes trends and aligns your skills to current job descriptions.
    *   *The Architect Agent*: Reviews code, enforces best practices, and verifies visual progress.
    *   *The Resume Agent*: Translates verified technical achievements into recruiter-friendly language.

---

## 🏗️ Architecture & Tech Stack

Ekalavya is built using a modern decoupled architecture, strictly adhering to the **Model Context Protocol (MCP)** standard via the **NitroStack SDK**.

### Backend (NitroStack MCP Server)
*   **Framework**: Official **NitroStack TypeScript SDK** (`@nitrostack/core`).
*   **Agent Modules**: Modular architecture separating AI, Foundry, Market, Research, and Resume logic into discrete tools.
*   **Database**: Local SQLite via Prisma ORM (`dev.db`).
*   **LLM Engine**: Integration with Llama-3.3-70b (for deep logical reasoning) and Llama-3.2-90b-vision (for visual milestone verification).
*   **Transport**: Configured for HTTP/SSE (Server-Sent Events) for real-time streaming to the frontend.

### Frontend (React Client)
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS + Framer Motion for highly interactive, glassmorphism UI.
*   **MCP Bridge**: Uses the official `@modelcontextprotocol/sdk` to natively communicate with the NitroStack Backend via SSE, completely eliminating the need for traditional REST endpoints (no `axios` or `fetch` needed for AI logic).

---

## ⚙️ Environment Setup & Installation

### Prerequisites
*   Node.js (v18 or v20.x recommended)
*   `npm` or `pnpm`
*   Nitro Studio (for deployment and local MCP chat testing)

### 1. Backend Setup (The MCP Server)
The core agentic logic lives in the `ekalavya-2.0` directory.

```bash
# Navigate to the backend directory
cd ekalavya-2.0

# Install dependencies
npm install

# Start the MCP Server via NitroStack CLI in HTTP mode
npm run start
# The server will spin up and listen for SSE connections on http://localhost:3000/sse
```

### 2. Frontend Setup (The React UI)
Open a new, separate terminal for the frontend UI.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# The UI will start on http://localhost:5174
```

---

## 📘 Usage Instructions

1. **Onboarding**: Open `http://localhost:5174` in your browser. Start by navigating to the **Career Guidance** section and uploading your existing resume (PDF or TXT).
2. **Analysis**: Watch as the MCP Agent parses your resume, identifies missing skills based on your target role, and automatically generates your unique skill matrix.
3. **The Foundry (Project Lab)**: Navigate to the Project Lab. Select one of the dynamically generated projects specifically designed to bridge your skill gap.
4. **Guided Execution**: Enter the project workspace. Follow the milestones. You must submit code or screenshots for the Architect Agent to verify using Vision AI before you can proceed.
5. **Resume Export**: Once a project is verified, head to the **Resume Builder**. The system will automatically ingest your verified project and format it into a stunning A4 PDF using the STAR method.

---

## ✨ Novel Highlights

*   **Multilingual Tamil Mode (தமிழ்)**: A cultural context toggle allows rural students to interact with the AI in a mix of Tamil and English technical jargon, lowering the barrier to entry without sacrificing technical accuracy.
*   **Anti-Cheat Verification**: You cannot simply ask the AI for the final code. The system restricts outputs to hints and requires actual visual proof (screenshots) of your running local environment to pass milestones.
*   **Dynamic Data Pipeline**: No hardcoded API endpoints. The frontend directly executes specialized tools on the backend via the standard Model Context Protocol.

---

## 🚀 Deployment (NitroCloud)

1. Open the **Nitro Studio** desktop app.
2. Click **Add Server** -> **Nitro Project**.
3. Select the `ekalavya-2.0` folder.
4. Click **Deploy to NitroCloud** in the Studio header to deploy the MCP server globally.
5. Once deployed, update your frontend `MCPProvider.jsx` to point to the new Live URL instead of `localhost`.
