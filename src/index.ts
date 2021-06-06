import { Robot, Orientation } from './robot';

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

export const parseLine = (line: string) => {
    return line.length;
};

export const parseInput = (input: string): State => {
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
            },
        ],
    };
};
