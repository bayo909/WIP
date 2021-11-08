import { LightningElement,api,track } from 'lwc';
//import an Apex method via the @salesforce/apex packages
import getHistories from '@salesforce/apex/CaseHistoryController.getHistories';

const COLUMNS = [
    { label: 'count(Id)', fieldName: "Agent Interaction with Case", type: 'integer'},
    { label: CreatedBy.Name, fieldName: "Agent Name" }, 
    { label: CaseId, fieldName: "Parent Case" },
];

export default class Histories extends LightningElement {
    @api recordId;//Inherits Account Record Id from Account Record Page

    @track columns = COLUMNS;
    @track data;
    @track isError=false;
    @track errorMessage;

    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        this.loadHistories();
    }
    
    loadHistories(){
        //Returns a promise
        getHistories({caseId : this.recordId})
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
