import { expect } from '@playwright/test';
import { AssertionHelper } from '../helpers/AssertionHelper.js';
import { report } from '../utils/ReportManager.js';

export class Activities {

    constructor(page) {

        this.page = page;

        // Main section
        this.activitiesSection = page.locator('.activity-on-frame');

        this.sectionTitle = this.activitiesSection.locator('.title');

        // Activity cards
        this.activityCards = this.activitiesSection.locator(
            '.slick-slide:not(.slick-cloned) .activity-card'
        );

        // Info section
        this.activitiesInfo = this.activitiesSection.locator('.activities-info');

        this.infoSubtitle = this.activitiesInfo.locator(
            '.activities-info-sub-title'
        );

        this.infoTitle = this.activitiesInfo.locator(
            '.activities-info-title'
        );

        this.infoText = this.activitiesInfo.locator(
            '.activities-info-text'
        );

        this.allActivitiesButton = this.activitiesInfo.locator(
            'a.btn'
        );
        this.slNo=1;
        this.link=1;
        this.info=1;
    }


    async verifySection(sectionData) {

        await AssertionHelper.verifyVisible(
            this.activitiesSection,
            "WaterMark- What's On",
            `What's on? Text`,
            false
        );

        await AssertionHelper.verifyText(
            this.sectionTitle,
            sectionData.title,
            "WaterMark- What's On",
            'Section Title'
        );
    }


    async verifyActivity(activityData, index) {
        let number =this.slNo++ ;
        const card = this.activityCards.nth(index);

        await AssertionHelper.verifyVisible(
            card,
            `Activity ${number}`,
            activityData.title,
            false
        );

        const title = card.locator('.activity-name a');

        const category = card.locator('.activity-sub-name span');

        const date = card.locator('.activity-date');

        const age = card.locator('.activity-age p');

        const price = card.locator('.activity-ticket p');

        const description = card.locator('.activity-description');

        const bookButton = card.locator('a.btn.wht');


        await AssertionHelper.verifyText(
            title,
            activityData.title,
            `Activity ${number}`,
            `${activityData.title} - Title`,
            false
        );


        await AssertionHelper.verifyText(
            category,
            activityData.category,
            `Activity ${number}`,
            `${activityData.title} - Category`,
            false
        );


        await AssertionHelper.verifyText(
            date,
            activityData.date,
            `Activity ${number}`,
            `${activityData.title} - Date`,
            false
        );


        await AssertionHelper.verifyText(
            age,
            activityData.age,
            `Activity ${number}`,
            `${activityData.title} - Age`,
            false
        );


        await AssertionHelper.verifyText(
            price,
            activityData.price,
            `Activity ${number}`,
            `${activityData.title} - Price`,
            false
        );


        await AssertionHelper.verifyText(
            description,
            activityData.description,
            `Activity ${number}`,
            `${activityData.title} - Description`,
            false
        );


        await AssertionHelper.verifyText(
            bookButton,
            activityData.bookButton,
            `Activity ${number}`,
            `${activityData.title} - Book Button`,
            false
        );


        await AssertionHelper.verifyVisible(
            card.locator('.activity-image img'),
            `Activity ${number}`,
            `${activityData.title} - Image`,
            false
        );
    }


    async verifyActivityNavigation(activityData, index) {

        const card = this.activityCards.nth(index);

        const title = card.locator('.activity-name a');

        try {

            await Promise.all([
                this.page.waitForURL(
                    url => url.toString().includes(
                        activityData.expectedUrl
                    ),
                    {
                        timeout: 15000,
                        waitUntil: 'domcontentloaded'
                    }
                ),

                title.click()
            ]);

            report.addResult(
                `Activity ${this.link++} Book Now`,
                `${activityData.title} - Navigation`,
                'Pass',
                `Successfully navigated to ${this.page.url()}`
            );

        } catch (error) {

            report.addResult(
                `Activity ${this.link++} Book Now`,
                `${activityData.title} - Navigation`,
                'Fail',
                `Expected URL: ${activityData.expectedUrl}, Actual URL: ${this.page.url()}`
            );

            throw error;
        }
    }


    async verifyInfoSection(sectionData) {

        await AssertionHelper.verifyText(
            this.infoSubtitle,
            sectionData.infoSubtitle,
            `Info Section`,
            'Info Subtitle',
            false
        );


        await AssertionHelper.verifyText(
            this.infoTitle,
            sectionData.infoTitle,
            'Info Section',
            'Info Title',
            false
        );


        await AssertionHelper.verifyText(
            this.infoText,
            sectionData.infoText,
            'Info Section',
            'Info Description',
            false
        );


        await AssertionHelper.verifyText(
            this.allActivitiesButton,
            sectionData.allActivities,
            'Info Section',
            'All Activities Button',
            false
        );
    }


    async verifyAllActivitiesNavigation(sectionData) {

        try {

            await Promise.all([
                this.page.waitForURL(
                    url => url.toString().includes(
                        sectionData.allActivitiesUrl
                    ),
                    {
                        timeout: 15000,
                        waitUntil: 'domcontentloaded'
                    }
                ),

                this.allActivitiesButton.click()
            ]);

            report.addResult(
                `Info Section`,
                'All Activities Navigation',
                'Pass',
                `Successfully navigated to ${this.page.url()}`
            );

        } catch (error) {

            report.addResult(
                `Info Section`,
                'All Activities Navigation',
                'Fail',
                `Expected URL: ${sectionData.allActivitiesUrl}, Actual URL: ${this.page.url()}`
            );

            throw error;
        }
    }
}