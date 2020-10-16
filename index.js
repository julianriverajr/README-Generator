const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {
            type: "input",
            message: "What is a description of your project?",
            name: "description"
        },
        {
            type: "input",
            message: "Write your Table of Contents (if necessary).",
            name: "tableOfContents"
        },
        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description.",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide instructions and examples for use.",
            name: "usage"
        },
        {
            type: "list",
            message: "Choose a lisence.",
            choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense'],
            name: "license"
        },
        {
            type: "input",
            message: "Add guidelines for how other developers can help contribute to your project.",
            name: "contributing"
        },
        {
            type: "input",
            message: "Provide tests for your application, and provide examples on how to run them.",
            name: "tests"
        },
        {
            type: "input",
            message: "Input a way you can be contacted with questions on your application or repo (e.g., email).",
            name: "questions"
        }
    ]);
}

function generateREADME(answers) {
    return `
    # ${title}

    ## Description
    ${description}
    
    ## Table of Contents
    ${tableOfContents}
    
    ## Installation
    ${installation}
    
    ## Usage
    ${usage}

    ## License
    ${license}
    
    ## Contributing
    ${contributing}
    
    ## Tests
    ${tests}
    
    ## Questions
    ${questions}`
}

async function init() {
    try {
        const answers = await promptUser();

        const readme = generateREADME(answers);

        await writeFileAsync("README.md", readme);

        console.log("Successfully wrote to README.md");
    } catch(err) {
        console.log(err);
    }
}

init();