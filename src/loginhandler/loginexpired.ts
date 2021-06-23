import { CONTACT } from '../staticvariables';

export const loginExpired = () => {
  const expiredEl = document.createElement('div');
  expiredEl.innerHTML = `
    Din adgang er udløbet.<br />
    Kontakt ${CONTACT} for at få en opdateret dit abonnement.
    `;

  return expiredEl;
};
