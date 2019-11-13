class Data {
    List: Array<Piece> = new Array<Piece>(64);


    public Score: number = 0;


    public Init() {
        for (let i = 0; i < 64; i++) {
            let p = new Piece();
            p.Color = -1;
            p.Index = i;
            this.List[i] = p;
        }
        this.initBrick();
    }

    private initBrick() {
        // for (v in Brick.BrickToDotList) {
        //     // let b = new Brick();
        //     // b.Type = v;
        //     // b.DotList = Brick.BrickToDotList[v];
        //     // Brick.BrickMap[v] = b;
        // }
    }

    public AddBrick(t: number, line: number, colmn: number, color: number): boolean {
        if (line < 0 || colmn < 0) {
            return false;
        }
        var index = line + colmn * 8;

        let b = Brick.BrickMap[t];
        for (let i = 0; i < b.DotList.length; i++) {
            if (index + b.DotList[i] > 63) {
                return false
            }
            if (this.List[index + b.DotList[i]].Color != -1) {
                return false
            }
        }
        for (let i = 0; i < b.DotList.length; i++) {
            this.List[index + b.DotList[i]].Color = color;
        }
        this.Score += b.DotList.length;

        return true;
    }

    public Clean(): Array<number> {
        let map = {};
        let list = new Array<number>();

        for (let i = 0; i < 8; i++) {
            let has = true;
            for (let j = 0; j < 8; j++) {
                if (this.List[i * 8 + j].Color == -1) {
                    has = false;
                    break;
                }
            }
            if (has) {
                for (let j = 0; j < 8; j++) {
                    map[8 * i + j] = 8 * i + j;
                }
            }
        }

        for (let j = 0; j < 8; j++) {
            let has = true;
            for (let i = 0; i < 8; i++) {
                if (this.List[i * 8 + j].Color == -1) {
                    has = false;
                    break;
                }
            }
            if (has) {
                for (let i = 0; i < 8; i++) {
                    map[8 * i + j] = 8 * i + j;
                }
            }
        }
        var k: any;
        for (k in map) {
            list.push(k);
            this.Score++;
            let p = this.List[k];
            if (p != null) {
                p.Color = -1;
            }
        }
        return list;
    }

    public Check(): boolean {
        return false;
    }
    public Reduce(): Array<number> {
        let list = new Array<number>();

        let all = new Array<number>();
        for (var i = 0; i < this.List.length; i++) {
            if (this.List[i].Color != -1) {
                all.push(this.List[i].Index);
            }
        }

        let delNum = Math.floor(all.length / 2);
        let l = -1;
        while (true) {
            if (delNum <= 0) {
                break;
            }
            if (l >= all.length - 1) {
                break;
            }
            let step = Math.floor(Math.random() * 2) + 1;
            list.push(all[l + step]);
            l += 2;
            delNum--
        }

        for (var i = 0; i < list.length; i++) {
            this.List[list[i]].Color = -1;
        }

        return list;
    }
}

class Piece {
    Color: number;
    Index: number;
}