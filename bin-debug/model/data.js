var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
        this.List = new Array(64);
        this.Score = 0;
    }
    Data.prototype.Init = function () {
        for (var i = 0; i < 64; i++) {
            var p = new Piece();
            p.Color = -1;
            p.Index = i;
            this.List[i] = p;
        }
        this.initBrick();
    };
    Data.prototype.initBrick = function () {
        // for (v in Brick.BrickToDotList) {
        //     // let b = new Brick();
        //     // b.Type = v;
        //     // b.DotList = Brick.BrickToDotList[v];
        //     // Brick.BrickMap[v] = b;
        // }
    };
    Data.prototype.AddBrick = function (t, line, colmn, color) {
        if (line < 0 || colmn < 0) {
            return false;
        }
        var index = line + colmn * 8;
        var b = Brick.BrickMap[t];
        for (var i = 0; i < b.DotList.length; i++) {
            if (index + b.DotList[i] > 63) {
                return false;
            }
            if (this.List[index + b.DotList[i]].Color != -1) {
                return false;
            }
        }
        for (var i = 0; i < b.DotList.length; i++) {
            this.List[index + b.DotList[i]].Color = color;
        }
        this.Score += b.DotList.length;
        return true;
    };
    Data.prototype.Clean = function () {
        var map = {};
        var list = new Array();
        for (var i = 0; i < 8; i++) {
            var has = true;
            for (var j = 0; j < 8; j++) {
                if (this.List[i * 8 + j].Color == -1) {
                    has = false;
                    break;
                }
            }
            if (has) {
                for (var j = 0; j < 8; j++) {
                    map[8 * i + j] = 8 * i + j;
                }
            }
        }
        for (var j = 0; j < 8; j++) {
            var has = true;
            for (var i = 0; i < 8; i++) {
                if (this.List[i * 8 + j].Color == -1) {
                    has = false;
                    break;
                }
            }
            if (has) {
                for (var i = 0; i < 8; i++) {
                    map[8 * i + j] = 8 * i + j;
                }
            }
        }
        var k;
        for (k in map) {
            list.push(k);
            this.Score++;
            var p = this.List[k];
            if (p != null) {
                p.Color = -1;
            }
        }
        return list;
    };
    Data.prototype.Check = function () {
        return false;
    };
    Data.prototype.Reduce = function () {
        var list = new Array();
        var all = new Array();
        for (var i = 0; i < this.List.length; i++) {
            if (this.List[i].Color != -1) {
                all.push(this.List[i].Index);
            }
        }
        var delNum = Math.floor(all.length / 2);
        var l = -1;
        while (true) {
            if (delNum <= 0) {
                break;
            }
            if (l >= all.length - 1) {
                break;
            }
            var step = Math.floor(Math.random() * 2) + 1;
            list.push(all[l + step]);
            l += 2;
            delNum--;
        }
        for (var i = 0; i < list.length; i++) {
            this.List[list[i]].Color = -1;
        }
        return list;
    };
    return Data;
}());
__reflect(Data.prototype, "Data");
var Piece = (function () {
    function Piece() {
    }
    return Piece;
}());
__reflect(Piece.prototype, "Piece");
//# sourceMappingURL=data.js.map