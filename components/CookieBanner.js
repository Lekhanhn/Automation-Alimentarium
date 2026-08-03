import { expect } from '@playwright/test';

export class CookieBanner {

    constructor(page) {
        this.page = page;

        this.acceptButton = page.getByRole('button', { name: /Accept/i });
        this.rejectButton = page.getByRole('button', { name: /Reject/i });
    }

    async acceptCookies() {

        if (await this.acceptButton.isVisible()) {
            await this.acceptButton.click();
        }
    }
}