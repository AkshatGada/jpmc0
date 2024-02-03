

const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');

const outputFile1 = 'C:/Users/Aksha/jpmc0/zk/logistic_final.zkey';
const outputDirectory = 'C:/Users/Aksha/jpmc0/zk/logistic_final.zkey'; // Replace this with your desired output directory

// Define the URL of the endpoint
const endpointURL = 'http://localhost:3000/getfile'; // Replace this URL with your actual endpoint

// Make a GET request using Axios
axios.get(endpointURL, { responseType: 'arraybuffer' }) // Set responseType to 'arraybuffer' to receive binary data
  .then(response => {
    // Handle the response data
    console.log('Received data successfully');

    // Unzip the received data
    const unzipStream = unzipper.Extract({ path: outputDirectory });
    unzipStream.on('close', () => {
      console.log('Data unzipped and stored successfully.');
    });

    // Pipe the response data to the unzip stream
    unzipStream.end(response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
  });
// const axios = require('axios');
// const fs = require('fs');

// const outputFile1 = 'C:/Users/Aksha/jpmc0/zk/logistic_final.zkey';

// // Define the URL of the endpoint
// const endpointURL = 'http://localhost:3000/getfile'; // Replace this URL with your actual endpoint

// // Make a GET request using Axios
// axios.get(endpointURL)
//   .then(response => {
//     // Handle the response data
//     console.log('Received data:', response.data);

//     try {
//         fs.writeFileSync(outputFile1, response.data);
//         console.log('File written successfully');
//       } catch (error) {
//         console.error('Error writing file:', error);
//       }
//     // You can perform further operations with the received data here
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the request
//     console.error('Error fetching data:', error);
//   });
