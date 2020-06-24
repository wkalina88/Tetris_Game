import { Block } from "../block";
import { BlockType } from "../blocktype";
import { BlockShape } from "../BlockShape";
import { BlockRotation } from "../BlockRotation";

export class Block_I  extends Block{
    
    constructor() {
        super(BlockType.I, "lightblue", "blue");
        
        super.blockMatrix = [
            new BlockShape(4,1,
                [
                    [1,1,1,1]
                ]
            ),
            new BlockShape(1,4,
                [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            )
        ];
    }
}