import { expect } from '@playwright/test';
import { AssertionHelper } from '../helpers/AssertionHelper.js';
import { report } from '../utils/ReportManager.js';

export class NavigationMenu {

    constructor(page) {
        this.page = page;

        this.mainMenu = page.locator(
            '.main-menu > .main-menu-list > li'
        );
    }


    // =====================================================
    // MAIN MENU
    // =====================================================

    getMainMenu(menuName) {

        return this.mainMenu.filter({
            has: this.page.locator(
                'span.opener-dropdown',
                { hasText: menuName }
            )
        });
    }

    async verifyMainMenu(menuName) {

        const menu = this.getMainMenu(menuName);

        await AssertionHelper.verifyVisible(
            menu,
            `Header ${menuName}`,
            `${menuName} Menu`
        );
    }



    async hoverMenu(menuName) {

        const menu = this.getMainMenu(menuName);

        // await AssertionHelper.verifyVisible(
        //     menu,
        //     `Header > ${menuName}`,
        //     `${menuName} Menu`
        // );

        await menu.hover();
    }

     async verifyAccessibility(menuName) {

        const accessibilityMenu = this.mainMenu.filter({
            has: this.page.locator(
                `a[href="/en/basic-page/alimentarium-accessible-all"]`
            )
        });

        await AssertionHelper.verifyVisible(
            accessibilityMenu,
            `Header > ${menuName}`,
            `${menuName} Menu`
        );
    }


    async navigateToAccessibility(
        menuName,
        expectedUrl
    ) {

        const accessibilityLink = this.page.locator(
            'a[href="/en/basic-page/alimentarium-accessible-all"]'
        );

        try {

            await accessibilityLink.click();

            await this.page.waitForLoadState(
                'domcontentloaded'
            );

            await this.page.waitForURL(
                url => url.pathname.includes(
                    expectedUrl
                )
            );

            report.addResult(
                'Header',
                menuName,
                'Pass',
                'Navigation successful'
            );

            return true;

        } catch (error) {

            report.addResult(
                'Header',
                menuName,
                'Fail',
                `Expected URL: ${expectedUrl} | Actual URL: ${this.page.url()}`
            );

            return false;
        }
    }

    // =====================================================
    // SUBMENU CONTAINER
    // =====================================================

    getSubMenuContainer(menuName) {

        return this.getMainMenu(menuName).locator(
            '.drop-down'
        );
    }


    // =====================================================
    // SUBMENU
    // =====================================================

    getSubMenu(menuName, subMenuName) {

        return this.getSubMenuContainer(menuName)
            .locator('.drop-down-frame .col')
            .filter({
                has: this.page.locator(
                    'h3 a.opener-lvl3',
                    { hasText: subMenuName }
                )
            });
    }


    async verifySubmenu(menuName, subMenuName) {

        const subMenu = this.getSubMenu(
            menuName,
            subMenuName
        );

        await AssertionHelper.verifyVisible(
            subMenu,
            `Header > ${menuName}`,
            `${subMenuName} Submenu`
        );
    }

     // =====================================================
    // SURPRISE ME SUBMENU
    // =====================================================

    getSurpriseSubMenu(
        menuName,
        subMenuName
    ) {

        return this.getSubMenuContainer(menuName)
            .locator('.surprise-box-wrap')
            .filter({
                has: this.page.locator(
                    'h3 a.opener-lvl3',
                    { hasText: subMenuName }
                )
            });
    }


    async verifysupriseSubmenu(
        menuName,
        subMenuName
    ) {

        const surpriseSubMenu =
            this.getSurpriseSubMenu(
                menuName,
                subMenuName
            );

        await AssertionHelper.verifyVisible(
            surpriseSubMenu,
            `Header > ${menuName}`,
            `${subMenuName} Submenu`
        );
    }

    // =====================================================
    // CHILD MENU
    // =====================================================

    getChildMenu(
        menuName,
        subMenuName,
        childMenuName
    ) {

        return this.getSubMenu(
            menuName,
            subMenuName
        )
        .locator('.drop-list li a')
        .filter({
            hasText: childMenuName
        });
    }


    async verifyChildMenu(
        menuName,
        subMenuName,
        childMenuName
    ) {

        const childMenu = this.getChildMenu(
            menuName,
            subMenuName,
            childMenuName
        );

        await AssertionHelper.verifyVisible(
            childMenu,
            `Header > ${menuName} > ${subMenuName}`,
            childMenuName
        );
    }

        // =====================================================
    // SURPRISE ME CHILD MENU
    // =====================================================

    getSpecialChildMenu(
        menuName,
        subMenuName,
        childMenuName
    ) {

        return this.getSurpriseSubMenu(
            menuName,
            subMenuName
        )
        .locator(
            '.surprise-box .random-box a .text .title'
        )
        .filter({
            hasText: childMenuName
        });
    }


    async verifySpecialChildMenu(
        menuName,
        subMenuName,
        childMenuName
    ) {

        const childMenu =
            this.getSpecialChildMenu(
                menuName,
                subMenuName,
                childMenuName
            );

        await AssertionHelper.verifyVisible(
            childMenu,
            `Header > ${menuName} > ${subMenuName}`,
            childMenuName
        );
    }

    async navigateToRandomSurprise(
    menuName,
    subMenuName,
    childMenuName
) {

    const randomLink = this.getSpecialChildMenu(
        menuName,
        subMenuName,
        childMenuName
    );

    try {

        // Verify random link is visible
        await expect(randomLink).toBeVisible();

        // Get the actual href before clicking
        const href = await randomLink.getAttribute('href');

        if (!href) {
            throw new Error(
                'Random Surprise link does not have an href'
            );
        }

        console.log(
            `Random Surprise href: ${href}`
        );


        // Click randomized link
        await randomLink.click();


        // Wait for navigation if it happens
        await this.page.waitForLoadState(
            'domcontentloaded',
            { timeout: 15000 }
        ).catch(() => {});


        // Get actual URL after click
        const actualUrl = this.page.url();

        console.log(
            `Random Surprise actual URL: ${actualUrl}`
        );


        // ============================================
        // Verify URL is not homepage
        // ============================================

        if (
            actualUrl ===
            'https://staging.alimentarium.org/en'
        ) {

            throw new Error(
                'Random Surprise did not navigate to another page'
            );
        }


        // ============================================
        // Verify it is an Alimentarium URL
        // ============================================

        expect(actualUrl).toContain(
            'staging.alimentarium.org'
        );


        // ============================================
        // Verify page loaded
        // ============================================

        await expect(
            this.page.locator('body')
        ).toBeVisible();


        report.addResult(
            `Header > ${menuName} > ${subMenuName}`,
            childMenuName,
            'Pass',
            `Random navigation successful. URL: ${actualUrl}`
        );

        return true;

    } catch (error) {

        report.addResult(
            `Header > ${menuName} > ${subMenuName}`,
            childMenuName,
            'Fail',
            `Random navigation failed. Actual URL: ${this.page.url()}`
        );

        return false;
    }
}

    // =====================================================
    // SUBMENU NAVIGATION
    // =====================================================

    async navigateToSubMenu(
        menuName,
        subMenuName,
        expectedUrl
    ) {

        const subMenu = this.getSubMenuContainer(
            menuName
        )
        .locator('h3 a.opener-lvl3')
        .filter({
            hasText: subMenuName
        });

        try {

            await expect(subMenu).toBeVisible();

            await subMenu.click();

            await this.page.waitForLoadState(
                'domcontentloaded',
                { timeout: 15000 }
            ).catch(() => {});

            await expect(this.page).toHaveURL(
                new RegExp(
                    expectedUrl.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        '\\$&'
                    )
                ),
                { timeout: 15000 }
            );

            report.addResult(
                `Header > ${menuName}`,
                subMenuName,
                'Pass',
                `Navigation Successful ${expectedUrl}`
            );

            return true;

        } catch (error) {

            report.addResult(
                `Header > ${menuName}`,
                subMenuName,
                'Fail',
                `Expected URL: ${expectedUrl} | Actual URL: ${this.page.url()}`
            );

            return false;
        }
    }


    // =====================================================
    // CHILD MENU NAVIGATION
    // =====================================================

    async navigateToChildMenu(
        menuName,
        subMenuName,
        childMenuName,
        expectedUrl
    ) {

        const childMenu = this.getChildMenu(
            menuName,
            subMenuName,
            childMenuName
        );

        try {

            await expect(childMenu).toBeVisible();

            await childMenu.click();

            await this.page.waitForLoadState(
                'domcontentloaded',
                { timeout: 15000 }
            ).catch(() => {});

            await expect(this.page).toHaveURL(
                new RegExp(
                    expectedUrl.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        '\\$&'
                    )
                ),
                { timeout: 15000 }
            );

            report.addResult(
                `Header > ${menuName} > ${subMenuName}`,
                childMenuName,
                'Pass',
                `Navigation successful: ${expectedUrl}`
            );

            return true;

        } catch (error) {

            report.addResult(
                `Header > ${menuName} > ${subMenuName}`,
                childMenuName,
                'Fail',
                `Expected URL: ${expectedUrl} | Actual URL: ${this.page.url()}`
            );

            return false;
        }
    }


    // =====================================================
    // ACCESSIBILITY
    // =====================================================

    // async navigateToAccessibility(
    //     menuName,
    //     expectedUrl
    // ) {

    //     const menu = this.getAccessibilityMenu(menuName);

    //     try {

    //         await menu.locator('a').click();

    //         await this.page.waitForLoadState(
    //             'domcontentloaded',
    //             { timeout: 15000 }
    //         ).catch(() => {});

    //         await expect(this.page).toHaveURL(
    //             new RegExp(
    //                 expectedUrl.replace(
    //                     /[.*+?^${}()|[\]\\]/g,
    //                     '\\$&'
    //                 )
    //             ),
    //             { timeout: 15000 }
    //         );

    //         report.addResult(
    //             'Header',
    //             menuName,
    //             'Pass',
    //             `Expected URL: ${expectedUrl}`
    //         );

    //         return true;

    //     } catch (error) {

    //         report.addResult(
    //             'Header',
    //             menuName,
    //             'Fail',
    //             `Expected URL: ${expectedUrl} | Actual URL: ${this.page.url()}`
    //         );

    //         return false;
    //     }
    // }

    // =====================================================
    // VISIT INFORMATION
    // =====================================================

    async verifyVisitInformation(
        visitingDetails
    ) {

        const information =
            this.getSubMenuContainer('Visit')
                .locator('.drop-down-information');


        await AssertionHelper.verifyVisible(
            information,
            'Header > Visit',
            'Visit Information'
        );


        for (const detail of visitingDetails) {

            const box =
                information
                    .locator('.box')
                    .filter({
                        has: this.page.locator(
                            '.subtitle',
                            {
                                hasText: detail.title
                            }
                        )
                    });


            // =============================================
            // Opening Hours
            // =============================================

            if (detail.title === 'Opening hours') {

                await AssertionHelper.verifyText(
                    box.locator('.info-line').first(),
                    detail.date,
                    'Header > Visit > Opening hours'
                );

                await AssertionHelper.verifyText(
                    box.locator('.info-line').nth(1),
                    detail.monthandTime,
                    'Header > Visit > Opening hours'
                );
            }


            // =============================================
            // Contact
            // =============================================

            else if (detail.title === 'Contact') {

                const email =
                    box.locator('a[href^="mailto:"]');

                await AssertionHelper.verifyText(
                    email,
                    'email',
                    'Header > Visit > Contact'
                );
            }


            // =============================================
            // Entrance Fees
            // =============================================

            else if (detail.title === 'Entrance fees') {

                await AssertionHelper.verifyText(
                    box.locator('p'),
                    detail.age,
                    'Header > Visit > Entrance fees'
                );
            }


            // =============================================
            // Address
            // =============================================

            else if (detail.title === 'Address') {

                await AssertionHelper.verifyText(
                    box.locator('p'),
                    detail.address,
                    'Header > Visit > Address'
                );
            }
        }
    }
}