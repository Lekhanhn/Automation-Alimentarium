import { expect } from '@playwright/test';
import { report } from '../utils/ReportManager.js';

export class AssertionHelper {


static async verifyVisible(locator, page, elementName) {
        try {
            await expect(locator).toBeVisible();

            report.addResult(
                page,
                elementName,
                'Pass',
                'Visible'
            );
        } catch (error) {
            report.addResult(
                page,
                elementName,
                'Fail',
                error.message
            );

            throw error;
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
    
    static async verifyText(locator, expectedText, pageName, elementName) {

        try {

            await expect(locator).toHaveText(expectedText);

            report.addResult(
                pageName,
                elementName,
                'Pass',
                'Text verified'
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
}