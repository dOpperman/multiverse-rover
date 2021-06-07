import { World, State } from './index';

export type Robot = {
    position: Position;
    orientation: Orientation;
    isLost: boolean;
    instructions: Array<Instruction>;
};

export type Position = {
    x: number;
    y: number;
};

export enum Instruction {
    LEFT = 'L',
    RIGHT = 'R',
    FORWARD = 'F',
    LOST = 'LOST',
}

export enum Orientation {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W',
}

export const rotateRobot = (
    { orientation }: Robot,
    rotation: Instruction,
): Orientation => {
    if (rotation == Instruction.FORWARD) {
        throw new Error('Not rotation instruction!');
    }

    switch (orientation) {
        case Orientation.N:
            return rotation == Instruction.LEFT ? Orientation.W : Orientation.E;
        case Orientation.E:
            return rotation == Instruction.LEFT ? Orientation.N : Orientation.S;
        case Orientation.S:
            return rotation == Instruction.LEFT ? Orientation.E : Orientation.W;
        case Orientation.W:
            return rotation == Instruction.LEFT ? Orientation.S : Orientation.N;
    }
};

const findForwardDestination = (
    { position, isLost, orientation, instructions }: Robot,
    { x: xLimit, y: yLimit }: World,
): Robot => {
    const { x, y } = position;
    const [forward, ...newInstructions] = instructions;
    switch (orientation) {
        case Orientation.N:
            return isLost || y + 1 > yLimit
                ? {
                      position,
                      orientation,
                      isLost: true,
                      instructions: newInstructions,
                  }
                : {
                      position: {
                          x,
                          y: y + 1,
                      },
                      orientation,
                      isLost: false,
                      instructions: newInstructions,
                  };
        case Orientation.E:
            return isLost || x + 1 > xLimit
                ? {
                      position,
                      orientation,
                      isLost: true,
                      instructions: newInstructions,
                  }
                : {
                      position: {
                          x: x + 1,
                          y,
                      },
                      orientation,
                      isLost: false,
                      instructions: newInstructions,
                  };
        case Orientation.S:
            return isLost || y - 1 < 0
                ? {
                      position,
                      orientation,
                      isLost: true,
                      instructions: newInstructions,
                  }
                : {
                      position: {
                          x,
                          y: y - 1,
                      },
                      orientation,
                      isLost: false,
                      instructions: newInstructions,
                  };
        case Orientation.W:
            return isLost || x - 1 < 0
                ? {
                      position,
                      orientation,
                      isLost: true,
                      instructions: newInstructions,
                  }
                : {
                      position: {
                          x: x - 1,
                          y,
                      },
                      orientation,
                      isLost: false,
                      instructions: newInstructions,
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
