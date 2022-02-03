# Employee Tracker
## Lauren Darrimon
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=appveyor)](https://opensource.org/licenses/MIT) ![Language Badges](https://img.shields.io/github/languages/top/laurenDarrimon/employee-tracker?style=for-the-badge&logo=appveyor) ![Commits Badge](https://img.shields.io/github/last-commit/laurenDarrimon/employee-tracker?style=for-the-badge&logo=appveyor) ![Repo Size](https://img.shields.io/github/repo-size/laurenDarrimon/employee-tracker?style=for-the-badge&logo=appveyor) ![Repo Issues](https://img.shields.io/github/issues/laurenDarrimon/employee-tracker?style=for-the-badge&logo=appveyor)
    
### Description
A command line application to manage a company employee database through MySQL, Node.js, Inquirer, and Console Table. 

![CLI application for employee database](assets/images/employee-tracker.jpg)



### Table of Contents

* [Link](#link)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Questions](#questions)
* [License](#license)


### Link 
🔗 
Link to application's code repository: [Employee Tracker](https://laurendarrimon.github.io/employee-tracker/)


### Installation
🔧
In order for this application to work, you need to install the following (dependencies): 
Node.js, MySQL, the Node module, Inquirer, and Console Table.  Once you have Node.js and MySQL, run the following command from the root directory to install Inquirer and Console Table: 

~~~
npm install 
~~~


### Usage 

Navigate to the db/ directory to set up and seed the database.  This will create tables in your data base as shown below. 

~~~
mysql -u root -p
source schema.sql
source seeds.sql
~~~

![Visual Representation of Employee Database tables](assets/images/company-data-tables.jpg).


To run the application from the command line, return to the root directory: 

~~~
npm start
~~~

Then, follow the user prompts and menus through the application, as shown [in this walkthrough video](https://drive.google.com/file/d/1Vn8qr97kqSUNUlX1np-QcOWkOUALsF06/view?usp=sharing).


### Contributing 
✍️ 
Lauren Darrimon is the author of this application. Find additional work on Lauren Darrimon's [Github profile.](http://github.com/laurenDarrimon). 


### Questions
❓💌
Reach out to Lauren Darrimon at hello@laurenlalita.com if you have any questions. 

### License
The license for this project is: [MIT](https://opensource.org/licenses/MIT)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=appveyor)](https://opensource.org/licenses/MIT)
