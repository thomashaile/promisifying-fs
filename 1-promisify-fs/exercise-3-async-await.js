// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
const util = require("util");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) => console.log(
    `\nlog ${logId} (${Date.now() - START} ms):\n`,
    value,
);


// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const fileName1 = process.argv[2];
const fileToRead = path.join(__dirname, fileName1);
log(1, fileToRead);

const fileName2 = process.argv[3];
const fileToAppend = path.join(__dirname, fileName2);
log(2, fileToAppend);

const readFileAsync = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);
const appendFileSc = util.promisify(fs.appendFileSync);

async function asyncWait() {
    try {
        log(3, `reading original contents from ${fileName2} ...`);
        const oldContents = readFileAsync(fileToAppend, `utf-8`);

        log(4, `reading from ${fileName1} ...`);
        const contentToAppend = await readFileAsync(fileToRead, `utf-8`);

        log(5, `writing to ${fileName2} ...`);
        await appendFile(fileToAppend, contentToAppend);

        log(6, `reading from ${fileName2} ...`);
        const newContent = await readFileAsync(fileToAppend, `utf-8`);

        log(7, `asserting ...`);
        assert.strictEqual(newContent, oldContents + contentToAppend);
        log(8, '\033[32mpass!\x1b[0m');
        appendFileSc(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

    } catch (err) {
        console.error(err);
    }
};
asyncWait();