#!/usr/bin/env node

"use strict";

const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const tsProjectPath = path.join(cwd, 'node_modules', '@azaathoth', 'ts', 'tsconfig.json');
const packageJSON = require(path.join(cwd, 'package.json'));

cp.exec([
  `rm -rf ${path.join(cwd, 'target')}`,
  `npx tsc --project ${tsProjectPath} --outDir ${path.join(cwd, 'target')} --declaration`,
].join(' && '), (error, stdout, stderr) => {
  if (error) {
    console.log(`@azaathoth/ts error: ${error.message}`);
    console.log(`@azaathoth/ts stderr: ${stderr}`);
  }

  console.log(`${packageJSON.name} builded [TypeScript]\n${stdout}`);
});

