const fs = require('fs');
const path = require('path');

const fixNthCheck = () => {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  const nthCheckPath = path.join(nodeModulesPath, 'nth-check');
  
  if (fs.existsSync(nthCheckPath)) {
    fs.rmdirSync(nthCheckPath, { recursive: true });
  }
};

fixNthCheck();