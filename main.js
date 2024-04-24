let words = [
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

const select = document.querySelector("select");
let minute = localStorage.getItem("minute");
if (!minute) {
  minute = 1;
  localStorage.setItem("minute", minute);
}
let seconds = 59;
let countdown;
let startCountdown = false;
let removeWordStart = 0;
let correctWord = 0;
const inputText = document.querySelector(".input-text");
let indexWord = 0;
const textContain = document.querySelector(".texts");
let time = document.querySelector(".time");
time.textContent = minute >= 1 ? minute + " : 00" : "0 : 30";
let containTexts = document.querySelector("#contain-texts");
const containResult = document.querySelector(".contain-result");
const wpm = document.querySelector(".wpm");
const accuracy = document.querySelector(".accuracy");
const netSpeed = document.querySelector(".net-speed");
const restart = document.querySelector(".restart");
setDefaultOptionByValue(select, minute);
function setDefaultOptionByValue(selectElement, value) {
  // Loop through options
  for (var i = 0; i < selectElement.options.length; i++) {
    // Check if the option value matches the desired value
    if (selectElement.options[i].value === value) {
      // Set the selected property of this option to true
      selectElement.options[i].selected = true;
      // Exit the loop since we found the matching option
      break;
    }
  }
}

function randomText(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function refresh() {
  select.disabled = false;
  containResult.style.display = "none";
  containTexts.style.display = "block";
  startCountdown = false;
  minute = localStorage.getItem("minute");
  seconds = minute === 0.5 ? 29 : 59;
  time.textContent = minute >= 1 ? minute + " : 00" : "0 : 30";
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
  select.disabled = true;
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
    if (seconds === 59 && minute !== 0) {
      if (minute == 0.5) {
        minute = 0;
        seconds = 29;
      } else {
        minute--;
      }
    }
    document.querySelector(".time").textContent = minute + " : " + seconds;
    seconds--;
    if (seconds < 0) {
      if (minute !== 0) {
        seconds = 59;
      } else {
        clearInterval(countdown);
        select.disabled = false;
        displayResult();
      }
    }
  }, 1000);
}

function displayResult() {
  containTexts.style.display = "none";
  containResult.style.display = "flex";
  const originalMinutes = localStorage.getItem("minute");
  wpm.textContent = parseInt(indexWord / originalMinutes);
  accuracy.textContent = parseInt((correctWord / indexWord) * 100);
  netSpeed.textContent = parseInt(correctWord / originalMinutes);
}
restart.addEventListener("click", refresh);

select.addEventListener("input", function (e) {
  minute = e.target.value;
  time.textContent = minute >= 1 ? minute + " : 00" : "0 : 30";
  localStorage.setItem("minute", minute);
});
