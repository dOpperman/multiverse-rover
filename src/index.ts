export type World = {
    x: number;
    y: number;
};

export type Position = {
    x: number;
    y: number;
};

export type Robot = {
    position: Position;
    orientation: Orientation;
    isLost: boolean;
};

export enum Orientation {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W',
}

export type State = {
    world: World;
    robots: Array<Robot>;
};

const findForwardDestination = (
    { position, isLost, orientation }: Robot,
    { x: xLimit, y: yLimit }: World,
): Robot => {
    const { x, y } = position;
    switch (orientation) {
        case Orientation.N:
            return isLost || y + 1 > yLimit
                ? {
                      position,
                      orientation,
                      isLost: true,
                  }
                : {
                      position: {
                          x,
                          y: y + 1,
                      },
                      orientation,
                      isLost: false,
                  };
        case Orientation.E:
            return isLost || x + 1 > xLimit
                ? {
                      position,
                      orientation,
                      isLost: true,
                  }
                : {
                      position: {
                          x: x + 1,
                          y,
                      },
                      orientation,
                      isLost: false,
                  };
        case Orientation.S:
            return isLost || y - 1 < 0
                ? {
                      position,
                      orientation,
                      isLost: true,
                  }
                : {
                      position: {
                          x,
                          y: y - 1,
                      },
                      orientation,
                      isLost: false,
                  };
        case Orientation.W:
            return isLost || x - 1 < 0
                ? {
                      position,
                      orientation,
                      isLost: true,
                  }
                : {
                      position: {
                          x: x - 1,
                          y,
                      },
                      orientation,
                      isLost: false,
                  };
    }
};

export const moveForward = (
    robot: Robot,
    { world, robots }: State,
): Robot | undefined => {
    const robotAfterMove = findForwardDestination(robot, world);

    return robots.some(
        ({ position }) =>
            position.x == robotAfterMove.position.x &&
            position.y == robotAfterMove.position.y,
    )
        ? undefined
        : robotAfterMove;
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
