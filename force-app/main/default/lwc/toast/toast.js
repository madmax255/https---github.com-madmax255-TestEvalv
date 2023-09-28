import { LightningElement } from 'lwc';
import modal from "@salesforce/resourceUrl/com";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from "lightning/platformResourceLoader";

export default class Toast extends LightningElement {

vari=true;
connectedCallback() {
    loadStyle(this, modal);
  }

showToast() {
        const event = new ShowToastEvent({
            title: 'Get Help',
            message:
                'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
        });
        this.dispatchEvent(event);
    }
}