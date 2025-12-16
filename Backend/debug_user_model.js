const mongoose = require('mongoose');
const User = require('./models/User');

console.log("--- DEBUGGING USER MODEL ---");
const paths = User.schema.paths;
const userTypePath = paths['userType'];

if (userTypePath) {
    console.log("FOUND 'userType' in schema!");
    console.log("Is required:", userTypePath.isRequired);
} else {
    console.log("'userType' NOT FOUND in schema paths.");
}

console.log("All paths:", Object.keys(paths));
console.log("----------------------------");
process.exit(0);
