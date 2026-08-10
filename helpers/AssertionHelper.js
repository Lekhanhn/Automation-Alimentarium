import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';

export class AssertionHelper {


static async verifyVisible(locator, page, elementName, stopExecution=true) {
        try {
            await expect(locator).toBeVisible();

            report.addResult(
                page,
                elementName,
                'Pass',
                'Element Visible'
            );

            return true;

        } catch (error) {
            report.addResult(
                page,
                elementName,
                'Fail',
                'Element not visible'
            );

            if(stopExecution){
                throw error;
            }

           return false; 
        }
    }

    static async verifyURL(page, expectedUrl, pageName, elementName) {
        try {

            await expect.poll(() => page.url())
                .toContain(expectedUrl);

            report.addResult(
                pageName,
                elementName,
                'Pass',
                'Navigation successful'
            );

        } catch (error) {

            report.addResult(
                pageName,
                elementName,
                'Fail',
                error.message
            );

            throw error;
        }
    }
    
    static async verifyText(locator, expectedText, pageName, elementName, stopExecution=true) {

        try {

            await expect(locator).toContainText(expectedText);

            report.addResult(
                pageName,
                elementName,
                'Pass',
                'Text verified and is Visible',
            );

            return true;

        } catch (error) {

            report.addResult(
                pageName,
                elementName,
                'Fail',
                `Expected: "${expectedText}" | Actual: "${await locator.textContent()}"`
            );

            if (stopExecution) {
            throw error;
            }

            return false;
        }
    }
    // This method help in HTML and also if any spaces present
    // <p>
    //     10:00 - 17:00 (October to March)<br>
    //     10:00 - 18:00 (April to September)
    // </p>
    static async verifyTextNormalized(
        locator,
        expectedText,
        pageName,
        elementName,
        stopExecution = true
    ) {
        try {

            const actualText = await locator.innerText();

            const normalize = text =>
                text
                    ?.replace(/\s+/g, ' ')
                    .trim();

            const actual = normalize(actualText);
            const expected = normalize(expectedText);

            if (actual !== expected) {
                throw new Error(
                    `Text mismatch.\n` +
                    `Expected: "${expected}"\n` +
                    `Actual: "${actual}"`
                );
            }

            report.addResult(
                pageName,
                elementName,
                'Pass',
                'Text verified'
            );

            return true;

        } catch (error) {

            report.addResult(
                pageName,
                elementName,
                'Fail',
                error.message
            );

            if (stopExecution) {
                throw error;
            }

            return false;
        }
    }
}