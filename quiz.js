let currentNode = null;    
let history = [];

// DOM Elements 
const elements = {
  section: document.getElementById("quizSection"),
  resultSection: document.getElementById("resultSection"),
  questionContainer: document.getElementById("questionContainer"),
  resultFlower: document.getElementById("resultFlower"),
  nextBtn: document.getElementById("nextBtn"),
  prevBtn: document.getElementById("prevBtn"),
  restartBtn: document.getElementById("restartBtn"),
  saveBtn: document.getElementById("saveBtn"),
};

// Initialize
function initQuiz() {
  currentNode = quizTree; // Load from Data
  history = [];
  renderQuestion(currentNode);
  
  // Event Listeners
  elements.nextBtn.onclick = handleNext;
  elements.prevBtn.onclick = handlePrev;
  elements.restartBtn.onclick = restartQuiz;
  elements.saveBtn.onclick = saveImage;
}

function renderQuestion(node) {
  currentNode = node;
  const container = elements.questionContainer;
  container.innerHTML = ""; 

  // 1. Render Question
  const qText = document.createElement("p");
  qText.className = "question";
  qText.textContent = node.question;
  container.appendChild(qText);

  // 2. Render Choices
  const choiceContainer = document.createElement("div");
  choiceContainer.className = "choice";

  node.choices.forEach((choice, index) => {
    const label = document.createElement("label");
    label.className = "input-choice";
    
    label.innerHTML = `
      <input type="radio" name="answer" value="${index}">
      <span>${choice.text}</span>
    `;
    
    const input = label.querySelector("input");
    input.choiceData = choice; 

    choiceContainer.appendChild(label);
  });

  container.appendChild(choiceContainer);

  prevBtn.style.backgroundColor = history.length === 0 ? "grey" : "#01A652";
}

function handleNext() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("กรุณาเลือกคำตอบก่อนไปต่อครับ 🌸");
    return;
  }

  // Save History
  history.push(currentNode);

  const choice = selected.choiceData;
  if (choice.result) {
    showResult(choice.result);
  } else {
    renderQuestion(choice.next);
  }
}

function handlePrev() {
  if (history.length === 0) return;
  const prevNode = history.pop();
  renderQuestion(prevNode);
}

function showResult(resultKey) {
  const data = flowerData[resultKey]; // Load from Data
  if (!data) return console.error("Flower data not found:", resultKey);

  elements.section.style.display = "none";
  elements.resultSection.style.display = "block";

  elements.resultFlower.innerHTML = `
    <div id="title">${data.title}</div>
    <div id="flower_pic"><img src="${data.image}" alt="${resultKey}"></div>
    <p id="head">${data.head}</p>
    <p id="descript">${data.description}</p>
  `;
}

function restartQuiz() {
  elements.resultSection.style.display = "none";
  elements.section.style.display = "block";
  initQuiz();
}  

function saveImage() {
  const btnGroup = document.getElementById('shareBtns'); 
  const homeBtn = document.querySelector('.homeBtn');

  document.body.classList.add('saving-mode'); 

  if (btnGroup) btnGroup.style.display = 'none';
  if (homeBtn) homeBtn.style.display = 'none';

  html2canvas(document.body, {
    scale: 3, 
    useCORS: true, 
    backgroundColor: null 
  }).then(canvas => {
    
    const link = document.createElement('a');
    link.download = 'bloomie-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    document.body.classList.remove('saving-mode'); 
    
    if (btnGroup) btnGroup.style.display = 'block'; 
    if (homeBtn) homeBtn.style.display = 'inline-block';
    
  }).catch(err => {

    document.body.classList.remove('saving-mode'); 
    if (btnGroup) btnGroup.style.display = 'block';
    if (homeBtn) homeBtn.style.display = 'inline-block';
  });
}

initQuiz();