const fs = require('fs');
const path = require('path');

//Read in the input file.
//Specify an encoding option to receive a string rather than a buffer.
const data = fs.readFileSync(path.join(__dirname, '/input.txt'), {encoding: 'utf-8'});

//Declare the two counts to track the number of double and triple character occurrences
let twoOccurrences = 0;
let threeOccurrences = 0;

//Split the input into an array based on each new line and filter out any records that are falsy
//Loop through each entry
for (const elem of data.split('\n').filter(d => d)) {

    //Declare a frequency object that will track the number of occurrences for each character
    const frequency = {};

    //Split the element string by each individual character into an Array
    //Loop through the characters
    for (const char of elem.split('')) {

        //If the character exists on the frequency object, increase its count
        //Otherwise set it to 1.
        if (frequency.hasOwnProperty(char)) {
            frequency[char]++;
        } else {
            frequency[char] = 1;
        }
    }

    //Now that we have the frequencies of each character, check to see if there are any double and triple
    //occurrences and increment the appropriate counts
    const values = Object.values(frequency);
    if (values.includes(2)) {
        twoOccurrences++;
    }
    if (values.includes(3)) {
        threeOccurrences++;
    }
}

//Calculate the checksum
const checksum = twoOccurrences * threeOccurrences;

//Log the final result
console.log(`The checksum of ${twoOccurrences} x ${threeOccurrences} = ${checksum}`);