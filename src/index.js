import express from 'express';
import scrapController from './controllers/scrapController.js';
const app = express();

const secciones = {
    "verduras": "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059710-verduras-y-hortalizas/",
    "frutas": "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059699-frutas",
    "carne":"https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059746-carnes-y-aves/"
}
app.get('/', async (req, res) => {
    const {seccion } = req.query;
    const content = await scrapController.getProducts(secciones[seccion])
    res.send(content);
    }
);

app.listen(3002, () => {
    console.log('Example app listening on port 3000!');
    }
);