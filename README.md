# EKALAVYA: The Agentic Career Acceleration Ecosystem 🌱

<div align="center">
  <h3>The World's 1st Agentic AI Platform for Collaborative Career Learning</h3>
</div>

---

## 🛑 The Manifold Problem Statement

The modern education-to-employment pipeline is severely broken. Students and early-career professionals face a multifaceted, systemic crisis:

1. **The "Experience Paradox"**: Entry-level jobs strictly require experience, but students cannot get experience without a job.
2. **Generic Portfolios**: Students often build the same 3 tutorial-based projects (e.g., Todo apps, calculators, weather trackers). These fail to impress recruiters, show no business logic, and do not solve real-world problems.
3. **The Feedback Void**: Self-taught developers lack senior engineering oversight. They don't know if their code is scalable, clean, industry-standard, or secure.
4. **The Language Barrier**: In developing nations, brilliant minds are often held back by a lack of fluency in English, struggling to articulate their technical prowess and failing interviews despite strong coding skills.
5. **Passive AI Reliance**: Existing AI tools (like ChatGPT) encourage passive copying and pasting ("prompt-and-response") rather than active problem-solving, critical thinking, and logical deduction.
6. **Isolated Learning**: Traditional ed-tech platforms trap students in isolated silos. Software engineering is a team sport, yet learning platforms fail to simulate collaborative workspaces.

---

## 🎯 Multi-Layered Impactful Solutions

EKALAVYA tackles this manifold problem through a holistic, active, multi-layered approach:

*   **Layer 1: Deep Skill Auditing (Not Just Parsing)**: Instead of asking "what do you know?", the system deeply parses your raw resume and extracts a latent skills matrix to identify exact industry gaps based on real-time market data.
*   **Layer 2: Hyper-Personalized Project Generation**: The system does not give generic ideas. It generates unique, market-relevant project blueprints (in "The Foundry") tailored specifically to fill the precise gaps found in Layer 1.
*   **Layer 3: Supervised, Supercharged Execution**: EKALAVYA provides an integrated IDE environment where "The Architect" AI agent oversees your code, providing *hints* rather than raw answers, actively forcing you to learn.
*   **Layer 4: Vision-Based Verification**: You cannot fake progress. The AI uses Vision models to visually inspect screenshots of your UI and architecture to verify completion before unlocking the next milestone.
*   **Layer 5: Automated Translation to Value**: Once a project is verified, the AI automatically extracts your achievements and translates them into a professional, STAR-method (Situation, Task, Action, Result) resume ready for PDF export.
*   **Layer 6: Real-time Synchronized Collaboration**: As the first platform of its kind, Ekalavya features "Group Sessions" where users can generate a 6-digit sync code, join a shared Foundry workspace, and build alongside peers under the watchful eye of the Architect Agent.

---

## 🤖 Why is it "Agentic"? (Moving Beyond Prompt-Response)

EKALAVYA is fundamentally different from standard LLM wrappers. It does not use "Prompt-Response" logic; it uses **Stateful Agentic Routing**.

**Standard AI (Prompt-Response):**
*   User: "Give me a project idea."
*   AI: "Build a weather app." *(Interaction dies here, state is lost)*

**EKALAVYA (Agentic AI Logic):**
1. **Autonomous Tool Invocation**: Through the **Model Context Protocol (MCP)**, the AI acts as a central router. When you upload a resume, the LLM autonomously triggers a specific `resume_analyze` tool on the backend, formats the data, extracts JSON schemas, and stores it in the global database state.
2. **Stateful Context Memory**: The AI maintains a continuous, long-term memory of your skills, your current project phase, and your historical struggles. It knows if you struggled with React hooks 3 days ago and alters its guidance accordingly.
3. **Proactive Intervention**: The agents don't wait for your prompt. In "The Foundry," the Architect agent evaluates your milestone progress based on strict criteria and decides internally whether you pass or fail, using **Vision AI** to verify your UI screenshots before you even ask.
4. **Hierarchical Swarm Orchestration**: EKALAVYA utilizes a swarm of specialized agents that talk to each other, not just the user.

---

## 🧩 Detailed Feature Breakdown

### 1. 🧠 AI Career Mentor (The Core Intelligence)
*   **Resume Scanner**: Instant SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis of your technical profile using LLMs.
*   **Smart Chat**: Context-aware career guidance that remembers your entire chat history, project history, and skill gaps.
*   **Strategic Roadmapping**: Personalized learning path suggestions based on your resume gaps compared against live job market data.

### 2. 🏗️ The Foundry (The Project Lab)
*   **AI-Generated Blueprints**: Dynamic project briefs generated based on your skill level, dynamically scaling in difficulty (Easy Start -> Skill Builder -> Tough Challenge).
*   **"The Architect" (AI Mentor)**: Real-time coding guidance and unblocking within the built-in Monaco Code Editor. The Architect acts as a Senior Dev, enforcing standards.
*   **Automated Milestone Verification**: Uses Llama-3.2 Vision AI to verify screenshots of your completed work. You cannot advance to Phase 2 until Phase 1 passes visual inspection.

### 3. 📄 Resume Architect AI
*   **A4 Professional Templates**: Automatically formats your profile into a clean, side-by-side A4 resume optimized for Applicant Tracking Systems (ATS).
*   **Smart Content Generation**: Uses AI to convert your EKALAVYA Lab projects into professional "STAR" method bullet points (e.g., "Architected a scalable Node.js backend...").
*   **Native PDF Export**: High-fidelity PDF export supporting multi-page resumes directly from the browser.

### 4. 👥 Group Sessions (Collaborative Learning)
*   **Sync & Collaborate**: Create a shared workspace and invite friends using a 6-digit access code.
*   **Shared AI Context**: The AI Mentor oversees the entire group, answering questions in a shared context and evaluating the group's collective progress on the project.

### 5. 🌏 Multilingual Cultural Support
*   **Tamil Mode (தமிழ்)**: Toggle the entire AI persona to speak in Tamil mixed with English technical terms. Designed specifically to help rural students bridge the language gap without losing technical precision.

---

## 🏛️ Comprehensive Architecture & Workflow

Ekalavya is built using a modern decoupled architecture, strictly adhering to the **Model Context Protocol (MCP)** standard via the **NitroStack SDK**. 

### The Hierarchical Agent Workflow Diagram

```mermaid
graph TD
    User([👨‍💻 User / Student]) --> |Uploads Resume| UI(React Frontend UI)
    User --> |Writes Code| UI
    User --> |Asks Question| UI

    subgraph "Frontend Layer (Client)"
        UI --> |SSE Connection| Bridge[MCP Client Transport]
    end

    Bridge <==> |Model Context Protocol | Server[NitroStack MCP Server]

    subgraph "Backend Layer (NitroStack MCP Swarm)"
        Server --> Router{Agentic Router}
        
        Router --> |Tool: resume_analyze| ResumeAgent[📄 Resume Agent]
        Router --> |Tool: market_get_recommended| MarketAgent[📈 Market Agent]
        Router --> |Tool: foundry_verify_code| ArchitectAgent[🏗️ Architect Agent]
        Router --> |Tool: ai_chat| ChatAgent[💬 Core Mentor Agent]
        
        ResumeAgent --> |Extracts Skills| DB[(SQLite Database)]
        MarketAgent --> |Reads Skills| DB
        ArchitectAgent --> |Updates Phase| DB
        ChatAgent --> |Reads History| DB
        
        ArchitectAgent --> VisionLLM(Llama-3.2-Vision)
        ResumeAgent --> LogicLLM(Llama-3.3-70b)
        MarketAgent --> LogicLLM
    end
```

### How MCP is Properly Implemented

Instead of using traditional REST APIs (`fetch`, `axios`), Ekalavya implements the **Model Context Protocol (MCP)**.
1. **Server-Sent Events (SSE)**: The backend (`ekalavya-2.0`) exposes an SSE stream at `http://localhost:3000/sse`.
2. **Context Provider**: The React frontend uses `@modelcontextprotocol/sdk` to establish a persistent connection.
3. **Tool Calls**: When the user performs an action (e.g., clicks "Start Project"), the frontend dispatches an MCP `callTool` request (e.g., `foundry_start_project`).
4. **Agent Execution**: The NitroStack server routes this to the specific Agent module, which executes the business logic, interacts with the LLM, reads/writes to Prisma, and returns a structured JSON response back through the MCP stream.

---

## 💻 Technical Stack Tabulation

| Layer | Technology / Tool | Purpose & Justification |
| :--- | :--- | :--- |
| **Frontend UI** | React (Vite) | Lightning-fast HMR, component-based architecture for complex dashboards. |
| **Styling** | Tailwind CSS & Framer Motion | Rapid UI prototyping, glassmorphism aesthetics, and fluid micro-animations. |
| **Editor Integration**| Monaco Editor | Provides a native VS Code-like coding experience directly in the browser. |
| **Client Transport** | `@modelcontextprotocol/sdk` | Maintains persistent SSE connections and handles tool-call routing from the client. |
| **Backend Core** | NitroStack TypeScript SDK | Official framework for building robust, modular MCP servers and agent tools. |
| **Database** | SQLite & Prisma ORM | Lightweight, zero-config relational database with strict TypeScript schema safety. |
| **AI Models (Logic)**| Llama-3.3-70b | High-reasoning open-source model for complex career strategy and code analysis. |
| **AI Models (Vision)**| Llama-3.2-90b-vision | Multimodal capability to visually verify UI screenshots and wireframes. |

---

## ⚙️ Environment Setup & Installation

### Prerequisites
*   Node.js (v18 or v20.x recommended)
*   `npm` or `pnpm`
*   Nitro Studio (for deployment and local MCP routing)

### 1. Backend Setup (The MCP Server)
The core agentic logic lives in the `ekalavya-2.0` directory.

```bash
# Navigate to the backend directory
cd ekalavya-2.0

# Install dependencies
npm install

# Start the MCP Server via NitroStack CLI in Production HTTP mode
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

## 🚀 Deployment (NitroCloud)

1. Open the **Nitro Studio** desktop app.
2. Click **Add Server** -> **Nitro Project**.
3. Select the `ekalavya-2.0` folder.
4. Click **Deploy to NitroCloud** in the Studio header to deploy the MCP server globally.
5. Once deployed, update your frontend `MCPProvider.jsx` to point to the new Live URL instead of `localhost`.
