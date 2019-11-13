class MessageView extends egret.Sprite {

    public Text: egret.TextField = new egret.TextField();
    public Bg: egret.Shape = new egret.Shape();
    public YesButton: egret.Shape = new egret.Shape();
    public NoButton: egret.Shape = new egret.Shape();
    public Type: number = 0;

    public Init() {
        let shape = new egret.Shape();
        shape.graphics.beginFill(0x00314f, 1);
        shape.graphics.drawRect(0, 0, 450, 200);
        shape.graphics.endFill();
        this.addChild(shape);
        this.YesButton.graphics.beginFill(0xcccaa9, 0.5);
        this.YesButton.graphics.drawRect(30, 110, 165, 50);
        this.YesButton.graphics.endFill();
        this.addChild(this.YesButton);
        this.YesButton.touchEnabled = true;

        let yesLable = new egret.TextField();
        yesLable.text = "确定";
        yesLable.size = 32;
        yesLable.x = (225 - yesLable.width) / 2;
        yesLable.y = 120;
        yesLable.textColor = 0x00314f;
        this.addChild(yesLable);

        this.NoButton.graphics.beginFill(0xcccaa9, 0.5);
        this.NoButton.graphics.drawRect(255, 110, 165, 50);
        this.NoButton.graphics.endFill();
        this.addChild(this.NoButton);
        this.NoButton.touchEnabled = true;

        let noLable = new egret.TextField();
        noLable.text = "取消";
        noLable.size = 32;
        noLable.x = 225 + (225 - noLable.width) / 2;
        noLable.y = 120;
        noLable.textColor = 0x00314f;
        this.addChild(noLable);

        this.Text.text = "消掉方块";
        this.Text.size = 40;
        this.Text.x = (450 - this.Text.width) / 2;
        this.Text.y = 40;
        this.Text.textColor = 0xcccaa9;
        this.addChild(this.Text);

    }


    public ChangeText(o: number) {
        if (o == 0) {
            this.Text.text = "消掉方块";
            this.Type = o;
        } else {
            this.Text.text = "换一批";
            this.Type = o;
        }
        this.Text.x = (450 - this.Text.width) / 2;
    }
}