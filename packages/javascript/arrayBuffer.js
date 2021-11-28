// 分配2个字节的内存并初始化：0000 0000 0000 0000
const buf = new ArrayBuffer(2)
const view = new DataView(buf)
// 设置第一个字节：1000 0000 0000 0000
view.setUint8(0, 0x80)
// 设置第二个字节：1000 0000 0000 0001
view.setUint8(1, 0x01)
// 默认按照大端字节的读取方式：0x8001
console.log(view.getUint16(0))
// 按照小端字节的读取方式：0x0180
console.log(view.getUint16(0, true))
