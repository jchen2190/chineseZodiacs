const section = document.querySelector('section');

for(let i = 0; i < 12; i++) {
    const divvy = document.createElement('div');
    divvy.className = 'divvy';
    section.appendChild(divvy);

    let animal = animals[i];
    let pic = new Image();
    pic.src = `images/animals/${animal.eng}.jpg`;
    pic.className = 'animal-pic';
    divvy.textContent = '';
    divvy.appendChild(pic);

    const inputBox = document.createElement('input');
    inputBox.type = 'search';
    inputBox.placeholder = 'name';
    inputBox.eng = animal.eng;
    inputBox.chi = animal.chi;
    inputBox.also = animal.also;
    inputBox.indx = i;
    inputBox.addEventListener('search', checkSpelling);
    inputBox.addEventListener('blur', checkSpelling);
    divvy.appendChild(inputBox);
    
    let chineseChar = new Image();
    chineseChar.src = `images/chars/char-${animal.chi}.jpg`
    chineseChar.className = 'chinese-char';
    divvy.appendChild(chineseChar);

    let pTag = document.createElement('p');
    pTag.className = 'zodiac-year';
    divvy.appendChild(pTag);

    let yearSeries = (animal.year - 156) + " ";
    for (let y = 144; y >= -12; y-=12) {
        yearSeries += (animal.year - y) + " ";
    }
    pTag.textContent = yearSeries;

    let english = document.createElement('span');
    english.className = 'english';
    english.textContent = animal.eng;
    english.id = 'eng' + i;
    divvy.appendChild(english);

    let pinyin = document.createElement('span');
    pinyin.className = 'pinyin';
    pinyin.innerHTML = animal.pin;
    pinyin.id = 'pin' + i;
    divvy.appendChild(pinyin);

    let soundIcon = new Image();
    soundIcon.src = `images/sound-icon.png`;
    soundIcon.className = 'sound-icon';
    soundIcon.eng = animal.eng;
    soundIcon.addEventListener('click', playSound);
    divvy.appendChild(soundIcon);
}

function checkSpelling() {
    let input = this.value;

    if(input == this.eng || input == this.chi || input == this.also) {
        this.style.backgroundColor = '#0B0';
        this.style.color = '#fff';

        let engTagId = "eng" + this.indx;
        const engSpan = document.getElementById(engTagId);
        engSpan.style.display = "inline";

        let pinTagId = "pin" + this.indx;
        document.getElementById(pinTagId).style.display = "inline";

    } else {
        this.style.backgroundColor = '#921';
        this.style.color = '#fff';
    }
}

const sound = new Audio();

function playSound() {
    sound.pause();
    sound.src = `audio/${this.eng}.mp3`
    sound.play();
}