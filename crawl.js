const jsdom = require("jsdom");
const { JSDOM } = jsdom;




function normalizeUrl(string){
    const url = new URL(string);
    let normalizedUrl = url.hostname.replace("www.", "")+url.pathname;
    if (normalizedUrl[normalizedUrl.length-1] === "/"){
        normalizedUrl = normalizedUrl.slice(0, -1);
    }
    return normalizedUrl;
}

function getUrlsFromHtml(htmlBody,baseURL){
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;
    const links = document.querySelectorAll("a");
    const urls = [];
    for (let i = 0; i < links.length; i++){
        let href = links[i].href;
        if (href[0] === "/"){
            href = baseURL+href;
        }
        try{
            const url = new URL(href);
            urls.push(url.href);
        }catch(error){
            console.log("error with url: " + href + " "+error.message);
        }
        
    }
    return urls;

}

async function crawlPage(baseURL, currentURL, visitedURLs={}){
    const baseURLobj = new URL(baseURL);
    const currentURLobj = new URL(currentURL);
    if(currentURLobj.hostname !== baseURLobj.hostname){
        return visitedURLs;
    }

    const normalizedCurrentURL = normalizeUrl(currentURLobj);

    if(visitedURLs.hasOwnProperty(normalizedCurrentURL)){
        visitedURLs[normalizedCurrentURL]++;
        return visitedURLs;
    }
    else{
        visitedURLs[normalizedCurrentURL] = 1;
    }

    try{
        const response = await fetch(currentURL);
        if (!response.ok) {
            throw new Error(`Http error: ${response.status}`);
        }
        if(!response.headers.get("content-type").includes("text/html")){
            throw new Error("Content type is not HTML");
        }
        const htmlBody = await response.text();

        console.log(`Crawling ${currentURL}...`)
        const urls = getUrlsFromHtml(htmlBody, baseURL);
        for (let i = 0; i < urls.length; i++){
            visitedURLs = await crawlPage(baseURL, urls[i], visitedURLs);
        }
        
    }
    catch(error){
        console.log(error.message);
    }
    return visitedURLs;
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
}