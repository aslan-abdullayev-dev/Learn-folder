export const l_122_stack_linked_list = () => {
  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  class Stack {
    constructor() {
      this.top = null;
      this.bottom = null;
      this.length = 0;
    }

    peek() {
      return this.top;
    }

    push(value) {
      if (this.isEmpty()) {
        this.top = new Node(value);
        this.bottom = this.top;
      } else {
        this.top = new Node(value, this.top);
      }
      this.length++;
      return this;
    }

    pop() {
      this.top = this.top?.next ?? null;
      this.length--;
      return this;
    }

    isEmpty() {
      return !Boolean(this.length);
    }

    printList() {
      let currHead = this.top;
      const valuesList = [];
      while (currHead) {
        valuesList.push(currHead.value);
        currHead = currHead.next;
      }
      console.log(valuesList);
    }
  }

  const myStack = new Stack();
  myStack.push("discord")
  myStack.push("udemy")
  console.log(myStack.peek());
  myStack.pop()
  myStack.printList()
}