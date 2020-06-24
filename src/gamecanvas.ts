import { IBlock } from './blocks/block.interface';
import { Block } from './blocks/block';

export class GameCanvas {
    //Members
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private readonly blockSize: number = 40;

    //CTOR
    constructor(canvasID: string, public width: number, public height: number) {
        this.initialize();
    }
    
    //Methods
    initialize() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    }
    
    drawBlock(block: IBlock) {
        const shape = block.getBlockShape().getShape(); 
        const pos = block.getPosition();
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if(shape[y][x] === 1) {
                    this.ctx.fillStyle = block.color;
                    this.ctx.strokeStyle = block.borderColor;
                    
                    this.ctx.fillRect(
                        (pos.x + x) * this.blockSize, 
                        (pos.y + y) * this.blockSize, 
                        this.blockSize, 
                        this.blockSize);

                    this.ctx.strokeRect(
                        (pos.x + x) * this.blockSize, 
                        (pos.y + y) * this.blockSize, 
                        this.blockSize, 
                        this.blockSize);
                } 
                // else {
                //     this.ctx.fillStyle = "orange";
                //     this.ctx.strokeStyle = block.borderColor;
                    
                //     this.ctx.fillRect(
                //         (pos.x + x) * this.blockSize, 
                //         (pos.y + y) * this.blockSize, 
                //         this.blockSize, 
                //         this.blockSize);

                //     this.ctx.strokeRect(
                //         (pos.x + x) * this.blockSize, 
                //         (pos.y + y) * this.blockSize, 
                //         this.blockSize, 
                //         this.blockSize);
                // }
            }
        }
    }
    
    drawBoard(boardMatrix: number[][]) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < boardMatrix.length; i++) {
            for (let j = 0; j < boardMatrix[i].length; j++) {
                const temp: number = boardMatrix[i][j];
                if (temp === 0) {
                    this.ctx.strokeStyle = "black";
                    this.ctx.fillStyle = "white";
                }
                else {
                    this.ctx.strokeStyle = "gold";
                    this.ctx.fillStyle = "black ";
                }
                this.ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                this.ctx.strokeRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
            }
        }
    }
    
    public updateBoard(boardMatrix: number[][], activeBlock: IBlock) {
        //redraws whole board by calling
        this.drawBoard(boardMatrix);
        //redraws blocks by calling
        this.drawBlock(activeBlock);
    }
    
    public setFocus() {
        this.canvas.focus();
    }
}
