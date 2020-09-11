// Общие переменные
const form = document.querySelector(".curve__form"),
  input = document.querySelector(".curve__input"),
  inputs = form.querySelectorAll(".curve__input"),
  dots = document.querySelectorAll(".dot"),
  curve = document.querySelector(".curve-path"),
  ruler = document.querySelector(".ruler");

let dragDot,
  d = {
    x1: `${inputs[0].value}`,
    y1: `${inputs[1].value}`,
    x2: `${inputs[2].value}`,
    y2: `${inputs[3].value}`,
    x3: `${inputs[4].value}`,
    y3: `${inputs[5].value}`,
    x4: `${inputs[6].value}`,
    y4: `${inputs[7].value}`,
  };

//Функция задаёт значения точек через инпуты
const setCurveDots = (event) => {
  event.preventDefault();

  curve.setAttribute(
    "d",
    `M${inputs[0].value} ${inputs[1].value} C ${inputs[2].value} ${inputs[3].value} ${inputs[4].value} ${inputs[5].value} ${inputs[6].value} ${inputs[7].value}`
  );
  ruler.setAttribute(
    "d",
    `M${inputs[0].value} ${inputs[1].value} L ${inputs[2].value} ${inputs[3].value} ${inputs[4].value} ${inputs[5].value} ${inputs[6].value} ${inputs[7].value}`
  );
  d = {
    x1: `${inputs[0].value}`,
    y1: `${inputs[1].value}`,
    x2: `${inputs[2].value}`,
    y2: `${inputs[3].value}`,
    x3: `${inputs[4].value}`,
    y3: `${inputs[5].value}`,
    x4: `${inputs[6].value}`,
    y4: `${inputs[7].value}`,
  };
  dots[0].setAttribute("cx", `${inputs[0].value}`);
  dots[0].setAttribute("cy", `${inputs[1].value}`);

  dots[1].setAttribute("cx", `${inputs[2].value}`);
  dots[1].setAttribute("cy", `${inputs[3].value}`);

  dots[2].setAttribute("cx", `${inputs[4].value}`);
  dots[2].setAttribute("cy", `${inputs[5].value}`);

  dots[3].setAttribute("cx", `${inputs[6].value}`);
  dots[3].setAttribute("cy", `${inputs[7].value}`);
};

//Функция задаёт координаты для точек, в зависимости от нажатия мыши
const mouseDown = (event) => {
  let dot = event.target;

  if (dot.classList.contains("dot")) {
    dragDot = dot;
    dragDotX = dot.getAttribute("cx");
    dragDotY = dot.getAttribute("cy");

    dragDot.clientX = event.clientX;
    dragDot.clientY = event.clientY;

    setEventListeners();
  }
};

//Функция активирует слушатели движения мыши
const setEventListeners = () => {
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
};

//Функция задаёт координаты для точек, в зависимости от движения мыши
const mouseMove = (event) => {
  dragDot.setAttribute("cx", event.clientX - (dragDot.clientX - dragDotX));
  dragDot.setAttribute("cy", event.clientY - (dragDot.clientY - dragDotY));
  switch (dragDot) {
    case dots[0]:
      d.x1 = dragDot.getAttribute("cx");
      d.y1 = dragDot.getAttribute("cy");
      break;
    case dots[1]:
      d.x2 = dragDot.getAttribute("cx");
      d.y2 = dragDot.getAttribute("cy");
      break;
    case dots[2]:
      d.x3 = dragDot.getAttribute("cx");
      d.y3 = dragDot.getAttribute("cy");
      break;
    case dots[3]:
      d.x4 = dragDot.getAttribute("cx");
      d.y4 = dragDot.getAttribute("cy");
      break;
  }
  curve.setAttribute(
    "d",
    `M${d.x1} ${d.y1} C ${d.x2} ${d.y2} ${d.x3} ${d.y3} ${d.x4} ${d.y4}`
  );

  ruler.setAttribute(
    "d",
    `M${d.x1} ${d.y1} L ${d.x2} ${d.y2} ${d.x3} ${d.y3} ${d.x4} ${d.y4}`
  );
};

//Функция удаляет слушатели при отжатии мыши
const mouseUp = () => {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
};

//Слушатели
form.addEventListener("submit", setCurveDots);
document.addEventListener("mousedown", mouseDown);

//Сброс формы
form.reset();
