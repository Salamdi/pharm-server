const path = require('path');
const fs = require('fs')
const priceUpdate = require('../parser/priceUpdate');

module.exports = function(app, db) {

    // GET an item
    app.get('/:shopName/:productId', (req, res) => {
        db.collection(req.params['shopName'])
            .findOne({id: req.params['productId']}, (err, item) => {
                if (err) {
                    res.send(err);
                } else {
                    if (item) {
                        res.send(item)
                    } else {
                        res.writeHead(404);
                        res.end('no such id');
                    }                        
                }
            });
    });

    // POST. Update the price
    app.post('/:shopName', (req, res) => {

        const confObjects = fs.readdirSync(path.resolve(__dirname, '..', 'parser/shops'))
            .map(fileName => JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'parser/shops', `${fileName}`))));
        const shop = confObjects.find(conf => conf.name === req.params.shopName);
        if (shop) {
            priceUpdate(shop, db).then(res.end(`${shop.name} price has been successfully updated`));
        } else {
            res.writeHead(404);
            res.end('shop has not been found');
        }
        
    })

}