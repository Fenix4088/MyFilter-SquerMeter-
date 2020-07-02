export const DOMElemenst = {
    mainForm: "#mainForm",
    elementsHolder: "#app",
    filterShowBtn: "#filterShowBtn",
    filterResetBtn: "#filterResetBtn",
    // Элементы формы
    complexSelect: "#complexSelect",
    roomsCheckboxes: "input[name='rooms']",
    sqminInput: "input[name='sqmin']",
    sqmaxInput: "input[name='sqmax']",
    priceminInput: "input[name='pricemin']",
    pricemaxInput: "input[name='pricemax']",
};

// Ф-я рендеринга элементов
export function renderItems(arr) {
    document.querySelector(DOMElemenst.elementsHolder).innerHTML = "";
    arr.forEach((item) => {
        // console.log(item);
        let itemHTML = `
        <article class="col-md-4" id='${item.id}'>
        <!-- card -->
        <a href="object.html" class="card">
            <div class="card__header">
                <div class="card__title">
                    ${item.complex_name}
                </div>
                <div class="card__like">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <div class="card__img">
                <img src="${item.image}" alt="План квартиры" />
            </div>
            <div class="card__desc">
                <div class="card__price">
                    <div class="card__price-total">
                        ${item.price_total}
                    </div>
                    <div class="card__price-per-meter">
                    ${item.price_sq_m} ₽/м2
                    </div>
                </div>

                <div class="card__params params">
                    <div class="params__item">
                        <div class="params__definition">
                            Комнат
                        </div>
                        <div class="params__value">${item.rooms}</div>
                    </div>
                    <div class="params__item">
                        <div class="params__definition">
                            Площадь
                        </div>
                        <div class="params__value">${item.square}</div>
                    </div>
                </div>
                <!-- //card__params params -->
            </div>
            <div class="card__footer">
                <div class="card__art">${item.scu}</div>
                <div class="card__floor">Этаж ${item.floor} из ${item.floors_total}</div>
            </div>
        </a>
    </article>`;

        document.querySelector(DOMElemenst.elementsHolder).insertAdjacentHTML("beforeend", itemHTML);
    });
}
// Ф-я расчета количества отфильтрованных элементов
export function calcElements(arr) {
    document.querySelector(`${DOMElemenst.filterShowBtn} > span`).innerText = arr.length;
}

// Поиск полей формы
export function findInputs() {
    return {
        complex: document.querySelector(DOMElemenst.complexSelect),
        rooms: document.querySelectorAll(DOMElemenst.roomsCheckboxes),
        pricemax: document.querySelector(DOMElemenst.pricemaxInput),
        pricemin: document.querySelector(DOMElemenst.priceminInput),
        sqmax: document.querySelector(DOMElemenst.sqmaxInput),
        sqmin: document.querySelector(DOMElemenst.sqminInput),
    };
}
