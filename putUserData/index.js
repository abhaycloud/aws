'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region:"us-east-2"})

var CUSTOMEPOCH = 1300000000000; // artificial epoch
function generateRowId(shardId /* range 0-64 for shard/slot */) {
  var ts = new Date().getTime() - CUSTOMEPOCH; // limit to recent
  var randid = Math.floor(Math.random() * 512);
  ts = (ts * 64);   // bit-shift << 6
  ts = ts + shardId;
  return (ts * 512) + (randid % 512);
}
var newPrimaryHashKey = generateRowId(4);

exports.handler = async (event, context) =>{
    const ddb= new AWS.DynamoDB({apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient();
 
    const params={
        TableName:"AutoInc",
        Item:
       {
           Counter:"inc_"+newPrimaryHashKey,
           FirstName:"Anshi",
           LastName:"Kumar"
       }
   }
   
   try
   {
    const data =await documentClient.put(params).promise();
    console.log("Data Saved Succesfully "+data);
   }
   catch (err)
   {
    console.log("Data Not Saved Succesfully" +err);
   }
    
}