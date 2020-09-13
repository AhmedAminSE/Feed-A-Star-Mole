let pointsEarned = 1;
let currentStatus = [];
let nextTime = [];
let isKing = [];
const holes = document.querySelectorAll('.mole');
for (let i = 0; i < holes.length; ++i) {
    currentStatus.push('hungry');
    nextTime.push(Date.now());
    isKing.push(Math.random() >= 0.9);
}
function init() {
    for (let i = 0; i < holes.length; ++i) {
        if (Date.now() > nextTime[i]) {
            holes[i].style.cursor = "url('./assests/cursor.png'),auto";
            switch (currentStatus[i]) {
                case 'hungry':
                    if (isKing[i]) {
                        holes[i].src = './assests/king-mole-sad.png';
                    }
                    else {
                        holes[i].src = './assests/mole-sad.png';
                    }
                    nextTime[i] = Date.now() + 500;
                    currentStatus[i] = 'sad';
                    break;
                case 'sad':
                case 'fed':
                    if (isKing[i]) {
                        holes[i].src = './assests/king-mole-leaving.png';
                    }
                    else {
                        holes[i].src = './assests/mole-leaving.png';
                    }
                    nextTime[i] = Date.now() + 500;
                    currentStatus[i] = 'leaving';
                    break;
                case 'leaving':
                    isKing[i] = Math.random() >= 0.9;
                    holes[i].style.display = 'none';
                    nextTime[i] = Date.now() + Math.floor(Math.random() * 20000) + 2000;
                    currentStatus[i] = 'none';
                    break;
                default:
                    if (isKing[i]) {
                        holes[i].src = './assests/king-mole-hungry.png';
                    }
                    else {
                        holes[i].src = './assests/mole-hungry.png';
                    }
                    holes[i].style.display = 'inline';
                    nextTime[i] = Date.now() + 1500;
                    currentStatus[i] = 'hungry';
            }
        }
    }
    requestAnimationFrame(init);
}
init();
for (let i = 0; i < holes.length; ++i) {
    holes[i].addEventListener('click', function () {
        if (currentStatus[i] === 'hungry') {
            if (!isKing[i]) {
                ++pointsEarned;
                document.querySelector('.worm-meter').style.width = `${pointsEarned * 150}px`;
                holes[i].src = './assests/mole-fed.png';
            }
            else {
                pointsEarned += 2;
                document.querySelector('.worm-meter').style.width = `${pointsEarned * 150}px`;
                holes[i].src = './assests/king-mole-fed.png';
            }
            if (pointsEarned >= 11) {
                document.querySelector('.background').style.display = 'none';
                document.querySelector('.win').style.display = 'block';
            }
            currentStatus[i] = 'fed';
            nextTime[i] = Date.now() + 500;
        }
    })
    holes[i].addEventListener('mouseover', function () {
        if (currentStatus[i] === 'hungry' || currentStatus[i] === 'fed') {
            holes[i].style.cursor = "url('./assests/cursor-worm.png'),auto";
        }
    })
}