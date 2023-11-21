const {crawlPage} = require("./crawl.js"); 
const {printReport} = require('./report.js'); 

async function main() {
    const args = process.argv.slice(2);
    if(args.length != 1) {
        console.log("Error: Please provide a URL to crawl");
    }
    else{
        const pages = await crawlPage(args[0],args[0],{});
        console.log(`Crawler is running with ${args[0]}`);
        printReport(pages);
    }
}

main();
