public without sharing class CaseHistoryController {
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getHistories(Id caseId){
        return [select CaseId, CreatedBy.Name, count(Id) from CaseHistory Group By CaseId, CreatedBy.Name Having CaseId=:caseId];
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getHistoriesByFilter(Id caseId){
    AggregateResult[] groupedResults = [SELECT CaseId, CreatedBy.Name AgentName, count(Id) FROM CaseHistory GROUP BY CaseId, CreatedBy.Name Having CaseId=:caseId];
    for (AggregateResult ar : groupedResults)  {
        System.debug('CaseId: ' + ar.get('CaseId') + '\n' + 'CreatedById: ' + ar.get('AgentName') + '\n' + 'Number Of Interaction: ' + ar.get('expr0'));
     }
     return groupedResults;
  }
}
