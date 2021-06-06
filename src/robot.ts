import { World, State } from './index';

export type Robot = {
    position: Position;
    orientation: Orientation;
    isLost: boolean;
};

export type Position = {
    x: number;
    y: number;
};

export enum Rotation {
    LEFT = 'L',
    RIGHT = 'R',
}

export enum Orientation {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W',
}

export const rotateRobot = (
    { orientation }: Robot,
    rotation: Rotation,
): Orientation => {
    switch (orientation) {
        case Orientation.N:
            return rotation == Rotation.LEFT ? Orientation.W : Orientation.E;
        case Orientation.E:
            return rotation == Rotation.LEFT ? Orientation.N : Orientation.S;
        case Orientation.S:
            return rotation == Rotation.LEFT ? Orientation.E : Orientation.W;
        case Orientation.W:
            return rotation == Rotation.LEFT ? Orientation.S : Orientation.N;
    }
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
