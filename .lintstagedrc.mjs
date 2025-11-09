export default {
	// Lint and format TypeScript, JavaScript, and JSON files
	"*.{ts,tsx,js,jsx,json}": ["bun lint:fix"],

	// Typecheck only the web package when its files change
	"packages/web/**/*.{ts,tsx}": () => "cd packages/web && bun check",
};
