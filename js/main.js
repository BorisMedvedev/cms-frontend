'use strict';

const overlay = document.querySelector('.overlay ');
const tableBody = document.querySelector('.table__body');
const addGoods = document.querySelector('.panel__add-goods');
const modalClose = document.querySelector('.modal__close');
const cmsPrise = document.querySelector('.cms__total-price');
const modalPrise = document.querySelector('.modal__total-price');
let dataCopy = [];

const addContactData = contact => {
  dataCopy.push(contact);
  return dataCopy;
};

const getData = async () => {
  const DB = await fetch('goods.json');
  const arr = await DB.json();
  return arr;
};

const uniqueNumber = () => {
  let date = Date.now();
  if (date <= uniqueNumber.previous) {
    date = ++uniqueNumber.previous;
  } else {
    uniqueNumber.previous = date;
  }
  return date;
};

const createRow = obj => {
  const goodsTableTR = document.createElement('tr');
  goodsTableTR.classList.add('trrow');
  goodsTableTR.dataset.id = obj.id;
  goodsTableTR.innerHTML = `
  <td class="table__cell">${obj.id}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${uniqueNumber()}">
    <span class="table__cell-id">id: ${uniqueNumber()}</span>
    ${obj.name}
    </td>
    <td class="table__cell table__cell_left">${obj.category}</td>
    <td class="table__cell">${obj.units}</td>
    <td class="table__cell">${obj.count}</td>
    <td class="table__cell">$${obj.price}</td>
    <td class="table__cell">$${obj.count * obj.price}</td>
    <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
  `;

  return goodsTableTR;
};

const vendorId = document.querySelector('.vendor-code__id');
vendorId.textContent = uniqueNumber();

const renderGoods = (app, array) => {
  app.textContent = '';
  array.forEach(el => {
    app.append(createRow(el));
  });
};

addGoods.addEventListener('click', () => {
  overlay.classList.add('active');
});

document.addEventListener('click', e => {
  if (e.target === modalClose || e.target === overlay) {
    overlay.classList.remove('active');
  }
});

const calculateItemPrice = arr => {
  return arr.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);
};

tableBody.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.closest('.table__btn_del')) {
    if (confirm('Точно хотите удалить ?')) {
      const id = parseInt(e.target.closest('.trrow').dataset.id);
      const newData = dataCopy.filter(item => {
        return item.id !== id;
      });
      console.log('newData: ', newData);
      console.log('id: ', id);
      e.target.closest('.trrow').remove();
      dataCopy = newData;
      cmsPrise.textContent = `$${calculateItemPrice(dataCopy)}`;
    }
  }
});

const formControl = () => {
  const form = document.querySelector('.modal__form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactData(newContact);
    renderGoods(tableBody, dataCopy);
    form.reset();
    overlay.classList.remove('active');
    console.log('newContact: ', newContact);
  });
};
formControl();

getData().then(data => {
  dataCopy = data;

  renderGoods(tableBody, dataCopy);
  console.log('dataCopy: ', dataCopy);
  cmsPrise.textContent = `$${calculateItemPrice(dataCopy)}`;

  renderGoods(tableBody, dataCopy);
});
