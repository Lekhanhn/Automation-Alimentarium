import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';
import { AssertionHelper } from '../helpers/AssertionHelper.js';

export class InfoCard{

    constructor(page){
        this.page = page;

        this.cards = page.locator('.home-content-frame .box')

        this.slNo=1;
        this.series=1;
       
    }
    async verifyCard(cardDetail) {
        let number = this.slNo++;
        const card = this.cards.filter({
            has: this.page.getByRole('heading', { name: cardDetail.title, exact: true })
        });
          
        await AssertionHelper.verifyVisible(card, `Info Card ${number}`, `Title: ${cardDetail.title}`,false)

        await AssertionHelper.verifyText(card.locator('.label'), cardDetail.header, `Info Card ${number}`, `Header: ${cardDetail.header}`,false)

        await AssertionHelper.verifyVisible(
                card.getByRole('link', { name: cardDetail.button }) , 
                `Info Card ${number}` , 
                `${cardDetail.button} button`,
                false
            )

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
        let number = this.series++;
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
            `Info Card ${number} more info button`,
            `Click on ${cardDetail.button} button`,
            'Pass',
            `Successfully navigated to "${cardDetail.title}" page`
        );
    }

}
