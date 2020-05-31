var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

const questions = [
  {
    type: "input",
    name: "github",
    message: "Enter Github username",
  },
];

function writeToFile(fileName, data) {}

function init() {
  inquirer.prompt(questions).then(function (response) {
    console.log(response);
    axios
      .get(`https://api.github.com/users/${response.github}`)
      .then(function (response) {
        console.log(response);
        var readMe = `
#username: ${response.data.login}
[link to github profile!](${response.data.url})
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
