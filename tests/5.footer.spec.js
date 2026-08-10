import { test } from '../fixtures/fixtures.js';
import { HomePage } from '../pages/HomePage.js';
import footerData from '../test-data/footer.json' with { type: 'json'};

test.describe('Homepage: Footer verification', () => {
    
    
    test('Verify Footer sections', async({ homePage }) => {

        await test.step('Verify Subscribe section', async () => {
            await homePage.footer.verifySubscribeNow(footerData.subscribeNow)


        })


        

        for (const section of footerData.sections) {
            await test.step(
                `Verify "${section.title}" footer section`,
                async () => {

                    await homePage.footer.verifySection(section);

                }
            );
        }

    });

    test('Verify Sub Footer', async ({ homePage }) => {

        await test.step(
            'Verify Sub Footer',
            async () => {

                await homePage.footer
                    .verifySubFooter(
                        footerData.subFooter
                    );

            }
        );
    });

});


