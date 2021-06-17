import { encode } from '../util/encoding';
import { ELoginStatus } from '../util/initialstate';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';
import { DATES } from './dates';
import { TOKEN } from './token';

// const decodedData = window.atob(encodedData); // decode the string

export class NotLoggedIn {
  private toDay: number = new Date().getTime();

  constructor() {
    console.log('not logged in');
  }

  /**
   * render
   */
  public render() {
    const loginForm = document.createElement('form');
    const userInput = document.createElement('input');

    loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const val = userInput.value;
      const userData = DATES.find((el) => el.username === val);

      const { expires } = userData;
      const userDate = new Date(expires);
      if (userDate && userDate.getTime() > this.toDay) {
        const encodedData = encode(JSON.stringify(userDate.getTime()));

        localStorage.setItem(TOKEN, encodedData);

        store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.loggedIn);
      } else if (userDate && userDate.getTime() < this.toDay) {
        store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.expired);
      } else {
        store.commit(STOREACTIONS.setLoginStatus, ELoginStatus.notLoggedIn);
      }
    });

    loginForm.appendChild(userInput);
    return loginForm;
  }
}
