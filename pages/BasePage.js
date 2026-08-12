export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 150000
        });
        await this.page.waitForLoadState('domcontentloaded');
    }
}


