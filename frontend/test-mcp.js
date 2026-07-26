import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

async function run() {
  console.log("Connecting...");
  const transport = new SSEClientTransport(new URL("http://localhost:3000/sse"));
  const client = new Client({ name: "test", version: "1.0.0" }, { capabilities: {} });
  await client.connect(transport);
  console.log("Connected. Calling tool...");
  try {
    const res = await client.callTool({
      name: "foundry_get_project",
      arguments: {
        projectId: 1
      }
    }, { timeout: 60000 });
    console.log("Response:", res.content[0].text);
    console.log("Response:", res.content[0].text);
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}
run();
