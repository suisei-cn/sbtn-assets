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

console.log('Validating categories.yml...')
const yamlCategoryText = fs.readFileSync('categories.yml', 'utf-8')
const yamlCategoryObj = yaml.parse(yamlCategoryText)
const categories = Object.keys(yamlCategoryObj)
for (const i of yamlObj) {
  if (!i.category) continue
  const cats = Array.isArray(i.category) ? i.category : [i.category]
  for (const j of cats) {
    if (!categories.includes(j)) {
      console.log(`${i.file}: Category ${j} is not in category list.`)
    }
  }
}

console.log('Successfully validated.')
