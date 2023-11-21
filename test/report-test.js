const assert = require('chai');
const {sortPages,printReport} = require('../report');


describe('sortPages', function () {
    it('should return pages sorted by times visited', function () {
        const pagesToSort = {
            "blog.boot.dev/index.html": 1,
            "blog.boot.dev/path": 3,
            "blog.boot.dev": 2
        };
        const pagesShouldLookLike = [
            ["blog.boot.dev/path", 3],
            ["blog.boot.dev", 2],
            ["blog.boot.dev/index.html", 1]
        ];
        const sortedPages = sortPages(pagesToSort);
        assert.expect(sortedPages).to.deep.equal(pagesShouldLookLike);
    });
});

describe('printReport', function () {
    it('should return formatted report based on given pages', function () {
        const pages = {
            "blog.boot.dev/index.html": 1,
            "blog.boot.dev/path": 3,
            "blog.boot.dev": 2
        };
        const reportOfPages = printReport(pages);
        const reportOfPagesShouldLookLike = "Found 3 links to blog.boot.dev/path\nFound 2 links to blog.boot.dev\nFound 1 links to blog.boot.dev/index.html\n";
        assert.expect(reportOfPages).to.equal(reportOfPagesShouldLookLike);
    });
});
