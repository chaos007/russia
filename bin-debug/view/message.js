var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MessageView = (function (_super) {
    __extends(MessageView, _super);
    function MessageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Text = new egret.TextField();
        _this.Bg = new egret.Shape();
        _this.YesButton = new egret.Shape();
        _this.NoButton = new egret.Shape();
        _this.Type = 0;
        return _this;
    }
    MessageView.prototype.Init = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00314f, 1);
        shape.graphics.drawRect(0, 0, 450, 200);
        shape.graphics.endFill();
        this.addChild(shape);
        this.YesButton.graphics.beginFill(0xcccaa9, 0.5);
        this.YesButton.graphics.drawRect(30, 110, 165, 50);
        this.YesButton.graphics.endFill();
        this.addChild(this.YesButton);
        this.YesButton.touchEnabled = true;
        var yesLable = new egret.TextField();
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
        var noLable = new egret.TextField();
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
    };
    MessageView.prototype.ChangeText = function (o) {
        if (o == 0) {
            this.Text.text = "消掉方块";
            this.Type = o;
        }
        else {
            this.Text.text = "换一批";
            this.Type = o;
        }
        this.Text.x = (450 - this.Text.width) / 2;
    };
    return MessageView;
}(egret.Sprite));
__reflect(MessageView.prototype, "MessageView");
//# sourceMappingURL=message.js.map