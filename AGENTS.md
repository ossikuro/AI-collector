# AGENTS.md

## Project

This project is `AI-collector`: a desktop/web app for collecting and organizing AI services/providers.

The user is learning frontend development, so explain non-obvious TypeScript, React, Vite, Electron, and project-structure decisions in simple language.

## Tech stack

- React
- TypeScript
- Vite
- SCSS Modules
- JSON-based provider data
- Electron is planned/installed for desktop app support
- Formatting: Prettier
- Linting: ESLint

## Important commands

Use npm.

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build project: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`
- Format files: `npm run format` if this script exists

Before finishing a coding task, run at least:

```bash
npm run build
```

If lint script exists, also run:

```bash
npm run lint
```

## Project rules

- Do not replace JSON provider files with complex TypeScript data unless explicitly asked.
- Provider data should stay readable and easy to edit manually.
- Prefer simple architecture over abstract/flexible architecture.
- Do not add new libraries without explaining why they are needed.
- Do not rename folders or move files unless the task directly requires it.
- Do not delete generated starter files without explaining what they are for.
- Keep components small and understandable.
- Use SCSS Modules for component styles.
- Use clear names, not clever names.

## Provider registry rules

Provider data is stored in JSON.

When importing JSON into TypeScript, keep the reading layer simple and typed.

If TypeScript cannot infer JSON shape correctly, use explicit types in the registry file, but do not duplicate all provider data in TypeScript.

## Communication style

When making changes:

1. Briefly explain what will be changed.
2. Change only the files needed for the task.
3. After changes, summarize:

   - what files changed;
   - why they changed;
   - which command was used to verify the result;
   - whether there are remaining errors.

Explain code in beginner-friendly Russian when the user asks “что это значит” or “расшифруй”.

## Documentation files

Additional project notes live in:

- `docs/agent/PROJECT_STATE.md`
- `docs/agent/PROJECT_STRUCTURE.md`
- `docs/agent/TECH_STACK.md`
- `docs/agent/PACKAGE_NOTES.md`
- `docs/agent/PROJECT_COMMANDS.md`

Read them before large changes.
