export class BlockShape {
    constructor(private width: number, private height: number, private shape: number[][]) { }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }
    public getShape(): number[][] {
        return this.shape;
    }
}
