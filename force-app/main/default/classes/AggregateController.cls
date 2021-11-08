public with sharing class AggregateController {
public List<AggregateResult> groupedResults{get; set;}
//public string searchstring{get;set;}
public Integer total_used{get;set;}
//public list<Contact> listcon{get; set;}

    public AggregateController(ApexPages.StandardController controller) {
groupedResults=[Select Account.Name name, Count(Id) ids From Contact Group By  Account.Name limit 100];
system.debug('groupedResults'+groupedResults[0]);
    }
    public list<AggregateResult> resellerlist {
 get { return groupedResults;}
 }
 public PageReference sendredirect(){

 return null;
 }
    /*public PageReference search(){
    groupedResults=[SELECT COUNT(Id) FROM Contact, Contact.Account ];
    listcon=[select LastName from Contact where Account.Name=:searchstring];
    system.debug('listcon'+listcon);
    system.debug('groupedResults'+groupedResults);
    total_used = Integer.valueOf(groupedResults[0].get('expr0') + '');
system.debug('total_used '+total_used );
    return null;
    }*/


}