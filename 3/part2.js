const fs = require('fs');
const path = require('path');

//Read in the input file.
//Specify an encoding option to receive a string rather than a buffer.
const data = fs.readFileSync(path.join(__dirname, '/input.txt'), {encoding: 'utf-8'});

//Split the input into an array based on each new line and filter out any records that are falsy
const dataAsArray = data.split('\n').filter(d => d);

//Declare an object to track whether the claims overlap or not
const claimOverlapTracker = {};

//Declare the fabric array
//This will be used to plot the claims
const fabric = [];

//Loop through each claim
for (const elem of dataAsArray) {

    //Use Regex to extract the claimId, offsets and dimensions
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
                //Check if the 'row' exists - create it if not so that we can populate it
                if (!fabric[offsetY + h]) {
                    fabric[offsetY + h] = [];
                }

                //Populate the 'row' and 'column' with the claimId in an array to indicate that this 'cell' has been
                //claimed for the first time, leaving behind the id of the claim
                fabric[offsetY + h][offsetX + w] = [claimId];

                //Set the claim's overlap value to false on the claim overlap tracker
                if (!claimOverlapTracker[claimId]) {
                    claimOverlapTracker[claimId] = false;
                }
            } else if (cell.length >= 1) {

                //This cell has already been claimed at least once before.
                //Push the current claim into the cell
                fabric[offsetY + h][offsetX + w].push(claimId);

                //Update the overlap value for all claim Ids on this cell, marking them as overlapped
                const existingClaims = fabric[offsetY + h][offsetX + w];
                for (const claim of existingClaims) {
                    claimOverlapTracker[claim] = true;
                }
            }
        }
    }
}

//Look in the claim overlap tracker for the claim that hasn't been overlapped
//Extract the claim Id
const [ nonOverlappedClaimId ] = Object.entries(claimOverlapTracker).find(([_, overlap]) => overlap === false);

//Log the final answer
console.log(`Claim ${nonOverlappedClaimId} does not overlap any other claim.`);