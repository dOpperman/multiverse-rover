import { isInitialLine, Orientation, Robot, moveForward, World } from './index';

describe('Line Parsing', () => {
    test('initial line detected as true when takes the form digit*SPACE*digit', () => {
        const input = '4 8';
        expect(isInitialLine(input)).toEqual(true);
    });

    test('initial line detected when input grid is multiple digits in size', () => {
        const input = '44 85';
        expect(isInitialLine(input)).toEqual(true);
    });

    test('false returned when input contains non-numbers', () => {
        const input = 'a l';
        expect(isInitialLine(input)).toEqual(false);
    });
});

describe('Robot Moving', () => {
    test('can move forward when facing North, when not leaving world or colliding with robot', () => {
        const robot: Robot = {
            position: { x: 1, y: 1 },
            isLost: false,
            orientation: Orientation.N,
        };
        const world: World = { x: 5, y: 5 };

        const expectedResult = {
            position: { x: 1, y: 2 },
            isLost: false,
            orientation: Orientation.N,
        };

        expect(moveForward(robot, world)).toEqual(expectedResult);
    });
});
