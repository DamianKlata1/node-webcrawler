function printReport(pages){
    for(const page of Object.entries(pages)){
        console.log(`Found ${page[1]} links to ${page[0]}`);
    }
}

module.exports = {
    printReport
}