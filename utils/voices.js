#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yaml = require('yaml')

function validateFile(filename, paths = 'assets/') {
  if (!fs.existsSync(path.join(paths, filename))) {
    console.log(`Sound ${filename} doesn't exist!`)
    process.exit(1)
  }
}

console.log('Validating sounds.yml...')
const yamlText = fs.readFileSync('sounds.yml', 'utf-8')
const yamlObj = yaml.parse(yamlText)
for (const i of yamlObj) {
  if (typeof i.file === 'string') {
    // Single file
    validateFile(i.file)
  } else {
    // Array of file
    for (const j of i.file) {
      validateFile(j)
    }
  }
}

console.log('Successfully validated.')
