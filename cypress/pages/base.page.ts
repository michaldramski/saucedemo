export class BasePage {
    open(path: string = ''): void {
        cy.visit(`/${path}`);
    }
}
