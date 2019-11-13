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
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ColorList = new Array(64);
        return _this;
    }
    Board.prototype.bgInit = function () {
        this.Layer = new egret.Shape();
        this.Layer.graphics.beginFill(0x000000, 1);
        this.Layer.graphics.drawRect(0, 0, 708, 708);
        this.Layer.graphics.endFill();
        this.addChild(this.Layer);
        for (var i = 0; i < 64; i++) {
            this.darwGrid(i);
        }
    };
    Board.prototype.darwGrid = function (n) {
        var line = Math.floor(n / 8);
        var colmn = n % 8;
        var grid = new egret.Shape();
        grid.graphics.beginFill(0x452727, 1);
        grid.graphics.drawRect(4 + colmn * 88, 4 + line * 88, 84, 84);
        grid.graphics.endFill();
        this.addChild(grid);
    };
    Board.prototype.DrawLayerGrid = function (index, color) {
        var line = Math.floor(index / 8);
        var colmn = index % 8;
        var grid = new egret.Shape();
        grid.graphics.beginFill(color, 1);
        grid.graphics.drawRect(4 + colmn * 88, 4 + line * 88, 84, 84);
        grid.graphics.endFill();
        this.ColorList[index] = grid;
        this.addChild(grid);
    };
    Board.prototype.DeleteLayerGrid = function (index) {
        var grid = this.ColorList[index];
        if (grid == null) {
            return;
        }
        this.removeChild(grid);
    };
    Board.prototype.Init = function () {
        this.bgInit();
        // this.Layer = new egret.Shape();
        // this.Layer.graphics.beginFill(0xffffff, 0.5);
        // this.Layer.graphics.drawRoundRect(0, 0, 300, 700, 20, 20);
        // this.Layer.graphics.endFill();
        // this.addChild(this.Layer);
    };
    return Board;
}(egret.Sprite));
__reflect(Board.prototype, "Board");
//# sourceMappingURL=board.js.map