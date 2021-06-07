import { isInitialInputLine, World, parseInput, parseRobotLine } from './index';

import {
    Orientation,
    Robot,
    moveForward,
    Instruction,
    rotateRobot,
} from './robot';

describe('Line Parsing', () => {
    test('initial line detected as true when takes the form digit*SPACE*digit', () => {
        const input = '4 8';
        expect(isInitialInputLine(input)).toEqual(true);
    });

    test('initial line detected when input grid is multiple digits in size', () => {
        const input = '44 85';
        expect(isInitialInputLine(input)).toEqual(true);
    });

    test('false returned when input contains non-numbers', () => {
        const input = 'a l';
        expect(isInitialInputLine(input)).toEqual(false);
    });

    test('Can create initial robot state from robot line input', () => {
        const input = '(2, 3, E) LFRFF';

        const expectedRobot: Robot = {
            position: {
                x: 2,
                y: 3,
            },
            orientation: Orientation.E,
            isLost: false,
            instructions: [
                Instruction.LEFT,
                Instruction.FORWARD,
                Instruction.RIGHT,
                Instruction.FORWARD,
                Instruction.FORWARD,
            ],
        };

        expect(parseRobotLine(input)).toEqual(expectedRobot);
    });
});

describe('Robot Moving', () => {
    test('can move forward when facing North, when not leaving world or colliding with robot', () => {
        const robot: Robot = {
            position: { x: 1, y: 1 },
            isLost: false,
            orientation: Orientation.N,
            instructions: [Instruction.FORWARD],
        };
        const world: World = { x: 5, y: 5 };
        const state = { world, robots: [robot] };

        const expectedResult: Robot = {
            position: { x: 1, y: 2 },
            isLost: false,
            orientation: Orientation.N,
            instructions: [],
        };

        expect(moveForward(robot, state)).toEqual(expectedResult);
    });

    test('can rotate to produce correct orientation', () => {
        const robot: Robot = {
            position: { x: 1, y: 1 },
            isLost: false,
            orientation: Orientation.N,
            instructions: [Instruction.RIGHT],
        };
        const instruction = Instruction.RIGHT;

        expect(rotateRobot(robot, instruction)).toEqual(Orientation.E);
    });
});
