## Array

### 查漏补缺

1. `Array.form`将**类数组**结构转换为数组实例

   类数组：任何可以迭代的结构，或者有一个`length`属性和**可索引**的结构

   *注：可迭代结构可以理解为有**Symbol.iterator**，利用这一特点，我们可以对实现对任意类使用`Array.from`*

   ```javascript
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
   // result:
   // [
   //   { index: 0, max: 5 },
   //   { index: 1, max: 5 },
   //   { index: 2, max: 5 },
   //   { index: 3, max: 5 },
   //   { index: 4, max: 5 }
   // ]
   ```

   `Array.form`可以接受第二个参数，用于直接增强新数组的值，而无需再、像`Array.from().map()`这样调用

   ```javascript
   console.log(Array.from([1, 2, 3], x => x ** 2))
   // 输出
   // [ 1, 4, 9 ]
   ```

   `Array.form`还可以接受第三个参数，用于指定第二个参数中`this`的值。

   *注：如果第二个参数为箭头函数，则第三个参数不起作用*

   ```javascript
   console.log(Array.from([1, 2, 3], function (x) { return x * this.ex }, { ex: 2 }))
   // 输出
   // [2, 4, 6]
   ```

   

2. `Array.of`将一组**参数**转换为数组实例，常用来替代ES6之前常用的`Array.prototype.slice.call`

3. 数组的迭代器方法：
   1. `keys()`：返回数组索引的迭代器
   2. `values()`：返回数组元素的迭代器
   3. `entries()`：返回索引/值对的迭代器

4. 对类数组对象，设置`Symbol.isConcatSpreadable`时，可以在使用`Array.concat()`时强制打平

```javascript

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

// [ 'red', 'greem', 'yellow', { '0': 'black', '1': 'white', length: 2 } ]
// [ 'red', 'greem', 'yellow', 'black', 'white' ]
```



### 数组方法总结

数组方法

1. 迭代器方法：`keys()`，`values()`，`entries()`
2. 复制和填充方法：`copy()`，`copyWithin()`
3. 转换方法：`toString()`，`toLocalString()`，`valueOf()`
4. 栈方法：`push()`，`pop()`
5. 队列方法：`unshift()`，`shift()`
6. 排序方法：`soft()`
7. 操作方法：`concat()`，`slice()`，`splice()`
8. 搜索和位置方法：`indexOf()`，`lastIndexOf()`，`includes()`，`find()`，`findIndex()`
9. 迭代方法：`every()`，`filter()`，`forEach()`，`map()`，`some()`
10. 归并方法：`reduce()`，`reduceRight()`



## 定型数组（TypedArray）

在学习定型数组之前，需要先了解的知识点：

### 诞生

人们希望能够开发一组`javascript API`，从而充分利用3D图形API和GPU加速，以便在`<canvas>`元素上渲染复杂的图形。这就有了`WebGL(Web Graphics Library)`的诞生。但其在早期的版本中， 由于`javascript`的数组与原生数组之间不匹配，出现了性能问题。为解决这一问题，`Mozilla`首先是实现了`CanvasFloatArray`，后逐步演变为`Float32Array`，也就是今天**定型数组**中第一个可用的“类型”。

### ArrayBuffer

1. `ArrayBuffer`是`javascript`在运行时可以访问的一块预分配内存，是所有定型数组及视图引用的基本单位；
2. 是一个普通的`javascript`构造函数，用于在内存中分配特定数量的**字节空间**，需要注意的是`ArrayBuffer`**一经创建就不能再调整大小**；
3. 创建`ArrayBuffer`后，可以通过`slice()`复制其全部或部分到一个新的实例中;
4. `ArrayBuffer`不提供读写操作，必须通过**视图**对其进行读写。

### DataView

1. 第一种允许读写`ArrayBuffer`的视图；

2. 专为文件I/O和网络I/O设计，支持对缓冲数据的高度控制，对缓冲内容没有任何预设，也不能迭代；

3. 对缓冲区内的数据类型没有预设，但提供的API强制开发者在进行读写操作时必须指定一种类型（ElementType）

   | ElementType | 字节 |        说明        |
   | :---------: | :--: | :----------------: |
   |    Int8     |  1   |   8位有符号整数    |
   |    Uint8    |  1   |   8位无符号整数    |
   |    Int16    |  2   |   16位有符号整数   |
   |   Uint16    |  2   |   16位无符号整数   |
   |    Int32    |  4   |   32位有符号整数   |
   |   Uint32    |  4   |   32位无符号整数   |
   |   Float32   |  4   | 32位IEEE-754浮点数 |
   |   Float64   |  8   | 64位IEEE-754浮点数 |

4. 创建时必须传入`ArrayBuffer`实例；

5. 读写时必须有足够的缓冲区，即假如申请了两个字节的缓冲区，就不能进行读写超过两个字节的操作；

6. 读写操作分为大段字节序与小端字节序，默认为大段字节序。

   ```javascript
   // 分配2个字节的内存并初始化：0000 0000 0000 0000
   const buf = new ArrayBuffer(2)
   const view = new DataView(buf)
   // 设置第一个字节：1000 0000 0000 0000
   view.setUint8(0, 0x80)
   // 设置第二个字节：1000 0000 0000 0001
   view.setUint8(1, 0x01)
   // 默认按照大端字节的读取方式：0x8001 => 32769
   console.log(view.getUint16(0))
   // 按照小端字节的读取方式：0x0180 => 384
   console.log(view.getUint16(0, true))
   ```

### 定型数组

1. 与`DataView`类似，是另一种`ArrayBuffer`视图；
2. 在创建时变声明了缓冲区的的类型；
3. 可以通过`new`、`<ElementType>.form()`、`<ElementType>.of()`的方法来创建；
4. 其行为与普通数组类似，但由于缓冲区大小不能改变的原因，一些能够改变数组长度的方法不适用于定型数组，如`concat()`，`slice()`，`splice()`等；
5. 提供了`set()`与`subarray()`实现定型数组的快速向外或向内复制数据。

```javascript

// 创建2个字节的缓冲区
const buf = new ArrayBuffer(2)
// 创建一个引用该缓冲区的Int16Array
const int16 = new Int16Array(buf)
// 该定型数组知道自己每个字节所需的字节数量，因此长度为1
console.log('int16 length', int16.length)

// 如果该缓冲区大小不足一个长度，则会报错
const int32 = new Int32Array(buf) // error
console.log('int32length', int32.length)

// 创建长度为6的Int16Array
const int16 = new Int16Array(6)
console.log(int16_1.length)
// 创建成功后，会自动分配合适的缓冲区大小 2 * 6 = 12 个字节
console.log(int16._1buffer.byteLength)

```



