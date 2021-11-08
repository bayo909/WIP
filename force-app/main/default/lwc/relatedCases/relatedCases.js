import { LightningElement,api,track } from 'lwc';
//import an Apex method via the @salesforce/apex packages
import aggregateRelatedHistories from '@salesforce/apex/CaseController.aggregateRelatedHistories';

const COLUMNS = [
    { label: 'count(Id)', fieldName: "Agent Interaction with Case"},
    { label: CreatedBy.Name, fieldName: "Agent Name" },
];

export default class RelatedCases extends LightningElement {
    @api recordId;//Inherits Case History Record Id from Case Record Page

    @track columns = COLUMNS;
    @track data;
    @track isError=false;
    @track errorMessage;

    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        this.loadRelatedHistories();
    }
    
    loadRelatedCases(){
        //Returns a promise
        aggregateRelatedHistories({Id : this.recordId})
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
