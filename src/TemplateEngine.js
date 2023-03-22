function copy(el, n) {
  const elements = Array.from({ length: n }, () => el.cloneNode(true));
  el.after(...elements);
}

function remove(el, n) {
  for (n; n > 0; n--) {
    if (!el.nextElementSibling) return;

    el.nextElementSibling.remove();
  }
}

function removeChildren(el, n) {
  if (!el.parentNode) return;

  for (n; n > 0; n--) {
    if (!el.firstElementChild) return;

    el.firstElementChild.remove();
  }
}

function switchEl(el, n) {
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
}

function solution(entryPoint) {
  const copyQueue = [];
  const removeQueue = [];
  const removeChildrenQueue = [];
  const swithQueue = [];

  const queues = {
    copy: copyQueue,
    remove: removeQueue,
    removeChildren: removeChildrenQueue,
    switch: swithQueue,
  };

  for (let child of entryPoint.children) {
    const atrr = child.getAttribute("x-make");

    if (!atrr) continue;

    const [name, n] = atrr.split(":");

    queues[name].push([child, n]);

    child.removeAttribute("x-make");
  }

  while (copyQueue.length) {
    const arg = copyQueue.shift();

    copy(...arg);
  }
  while (removeQueue.length) {
    const arg = removeQueue.shift();

    remove(...arg);
  }
  while (removeChildrenQueue.length) {
    const arg = removeChildrenQueue.shift();

    removeChildren(...arg);
  }
  while (swithQueue.length) {
    const arg = swithQueue.shift();

    switchEl(...arg);
  }

  for (let child of entryPoint.children) {
    solution(child);
  }
}
