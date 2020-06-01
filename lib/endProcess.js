
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {supplychain.endProcess} endProcess
 * @transaction
 */
async function endProcess(tx) {

  function diff_Mins(dt2, dt1) {

  var diffMin =(dt2.getMinutes() - dt1.getMinutes());
  return Math.abs(Math.round(diffMin));

  }
      function range(size, startAt) {
    return [...Array(size).keys()].map(i => i + startAt);
}
var ViewProductDetails = new Array();
ViewProductDetails = range(5,76);
var CompleteCatagoriesInformation = new Array();
CompleteCatagoriesInformation = range(2,75);

var ProductConfirmationAfterReceiving = new Array();
ProductConfirmationAfterReceiving = range(1,73);

var CleaningOperationsOfMart = new Array();
CleaningOperationsOfMart = range(1,73);

var ProductShelfComplitionProcess = new Array();
ProductShelfComplitionProcess = range(1,73);

var PaymentsByMartAdmin = new Array();
PaymentsByMartAdmin = range(2,71);

var ViewReports = new Array();
ViewReports = range(2,71);

var CompleteProductInformation = new Array();
CompleteProductInformation = range(2,69);

var ProductManufacturing = new Array();
ProductManufacturing = range(2,69);

var AddSampleProductDetails = new Array();
AddSampleProductDetails = range(2,69);

var AddProductBatchDetails = new Array();
AddProductBatchDetails = range(1,69);

var ProductPackaging = new Array();
ProductPackaging = range(1,63);

var DistributorInformationBeforePickUp = new Array();
DistributorInformationBeforePickUp = range(1,41);

var AddAgentInformationInWarehouseStock = new Array();
AddAgentInformationInWarehouseStock = range(1,56);

var BatchStatusBeforeShipment = new Array();
BatchStatusBeforeShipment = range(1,56);

var UpdateStatusOfDelivery = new Array();
UpdateStatusOfDelivery = range(10,56);

var ProductBatchStatus = new Array();
ProductBatchStatus = range(2,59);

var DeliveredProduct = new Array();
DeliveredProduct = range(10,46);

var AddDeliveryTimeAndDate = new Array();
AddDeliveryTimeAndDate = range(1,41);

var FuelingDuringDistrbution = new Array();
FuelingDuringDistrbution = range(25,39);

var PackagingOperationsOnProduct = new Array();
PackagingOperationsOnProduct = range(20,51);

var ProductDistribution = new Array();
ProductDistribution = range(18,33);

var processArray = new Array()
processArray = [
  ViewProductDetails,
  CompleteCatagoriesInformation,
  ProductConfirmationAfterReceiving,
  CleaningOperationsOfMart,
  ProductShelfComplitionProcess,
  PaymentsByMartAdmin,
  ViewReports,
  CompleteProductInformation,
  ProductManufacturing,
  AddSampleProductDetails,
  AddProductBatchDetails,
  ProductPackaging,
  DistributorInformationBeforePickUp,
  AddAgentInformationInWarehouseStock,
  BatchStatusBeforeShipment,
  ProductBatchStatus,
  DeliveredProduct,
  AddDeliveryTimeAndDate,
  FuelingDuringDistrbution,
  PackagingOperationsOnProduct
,ProductDistribution
];


var processNamesArray = new Array()
processNamesArray = [
  "ViewProductDetails",
  "CompleteCatagoriesInformation",
  "ProductConfirmationAfterReceiving",
  "CleaningOperationsOfMart",
  "ProductShelfComplitionProcess",
  "PaymentsByMartAdmin",
  "ViewReports",
  "CompleteProductInformation",
  "ProductManufacturing",
  "AddSampleProductDetails",
  "AddProductBatchDetails",
  "ProductPackaging",
  "DistributorInformationBeforePickUp",
  "AddAgentInformationInWarehouseStock",
  "BatchStatusBeforeShipment",
  "ProductBatchStatus",
  "DeliveredProduct",
  "AddDeliveryTimeAndDate",
  "FuelingDuringDistrbution",
  "PackagingOperationsOnProduct"
,"ProductDistribution"
];


  var current = new Date();
tx.endTime = current;
var endmin = current.getMinutes();
  
  let AssetRegistry = await getAssetRegistry("supplychain.product")
  let flight = await AssetRegistry.get(tx.productId);
  
  
  
  if(tx.participantType =="Agent"){

    let participantRegistry = await getParticipantRegistry("supplychain.Agent");
    let participant = await participantRegistry.get(tx.participantId);

    if(participant){
      var dfact = getFactory();
      var dReport = dfact.newConcept('supplychain','DailyReport');
      var pfact = getFactory();
      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
      var dsfact = getFactory();
      var time = dsfact.newConcept('supplychain','Time');   
      var same = 0;
      for(let i =0;i<flight.activeParticipantslist.length;i++){
        if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess==tx.processType){
          same++
          var position = i;
        
        }
      }
      if(!same==0){
        time.startTime =flight.activeParticipantslist[position].processTime.startTime;
      }
      
      time.endTime = tx.endTime;
      pStatus.time = time;
      dReport.day = tx.day;
      var difftime = diff_Mins(time.startTime,time.endTime);
      
      for(let i=0;i<=processNamesArray.length;i++){
        if(processNamesArray[i]==tx.processType){
          
          for(let j=0;j<=processArray[i].length;j++){
            if(difftime >=2&&difftime<4){
      

     
        pStatus.dutyStatus = "OnTime";
   pStatus.time = time;
      dReport.processStatus =pStatus;
      }
      else if(difftime <2){

        pStatus.dutyStatus = "TooEarly";
   pStatus.time = time;
      dReport.processStatus =pStatus;
        
      }
      else{  
    pStatus.dutyStatus ="Late";
   pStatus.time = time;
      dReport.processStatus =pStatus;
          var latelatif =new Array();
              flight.expectedEndingMins +=difftime;

    latelatif.push(dReport);
   
  }
  }
}
      }


         if(pStatus.dutyStatus=="Late"){
              if(!flight.HistoryOflateResponsiblesReports){
    
    flight.HistoryOflateResponsiblesReports = latelatif;
  }
  else{
    flight.HistoryOflateResponsiblesReports.push(dReport);
  }
          }
 
       
      if(!participant.dailyReport){
      participant.lastReport = dReport;
    var arr = new Array();
      arr.push(dReport);
      participant.dailyReport =arr;
      await participantRegistry.update(participant);
      }
      else{
      participant.lastReport = dReport;
  participant.dailyReport.push(dReport);
      await participantRegistry.update(participant);
      }
    // 
  //*****************Here History of Process Managed by any user on Completion of process****************** */
      if(flight){
      if(!flight.HistoryOfAllReports){
  var temparr = new Array();
  temparr.push(dReport);
  flight.HistoryOfAllReports = temparr;
  //  flight.flightProcessHistory = flightDataTemp;
  await AssetRegistry.update(flight);
      }
      else{ 
  flight.HistoryOfAllReports.push(dReport);
  await AssetRegistry.update(flight);
  }
      }


    }    
  }
  else if(tx.participantType =="Manufacturer"){
    let participantRegistry = await getParticipantRegistry("supplychain.Manufacturer");
    let participant = await participantRegistry.get(tx.participantId);
    if(participant){
      var dfact = getFactory();
      var dReport = dfact.newConcept('supplychain','DailyReport');
      var pfact = getFactory();
      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
      var dsfact = getFactory();
      var time = dsfact.newConcept('supplychain','Time');   
      var same = 0;
      for(let i =0;i<flight.activeParticipantslist.length;i++){
        if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess==tx.processType){
          same++
          var position = i;
        
        }
      }
      if(!same==0){
        time.startTime =flight.activeParticipantslist[position].processTime.startTime;
      }
      
      
      time.endTime = tx.endTime;
      pStatus.time = time;
      dReport.day = tx.day;
      var difftime = diff_Mins(time.startTime,time.endTime);
      
      for(let i=0;i<=processNamesArray.length;i++){
        if(processNamesArray[i]==tx.processType){
          
          for(let j=0;j<=processArray[i].length;j++){
            if(difftime >=2&&difftime<4){
      

     
        pStatus.dutyStatus = "OnTime";
   pStatus.time = time;
      dReport.processStatus =pStatus;
      }
      else if(difftime <2){

        pStatus.dutyStatus = "TooEarly";
   pStatus.time = time;
      dReport.processStatus =pStatus;
        
      }
      else{  
    pStatus.dutyStatus ="Late";
   pStatus.time = time;
      dReport.processStatus =pStatus;
          var latelatif =new Array();
              flight.expectedEndingMins +=difftime;

    latelatif.push(dReport);
   
  }
  }
}
      }


         if(pStatus.dutyStatus=="Late"){
              if(!flight.HistoryOflateResponsiblesReports){
    
    flight.HistoryOflateResponsiblesReports = latelatif;
  }
  else{
    flight.HistoryOflateResponsiblesReports.push(dReport);
  }
          }
 
       
      if(!participant.dailyReport){
      participant.lastReport = dReport;
    var arr = new Array();
      arr.push(dReport);
      participant.dailyReport =arr;
      await participantRegistry.update(participant);
      }
      else{
      participant.lastReport = dReport;
  participant.dailyReport.push(dReport);
      await participantRegistry.update(participant);
      }
    // 
  //*****************Here History of Process Managed by any user on Completion of process****************** */
      if(flight){
      if(!flight.HistoryOfAllReports){
  var temparr = new Array();
  temparr.push(dReport);
  flight.HistoryOfAllReports = temparr;
  //  flight.flightProcessHistory = flightDataTemp;
  await AssetRegistry.update(flight);
      }
      else{ 
  flight.HistoryOfAllReports.push(dReport);
  await AssetRegistry.update(flight);
  }
      }


    }
  }
  else if(tx.participantType =="Distributor"){
    let participantRegistry = await getParticipantRegistry("supplychain.Distributor");
    let participant = await participantRegistry.get(tx.participantId);
    if(participant){
      var dfact = getFactory();
      var dReport = dfact.newConcept('supplychain','DailyReport');
      var pfact = getFactory();
      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
      var dsfact = getFactory();
      var time = dsfact.newConcept('supplychain','Time');   
      var same = 0;
      for(let i =0;i<flight.activeParticipantslist.length;i++){
        if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess==tx.processType){
          same++
          var position = i;
        
        }
      }
      if(!same==0){
        time.startTime =flight.activeParticipantslist[position].processTime.startTime;
      }
      
      
      time.endTime = tx.endTime;
      pStatus.time = time;
      dReport.day = tx.day;
      var difftime = diff_Mins(time.startTime,time.endTime);
      
      for(let i=0;i<=processNamesArray.length;i++){
        if(processNamesArray[i]==tx.processType){
          
          for(let j=0;j<=processArray[i].length;j++){
           if(difftime >=2&&difftime<4){
      

     
        pStatus.dutyStatus = "OnTime";
   pStatus.time = time;
      dReport.processStatus =pStatus;
      }
      else if(difftime <2){

        pStatus.dutyStatus = "TooEarly";
   pStatus.time = time;
      dReport.processStatus =pStatus;
        
      }
      else{  
    pStatus.dutyStatus ="Late";
   pStatus.time = time;
      dReport.processStatus =pStatus;
          var latelatif =new Array();
              flight.expectedEndingMins +=difftime;

    latelatif.push(dReport);
   
  }
  }
}
      }


         if(pStatus.dutyStatus=="Late"){
              if(!flight.HistoryOflateResponsiblesReports){
    
    flight.HistoryOflateResponsiblesReports = latelatif;
  }
  else{
    flight.HistoryOflateResponsiblesReports.push(dReport);
  }
          }
 
       
      if(!participant.dailyReport){
      participant.lastReport = dReport;
    var arr = new Array();
      arr.push(dReport);
      participant.dailyReport =arr;
      await participantRegistry.update(participant);
      }
      else{
      participant.lastReport = dReport;
  participant.dailyReport.push(dReport);
      await participantRegistry.update(participant);
      }
    // 
  //*****************Here History of Process Managed by any user on Completion of process****************** */
      if(flight){
      if(!flight.HistoryOfAllReports){
  var temparr = new Array();
  temparr.push(dReport);
  flight.HistoryOfAllReports = temparr;
  //  flight.flightProcessHistory = flightDataTemp;
  await AssetRegistry.update(flight);
      }
      else{ 
  flight.HistoryOfAllReports.push(dReport);
  await AssetRegistry.update(flight);
  }
      }


    }
  }
  else if(tx.participantType =="WarehouseManager"){
  let participantRegistry = await getParticipantRegistry("supplychain.WarehouseManager");
  let participant = await participantRegistry.get(tx.participantId);
  if(participant){
      var dfact = getFactory();
      var dReport = dfact.newConcept('supplychain','DailyReport');
      var pfact = getFactory();
      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
      var dsfact = getFactory();
      var time = dsfact.newConcept('supplychain','Time');   
      var same = 0;
      for(let i =0;i<flight.activeParticipantslist.length;i++){
        if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess==tx.processType){
          same++
          var position = i;
        
        }
      }
      if(!same==0){
        time.startTime =flight.activeParticipantslist[position].processTime.startTime;
      }
      
      
      time.endTime = tx.endTime;
      pStatus.time = time;
      dReport.day = tx.day;
      var difftime = diff_Mins(time.startTime,time.endTime);
      
      for(let i=0;i<=processNamesArray.length;i++){
        if(processNamesArray[i]==tx.processType){
          
          for(let j=0;j<=processArray[i].length;j++){
           if(difftime >=2&&difftime<4){
      

     
        pStatus.dutyStatus = "OnTime";
   pStatus.time = time;
      dReport.processStatus =pStatus;
      }
      else if(difftime <2){

        pStatus.dutyStatus = "TooEarly";
   pStatus.time = time;
      dReport.processStatus =pStatus;
        
      }
      else{  
    pStatus.dutyStatus ="Late";
   pStatus.time = time;
      dReport.processStatus =pStatus;
          var latelatif =new Array();
              flight.expectedEndingMins +=difftime;

    latelatif.push(dReport);
   
  }
  }
}
      }


         if(pStatus.dutyStatus=="Late"){
              if(!flight.HistoryOflateResponsiblesReports){
    
    flight.HistoryOflateResponsiblesReports = latelatif;
  }
  else{
    flight.HistoryOflateResponsiblesReports.push(dReport);
  }
          }
 
       
      if(!participant.dailyReport){
      participant.lastReport = dReport;
    var arr = new Array();
      arr.push(dReport);
      participant.dailyReport =arr;
      await participantRegistry.update(participant);
      }
      else{
      participant.lastReport = dReport;
  participant.dailyReport.push(dReport);
      await participantRegistry.update(participant);
      }
    // 
  //*****************Here History of Process Managed by any user on Completion of process****************** */
      if(flight){
      if(!flight.HistoryOfAllReports){
  var temparr = new Array();
  temparr.push(dReport);
  flight.HistoryOfAllReports = temparr;
  //  flight.flightProcessHistory = flightDataTemp;
  await AssetRegistry.update(flight);
      }
      else{ 
  flight.HistoryOfAllReports.push(dReport);
  await AssetRegistry.update(flight);
  }
      }


  }
  }
  else if(tx.participantType =="MartAdmin"){
    let participantRegistry = await getParticipantRegistry("supplychain.MartAdmin");
    let participant = await participantRegistry.get(tx.participantId);
    if(participant){
      var dfact = getFactory();
      var dReport = dfact.newConcept('supplychain','DailyReport');
      var pfact = getFactory();
      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
      var dsfact = getFactory();
      var time = dsfact.newConcept('supplychain','Time');   
      var same = 0;
      for(let i =0;i<flight.activeParticipantslist.length;i++){
        if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess==tx.processType){
          same++
          var position = i;
        
        }
      }
      if(!same==0){
        time.startTime =flight.activeParticipantslist[position].processTime.startTime;
      }
      
      
      time.endTime = tx.endTime;
      pStatus.time = time;
      dReport.day = tx.day;
      var difftime = diff_Mins(time.startTime,time.endTime);
      
      for(let i=0;i<=processNamesArray.length;i++){
        if(processNamesArray[i]==tx.processType){
          
          for(let j=0;j<=processArray[i].length;j++){
           if(difftime >=2&&difftime<4){
      

     
        pStatus.dutyStatus = "OnTime";
   pStatus.time = time;
      dReport.processStatus =pStatus;
      }
      else if(difftime <2){

        pStatus.dutyStatus = "TooEarly";
   pStatus.time = time;
      dReport.processStatus =pStatus;
        
      }
      else{  
    pStatus.dutyStatus ="Late";
   pStatus.time = time;
      dReport.processStatus =pStatus;
          var latelatif =new Array();
              flight.expectedEndingMins +=difftime;

    latelatif.push(dReport);
   
  }
  }
}
      }


         if(pStatus.dutyStatus=="Late"){
              if(!flight.HistoryOflateResponsiblesReports){
    
    flight.HistoryOflateResponsiblesReports = latelatif;
  }
  else{
    flight.HistoryOflateResponsiblesReports.push(dReport);
  }
          }
 
       
      if(!participant.dailyReport){
      participant.lastReport = dReport;
    var arr = new Array();
      arr.push(dReport);
      participant.dailyReport =arr;
      await participantRegistry.update(participant);
      }
      else{
      participant.lastReport = dReport;
  participant.dailyReport.push(dReport);
      await participantRegistry.update(participant);
      }
    // 
  //*****************Here History of Process Managed by any user on Completion of process****************** */
      if(flight){
      if(!flight.HistoryOfAllReports){
  var temparr = new Array();
  temparr.push(dReport);
  flight.HistoryOfAllReports = temparr;
  //  flight.flightProcessHistory = flightDataTemp;
  await AssetRegistry.update(flight);
      }
      else{ 
  flight.HistoryOfAllReports.push(dReport);
  await AssetRegistry.update(flight);
  }
      }


    }
  }
  /*
  

  */
  if(tx.processType == "DelayAllocationAndTeamDeBrief"){
    flight.flightStatus = "Approved";
    await AssetRegistry.update(flight);

  }
}

