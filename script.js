const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const regulator = document.getElementById('regulator');
const confirmScanleButton = document.querySelector('.tool.scale');

const clearCanvasButton = document.getElementById('clear-canvas');
const drawSquareButton = document.getElementById('draw-square');
const drawRectangleButton = document.getElementById('draw-rectangle');
const drawCircleButton = document.getElementById('draw-circle');
const drawOvalButton = document.getElementById('draw-oval');

const fillWithRedButton = document.querySelector('.colors__item.red');
const fillWithGreenButton = document.querySelector('.colors__item.green');
const fillWithBlueButton = document.querySelector('.colors__item.blue');

let lastDrawnShapeData = null;

confirmScanleButton.onclick = (event) => {
  const value = event.target.parentElement.querySelector('.field').value;
  const scale = parseFloat(value) / 100;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(scale, scale);
}

clearCanvasButton.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawSquareButton.onclick = (event) => {
  event.preventDefault();

  const data = getDataFromForm(document.getElementById('square-form'));

  if (!data.x || !data.y || !data.size) {
    return;
  }

  lastDrawnShapeData = {
    type: 'square',
    data,
  };

  ctx.strokeRect(data.x, data.y, data.size, data.size);
}

drawRectangleButton.onclick = (event) => {
  event.preventDefault();

  const data = getDataFromForm(document.getElementById('rectangle-form'));

  if (!data.x || !data.y || !data.width || !data.height) {
    return;
  }

  lastDrawnShapeData = {
    type: 'rectangle',
    data,
  };

  ctx.strokeRect(data.x, data.y, data.width, data.height);
}

drawCircleButton.onclick = (event) => {
  event.preventDefault();

  const data = getDataFromForm(document.getElementById('circle-form'));

  if (!data.x || !data.y || !data.radius) {
    return;
  }

  lastDrawnShapeData = {
    type: 'circle',
    data,
  };

  ctx.beginPath();
  ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2, true);
  ctx.stroke();
}

drawOvalButton.onclick = (event) => {
  event.preventDefault();

  const data = getDataFromForm(document.getElementById('oval-form'));

  if (!data.x || !data.y || !data.bigRadius || !data.smallRadius) {
    return;
  }

  lastDrawnShapeData = {
    type: 'oval',
    data,
  };

  ctx.beginPath();
  ctx.ellipse(data.x, data.y, data.bigRadius, data.smallRadius, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

fillWithRedButton.onclick = () => {
  fillFunction('#ff4a4a')();
};

fillWithGreenButton.onclick = () => {
  fillFunction('#6ade6c')();
}

fillWithBlueButton.onclick = () => {
  fillFunction('#4f61ff')();
}

function getDataFromForm(formElement) {
  const formData = new FormData(formElement);

  const object = {};

  formData.forEach((value, key) => {
    object[key] = value;
  });

  return object;
}

function fillFunction(color) {
  return function() {
    if (!lastDrawnShapeData) {
      return;
    }
  
    const { data } = lastDrawnShapeData;
  
    ctx.fillStyle = color;
  
    if (lastDrawnShapeData.type === 'square') { ctx.fillRect(data.x, data.y, data.size, data.size); }
  
    if (lastDrawnShapeData.type === 'rectangle') { ctx.fillRect(data.x, data.y, data.width, data.height); }
  
    if (lastDrawnShapeData.type === 'circle') {
      ctx.beginPath();
      ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2, true);
      ctx.fill();
    }
  
    if (lastDrawnShapeData.type === 'oval') {
      ctx.beginPath();
      ctx.ellipse(data.x, data.y, data.bigRadius, data.smallRadius, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}