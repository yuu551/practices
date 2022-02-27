const enrai = ["A", "B", "C"];

const cities = [
  { name: "enrai", firstLen: 995, firstFee: 400},
  { name: "tansu", firstLen: 845, firstFee: 350 },
];

// 配列の第三項目に加算金額
const distances = [
  ["AB", 1090, 60],
  ["AC", 180, 60],
  ["AD", 540, 50],
  ["BA", 1090, 60],
  ["BC", 960, 60],
  ["BG", 1270, 60],
  ["CA", 180, 60],
  ["CB", 960, 60],
  ["CD", 400, 50],
  ["CF", 200, 60],
  ["DA", 540, 50],
  ["DC", 400, 50],
  ["DE", 720, 50],
  ["DF", 510, 50],
  ["ED", 720, 50],
  ["EG", 1050, 50],
  ["FC", 200, 60],
  ["FD", 510, 50],
  ["FG", 230, 50],
  ["GB", 1270, 60],
  ["GE", 1050, 50],
  ["GF", 230, 50],
];

const taxiFee = (input) => {
  const routes = getRoutes(input);
  const taxiFeeInfo = {
    firstCityInfo: {},
    totalLength: 0,
    totalFee: 0,
    rest :0
  };

  routes.forEach((route) => {
    const restLength = taxiFeeInfo.rest
    taxiFeeInfo.rest = 0;
    const distance = getDistance(route);
    if (taxiFeeInfo.totalLength === 0) {
      const fromCity = route.substring(0, 1);
      const fromCityInfo = getCityInfo(getCityName(fromCity));
      taxiFeeInfo.totalFee += fromCityInfo.firstFee;
      if (fromCityInfo.firstLen <= distance[1]) {
        taxiFeeInfo.totalFee += distance[2];
        const meterCount =  Math.floor((distance[1] - fromCityInfo.firstLen) / 200)
        taxiFeeInfo.totalFee += meterCount * distance[2];
        taxiFeeInfo.rest = distance[1] - fromCityInfo.firstLen - (meterCount * 200)
      }
      taxiFeeInfo.firstCityInfo = fromCityInfo;
      taxiFeeInfo.totalLength += distance[1];
      return;
    }
    if (taxiFeeInfo.firstCityInfo.firstLen <= taxiFeeInfo.totalLength) {
      const meterCount = Math.floor((distance[1] + restLength) / 200)
      taxiFeeInfo.totalFee += meterCount * distance[2];
      taxiFeeInfo.rest = (distance[1] + restLength) - meterCount * 200
    } 
    else if (taxiFeeInfo.firstCityInfo.firstLen <= taxiFeeInfo.totalLength + distance[1]) {
      // 最初に足し算する。
      taxiFeeInfo.totalFee += distance[2];
      const meterCount = Math.floor((taxiFeeInfo.totalLength +distance[1] - taxiFeeInfo.firstCityInfo.firstLen) /200)
      taxiFeeInfo.totalFee += meterCount * distance[2];
      taxiFeeInfo.rest = taxiFeeInfo.totalLength + distance[1] - taxiFeeInfo.firstCityInfo.firstLen - (200 * meterCount)
    }
    taxiFeeInfo.totalLength += distance[1];
  });

  return taxiFeeInfo.totalFee;
};

const getCityName = (city) => {
  return enrai.includes(city) ? "enrai" : "tansu";
};

const getCityInfo = (cityName) => {
  return cities.find((el) => el.name === cityName);
};

const getDistance = (route) => {
  return distances.find((el) => el[0] === route);
};

const getRoutes = (input) => {
  const array = Array.from(input);
  const routesArray = [];
  array.forEach((val, index) => {
    if (index === 0) return;
    routesArray.push(array[index - 1] + val);
  });
  return routesArray;
};

module.exports.taxiFee = taxiFee;
