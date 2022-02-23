const monstersInfo = [
  { name: "B", neededItem: "a", dropItem: "c" },
  { name: "D", neededItem: "c", dropItem: "e" },
  { name: "F", neededItem: "e", dropItem: "g" },
  { name: "H", neededItem: "g", dropItem: "i" },
  { name: "J", neededItem: "i", dropItem: "k" },
  { name: "L", neededItem: "k", dropItem: "a" },
];

const items = ["a", "c", "e", "g", "i", "k"];
const monsters = ["B", "D", "F", "H", "J", "L"];

const monsterHunt = (input) => {
  const inputArray = Array.from(input);
  const handItems = inputArray.filter((val) => items.includes(val));
  const existMonsters = inputArray.filter((val) => monsters.includes(val));
  let count = 0;
  while (count <= existMonsters.length) {
    existMonsters.forEach((monster) => {
      const info = monstersInfo.find((val) => val.name === monster);
      if (handItems.includes(info.neededItem)) handItems.push(info.dropItem);
    });
    count++;
  }

  const newItems = [...new Set(handItems)];
  let monsterCount = 0;
  existMonsters.forEach((monster) => {
    const info = monstersInfo.find((val) => val.name === monster);
    if (newItems.includes(info.neededItem)) monsterCount++;
  });

  return monsterCount;
};

module.exports.monsterHunt = monsterHunt;
