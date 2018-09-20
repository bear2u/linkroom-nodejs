var fs = require('fs');
var getUrls = require('get-urls');
var ogs = require('open-graph-scraper');

fs.readFile('./chat.txt', 'utf8', (err, data) => {
    if(err != null) {
        return console.error(err);        
    }
    var links = Array.from(getUrls(data));
    var count = 0;
    links.forEach( (value) => {
        if( count > 1) {
            return false;
        }

        getOtg(value);
        
        count++;            
    });    
        
    writeFile(links);    
});

function getOtg(url) {
    var options = {'url': url, 'headers': { 'accept-language': 'en' }};
    ogs(options)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        }) 
}

function writeFile(data) {
    fs.writeFile('./result.txt', data.join(',1' + '\n'), (err) => {
        console.log(err);
    });
}