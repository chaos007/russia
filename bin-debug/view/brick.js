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
var BrickView = (function (_super) {
    __extends(BrickView, _super);
    function BrickView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Order = -1;
        _this.Color = 0;
        _this.Type = 0;
        _this.IsDel = false;
        return _this;
    }
    BrickView.prototype.GenSmallBrick = function (color, type) {
        var b = Brick.BrickMap[type];
        for (var i = 0; i < b.DotList.length; i++) {
            var grid = new egret.Shape();
            grid.graphics.beginFill(color, 1);
            var x = b.SmallX + Math.floor(b.DotList[i] % 8) * (b.SmallGap + b.SmallSide);
            var y = b.SmallY + Math.floor(b.DotList[i] / 8) * (b.SmallGap + b.SmallSide);
            grid.graphics.drawRect(0, 0, b.SmallSide, b.SmallSide);
            grid.graphics.endFill();
            grid.x = Math.floor(x);
            grid.y = y;
            this.addChild(grid);
        }
    };
    BrickView.prototype.GenBigBrick = function (color, type) {
        var b = Brick.BrickMap[type];
        for (var i = 0; i < b.DotList.length; i++) {
            var grid = new egret.Shape();
            grid.graphics.beginFill(color, 1);
            var x = b.BigX + Math.floor(b.DotList[i] % 8) * (b.BigGap + b.BigSide);
            var y = b.BigY + Math.floor(b.DotList[i] / 8) * (b.BigGap + b.BigSide);
            grid.graphics.drawRect(0, 0, b.BigSide, b.BigSide);
            grid.graphics.endFill();
            grid.x = Math.floor(x);
            grid.y = y;
            this.addChild(grid);
        }
    };
    return BrickView;
}(egret.Sprite));
__reflect(BrickView.prototype, "BrickView");
//# sourceMappingURL=brick.js.map