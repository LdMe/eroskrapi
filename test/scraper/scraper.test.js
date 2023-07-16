/* 
* scraper test
*/

import Scraper from '../../src/scraper/scraper';
import fs from 'fs';

describe('scraper', () => {
    it('should return an object with a title and a description', async () => {
        const scraper = new Scraper();
        await scraper.init();
        const content = await scraper.scrape("http://google.com", 0);
        await scraper.close();

        expect(content).toContain('<title>Google</title>');
    });
    test('should save the html in a file', async () => {
        const scraper = new Scraper();
        await scraper.init();
        const content = await scraper.scrape("https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059710-verduras-y-hortalizas/", 0);
        await scraper.saveHtml(content, 'test.html');
        await scraper.close();
        const fileExists =  fs.existsSync('test.html');
        expect(fileExists).toBe(true);

    }
    );
});
