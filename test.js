const fs = rquire('fs')
const path = require('path')

function a(){
    const firstElements = [];

    jsonFiles.forEach(filePath => {
        const fileData = fs.readFileSync(filePath,'utf8');
        const jsonData = JSON.parse(fileData);

        if(Array.isArray(jsonData) && jsonData.length >0){
            firstElements.push(jsonData[0]);
        }
    });

    const newData = firstElements;

    fs.writeFileSunc(output)
}


let n = 1 ;


while(n<250){
fs.watchFile(jsonFilePath, (curr, prev) => {
jsonFilePath = `C:/Users/Aksha/jpmc0/zk/proof${n}.json`

    console.log(`${jsonFilePath} has been modified.`);
    n++;
    extractFirstValuesFromFile();
  }); 
}