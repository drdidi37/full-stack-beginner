
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
const int16New = new Int16Array(6)
console.log(int16New.length)
// 创建成功后，会自动分配合适的缓冲区大小 2 * 6 = 12 个字节
console.log(int16New._1buffer.byteLength)
