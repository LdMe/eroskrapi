import pupeteer from "puppeteer";
import fs from "fs";

/**
 * Clase encargada de hacer scraping de una página web.
 * @class
 */
class Scraper {
  /**
   * Construye una instancia de la clase Scraper.
   * @constructor
   * @param {boolean} headless - Indica si el navegador ejecutado estará en modo headless o no.
   */
  constructor(headless = true) {
    this.browser = null;
    this.page = null;
    this.headless = headless;
  }

  /**
   * Inicializa el navegador para hacer el scraping.
   * @async
   */
  async init() {
    this.browser = await pupeteer.launch({ headless: this.headless });
    this.page = await this.browser.newPage();
  }

  /**
   * Hace el scraping de la página web indicada.
   * @async
   * @param {string} url - URL de la página web a hacer scraping.
   * @returns {string} - HTML de la página web.
   */
  async scrape(url, scrollTimes = 0) {
    try {
      await this.page.goto(url, { waitUntil: "load", timeout: 0 });
      while (scrollTimes > 0) {
        try {
          const previousHeight = await this.page.evaluate(
            "document.body.scrollHeight"
          );
          await this.page.evaluate(
            "window.scrollTo(0, document.body.scrollHeight)"
          );
          await this.page.waitForFunction(
            `document.body.scrollHeight > ${previousHeight}`,
            { timeout: 1000 }
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (e) {
          console.log(e);
        }

        scrollTimes--;
      }

      const html = await this.page.content();
      return html;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Guarda el HTML de la página web en un archivo.
   */
  async saveHtml(html, filename) {
    fs.writeFile(filename, html, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
    });
  }

  /**
   * Cierra el navegador.
   * @async
   */
  async close() {
    await this.browser.close();
  }

}


export default Scraper;
