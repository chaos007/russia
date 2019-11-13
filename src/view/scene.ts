class Scene extends eui.UILayer {
    public constructor() {
        super();
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.Init();

    }
    public Layer: egret.Shape;
    public InfoBoard: Board = new Board();
    public Bottom: Bottom = new Bottom();
    public Message: MessageView = new MessageView();
    public Data: Data = new Data();
    public hangBigBrick: BrickView = new BrickView();
    public hangSmallBrick: BrickView = new BrickView();
    public ScoreText: egret.TextField = new egret.TextField();
    public lastX: number = 0;
    public lastY: number = 0;
    public hasClick: boolean = false;

    private infoBoardInit() {
        this.InfoBoard.Init();
        this.InfoBoard.x = 21;
        this.InfoBoard.y = 150;
        this.addChild(this.InfoBoard);
    }

    private bottomInit() {
        this.Bottom.Init();
        this.Bottom.x = 21;
        this.Bottom.y = 900;
        this.addChild(this.Bottom);
    }

    private scoreInit() {
        this.ScoreText.text = "0";
        this.ScoreText.size = 80;
        this.ScoreText.x = 540;
        this.ScoreText.y = 60;
        this.ScoreText.textColor = 0x452727;
        this.addChild(this.ScoreText);
    }

    public Init() {
        this.bgInit();
        this.infoBoardInit();
        this.bottomInit();
        this.scoreInit();
        this.Data.Init();
        this.NewSmallBrick();
        this.messageInit();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.Bottom.touchEnabled = true;
        this.Bottom.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }
    private bgInit() {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x452727, 0.5);
        this.Layer.graphics.drawRect(0, 0, 750, 1334);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
    }

    public NewSmallBrick() {
        for (var i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 31) + 1;
            let index = Math.floor(Math.random() * Brick.ColorList.length);
            let b = this.Bottom.AddSmallBrick(Brick.ColorList[index], i, r);
        }
    }


    public onTouchBegin(evt: egret.TouchEvent) {
        if (this.hasClick) {
            return;
        }
        var order = Math.floor(evt.stageX / 140);
        if (order >= 1 && order <= 3) {
            var b = this.Bottom.SmallBrickList[order - 1];
            if (b == null || b.IsDel) {
                return;
            }
            this.hangBigBrick = this.Bottom.AddBigBrick(b.Color, b.Order, b.Type);
            this.hangSmallBrick = b;
            this.lastX = 0;
            this.lastY = 0;
            this.hasClick = true;
            this.hangSmallBrick.visible = false;
        } else if (order == 4) {
            this.Message.ChangeText(order);
            this.Message.visible = true;
        } else if (order == 0) {
            this.Message.ChangeText(order);
            this.Message.visible = true;
        }
    }

    public renewSmall() {
        this.Bottom.DelAllSmall();
        this.NewSmallBrick();
    }

    public messageInit() {
        this.Message.visible = false;
        this.Message.Init();
        this.Message.x = 150;
        this.Message.y = 500;
        this.addChild(this.Message);

        this.Message.YesButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yesTap, this);
        this.Message.NoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noTap, this);
    }

    private yesTap(evt: egret.TouchEvent) {
        if (this.Message.Type == 0) {
            let list = this.Data.Reduce();
            for (var i = 0; i < list.length; i++) {
                this.InfoBoard.DeleteLayerGrid(list[i]);
            }
        } else if (this.Message.Type == 4) {
            this.renewSmall();
        }
        this.Message.visible = false;
    }

    private noTap(evt: egret.TouchEvent) {
        this.Message.visible = false;
    }

    public onTouchMove(evt: egret.TouchEvent) {
        if (!this.hasClick) {
            return;
        }
        if (this.lastX == 0) {
            this.lastX = evt.stageX;
        } else {
            this.hangBigBrick.x += (evt.stageX - this.lastX);
            this.lastX = evt.stageX;
        }
        if (this.lastY == 0) {
            this.lastY = evt.stageY;
        } else {
            this.hangBigBrick.y += (evt.stageY - this.lastY);
            this.lastY = evt.stageY;
        }
    }

    public onTouchEnd(evt: egret.TouchEvent) {
        if (!this.hasClick) {
            return;
        }
        this.hasClick = false;
        let b = Brick.BrickMap[this.hangBigBrick.Type];

        var line = Math.floor((this.hangBigBrick.x + b.BigX + 44) / 88);
        var colmn = Math.floor((this.hangBigBrick.y + b.BigY + 750 + 44) / 88);

        let succ = this.Data.AddBrick(this.hangBigBrick.Type, line, colmn, this.hangBigBrick.Color);
        if (!succ) {
            this.hangSmallBrick.visible = true;
            this.Bottom.removeChild(this.hangBigBrick);
            this.hangBigBrick = null;
            return;
        }
        var index = line + colmn * 8;

        for (var i = 0; i < b.DotList.length; i++) {
            this.InfoBoard.DrawLayerGrid(b.DotList[i] + index, this.hangBigBrick.Color);
        }

        this.Bottom.removeChild(this.hangBigBrick);
        this.hangBigBrick = null;
        this.hangSmallBrick.IsDel = true;

        if (this.Bottom.CheckEmpty()) {
            this.NewSmallBrick();
        }

        let list = this.Data.Clean();
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                this.InfoBoard.DeleteLayerGrid(list[i]);
            }
        }

        this.ScoreText.text = this.Data.Score.toString();
    }
}