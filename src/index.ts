export const isInitialLine = (line: string): boolean => {
    const values = line.split(' ');

    const filteredValues = values.filter(
        (value) => value.match(/^[0-9]/g) !== null,
    );

    return filteredValues.length == 2;
};

export const parseLine = (line: string) => {
    return line.length;
};
