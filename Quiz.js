const quizForm = document.getElementById("quizForm");
const resultBox = document.getElementById("result");

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;
  let total = 0;

  const answers = document.querySelectorAll(".answer");
  answers.forEach(ans => {
    const correct = ans.dataset.correct;
    const expl = ans.dataset.expl;
    const qName = ans.parentElement.querySelector("input").name;
    const selected = quizForm[qName].value;
    total++;

    if (selected === correct) {
      score++;
      ans.innerHTML = `<p class='correct'>✅ Correct! ${expl}</p>`;
    } else {
      ans.innerHTML = `<p class='wrong'>❌ Wrong. Correct answer: <b>${correct.toUpperCase()}</b>. ${expl}</p>`;
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
