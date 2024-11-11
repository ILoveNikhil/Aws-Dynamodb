//Aws Dynamodb database connection

import  AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB({region: 'us-east-1'});

export default  dynamodb;  
//This module exports the dynamodb object which can be used to interact with the database.

