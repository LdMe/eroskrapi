/* 
* scraper test
*/

import Scraper from '../../src/scraper/scraper';
import fs from 'fs';

describe('scraper', () => {
    it('should return an html', async () => {
        const scraper = new Scraper();
        await scraper.init();
        const content = await scraper.scrape("http://google.com", 0);
        await scraper.close();
        expect(content).toContain('<title>Google</title>');
        const errorContent = await scraper.scrape("http://gfw3'90riji3f34e.com", 0);
        expect(errorContent).toBe(null);
    });
    test('should save the html in a file', async () => {
        const scraper = new Scraper();
        await scraper.init();
        const content = await scraper.scrape("https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059710-verduras-y-hortalizas/", 0);
        await scraper.saveHtml(content, 'test_2.html');
        await scraper.close();
        const fileExists =  fs.existsSync('test_2.html');
        expect(fileExists).toBe(true);

    }
    );
});
