let $ = require('meeko')

let chemSymbol = [
  'H',
  'He',
  'Li',
  'Be',
  'B',
  'C',
  'N',
  'O',
  'F',
  'Ne',
  'Na',
  'Mg',
  'Al',
  'Si',
  'P',
  'S',
  'Cl',
  'Ar',
  'K',
  'Ca',
  'Sc',
  'Ti',
  'V',
  'Cr',
  'Mn',
  'Fe',
  'Co',
  'Ni',
  'Cu',
  'Zn',
  'Ga',
  'Ge',
  'As',
  'Se',
  'Br',
  'Kr',
  'Rb',
  'Sr',
  'Y',
  'Zr',
  'Nb',
  'Mo',
  'Tc',
  'Ru',
  'Rh',
  'Pd',
  'Ag',
  'Cd',
  'In',
  'Sn',
  'Sb',
  'Te',
  'I',
  'Xe',
  'Cs',
  'Ba',
  'La',
  'Ce',
  'Pr',
  'Nd',
  'Pm',
  'Sm',
  'Eu',
  'Gd',
  'Tb',
  'Dy',
  'Ho',
  'Er',
  'Tm',
  'Yb',
  'Lu',
  'Hf',
  'Ta',
  'W',
  'Re',
  'Os',
  'Ir',
  'Pt',
  'Au',
  'Hg',
  'Tl',
  'Pb',
  'Bi',
  'Po',
  'At',
  'Rn',
  'Fr',
  'Ra',
  'Ac',
  'Th',
  'Pa',
  'U',
  'Np',
  'Pu',
  'Am',
  'Cm',
  'Bk',
  'Cf',
  'Es',
  'Fm',
  'Md',
  'No',
  'Lr',
  'Rf',
  'Db',
  'Sg',
  'Bh',
  'Hs',
  'Mt',
  'Ds',
  'Rg',
  'Cn',
  'Nh',
  'Fl',
  'Mc',
  'Lv',
  'Ts',
  'Og'
]

function chemEq2Matrix (chemStr) {
  let eqArr = chemStr.replace(/ +/g, '').split('=')
  let leftEqArr = eqArr[0].split('+')
  let rightEqArr = eqArr[1].split('+')
  let chemElmObj = {} // 有哪些元素
  eqArr = [...leftEqArr, ...rightEqArr]
  let len = chemSymbol.length
  let leftLen = leftEqArr.length
  let rightLen = rightEqArr.length
  let matrix = [[1, ...Array(leftLen + rightLen).fill(0)]]
  for (let i = 0; i < len; i++) {
    let chemElm = chemSymbol[i]
    let rowArr = []
    let idx = 0
    for (let n = 0; n < leftLen + rightLen; n++) {
      let isElm =
        eqArr[n].match(
          new RegExp(chemElm + '[0-9]*(?=[A-Z]+|[0-9]+|$)', 'g')
        ) || [] // 同一个式子里面有多个 同样的元素
      if (isElm.length > 0) {
        let sum = $.math.sum(isElm.map(x => +x.replace(chemElm, '') || 1))
        rowArr[idx] = (idx >= leftLen ? -1 : 1) * sum
        chemElmObj[chemElm] = 1
      } else {
        rowArr[idx] = 0
      }
      idx++
    }
    if (rowArr.some(x => x != 0)) {
      rowArr.push(0)
      matrix.push(rowArr)
    }
  }
  if (matrix[0].length <= matrix.length) {
    // 方程组大于未知数 移除有第一个主元的一行
    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i][0]) {
        matrix.remove(i, 1)
        break
      }
    }
  }
  return {
    matrix: matrix,
    leftEqArr: leftEqArr,
    rightEqArr: rightEqArr,
    leftLen: leftLen,
    rightLen: rightLen,
    chemElmObj: chemElmObj
  }
}

function balanceEq (chemStr) {
  try {
    // render formula
    let m = chemEq2Matrix(chemStr)
    m.leftEqArrColor = []
    m.rightEqArrColor = []
    let pos = m.matrix[0].length - 1
    for (let i = 0; i < 200; i++) {
      let newMatrix = m.matrix.copy()
      newMatrix[0][pos] = i + 1
      let rst = $.math.gaussian(newMatrix)
      if (
        rst.every(x => {
          return $.math.approximatelyEqual(x, x.round(0) | 0)
        })
      ) {
        let newEqArr = []
        for (let i = 0; i < m.leftLen + m.rightLen; i++) {
          if (i < m.leftLen) {
            m.leftEqArrColor[i] = $.c.y(rst[i].round(0)) + m.leftEqArr[i]
            m.leftEqArr[i] = rst[i].round(0) + m.leftEqArr[i]
          } else {
            m.rightEqArrColor[i - m.leftLen] =
              $.c.y(rst[i].round(0)) + m.rightEqArr[i - m.leftLen]
            m.rightEqArr[i - m.leftLen] =
              rst[i].round(0) + m.rightEqArr[i - m.leftLen]
          }
        }
        let outChemColorStr =
          m.leftEqArrColor.join(' + ') + ' = ' + m.rightEqArrColor.join(' + ')
        let outChemStr =
          m.leftEqArr.join(' + ') + ' = ' + m.rightEqArr.join(' + ')
        return {
          oriChem: chemStr,
          outChem: outChemStr,
          outChemCol: outChemColorStr
        }
      }
    }
    return { oriChem: chemStr, outChem: '', outChemCol: '' }
  } catch (e) {
    return { oriChem: chemStr, outChem: '', outChemCol: '' }
  }
}

module.exports = balanceEq
