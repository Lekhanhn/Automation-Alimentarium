import { BasePage } from './BasePage.js'
import { Header } from "../components/Header.js";
import { InfoCard } from "../components/InfoCard.js";
import { MainBanner } from "../components/MainBanner.js";
import { CookieBanner } from '../components/cookieBanner.js';
import { expect } from '@playwright/test'


export class HomePage extends BasePage {

    constructor(page) {
        super(page);

        this.cookieBanner = new CookieBanner(page);
        this.header = new Header(page);
        this.mainBanner = new MainBanner(page);
        this.infoCard = new InfoCard(page)
    }

    async navigate() {
            await super.navigate(process.env.BASE_URL);
    }

    async waitForHomePage() {
            await expect(this.header.logo).toBeVisible();
    }
}