# Sequence Alignment using Simulated Annealing algorithm
Project created by Adrián Díaz and Roxana Cerretini

![Node.js CI](https://github.com/agdiaz/sasa/workflows/Node.js%20CI/badge.svg?branch=master)

## Preview
<img width="391" alt="Screen Shot 2020-02-03 at 10 48 50" src="https://user-images.githubusercontent.com/1646576/73658399-035f9300-4673-11ea-8625-46767659335b.png">

## Configuration
Run the following command

`npm install`

## Arguments
```
Welcome to SASA!
Usage: index [options]

Options:
  -V, --version             output the version number
  -i, --input <file>        path to input file (default: [])
  -d, --debug [flag]        Output extra debugging (default: false)
  -t, --temperature [temp]  Initial temperature of the model (default: 1000)
  -l, --limit [number]      Max number of iterations (default: 500000)
  -h, --help                output usage information
```

## Examples
This repository contains some example files to run the program. The main argument is `--input <path>` to refer files:

`node index.js --input ./examples/example_01.fa --input ./examples/example_02.fa`

To view a dummy example execute:

```
node index.js --input ./examples/example_00_a.fa --input ./examples/example_00_b.fa --input ./examples/example_00_c.fa
```
