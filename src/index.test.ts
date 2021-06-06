import { parseLine, isInitialLine } from './index';

describe('Line Parsing', () => {
    test('initial line detected as true when takes the form digit*SPACE*digit', () => {
        const input = '4 8';

        expect(isInitialLine(input)).toEqual(true);
    });

    test('false returned when input contains non-numbers', () => {
        const input = 'a l';

        expect(isInitialLine(input)).toEqual(false);
    });
});

test('example test', () => {
    const output = parseLine('four');

    expect(output).toEqual(4);
});
