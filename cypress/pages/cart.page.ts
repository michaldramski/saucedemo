import { BasePage } from './base.page';

export class CartPage extends BasePage {
    items_list = `[data-test="cart-list"]`;
    items_list_items = `[data-test="cart-list"] > .cart_item`;
    items_list_items_names = `[data-test="cart-list"] > .cart_item .inventory_item_name`;
    checkout_button = `[data-test="checkout"]`;

    getCartItemsNames(): Cypress.Chainable<string[]> {
        return cy.get(this.items_list_items_names).then((elements) => {
            const names: string[] = [];
            elements.each((_index, element) => {
                if (element.textContent) {
                    names.push(element.textContent.trim());
                }
            });
            return names;
        });
    }

    navigateToCheckout(): void {
        cy.get(this.checkout_button).click();
    }
}
