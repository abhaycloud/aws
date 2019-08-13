'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region:"us-east-2"})

exports.handler = async (event, context, callback)=> {
    const ddb= new AWS.DynamoDB({apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient();

   const parms={
       TableName:"AutoInc",
       Key:{
           Counter:"1234"
       }
   }
   try  {
        const data=await documentClient.get(parms).promise();
        console.log(data);
   }
   catch{
        console.log(err);
   }   
}