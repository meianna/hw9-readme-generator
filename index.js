const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
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
    type: "list",
    name: "test",
    choices: ["manual", "none", "chai", "mocha", "jest"],
    message: "How would you like to test the app?",
  },
];

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
## Email: ${userInput.email}
![GitHub license](https://img.shields.io/badge/license-${userInput.license}-blue.svg)
Project | Details
------- | -------
Project Title | ${userInput.title}
Description | ${userInput.description}
Installation | ${userInput.install} 
Testing | ${userInput.test}
Contributing | ${userInput.contributing}
License | ${userInput.license}
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
