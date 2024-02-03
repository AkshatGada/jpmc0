

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let lastModifiedTimes = {}; 

app.get('/getFiles', (req, res) => {
  const filesToSend = [ 'proof.json', 'public.json'];
  const fileContents = filesToSend.map(file => {
    const filePath = path.join('C:/Users/Aksha/jpmc0/zk', file);
    const lastModified = fs.statSync(filePath).mtime.getTime();

    if (!lastModifiedTimes[file] || lastModifiedTimes[file] < lastModified) {
      lastModifiedTimes[file] = lastModified;

      return {
        filename: file,
        content: JSON.parse(fs.readFileSync(filePath, 'utf8')),
      };
    }

    return null;
  }).filter(Boolean);

  if (fileContents.length > 0) {
    res.json({ files: fileContents });
  } else {
    res.status(304).json({ message: 'No changes since the last request' });
  }
});

const monitorFiles = () => {
  const filesToMonitor = ['proof.json', 'public.json'];

  filesToMonitor.forEach(file => {
    fs.watchFile(path.join('C:/Users/Aksha/jpmc0/zk', file), (curr, prev) => {
      console.log(`${file} has been modified`);
    });
  });
};

monitorFiles();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// // Endpoint to send the JSON files when requested
// app.get('/getFiles', (req, res) => {
//   const filesToSend = ['verification_key.json', 'proof.json', 'public.json'];
//   const filesExist = filesToSend.every(file => {
//     return fs.existsSync(path.join('C:/Users/Aksha/jpmc0/zk', file));
//   });

//   if (filesExist) {
//     const fileContents = filesToSend.map(file => {
//       return {
//         filename: file,
//         content: JSON.parse(fs.readFileSync(path.join('C:/Users/Aksha/jpmc0/zk', file), 'utf8')),
//       };
//     });

//     res.json({ files: fileContents });
//   } else {
//     res.status(404).json({ error: 'Files not generated yet' });
//   }
// });

// // Monitor for the generation of JSON files
// const monitorFiles = () => {
//   const filesToMonitor = ['verification_key.json', 'proof.json', 'public.json'];

//   const checkFiles = () => {
//     const filesExist = filesToMonitor.every(file => {
//       return fs.existsSync(path.join('C:/Users/Aksha/jpmc0/zk', file));
//     });

//     if (filesExist) {
//       clearInterval(interval);
//       console.log('Files generated:', filesToMonitor);
//     }
//   };

//   checkFiles(); 

//   const interval = setInterval(checkFiles, 500); 

//   filesToMonitor.forEach(file => {
//     fs.watchFile(path.join('C:/Users/Aksha/jpmc0/zk', file), (curr, prev) => {
//       console.log(`${file} has been modified`);
//       checkFiles(); 
//     });
//   });
  
// };

// monitorFiles();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


