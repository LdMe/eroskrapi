import express from 'express';
import scrapController from './controllers/scrapController.js';
const app = express();

app.get('/', async (req, res) => {
    const content = await scrapController.getProducts('https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059710-verduras-y-hortalizas/')
    res.send(content);
    }
);

app.listen(3002, () => {
    console.log('Example app listening on port 3000!');
    }
);