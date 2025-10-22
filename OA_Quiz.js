const quizForm = document.getElementById("quizForm");
const resultBox = document.getElementById("result");

// Step 1: Get all question blocks
const allQuestions = Array.from(document.querySelectorAll(".question"));

// Step 2: Separate fixed and random questions
const fixedQuestions = allQuestions.slice(0, 10); // first 10 fixed
const randomPool = allQuestions.slice(10); // remaining questions

// Step 3: Pick 20 random questions from pool
function getRandomQuestions(pool, count) {
  let shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const randomQuestions = getRandomQuestions(randomPool, 20);

// Step 4: Hide all questions first
allQuestions.forEach(q => q.style.display = "none");

// Step 5: Show fixed + random questions
fixedQuestions.forEach(q => q.style.display = "block");
randomQuestions.forEach(q => q.style.display = "block");

// Handle form submit
quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;
  let total = 0;

  const visibleQuestions = Array.from(document.querySelectorAll(".question")).filter(q => q.style.display === "block");

  visibleQuestions.forEach(ansBlock => {
    const ans = ansBlock.querySelector(".answer");
    const correct = ans.dataset.correct;
    const expl = ans.dataset.expl || "";

    const qName = ansBlock.querySelector("input").name;
    let selected = null;

    const options = quizForm[qName];
    if (options) {
      if (options.length !== undefined) {
        for (let opt of options) {
          if (opt.checked) {
            selected = opt.value;
            break;
          }
        }
      } else {
        if (options.checked) selected = options.value;
      }
    }

    total++;

    const explanationBox = ansBlock.querySelector(".explanation") || document.createElement("div");
    explanationBox.className = "explanation";

    if (!ansBlock.contains(explanationBox)) {
      ansBlock.appendChild(explanationBox);
    }

    if (selected === correct) {
      score++;
      explanationBox.innerHTML = `<p class='correct'>✅ Correct! ${expl}</p>`;
    } else {
      explanationBox.innerHTML = `<p class='wrong'>❌ Wrong. Correct answer: <b>${expl}</b></p>`;
    }
  });

  // Reset previous classes
  resultBox.className = "result-box";

  // Add color classes based on score
  if (score / total >= 0.7) {
    resultBox.classList.add("good");
  } else if (score / total >= 0.4) {
    resultBox.classList.add("average");
  } else {
    resultBox.classList.add("bad");
  }

  resultBox.innerHTML = `<h3>Your Score: ${score} / ${total}</h3>`;
});
