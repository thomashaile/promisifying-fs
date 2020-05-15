// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
const util = require('util');

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

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);
log(1, filePath);

const newFileContent = process.argv[3];
log(2, newFileContent);

async function myFunction(writeFile) {
    try {
        log(3, `writing ${fileName} ...`);
        await writeFileAsync(filePath, writeFile);
        log(4, `reading ${fileName} ...`);

        const fileContent = await readFileAsync(filePath, "utf-8");
        log(5, `asserting ...`);
        assert.strictEqual(fileContent, newFileContent);
        log(6, '\033[32mpass!\x1b[0m');

    } catch (err) {
        console.log('ERROR:', err);
    }
};
myFunction(newFileContent);