import { CONTACT } from '../staticvariables';

export const notLoggedIn = () => {
  const expiredEl = document.createElement('div');
  expiredEl.innerHTML = `
    Hvis du endnu ikke er oprettet: kontakt ${CONTACT} for at blive oprettet.
    `;

  return expiredEl;
};
