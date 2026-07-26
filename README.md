# EKALAVYA (Career AI) 🌱

**EKALAVYA** is an AI-Powered Career Acceleration Ecosystem designed to bridge the gap between learning and industry readiness. It uses a multi-agent AI system via the **Model Context Protocol (MCP)** to assess skills, generate personalized portfolio projects, and verify work through simulated code reviews and vision analysis.

---

## 🌟 Key Features

### 1. 🧠 AI Career Mentor
*   **Resume Scanner**: Instant SWOT analysis of your technical profile using LLMs.
*   **Smart Chat**: Context-aware career guidance that remembers your history.
*   **Strategy**: Personalized learning path suggestions based on your resume gaps.

### 2. 🏗️ The Foundry (Project Lab)
*   **AI-Generated Projects**: Dynamic project briefs generated based on your skill level and market demand.
*   **"The Architect" (AI Mentor)**: Real-time coding guidance and unblocking within the built-in Monaco Editor.
*   **Automated Verification**: Uses Vision AI to verify screenshots of your completed work before unlocking the next milestone.

### 3. 📄 Resume Architect AI
*   **A4 Professional Template**: Automatically formats your profile into a clean, side-by-side A4 resume.
*   **Smart Content**: Uses AI to convert your EKALAVYA Lab projects into professional "STAR" method bullet points.
*   **Native PDF Export**: High-fidelity PDF export supporting multi-page resumes.

### 4. 🌏 Multilingual Support
*   **Tamil Mode (தமிழ்)**: Toggle the entire AI persona to speak in Tamil mixed with English technical terms.
*   **Cultural Context**: Designed to help rural students bridge the language gap without losing technical precision.

### 5. 💼 Job Hub
*   **Smart Match**: Filters jobs based on your current skill set and project portfolio.

---

## 🛠️ Tech Stack & Architecture

Ekalavya is built using a modern decoupled architecture powered by **NitroStack**.

### Backend (NitroStack MCP Server)
*   **Framework**: Official **NitroStack TypeScript SDK** (`@nitrostack/core`)
*   **Modules**: AI, Foundry, Market, Research, Resume (exported as standard MCP Tools).
*   **Database**: Local SQLite via Prisma ORM (`dev.db`).
*   **AI Integrations**: Llama-3.3-70b (Logic) & Llama-3.2-90b-vision (Image Verification).

### Frontend (React Client)
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS + Framer Motion
*   **MCP Bridge**: Uses `@modelcontextprotocol/sdk` to natively communicate with the NitroStack MCP Server via SSE.

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (v18 or v20.x recommended)
*   `npm` or `pnpm`
*   Nitro Studio (for deployment and local MCP chat testing)

### 1. Backend Setup (MCP Server)
The backend is an official NitroStack MCP server located in the `ekalavya-2.0` directory.

```bash
cd ekalavya-2.0

# Install dependencies
npm install

# Start the MCP Server via NitroStack CLI
npm run dev
# The server will start on http://localhost:3000/sse
```

### 2. Frontend Setup (React UI)
Open a new terminal for the frontend UI.

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# The UI will start on http://localhost:5173
```

---

## 🚀 Deployment (NitroCloud)

1. Open **Nitro Studio** desktop app.
2. Click **Add Server** -> **Nitro Project**.
3. Select the `ekalavya-2.0` folder.
4. Click **Deploy to NitroCloud** in the Studio header to deploy the MCP server.

---

## 🤝 Contribution
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request