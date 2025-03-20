export const l_100_first_linked_list = () => {

  /*
    10 --> 5 --> 16
    let myLinkedList = {
      head: {
        value: 10,
        next: {
          value: 5,
          next: {
            value: 16,
            next: null
          }
        }
      }
    };
  */

  class Node {``
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  class LinkedList {
    constructor(value) {
      this.head = new Node(value);
      this.tail = this.head;
      this.length = 1;
    }

    append(value) {
      this.tail.next = new Node(value);
      this.tail = this.tail.next;
      this.length++;
      return this;
    }

    prepend(value) {
      this.head = new Node(value, this.head)
      this.length++;
      return this;
    }
  }

  const myLinkedList = new LinkedList(5)
    .append(16)
    .prepend(10)

  let head = myLinkedList.head

  while (head) {
    console.log(head.value)
    head = head.next;
  }
}