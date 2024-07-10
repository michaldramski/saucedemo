import { SortOptions } from '../support/sort-options';
import { BasePage } from './base.page';
import { CartComponent } from './cart.component';
import { MainMenuComponent } from './main-menu.component';

export class ProductsPage extends BasePage {
    main_menu = new MainMenuComponent();
    cart_menu = new CartComponent();
    sort_dropdownlist = `[data-test="product-sort-container"]`;
    inventory_items_names = `[data-test="inventory-item-name"]`;
    inventory_items_prices = `[data-test="inventory-item-price"]`;

    add_product_button = (product: number | string): string => {
        if (typeof product === 'number') {
            return `.inventory_list > .inventory_item:nth-child(${product}) .btn_inventory`;
        } else if (typeof product === 'string') {
            return `.inventory_item:has(.inventory_item_name:contains("${product}")) button:contains("Add to cart")`;
        } else {
            return 'Incorrect type of variable product';
        }
    };

    open(): void {
        super.open('inventory.html');
    }

    addProductIntoBasket(product: number | string): void {
        cy.get(this.add_product_button(product)).click();
    }

    sortProducts(option: SortOptions): void {
        cy.get(this.sort_dropdownlist).select(option);
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

    getInventoryItemsPrices(): Cypress.Chainable<number[]> {
        return cy.get(this.inventory_items_prices).then((items) => {
            const prices: number[] = [];
            items.each((_index, item) => {
                const price = parseFloat(
                    item.textContent.trim().replace('$', ''),
                );
                prices.push(price);
            });
            return prices;
        });
    }
}
