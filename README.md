# Retail-Back-End

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This project provides a back-end for a basic e-commerce company.  It stores a database that provides information on products, categories, and tags.  It also allows relations between the three categories.  

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contribute](#contribute)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command: `npm install`

## Usage

Clone the repo at the GitHub location below, then run `npm install`.  Once the dependencies are installed, create a `.env` file with the database name, your MySQL username, and your MySQL password.  Next, you will need to create the database by running (from the command line), `mysql -u root -p`.  The program will prompt you for your MySQL password.  After submitting your password, type `source db/schema.sql` in the SQL command prompt.  Finally, type `quit` to exit the SQL prompt.  The project is now ready to go.  If you would like to use the pre-populated data, type `npm run seed`; if not, skip this step.  After the seed is complete, type `npm start` to run the database.  You can sample the program by using an app such as InsomniaCore or Postman.  You can also visit the YouTube walkthrough [here](https://www.youtube.com/watch?v=w3ajbREiLFQ&feature=youtu.be).

## License

This project is licensed under the MIT license.

## Contribute

Contact me at the email address or GitHub account provided below.

## Tests

Tests are not available in this application.

## Questions

If you have questions, visit my [GitHub](https://github.com/nmcanall/Retail-Back-End) or contact me directly at <nmcanall@citadel.edu>.