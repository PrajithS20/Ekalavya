import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const MCPContext = createContext();

export function useMCP() {
  return useContext(MCPContext);
}

export function MCPProvider({ children }) {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initClient = async () => {
      try {
        const transport = new SSEClientTransport(new URL("http://localhost:3000/sse"));
        const mcpClient = new Client(
          { name: "ekalavya-frontend", version: "1.0.0" },
          { capabilities: {} }
        );
        
        await mcpClient.connect(transport);
        setClient(mcpClient);
        setIsConnected(true);
        console.log("Connected to MCP Server!");
      } catch (error) {
        console.error("Failed to connect to MCP Server:", error);
      }
    };

    initClient();
  }, []);

  return (
    <MCPContext.Provider value={{ client, isConnected }}>
      {children}
    </MCPContext.Provider>
  );
}
