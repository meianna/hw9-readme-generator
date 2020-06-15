const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const { userInfo } = require("os");
let userInput = {};

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter Github username",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Please describe your project",
  },
  {
    type: "input",
    name: "install",
    message: "Please provide installation instructons",
  },
  {
    type: "input",
    name: "usage",
    message: "Please explain how others can use your code",
  },
  {
    type: "input",
    name: "contributing",
    message: "Who helped contribute to this code?",
  },
  {
    type: "list",
    name: "license",
    choices: ["MIT", "ISC", "APACHE 2.0"],
    message: "Please choose a license",
  },
  {
    type: "input",
    name: "test",
    choices: ["manual", "none", "chai", "mocha", "jest"],
    message: "How would you like to test the app?",
  },
];

function writeToFile(fileName, data) {}

function init() {
  inquirer.prompt(questions).then(function (response) {
    console.log(response);
    userInput = response;
    return axios
      .get(`https://api.github.com/users/${response.username}`)
      .then(function (axiosResponse) {
        console.log(axiosResponse.data);
        let readMe = `
        # Username: ${axiosResponse.data.login}
        [link to github profile!](${axiosResponse.data.html_url})
        /n# Email: ${userInput.email}
        /n![GitHub license](https://img.shields.io/badge/license-${userInput.license}-blue.svg)
        /nProject | Details
        /n------- | -------
        /nProject Title | ${userInput.title}
        /nDescription | ${userInput.description}
        /nInstallation | ${userInput.install} 
        /nTesting | ${userInput.test}
        /nContributing | ${userInput.contributing}
        /nLicense | ${userInput.license}
        `;
        return readMe;
      })
      .then(function (data) {
        fs.writeFileSync("./README.md", data, function (error) {
          if (error) throw error;
          console.log("ReadMe generated!");
        });
      });
  });
}

init();
