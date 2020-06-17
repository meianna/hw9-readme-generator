const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
let userInput = {};

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email",
  },
  {
    type: "input",
    name: "title",
    message: "Enter the title of your project",
  },
  {
    type: "input",
    name: "description",
    message: "Describe your project",
  },
  {
    type: "input",
    name: "install",
    message: "Provide installation instructons",
  },
  {
    type: "input",
    name: "usage",
    message: "Explain how others can use your code",
  },
  {
    type: "input",
    name: "contribute",
    message: "Any contributors to credit? List them here",
  },
  {
    type: "list",
    name: "license",
    choices: ["MIT", "ISC", "Apache 2.0", "None"],
    message: "Choose a license",
  },
  {
    type: "list",
    name: "tests",
    choices: ["Manual", "Chai", "Mocha", "Jest", "None"],
    message: "What tests would you run?",
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

# ${userInput.title}
![GitHub license](https://img.shields.io/badge/license-${userInput.license}-blue.svg) 
## Description
${userInput.description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)
## Installation 
${userInput.install}
## Usage 
${userInput.usage}
## License
${userInput.license}
## Contributions
${userInput.contribute}
## Tests
${userInput.tests}
## Questions?
You can contact me at ${userInput.email} and visit my GitHub profile [here](${axiosResponse.data.html_url}).
`;
        return readMe;
      })
      .then(function (data) {
        fs.writeFileSync("./README.md", data, function (error) {
          if (error) throw error;
        });
      });
  });
}

init();
