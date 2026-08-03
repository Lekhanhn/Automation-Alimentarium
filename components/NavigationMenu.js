
export class NavigationMenu{
    constructor(page){
        this.page = page;
    }

    async hoverMenu(menuName){
        await this.page
        .getByRole('link', { name: menuName})
        .hover();
    }

    async verifySubmenu(subMenuName){
        await expect(
            this.page.getByRole('link', { name: subMenuName })
        ).toBeVisible();
    }

    async clickSubmenu(subMenuName){
        await expect(
            this.page.getByRole('link', { name: subMenuName })
        ).click();
    }


    async openSubMenu(menuName, subMenuName){
        await this.hoverMenu(menuName);
        await this.verifySubMenuVisible(subMenuName);
        await this.clickSubmenu(subMenuName);  
    }
}