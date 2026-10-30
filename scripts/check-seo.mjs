/** Run against a production server: SEO_BASE_URL=http://localhost:3000 npm run seo:check */
import assert from "node:assert/strict";

const base = process.env.SEO_BASE_URL || "http://localhost:3000";
const routes = ["/", "/about", "/teams", "/alumni", "/past-events", "/gallery"];

function tag(html, pattern) {
  return html.match(pattern)?.[0] || "";
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", base));
assert.equal(sitemapResponse.status, 200, "sitemap must be available");
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

for (const path of routes) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path} must return 200`);
  const html = await response.text();
  const title = tag(html, /<title>[^<]+<\/title>/i);
  const description = tag(html, /<meta name="description"[^>]+>/i);
  const robots = tag(html, /<meta name="robots"[^>]+>/i);
  const canonical = tag(html, /<link rel="canonical"[^>]+>/i);

  assert.ok(title, `${path} needs a title`);
  assert.ok(description, `${path} needs a description`);
  assert.ok(robots, `${path} needs a robots directive`);
  assert.match(html, /<h1\b/i, `${path} needs a server-rendered h1`);
  assert.match(html, /<main\b/i, `${path} needs a main landmark`);

  if (robots.includes("noindex")) {
    assert.ok(robots.includes("follow"), `${path} should allow link discovery`);
    assert.equal(
      canonical,
      "",
      `${path} is draft and must not expose a canonical`,
    );
    assert.ok(
      !sitemapUrls.some((url) => new URL(url).pathname === path),
      `${path} must not be in sitemap`,
    );
  } else {
    assert.ok(
      robots.includes("index"),
      `${path} needs an explicit index directive`,
    );
    assert.ok(canonical, `${path} needs a canonical URL`);
    assert.doesNotMatch(
      html,
      /fictional (?:profiles|demonstration)|sample (?:entries|event|data)|illustrative statistics|unverified stock imagery/i,
      `${path} still appears to contain demonstration content`,
    );
    assert.ok(
      sitemapUrls.some((url) => new URL(url).pathname === path),
      `${path} must be in sitemap`,
    );
  }
  console.log(`✓ ${path}: ${title.replace(/<\/?title>/g, "")}`);
}

const oldTeam = await fetch(new URL("/team", base), { redirect: "manual" });
assert.equal(oldTeam.status, 308, "/team must permanently redirect");
assert.equal(new URL(oldTeam.headers.get("location"), base).pathname, "/teams");

const robotsResponse = await fetch(new URL("/robots.txt", base));
assert.equal(robotsResponse.status, 200);
assert.match(await robotsResponse.text(), /Allow: \/(?:\s|$)/);
console.log("✓ Team redirect, robots.txt, and sitemap");
