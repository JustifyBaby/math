class Divisor {
  constructor(num = 0) {
    this.num = num;
  }

  // 整数によるnumの約数を演算
  getIntDivisors(numII) {
    // 初期配列
    const results = [];

    const limit = numII ? numII : this.num;

    // 1 -> numまでの数
    for (let i = 1; i <= limit; i++) {
      // num / iのあまりが0の数を追加。
      if (limit % i === 0) results.push(i);
    }
    return results;
  }

  getPrimeNums(numII) {
    let limit = numII ? numII : this.num;
    // 2 -> num までの素数を格納する配列
    let primeNums = [];

    // 2 -> num までの素数を生成。
    for (let n = 2; n <= limit; n++) {
      let divisor = this.getIntDivisors(n);
      if (divisor.length === 2) {
        primeNums.push(n);
      }
    }
    return primeNums;
  }

  // 素因数分解
  primeFactorization(numII) {
    // 引数numの複製(後に再代入するため。)
    let usingNum = numII ? numII : this.num;
    // 素数集合
    let primeNums = this.getPrimeNums();
    // 素因数を保管する配列。
    let factorizations = [];

    for (let prime in primeNums) {
      // 生成した素数であまりが０でなくなるまで割る。
      while (usingNum % primeNums[prime] === 0) {
        factorizations.push(primeNums[prime]);
        // ここで再代入しないと無限ループになる。
        usingNum = usingNum / primeNums[prime];
      }
    }
    return factorizations;
  }

  // a√bの形にするメソッド
  // root(48->2*3*3) = 3*root(2)
  sqrtMathNotation() {
    const squares = this.primeFactorization();
    let elements;
    const outSqrts = [];

    // [3,2]
  }

  approx(child = 1, mother = 1) {
    const primeChildren = this.getPrimeNums(child);
    const primeMothers = this.getPrimeNums(mother);
    let cpChild = child;
    let cpMom = mother;

    const limit = primeChildren.some(pchild => cpChild % pchild !== 0);
    while (limit) {
      let childIndex;
      let motherIndex;
      childIndex = primeChildren.findIndex(pchild => cpChild % pchild === 0);
      motherIndex = primeMothers.findIndex(pmom => cpMom % pmom === 0);

      if (childIndex === -1 || motherIndex === -1) {
        console.log(JSON.stringify([cpChild, cpMom]));
        return [cpChild, cpMom];
      } else {
        cpChild = cpChild / primeChildren[childIndex];
        cpMom = cpMom / primeMothers[motherIndex];

        primeMothers.splice(motherIndex, 1);
        primeChildren.splice(childIndex, 1);
        console.log([cpChild, cpMom]);
      }
    }
  }
}

const output = () => {
  const i = new Divisor(48);
  return i.approx(18, 24);
}

console.log(output());