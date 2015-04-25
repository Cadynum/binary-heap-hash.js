/*jslint node: true */
"use strict";


var Heap = function (hashf) {
    this.store = [];
    this.hash  = {};
    this.length = 0;
    this.hashf = hashf || String;
};

Heap.prototype.peek = function () {
    return this.store[0];
};

Heap.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    }
    var elem = this.store[0];
    delete this.hash[this.hashf(elem.obj)];
    this.length -= 1;

    var lastelem = this.store.pop();
    this.store[0] = lastelem;
    this.bubbleDown(1);
    return elem;
};


Heap.prototype.setElem = function (elem, pos) {
    this.store[pos-1] = elem;
    this.hash[this.hashf(elem.obj)] = pos;
};

Heap.prototype.add = function (obj, prio) {
    this.length += 1;
    this.store.push({prio: prio, obj: obj});
    this.bubbleUp(this.length);
};

Heap.prototype.changePriority = function (obj, newprio) {
    var pos = this.hash[this.hashf(obj)];
    if (pos === undefined) {
        return false;
    } else {
        var elem = this.store[pos-1];
        var oldprio = elem.prio;
        elem.prio = newprio;
        if (newprio > oldprio) {
            this.bubbleDown(pos);
        } else if (newprio < oldprio) {
            this.bubbleUp(pos);
        }
        return true;
    }
};


Heap.prototype.bubbleUp = function (pos) {
    var elem = this.store[pos-1];

    while (pos > 1) {
        var parent = Math.floor(pos/2);
        var parent_elem = this.store[parent-1];

        if (elem.prio < parent_elem.prio) {
            this.setElem(parent_elem, pos);
            pos = parent;
        } else {
            break;
        }
    }
    this.setElem(elem, pos);
};

Heap.prototype.bubbleDown = function (pos) {
    var elem = this.store[pos-1];

    while (true) {
        var left, right, posb, child;
        var posl = pos * 2;
        var posr = posl + 1;

        if (posl > this.length) {
            break;
        }

        left = this.store[posl-1];
        if (posr > this.length) {
            posb = posl;
            child = left;
        } else {
            right = this.store[posr-1];
            if (left.prio > right.prio) {
                posb = posr;
                child = right;
            } else {
                posb = posl;
                child = left;
            }
        }
        if (elem.prio > child.prio) {
            this.setElem(child, pos);
            pos = posb;
        } else {
            break;
        }
    }
    this.setElem(elem, pos);
};


module.exports = Heap;
