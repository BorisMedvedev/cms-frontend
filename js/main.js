"use strict";

const overlay = document.querySelector(".overlay ");
const tableBody = document.querySelector(".table__body");

const getData = async () => {
  const DB = await fetch(
    "https://gist.githubusercontent.com/Maksim-Methed/0f19797a537855ce881b3b1760734e1e/raw/6fb731c5038ddbd18a46bfe1c4afd9619abbde4e/goods.json"
  );
  const arr = await DB.json();
  console.log("arr: ", arr);
  return arr;
};

overlay.classList.remove("active");

const createRow = (obj) => {
  const goodsTableTR = document.createElement("tr");
  goodsTableTR.innerHTML = `
  <td class="table__cell">${obj.id}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${
      obj.id
    }">
    <span class="table__cell-id">id: ${obj.id}</span>
    ${obj.title}
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
  app.textContent = "";
  array.forEach((el) => {
    app.append(createRow(el));
  });
};

getData().then((data) => renderGoods(tableBody, data));
