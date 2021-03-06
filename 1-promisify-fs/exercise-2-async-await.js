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

const fileName1 = process.argv[2];
const sourcePath = path.join(__dirname, fileName1);
log(1, sourcePath);

const fileName2 = process.argv[3];
const targetPath = path.join(__dirname, fileName2);
log(2, targetPath);

const readFileAsync = util.promisify(fs.readFile);
const copyFileAsync = util.promisify(fs.copyFile);
const appendFile = util.promisify(fs.appendFileSync);

async function asyncWait(sourcePath, targetPath) {
    try {
        log(3, `reading original contents from ${fileName1} ...`);
        const sourceContent = await readFileAsync(sourcePath, "utf-8");
        log(4, `copying to ${fileName2} ...`);
        const copyFile = await copyFileAsync(sourcePath, targetPath);
        log(5, `reading ${fileName1} ...`);
        const originalSourceContent = await readFileAsync(sourcePath, `utf-8`);
        log(6, `asserting ${fileName1} ...`);
        assert.strictEqual(sourceContent, originalSourceContent);

        log(7, `reading ${fileName2} ...`);
        const targetContent = await readFileAsync(targetPath, `utf-8`);

        log(8, `asserting ${fileName2} ...`);
        assert.strictEqual(targetContent, originalSourceContent);

        log(9, '\033[32mpass!\x1b[0m');
        appendFile(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

    } catch (err) {
        console.log('ERROR:', err);
    }
};
asyncWait(sourcePath, targetPath);