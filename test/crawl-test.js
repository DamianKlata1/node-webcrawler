const assert = require('assert');
const { normalizeUrl,getUrlsFromHtml } = require('../crawl');


describe('normalizeUrl', function () {
    it('should return normalized URL', function () {
        const urlToNormalize = normalizeUrl("https://www.google.com");
        const urlToNormalize2 = normalizeUrl("http://www.google.com/");
        const urlToNormalize3 = normalizeUrl("https://blog.boot.dev/path/");
        const urlToNormalize4 = normalizeUrl("http://Blog.boot.dev/path");
        assert.strictEqual("google.com", urlToNormalize);
        assert.strictEqual("google.com", urlToNormalize2);
        assert.strictEqual("blog.boot.dev/path", urlToNormalize3);
        assert.strictEqual("blog.boot.dev/path", urlToNormalize4);
    });
});

describe('getUrlsFromHtml', function () {
    it('should return all URLs from HTML', function () {
        const htmlBody = `
            <html>
                <body>
                    <a href="https://www.google.com">Google</a>
                    <a href="http://www.google.com/">Google</a>
                    <a href="https://blog.boot.dev/path/">Blog</a>
                    <a href="http://Blog.boot.dev/path">Blog</a>
                    <a href="/xyz.html">Blog</a>
                </body>
            </html>
        `;
        const baseURL = "https://www.google.com";
        const urls = getUrlsFromHtml(htmlBody, baseURL);
        assert.strictEqual(5, urls.length);
        assert.strictEqual("google.com", urls[0]);
        assert.strictEqual("google.com", urls[1]);
        assert.strictEqual("blog.boot.dev/path", urls[2]);
        assert.strictEqual("blog.boot.dev/path", urls[3]);
        assert.strictEqual("google.com/xyz.html", urls[4]);
    });
});