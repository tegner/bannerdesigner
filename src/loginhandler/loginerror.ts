import { CONTACT } from '../staticvariables';

export const loginError = () => {
  const expiredEl = document.createElement('div');
  expiredEl.innerHTML = `
    Det angivne brugernavn findes ikke.<br />
    Kontakt ${CONTACT} for at blive oprettet.
    `;

  return expiredEl;
};
