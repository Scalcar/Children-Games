function init() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let w = canvas.width;
    let h = canvas.height;

    let bg = new Image();
    bg.src = 'images/christmas.png';
    let flakes = [];

    function snowfall() {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(bg, 0, 0);
        addFlake();
        snow();
    }

    function addFlake() {
        let x = Math.round(Math.random() * w);
        let s = Math.round(Math.random() * 5);
        flakes.push({"x": x, "y": 0, "s": s});
    }

    function snow() {
        for(let i = 0; i < flakes.length; i++) {
            let flake = flakes[i];
            ctx.beginPath();
            ctx.fillStyle = 'rgba(189, 195, 199, 1)';
            ctx.arc(flake.x, flake.y += flake.s / 2, flake.s / 2, 0, 2 * Math.PI);
            ctx.fill();

            if(flakes[i].y > h) {
                flakes.splice(i, 1);
            }
        }
    }

    setInterval(snowfall, 20);
}

window.onload = init;

//Snow outside of the canvas
function createSnowFlake() {
    const snow_flake = document.createElement('i');
    snow_flake.classList.add('bi','bi-dot');
    snow_flake.style.left = Math.random() * window.innerWidth + 'px';
    //animation time between 2-6s
    snow_flake.style.animationDuration = Math.random() * 3 + 3 + 's';
    snow_flake.style.opacity = Math.random();
    snow_flake.style.size = Math.random() * 10 + 10 + 'px';
    snow_flake.style.transform = 'rotate(180deg)';

    document.body.appendChild(snow_flake);

    setTimeout(() => {
        snow_flake.remove();
    }, 5000);
}

setInterval(createSnowFlake, 20);




