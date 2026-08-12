import { test } from '../fixtures/fixtures.js';
import navigationData from '../test-data/menuNavigation.json'
    with { type: 'json' };


test.describe(
    'Homepage: Menu Visibility',
    () => {
        
        

        for (const menu of navigationData.menus) {

            test(
                `Verify ${menu.title} Menu Visibility`,
                async ({ homePage }) => {

                    // ==========================================
                    // OPEN HOMEPAGE
                    // ==========================================

                    await test.step(
                        'Open Homepage',
                        async () => {

                            await homePage.navigate();

                        }
                    );


                    // ==========================================
                    // ACCESSIBILITY
                    // ==========================================

                    if (menu.title === 'Accessibility') {

                        await test.step(
                            'Verify Accessibility menu',
                            async () => {

                                await homePage.navigationMenu
                                    .verifyAccessibility(
                                        menu.title
                                    );

                            }
                        );
                        return;
                    } 
                    // else {
                    //     await test.step(
                    //         'Verify Accessibility menu',
                    //         async () => {

                    //             await homePage.navigationMenu
                    //                 .verifyMainMenu(
                    //                     menu.title
                    //                 );

                    //         }
                    //     );
                    // }


                    // ==========================================
                    // HOVER MAIN MENU
                    // ==========================================

                    await test.step(
                        `Hover ${menu.title}`,
                        async () => {

                            await homePage.navigationMenu
                                .hoverMenu(
                                    menu.title
                                );

                        }
                    );


                    // ==========================================
                    // VERIFY SUBMENUS
                    // ==========================================

                    for (const subMenu of menu.subMenus) {

                        await test.step(
                            `Verify ${subMenu.title} submenu`,
                            async () => {

                                // Special submenu
                                if (
                                    subMenu.title === 'Surprise me'
                                ) {

                                    await homePage.navigationMenu
                                        .verifysupriseSubmenu(
                                            menu.title,
                                            subMenu.title
                                        );

                                }

                                // Normal submenu
                                else {

                                    await homePage.navigationMenu
                                        .verifySubmenu(
                                            menu.title,
                                            subMenu.title
                                        );

                                }

                            }
                        );


                        // ======================================
                        // VERIFY CHILD MENUS
                        // ======================================

                        if (
                            subMenu.childMenus &&
                            subMenu.childMenus.length > 0
                        ) {

                            for (
                                const childMenu
                                of subMenu.childMenus
                            ) {

                                await test.step(
                                    `Verify ${childMenu.title}`,
                                    async () => {

                                        // Special child
                                        if (
                                            subMenu.title ===
                                            'Surprise me'
                                        ) {

                                            await homePage.navigationMenu
                                                .verifySpecialChildMenu(
                                                    menu.title,
                                                    subMenu.title,
                                                    childMenu.title
                                                );

                                        }

                                        // Normal child
                                        else {

                                            await homePage.navigationMenu
                                                .verifyChildMenu(
                                                    menu.title,
                                                    subMenu.title,
                                                    childMenu.title
                                                );

                                        }

                                    }
                                );

                            }

                        }

                    }


                    // ==========================================
                    // VISIT INFORMATION
                    // ==========================================

                    if (
                        menu.visitingDetails &&
                        menu.visitingDetails.length > 0
                    ) {

                        await test.step(
                            'Verify Visit Information',
                            async () => {

                                await homePage.navigationMenu
                                    .verifyVisitInformation(
                                        menu.visitingDetails
                                    );

                            }
                        );

                    }

                }
            );

        }

    }
);