const analysis = (datas = [0]) => {
  let sum = 0; // 初期値
  let distributedSum = 0; //初期値

  datas.forEach(data => {
    sum += data; // 合計。
    distributedSum += data ** 2; // (data-avg) => 偏差。
  });
  const avg = sum / datas.length; //平均

  // 分散は、2乗の平均 - 平均の2乗で求められる。
  const dist = (distributedSum / datas.length) - (avg ** 2)

  const standard = Math.sqrt(dist);

  return {
    sum: sum, //データの合計値
    average: avg, //データの平均値
    distributed: dist, //データの分散
    standard: standard //データの標準偏差
  };
}

const analysisXY = (datasXY = [[0], [0]]) => {
  let sumX = 0;
  let sumY = 0;

  let distSumX = 0;
  let distSumY = 0;

  // 2次元から1次元に変換
  const datasX = datasXY[0];
  const datasY = datasXY[1];

  // 平均を求める
  datasX.map(dataX => {
    sumX += dataX;
    distSumX += dataX ** 2 //xでの偏差の二乗
  })

  // 平均
  const avgX = sumX / datasX.length;
  const avgY = sumY / datasX.length;

  datasY.map(dataY => {
    sumY += dataY;
    distSumY += dataY ** 2
  })

  // 分散を求める
  const distX = (distSumX / datasX.length) - (avgX ** 2);
  const distY = (distSumY / datasY.length) - (avgY ** 2);

  const standardX = Math.sqrt(distX);
  const standardY = Math.sqrt(distY);

  // 共分散
  let share = 0;
  for (let i in datasX) {
    const deviationX = (datasX[i] - avgX);
    const deviationY = (datasY[i] - avgY);
    share += deviationX * deviationY;
  }
  // console.log(share);

  const covariance = share / datasX.length;

  // 相関係数
  const correlation = covariance / (standardX * standardY);

  return {
    sum: {
      x: sumX,
      y: sumY
    },
    average: {
      x: avgX,
      y: avgY,
    },
    distributed: {
      x: distX,
      y: distY
    },
    standard: {
      x: standardX,
      y: standardY,
    },
    covariance: covariance,
    correlation: correlation
  };
}

console.log(analysis([5, 6, 7, 7, 10]));