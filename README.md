# AOC

Uses nx.dev mono repo

## DAYS STRUCTURE

- \_.ts -- Contains the function called for Parts One and Two
- \_.spec.ts -- Contains the test for the two parts. Console logs the result from the problem input (Use it if your tests pass)
- inputs.ts -- Specifies how to parse the input
- test-input.txt -- Contains small test data set
- prob-input.txt -- Contains problem data set

## TO RUN A DAY'S SOLUTION

`nx test {year}-{day}`

Years

- 20
- 21
- ...

Days

- 1
- 2
- ....

This command will console log the solutions to the problems while testing the sample data.

99% of the time, if your tests pass these answers will be correct. Just watch out for those extremely large numbers in the problem data set....:)

## TO WATCH TESTS WHILE WORKING SOLUTION

`nx test {year}-{day} --watch`

## FETCH PROBLEM INPUT AFER PROBLEM IS ACTIVE

Add a .env file to the root of the workspace with the following information.

`AOC_SESSION={value of session cookie}`

This value can be retreived from a logged in browser.

With a valid session in the file, run

`nx input {year}-{day}`

This will download the input to the corresponding prob-input.txt file that is already inported to the testInput.

## GENERATE NEW DAYS

`npx nx workspace-generator Day --day={day} --year={year}`

This command will scaffold out another library for that day's event, including blank input.txt files, inputs, tests, and functions.

## UTILS

Some helper functions are located in the utils lib
[util](./libs/util/README.md)
