const suits = ["S", "H", "D", "C"];
const level = {
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
  2: 13,
  Jo: 14,
};

const poverty = (input) => {
  const inputArray = input.split(",");
  const [field, hand] = inputArray;
  if (!hand) return "-";
  if (!field) return hand;

  const fieldArray = Array.from(field)

  const indexArray = fieldArray.reduce((previousVal,value,index,array) =>{
    if(suits.includes(value)){
        array.push(index)
    }
    return array;
    },[]
  )
  // ジョーカーはシングルカードのみ
  const maxFieldCard = field === "Jo"  ? "Jo" : field.substring(indexArray.slice(-1)[0] + 1, field.length);
  // ペアのカウント　Joが存在したらプラス1
  const pairCount = fieldArray.reduce((prev, item) =>{
    return prev + ( item === maxFieldCard ? 1 : 0) 
  },0)

  const cardCount = pairCount + ((field.indexOf("Jo") > -1 && maxFieldCard !== "Jo")  ? 1 : 0)
  let handlevels = [];
  if(hand.indexOf("Jo") > -1){
    handlevels.push(["Jo",level["Jo"]])
  }
  const noJokerHand = Array.from(hand.replace("Jo",""));
  noJokerHand.forEach((value,index) => {
      if(suits.includes(value)) handlevels.push([value + noJokerHand[index +1],level[noJokerHand[index +1]]])
  })

  const matchHand = handlevels.reduce((array,value) =>{
    const fillteredHandlevels  = handlevels.filter((value2) => {
        return (value2[0] ==="Jo" && value[0] !== "Jo") || ((value2[1] === value[1] && value2[0] !== value[0]) )
    })

      if(value[1] > level[maxFieldCard] && fillteredHandlevels.length >= cardCount -1 ) {
        switch(cardCount){
            case 1:
                array.push(value[0])
                break;
            case 2:
                fillteredHandlevels.forEach(value3 => {
                    if(!array.includes(value[0]+value3[0])  && !array.includes(value3[0]+value[0])) array.push(value[0]+value3[0])
                })
                break;
            case 3:
                if(fillteredHandlevels.length === 3 && array.some((val) => val.indexOf(value[0]) > -1) === false)
                {
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0])
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[2][0])
                    array.push(value[0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0])
                }else if(fillteredHandlevels.length === 2 && array.some((val) => val.indexOf(value[0]) > -1) === false){
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0])
                }else if(fillteredHandlevels.length === 4 && array.some((val) => val.indexOf(value[0]) > -1) === false){
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0])
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[2][0])
                    array.push(value[0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0])
                    array.push(value[0] + fillteredHandlevels[1][0] + fillteredHandlevels[3][0])
                    array.push(value[0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[3][0])
                    array.push(fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0])
                    array.push(fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[3][0])
                    array.push(fillteredHandlevels[0][0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                    array.push(fillteredHandlevels[1][0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                }

                break;
            case 4:
                if(fillteredHandlevels.length === 3 &&array.some((val) => val.indexOf(value[0]) > -1) === false){
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0])
                }else if(fillteredHandlevels.length === 4 &&array.some((val) => val.indexOf(value[0]) > -1) === false)
                {
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0])
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[3][0])
                    array.push(value[0] + fillteredHandlevels[0][0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                    array.push(value[0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                    array.push(fillteredHandlevels[0][0] + fillteredHandlevels[1][0] + fillteredHandlevels[2][0] + fillteredHandlevels[3][0])
                }
                
                break;
        }
         
      }
      return array;
  }, [])
  return matchHand.length > 0 ? matchHand.join(",") : "-"
};

module.exports.poverty = poverty;
