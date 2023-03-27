import { PriorityQueue } from "./PriorityQueue";

const engine = {
  copy(el, n) {
    const elements = Array.from({ length: n }, () => el.cloneNode(true));
    el.after(...elements);
  },

  remove(el, n) {
    for (n; n > 0; n--) {
      if (!el.nextElementSibling) return;

      el.nextElementSibling.remove();
    }
  },

  removeChildren(el, n) {
    if (!el.parentNode) return;

    for (n; n > 0; n--) {
      if (!el.firstElementChild) return;

      el.firstElementChild.remove();
    }
  },

  switch(el, n) {
    const parent = el.parentNode;

    if (!parent) return;

    if (parent.childElementCount === 1) return;

    let newEl = el;

    for (n; n > 0; n--) {
      newEl = newEl.nextElementSibling;

      if (!newEl) {
        newEl = parent.firstElementChild;
      }
    }

    if (!newEl) {
      newEl = parent.firstElementChild;
    }

    let tmp = document.createElement("a");
    let tmp1 = document.createElement("a");
    newEl.before(tmp);
    el.before(tmp1);
    tmp.replaceWith(el);
    tmp1.replaceWith(newEl);
  },
};

const prioritys = {
  copy: 1,
  remove: 2,
  removeChildren: 3,
  switch: 4,
};

function solution(entryPoint) {
  // { priority: number, name: string, count: number, el }
  const queue = new PriorityQueue((a, b) => {
    return a.priority < b.priority;
  });

  for (let child of entryPoint.children) {
    const attr = child.getAttribute("x-make");

    if (!attr) continue;

    const [name, n] = attr.split(":");

    queue.addElement({ priority: prioritys[name], name, count: n, el: child });

    child.removeAttribute("x-make");
  }

  while (queue.length) {
    const { count, el, name } = queue.getElement();

    engine[name](el, count);
  }

  for (let child of entryPoint.children) {
    solution(child);
  }
}
