import { DATEINFOTYPES } from '../canvascreator/canvascreator';
import { imageUploader } from '../imagehandler/imageuploader';
import { IUserContent } from '../util/initialstate';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

class ContentHandler {
  private formElements: HTMLElement[];
  private previousInfo: IUserContent = {};

  constructor() {}
  /**
   * update
   */
  public async update(formData: HTMLFormControlsCollection, caller?: string) {
    this.formElements = Array.from(formData) as HTMLElement[];

    const info: IUserContent = {
      venueInfo: [],
    };

    const dates = {};
    let imageInput;
    this.formElements.forEach((el: HTMLInputElement) => {
      if (el.dataset.line) {
        dates[el.dataset.line] = dates[el.dataset.line] || [];
        dates[el.dataset.line].push(el);
      } else if (el.name) {
        info[el.name] = el.value;
      } else if (el.type === 'file') {
        imageInput = el.value ? el : null;
      }
    });

    if (imageInput) {
      const imageReturn = await imageUploader(imageInput);
      info.image = imageReturn;
    }

    for (const date in dates) {
      let dateText = '',
        venueText = '',
        ticketText = '';
      dates[date].forEach((dateLineEl) => {
        if (dateLineEl.name.indexOf(DATEINFOTYPES.date) !== -1) {
          dateText = dateLineEl.value.toUpperCase();
        }
        if (dateLineEl.name.indexOf(DATEINFOTYPES.venue) !== -1) {
          venueText = dateLineEl.value.toUpperCase();
        }
        if (dateLineEl.name.indexOf(DATEINFOTYPES.tickets) !== -1 && dateLineEl.checked) {
          switch (dateLineEl.value) {
            case 'few':
              ticketText = 'Få billetter'.toUpperCase();
              break;
            case 'soldout':
              ticketText = 'Udsolgt'.toUpperCase();
              break;
            default:
              ticketText = '';
              break;
          }
        }
      });

      info.venueInfo.push({
        dateText,
        ticketText,
        venueText,
      });
    }

    if (JSON.stringify(this.previousInfo) !== JSON.stringify(info)) {
      console.log('contentHandler - we got new info - publish', info);

      let imageDidChange = false;

      if (info.image) {
        if (!this.previousInfo.image) {
          imageDidChange = true;
        } else if (this.previousInfo.image && this.previousInfo.image.baseURI !== info.image.baseURI) {
          imageDidChange = true;
        }
      }
      console.log('imageDidChange?', imageDidChange);
      this.previousInfo = info;
      store.dispatch(STOREACTIONS.updateContent, { ...info, imageDidChange });
    }
  }
}

export const contentHandler = new ContentHandler();
