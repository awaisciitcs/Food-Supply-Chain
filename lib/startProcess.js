
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {supplychain.startProcess} startProcess
 * @transaction
 */

async function startProcess(tx) {
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
  let AssetRegistry = await getAssetRegistry("supplychain.product")
  let flight = await AssetRegistry.get(tx.productId);
if(flight.productStatus == "OnHold" ||flight.productStatus == "Rejected"){
  var processmin = new Date();
  var startprocessmin = processmin.getMinutes();
  var diffmin = (startprocessmin)-(flight.flightStartingMin);
  
  for(let i=0;i<=processNamesArray.length;i++){
    if(processNamesArray[i]==tx.processType){
    
       
          if(flight){
              if(tx.participantType =="Agent"){
                console.log("Agnet");

                  let participantRegistry = await getParticipantRegistry("supplychain.Agent");
                  let participant = await participantRegistry.get(tx.participantId);
                  if(participant){
                    console.log("above");
                      var dfact = getFactory();
                      var dReport = dfact.newConcept('supplychain','DailyReport');
                      var pfact = getFactory();
                      var pStatus = pfact.newConcept('supplychain','ProcessStatus');
                      var dsfact = getFactory();
                      var time = dsfact.newConcept('supplychain','Time');
                      time.startTime = tx.startTime;
                      pStatus.time = time;           
                      pStatus.processType = tx.processType;
                      dReport.day = tx.day;
                      dReport.processStatus =pStatus;
                      participant.lastReport = dReport;
                      console.log("here");
                      await participantRegistry.update(participant);
                    
                  }
              }
              else if (tx.participantType =="Manufacturer"){
                let participantRegistry = await getParticipantRegistry("supplychain.Manufacturer");
                let participant = await participantRegistry.get(tx.participantId);
                if(participant){
                  console.log("above");
                  var dfact = getFactory();
                  var dReport = dfact.newConcept('supplychain','DailyReport');
                  var pfact = getFactory();
                  var pStatus = pfact.newConcept('supplychain','ProcessStatus');
                  var dsfact = getFactory();
                  var time = dsfact.newConcept('supplychain','Time');
                  time.startTime = tx.startTime;
                  pStatus.time = time;           
                  pStatus.processType = tx.processType;
                  dReport.day = tx.day;
                  dReport.processStatus =pStatus;
                  participant.lastReport = dReport;
                  console.log("here");
                  await participantRegistry.update(participant);
                          
                }
              }
              else if (tx.participantType =="Distributor"){
            
                let participantRegistry = await getParticipantRegistry("supplychain.Distributor");
                let participant = await participantRegistry.get(tx.participantId);
                if(participant){
                  console.log("above");
                  var dfact = getFactory();
                  var dReport = dfact.newConcept('supplychain','DailyReport');
                  var pfact = getFactory();
                  var pStatus = pfact.newConcept('supplychain','ProcessStatus');
                  var dsfact = getFactory();
                  var time = dsfact.newConcept('supplychain','Time');
                  time.startTime = tx.startTime;
                  pStatus.time = time;           
                  pStatus.processType = tx.processType;
                  dReport.day = tx.day;
                  dReport.processStatus =pStatus;
                  participant.lastReport = dReport;
                  console.log("here");
                  await participantRegistry.update(participant);
                              
                  }
              }
              else if (tx.participantType =="WarehouseManager"){
                let participantRegistry = await getParticipantRegistry("supplychain.WarehouseManager");
                let participant = await participantRegistry.get(tx.participantId);
                if(participant){
                  console.log("above");
                  var dfact = getFactory();
                  var dReport = dfact.newConcept('supplychain','DailyReport');
                  var pfact = getFactory();
                  var pStatus = pfact.newConcept('supplychain','ProcessStatus');
                  var dsfact = getFactory();
                  var time = dsfact.newConcept('supplychain','Time');
                  time.startTime = tx.startTime;
                  pStatus.time = time;           
                  pStatus.processType = tx.processType;
                  dReport.day = tx.day;
                  dReport.processStatus =pStatus;
                  participant.lastReport = dReport;
                  console.log("here");
                  await participantRegistry.update(participant);
                    
                }
          
              }
              else if (tx.participantType =="MartAdmin"){
                let participantRegistry = await getParticipantRegistry("supplychain.MartAdmin");
                let participant = await participantRegistry.get(tx.participantId);
                if(participant){
                  console.log("above");
                  var dfact = getFactory();
                  var dReport = dfact.newConcept('supplychain','DailyReport');
                  var pfact = getFactory();
                  var pStatus = pfact.newConcept('supplychain','ProcessStatus');
                  var dsfact = getFactory();
                  var time = dsfact.newConcept('supplychain','Time');
                  time.startTime = tx.startTime;
                  pStatus.time = time;           
                  pStatus.processType = tx.processType;
                  dReport.day = tx.day;
                  dReport.processStatus =pStatus;
                  participant.lastReport = dReport;
                  console.log("here");
                  await participantRegistry.update(participant);
                    
                }
          
              }        
          /*
              
            
  
           */     
              }
              
          
        }
      

    

  }
      //***********Check flight and update flight ********* */
  //**********************RealTime startTime Managed here*************** */

  var actPart = getFactory();
  var activeParticipanttemp = actPart.newConcept('supplychain','ActiveParticipants');
  activeParticipanttemp.participantId = tx.participantId;
  activeParticipanttemp.currentProcess = tx.processType;
  var tfact = getFactory();

  var time = tfact.newConcept('supplychain','Time');
  time.startTime = tx.startTime;
  activeParticipanttemp.processTime = time;

  if(flight.activeParticipantslist){
var same = 0;
var diff = 0
    for(let i =0;i<flight.activeParticipantslist.length;i++){
      if(flight.activeParticipantslist[i].participantId == tx.participantId && flight.activeParticipantslist[i].currentProcess ==tx.processType )		{
        same++
        
      }
      else{
        console.log("diff")
        diff++
      }
      // else{
      //   console.log("different")
  
      // }
    }
    if(same ==0){
      flight.activeParticipantslist.push(activeParticipanttemp);
      await AssetRegistry.update(flight);  
    }
    
  }
  else{
    var arr = new Array();
    arr.push(activeParticipanttemp);
    flight.activeParticipantslist = arr;
    await AssetRegistry.update(flight);

  }

}

else{
  console.log("This Chain session has ended");
}

  
}


