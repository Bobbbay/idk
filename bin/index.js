#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const axios = require("axios");


// Yargs arguments
const options = yargs
 .usage("Usage: -a [author]")
 .help("h")
 .alias("h", "help")
 .alias("v", "version")
 .option("a", { alias: "author", describe: "Author's name", type: "string"})
 .epilog('Copyright Bobbbay 2020 under the MIT License agreement.')
 .argv;


// Boxen beautifulness
const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "double",
 borderColor: "green",
 backgroundColor: "#555555"
};

if (options.a) {
    const url = `http://api.quotable.io/quotes?author=${options.a}&maxLength=${process.stdout.columns}`;
    axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            const rand = Math.floor(Math.random()*parseInt(res.data.count))

            console.log(boxen(`${res.data.results[rand].content}\n- ${res.data.results[rand].author}`, boxenOptions));
        }
    );
} else {
    const url = `http://api.quotable.io/random?maxLength=${process.stdout.columns}`;
    axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            console.log(boxen(`${res.data.content}\n- ${res.data.author}`, boxenOptions));
        }
    );
}