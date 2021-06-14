import { createForm } from './formcreator';
import { NotLoggedIn } from './notloggedin';
import { TOKEN } from './notloggedin/token';
import { decode } from './util/encoding';
// import { eventhandler } from './util/eventhandler';
// import { ELoginStatus, STATENAMES } from './util/initialstate';
// import store from './util/store';
// import store from './util/store';
// import { STOREACTIONS } from './util/store/actions';

class App {
  private appContainer: HTMLDivElement;
  private body = document.body;

  constructor(elId) {
    this.appContainer = document.getElementById(elId) as HTMLDivElement;
  }

  /**
   * init
   */
  public init() {
    const token = localStorage.getItem(TOKEN);
    console.log('token', token);
    if (!token) {
      this.notLoggedIn();
    } else {
      const decodedToken = JSON.parse(decode(token));
      const decodedDate = new Date(decodedToken).getTime();
      console.log('dec', decodedToken, decodedDate);
      if (decodedDate > new Date().getTime()) {
        this.renderForm();
        // store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
      } else {
        this.tokenExpired();
        // store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
      }
    }
  }

  public renderForm() {
    this.body.classList.remove('not-logged-in');
    this.appContainer.appendChild(createForm());
  }

  private notLoggedIn() {
    this.body.classList.add('not-logged-in');
    const newLogin = new NotLoggedIn();

    this.appContainer.appendChild(newLogin.render());
  }

  private tokenExpired() {
    this.body.classList.add('not-logged-in');
    console.log('tokenExpired');
  }
}

export const APP = new App('app');
