class Emitter {
  constructor (max) {
    this.max = max
    this.index = 0
  }

  * [Symbol.iterator] () {
    while (this.index < this.max) {
      yield { index: this.index++, max: this.max }
    }
  }
}

console.log(Array.from(new Emitter(5)))

console.log(Array.from([1, 2, 3], x => x ** 2))

function transformArgument () {
  console.log(Array.from(arguments))
}

transformArgument(1, 2, 3, 4)

const colors = ['red', 'greem', 'yellow']
const arrayLike = {
  0: 'black',
  1: 'white',
  length: 2
}
const arrayLike2 = {
  0: 'black',
  1: 'white',
  length: 2,
  [Symbol.isConcatSpreadable]: true
}

console.log(colors.concat(arrayLike))
console.log(colors.concat(arrayLike2))
