import { createForm } from './formcreator';
import { NotLoggedIn } from './notloggedin';
import { TOKEN } from './notloggedin/token';
import { decode } from './util/encoding';
import { eventhandler } from './util/eventhandler';
import { ELoginStatus, STATENAMES } from './util/initialstate';
import store from './util/store';
import { STOREACTIONS } from './util/store/actions';
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

    eventhandler.subscribe(STATENAMES.loginStatus, (status, _state) => {
      console.log('login status?', status);
      switch (status) {
        case ELoginStatus.expired:
          this.tokenExpired();
          break;
        case ELoginStatus.loggedIn:
          this.renderForm();
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
    const token = localStorage.getItem(TOKEN);
    console.log('token', token);
    if (!token) {
      this.notLoggedIn();
    } else {
      const decodedToken = JSON.parse(decode(token));
      const decodedDate = new Date(decodedToken).getTime();

      if (decodedDate > new Date().getTime()) {
        store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
      } else {
        store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
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
