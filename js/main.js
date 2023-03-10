"use strict";

const getData = async () => {
  const DB = await fetch(
    "https://gist.githubusercontent.com/Maksim-Methed/0f19797a537855ce881b3b1760734e1e/raw/6fb731c5038ddbd18a46bfe1c4afd9619abbde4e/goods.json"
  );
  const arr = await DB.json();
  return arr;
};

const overlay = document.querySelector(".overlay ");
overlay.classList.remove("active");

const createRow = (obj) => {
  const goodsTableTR = document.createElement("tr");
  const goodsTableTdId = document.createElement("td");
  const goodsTableTdTitle = document.createElement("td");
  const goodsTableTdTPrice = document.createElement("td");
  const goodsTableTdTDescription = document.createElement("td");
  const goodsTableTdCategory = document.createElement("td");
  const goodsTableTdDiscont = document.createElement("td");
  const goodsTableTdCount = document.createElement("td");
  const goodsTableTdUnits = document.createElement("td");
  const goodsTableTdImages = document.createElement("td");
  const goodsTableTdImagesSmall = document.createElement("img");
  const goodsTableTdImagesBig = document.createElement("img");

  goodsTableTdId.textContent = obj.id;
  goodsTableTdTitle.textContent = obj.title;
  goodsTableTdTPrice.textContent = obj.price;
  goodsTableTdTDescription.textContent = obj.description;
  goodsTableTdCategory.textContent = obj.category;
  goodsTableTdDiscont.textContent = obj.discont;
  goodsTableTdCount.textContent = obj.count;
  goodsTableTdUnits.textContent = obj.units;

  goodsTableTdImagesSmall.src = obj.images.small;
  goodsTableTdImagesBig.src = obj.images.big;

  goodsTableTdImages.append(goodsTableTdImagesSmall, goodsTableTdImagesBig);
  goodsTableTR.append(
    goodsTableTdId,
    goodsTableTdTitle,
    goodsTableTdTPrice,
    goodsTableTdTDescription,
    goodsTableTdCategory,
    goodsTableTdCount,
    goodsTableTdUnits,
    goodsTableTdImages
  );
  document.querySelector(".container").append(goodsTableTR);

  return goodsTableTR;
};

const renderGoods = (array) => {
  array.forEach((element) => {
    createRow(element);
  });
  return array;
};

getData().then((data) => renderGoods(data));
