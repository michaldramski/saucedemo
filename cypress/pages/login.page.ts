import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    login_input = '#user-name';
    password_input = '#password';
    login_button = '#login-button';
    error_message = 'h3[data-test="error"]';

    login(login: string, password: string): void {
        cy.get(this.login_input).type(login);
        cy.get(this.password_input).type(password);
        cy.get(this.login_button).click();
    }
}
