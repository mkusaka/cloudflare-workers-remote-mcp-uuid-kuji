import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ExecutionContext } from "@cloudflare/workers-types";
import { v4 as uuidv4 } from "uuid";

// Define your environment variables interface
interface Env {
	// Add your environment variables here if needed
}

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "uuid omikuji",
		version: "1.0.0",
	});

	async init() {
		// Simple addition tool
		this.server.tool("uuid-kuji", "generate uuid kuji for user", async () => ({
			content: [{ type: "text", text: String(uuidv4()) }],
		}));
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			// @ts-ignore
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			// @ts-ignore
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
