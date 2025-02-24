# Claude Codebase Guidelines

## Build & Test Commands
- Build: `npm run build`
- Dev: `npm run dev` (starts Next.js with Turbo and Spotlight sidecar)
- Lint: `npm run lint` (fix with `npm run lint:fix`)
- Type Check: `npm run check-types`
- Run Tests: `npm run test` (Vitest)
- Run Single Test: `npm run test -- src/path/to/file.test.ts`
- E2E Tests: `npm run test:e2e` (Playwright)
- Storybook: `npm run storybook`
- DB Management: `npm run db:generate`, `npm run db:studio`
- Commit with linting: `npm run commit`

## Code Style Guidelines
- Use TypeScript with strict typing
- Import path aliases use `@/*` prefix for src directory
- Use `type` instead of `interface`
- Follow brace style: 1tbs (opening brace on same line)
- Classes/Components: PascalCase, functions/variables: camelCase
- Handle errors with proper try/catch blocks
- Use React Hook Form with Zod for validation schemes
- Follow Next.js App Router patterns (React Server Components)
- Use descriptive test names with proper describe/it nesting
- Use Next-intl for internationalization
- Use Drizzle ORM for database operations
- Maintain test coverage for all components and utilities
- Commits must follow conventional commits format
