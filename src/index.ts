import { themes } from './canvascreator/themes';
import { createForm } from './formcreator';

// const bannerdesigner = document.getElementById('bannerdesigner') as HTMLFormElement;

const thing = document.getElementById('app');

thing.appendChild(createForm(themes));
