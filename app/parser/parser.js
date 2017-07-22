const priceUpdate = require('./priceUpdate');
const fs = require('fs');
const path = require('path');

module.exports = function(db) {

    let shops = [];
    const files = fs.readdirSync(path.resolve(__dirname, 'shops'));
    files.forEach(file => {
        shops.push(JSON.parse(fs.readFileSync(path.resolve(__dirname, 'shops', file))));
    });

    let promises = [];

    shops.forEach(shop => promises.push(priceUpdate(shop, db)));

    return promises;

}