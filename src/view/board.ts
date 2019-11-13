class Board extends egret.Sprite {

    //0x452727
    public Layer: egret.Shape;
    public ColorList: Array<egret.Shape> = new Array<egret.Shape>(64);
    private bgInit() {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x000000, 1);
        this.Layer.graphics.drawRect(0, 0, 708, 708);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
        for (let i = 0; i < 64; i++) {
            this.darwGrid(i);
        }
    }

    private darwGrid(n: number) {
        let line = Math.floor(n / 8);
        let colmn = n % 8;
        let grid = new egret.Shape();
        grid.graphics.beginFill(0x452727, 1);
        grid.graphics.drawRect(4 + colmn * 88, 4 + line * 88, 84, 84);
        grid.graphics.endFill();
        this.addChild(grid);
    }

    public DrawLayerGrid(index: number, color: number) {
        let line = Math.floor(index / 8);
        let colmn = index % 8;
        let grid = new egret.Shape();
        grid.graphics.beginFill(color, 1);
        grid.graphics.drawRect(4 + colmn * 88, 4 + line * 88, 84, 84);
        grid.graphics.endFill();
        this.ColorList[index] = grid;
        this.addChild(grid);
    }

    public DeleteLayerGrid(index: number) {
        let grid = this.ColorList[index];
        if (grid == null){
            return;
        }
        this.removeChild(grid);
    }

    public Init() {
        this.bgInit();
        // this.Layer = new egret.Shape();
        // this.Layer.graphics.beginFill(0xffffff, 0.5);
        // this.Layer.graphics.drawRoundRect(0, 0, 300, 700, 20, 20);
        // this.Layer.graphics.endFill();
        // this.addChild(this.Layer);
    }
}