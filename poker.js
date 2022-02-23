const poker = (input) => {
  const numbers = Array.from(input);
  let count = {};
  const suits = ["S", "H", "D", "C"];

  numbers.forEach((value, index) => {
    if (suits.includes(value)) return;
    if (value === "1" && numbers[index + 1] === "0") value = "10";
    count[value] ? count[value]++ : (count[value] = 1);
  });

  const pairs = [["4K", false],["FH", false],["3K", false],["2P", false],["1P", false],["--", false]];
  Object.keys(count).forEach((value) => {
    if (count[value] === 4) pairs[0][1] = true;
    else if (count[value] === 3 && pairs[3][1] === true) pairs[1][1] = true;
    else if (count[value] === 2 && pairs[2][1] === true) pairs[1][1] = true;
    else if (count[value] === 3) pairs[2][1] = true;
    else if (count[value] === 2 && pairs[4][1] === true) pairs[3][1] = true;
    else if (count[value] === 2) pairs[4][1] = true;
    else pairs[5][1] = true;
  });
  const result = pairs.find((value) => value[1] === true);
  return result[0];
};

module.exports.poker = poker;
