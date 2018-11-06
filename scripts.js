const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    _form.addEventListener('input', add);
    _items.addEventListener('click', finish);
    _items.addEventListener('click', deleteItem);
    _items.addEventListener('click', edit);
    _items.addEventListener('click', commit);
    _items.addEventListener('keyup', commit);

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    const spantxt = document.createTextNode(add());

    if (spantxt.length > 0) {
      const element = document.getElementsByClassName('items')[0];
      const line = document.createElement('li');
      line.setAttribute('class', 'item');
      element.appendChild(line);

      const input = document.createElement('input');
      input.setAttribute('class', 'item__checkbox');
      input.setAttribute('type', 'checkbox');
      line.appendChild(input);

    
      const span = document.createElement('span');
      span.setAttribute('class', 'item__text');
      span.appendChild(spantxt);
      line.appendChild(span);

      const button = document.createElement('button');
      const btntxt = document.createTextNode('Eyða');
      button.setAttribute('class', 'item__button');
      button.appendChild(btntxt);
      line.appendChild(button);
    }
    document.querySelector('.form__input').value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if (e.target.classList.contains('item__checkbox')) {
      e.target.parentNode.classList.toggle('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if (e.target.className === 'item__text'){
      const text = e.target.textContent;
      const newtxt = document.createElement('input');
      newtxt.focus();
      newtxt.classList.add('item__edit');
      newtxt.value = text;
      e.target.parentNode.replaceChild(newtxt, e.target);
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if ((e.target.className === 'item__edit')&&(e.key === 'Enter')) {
      const newtxt = e.target.value;
      const newspan = document.createElement('span');
      newspan.classList.add('item__text');
      newspan.textContent = newtxt;
      e.target.parentNode.replaceChild(newspan, e.target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const texti = document.querySelector('.form__input').value;
    const nospc = texti.trim();
    return nospc;
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if (e.target.classList.contains('item__button')){
      e.target.parentNode.remove();
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  }

  return {
    init: init
  }
})();
