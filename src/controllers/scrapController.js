/*
* Clase scrapController
* función: obtener los datode una página web usando puppeteer y jsdom
*/
import Scraper from "../scraper/scraper.js";
import Parser from "../parser/parser.js";
import { JSDOM } from "jsdom";

class scrapController {
    /**
     * Obtiene el contenido de una página web.
     * @async
     * @param {string} url - URL de la página web.
     * @returns {string} - Contenido de la página web.
     */
    static async getPage(url) {
        const scraper = new Scraper();
        await scraper.init();
        const content = await scraper.scrape(url, 2);
        await scraper.close();
        return content;
    }
    static parseProducts(content) {
        const parser = new Parser(content);
        const products = parser.getProducts();
        return products;
    }
    static async getProducts(url) {
        const content = await scrapController.getPage(url);
        const products = scrapController.parseProducts(content);
        return products;
    }

}

export default scrapController;