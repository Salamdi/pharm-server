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

}