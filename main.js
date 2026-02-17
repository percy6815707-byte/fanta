const questions = [
  {
    text: "위기 상황에서 당신이 가장 먼저 하는 행동은?",
    answers: [
      { text: "지형과 상황을 빠르게 분석해 계획을 짠다", type: "mage" },
      { text: "바로 앞으로 나서 팀을 지킨다", type: "warrior" },
      { text: "숨어서 약점을 찾고 기습 타이밍을 노린다", type: "rogue" },
      { text: "동료들의 상태를 확인하고 사기를 올린다", type: "healer" }
    ]
  },
  {
    text: "여행 중 가장 마음이 가는 장소는?",
    answers: [
      { text: "고대 도서관과 마법 유적", type: "mage" },
      { text: "훈련장과 검투 경기장", type: "warrior" },
      { text: "비밀 골목과 암시장", type: "rogue" },
      { text: "신전과 치유의 샘", type: "healer" }
    ]
  },
  {
    text: "팀 프로젝트에서 당신의 강점은?",
    answers: [
      { text: "복잡한 문제를 정리해서 해결책 제시", type: "mage" },
      { text: "실행력 있게 밀어붙여 결과 만들기", type: "warrior" },
      { text: "리스크를 예측하고 플랜 B 준비", type: "rogue" },
      { text: "조율과 공감으로 팀 분위기 안정", type: "healer" }
    ]
  },
  {
    text: "보상으로 가장 끌리는 것은?",
    answers: [
      { text: "희귀한 주문서", type: "mage" },
      { text: "전설급 무기", type: "warrior" },
      { text: "잠입용 장비", type: "rogue" },
      { text: "축복받은 성물", type: "healer" }
    ]
  },
  {
    text: "갈등 상황에서 당신의 스타일은?",
    answers: [
      { text: "논리로 정리해 납득시킨다", type: "mage" },
      { text: "정면 돌파로 결론을 낸다", type: "warrior" },
      { text: "판을 읽고 유리한 지점으로 유도한다", type: "rogue" },
      { text: "감정을 다독이며 합의점을 찾는다", type: "healer" }
    ]
  },
  {
    text: "당신이 가진 비밀 재능은?",
    answers: [
      { text: "패턴을 빠르게 파악하는 통찰", type: "mage" },
      { text: "끝까지 버티는 강인함", type: "warrior" },
      { text: "순간 판단과 눈치", type: "rogue" },
      { text: "사람의 상처를 알아채는 감수성", type: "healer" }
    ]
  },
  {
    text: "파티가 휴식할 때 당신은?",
    answers: [
      { text: "지도와 기록을 정리한다", type: "mage" },
      { text: "다음 전투를 대비해 몸을 단련한다", type: "warrior" },
      { text: "주변 정보를 수집한다", type: "rogue" },
      { text: "동료를 돌보고 회복을 돕는다", type: "healer" }
    ]
  },
  {
    text: "당신이 추구하는 영웅상은?",
    answers: [
      { text: "지식으로 세계를 바꾸는 현자", type: "mage" },
      { text: "앞장서서 길을 여는 수호자", type: "warrior" },
      { text: "그림자에서 흐름을 바꾸는 전략가", type: "rogue" },
      { text: "상처를 희망으로 바꾸는 치유자", type: "healer" }
    ]
  }
];

const resultMap = {
  mage: {
    name: "아스트랄 메이지",
    flavor: "질서와 지식의 설계자",
    desc: "당신은 복잡한 문제를 구조화하고 본질을 꿰뚫는 타입입니다. 감정에 휩쓸리기보다 원리를 파악하며, 팀에 장기적 방향성을 제시합니다.",
    traits: ["분석형", "통찰력", "전략형"]
  },
  warrior: {
    name: "발키리 가디언",
    flavor: "최전선의 결단가",
    desc: "당신은 위기에서 물러서지 않고 행동으로 증명하는 타입입니다. 높은 책임감과 추진력으로 팀의 중심을 잡고 상황을 실전적으로 해결합니다.",
    traits: ["실행력", "책임감", "리더십"]
  },
  rogue: {
    name: "나이트 섀도우",
    flavor: "흐름을 읽는 전술가",
    desc: "당신은 관찰과 판단이 빠르고, 예상치 못한 각도로 문제를 푸는 타입입니다. 불확실한 상황에서 유연하게 움직이며 리스크를 줄이는 데 강합니다.",
    traits: ["유연함", "판단력", "기민함"]
  },
  healer: {
    name: "루미너스 힐러",
    flavor: "관계를 회복시키는 조율가",
    desc: "당신은 사람의 상태를 세심히 살피고 갈등을 완화하는 타입입니다. 공동체의 안정과 회복에 강하며, 팀 분위기를 건강하게 유지합니다.",
    traits: ["공감력", "조율력", "회복력"]
  }
};

const startBtn = document.querySelector("#start-btn");
const retryBtn = document.querySelector("#retry-btn");
const quizSection = document.querySelector("#quiz");
const resultSection = document.querySelector("#result");
const questionText = document.querySelector("#question-text");
const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector("#progress-bar");
const answerList = document.querySelector("#answer-list");
const jobName = document.querySelector("#job-name");
const jobFlavor = document.querySelector("#job-flavor");
const jobDesc = document.querySelector("#job-desc");
const traitList = document.querySelector("#trait-list");

let current = 0;
let scores = createEmptyScores();

function createEmptyScores() {
  return { mage: 0, warrior: 0, rogue: 0, healer: 0 };
}

function startQuiz() {
  current = 0;
  scores = createEmptyScores();
  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  startBtn.classList.add("hidden");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  progressText.textContent = `${current + 1} / ${questions.length}`;
  progressBar.style.width = `${progress}%`;
  questionText.textContent = q.text;

  answerList.innerHTML = "";
  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "btn answer-btn";
    btn.textContent = answer.text;
    btn.addEventListener("click", () => pickAnswer(answer.type));
    answerList.appendChild(btn);
  });
}

function pickAnswer(type) {
  scores[type] += 1;
  current += 1;

  if (current < questions.length) {
    renderQuestion();
    return;
  }

  showResult();
}

function showResult() {
  const bestType = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return ["mage", "warrior", "rogue", "healer"].indexOf(a[0]) -
      ["mage", "warrior", "rogue", "healer"].indexOf(b[0]);
  })[0][0];

  const result = resultMap[bestType];

  jobName.textContent = result.name;
  jobFlavor.textContent = result.flavor;
  jobDesc.textContent = result.desc;

  traitList.innerHTML = "";
  result.traits.forEach((trait) => {
    const chip = document.createElement("span");
    chip.className = "trait";
    chip.textContent = trait;
    traitList.appendChild(chip);
  });

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
}

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", startQuiz);
