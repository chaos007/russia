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
var Bottom = (function (_super) {
    __extends(Bottom, _super);
    function Bottom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SmallBrickList = new Array(3);
        return _this;
    }
    Bottom.prototype.bgInit = function () {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x452727, 1);
        this.Layer.graphics.drawRect(0, 0, 716, 200);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
    };
    Bottom.prototype.AddSmallBrick = function (color, order, type) {
        var b = new BrickView();
        b.Order = order;
        b.Color = color;
        b.Type = type;
        b.GenSmallBrick(color, type);
        b.x = 140 + 140 * order;
        b.y = 30;
        this.addChild(b);
        this.SmallBrickList[order] = b;
        return b;
    };
    Bottom.prototype.AddBigBrick = function (color, order, type) {
        var b = new BrickView();
        b.Order = order;
        b.Color = color;
        b.Type = type;
        b.GenBigBrick(color, type);
        b.x = 12 + 140 * order;
        b.y = -356;
        this.addChild(b);
        return b;
    };
    Bottom.prototype.DelAllSmall = function () {
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            this.removeChild(this.SmallBrickList[i]);
        }
    };
    Bottom.prototype.CheckEmpty = function () {
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            if (!this.SmallBrickList[i].IsDel) {
                return false;
            }
        }
        for (var i = 0; i < this.SmallBrickList.length; i++) {
            this.removeChild(this.SmallBrickList[i]);
        }
        return true;
    };
    Bottom.prototype.hammerInit = function () {
        this.Hammer = new egret.Sprite();
        var head = new egret.Shape();
        head.graphics.beginFill(0xffffff, 0.5);
        head.graphics.drawRect(20, 40, 100, 50);
        head.graphics.endFill();
        this.Hammer.addChild(head);
        var tail = new egret.Shape();
        tail.graphics.beginFill(0xffffff, 0.5);
        tail.graphics.drawRect(50, 90, 40, 75);
        tail.graphics.endFill();
        this.Hammer.addChild(tail);
        this.addChild(this.Hammer);
    };
    Bottom.prototype.changeInit = function () {
        this.Change = new egret.Sprite();
        this.Change.graphics.beginFill(0xffffff, 0.5);
        this.Change.graphics.drawArc(640, 100, 60, 0, 2 * Math.PI);
        this.Change.graphics.endFill();
        this.addChild(this.Change);
    };
    Bottom.prototype.Init = function () {
        this.bgInit();
        this.hammerInit();
        this.changeInit();
    };
    return Bottom;
}(egret.Sprite));
__reflect(Bottom.prototype, "Bottom");
//# sourceMappingURL=bottom.js.map