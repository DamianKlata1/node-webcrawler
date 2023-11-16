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
        let url = links[i].href;
        if (url[0] === "/"){
            url = baseURL+url;
        }
        url = normalizeUrl(url);
        urls.push(url);
    }
    return urls;

}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml
}