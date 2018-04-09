let dotsSettings = {
  canvasId: 'dots',
  canvas: null,
  fitToWindow: true,
  //backgroundColor: 'rgba(255, 255, 255, 0.4)', // white
  backgroundColor: 'rgba(15, 15, 15, 0.952)', // dark grey
  maxDots: 150,
  launchInterval: 10,
  redrawInterval: 10,
  speedFactor: .2,
  speed: {
    minimum: 1,
    maximum: 5,
  },
  radius: {
    minimum: 1,
    maximum: 30,
  },
  direction: {
    minimum: 0,
    maximum: 359,
  },
  randomSpawnLocation: false,
  spawn: {
    x: 50,
    y: 50,
  },
  colors: ["#A9A9A9", "#808080", "#C0C0C0", "#DCDCDC", "#606060", "#303030", "#101010", "#181818", "#000000", "#080808", "#F80000", "#600000", "#F00000", "#F80000", "#484848"], // shades of grey and red
  opacity: 0.4,
  click: {
    spawn: true,
    amount: 25,
  },
}




let currentDots = [];

let rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

let randEdgePoint = () => {
  let edge = rand(1, 4);
  switch (edge) {
    case 1: return { x: rand(0, 100), y: 0 }; break;
    case 2: return { x: 100, y: rand(0, 100) }; break;
    case 3: return { x: rand(0, 100), y: 100 }; break;
    case 4: return { x: 0, y: rand(0, 100) }; break;
  }
}

function hexToRGBA(hex, opacity) {
  return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) {
    return parseInt(hex.length % 2 ? l + l : l, 16)
  }).concat(opacity || 1).join(',') + ')';
}

class dot {
  constructor(props) {
    this.position = props.position || randEdgePoint();
    this.speed = props.speed || rand(dotsSettings.speed.minimum, dotsSettings.speed.maximum);
    this.radius = props.radius || rand(dotsSettings.radius.minimum, dotsSettings.radius.maximum);
    this.color = props.color || hexToRGBA(dotsSettings.colors[rand(0, dotsSettings.colors.length - 1)], dotsSettings.opacity);
    this.direction = props.direction || rand(dotsSettings.direction.minimum, dotsSettings.direction.maximum);
  }
}

let launchDot = (forcing, position, destination, speed, radius, color, direction) => {
  if (currentDots.length < dotsSettings.maxDots || forcing) {
    currentDots.push(new dot({ position, destination, speed, radius, color, direction }));
  }
}


let drawCanvas = () => {
  if (dotsSettings.canvas == null) return;

  let context = dotsSettings.canvas.getContext("2d");

  if (dotsSettings.fitToWindow) {
    //console.log(window.innerWidth);
    dotsSettings.canvas.width = window.innerWidth;
    dotsSettings.canvas.height = window.innerHeight;
  }

  context.fillStyle = dotsSettings.backgroundColor;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (let singleDot of currentDots) {
    context.beginPath();
    context.arc(
      (singleDot.position.x / 100) * dotsSettings.canvas.width,
      (singleDot.position.y / 100) * dotsSettings.canvas.height,
      singleDot.radius,
      0,
      2 * Math.PI
    );
    context.fillStyle = singleDot.color;
    context.fill();

    let radian = singleDot.direction * (Math.PI / 180);
    let factor = singleDot.speed / dotsSettings.redrawInterval * dotsSettings.speedFactor;
    let changeX = Math.cos(radian) * factor;
    let changeY = Math.sin(radian) * factor;
    singleDot.position.x += changeX;
    singleDot.position.y += changeY;

    if (singleDot.position.x < 0 || singleDot.position.x > 100 || singleDot.position.y < 0 || singleDot.position.y > 100) {
      currentDots.splice(currentDots.indexOf(singleDot), 1);
    }
  }
}





let resizeDotCanvas = (height, width) => {
  if (dotsSettings.canvas != null) {
    let ctx = dotsSettings.canvas.getContext("2d");
    if (height >= 0) {
      ctx.canvas.height = height;
    }
    if (width >= 0) {
      ctx.canvas.width = width;
    }
  }
}

let startDotMotion = () => {
  if (dotsSettings.canvas != null) {
    currentDots = [];
    let context = dotsSettings.canvas.getContext("2d");

    setInterval(() => {
      if (dotsSettings.randomSpawnLocation) {
        launchDot();
      } else {
        launchDot(false, { x: dotsSettings.spawn.x, y: dotsSettings.spawn.y });
      }
    }, dotsSettings.launchInterval);



    setInterval("drawCanvas()", dotsSettings.redrawInterval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  dotsSettings.canvas = document.getElementById(dotsSettings.canvasId);

  startDotMotion();

  if (dotsSettings.click.spawn) {
    window.addEventListener("click", (event) => {
      let rect = dotsSettings.canvas.getBoundingClientRect();
      if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
        for (var i = 0; i < dotsSettings.click.amount; i++) {
          let x = ((event.clientX - rect.left) / dotsSettings.canvas.width) * 100;
          let y = ((event.clientY - rect.top) / dotsSettings.canvas.height) * 100;
          launchDot(true, { x: x, y: y });
        }
      }
    });
  }
});
