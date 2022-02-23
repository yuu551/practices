const { poker } = require("./poker")

test("pokerが正常に動くかどうかテスト", () => {
    expect(poker("D3C3S3H3D2")).toBe("4K")
    expect(poker("D3C3C10D10S3")).toBe("FH")
    expect(poker("D3C3S3H5D2")).toBe("3K")
    expect(poker("S8D10HJS10CJ")).toBe("2P")
    expect(poker("D3C3S7H5D2")).toBe("1P")
    expect(poker("D3C4S7H5D2")).toBe("--")
})