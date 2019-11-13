class BrickView extends egret.Sprite {

    public Order: number = -1;
    public Color: number = 0;
    public Type: number = 0;
    public IsDel: boolean = false;

    public GenSmallBrick(color: number, type: number) {
        let b = Brick.BrickMap[type];
        for (let i = 0; i < b.DotList.length; i++) {
            let grid = new egret.Shape();
            grid.graphics.beginFill(color, 1);
            let x = b.SmallX + Math.floor(b.DotList[i] % 8) * (b.SmallGap + b.SmallSide);
            let y = b.SmallY + Math.floor(b.DotList[i] / 8) * (b.SmallGap + b.SmallSide);
            grid.graphics.drawRect(0, 0, b.SmallSide, b.SmallSide);
            grid.graphics.endFill();
            grid.x = Math.floor(x);
            grid.y = y;
            this.addChild(grid);
        }
    }

    public GenBigBrick(color: number, type: number) {
        let b = Brick.BrickMap[type];
        for (let i = 0; i < b.DotList.length; i++) {
            let grid = new egret.Shape();
            grid.graphics.beginFill(color, 1);
            let x = b.BigX + Math.floor(b.DotList[i] % 8) * (b.BigGap + b.BigSide);
            let y = b.BigY + Math.floor(b.DotList[i] / 8) * (b.BigGap + b.BigSide);
            grid.graphics.drawRect(0, 0, b.BigSide, b.BigSide);
            grid.graphics.endFill();
            grid.x = Math.floor(x);
            grid.y = y;
            this.addChild(grid);
        }
    }


}