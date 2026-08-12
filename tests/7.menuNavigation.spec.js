import { test } from '../fixtures/fixtures.js';
import navigationData from '../test-data/menuNavigation.json'
    with { type: 'json' };


test.describe(
    'Homepage: Menu Navigation',
    () => {

        for (const menu of navigationData.menus) {

            // =================================================
            // ACCESSIBILITY
            // =================================================

            if (menu.title === 'Accessibility') {

                test(
                    `Navigate to ${menu.title}`,
                    async ({ homePage }) => {

                        await test.step(
                            'Open Homepage',
                            async () => {

                                await homePage.navigate();

                            }
                        );


                        await test.step(
                            `Navigate to ${menu.title}`,
                            async () => {

                                await homePage.navigationMenu
                                    .navigateToAccessibility(
                                        menu.title,
                                        menu.url
                                    );

                            }
                        );

                    }
                );

                continue;
            }


            // =================================================
            // SUBMENU NAVIGATION
            // =================================================

            for (const subMenu of menu.subMenus) {

                // ---------------------------------------------
                // Navigate to submenu
                // ---------------------------------------------
                if(subMenu.url){
                test(
                    `Navigate: ${menu.title} > ${subMenu.title}`,
                    async ({ homePage }) => {

                        // Open homepage

                        await test.step(
                            'Open Homepage',
                            async () => {

                                await homePage.navigate();

                            }
                        );


                        // Hover main menu

                        await test.step(
                            `Hover ${menu.title}`,
                            async () => {

                                await homePage.navigationMenu
                                    .hoverMenu(
                                        menu.title
                                    );

                            }
                        );


                        // Navigate submenu

                        await test.step(
                            `Navigate to ${subMenu.title}`,
                            async () => {
                                if (
                                    subMenu.title === 'Surprise me'
                                ) {

                                    await homePage.navigationMenu
                                        .verifysupriseSubmenu(
                                            menu.title,
                                            subMenu.title
                                        );

                                }else {
                                    await homePage.navigationMenu
                                    .navigateToSubMenu(
                                        menu.title,
                                        subMenu.title,
                                        subMenu.url
                                    );
                                }

                                

                            }
                        );

                    }
                );
            }

                // =================================================
                // CHILD MENU NAVIGATION
                // =================================================

                if (
                    subMenu.childMenus &&
                    subMenu.childMenus.length > 0
                ) {

                    for (
                        const childMenu
                        of subMenu.childMenus
                    ) {

                        test(
                            `Navigate: ${menu.title} > ${subMenu.title} > ${childMenu.title}`,
                            async ({ homePage }) => {

                                // ---------------------------------
                                // Open homepage
                                // ---------------------------------

                                await test.step(
                                    'Open Homepage',
                                    async () => {

                                        await homePage.navigate();

                                    }
                                );


                                // ---------------------------------
                                // Hover main menu
                                // ---------------------------------

                                await test.step(
                                    `Hover ${menu.title}`,
                                    async () => {

                                        await homePage.navigationMenu
                                            .hoverMenu(
                                                menu.title
                                            );

                                    }
                                );


                                // ---------------------------------
                                // Navigate child
                                // ---------------------------------

                                await test.step(
                                    `Navigate to ${childMenu.title}`,
                                    async () => {
                                        if (
                                            subMenu.title ===
                                            'Surprise me'
                                        ) {

                                            await homePage.navigationMenu
                                                .navigateToRandomSurprise(
                                                    menu.title,
                                                    subMenu.title,
                                                    childMenu.title,                                        
                                                );

                                        }else{
                                            await homePage.navigationMenu
                                            .navigateToChildMenu(
                                                menu.title,
                                                subMenu.title,
                                                childMenu.title,
                                                childMenu.url
                                            );

                                        }
                                        
                                    }
                                );

                            }
                        );

                    }

                }

            }

        }

    }
);