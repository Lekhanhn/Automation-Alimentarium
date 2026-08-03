import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';

export class InfoCard{

    constructor(page){
        this.page = page;

        this.cards = page.locator('.home-content-frame .box')
       
    }
    async verifyCard(cardDetail) {
       
        const card = this.cards.filter({
            has: this.page.getByRole('heading', { name: cardDetail.title, exact: true })
        });
            
        await expect(card).toBeVisible();
        report.addResult(
            'Info Card',
            cardDetail.title,
            'Pass',
            `Info Card ${cardDetail.title} is visible`
        );

        await expect(card.locator('.label')).toHaveText(cardDetail.header);
        report.addResult(
            'Info Card Header/label ',
            cardDetail.header,
            'Pass',
            `${cardDetail.header} header is visible`
        );

        await expect(card.getByRole('link', { name: cardDetail.button })).toBeVisible();
        report.addResult(
            'Info Card More info button ',
            `${cardDetail.button} button`,
            'Pass',
            `${cardDetail.button} Button is visible`
        );

    }

    async clickCardButton(cardDetail) {

        const card = this.cards.filter({
            has: this.page.getByRole('heading', { name: cardDetail.title, exact: true  })
        });
        
        const button = card.getByRole('link', {
            name: cardDetail.button,
            exact: true
        });

        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();

        // await button.scrollIntoViewIfNeeded();

        // console.log("Before Click:", this.page.url());

        await button.click();

        // console.log("After Click:", this.page.url());
        }
        //await card.locator('.btn').click();
    

    async verifyCardNavigation(cardDetail){

        await Promise.all([
            this.page.waitForURL(`**${cardDetail.expectedUrl}**`, {
                waitUntil: 'domcontentloaded'
            }),
            this.clickCardButton(cardDetail)
        ]);
        //await this.clickCardButton(cardDetail);

        //await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(new RegExp(cardDetail.expectedUrl));
        //await expect(this.page.url()).toContain(cardDetail.expectedUrl);
        report.addResult(
            `Click on ${cardDetail.button}`,
            cardDetail.button,
            'Pass',
            `Successfully Navigated to ${cardDetail.title} page`
        );
    }
}
