import { LightningElement,api,track } from 'lwc';
//import an Apex method via the @salesforce/apex packages
import getRelatedHistories from '@salesforce/apex/CaseDataService.aggregateCaseHistory';

const COLUMNS = [
    { label: 'Count', fieldName: "Number of Events"},
    { label: 'CreatedBy.Name', fieldName: "Agent Name" },
];

export default class relatedHistories extends LightningElement {
    @api recordId;//Inherits Case Record Id from Case Record Page

    @track columns = COLUMNS;
    @track data;
    @track isError=false;
    @track errorMessage;

    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        this.loadrelatedHistories();
    }
    
    loadrelatedHistories(){
        //Returns a promise
        getrelatedHistories({CaseId : this.recordId})
        .then(results=>{
            this.data=results;
            this.isError=false;
        })
        .catch(error=>{
            this.isError=true;
            this.errorMessage=error.body.message;    
        });
    }

/**
 * Normal function
 * ------------------
 * 
 * function foo(str){
 *  return "I am a Normal function "+str;
 * }
 * 
 * Arrow function (short hand notation)
 * ------------------------------------
 *  
 * str=>{
 *  return "I am a Normal function "+str;
 * }
 * 
 */
}
