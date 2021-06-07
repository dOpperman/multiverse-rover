import { Robot, Orientation, Instruction } from './robot';

export type World = {
    x: number;
    y: number;
};

export type State = {
    world: World;
    robots: Array<Robot>;
};

export const isInitialInputLine = (line: string): boolean => {
    const values = line.split(' ');

    const filteredValues = values.filter(
        (value) => value.match(/^[0-9]/g) !== null,
    );

    return filteredValues.length == 2;
};

export const parseInitialInputLine = (line: string): World => {
    const [x, y] = line.split(' ');

    return {
        x: Number(x),
        y: Number(y),
    };
};

export const parseRobotLine = (line: string): Robot => {
    const [position, instructions] = line.split(')');
    const [x, y, orientation] = position
        .replace(/ /g, '')
        .replace('(', '')
        .split(',');

    const processedInstructions = instructions
        .replace(' ', '')
        .split('')
        .map((letter) => <Instruction>letter);

    return {
        position: {
            x: Number(x),
            y: Number(y),
        },
        orientation: <Orientation>orientation,
        isLost: false,
        instructions: processedInstructions,
    };
};

export const parseInput = (input: string): State | undefined => {
    const [gridSize, ...robotLines] = input.split('\n');

    if (!isInitialInputLine(gridSize)) {
        throw new Error('Invalid Input!');
    }

    const world = parseInitialInputLine(gridSize);
    const robots = robotLines.map((robot) => parseRobotLine(robot));

    const initialState = { world, robots };
    return {
        world: {
            x: 0,
            y: 0,
        },
        robots: [
            {
                position: {
                    x: 0,
                    y: 0,
                },
                orientation: Orientation.N,
                isLost: false,
                instructions: [Instruction.FORWARD],
            },
        ],
    };
};
