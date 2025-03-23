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

  class Node {
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

    printList() {
      let currHead = this.head
      const valuesList = []
      while (currHead) {
        valuesList.push(currHead.value)
        currHead = currHead.next;
      }
      console.log(valuesList);
      return this
    }

    insert(index, value) {
      if (index === 0) {
        return this.prepend(value);
      }

      if (index >= this.length) {
        return this.append(value);
      }

      let currHead = this.head;
      let pointer = 0;
      while (currHead) {
        if (pointer + 1 === index) {
          currHead.next = new Node(value, currHead.next);
          return this
        } else {
          currHead = currHead.next;
        }
        pointer++
      }
    }

    remove(index) {
      if (index === 0) {
        currHead.next = currHead.next?.next ?? null
        // return this.prepend(value);
      }

      if (index >= this.length) {
        return this.append(value);
      }

      let currHead = this.head;
      let pointer = 0;
      while (currHead) {
        if (pointer + 1 === index) {
          console.log(currHead.value);
          currHead.next = currHead.next?.next ?? null
        } else {
          currHead = currHead.next;
        }
        pointer++
      }
      return this
    }
  }

  new LinkedList(5)
    .append(16)
    .prepend(10)
    .insert(99, 99)
    .insert(0, 0)
    .insert(1, 1)
    .remove(2)
    .printList()

}