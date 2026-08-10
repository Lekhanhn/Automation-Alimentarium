import { BasePage } from './BasePage.js'
import { Header } from "../components/Header.js";
import { InfoCard } from "../components/InfoCard.js";
import { MainBanner } from "../components/MainBanner.js";
import { CookieBanner } from '../components/cookieBanner.js';
import { expect } from '@playwright/test'
import { Footer } from "../components/Footer.js";
import { Activities } from "../components/Activities.js";



export class HomePage extends BasePage {

    constructor(page) {
        super(page);

        this.cookieBanner = new CookieBanner(page);
        this.header = new Header(page);
        this.mainBanner = new MainBanner(page);
        this.infoCard = new InfoCard(page)
        this.footer = new Footer(page)
        this.activities = new Activities(page)
    }

    async navigate() {
        //console.log("Navigating to Home...");
        await super.navigate(process.env.BASE_URL);
        //console.log("Navigation completed.");
    }

    async waitForHomePage() {
        //console.log("Current URL:", this.page.url());
        
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.header.logo).toBeVisible({timeout: 10000 });
    }
}