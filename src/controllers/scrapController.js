/*
* Clase scrapController
* función: obtener los datode una página web usando puppeteer y jsdom
*/
import Scraper from "../utils/scraper.js";
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
        const content = await scraper.scrape(url, 15);
        await scraper.close();
        return content;
    }
    static async getProducts(url) {
        const content = await scrapController.getPage(url);
        const products = [];
        const dom = new JSDOM(content);
        const productElements = dom.window.document.querySelectorAll(".product-item");
        productElements.forEach((productElement) => {
            const name = productElement.querySelector(".product-title").textContent.trim();
            const price = productElement.querySelector(".price-offer-now").textContent.trim();
            const product = {
                name,
                price,
            };
            products.push(product);
        }
        );
        return products;
    }

}

export default scrapController;