import { test, expect } from '@playwright/test';
import { NavigationMenu } from './NavigationMenu.js';
import { report } from '../utils/ReportManager.js';
import { AssertionHelper } from '../helpers/AssertionHelper.js';

export class Header{
    constructor(page){
        this.page=page;

        this.logo = this.logo = page.locator('img[alt^="logo"]');

        this.menusList = page.locator('.main-menu-list');
      
        this.searchIcon = page.locator('.open-header-search');
        this.ticketButton = page.getByRole('link', {name:'TICKETS', exact: true});
        this.profileIcon = page.locator('.user-header-link');
        this.languageSelector = page.locator('.language-wrap .active');

        this.navigatetoSubMenu = new NavigationMenu(page);

    }

    async verifyMenu(menu){
        const menuName = this.menusList.filter({ 
            has: this.page.getByRole('link', {name: menu.menu, exact:true })
        });
       
        await AssertionHelper.verifyVisible(menuName, 'Header',`${menu.menu} Menu`,false)
        // await expect(menuName).toBeVisible();
        // report.addResult(
        //     'Header',
        //     `${menu.menu} Menu`,
        //     'Pass',
        //     `Menu is visible`
        // );
    }

    async verifyHeader() {

        await AssertionHelper.verifyVisible(this.logo, 'Header', 'Logo', false);

        await AssertionHelper.verifyVisible(this.searchIcon,'Header','Search Icon',false);

        await AssertionHelper.verifyVisible(this.ticketButton,'Header','Tickets Button',false);

        await AssertionHelper.verifyVisible(this.profileIcon,'Header','Profile Icon',false);

        await AssertionHelper.verifyVisible(this.languageSelector,'Header','Language Selector',false);
    }

    //async verifyHeader(){
        
    //  try{  
    //     await expect(this.logo).toBeVisible();
    //     report.addResult(
    //         "Header",
    //         "Logo",
    //         "Pass",
    //         "Visible"
    //     );
    //     } catch(error){
    //         report.addResult("Header", "Logo", "Fail", error.message);
    //         throw error;
    //     }

    // try{  
    //     await expect(this.searchIcon).toBeVisible();
    //     report.addResult(
    //         'Header',
    //         'Search Icon',
    //         'Pass',
    //         'Visible'
    //     );
    //     } catch(error){
    //         report.addResult("Header", "Search Icon", "Fail", error.message);
    //         throw error;
    //     }

        
    //     await expect(this.searchIcon).toBeVisible();
    //     report.addResult(
    //         'Header',
    //         'Search Icon',
    //         'Pass',
    //         'Visible'
    //     );

    //     await expect(this.ticketButton).toBeVisible();
    //     report.addResult(
    //         'Header',
    //         'Tickets Button',
    //         'Pass',
    //         'Visible'
    //     );
    //     await expect(this.profileIcon).toBeVisible();
    //     report.addResult(
    //         'Header',
    //         'Profile Icon',
    //         'Pass',
    //         'Visible'
    //     );
    //     await expect(this.languageSelector).toBeVisible();
    //     report.addResult(
    //         'Header',
    //         'Language Selector',
    //         'Pass',
    //         'Visible'
    //     );
    
//}
    async clicklogo(){
        await this.logo.click();
    }

    async openSearch(){
        await this.searchIcon.click();
    }

    async clickTickets(){
        await this.ticketButton.click();
    }

    async openProfile(){
        await this.profileIcon.click();
    }

    async changeLanguage(){
        await this.languageSelector.click();
    }    

}