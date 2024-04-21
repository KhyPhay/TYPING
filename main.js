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

let removeWordStart = 0;
let correctWord = 1;
const inputText = document.querySelector(".input-text");
let indexWord = 0;
const textContain = document.querySelector(".texts");
function randomText(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function refresh() {
  correctWord = 0;
  indexWord = 0;
  inputText.value = "";
  inputText.focus(); //= true;
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

let minute = 2;
let seconds = 60;
const countdown = setInterval(function () {
  document.querySelector(".time").innerHTML = minute + " : " + seconds;
  if (seconds === 60) {
    minute--;
  }
  seconds--;
  if (seconds < 0) {
    if (minute !== 0) {
      seconds = 60;
    }
    clearInterval(countdown);
  }
}, 1000);
