export const l_100_my_linked_list = () => {
  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  class LinkedList {
    constructor(value) {
      this.length = 1;
      this.head = new Node(value);
      this.tail = this.head;
    }

    prepend(value) {
      this.head = new Node(value, this.head);
      this.length++;
      return this;
    }

    append(value) {
      this.tail.next = new Node(value);
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
        if (pointer + 1 === index) {
          currNode.next = new Node(value, currNode.next);
          this.length++;
          return this;
        } else {
          currNode = currNode.next
        }
        pointer++;
      }
    }

    remove(index) {
      if (index === 0) {
        this.head = this.head.next ?? null;
      }

      let currNode = this.head;
      let pointer = 0;
      while (currNode) {
        if (pointer + 1 === index) {
          currNode.next = currNode.next?.next ?? null;
          this.length--;
        }
        currNode = currNode.next;
        pointer++;
      }
      return this;
    }

    reverse() {
      let prev = null;
      let next = this.head.next;

      while (this.head) {
        this.head.next = prev;
        prev = this.head;
        if(!next) break;
        this.head = next;
        next = this.head.next;
      }
      return this;
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

  }

  const list = new LinkedList(0)
    // .prepend(0)
    .append(1)
    .append(2)
    .append(3)
    .append(4)
    // .insert(2123, 9)
    // .remove(1)
    .reverse()
    .printList();
}
