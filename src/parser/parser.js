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
            const image = productElement.querySelector(".product-img").src;
            const product = {
                name,
                price,
                image
            };
            products.push(product);
        }
        );
        return products;
    }
}

export default Parser;