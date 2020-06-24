import { BlockType } from './blocks/blocktype';
import { IBlock } from './blocks/block.interface';
import { BlockPosition } from './blocks/blockposition';
import { Block } from './blocks/block';
import { GameCanvas } from "./gamecanvas";
import { Block_S } from './blocks/types/block.s';
import { Block_I } from './blocks/types/block.i';
import { Block_J } from './blocks/types/block.j';
import { Block_L } from './blocks/types/block.l';
import { Block_O } from './blocks/types/block.o';
import { Block_T } from './blocks/types/block.t';
import { Block_Z } from './blocks/types/block.z';
import { BlockRotation } from './blocks/BlockRotation';
import { BlockShape } from './blocks/BlockShape';

export class GameLoop {
    
    private frame: number = 1;
    private readonly updateEveryXFrames: number = 60;
    private requestAnimFrameID: number = 0;
    private boardMatrix: number[][] = [];
    private blocksDrawMatrix: IBlock[];
    private activeBlock: IBlock;
    private clearedRowCount: number = 0;
    private score: number = 0;

    private rowCountLabel:HTMLElement = document.getElementById("rowsLabel");
    private scoreLabel:HTMLElement = document.getElementById("scoreLabel");

    public onGameOver: () => void;
        
    //ctor takes GameCanvas object and board's width and height
    constructor(private gameCanvas: GameCanvas, private boardWidth: number, private boardHeight: number) { }
    
    showScore() {
        this.rowCountLabel.innerText = this.clearedRowCount.toString();
        this.scoreLabel.innerText = this.score.toString();
    }



    start() {
        //initialize array with blocktypes
        this.blocksDrawMatrix = [
            new Block_I(),
            new Block_J(),
            new Block_L(),
            new Block_O(),
            new Block_S(),
            new Block_T(),
            new Block_Z()
        ];
        
        //clearing board and stats befre each start
        this.boardMatrix = [];
        this.clearedRowCount = 0;
        this.score = 0;

        //initialize boardMatrix filled with zeroes
        for (let i = 0; i < this.boardHeight; i++) {
            const temp: number[] = [];
            for (let j = 0; j < this.boardWidth; j++) {
                temp.push(0);
            }
            this.boardMatrix.push(temp);
        }
        this.activeBlock = this.getRandomBlock();

        //starts game by calling loop() method;
        this.loop();
    }
    
    stop() {
        window.cancelAnimationFrame(this.requestAnimFrameID);
    }

    //Main game loop
    loop() {
        //calls method shouldMove = canMoveDown()
        this.gameCanvas.updateBoard(this.boardMatrix, this.activeBlock);

        //remove line from boardMatrix
        this.clearRow();
        
        this.showScore();

        if (++this.frame % this.updateEveryXFrames) {
            this.requestAnimFrameID = window.requestAnimationFrame(() => { this.loop(); });
            return;
        }
        
        const canMove = this.canMoveDown();

        if(! canMove) {
            if(this.activeBlock.getPosition().y === 0) {
                //end of game
                console.log("end of game");
                this.stop();
                this.showScore();
                if(this.onGameOver) {
                    this.onGameOver();
                }
                return;
            }
            this.copyBlockToBoard();
            this.activeBlock = this.getRandomBlock();
        } else {
            this.moveBlockVertically(1);
        }

        this.requestAnimFrameID = window.requestAnimationFrame(() => { this.loop(); });
    }
    
    getRandomBlock(): IBlock {
        //create new random block :Block
        const randomBlockTypeIndex = Math.floor(Math.random() * (Object.keys(BlockType).length / 2));
        const type: BlockType = randomBlockTypeIndex as BlockType;
        const newRandomBlock =  this.blocksDrawMatrix[randomBlockTypeIndex];
        //console.log(randomBlockTypeIndex) ;
        newRandomBlock.setPosition(new BlockPosition((this.boardWidth / 2) - 1, 0));
        return newRandomBlock;
    }
    
    public moveBlockVertically(step: number) {
        const blockPos: BlockPosition = this.activeBlock.getPosition();
        blockPos.y += step;

        if(((blockPos.y + this.activeBlock.getBlockShape().getHeight()) <= this.boardHeight)
        && (this.tryMoveBlock(blockPos)) ) {
            this.activeBlock.setPosition(blockPos);
        }
    }

    public moveBlockHorizontally(step: number) {
        const blockPos: BlockPosition = this.activeBlock.getPosition();
        blockPos.x += step;
        
        if(((blockPos.x >= 0) && ((blockPos.x + this.activeBlock.getBlockShape().getWidth()) <= this.boardWidth))
        && (this.tryMoveBlock(blockPos))) {
            this.activeBlock.setPosition(blockPos);
        }
    }
    
    public rotateRight(): void {
        const blockPos: BlockPosition = this.activeBlock.getPosition();

        const rotateRight: BlockShape = this.activeBlock.tryRotation(BlockRotation.Right);

        if(((blockPos.x >= 0) && ((blockPos.x + rotateRight.getWidth()) <= this.boardWidth)) 
            && ((blockPos.y >= 0) && ((blockPos.y + rotateRight.getHeight()) <= this.boardHeight))
            && this.tryMoveShape(blockPos, rotateRight.getShape())
            && this.tryMoveBlock(blockPos)) {
            this.activeBlock.rotateRight();
        }
    }

    public rotateLeft(): void {
        const blockPos: BlockPosition = this.activeBlock.getPosition();

        const rotateLeft: BlockShape = this.activeBlock.tryRotation(BlockRotation.Left);
        
        if(((blockPos.x >= 0) && ((blockPos.x + rotateLeft.getWidth()) <= this.boardWidth)) 
            && ((blockPos.y >= 0) && ((blockPos.y + rotateLeft.getHeight()) <= this.boardHeight))
            && this.tryMoveShape(blockPos, rotateLeft.getShape())
            && this.tryMoveBlock(blockPos)) {
            this.activeBlock.rotateLeft();
        }
    }


    canMoveDown() {
        //check if the block can move, return true or flase
        const blockPos: BlockPosition = this.activeBlock.getPosition();
        const shape = this.activeBlock.shape;

        if(blockPos.y + this.activeBlock.getBlockShape().getHeight() >= this.boardHeight) {
            return false;
        }
        // simulate fututre block position
        blockPos.y += 1;

        if(!this.tryMoveBlock(blockPos)) {
            return false;
        }
        return true;
    }
    
    private tryMoveShape(blockPos: BlockPosition, shape: number[][]): boolean {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if(shape[y][x] === 1) {
                    if(this.boardMatrix[blockPos.y + y][blockPos.x + x] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private tryMoveBlock(blockPos: BlockPosition): boolean {
        const shape: number[][] = this.activeBlock.getBlockShape().getShape();
        return this.tryMoveShape(blockPos, shape);
    }

    copyBlockToBoard() {
        const blockPos: BlockPosition = this.activeBlock.getPosition();
        const shape = this.activeBlock.getBlockShape().getShape();

        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if(shape[y][x] === 1) {
                    this.boardMatrix[blockPos.y + y][blockPos.x + x] = shape[y][x];
                }
                
            }
        }

    }

    detectFullRow() {
        let fullRowIndexArray: number[] = [];
        let filledCells: number = 0;

        for(let y = 0; y < this.boardMatrix.length; y++) {
            for(let x = 0; x < this.boardMatrix[y].length; x++) {
                if(this.boardMatrix[y][x] == 1) {
                    filledCells++;
                }
            }

            if(filledCells == 10) {
                fullRowIndexArray.push(y);
            }
            
            filledCells = 0;
        }
        return fullRowIndexArray
    }

    clearRow() {
        const rowsToRemove = this.detectFullRow();
        let tempCount: number = 0;

        if(rowsToRemove.length === 0) {
            return;
        }

        for(let r = 0; r < rowsToRemove.length; r++) {
            //remove filled row
            const temp = this.boardMatrix.splice(rowsToRemove[r],1);
            this.clearedRowCount += 1;
            tempCount += 1;
            //create first row
            const row: number[] = [];
            for(let i = 0; i < this.boardMatrix[0].length; i++) {
                row[i] = 0;
            }
            //add row at begining of boardMatrix
            this.boardMatrix.unshift(row);
            
        }
        
        switch(tempCount) {
            case 1:
                if(tempCount === 1)
                    this.score += 100;

            case 2:
                if(tempCount === 2)
                    this.score += 300;

            case 3:
                if(tempCount === 3)
                    this.score += 600;
            
            case 4:
                if(tempCount === 4)
                    this.score += 1000;
        }
        tempCount = 0;
    }
}
