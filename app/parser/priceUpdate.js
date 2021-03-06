const https = require('https');
const http = require('http');
const iconv = require('iconv-lite');
const regex = /(<([^>]+)>)/ig; // RegExp for removing html tags

module.exports = function(shop, db) {

    const protocol = shop.priceUrl.match('https://') ? https : http;

    const promise =  new Promise((resolve, reject) => {
        protocol.request(shop.priceUrl, (res) => {
            let src = '';
            let items = [];
            res.on('data', (chunk) => {
                const decodedChunk = iconv.decode(chunk, 'Windows-1251');
                src += decodedChunk;
            });
            res.on('end', () => {
                const lines = src.split('\n');
                const head = lines[0].split(shop.delimiter);
                const id = head.indexOf(shop.columns.id);
                const name = head.indexOf(shop.columns.name);
                const price = head.indexOf(shop.columns.price);
                lines.forEach((line, index) => {
                    if (!line.trim() || index === 0) return; // Return if line is empty, do not parse the head
                    const sepLine = line.split(shop.delimiter);
                    const item = { // remove tags and form an item
                        id: sepLine[id].replace(regex, '').trim(),
                        name: sepLine[name].replace(regex, '').trim(),
                        price: sepLine[price].replace(regex, '').trim()
                    };
                    items.push(item);
                });

                db.collection(shop.name).drop(); // Drop the cillection if already exists
                items.forEach(item => {
                    db.collection(shop.name).insert(item, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                    })
                });
                resolve(`Collection ${shop.name} has been successfully created (updated)`);
            });
        }).end();
    }).then(res => {
        console.log(res);
        return res;
    });
    
    return promise;

}