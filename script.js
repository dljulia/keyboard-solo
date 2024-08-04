const word = document.querySelector('.word');
const correctCount = document.querySelector('.correct-count');
const wordMistakes = document.querySelector('.word-mistakes');
const wrongCount = document.querySelector('.wrong-count');
const timer = document.querySelector('#timer');
let letters = null;
let correct = +correctCount.textContent;
let wrong = +wrongCount.textContent;
let mistakes = +wordMistakes.textContent;  
let timerId = null;
let seconds = +timer.textContent.slice(-2);

const words = ['apple', 'language', 'girl', 'school', 'university'];
let wordNumber = 0;
getWord(words[wordNumber]);

function getWord(element) {
  word.innerHTML = "";
  const fragment = new DocumentFragment;

  element.split('').forEach((item) => {
    const span = document.createElement('span');
    span.textContent = item;
    fragment.append(span);
  });
  
  word.append(fragment);
  letters = word.querySelectorAll('span');
}

function starOver() {
  wordNumber = 0;
  getWord(words[wordNumber]);
  correct = 0;
  correctCount.textContent = `${correct}`;
  wrong = 0;
  wrongCount.textContent = `${wrong}`;
  mistakes = 0;
  wordMistakes.textContent = `${mistakes}`;
  seconds = 0;    
  timer.textContent = `00:${format(seconds)}`;
  document.addEventListener('keydown', timerStart, {once:true}); 
}

function format(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

function timerStart() {
  timerId = setInterval(() => {
    if (seconds == 59) {
      clearInterval(timerId);
      alert('Вы проиграли. Попробуйте еще раз');
      starOver();
    } else {
      seconds++;    
      timer.textContent = `00:${format(seconds)}`;
    }
  }, 1000);
}

document.addEventListener('keydown', timerStart, {once:true});

document.addEventListener('keydown', (event) => {
  for (let letter of letters) {
    if (letter.classList.contains('c')) {
      continue;
    } else if (event.key == letter.textContent) {
      letter.classList.remove('w');
      letter.classList.add('c');
      break;
    } else {
      letter.classList.add('w');
      mistakes++;
      wordMistakes.textContent = `${mistakes}`;

      if (mistakes == 1) {
        wrong++;
        wrongCount.textContent = `${wrong}`;  
      }

      if (wrong == 5) {
        setTimeout(() => {
          clearInterval(timerId);
          alert('Вы проиграли. Попробуйте еще раз');
          starOver();
        }, 100);
      }
      break;
    }
  }

  if (word.lastElementChild.classList.contains('c')) {
    correct++;
    correctCount.textContent = `${correct}`;

    if (correct == 5) {
      setTimeout(() => {
        clearInterval(timerId);
        alert('Победа! Ваше время ' + timer.textContent);
        starOver();
      }, 100);
    } else {
      mistakes = 0;
      wordMistakes.textContent = `${mistakes}`;
      wordNumber++;
      getWord(words[wordNumber]);
    }
  }
});

