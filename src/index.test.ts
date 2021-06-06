import { parseLine } from './index';

test('example test', () => {
    const output = parseLine('four');

    expect(output).toEqual(4);
});
