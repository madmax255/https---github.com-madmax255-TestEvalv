@isTest
public class AccountTest {

    @isTest
    public static void met(){
        List<Account> acclst = new List<Account>();
        Account acc= new Account();
        acc.Name = 'test';
        acc.Account_Activation_Summary__c = 'test';
        acc.Active__c = true;
        acclst.add(acc);
        
        Account acc2= new Account();
        acc2.Name = 'test';
        acc2.Company_Email__c = 'k@test.com';
        acc2.Phone = '1234567891';
        acc2.Account_Activation_Summary__c = 'test';
        acc2.Active__c = true;
        acclst.add(acc2);
        insert acclst;
        
        
        Account acc3= new Account();
        acc3.Name = 'test';
        acc3.Company_Email__c = 'k@test.com';
        acc3.Phone = '1234567891';
        insert acc3;
        
        acc3.Account_Activation_Summary__c = 'test';
        acc3.Active__c = true;
        update acc3;
        
    }
}