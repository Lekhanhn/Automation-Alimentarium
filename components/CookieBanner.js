import { expect } from '@playwright/test';

export class CookieBanner {

    constructor(page) {
        this.page = page;

        this.acceptButton = page.getByRole('button', { name: /Accept/i });
        this.rejectButton = page.getByRole('button', { name: /Reject/i });
    }

    async acceptCookies() {

    try {
        await this.acceptButton.waitFor({
            state: 'visible',
            timeout: 3000
        });

        await this.acceptButton.click();

    } catch {
        console.log("Cookie banner not displayed.");
    }
    }
}