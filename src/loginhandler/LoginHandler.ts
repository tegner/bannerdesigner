import { decode, encode } from '../util/encoding';
import { ELoginStatus } from '../util/initialstate';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';
import { DATES, IDATES } from './dates';
import { TOKEN } from './token';

// const decodedData = window.atob(encodedData); // decode the string

const getUserDate = (val) => DATES.find((el) => el.username.toLowerCase() === val);
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
    const loginMessage = document.createElement('small');
    loginMessage.innerHTML = 'Angiv dit brugernavn for at komme igang.';
    this.container.appendChild(loginMessage);

    const loginForm = document.createElement('form');
    const userInput = document.createElement('input');

    loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const val = userInput.value.toLowerCase();
      const userData: IDATES = getUserDate(val);

      if (!userData) {
        store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.logInError);
      } else {
        const { expires } = userData;
        const userDate = new Date(expires);
        const userTime = userDate ? userDate.getTime() : null;
        if (userTime && userTime > this.toDay) {
          const encodedData = encode(JSON.stringify(userData));

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
    if (this.token) {
      const decodedToken: IDATES = JSON.parse(decode(this.token));
      const decodedDate = new Date(decodedToken.expires).getTime();
      console.log('decodedToken', decodedToken);
      const userData: IDATES = getUserDate(decodedToken.username);
      if (userData) {
        if (decodedDate > new Date().getTime()) {
          store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
        } else {
          store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
        }
      } else {
        store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.notLoggedIn);
      }
    } else {
      store.dispatch(STOREACTIONS.setLoginStatus, ELoginStatus.notLoggedIn);
    }
  }
}
