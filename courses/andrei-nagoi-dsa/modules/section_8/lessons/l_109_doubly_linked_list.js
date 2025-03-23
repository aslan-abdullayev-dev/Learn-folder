export const l_109_doubly_linked_list = () => {
  class Node {
    constructor({value, next, prev}) {
      this.value = value;
      this.next = next ?? null;
      this.prev = prev ?? null;
    }
  }

  class DoublyLinkedList {
    constructor(value) {
      this.length = 1;
      this.head = new Node({value});
      this.tail = this.head;
    }

    prepend(value) {
      const newHead = new Node({value, next: this.head});
      this.head.prev = newHead;
      this.head = newHead;
      this.length++;
      return this
    }

    append(value) {
      this.tail.next = new Node({value, prev: this.tail});
      this.tail = this.tail.next;
      this.length++;
      return this;
    }


    insert(index, value) {
      if (index === 0) return this.prepend(value);
      if (index >= this.length) return this.append(value);

      let currNode = this.head;
      let pointer = 0;
      while (currNode) {
        if (pointer === index) {
          const newNode = new Node({value, prev: currNode.prev, next: currNode})
          currNode.prev.next = newNode;
          currNode = newNode;
          currNode.prev = newNode;
          this.length++;
          return this;
        } else {
          currNode = currNode.next;
        }
        pointer++
      }
      return this
    }


    remove(index) {
      if (index === 0) {
        this.head = this.head.next ?? null;
        this.head.prev = null;
        this.length--;
        return this;
      }

      if (index >= this.length - 1) {
        this.tail = this.tail.prev ?? null;
        this.tail.next = null;
        this.length--;
        return this;
      }

      let headHolder = this.head;
      let pointer = 0;
      while (headHolder) {
        if (pointer + 1 === index) {
          headHolder.next = headHolder.next?.next ?? null;
          this.length--;
        }
        headHolder = headHolder.next
        pointer++;
      }
      return this
    }

    printList() {
      const valuesList = [];
      let currNode = this.head;

      while (currNode) {
        valuesList.push(currNode.value);
        currNode = currNode.next;
      }
      console.log(valuesList);
      return this;
    }

    printListInReverse() {
      const valuesList = [];
      let currNode = this.tail;
      while (currNode) {
        valuesList.push(currNode.value);
        currNode = currNode.prev;
      }
      console.log(valuesList);
      return this;

    }
  }

  const list = new DoublyLinkedList(1)
    .prepend(0)
    .append(2)
    .append(16)
    .insert(656, 9)
    .remove(0)
    .printList()
    .printListInReverse();
}