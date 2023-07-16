import {JSDOM} from "jsdom";


class Parser {
    constructor(html){
        this.dom = new JSDOM(html);

    }
    getProducts(){
        const products = [];
        const productElements = this.dom.window.document.querySelectorAll(".product-item");
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

export default Parser;