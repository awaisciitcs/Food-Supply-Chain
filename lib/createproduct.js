
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {supplychain.createproduct} createproduct
 * @transaction
 */

async function createproduct(tx) {
    let AssetRegistry = await getAssetRegistry("supplychain.product")
    var factory = getFactory();
    var flight = factory.newResource('supplychain', 'product', tx.productId);
 
    let AircraftRegistry = await getAssetRegistry("supplychain.catagory");
    let Aircraft = await AircraftRegistry.get(tx.catagoryId);
    
    flight.productStatus = tx.productStatus;    
    var date =new Date();
    min = date.getMinutes();
    flight.productStartingMin =min;
    flight.expectedEndingMins =80;
    await AssetRegistry.add(flight);
    
    if(Aircraft.flightList){
        
        Aircraft.flightList.push(tx.productId);
        await AircraftRegistry.update(Aircraft);

    }
    else{

        var temp = new Array();
        temp.push(tx.productId);
        Aircraft.flightList = temp; 
        await AircraftRegistry.update(Aircraft);
        
    }
}