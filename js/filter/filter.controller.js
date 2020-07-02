import * as filterView from "./filter.view.js";
import * as filterModel from "./filter.model.js";

// Событие при изменении формы
document.querySelector(filterView.DOMElemenst.mainForm).addEventListener("input", filtration);
// Событие при клике на кнопку 'Показать N обьектов'
document.querySelector(filterView.DOMElemenst.filterShowBtn).addEventListener("click", submitForm);
// Событие при клике на кнопку 'Сбросить фильтр'
document.querySelector(filterView.DOMElemenst.filterResetBtn).addEventListener("click", resetForm);

// Инициализация контроллера
export default async function () {
    console.log("Filter started");
    // Получаем все элементы из API
    try {
        let allItems;
        if (Object.keys(filterModel.data.filter).length != 0) {
            allItems = filterModel.data.savedObjects;
        } else {
            allItems = await sendRequest("http://jsproject.webcademy.ru/items");
        }
        // Отображения элементов полученых из запроса
        filterView.renderItems(allItems);
        // Отображения количества элементов полученых из запроса
        filterView.calcElements(allItems);

        checkFilter();
    } catch (err) {
        console.log(err);
    }
}

// Ф-я для получения запроса с сервера
async function sendRequest(url) {
    const response = await fetch(url);
    if (response.ok) {
        const allObjects = await response.json();
        return allObjects;
    } else {
        alert(`Warrning. Error: ${response.status}`);
    }
}

// Обработчик события input формы
async function filtration() {
    try {
        const formData = getFormData();
        // Создаеться строка запроса на основе введенных данных
        creatRequestString(formData);
        const newRequestString = await sendRequest(creatRequestString(formData));
        // Отображения количества элементов полученых из запроса
        filterView.calcElements(newRequestString);
        //  Обновление и сохранение фильтра
        filterModel.data.savedObjects = newRequestString;
        localStorage.setItem("Filtered Objects", JSON.stringify(newRequestString));
    } catch(err) {
        alert(err);
    }
}

// Ф-я получения даных из формы
function getFormData() {
    let formData = new FormData(document.querySelector(filterView.DOMElemenst.mainForm));

    const formValues = {
        complex: formData.get("complex"),
        rooms: saveCheckboxesValues(),
        sqmin: formData.get("sqmin"),
        sqmax: formData.get("sqmax"),
        pricemin: formData.get("pricemin"),
        pricemax: formData.get("pricemax"),
    };
    localStorage.setItem("Filter Values", JSON.stringify(formValues));
    // Обновляем обьект фильтра в моделе
    filterModel.data.filter = formValues;
    return formValues;
}

// Получаем значение checkbox и записываем их в массив
function saveCheckboxesValues() {
    const chekboxes = document.querySelectorAll('input[name="rooms"]');
    let chekboxesValuesArr = [];
    Array.from(chekboxes).forEach((item) => {
        if (item.checked) {
            chekboxesValuesArr.push(item.value);
        }
    });

    return chekboxesValuesArr;
}

// Ф-я создания строки запроса на основе данных из фильтра
function creatRequestString(obj) {
    let mainString = "http://jsproject.webcademy.ru/items?";
    for (let key in obj) {
        if (obj[key] !== "" && obj[key].length !== 0) {
            // Конкатенация новой строки
            mainString += "&" + key + "=" + obj[key];

            if (mainString == `http://jsproject.webcademy.ru/items?&complex=all`) {
                mainString = "http://jsproject.webcademy.ru/items?";
            }
        }
    }
    return mainString;
}

// Обработчик Submit формы
function submitForm(e) {
    e.preventDefault();
    const currentObjects = filterModel.data.savedObjects;
    if (currentObjects.length != 0) {
        console.log(true);
        filterView.renderItems(currentObjects);
    }
}

// Ф-я для проверки на заполненость фильтра
function checkFilter() {
    const currentFilterData = filterModel.data.filter; //Наш обьект(последняя фильтрация)
    const inputs = filterView.findInputs(); //Наши поля формы

    for (let key in currentFilterData) {
        inputs[key].value = currentFilterData[key];
        if (key == "rooms") {
            currentFilterData.rooms.forEach((item) => {
                inputs.rooms.forEach((input) => {
                    if (input.value == item) {
                        input.checked = true;
                    }
                });
            });
        }
    }
}

// Обработчик сброса фильтра
function resetForm(e) {
    localStorage.clear()
}
