import { Block } from "../block";
import { BlockType } from "../blocktype";
import { BlockShape } from "../BlockShape";
import { BlockRotation } from "../BlockRotation";

export class Block_Z  extends Block{
    
    constructor() {
        super(BlockType.Z, "red", "dark red");
        
        super.blockMatrix = [
            new BlockShape(3,2,
                [
                    [1,1,0],
                    [0,1,1]
                ]
            ),
            new BlockShape(2,3,
                [
                    [0,1],
                    [1,1],
                    [1,0]
                ]
            )
        ];
    }
}