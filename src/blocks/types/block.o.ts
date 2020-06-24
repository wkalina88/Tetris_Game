import { Block } from "../block";
import { BlockType } from "../blocktype";
import { BlockShape } from "../BlockShape";
import { BlockRotation } from "../BlockRotation";

export class Block_O  extends Block{
    
    constructor() {
        super(BlockType.O, "gold", "yellow");
        
        super.blockMatrix = [
            new BlockShape(2,2,
                [
                    [1,1],
                    [1,1]
                ]
            )            
        ];
    }
}