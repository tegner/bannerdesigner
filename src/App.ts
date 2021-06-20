import { createForm } from './formcreator';
import { LoginHandler } from './loginhandler';
import { eventhandler } from './util/eventhandler';
import { ELoginStatus, STATENAMES } from './util/initialstate';
import store from './util/store';

class App {
  private appContainer: HTMLDivElement;
  private body = document.body;
  private loginForm: HTMLDivElement;

  constructor() {
    this.appContainer = document.getElementById('app') as HTMLDivElement;
    console.log('constructing app');
    eventhandler.subscribe(STATENAMES.loginStatus, (status, _state) => {
      console.log('login status?', status);
      switch (status) {
        case ELoginStatus.expired:
          this.tokenExpired();
          break;
        case ELoginStatus.loggedIn:
          this.renderForm();
          break;
        case ELoginStatus.logInError:
          this.logInError();
          break;
        case ELoginStatus.notLoggedIn:
        default:
          this.notLoggedIn();
          break;
      }
    });
  }

  /**
   * init
   */
  public init() {
    const loginHandler = new LoginHandler();
    this.loginForm = loginHandler.renderLoginForm();
    if (store.state.loginStatus !== ELoginStatus.loggedIn) {
      this.appContainer.appendChild(this.loginForm);
    }
  }

  private renderForm() {
    this.body.classList.remove('not-logged-in');
    if (this.loginForm) this.loginForm.remove();
    this.appContainer.appendChild(createForm());
  }

  private notLoggedIn() {
    this.body.classList.add('not-logged-in');

    console.log('add not logged in message');
  }

  private logInError() {
    this.body.classList.add('not-logged-in');
    console.log('add log in error message');
  }

  private tokenExpired() {
    this.body.classList.add('not-logged-in');
    console.log('tokenExpired');
    console.log('add token expired message');
  }
}

export const APP = new App();
