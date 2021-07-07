const $ = require('meeko')
const balanceEq = require('./chem.js')

const assert = require('assert')
/*

*/
const chemTestArr = [
  'HCOOH + AgNO3 + NH3 = Ag + NH4NO3 + CO2',
  'HCOOH + 2AgNO3 + 2NH3 = 2Ag + 2NH4NO3 + CO2',
  '出错了',
  'P4O10 + H2O = H3PO4',
  'P4O10 + 6H2O = 4H3PO4',
  '出错了',
  'Ji + O2 = Ji2O',
  '',
  '元素不存在',
  'Mg+HNO3=MgN2O6+NH4NO3+H2O',
  '4Mg + 10HNO3=4MgN2O6 + NH4NO3 + 3H2O',
  '出错了',
  'FeS+KMnO4+H2SO4=K2SO4+MnSO4+Fe2S3O12+H2O',
  '10FeS + 18KMnO4 + 32H2SO4=9K2SO4 + 18MnSO4 + 5Fe2S3O12 + 32H2O',
  '出错了',
  'Fe+H2O=Fe3O4+H2',
  '3Fe + 4H2O = Fe3O4 + 4H2',
  '出错了',
  'P+O2=P2O5',
  '4P + 5O2 = 2P2O5',
  '出错了',
  'NH4NO3=N2+O2+H2O',
  '2NH4NO3=2N2+O2+4H2O',
  '',
  'Fe+HNO3+H2O=FeO3H3+NH4NO3',
  '8Fe + 6HNO3 + 15H2O=8FeO3H3 + 3NH4NO3',
  '',
  'NiS + HCl + HNO3 = NiCl2 + NO + S + H2O ',
  '3NiS+6HCl+2HNO3=3NiCl2+2NO+3S+4H2O',
  '',
  'Al+NaNO3+H2O=AlO3H3+N2+NaAlO2',
  '10Al + 6NaNO3 + 6H2O=4AlO3H3 + 3N2 + 6NaAlO2',
  '',
  'KMnO4+FeSO4+H2SO4=Fe2S3O12+MnSO4+K2SO4+H2O',
  '2KMnO4 + 10FeSO4 + 8H2SO4=5Fe2S3O12 + 2MnSO4 + K2SO4 + 8H2O',
  '',
  'CS2+KMnO4+H2SO4=K2SO4+MnSO4+CO2+H2SO',
  '9CS2 + 12KMnO4 + 14H2SO4 = 6K2SO4 + 12MnSO4 + 9CO2 + 14H2SO',
  '',
  'KMnO4 + HCl = KCl + MnCl2 + H2O + Cl2',
  '2KMnO4 + 16HCl = 2KCl + 2MnCl2 + 8H2O + 5Cl2',
  '',
  'K4FeC6N6 + KMnO4 + H2SO4 = KHSO4 + Fe2S3O12 + MnSO4 + HNO3 + CO2 + H2O',
  '10K4FeC6N6 + 122KMnO4 + 299H2SO4=162KHSO4 + 5Fe2S3O12 + 122MnSO4 + 60HNO3 + 60CO2 + 188H2O',
  '',
  'ZnCl2 + H2O = ZnO + HCl',
  'ZnCl2 + H2O = ZnO + 2HCl',
  '',
  'C3H5N3O9 = CO2 + O2 + N2 + H2O',
  '4C3H5N3O9 = 12CO2 + O2 + 6N2 + 10H2O',
  '',
  'C38H76N2O2 + NaNO2 = Na2O + CO2 + H2O + N2',
  '3C38H76N2O2 + 224NaNO2 = 112Na2O + 114CO2 + 114H2O + 115N2',
  '',
  'C38H76N2O2 + NaNO2 = NaO + C18H36O2 + N2',
  '9C38H76N2O2 + 20NaNO2 = 20NaO + 19C18H36O2 + 19N2',
  '',
  'FeS2+O2=SO2+Fe2O3',
  '4FeS2+11O2=8SO2+2Fe2O3',
  '',
  'Fe2S3O12+NaOH=Na2SO4+FeO3H3',
  'Fe2S3O12 + 6NaOH = 3Na2SO4 + 2FeO3H3',
  '',
  'A',
  '',
  '',
  'A=A',
  '',
  ''
]

for (let i = 0; i < chemTestArr.length; i += 3) {
  const inStr = chemTestArr[i + 0]
  const outStr = chemTestArr[i + 1]
  const chem = balanceEq(inStr)
  console.log(chem)
  describe(`${inStr}`, function () {
    it(`${inStr} => ${chem.outChemCol || chemTestArr[i + 2]}`, function () {
      assert.strictEqual(
        chem.outChem.replaceAll(' ', ''),
        outStr.replaceAll(' ', ''),
        chemTestArr[i + 2]
      )
    })
  })
}
