const fs = require('fs');
const path = require('path');

//Read in the input file.
//Specify an encoding option to receive a string rather than a buffer.
const data = fs.readFileSync(path.join(__dirname, '/input.txt'), {encoding: 'utf-8'});

//Split the input into an array based on each new line and filter out any records that are falsy
const dataAsArray = data.split('\n').filter(d => d);

//Loop through each entry
for (let i = 0; i < dataAsArray.length; i++) {

    //Loop through again, getting the next entry
    for (let j = i + 1; j < dataAsArray.length; j++) {

        //We now have two strings to compare
        const stringA = dataAsArray[i];
        const stringB = dataAsArray[j];

        //A counter to track the number of characters that are different between the two strings
        let difference = 0;

        //Loop through each character of stringA
        for (let k = 0; k < stringA.length; k++) {
            const charA = stringA[k];
            const charB = stringB[k];

            //If the characters are different, increment the difference counter
            if (charA !== charB) {
                difference++;
            }

            //If the difference is greater than 1, break out of this loop and move on to the next string comparison
            //because these aren't the set of strings that we're looking for
            if (difference > 1) {
                break;
            }
        }

        //If the character difference for this particular set of strings is only 1, we have found the correct set
        //of strings
        if (difference === 1) {

            //Declare an array to hold the characters that are the same in both strings
            const answer = [];

            //Loop through each character of one of the strings, only pushing the character into the answer array
            //if it is the same between both strings - thus removing the character that is different
            for (let l = 0; l < stringA.length; l++) {
                if (stringA[l] === stringB[l]) {
                    answer.push(stringA[l]);
                }
            }

            //Log the final answer
            console.log(`The correct string: ${answer.join('')}`);

            //Quit out of all loops, problem solved
            return;
        }
    }
}