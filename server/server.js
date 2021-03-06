const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');//обработчик всех запросов корзины

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);


// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
app.get('/api/product/:id', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let find = JSON.parse(data).find(el => el.id_product === +req.params.id);
            res.send(JSON.stringify(find, null, 4));
        }
    })
});


const port = process.env.PORT || 3033;
app.listen(port, () => console.log(`Listen on port ${port}...`));