const isNumber = (n) => { let m = parseFloat(n) + ''; return /^-?[\d.]+(?:e-?\d+)?$/.test(m); };
let mochData = {"filters": [
  {
    "filterName": "Бренд",
    "filterValue": [
      "Ловенбрау",
      "Сибирская Корона",
      "Бад",
      "Хугарден",
      "Клинское",
      "Толстяк",
      "Жигулевское Светлое",
      "Т",
      "Стелла Артуа",
      "Черниговское",
      "Эфес",
      "Бавария Малт",
      "Симбирское",
      "Козел",
      "Реддc",
      "387",
      "Волжская Вольница",
      "Мальц Вайзен",
      "Белый Медведь",
      "Жигулевское бочковое",
      "Старый Мельник",
      "Баварский Закон",
      "Эсса",
      "Амстердам",
      "Тирольский волк",
      "Душистый Хмель",
      "КрафтИздат",
      "Золотая Бочка",
      "Бавария",
      "Леффе",
      "Ля Вирген",
      "Три Шурупа",
      "Голд Майн Бир",
      "Моя Калуга",
      "Гролш",
      "Хмельная Столица",
      "Амбервайс",
      "Францисканер",
      "Бекс",
      "Брама",
      "Корона",
      "Пикур",
      "Волжанин",
      "Шпатен",
      "Бремен"
    ],
    "filterOrder": 1
  },
  {
    "filterName": "Классификация продукции",
    "filterValue": [
      "Алкогольная",
      "Безалкогольная"
    ],
    "filterOrder": 4
  },
  {
    "filterName": "Крепость",
    "filterValue": [
      "5.2 %",
      "4.7 %",
      "5.4 %",
      "3.5 %",
      "4.2 %",
      "5 %",
      "0.5 %",
      "4.9 %",
      "5.3 %",
      "8.3 %",
      "4.1 %",
      "4.4 %",
      "7.7 %",
      "0.0 %",
      "4.8 %",
      "4.5 %",
      "4 %",
      "6.8 %",
      "4.3 %",
      "6.5 %",
      "7 %",
      "8 %",
      "4.6 %",
      "3.7 %",
      "6.6 %",
      "7.2 %",
      "%",
      "5.5 %"
    ],
    "filterOrder": 6
  },
  {
    "filterName": "Объем",
    "filterValue": [
      "0.5 л.",
      "0.47 л.",
      "0.45 л.",
      "1.35 л.",
      "1.4 л.",
      "30 л.",
      "0.33 л.",
      "15 л.",
      "1.32 л.",
      "1 л.",
      "20 л.",
      "0.75 л.",
      "0.355 л.",
      "50 л."
    ],
    "filterOrder": 3
  },
  {
    "filterName": "Стиль пива",
    "filterValue": [
      "Пшеничное Нефильтрованное",
      "Темный лагер",
      "Светлый Лагер",
      "Лагер",
      "Нефильтрованное",
      "Светлый лагер",
      "Фруктовое",
      "Пшеничное нефильтрованное",
      "IPA  ",
      "Пшеничный Эль с сухим охмелением",
      "Эль",
      "Безалкогольный Лагер",
      "Пшеничный Эль",
      "Стаут",
      "Пшеничное нефильтрованное "
    ],
    "filterOrder": 7
  },
  {
    "filterName": "Страна производитель",
    "filterValue": [
      "Германия",
      "Россия",
      "Бельгия",
      "Испания",
      "Мексика",
      "Бельгия (розлив Германия)"
    ],
    "filterOrder": 5
  },
  {
    "filterName": "Упаковка",
    "filterValue": [
      "Банка",
      "Бутылка",
      "Пэт",
      "Кега",
      "Пэт 30"
    ],
    "filterOrder": 2
  }
]};
this.filters = this.format.mergeFiltersAndSelected(mochData);