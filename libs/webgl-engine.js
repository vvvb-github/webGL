const canvas = document.createElement('canvas');
document.querySelector('body').appendChild(canvas);
canvas.style.width = '100%';
canvas.style.height = '100%';
const gl = canvas.getContext('webgl');
const scene = new Scene();
