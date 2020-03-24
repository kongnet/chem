# Sky chem

![chemLogo](https://github.com/kongnet/chem/raw/master/screenShot/chem_test.png)

A friend's kid is going to high school. I wrote a **Chemical Equation Balancing** code for him.

## Install

    npm i chem-eb

## Test

    npm test

## Use

```javascript
let balanceEq = require('chem-eb')
console.log(balanceEq('P+O2=P2O5'))
console.log(balanceEq('Fe2S3O12+NaOH=Na2SO4+FeO3H3')) // 会用到超定方程求解
```

## NOTICE:

_when (OH)2 pls O2H2 input_

## TODO:

- ~~over-determined equation~~
- Chemical functional groups unfold
