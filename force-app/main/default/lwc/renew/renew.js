import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";
import changerecordtype from '@salesforce/apex/CheckRecordType.changerecordtype';
import getOppId from '@salesforce/apex/CheckRecordType.getOppId';


export default class Renew extends LightningElement {
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


  isConvertedLead = false;
  closeAction() {
    this.dispatchEvent(new CloseActionScreenEvent());
    if (this.isconvertedLead) {
      this.leadAlreadyConverted();
    }else if(this.isdone){
      this.already();
    }
  }

  @wire(getOppId, { OppId: '$recordId' })
  WiredLead({ error, data }) {
    if (data) {
/*
      console.log('data ', data)

      if (data.Type == 'New Customer') {
        console.log('data.type ', data.Type)
        this.isconvertedLead = false;
        this.closeAction();
        console.log('Lead is converted...!')
      } else {
        this.isValid = true;

        this.isconvertedLead = true;
        console.log('Lead is NOT converted...!')
      }

      console.log('data.Type ', data.Type)
*/

    }
    else {
      this.error = error;
    }
  };

  //@wire(changerecordtype, { sRecordID: '$recordId' })

  changestatus(event) {

    changerecordtype({ opportunityId: this.recordId})
      .then((result) => {
        console.log('result is', result);
        this.isdone = true;
        this.closeAction();
      })
      .catch((error) => {
        this.error = error;

      });

    // this.isLoading = true;

  }


 AlreadyConverted() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Warning!',
        message: 'New customer is not allowed',
        variant: 'error'
      })
    );
  }

  leadAlreadyConverted() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Success!',
        message: 'Opportunity has been renewed successfully',
        type: 'success',
        variant: 'success'
      })
    );
  }
}