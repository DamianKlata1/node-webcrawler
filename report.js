function printReport(pages){
    const sortedPages = sortPages(pages);
    let report = "";
    for(const page of sortedPages){
        report += `Found ${page[1]} links to ${page[0]}\n`;
    }
    return report;
}

function sortPages(pages){
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    return sortedPages;
}

module.exports = {
    printReport,
    sortPages
}