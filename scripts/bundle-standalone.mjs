/**
 * Inlines the build into one self-contained HTML file that runs anywhere,
 * including straight off disk. Run it with:  npm run build:standalone
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist-standalone";
const assets = readdirSync(join(dist, "assets"));
const js = assets.find((f) => f.endsWith(".js"));
const css = assets.find((f) => f.endsWith(".css"));
if (!js) throw new Error(`No JS bundle in ${dist}/assets — run the build first.`);

let html = readFileSync(join(dist, "index.html"), "utf8");

// Drop the emitted tags, then re-add the code inline.
html = html
  .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
  .replace(/<link[^>]+href="[^"]*assets\/[^"]+\.css"[^>]*>/g, "")
  .replace(/<script[^>]+src="[^"]*assets\/[^"]+\.js"[^>]*><\/script>/g, "");

// A replacer FUNCTION is required: bundles contain "$&" and "$1" sequences,
// which a replacement string would treat as capture-group references.
if (css) {
  const styles = readFileSync(join(dist, "assets", css), "utf8");
  html = html.replace("</head>", () => `<style>${styles}</style>\n  </head>`);
}

// No type="module": this bundle is an IIFE, so a classic script works on file://
const code = readFileSync(join(dist, "assets", js), "utf8");
html = html.replace("</body>", () => `  <script>${code}</script>\n  </body>`);

writeFileSync("standalone.html", html);
console.log(`standalone.html written (${Math.round(html.length / 1024)} kB)`);
