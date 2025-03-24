export const l_126_queue_linked_list = () => {
  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.length = 0;
    }

    peek() {
      return this.first;
    }

    enqueue(value) {
      if (this.isEmpty()) {
        this.first = new Node(value);
        this.last = this.first;
      } else {
        this.last.next = new Node(value);
        this.last = this.last.next;
      }
      this.length++;
      return this;
    }

    dequeue() {
      if (!this.isEmpty()) {
        if (this.length === 1) {
          this.first = null;
          this.last = null;
        } else {
          this.first = this.first.next;
        }
      }
      this.length--;
      return this;
    }

    isEmpty() {
      return !Boolean(this.length);
    }
  }

  const myQueue = new Queue();
  myQueue
    .enqueue("Joy")
    .dequeue()
    .enqueue("Matt")
    .enqueue("Pavel")
    .dequeue()
    .dequeue()
    .dequeue()
  console.log(myQueue.peek())
}