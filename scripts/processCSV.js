#!/usr/bin/env node

const csv = require('csvtojson');
const fs = require('fs');

const files = [...process.argv].slice(2);

files.forEach((file) => {
  csv().fromFile(file)
    .then((json) => {
      const newFileName = file
        .replace('UNSD — Methodology-', '')
        .replace(/csv/g, 'json');
      fs.writeFileSync(newFileName, JSON.stringify(json, null, 2));
    });
});
