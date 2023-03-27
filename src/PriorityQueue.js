export class PriorityQueue {
  #queue;
  /**
   * Функция которая проверяет, что a имеет больший приоритет чем b
   * @type { (a, b) => boolean }
   */
  #comparator;

  constructor(comparator) {
    this.#queue = [];
    this.#comparator = comparator;
  }

  getElement() {
    this.#swap(0, this.#queue.length - 1);

    const element = this.#queue.pop();

    this.#heapifyDown(0);

    return element;
  }

  addElement(element) {
    this.#queue.push(element);

    this.#heapifyUp(this.#queue.length - 1);
  }

  get length() {
    return this.#queue.length;
  }

  #heapifyUp(idx) {
    if (idx === 0) return;

    const item = this.#queue.at(idx);
    const parentIdx = this.#getParentIdx(idx);
    const parent = this.#queue.at(parentIdx);

    if (this.#comparator(item, parent)) {
      this.#swap(idx, parentIdx);
      this.#heapifyUp(parentIdx);
      return;
    }
  }

  #heapifyDown(idx) {
    const leftChildIdx = this.#getLeftChildIdx(idx);
    const leftChild = this.#queue.at(leftChildIdx);
    if (!leftChild) return;

    const parent = this.#queue.at(idx);
    let childIdx;

    const rightChildIdx = this.#getRightChildIdx(idx);
    const rightChild = this.#queue.at(rightChildIdx);

    if (!rightChild) {
      childIdx = leftChildIdx;
    } else if (this.#comparator(leftChild, rightChild)) {
      childIdx = leftChildIdx;
    } else {
      childIdx = rightChildIdx;
    }

    if (this.#comparator(this.#queue.at(childIdx), parent)) {
      this.#swap(childIdx, idx);
      this.#heapifyDown(childIdx);
    }
  }

  #getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }

  #getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  #getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  #swap(a, b) {
    const tmp = this.#queue.at(b);
    this.#queue[b] = this.#queue[a];
    this.#queue[a] = tmp;
  }
}
