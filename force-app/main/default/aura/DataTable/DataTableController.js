({
    doInit : function(component, event, helper){
       
       
       
        var action = component.get("c.lstorderItem");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(data){
            component.set("v.OrderItems", data.getReturnValue());
           
        });
        $A.enqueueAction(action);
    }
})