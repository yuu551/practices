const { poverty } = require("./poverty");

test("大貧民が正常に動くかテスト", () => {
    expect(poverty("DJ")).toBe("-");
    expect(poverty("S3,D4D2")).toBe("D4,D2");
    expect(poverty("H7,HK")).toBe("HK");
    expect(poverty("S9,C8H4")).toBe("-");
    expect(poverty("S6,S7STCK")).toBe("S7,ST,CK");
    expect(poverty("HTST,SJHJDJCJJoS3D2")).toBe("SJJo,SJHJ,SJDJ,SJCJ,HJJo,HJDJ,HJCJ,DJJo,DJCJ,CJJo,D2Jo");
    expect(poverty("CTDT,S9C2D9D3JoC6DASJS4")).toBe("C2Jo,DAJo,SJJo");
    expect(poverty("DJSJ,DTDKDQHQJoC2")).toBe("DKJo,DQJo,DQHQ,HQJo,C2Jo");
    expect(poverty("H5C5S5D5,C7S6D6C3H7HAH6H4C6HQC9")).toBe("S6D6H6C6");
    expect(poverty("DJHJSJ,SQDQJoHQCQC2CA")).toBe("SQJoDQ,SQJoHQ,SQDQHQ,SQDQCQ,SQHQCQ,SQJoCQ,JoDQHQ,JoDQCQ,JoHQCQ,DQHQCQ");
    expect(poverty("H6D6S6,H8S8D8C8JoD2H2")).toBe("H8JoS8,H8JoD8,H8S8D8,H8S8C8,H8D8C8,H8JoC8,JoS8D8,JoS8C8,JoD8C8,S8D8C8,D2JoH2");
    expect(poverty("H5C5S5D5,C7S6D6C3H7HAH6H4C6HQC9")).toBe("S6D6H6C6");
    expect(poverty("C3JoH3D3,S2S3H7HQCACTC2CKC6S7H5C7")).toBe("-");
    expect(poverty("H7S7C7D7,S5SAH5HAD5DAC5CA")).toBe("SAHADACA");
    expect(poverty("JoS8D8H8,S9DTH9CTD9STC9CAC2")).toBe("S9H9D9C9");
    expect(poverty("DTCTSTHT,S3SQH3HQD3DQC3CQJo")).toBe("SQJoHQDQ,SQJoHQCQ,SQJoDQCQ,SQHQDQCQ,JoHQDQCQ");
    expect(poverty("D4H4S4C4,S6SAH6HAD6DAC6CAJo")).toBe("S6JoH6D6,S6JoH6C6,S6JoD6C6,S6H6D6C6,JoH6D6C6,SAJoHADA,SAJoHACA,SAJoDACA,SAHADACA,JoHADACA");
    expect(poverty("JoS8D8H8,S9DTH9CTD9STC9CAC2")).toBe("S9H9D9C9");
})