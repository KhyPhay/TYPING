var words = [
  "only",
  "sea",
  "start",
  "walk",
  "you",
  "very",
  "long",
  "think",
  "many",
  "as",
  "end",
  "day",
  "part",
  "help",
  "picture",
  "city",
  "another",
  "work",
  "other",
  "spell",
  "said",
  "other",
  "but",
  "talk",
  "is",
  "how",
  "keep",
  "go",
  "paper",
  "work",
  "no",
  "page",
  "air",
  "through",
  "don't",
  "far",
  "this",
  "people",
  "how",
  "an",
  "old",
  "idea",
  "grow",
  "come",
  "quickly",
  "call",
  "must",
  "because",
  "place",
  "children",
  "my",
  "look",
  "tell",
  "leave",
  "were",
  "page",
  "one",
  "side",
  "make",
  "state",
  "together",
  "well",
  "set",
  "tree",
  "cut",
  "once",
  "keep",
  "stop",
  "later",
  "take",
  "ask",
  "change",
  "tell",
  "time",
  "close",
  "example",
  "way",
  "each",
  "can",
  "must",
  "same",
  "it",
  "mile",
  "was",
  "into",
  "enough",
  "say",
  "own",
  "turn",
  "quick",
  "were",
  "between",
  "same",
  "with",
  "father",
  "large",
  "light",
  "big",
  "they",
  "soon",
  "old",
  "her",
  "need",
  "left",
  "every",
  "carry",
  "sea",
  "book",
  "form",
  "children",
  "way",
  "state",
  "little",
  "question",
  "took",
  "thing",
  "first",
  "some",
  "great",
  "mean",
  "air",
  "add",
  "high",
  "than",
  "one",
  "also",
  "kind",
  "was",
  "of",
  "letter",
  "take",
  "if",
  "earth",
  "from",
  "hear",
  "change",
  "big",
  "under",
  "his",
  "until",
  "put",
  "see",
  "last",
  "important",
  "school",
  "so",
  "go",
  "place",
  "face",
  "where",
  "soon",
  "food",
  "work",
  "right",
  "city",
  "almost",
  "very",
  "our",
  "right",
  "use",
  "something",
  "long",
  "four",
  "use",
  "man",
  "will",
  "move",
  "turn",
  "important",
  "come",
  "point",
  "every",
  "be",
];
let minute = 1;
let seconds = 60;
let countdown;
let startCountdown = false;
let removeWordStart = 0;
let correctWord = 0;
const inputText = document.querySelector(".input-text");
let indexWord = 0;
const textContain = document.querySelector(".texts");
let time = document.querySelector(".time");
time.textContent = minute + " : 00";
let containTexts = document.querySelector("#contain-texts");
const containResult = document.querySelector(".contain-result");
const wpm = document.querySelector(".wpm");
const accuracy = document.querySelector(".accuracy");
const netSpeed = document.querySelector(".net-speed");
const restart = document.querySelector(".restart");
function randomText(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function refresh() {
  containResult.style.display = "none";
  containTexts.style.display = "block";
  startCountdown = false;
  minute = 1;
  seconds = 60;
  time.textContent = minute + " : 00";
  clearInterval(countdown);
  correctWord = 0;
  indexWord = 0;
  inputText.value = "";
  inputText.focus();
  createTexts(randomText(words));
}
function removeWord(start, end) {
  for (let i = start; i < end; i++) {
    const span = document.querySelector(".word-" + i);
    textContain.removeChild(span);
  }
}
function createTexts(texts) {
  textContain.innerHTML = "";
  for (let i = 0; i < texts.length; i++) {
    let span = document.createElement("span");
    span.textContent = texts[i];
    if (i === 0) {
      span.classList = "word highlight word-" + i;
    } else {
      span.classList = "word word-" + i;
    }
    textContain.appendChild(span);
  }
}

createTexts(randomText(words));
inputText.addEventListener("input", function (event) {
  let enterWord = document.querySelector(".word-" + indexWord);
  if (event.data === " " && inputText.value === " ") {
    event.preventDefault();
    inputText.value = "";
    return;
  }
  if (!startCountdown) {
    startCountdown = true;
    startCount();
  }
  const isIncorrectWord =
    enterWord.textContent.substring(0, inputText.value.trim().length) !==
    inputText.value.trim();
  if (isIncorrectWord) {
    enterWord.classList.add("incorrect-word-bg");
  } else {
    enterWord.classList = "word-" + indexWord + " highlight";
  }
  if (event.data === " " && inputText.value !== " ") {
    const isCorrectWord =
      enterWord.textContent.trim() === inputText.value.trim();
    if (isCorrectWord) {
      enterWord.classList = "word-" + indexWord;
      correctWord++;
    } else {
      enterWord.classList = "word-" + indexWord + " incorrect-word";
    }

    event.preventDefault();
    indexWord++;
    inputText.value = "";
    const enteredWord = enterWord;
    enterWord = document.querySelector(".word-" + indexWord);
    enterWord.classList.add("highlight");
    if (
      enterWord.getBoundingClientRect().y !==
      enteredWord.getBoundingClientRect().y
    ) {
      removeWord(removeWordStart, indexWord);
      removeWordStart = indexWord;
    }
  }
});
function startCount() {
  countdown = setInterval(function () {
    if (seconds === 60 && minute !== 0) {
      minute--;
    }
    document.querySelector(".time").textContent = minute + " : " + seconds;
    seconds--;
    if (seconds < 0) {
      if (minute !== 0) {
        seconds = 60;
      } else {
        clearInterval(countdown);
        displayResult();
      }
    }
  }, 1000);
}

function displayResult() {
  containTexts.style.display = "none";
  containResult.style.display = "flex";
  wpm.textContent = indexWord;
  accuracy.textContent = parseInt((correctWord / indexWord) * 100);
  netSpeed.textContent = correctWord;
}
restart.addEventListener("click", refresh);
