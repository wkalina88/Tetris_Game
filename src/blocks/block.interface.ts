import { BlockType } from './blocktype';
import { BlockPosition } from "./blockposition";
import { BlockShape } from './BlockShape';
import { BlockRotation } from './BlockRotation';
export interface IBlock {
    //Members
    readonly type: BlockType;
    readonly color: string;
    readonly borderColor: string;
    position: BlockPosition;
    isActive: boolean;
    width: number;
    height: number;
    shape: number[][];

    //Methods
    setPosition(position: BlockPosition): void;
    getPosition(): BlockPosition;
    rotateRight(): void;
    rotateLeft(): void;
    getBlockShape(): BlockShape;
    tryRotation(to: BlockRotation): BlockShape;
}
