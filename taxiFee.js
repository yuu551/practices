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

const ROUTE = 0
const ROUTE_DISTANCE = 1
const ADD_FEE = 2

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
      if (fromCityInfo.firstLen <= distance[ROUTE_DISTANCE]) {
        taxiFeeInfo.totalFee += distance[ADD_FEE];
        const meterCount =  Math.floor((distance[ROUTE_DISTANCE] - fromCityInfo.firstLen) / 200)
        taxiFeeInfo.totalFee += meterCount * distance[ADD_FEE];
        taxiFeeInfo.rest = distance[ROUTE_DISTANCE] - fromCityInfo.firstLen - (meterCount * 200)
      }
      taxiFeeInfo.firstCityInfo = fromCityInfo;
      taxiFeeInfo.totalLength += distance[ROUTE_DISTANCE];
      return;
    }
    if (taxiFeeInfo.firstCityInfo.firstLen <= taxiFeeInfo.totalLength) {
      const meterCount = Math.floor((distance[ROUTE_DISTANCE] + restLength) / 200)
      taxiFeeInfo.totalFee += meterCount * distance[ADD_FEE];
      taxiFeeInfo.rest = (distance[ROUTE_DISTANCE] + restLength) - meterCount * 200
    } 
    else if (taxiFeeInfo.firstCityInfo.firstLen <= taxiFeeInfo.totalLength + distance[ROUTE_DISTANCE]) {
      // 最初に足し算する。
      taxiFeeInfo.totalFee += distance[ADD_FEE];
      const meterCount = Math.floor((taxiFeeInfo.totalLength +distance[ROUTE_DISTANCE] - taxiFeeInfo.firstCityInfo.firstLen) /200)
      taxiFeeInfo.totalFee += meterCount * distance[ADD_FEE];
      taxiFeeInfo.rest = taxiFeeInfo.totalLength + distance[ROUTE_DISTANCE] - taxiFeeInfo.firstCityInfo.firstLen - (200 * meterCount)
    }
    taxiFeeInfo.totalLength += distance[ROUTE_DISTANCE];
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
  return distances.find((el) => el[ROUTE] === route);
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
