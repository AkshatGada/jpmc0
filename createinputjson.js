// const fs = require('fs');
// const path = require('path');

// const jsonFiles = [
//   './scaledDataset.json',
//   './class_values.json'
// ];

// const outputFilePath = './input.json'; // Replace this with the desired output path

// function extractFirstElementFromJSONFiles() {
//   const firstElements = [];

//   // Read the first element from each JSON file
//   jsonFiles.forEach(filePath => {
//     const fileData = fs.readFileSync(filePath, 'utf8');
//     const jsonData = JSON.parse(fileData);
    
//     // If the JSON data is an array, take the first element and add it to the 'firstElements' array
//     if (Array.isArray(jsonData) && jsonData.length > 0) {
//       firstElements.push(jsonData[0]); // Take the first element from the array
//     }
//   });

//   // Create a new JSON file with the extracted first elements
//   const newData = firstElements; // 'firstElements' is an array containing the first elements
//   fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
  
//   console.log('Processed and stored the first elements from the three JSON files.');
// }

// // Initial extraction of first elements from JSON files

// let  n = 1;
// while(n<250){
//     jsonFilePath = `C:/Users/Aksha/jpmc0/zk/proof${n}.json`

//     fs.watchFile(jsonFilePath, (curr, prev) => {
    
//         console.log(`${jsonFilePath} has been modified.`);
//         n++;
//         extractFirstElementFromJSONFiles();
//       }); 
//     }

// console.log(`Watching for changes to update ${outputFilePath}...`);



const fs = require('fs');
const path = require('path');

const jsonFiles = [
  './scaledDataset.json',
  './class_values.json',
    './scaledWeights.json'

];

const outputFilePath ='C:/Users/Aksha/jpmc0/zk/input.json'; // Replace this with the desired output path

function extractFirstElements() {
  const firstElements = {};

  const fileData1 = fs.readFileSync(jsonFiles[0], 'utf8');
  const fileData2 = fs.readFileSync(jsonFiles[1], 'utf8');
  const fileData3 = fs.readFileSync(jsonFiles[2], 'utf8');

  const jsonData1 = JSON.parse(fileData1);
  const jsonData2 = JSON.parse(fileData2);
  const jsonData3 = JSON.parse(fileData3);

  if (Array.isArray(jsonData1) && jsonData1.length > 0) {
    firstElements['a'] = Object.values(jsonData1[0]); 
  }
  firstElements['b'] = Object.values(jsonData3); 

  if (Array.isArray(jsonData2) && jsonData2.length > 0) {
    firstElements['ans'] = jsonData2[0]; 
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(firstElements, null, 2));
  
  console.log('Processed and stored the first elements from the first two JSON files.');
}

extractFirstElements();

// Watch for changes in each of the JSON files from proof1.json to proof249.json
// for (let n = 1; n <= 249; n++) {
//   const jsonFilePath = `C:/Users/Aksha/jpmc0/zk/proof${n}.json`;

//   fs.watchFile(jsonFilePath, (curr, prev) => {
//     console.log(`${jsonFilePath} has been modified.`);
//     extractFirstElements();
//   });
// }

// console.log(`Watching for changes to update ${outputFilePath}...`);
