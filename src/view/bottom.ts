class Bottom extends egret.Sprite {

    public Layer: egret.Shape;
    public Hammer: egret.Sprite;
    public Change: egret.Sprite;
    public SmallBrickList: Array<BrickView> = new Array<BrickView>(3);

    private bgInit() {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x452727, 1);
        this.Layer.graphics.drawRect(0, 0, 716, 200);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
    }

    public AddSmallBrick(color: number, order: number, type: number): BrickView {
        let b = new BrickView();
        b.Order = order;
        b.Color = color;
        b.Type = type;
        b.GenSmallBrick(color, type);
        b.x = 140 + 140 * order;
        b.y = 30;
        this.addChild(b);
        this.SmallBrickList[order] = b;
        return b;
    }

    public AddBigBrick(color: number, order: number, type: number): BrickView {
        let b = new BrickView();
        b.Order = order;
        b.Color = color;
        b.Type = type;
        b.GenBigBrick(color, type);
        b.x = 12 + 140 * order;
        b.y = -356;
        this.addChild(b);
        return b;
    }

    public DelAllSmall() {
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            this.removeChild(this.SmallBrickList[i]);
        }
    }

    public CheckEmpty(): boolean {
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            if (!this.SmallBrickList[i].IsDel) {
                return false;
            }
        }
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            this.removeChild(this.SmallBrickList[i]);
        }
        return true;
    }

    private hammerInit() {
        this.Hammer = new egret.Sprite();
        let head = new egret.Shape();
        head.graphics.beginFill(0xffffff, 0.5);
        head.graphics.drawRect(20, 40, 100, 50);
        head.graphics.endFill();
        this.Hammer.addChild(head);
        let tail = new egret.Shape();
        tail.graphics.beginFill(0xffffff, 0.5);
        tail.graphics.drawRect(50, 90, 40, 75);
        tail.graphics.endFill();
        this.Hammer.addChild(tail);
        this.addChild(this.Hammer);
    }

    private changeInit() {
        this.Change = new egret.Sprite();
        this.Change.graphics.beginFill(0xffffff, 0.5);
        this.Change.graphics.drawArc(640, 100, 60, 0, 2 * Math.PI);
        this.Change.graphics.endFill();
        this.addChild(this.Change);
    }

    public Init() {
        this.bgInit();
        this.hammerInit();
        this.changeInit();
    }
}