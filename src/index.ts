import { themes } from './canvascreator/themes';
import { createForm } from './formcreator';

const thing = document.getElementById('app');

thing.appendChild(createForm(themes));
