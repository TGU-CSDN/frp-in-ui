const fs = require('fs');
const { frpPath } = runtimeConfig.public;
fs.readFile(`${frpPath}/frpc.toml`, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
})