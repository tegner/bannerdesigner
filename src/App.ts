import { createForm } from './formcreator';
import { loginError, loginExpired, LoginHandler, notLoggedIn } from './loginhandler';
import { eventhandler } from './util/eventhandler';
import { ELoginStatus, STATENAMES } from './util/initialstate';
import store from './util/store';

class App {
  private appContainer: HTMLDivElement;
  private body = document.body;
  private loginContainer: HTMLDivElement = document.createElement('div');
  private loginForm: HTMLDivElement;
  private loginFormContainer: HTMLDivElement = document.createElement('div');
  private messageContainer: HTMLDivElement = document.createElement('div');

  constructor() {
    try {
      this.appContainer = document.getElementById('app') as HTMLDivElement;
      console.log('constructing app', this.appContainer);
      this.loginContainer.className = 'login-container';
      this.appContainer.appendChild(this.loginContainer);

      eventhandler.subscribe(STATENAMES.loginStatus, (status, _state) => {
        console.log('login status?', status);
        switch (status) {
          case ELoginStatus.expired:
            this.clearMessage();
            this.tokenExpired();
            break;
          case ELoginStatus.loggedIn:
            this.clearEverything();
            this.renderForm();
            break;
          case ELoginStatus.logInError:
            this.clearMessage();
            this.logInError();
            break;
          case ELoginStatus.notLoggedIn:
          default:
            this.clearMessage();
            this.notLoggedIn();
            break;
        }
      });
      this.loginFormContainer.className = 'login-form-container';
      this.loginContainer.appendChild(this.loginFormContainer);
      this.messageContainer.className = 'message-container';
      this.loginContainer.appendChild(this.messageContainer);
    } catch (error) {
      console.error('BANNERMAKER APP constructor', error);
    }
  }

  /**
   * init
   */
  public init() {
    const loginHandler = new LoginHandler();
    this.loginForm = loginHandler.renderLoginForm();
    if (store.state.loginStatus !== ELoginStatus.loggedIn) {
      console.log(this.loginForm);
      this.loginFormContainer.appendChild(this.loginForm);
    }
  }

  private clearEverything() {
    while (this.appContainer.firstChild) {
      this.appContainer.firstChild.remove();
    }
  }

  // private clearForm() {
  //   while (this.loginFormContainer.firstChild) {
  //     this.loginFormContainer.firstChild.remove();
  //   }
  // }

  private clearMessage() {
    while (this.messageContainer.firstChild) {
      this.messageContainer.firstChild.remove();
    }
  }

  private logInError() {
    this.body.classList.add('not-logged-in');
    console.log('add log in error message');
    this.messageContainer.appendChild(loginError());
  }

  private notLoggedIn() {
    this.body.classList.add('not-logged-in');

    console.log('add not logged in message');
    this.messageContainer.appendChild(notLoggedIn());
  }

  private renderForm() {
    this.body.classList.remove('not-logged-in');
    if (this.loginForm) this.loginForm.remove();
    this.appContainer.appendChild(createForm());
  }

  private tokenExpired() {
    this.body.classList.add('not-logged-in');
    console.log('tokenExpired');
    console.log('add token expired message');
    this.messageContainer.appendChild(loginExpired());
  }
}

export const APP = new App();
