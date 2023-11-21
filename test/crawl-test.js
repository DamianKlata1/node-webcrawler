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
                    <a href="/xyz.html">Blog</a>
                    <a href="/xyzy.html">Blog</a>
                    <a href="https://www.boot.dev.pl">Blog</a>
                </body>
            </html>
        `;
        const baseURL = "https://www.google.com";
        const urls = getUrlsFromHtml(htmlBody, baseURL);
        assert.strictEqual(3, urls.length);
        assert.strictEqual("https://www.google.com/xyz.html", urls[0]);
        assert.strictEqual("https://www.google.com/xyzy.html", urls[1]);
        assert.strictEqual("https://www.boot.dev.pl/", urls[2]);
    });
    
});

describe('notGettingInvalidUrls', function () {
    it('should not return invalid URLs', function () {
        const htmlBody = `
            <html>
                <body>
                    <a href="http//www.google.com">Google</a>
                    <a href="invALID">Blog</a>
                    <a href="invALID">Blog</a>
                    <a href="invALID">Blog</a>
                </body>
            </html>
        `;
        const baseURL = "https://www.google.com";
        const urls = getUrlsFromHtml(htmlBody, baseURL);
        assert.strictEqual(0, urls.length);
    }
    );
});    