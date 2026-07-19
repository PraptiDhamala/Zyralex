// Ambient module declarations for pdfjs-dist subpaths.
//
// pdfjs-dist does not ship clean TypeScript type declarations for every
// import path (especially the legacy build used for bundlers like Metro
// that don't fully support ESM/import.meta). These declarations just tell
// TypeScript "trust me, this module exists" so `tsc` stops raising
// "Cannot find module" (TS2307) errors. They do not affect anything at
// runtime — Metro resolves the actual JS file completely separately.
//
// IMPORTANT: only declare the exact paths your code actually imports.
// This project currently imports the CommonJS legacy build:
//   pdfjs-dist/legacy/build/pdf.js
// If you ever switch back to the .mjs build, update this file to match.

declare module 'pdfjs-dist/legacy/build/pdf.js' {
  const pdfjsLib: any;
  export = pdfjsLib;
}

// Only needed if you ever import the worker directly in code
// (most setups just point GlobalWorkerOptions.workerSrc at a URL string,
// which doesn't require a declaration at all).
declare module 'pdfjs-dist/legacy/build/pdf.worker.js';
declare module 'pdfjs-dist/legacy/build/pdf.mjs' {
    export * from 'pdfjs-dist';
}