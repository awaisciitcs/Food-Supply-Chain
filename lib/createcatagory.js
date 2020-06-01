
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {supplychain.createcatagory} createcatagory
 * @transaction
 */

async function createcatagory(tx) {
    let AssetRegistry = await getAssetRegistry("supplychain.catagory")
    var factory = getFactory();
    var Aircraft = factory.newResource('supplychain', 'catagory', tx.catagoryId);
    await AssetRegistry.add(Aircraft);

}