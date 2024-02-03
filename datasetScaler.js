const fs = require('fs');

try {
    const jsonData = fs.readFileSync('./balanced_dataset.json');
    
    const jsonArray = JSON.parse(jsonData);

    const multiplier = 1000000000000000000000; 

    const scaledArray = jsonArray.map(obj => {
        const scaledObj = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                scaledObj[key] = obj[key] * multiplier;
            }
        }
        return scaledObj;
    });

    const outputJson = 'scaledDataset.json';
    fs.writeFileSync(outputJson, JSON.stringify(scaledArray, null, 2));

    console.log('Scaling completed. Result written to', outputJson);
} catch (error) {
    console.error('Error:', error.message);
}
