const fs = require('fs');
const path = require('path');

//Read in the input file.
//Specify an encoding option to receive a string rather than a buffer.
const data = fs.readFileSync(path.join(__dirname, '/input.txt'), {encoding: 'utf-8'});

//Split the input into an array based on each new line and filter out any records that are falsy
const dataAsArray = data.split('\n').filter(d => d);

//Declare a counter for the number of inches that overlap
let overlappingInches = 0;

//Declare the fabric array
//This will be used to plot the claims
const fabric = [];

//Loop through each claim
for (const elem of dataAsArray) {

    //Use Regex to extract the offsets and dimensions
    //Cast the offsets and dimensions to ints so that we can use and loop through them later
    const claimRegExp = /^(#\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
    const [ claim, claimId, offsetX, offsetY, width, height ] = Array.from(claimRegExp.exec(elem)).map((val, i) => i > 1 ? parseInt(val) : val);

    //Loop through the height then width dimensions to populate the fabric from the point of the offsets
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {

            //Store the current cell's value
            const cell = fabric[offsetY + h]?.[offsetX + w];

            //Check if the 'cell' has been claimed previously
            if (!cell) {

                //The 'cell' doesn't exist, so we will claim it for the first time.
                //First, check if the 'row' exists - create it if not, so that we can populate it
                if (!fabric[offsetY + h]) {
                    fabric[offsetY + h] = [];
                }

                //Populate the 'row' and 'column' with a 1 to indicate that this 'cell' has been claimed
                fabric[offsetY + h][offsetX + w] = 1;
            } else if (cell === 1) {

                //It has already been claimed once before. Increment the inch count and set the cell's value to 2.
                //We don't need to check if the cell is above 1 - we just need to track whether it has been claimed before, not
                //how many times.
                overlappingInches++;
                fabric[offsetY + h][offsetX + w] = 2;
            }
        }
    }
}

//Log the final answer
console.log(`The number of overlapping inches is: ${overlappingInches}`);