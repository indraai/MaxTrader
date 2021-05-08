#!/usr/bin/env node
// COPYRIGHT (C)2021 QUINN MICHAELS. ALL RIGHTS RESERVED.

// We are building a stdin wall tool
const fs = require('fs');
const path = require('path');

const readline = require('readline');
const {exec} = require('child_process');
const { username } = require("os").userInfo()

const shell = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

shell.setPrompt(`#${username} > `);
shell.prompt();

shell.on('line', question => {
  exec(`wall ${question}`, (error, stdout, stderr) => {
    const thisuser = stdout.split('\n');
    console.log(`${thisuser}`);
    shell.setPrompt(`#${username} > `);
    shell.prompt();
  });
}).on('pause', () => {
}).on('resume', () => {
}).on('close', () => {
  console.log('EXIT');
  process.exit(0);
}).on('SIGCONT', () => {
}).on('SIGINT', data => {
  shell.close();
}).on('SIGSTOP', () => {});
