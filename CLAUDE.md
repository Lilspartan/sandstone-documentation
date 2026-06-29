# Sandstone Documentation

Docusaurus-based documentation site for the Sandstone library with interactive code snippets.

## Build Commands

```bash
npm start      # Dev server with hot reload
npm run build  # Production build
npm run serve  # Serve production build locally
```

## Code Snippets

### Regular Snippets (Static)

Standard markdown code blocks - syntax highlighted but not executed:

````md
```ts
import { MCFunction } from 'sandstone'
```
````

Import paths don't need to resolve since the code is never run.

### Interactive Snippets (Live)

Code blocks with the `sandstone` language identifier render as live editors:

````md
```ts sandstone height=200
MCFunction('hello', () => {
  say('Hello world!')
})
```
````

**Important rules for interactive snippets:**
- Do NOT include import statements - they're auto-generated based on detected usage
- Can only use exports from the main `'sandstone'` entry point
- Cannot use subpath imports like `'sandstone/pack'` or deep imports
- The `height` attribute sets the editor height in pixels

## Architecture

### Interactive Snippet Flow

1. `InteractiveSnippet.tsx` wraps the snippet (handles SSR)
2. `InteractiveSnippetClient.tsx` renders when visible (lazy loading)
3. `Editor.tsx` provides Monaco editor with sandstone intellisense
4. On code change (debounced), `detectUsedExports()` finds sandstone identifiers
5. Import statement is auto-generated and prepended
6. `compiler.ts` calls the playground's `compilePack()`
7. `CodeOutput.tsx` displays the generated mcfunction files

### Key Files

| File | Purpose |
|------|---------|
| `src/components/InteractiveSnippet.tsx` | SSR wrapper, lazy loads client component |
| `src/components/InteractiveSnippetClient.tsx` | Editor + output, handles compilation |
| `src/components/Editor.tsx` | Monaco editor with sandstone types |
| `src/components/CodeOutput.tsx` | Displays generated files |
| `src/utils/compiler.ts` | Loads playground and calls `compilePack()` |
| `plugins/get-sandstone-files/` | Loads `.d.ts` files for Monaco intellisense |

### Runtime Bundles

Interactive snippets load runtime bundles from unpkg at runtime:

| Package | URL | Purpose |
|---------|-----|---------|
| `playground` | `https://unpkg.com/@sandstone-mc/playground@latest/dist/main.js` | Compiler runtime |
| `sandstone` | `https://unpkg.com/sandstone/dist/browser/sandstone.esm.js` | Bundled via playground's configure |

The compiler (`compiler.ts`) imports playground from unpkg. The playground loads the sandstone bundle at runtime.

## Plugin: get-sandstone-files

Located at `plugins/get-sandstone-files/index.js`, this plugin loads sandstone type definitions for Monaco editor intellisense.

**In development:** Reads from local `../sandstone/dist/` if available.

**In production:** Fetches from unpkg:
- Uses `?meta` endpoint to list all `.d.ts` files
- Includes `package.json` files for proper module boundary resolution
- Creates a synthetic root `package.json` with exports field for Monaco

The plugin exposes data via `usePluginData('get-sandstone-files')`:
- `sandstoneFiles`: Array of `[content, fileName]` tuples for Monaco
- `sandstoneExports`: Array of export names for auto-import detection

## Boilerplate Filtering

Interactive snippets filter out boilerplate files from output:
- `load` and `__sandstone__` namespaces
- `__init__` functions
- `minecraft:load` tag

This keeps the output focused on user-created resources.

## Rate Limiting

Compilation is debounced (500ms) and rate-limited (5s between builds) to avoid overwhelming the browser with rapid rebuilds while typing.

## Monaco Recovery

The `MonacoRecoveryContext` handles Monaco editor crashes gracefully, allowing users to continue editing without page reload.
