const {monsterHunt} = require("./monsterHunt")

test("モンスターを適切に狩れるかテスト", ()=>{
    expect(monsterHunt("gLDLBgBgHDaD")).toBe(6);
    expect(monsterHunt("DBcDLaLgDBH")).toBe(6);
    expect(monsterHunt("JJca")).toBe(0);
    expect(monsterHunt("FJDLBH")).toBe(0);
    expect(monsterHunt("HJBLFDg")).toBe(6);
    expect(monsterHunt("BDFDFFDFFLLFFJFDBFDFFFFDDFaDBFFB")).toBe(28)
    expect(monsterHunt("FJFFJDBHBHaLJBHJHDLHkLLLFFFgJgHJLHkJkB")).toBe(32)
    expect(monsterHunt("JJHHHkHJkHLJk")).toBe(1)
    expect(monsterHunt("DaaaDDD")).toBe(0)
    expect(monsterHunt("kHHBBaBgHagHgaHBBB")).toBe(11)
    expect(monsterHunt("HDBFFDHHHDFLDcHHLFDcJD")).toBe(20)
    expect(monsterHunt("HFFFHeFFee")).toBe(7)
    expect(monsterHunt("gLLDHgDLgFL")).toBe(1)
    expect(monsterHunt("JJJBBaBBHBBHaLBHJ")).toBe(7)
    expect(monsterHunt("FBFBgJBDBDgF")).toBe(0)
    expect(monsterHunt("LLLLakakLakLL")).toBe(7)
    expect(monsterHunt("HeJHeJe")).toBe(0)
    expect(monsterHunt("LDFLBLLeBLDBBFFBLFBB")).toBe(4)
})