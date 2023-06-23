import { Connection, PublicKey } from '@_koi/web3.js';
import axios from 'axios';
import fs from 'fs';

const getSubmissions = async () => {
  const connection = new Connection('https://k2-testnet.koii.live');
  const accountInfo = await connection.getAccountInfo(
    new PublicKey('4cj2aLZ7dGrsL4jm7b5bEzEKrYMoJzy8Juc2fWwLZrpW'),
  );
  const bytesView = JSON.parse(accountInfo.data + '');
  return bytesView.submissions;
};

const getData = async () => {
  const submissions = await getSubmissions();
  const topLevelKeys = Object.keys(submissions);
  const lastKey = topLevelKeys[topLevelKeys.length - 1];
  const lastObject = submissions[lastKey];
  const data = Object.keys(lastObject);
  return data;
};

async function saveDataToFile() {
  try {
    const data = await getData();
  
    // Convert data to a string
    const dataString = JSON.stringify(data, null, 2);
  
    // Append data to the TXT file
    fs.appendFileSync('data.txt', dataString + '\n');
  
    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Run the script immediately
saveDataToFile();

// Schedule the script to run every 10 minutes
setInterval(saveDataToFile, 10 * 60 * 1000);
