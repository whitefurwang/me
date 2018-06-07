if (typeof String.prototype.commafy !== 'function') {
  String.prototype.commafy = function (symbol) {
    const sym = symbol || ','
    const numberPattern = /^(-?)(0*)(\d+)(.?\d*)/
    let numberStructor

    function addComma (str) {
      let newStr = str.split('')
      for (let i = str.length - 3; i > 0; i -= 3) {
        newStr.splice(i, 0, sym)
      }
      return newStr.join('')
    }

    if (this.length === 0) {
      console.error('Commafy: No value passed in.')
      return 'null'
    } else if (isNaN(this)) {
      console.error('Commafy: Not a number.')
      return 'NaN'
    } else if (this.toLowerCase().indexOf('e') > -1) {
      console.error('Commafy: Can not commafy exponential numbers.')
      return 'Can not commafy exponential numbers.'
    } else if (this) {
      numberStructor = this.match(numberPattern)
      return `${numberStructor[1]}${addComma(numberStructor[3])}${numberStructor[4]}`
    }
  }
}
