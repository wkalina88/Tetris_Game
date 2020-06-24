import { BlockType } from './blocktype';
import { IBlock } from './block.interface';
import { BlockPosition } from './blockposition';
import { BlockShape } from './BlockShape';
import { BlockRotation } from './BlockRotation';

export class Block implements IBlock {
    //Members
    private currentBlockRotationIndex: number = 0;
    protected blockMatrix: BlockShape[];
    position: BlockPosition;
    isActive: boolean;
    width: number;
    height: number;
    public shape: number[][];

    //CTOR
    constructor(public readonly type: BlockType, public readonly color: string, public readonly borderColor: string) { 
    }
    
    //Methods
    setPosition(newPosition: BlockPosition): void {
        this.position = newPosition;
    }
    getPosition(): BlockPosition {
        return new BlockPosition(this.position.x, this.position.y);
    }

    public rotateRight(): void {
        this.rotation(BlockRotation.Right);
    }

    public rotateLeft(): void {
        this.rotation(BlockRotation.Left);
    }

 
    public getBlockShape(): BlockShape {
        return this.blockMatrix[this.currentBlockRotationIndex];
    }

    public rotation(to: BlockRotation) {
        const toAsNumber: number = to as number;
        this.currentBlockRotationIndex += toAsNumber;

        if (this.currentBlockRotationIndex < 0) {
            this.currentBlockRotationIndex = this.blockMatrix.length - 1;
        } else if (this.currentBlockRotationIndex >= this.blockMatrix.length) {
            this.currentBlockRotationIndex = 0;
        }
    }

    public tryRotation(to: BlockRotation): BlockShape {
        const toAsNumber: number = to as number;
        let current: number = this.currentBlockRotationIndex + toAsNumber;

        if (current < 0) {
            current = this.blockMatrix.length - 1;
        } else if (current >= this.blockMatrix.length) {
            current = 0;
        }

        return this.blockMatrix[current];
    }
}
