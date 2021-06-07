# multiverse-rover
The Mars Rover problem code

## My Approach
I decided to work on smaller sections of the problem, by breaking the task into composable, testable functions. Things like parsing the input strings could then be tested seperately to the actual operation of the robots.

My idea was to attempt to use a more functional approach, without using too much mutation, where the functions would produce new versions of the objects passed in. These new versions could then be evaluated and checked EG: We can see the potential next position for a robot, and if this position is identical to another robot, this may be a collision.

## Things I would have done differently

In hindsight, being concerned about collisions may have been overthinking the problem. Move order isn't restricted in the challenge, and so collisions may be avoided by varying the instruction orders.

Also, I do feel that writing the tests helped me feel more confident in the code I was writing, but it did take some time. This, in combination with a slight overthinking regarding collisions meant I didn't finish the task.

## Current State & What I Would do Next
Currently, the code can process the input in the form of a multiline string literal, passed into the `parseInput` function. It will then create a `State` variable. Said variable includes the boundaries of the world, as well as an array of all the robots, where a `Robot` stores its own position, orientation, instructions, and LOST state.

### My immediate plans
The intention of the state variable was to be passed into a `generateNextState` function, which would call the (existing & tested) logic to move the robots based on their instructions.

This could be called until all robots had no instructions left / had a `LOST` instruction (and corresponding isLost flag)

Finally, once the above was completed and tested, I would have made some form of user friendly terminal input, so the user could simply type in, line by line, the input state, and the output state could be determined.

Currently, it's not an actual executable program, but is nearly all of the required logic.
