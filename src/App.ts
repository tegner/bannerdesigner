import { createForm } from './formcreator';
import { NotLoggedIn } from './notloggedin';
import { eventhandler } from './util/eventhandler';
import { ELoginStatus, STATENAMES } from './util/initialstate';

class App {
  private appContainer: HTMLDivElement;
  private body = document.body;

  constructor(elId) {
    this.appContainer = document.getElementById(elId) as HTMLDivElement;

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
    const loginHandler = new NotLoggedIn();
    this.appContainer.appendChild(loginHandler.render());
  }

  private renderForm() {
    this.body.classList.remove('not-logged-in');
    this.appContainer.appendChild(createForm());
  }

  private notLoggedIn() {
    this.body.classList.add('not-logged-in');
    console.log('add not logged in message');
  }

  private logInError() {
    this.body.classList.add('not-logged-in');
    console.log('add not log in error message');
  }

  private tokenExpired() {
    this.body.classList.add('not-logged-in');
    console.log('tokenExpired');
    console.log('add not token expired message');
  }
}

export const APP = new App('app');
