
var Heap = require("./binary-heap-hash.js");

var heap = new Heap();
heap.add("hejdå", 4);
heap.add("hej", 9);
heap.add("sveks", 10);

tst = [123, 4, 2, 4 ,5, 123, 4, 6, 7, 8, 0, 45];

for(var num of tst) {
    heap.add(String(num), num);
}

heap.changePriority("hej", 124);

while (heap.length > 0) {
    console.log(heap.pop());
}
