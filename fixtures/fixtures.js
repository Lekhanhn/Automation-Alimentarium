import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { report } from '../utils/ReportManager.js';

let startTime;

export const test = base.extend({

    homePage: async ({ page, browserName }, use) => {

        //report.setBrowser(browserName);

        const homePage = new HomePage(page);

        await homePage.navigate();

        await homePage.cookieBanner.acceptCookies();

        await homePage.waitForHomePage();

        await use(homePage);

    }

});

export { expect } from '@playwright/test';