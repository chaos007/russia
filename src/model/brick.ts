class Brick {
    //1-5，横1-5
    //6-9，竖2-5
    //10，11，小田，大田
    //12-15，田缺左上，田缺右上，田缺左下，田缺右下
    //16-23，8种马字变形
    //24-25，左砖头，右砖头
    //26-27，正山，反山
    //28-31，边三旋转
    public constructor(t: number, smallX: number, smallY: number,
        bigX: number, bigY: number, list: Array<number>) {
        this.Type = t;
        this.SmallX = smallX;
        this.SmallY = smallY;
        this.BigX = bigX;
        this.BigY = bigY;
        this.DotList = list;
    }
    public Type: number = 0;//形状
    public DotList: Array<number> = new Array<number>();
    public SmallX: number = 0;
    public SmallY: number = 0;
    public BigX: number = 0;
    public BigY: number = 0;
    public SmallSide: number = 26;
    public BigSide: number = 84;
    public SmallGap: number = 2;
    public BigGap: number = 4;

    public static BrickMap: { [key: number]: Brick } = {
        1: new Brick(1, 57, 57, 180, 180, [0]),
        2: new Brick(2, 43, 57, 136, 180, [0, 1]),
        3: new Brick(3, 29, 57, 92, 180, [0, 1, 2]),
        4: new Brick(4, 15, 57, 48, 180, new Array<number>(0, 1, 2, 3)),
        5: new Brick(5, 1, 57, 4, 180, new Array<number>(0, 1, 2, 3, 4)),
        6: new Brick(6, 57, 43, 180, 136, new Array<number>(0, 8)),
        7: new Brick(7, 57, 29, 180, 92, new Array<number>(0, 8, 16)),
        8: new Brick(8, 57, 15, 180, 48, new Array<number>(0, 8, 16, 24)),
        9: new Brick(9, 57, 1, 180, 4, new Array<number>(0, 8, 16, 24, 32)),
        10: new Brick(10, 43, 43, 136, 136, new Array<number>(0, 1, 8, 9)),
        11: new Brick(11, 29, 29, 92, 92, new Array<number>(0, 1, 2, 8, 9, 10, 16, 17, 18)),
        12: new Brick(12, 43, 43, 136, 136, new Array<number>(1, 8, 9)),
        13: new Brick(13, 43, 43, 136, 136, new Array<number>(0, 8, 9)),
        14: new Brick(14, 43, 43, 136, 136, new Array<number>(0, 1, 9)),
        15: new Brick(15, 43, 43, 136, 136, new Array<number>(0, 1, 8)),
        16: new Brick(16, 43, 29, 136, 92, new Array<number>(0, 8, 16, 17)),
        17: new Brick(17, 29, 43, 92, 136, new Array<number>(2, 8, 9, 10)),
        18: new Brick(18, 43, 29, 136, 92, new Array<number>(0, 1, 9, 17)),
        19: new Brick(19, 29, 43, 92, 136, new Array<number>(0, 1, 2, 8)),
        20: new Brick(20, 43, 29, 136, 92, new Array<number>(1, 9, 16, 17)),
        21: new Brick(21, 29, 43, 92, 136, new Array<number>(0, 1, 2, 10)),
        22: new Brick(22, 43, 29, 136, 92, new Array<number>(0, 1, 8, 16)),
        23: new Brick(23, 29, 43, 92, 136, new Array<number>(0, 8, 9, 10)),
        24: new Brick(24, 29, 43, 92, 136, new Array<number>(0, 1, 9, 10)),
        25: new Brick(25, 29, 43, 92, 136, new Array<number>(1, 2, 8, 9)),
        26: new Brick(26, 29, 43, 92, 136, new Array<number>(1, 8, 9, 10)),
        27: new Brick(27, 29, 43, 92, 136, new Array<number>(0, 1, 2, 9)),
        28: new Brick(28, 29, 29, 92, 92, new Array<number>(0, 1, 2, 10, 18)),
        29: new Brick(29, 29, 29, 92, 92, new Array<number>(2, 10, 16, 17, 18)),
        30: new Brick(30, 29, 29, 92, 92, new Array<number>(0, 8, 16, 17, 18)),
        31: new Brick(31, 29, 29, 92, 92, new Array<number>(0, 1, 2, 8, 16)),
    };

    public static ColorList = new Array<number>(
        0xb6c29a,
        0x83af9b,
        0xc8c8a9,
        0xf9cdad,
        0xfc9d9a,
        0xfe4365,
        0x8a977b,
        0xf4d000,
        0xe58308,
        0xdc5712,
        0x458994,
    );
}