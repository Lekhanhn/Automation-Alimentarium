import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';
import { AssertionHelper } from '../helpers/AssertionHelper.js';

export class InfoCard{

    constructor(page){
        this.page = page;

        this.cards = page.locator('.home-content-frame .box')
       
    }
    async verifyCard(cardDetail) {
       
        const card = this.cards.filter({
            has: this.page.getByRole('heading', { name: cardDetail.title, exact: true })
        });
          
        await AssertionHelper.verifyVisible(card, 'Info Card', cardDetail.title)
        // await expect(card).toBeVisible();
        // report.addResult(
        //     'Info Card',
        //     cardDetail.title,
        //     'Pass',
        //     `Info Card ${cardDetail.title} is visible`
        // );

        await AssertionHelper.verifyText(card.locator('.label'), cardDetail.header, 'Info Card Header/label', cardDetail.header)

        // await expect(card.locator('.label')).toHaveText(cardDetail.header);
        // report.addResult(
        //     'Info Card Header/label ',
        //     cardDetail.header,
        //     'Pass',
        //     `${cardDetail.header} header is visible`
        // );

        await AssertionHelper.verifyVisible(
                card.getByRole('link', { name: cardDetail.button }) , 
                'Info Card More info button' , 
                `${cardDetail.button} button`
            )

        // await expect(card.getByRole('link', { name: cardDetail.button })).toBeVisible();
        // report.addResult(
        //     'Info Card More info button ',
        //     `${cardDetail.button} button`,
        //     'Pass',
        //     `${cardDetail.button} Button is visible`
        // );

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

        await button.click();

        }
       
    
    async verifyCardNavigation(cardDetail) {

        await this.clickCardButton(cardDetail);

        // Wait until the DOM is ready
        await this.page.waitForLoadState('domcontentloaded');

        // Wait until the URL contains the expected value
        await expect.poll(
            () => this.page.url(),
            {
                timeout: 15000,
                message: `Expected URL to contain ${cardDetail.expectedUrl}`
            }
        ).toContain(cardDetail.expectedUrl);

        report.addResult(
            `Click on ${cardDetail.button}`,
            cardDetail.button,
            'Pass',
            `Successfully navigated to "${cardDetail.title}" page`
        );
    }

}
