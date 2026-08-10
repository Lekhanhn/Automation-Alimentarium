import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../helpers/AssertionHelper.js';
import { report } from '../utils/ReportManager.js';


export class Footer{

    constructor(page){
        this.page = page;

        this.subscribeNow = page.getByRole('heading', {name: 'Subscribe now', exact: true});

        this.subscribeEmailField = page.locator('#edit-email')

        this.subscribeSubmit = page.locator('#edit-actions-submit');

        this.footer = page.locator('.footer-content')
       
        this.sections = this.footer.locator('.footer-opener');

        this.subFooter = page.locator('.sub-footer');

        this.copyright = this.subFooter.locator('.copyright');

        this.subFooterLinks = this.subFooter.locator('ul.foooter-sub-list li a');

        this.backToTop= page.locator('.scroll-top-top a.btn-to-top');

        this.backToTopArrow = this.backToTop.locator('use[xlink\\:href="#arrow-top"]');

        this.socialLinks = {
            facebook: page.locator(
                    'ul.social-footer-list a[href*="facebook.com"]'
                ),

                instagram: page.locator(
                    'ul.social-footer-list a[href*="instagram.com"]'
                ),

                youtube: page.locator(
                    'ul.social-footer-list a[href*="youtube.com"]'
                ),

                tripadvisor: page.locator(
                    'ul.social-footer-list a[href*="tripadvisor"]'
                )
       
            };

        //this.slNo=1;

    }
    
    async verifyBackToTop() {

        // Scroll to bottom of page
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await this.page.waitForTimeout(500);

        // Verify Back to Top button
        await AssertionHelper.verifyVisible(
            this.backToTop,
            'Footer',
            'Back to Top',
            false
        );

        // Verify href
        // const actualHref =
        //     await this.backToTop.getAttribute('href');

        // if (actualHref === '#') {

        //     report.addResult(
        //         'Footer',
        //         'Back to Top - Href',
        //         'Pass',
        //         'Correct href: #'
        //     );

        // } else {

        //     report.addResult(
        //         'Footer',
        //         'Back to Top - Href',
        //         'Fail',
        //         `Expected: # | Actual: ${actualHref}`
        //     );
        // }

        // Click Back to Top
        await this.backToTop.click();

        // Wait for scrolling animation
        await this.page.waitForTimeout(1000);

        // Check current scroll position
        const scrollPosition = await this.page.evaluate(
            () => window.scrollY
        );

        if (scrollPosition <= 10) {

            report.addResult(
                'Footer',
                'Back to Top - Navigation',
                'Pass',
                'Successfully returned to top of page'
            );

        } else {

            report.addResult(
                'Footer',
                'Back to Top - Navigation',
                'Fail',
                `Page did not return to top. Scroll position: ${scrollPosition}`
            );
        }
    }
    
     async verifySocialLinks(socialLinksData) {

        for (const social of socialLinksData) {
            
            const socialName = social.name.toLowerCase();
            
            const socialLink = this.page.locator(
                `ul.social-footer-list a[href*="${social.domain}"]`
                ).first();

            await AssertionHelper.verifyVisible(
                socialLink,
                'Footer - Social Media Links',
                socialName,
                false
            );

            const actualUrl =
                await socialLink.getAttribute('href');

            if (actualUrl === social.expectedUrl) {

                report.addResult(
                    'Footer - Social Media Links',
                    socialName,
                    'Pass',
                    `Correct URL: ${actualUrl}`
                );

            } else {

                report.addResult(
                    'Footer - Social Media Links',
                    socialName,
                    'Fail',
                    `Expected: ${social.expectedUrl} | Actual: ${actualUrl}`
                );
            }
        };
     
        // getDomain(name); {

        //     const domains = {
        //         Facebook: 'facebook.com',
        //         Instagram: 'instagram.com',
        //         YouTube: 'youtube.com'
        //     };

        //     return domains[name];
        // }
     }

    async verifySubscribeNow(subscribeNowData){
        await AssertionHelper.verifyVisible(this.subscribeNow, 'Footer : Subscribe Now section', 'Subscribe Now', false);
        
            await this.subscribeEmailField.fill(subscribeNowData.input);
            
            // await this.subscribeSubmit.click()
            
            // await this.page.waitForLoadState('domcontentloaded');
          
        try{
            await Promise.all([
                this.page.waitForURL(
                    url => url.toString().includes(
                        subscribeNowData.expectedUrl
                    ),
                    {
                        timeout: 15000,
                        waitUntil: 'domcontentloaded'
                    }
                ),

                this.subscribeSubmit.click()
            ]);
            // // Wait until the URL contains the expected value
            // await expect(this.page.url()).toContain(subscribeNowData.expectedUrl)
            report.addResult(
                    `Footer : Subscribe Now section`,
                    `Click on Submit`,
                    'Pass',
                    `Successfully subscribed ${this.page.url()}`
            );
        } catch(error){
            
            report.addResult(
                'Footer : Subscribe Now section',
                'Subscription and Submit button',
                'Fail',
                `Url mismatch, Expected URL: ${subscribeNowData.expectedUrl}, Actual URL: ${this.page.url()}`
            );

        }
    }

    getSection(sectionTitle) {

        return this.sections.filter({
            hasText: sectionTitle
        }).first();

    }

    async openSection(sectionTitle) {

        const section = this.getSection(sectionTitle);

        await AssertionHelper.verifyVisible(
            section,
            `Footer ${sectionTitle} section`,
            `${sectionTitle} section`,
            false
        );

        const opener = section.locator('h3 .opener');

        // Click only if the content is currently hidden
        const slide = section.locator('.slide');

        if (!(await slide.isVisible())) {
            await opener.click();
        }

        await expect(slide).toBeVisible();
    }

    async verifySection(sectionData) {

        const section = this.getSection(sectionData.title);

        // Verify section heading
        await AssertionHelper.verifyText(
            section.locator('h3 .opener'),
            sectionData.title,
            `Footer ${sectionData.title} section` ,
            `${sectionData.title} heading`,
            false
        );

        // Open accordion
        await this.openSection(sectionData.title);

        // Verify sub-heading
        if (sectionData.subHeading) {

            await AssertionHelper.verifyText(
                section.locator('h4'),
                sectionData.subHeading,
                `Footer ${sectionData.title} section`,
                `${sectionData.title} sub-heading`,
                false
            );
        }

        // Verify normal text
        if (sectionData.text) {

        const textLocator = section.locator('.footer-list-info p').first();

            await AssertionHelper.verifyTextNormalized(
                textLocator,
                sectionData.text,
                `Footer ${sectionData.title} section`,
                `${sectionData.title} information`,
                false
            );
        }

        // Verify links
        for (const item of sectionData.items) {

            await this.verifyLink(
                section,
                sectionData.title,
                item
            );
        }

        // Verify prices
        if (sectionData.prices) {

            await this.verifyPrices(
                section,
                sectionData
            );
        }
    }

    async verifyLink(section, sectionTitle, item) {

        const link = section.locator('a').filter({
            hasText: item.text
        }).first();

        // Verify link is visible
        await AssertionHelper.verifyVisible(
            link,
            `Footer ${sectionTitle} section`,
            `${sectionTitle} - ${item.text}`,
            false
        );

        // Verify link text
        await AssertionHelper.verifyText(
            link,
            item.text,
            `Footer ${sectionTitle} section`,
            `${sectionTitle} - ${item.text} text`,
            false
        );

        // Verify href
        try {

            const actualHref = await link.getAttribute('href');

            if (!actualHref || !actualHref.includes(item.expectedUrl)) {

                throw new Error(
                    `Expected href "${item.expectedUrl}" but found "${actualHref}"`
                );
            }

            // Record pass
            const { report } = await import('../utils/ReportManager.js');

            report.addResult(
                `Footer ${sectionTitle} section`,
                `${sectionTitle} - ${item.text} URL`,
                'Pass',
                `Correct URL: ${actualHref}`
            );

        } catch (error) {

            const { report } = await import('../utils/ReportManager.js');

            report.addResult(
                `Footer ${sectionTitle} section`,
                `${sectionTitle} - ${item.text} URL`,
                'Fail',
                error.message
            );
        }
    }

    async verifyPrices(section, sectionData) {

        const table = section.locator('.footer-list-info table');

        for (const price of sectionData.prices) {

            const row = table.locator('tr').filter({
                hasText: price.name
            }).first();

            const nameCell = row.locator('td').nth(0);
            const priceCell = row.locator('td').nth(1);

            await AssertionHelper.verifyText(
                nameCell,
                price.name,
                `Footer ${sectionData.title} section`,
                `${sectionData.title} - ${price.name}`,
                false
            );

            await AssertionHelper.verifyText(
                priceCell,
                price.price,
                `Footer ${sectionData.title} section`,
                `${sectionData.title} - ${price.name} price`,
                false
            );
        }
    }

    async verifySubFooter(subFooterData) {

        // Verify copyright
        await AssertionHelper.verifyTextNormalized(
            this.copyright,
            subFooterData.copyright,
            'Sub Footer section',
            'Copyright',
            false
        );


        // Verify all links
        for (const linkData of subFooterData.links) {

            const link = this.subFooterLinks
                .filter({
                    hasText: linkData.text
                })
                .first();

            // Verify link visible
            await AssertionHelper.verifyVisible(
                link,
                'Sub Footer section',
                `${linkData.text} link`,
                false
            );

            // Verify link text
            await AssertionHelper.verifyText(
                link,
                linkData.text,
                'Sub Footer section',
                `${linkData.text} text`,
                false
            );

            // Verify URL
            try {

                const actualHref = await link.getAttribute('href');

                if (!actualHref) {
                    throw new Error(
                        `href is missing for "${linkData.text}"`
                    );
                }

                if (!actualHref.includes(linkData.expectedUrl)) {
                    throw new Error(
                        `Expected URL "${linkData.expectedUrl}" but found "${actualHref}"`
                    );
                }

                report.addResult(
                    'Sub Footer section',
                    `${linkData.text} URL`,
                    'Pass',
                    `Correct URL: ${actualHref}`
                );

            } catch (error) {

                report.addResult(
                    'Sub Footer section',
                    `${linkData.text} URL`,
                    'Fail',
                    error.message
                );
            }
        }
    }

}