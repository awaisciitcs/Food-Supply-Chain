
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {supplychain.createStaff} createStaff
 * @transaction
 */

async function createStaff(tx) {
    // o ParticipantType userId
    // o String emailId
    // o String password
    // o DateTime dateTime optional  
    // o DutyStatus dutyStatus optional
    
if(tx.participantType =="Agent"){

    let ParticipantRegistry = await getParticipantRegistry("supplychain.Agent")
    var factory = getFactory();
    var participant = factory.newResource('supplychain', 'Agent', tx.userId);
    var fact = getFactory();
    var userd = fact.newConcept('supplychain','User');
    userd.emailId = tx.emailId;
    userd.password = tx.password;
    participant.userData = userd;  
    await ParticipantRegistry.add(participant);

}

else if(tx.participantType =="Manufacturer"){
    
    
    let ParticipantRegistry = await getParticipantRegistry("supplychain.Manufacturer")
    var factory = getFactory();
    var participant = factory.newResource('supplychain', 'Manufacturer', tx.userId);
    var fact = getFactory();
    var userd = fact.newConcept('supplychain','User');
    userd.emailId = tx.emailId;
    userd.password = tx.password;
    participant.userData = userd;  
    await ParticipantRegistry.add(participant);

}

else if(tx.participantType =="Distributor"){


    let ParticipantRegistry = await getParticipantRegistry("supplychain.Distributor")
    var factory = getFactory();
    var participant = factory.newResource('supplychain', 'Distributor', tx.userId);
    var fact = getFactory();
    var userd = fact.newConcept('supplychain','User');
    userd.emailId = tx.emailId;
    userd.password = tx.password;
    participant.userData = userd;  
    await ParticipantRegistry.add(participant);
}

else if(tx.participantType =="WarehouseManager"){

    let ParticipantRegistry = await getParticipantRegistry("supplychain.WarehouseManager")
    var factory = getFactory();
    var participant = factory.newResource('supplychain', 'WarehouseManager', tx.userId);
    var fact = getFactory();
    var userd = fact.newConcept('supplychain','User');
    userd.emailId = tx.emailId;
    userd.password = tx.password;
    participant.userData = userd;  
    await ParticipantRegistry.add(participant);
}

else if(tx.participantType =="MartAdmin"){

    let ParticipantRegistry = await getParticipantRegistry("supplychain.MartAdmin")
    var factory = getFactory();
    var participant = factory.newResource('supplychain', 'MartAdmin', tx.userId);
    var fact = getFactory();
    var userd = fact.newConcept('supplychain','User');
    userd.emailId = tx.emailId;
    userd.password = tx.password;
    participant.userData = userd;  
    await ParticipantRegistry.add(participant);
}

}

