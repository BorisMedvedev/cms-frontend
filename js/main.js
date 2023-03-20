'use strict';

const overlay = document.querySelector('.overlay ');
const tableBody = document.querySelector('.table__body');
const addGoods = document.querySelector('.panel__add-goods');
const modalClose = document.querySelector('.modal__close');
const cmsPrise = document.querySelector('.cms__total-price');
const modalPrise = document.querySelector('.modal__total-price');
const vendorId = document.querySelector('.vendor-code__id');
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
  <td class="table__cell">1</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
    <span class="table__cell-id">id: ${obj.id}</span>
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

const renderGoods = (app, array) => {
  app.textContent = '';
  array.forEach(el => {
    app.append(createRow(el));
  });
};

addGoods.addEventListener('click', () => {
  overlay.classList.add('active');
  vendorId.textContent = uniqueNumber();
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
  if (e.target.closest('.table__btn_del')) {
    if (confirm('Точно хотите удалить ?')) {
      const id = parseInt(e.target.closest('.trrow').dataset.id);
      const newData = dataCopy.filter(item => {
        return item.id !== id;
      });

      console.log('id: ', id);
      e.target.closest('.trrow').remove();
      dataCopy = newData;
      console.log('dataCopy: ', dataCopy);
    }
  }
  cmsPrise.textContent = `$ ${calculateItemPrice(dataCopy)}`;
});

const formControl = () => {
  const form = document.querySelector('.modal__form');

  form.addEventListener('change', () => {
    const formCount = document.getElementById('count').value;
    const formpPice = document.getElementById('price').value;
    modalPrise.textContent = `$ ${formCount * formpPice}`;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    form.reset();
    modalPrise.textContent = `$ 0`;
    overlay.classList.remove('active');
    addContactData(newContact);
    renderGoods(tableBody, dataCopy);
    console.log('newContact: ', newContact);
  });
};

formControl();

getData().then(data => {
  dataCopy = data;
  renderGoods(tableBody, dataCopy);
  cmsPrise.textContent = `$ ${calculateItemPrice(dataCopy)}`;

  console.log('dataCopy: ', dataCopy);
});
