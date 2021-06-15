import { createForm } from './formcreator';

const thing = document.getElementById('app');

thing.appendChild(createForm());

// window.addEventListener('beforeunload', (ev) => {
//   console.log('beforeunload');
//   ev.preventDefault();
//   return (ev.returnValue = 'Did you remember to download your work?');
// });
