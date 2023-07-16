
import Parser from "../../src/parser/parser.js";
import { promises as fs } from "fs";

let html;
beforeAll(async () => {
    html = await fs.readFile("test_2.html");
});
describe("parser", () => {
    test("should return an array with products", () => {
        const parser = new Parser(html);
        const products = parser.getProducts();
        expect(products.length).toBe(20);
        expect(products[0].name).toBe("Lechuga del País Vasco EUSKO LABEL PRIMERAN, bolsa 140 g");
        expect(products[1].name).toBe("Puerro EUSKAL BASERRI, manojo");
    });
});
