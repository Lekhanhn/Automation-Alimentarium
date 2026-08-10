import { test } from '../fixtures/fixtures.js';
import activitiesData from '../test-data/activities.json' with { type: 'json' };


test.describe('Homepage Activities / What’s On', () => {


    test('Verify Activities Section', async ({ homePage }) => {

        await homePage.activities.verifySection(
            activitiesData.section
        );

    });


    test('Verify Activity Cards', async ({ homePage }) => {

        for (
            let i = 0; i < activitiesData.activities.length; i++) {

            const activity = activitiesData.activities[i];

            await test.step(
                `Verify "${activity.title}" activity`,
                async () => {

                    await homePage.activities.verifyActivity(activity,i);

                }
            );
        }
    });


    test('Verify Activity Navigation', async ({ homePage }) => {

        test.setTimeout(120000);

        for (
            let i = 0;
            i < activitiesData.activities.length;
            i++
        ) {

            const activity = activitiesData.activities[i];

            await test.step(
                `Navigate to "${activity.title}"`,
                async () => {

                    await homePage.activities
                        .verifyActivityNavigation(
                            activity,
                            i
                        );


                    // Return to homepage
                    await homePage.navigate();

                    await homePage.cookieBanner.acceptCookies();

                    await homePage.waitForHomePage();

                }
            );
        }
    });


    test('Verify Activities Information Section', async ({ homePage }) => {

        await homePage.activities.verifyInfoSection(
            activitiesData.section
        );

    });


    test('Verify All Activities Navigation', async ({ homePage }) => {

        await homePage.activities.verifyInfoSection(
            activitiesData.section
        );

        await homePage.activities.verifyAllActivitiesNavigation(
            activitiesData.section
        );

    });

});