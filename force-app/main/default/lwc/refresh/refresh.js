import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";
import changerecordtype from '@salesforce/apex/CheckRecordType.changerecordtype';
import getOppId from '@salesforce/apex/CheckRecordType.getOppId';


export default class Refresh extends LightningElement {


  @api recordId;
  @api isValid;
  @api isConvertedLead;
  @api newcustomer;
  @api OppId;
  error;
  value;
  @track recordtype;
  @track customertype;
  @api isdone;

rec = '0062w0000065zfhAAA';

@wire(getOppId, { OppId: '$recordId' })
  WiredLead({ error, data }) {
    if (data) {
       // this.rec = $recordId

      console.log('data ', data)
   // window.location.href = '/'+this.rec; //directly reload the page

    }
    else {
      this.error = error;
    }
  };

   changestatus(event) {

    window.location.href = '/'+this.rec;

    

  }
}