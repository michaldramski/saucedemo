import { BasePage } from './base.page';
import { CartComponent } from './cart.component';
import { MainMenuComponent } from './main-menu.component';

export class CheckoutOverview extends BasePage {
    main_menu = new MainMenuComponent();
    cart_menu = new CartComponent();
    inventory_items_names = `[data-test="inventory-item-name"]`;
    cancel_button = `[data-test="cancel"]`;
    finish_button = `[data-test="finish"]`;

    open(): void {
        super.open('checkout-step-two.html');
    }

    getInventoryItemsNames(): Cypress.Chainable<string[]> {
        return cy.get(this.inventory_items_names).then((items) => {
            const names: string[] = [];
            items.each((_index, item) => {
                names.push(item.textContent.trim());
            });
            return names;
        });
    }

    completeOrder(): void {
        cy.get(this.finish_button).click();
    }
}
