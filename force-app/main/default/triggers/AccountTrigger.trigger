trigger AccountTrigger on Account (after insert, after update) {

    if(Trigger.isAfter && Trigger.isInsert){
        string lname;
        List<Contact> conlst = new List<Contact>();
        for(Account acc: Trigger.new){
            if(acc.Active__c == true && acc.Account_Activation_Summary__c != null){
                Contact con = new Contact();
                con.AccountId = acc.Id;
                
                lname = acc.Name;
                lname = lname.split(' ')[0];
                con.FirstName = lname;
                con.LastName = 'Customer Representative';
                
                if(acc.Phone != null){
                    con.Phone = acc.Phone;
                }
                
                if(acc.Company_Email__c != null){
                    con.Email = acc.Company_Email__c;
                }
                conlst.add(con);
            } else if(acc.Active__c == true && acc.Account_Activation_Summary__c == null){
                acc.Account_Activation_Summary__c.adderror('Please Add Account Activation Summary');
            }
        }
        if(conlst != null && conlst.size() > 0){
           insert conlst; 
        }
        
    }
    
    
    if(Trigger.isAfter && Trigger.isUpdate){
      
        string lname;
        List<Contact> conlst = new List<Contact>();
        Map<Id,String> conmap = new Map<Id,String>();
        for(Account acc: Trigger.new){
            
            string l2name;
            if((acc.Active__c != Trigger.oldMap.get(acc.Id).Active__c) && acc.Active__c == true && acc.Account_Activation_Summary__c != null){
                l2name = acc.Name;
                l2name = l2name.split(' ')[0];
                conmap.put(acc.id,l2name);
                
            } else if((acc.Active__c != Trigger.oldMap.get(acc.Id).Active__c) && acc.Active__c == true && acc.Account_Activation_Summary__c == null){
                acc.Account_Activation_Summary__c.adderror('Please Add Account Activation Summary');
            }
        }
        system.debug('conmap '+conmap);
        //check if contact 
        List<Contact> clst = [Select id,FirstName,LastName From Contact where id in: conmap.keyset() AND LastName = 'Customer Representative'];
        system.debug('clst '+clst);
        system.debug('clst.size() '+clst.size());
        if(clst.size() == 0){
              List<Contact> conlst2 = new List<Contact>();
            List<Account> lstAcc = [Select id,name,Phone,Company_Email__c from Account where id in: conmap.keyset()];
            system.debug('lstAcc '+lstAcc);
            
            for(Account acc: lstAcc){
            system.debug('inside update second');
                Contact con2 = new Contact();
                con2.AccountId = acc.Id;
                
                lname = acc.Name;
                lname = lname.split(' ')[0];
                con2.FirstName = lname;
                con2.LastName = 'Customer Representative';
                
                if(acc.Phone != null){
                    con2.Phone = acc.Phone;
                }
                
                if(acc.Company_Email__c != null){
                    con2.Email = acc.Company_Email__c;
                }
                system.debug('con '+con2);
                conlst2.add(con2);
            
        }
            system.debug('conlst2.size() '+conlst2.size());
        if(conlst2.size() != 0){
            system.debug('conlst2 '+conlst2);
                insert conlst2;
        }
                
           
        }
    }
}