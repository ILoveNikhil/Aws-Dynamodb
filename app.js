import express from 'express';
import {config} from 'dotenv';
import  AWS from 'aws-sdk';




const app = express();

config({ path: './config/.env' });


// dbconnection- Initialize the DynamoDB service
const dynamoDB = new AWS.DynamoDB({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  
  // Define table schema
  const params = {
    TableName: 'YourTableName_1',
    KeySchema: [
      { AttributeName: 'PrimaryKey', KeyType: 'HASH' },  // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'PrimaryKey', AttributeType: 'S' },  // String type
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  
  // Create the table
  dynamoDB.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });

  // Define API endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });