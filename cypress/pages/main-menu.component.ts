export class MainMenuComponent {
    main_menu_button = `#menu_button_container .bm-burger-button button`;
    all_items_button = `.bm-menu #inventory_sidebar_link`;
    logout_button = `.bm-menu #logout_sidebar_link`;
    close_main_menu_button = `.bm-cross-button #react-burger-cross-btn`;

    openMainMenu(): void {
        cy.get(this.main_menu_button).click();
    }

    closeMainMenu(): void {
        cy.get(this.close_main_menu_button).click();
    }

    openAllItems(): void {
        this.openMainMenu();
        cy.get(this.all_items_button).click();
        this.closeMainMenu();
    }

    logout(): void {
        this.openMainMenu();
        cy.get(this.logout_button).click();
    }
}
