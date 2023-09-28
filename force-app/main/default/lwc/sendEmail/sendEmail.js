import { LightningElement, api, wire, track } from 'lwc';
import getListview from'@salesforce/apex/SendemailTemplate.getListview';
import getemailalert from '@salesforce/apex/SendemailTemplate.getemailalert';
import inserttemplate from '@salesforce/apex/SendemailTemplate.inserttemplate';


export default class SendEmail extends LightningElement {

  @api recordId;

@track
    selectOptions = [
    ];

@track data2 = [];

@track data3 = [];

connectedCallback() {
   getListview();
   getemailalert();
}


    @wire(getListview, {})
listviews({ error, data }) {
    if (data) {
         let lstviewOption = [];
         console.log('data ',data);

         var viewstring = data.toString();
         var splitarray = [];
         splitarray = viewstring.split(",");
         for(var i=0; i< splitarray.length; i++){
             console.log('splitarray[] ',splitarray[i]);
             lstviewOption.push({value: splitarray[i], label: splitarray[i]});
         }
         this.data2 = lstviewOption;
      
    } else if (error) {
        console.error(error);
    }
}

@wire(getemailalert, {})
listemailalerts({error, data}) {
    if(data) {
        let lstemailoption = [];
        console.log('data from getemailalerts ',data);

        var emailalrtstring = data.toString();
        var splitemailarray = [];
        splitemailarray = emailalrtstring.split(",");
    for(var i=0; i< splitemailarray.length; i++){
        console.log('splitemailarray[] ',splitemailarray[i]);
        lstemailoption.push({value: splitemailarray[i], label:splitemailarray[i]});
    }
    this.data3 = lstemailoption;

    } else if (error) {
        console.error(error);
    }
}

clickHandler(){
    console.log("ABCD");
    getListview();

}

insertBtachEmail(event){

    let returnlistview = this.template.querySelector(".first-class").value;
    let returnemailalert = this.template.querySelector(".second-class").value;
  //  console.log('l l ',l);
  //  console.log('e ',e);

    inserttemplate({listv: returnlistview ,
     email: returnemailalert ,
     OppId: '$recordId' })
     .then((result)=>{
         console.log(JSON.stringify(result));
     })
     .catch((error)=>{
         console.log(error)
     });
}

   
}