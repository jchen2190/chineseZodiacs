const section = document.querySelector('section');

for(let i = 0; i < 12; i++) {
    const divvy = document.createElement('div');
    divvy.className = 'divvy';
    // divvy.textContent = 'div ' + i;
    section.appendChild(divvy);

    let animal = animals[i];

    
    let pic = new Image(); // make an image for each div, using*new Image():
    pic.src = `images/animals/${animal.eng}.jpg`; // get pictures
    pic.className = 'animal-pic'; // apply class

    
    divvy.textContent = ''; // Delete the text and output the image inside the div.
    divvy.appendChild(pic);


    const inputBox = document.createElement('input');
    inputBox.type = 'search'; // type search gives little "X" to clear, procides "search" event when user hits Enter
    inputBox.placeholder = 'name';
    // Assign **eng**, **chi** and **also** properties to the input box. These will be used by the **checkSpelling** function to see if the user input matches any of the three accepted spellings:
    inputBox.eng = animal.eng;
    inputBox.chi = animal.chi;
    inputBox.also = animal.also;
    // Also save the current index as a property of the input box:
    inputBox.indx = i;

    inputBox.addEventListener('search', checkSpelling); // Have the input box call the function when its search event is fired:
    inputBox.addEventListener('blur', checkSpelling); // Also the input box call the function on **blur**, and event which fires when the user hits **Tab** to leave an input box. Tab moves the cursor to the next input box, so it's a handy way to navigate from one animal div to the next:

    divvy.appendChild(inputBox); // Output the input box to the div. It will appear under the animal image:
    
    // make the image to hold the Chinese character
    let chineseChar = new Image();
    chineseChar.src = `images/chars/char-${animal.chi}.jpg`
    chineseChar.className = 'chinese-char';
    divvy.appendChild(chineseChar);


    // logs 15 animal years in a row in increments of 12 years
    // start back in time 12 cycles and go forward 2 cycles
    
    // let animalYears = "";
    // for(let yr = 0; yr < 15; yr++) {
    //     animalYears += (animal.year - 144 + yr*12) + " ";
    // }
    // console.log(`${animal.eng}: ${animalYears}`);

    let pTag = document.createElement('p');
    pTag.className = 'zodiac-year';
    divvy.appendChild(pTag);

    let yearSeries = (animal.year - 156) + " "; // start w the starting year, which is 144 years before the most recent animal year
    for (let y = 144; y >= -12; y-=12) {
        yearSeries += (animal.year - y) + " ";
    }
    pTag.textContent = yearSeries;

    // span tag to hold the English name of the animal
    let english = document.createElement('span');
    english.className = 'english';
    english.textContent = animal.eng;
    english.id = 'eng' + i; // eng0, eng1, eng2, ... eng10, eng11
    divvy.appendChild(english);

    //span tag to hold the Pinyin name of the animal
    let pinyin = document.createElement('span');
    pinyin.className = 'pinyin';
    pinyin.innerHTML = animal.pin; // use innerHTML to show accents instead of textContent
    pinyin.id = 'pin' + i; // pin0, pin1, pin2, ... pin10, pin11
    divvy.appendChild(pinyin);


    // the sound icon
    let soundIcon = new Image();
    soundIcon.src = `images/sound-icon.png`;
    soundIcon.className = 'sound-icon';
    soundIcon.eng = animal.eng;
    soundIcon.addEventListener('click', playSound);
    divvy.appendChild(soundIcon);

}


// Enter a spelling in a box and hit Enter. 
// - if the spelling is correct, the input box turns green. 
// - else, the spelling is incorret, so the box turns red.

function checkSpelling() {

    let input = this.value;

    // Compare the user input to the English, pinyin and alternate (also) spelling. The user input needs to match *one* of the three correct spellings:
    if(input == this.eng || input == this.chi || input == this.also) {

        // If the user input is correct, turn the input box green; else turn the box red:
        this.style.backgroundColor = '#0B0';
        this.style.color = '#fff';

        // show the english spelling when the word is correctly spelled
        let engTagId = "eng" + this.indx; // eng0, eng1, eng2
        const engSpan = document.getElementById(engTagId);
        engSpan.style.display = "inline";

        let pinTagId = "pin" + this.indx; // pin0, pin1, pin2
        document.getElementById(pinTagId).style.display = "inline";

    } else {
        this.style.backgroundColor = '#921';
        this.style.color = '#fff';
    }
}

// instantiate an Audio object -- only have ONE so that only ONE sound can ever play at a time
const sound = new Audio();

function playSound() {
    sound.pause(); // stop the sound that may be playing concurrently;
    sound.src = `audio/${this.eng}.mp3`
    sound.play();
}


