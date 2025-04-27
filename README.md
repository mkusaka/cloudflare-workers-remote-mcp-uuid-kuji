# cloudflare-workers-remote-mcp-uuid-kuji

A remote MCP (Model Context Protocol) server built on Cloudflare Workers that provides tools for generating UUIDs. It serves as a standardized interface for client applications (especially AI assistants and other tools) to access UUID generation functionality.

## Overview

The `cloudflare-workers-remote-mcp-uuid-kuji` project acts as a bridge between client applications and UUID generation functionality, providing a standardized interface for generating UUIDs.

Key features:

- Provides UUID generation tools
- Runs on Cloudflare Workers
- Integrates with AI assistants through the MCP protocol
- Available as a remote MCP server

## Usage

### Deployment

To deploy to Cloudflare Workers:

```bash
wrangler deploy
```

After deployment, it will be accessible at a URL like:
`uuid.<your-account>.workers.dev/sse`

### Integration with Cloudflare AI Playground

You can connect to the MCP server from Cloudflare AI Playground (a remote MCP client):

1. Go to https://playground.ai.cloudflare.com/
2. Enter your deployed MCP server URL (`uuid.<your-account>.workers.dev/sse`)
3. You can now use MCP tools directly from the Playground

### Integration with MCP-compatible Clients

#### Integration with Anthropic Claude Desktop

To connect to the remote MCP server from Claude Desktop:

1. Follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and open Settings > Developer > Edit Config in Claude Desktop
2. Add the following configuration:

```json
{
  "mcpServers": {
    "uuid": {
      "url": "https://uuid.<your-account>.workers.dev/sse"
    }
  }
}
```

#### Cursor

Add the following to your Cursor configuration file (`~/.cursor/config.json`):

```json
{
  "mcpServers": {
    "uuid": {
      "url": "https://uuid.polyfill.workers.dev/sse"
    }
  }
}
```

#### VSCode (Cline Extension)

[Cline](https://github.com/saoudrizwan/cline) is a VS Code extension that allows you to connect MCP-compatible servers with Claude:

1. Open your Cline MCP settings file:
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Windows: `%APPDATA%/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Linux: `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Add the following configuration:

```json
{
  "mcpServers": {
    "uuid": {
      "url": "https://uuid.<your-account>.workers.dev/sse"
    }
  }
}
```

### Available Tools

This MCP server provides the following tools:

- `uuid-kuji` - Generates a new UUID

## Development

```bash
# Start the development server
wrangler dev

# Format code
biome format --write

# Run and fix linting issues
biome lint --fix
```

## Architecture

This server follows the Model Context Protocol (MCP) architecture to provide a standardized way to access UUID generation functionality.

1. Uses Cloudflare Workers infrastructure
2. Leverages Durable Objects for state management
3. Real-time communication through SSE endpoints

## Customization

You can add your own tools using `this.server.tool(...)` in the `init()` method of `src/index.ts`.

## License

MIT
