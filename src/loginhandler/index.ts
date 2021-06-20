import { decode, encode } from '../util/encoding';
import { ELoginStatus } from '../util/initialstate';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';
import { DATES } from './dates';
import { TOKEN } from './token';

// const decodedData = window.atob(encodedData); // decode the string

export class LoginHandler {
  private container = document.createElement('div');
  private toDay: number = new Date().getTime();
  private token;

  constructor() {
    this.checkTokenStatus();
  }

  /**
   * render
   */
  public renderLoginForm() {
    const loginForm = document.createElement('form');
    const userInput = document.createElement('input');

    loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const val = userInput.value;
      const userData = DATES.find((el) => el.username === val);
      if (!userData) {
        store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.logInError);
      } else {
        const { expires } = userData;
        const userDate = new Date(expires);
        if (userDate && userDate.getTime() > this.toDay) {
          const encodedData = encode(JSON.stringify(userDate.getTime()));

          localStorage.setItem(TOKEN, encodedData);

          store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
        } else if (userDate && userDate.getTime() < this.toDay) {
          store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
        }
      }
    });

    loginForm.appendChild(userInput);
    this.container.appendChild(loginForm);

    return this.container;
  }

  private checkTokenStatus() {
    console.log('not logged in');
    this.token = localStorage.getItem(TOKEN);
    console.log('token', this.token);
    if (!this.token) {
      store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.notLoggedIn);
    } else {
      const decodedToken = JSON.parse(decode(this.token));
      const decodedDate = new Date(decodedToken).getTime();

      if (decodedDate > new Date().getTime()) {
        store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
      } else {
        store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
      }
    }
  }
}
