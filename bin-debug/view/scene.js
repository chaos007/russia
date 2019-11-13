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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.InfoBoard = new Board();
        _this.Bottom = new Bottom();
        _this.Message = new MessageView();
        _this.Data = new Data();
        _this.hangBigBrick = new BrickView();
        _this.hangSmallBrick = new BrickView();
        _this.ScoreText = new egret.TextField();
        _this.lastX = 0;
        _this.lastY = 0;
        _this.hasClick = false;
        return _this;
    }
    Scene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.Init();
    };
    Scene.prototype.infoBoardInit = function () {
        this.InfoBoard.Init();
        this.InfoBoard.x = 21;
        this.InfoBoard.y = 150;
        this.addChild(this.InfoBoard);
    };
    Scene.prototype.bottomInit = function () {
        this.Bottom.Init();
        this.Bottom.x = 21;
        this.Bottom.y = 900;
        this.addChild(this.Bottom);
    };
    Scene.prototype.scoreInit = function () {
        this.ScoreText.text = "0";
        this.ScoreText.size = 80;
        this.ScoreText.x = 540;
        this.ScoreText.y = 60;
        this.ScoreText.textColor = 0x452727;
        this.addChild(this.ScoreText);
    };
    Scene.prototype.Init = function () {
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
    };
    Scene.prototype.bgInit = function () {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x452727, 0.5);
        this.Layer.graphics.drawRect(0, 0, 750, 1334);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
    };
    Scene.prototype.NewSmallBrick = function () {
        for (var i = 0; i < 3; i++) {
            var r = Math.floor(Math.random() * 31) + 1;
            var index = Math.floor(Math.random() * Brick.ColorList.length);
            var b = this.Bottom.AddSmallBrick(Brick.ColorList[index], i, r);
        }
    };
    Scene.prototype.onTouchBegin = function (evt) {
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
        }
        else if (order == 4) {
            this.Message.ChangeText(order);
            this.Message.visible = true;
        }
        else if (order == 0) {
            this.Message.ChangeText(order);
            this.Message.visible = true;
        }
    };
    Scene.prototype.renewSmall = function () {
        this.Bottom.DelAllSmall();
        this.NewSmallBrick();
    };
    Scene.prototype.messageInit = function () {
        this.Message.visible = false;
        this.Message.Init();
        this.Message.x = 150;
        this.Message.y = 500;
        this.addChild(this.Message);
        this.Message.YesButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yesTap, this);
        this.Message.NoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noTap, this);
    };
    Scene.prototype.yesTap = function (evt) {
        if (this.Message.Type == 0) {
            var list = this.Data.Reduce();
            for (var i = 0; i < list.length; i++) {
                this.InfoBoard.DeleteLayerGrid(list[i]);
            }
        }
        else if (this.Message.Type == 4) {
            this.renewSmall();
        }
        this.Message.visible = false;
    };
    Scene.prototype.noTap = function (evt) {
        this.Message.visible = false;
    };
    Scene.prototype.onTouchMove = function (evt) {
        if (!this.hasClick) {
            return;
        }
        if (this.lastX == 0) {
            this.lastX = evt.stageX;
        }
        else {
            this.hangBigBrick.x += (evt.stageX - this.lastX);
            this.lastX = evt.stageX;
        }
        if (this.lastY == 0) {
            this.lastY = evt.stageY;
        }
        else {
            this.hangBigBrick.y += (evt.stageY - this.lastY);
            this.lastY = evt.stageY;
        }
    };
    Scene.prototype.onTouchEnd = function (evt) {
        if (!this.hasClick) {
            return;
        }
        this.hasClick = false;
        var b = Brick.BrickMap[this.hangBigBrick.Type];
        var line = Math.floor((this.hangBigBrick.x + b.BigX + 44) / 88);
        var colmn = Math.floor((this.hangBigBrick.y + b.BigY + 750 + 44) / 88);
        var succ = this.Data.AddBrick(this.hangBigBrick.Type, line, colmn, this.hangBigBrick.Color);
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
        var list = this.Data.Clean();
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                this.InfoBoard.DeleteLayerGrid(list[i]);
            }
        }
        this.ScoreText.text = this.Data.Score.toString();
    };
    return Scene;
}(eui.UILayer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=scene.js.map