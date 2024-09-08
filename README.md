# Sky chem

![chemLogo](https://github.com/kongnet/chem/raw/master/screenShot/chem_test.png)

A friend's kid is going to high school. I wrote a **Chemical Equation Balancing** code for him.

## Install

    npm i chem-eb

## Test

    npm test

## Use

```javascript
// equation use ->, =, - as split string
let balanceEq = require('chem-eb')
console.log(balanceEq('P+O2=P2O5')) // 4P + 5O2 = 2P2O5

// over-determined equation 会用到超定方程求解
console.log(balanceEq('Fe2S3O12+NaOH=Na2SO4+FeO3H3')) // Fe2S3O12 + 6NaOH = 3Na2SO4 + 2FeO3H3

console.log(balanceEq('Ca + NO3 -> Ca(NO3)2')) //  Ca + 2NO3 = Ca(NO3)2
console.log(balanceEq('Fe + Cl -> FeCl3')) // Fe + 3Cl = FeCl3
console.log(balanceEq('Ca(No3)2 + K3PO4 = Ca3(PO4)2 + KNo3')) //3Ca(No3)2 + 2K3PO4 = Ca3(PO4)2 + 6KNo3
console.log(
  balanceEq('K2Cr2O7 + H2SO4 + C2H5OH -> K2SO4 + Cr2(SO4)3 + H2O + CH3COOH') //2K2Cr2O7 + 8H2SO4 + 3C2H5OH = 2K2SO4 + 2Cr2(SO4)3 + 11H2O + 3CH3COOH
)
```

## NOTICE:

~~when (OH)2 pls O2H2 input~~

## TODO:

- ~~over-determined equation~~
- ~~Chemical functional groups unfold~~
