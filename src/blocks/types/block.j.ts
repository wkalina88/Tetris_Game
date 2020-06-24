import { Block } from "../block";
import { BlockType } from "../blocktype";
import { BlockShape } from "../BlockShape";
import { BlockRotation } from "../BlockRotation";

export class Block_J  extends Block{
    
    constructor() {
        super(BlockType.J, "darkblue", "blue");
        
        super.blockMatrix = [
            new BlockShape(3,2,
                [
                    [1,0,0],
                    [1,1,1]
                ]
            ),
            new BlockShape(2,3,
                [
                    [1,1],
                    [1,0],
                    [1,0]
                ]
            ),
            new BlockShape(3,2,
                [
                    [1,1,1],
                    [0,0,1]
                ]
            ),
            new BlockShape(2,3,
                [
                    [0,1],
                    [0,1],
                    [1,1]
                ]
            ),
        ];
    }
}