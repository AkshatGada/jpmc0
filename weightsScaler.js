const fs = require('fs');

try {
    const jsonData = fs.readFileSync('./weights.json');
    
    const jsonObject = JSON.parse(jsonData);

    const multiplier = 1000000000000000000000; 

    const multipliedObject = {};

    for (const key in jsonObject) {
        if (Object.hasOwnProperty.call(jsonObject, key)) {
            multipliedObject[key] = jsonObject[key] * multiplier;
        }
    }

    const outputJson = 'scaledWeights.json';
    fs.writeFileSync(outputJson, JSON.stringify(multipliedObject, null, 2));

    console.log('Multiplication completed. Result written to', outputJson);
} catch (error) {
    console.error('Error:', error.message);
}
