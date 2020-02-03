# Sequence Alignment using Simulated Annealing algorithm
Project created by Adrián Díaz and Roxana Cerretini

![Node.js CI](https://github.com/agdiaz/sasa/workflows/Node.js%20CI/badge.svg?branch=master)

## Overview
This program implements a Simulated Annealing algorithm to find the consensus aligment from many sequences. The main idea is to simulate the cooling of a material system: the colder the system is, the less energy is. There are three key concepts involved in the running of this program.

- How to build the system (initial state)
- How to measure the energy of the system (state's energy) 
- How to find next state (next state)

### Initial state
It's a sequence created position by position with the length of the longest input sequence.

For example, given the next sequences:

```
POS 012345
SE1 ABCDEF
SE2 CDE
```

Positions were randomly generated like:

- POS 0: 'A' or 'C'
- POS 1: 'B' or 'D'
- POS 2: 'C' or 'E'
- POS 3: 'D' or '-'
- POS 4: 'E' or '-'
- POS 5: 'F' or '-'

Thus, the sequence "ABE-E-" could be a possible first sequence.

### Energy
There is a relation between the quality of the alignment and the energy of the system. Better aligments have low energy. This program determines energy of a state looking for mismatches between the current consensus sequence and the input ones. 
Position by position, the energy function count the proportion of mismatches following the formula:

```
Energy(POS) = count(mismatches(POS) / count(input_sequences)
```

For instance, in this example, there are 8 positions to calculate energy
```
POS: 012345678
ALG: A-CDEF
SE1: ABCDYFGHI
SE2: ABDXZF
```

```
Energy(0): 0         = 0
Energy(1): 0.5 + 0.5 = 1
Energy(2): 0.5       = 0.5
Energy(3): 0.5       = 0.5
Energy(4): 0.5 + 0.5 = 1
Energy(5): 0         = 0
Energy(6): 0.5 + 0.5 = 1
Energy(7): 0.5 + 0.5 = 1
Energy(8): 0.5 + 0.5 = 1
```

Summatory of energy of all positions gives the energy of the current state (for the above's example is 6).
Thus, if the consensus sequence full match with all the input sequeces, the energy will be zero (the desired one).

### Next state
For every iteration, a dice of 12 sides is randomly thrown and depending the results, an operation which alters the state is executed. The proportion is the next distribution:

- 2/12: remove a element
- 3/12: change an element
- 2/12: add an element
- 1/12: add a delete
- 4/12: do nothing (keep the sequence as is)

Once the operation is choosen, it alters one random position of the current state.

## Preview
<img width="391" alt="Screen Shot 2020-02-03 at 10 48 50" src="https://user-images.githubusercontent.com/1646576/73658399-035f9300-4673-11ea-8625-46767659335b.png">

## Configuration

### Pre-requisites

Please, before to install this program, be sure that you have installed in your computer:
- nodejs

### Installing
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
