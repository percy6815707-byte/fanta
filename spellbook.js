(() => {
  const LOADOUT_STORAGE_KEY = "fanta_spell_loadout_v1";
  const FORMULA_BOOK_STORAGE_KEY = "fanta_formula_book_v2";
  const MAX_HEARTS = 12;
  const DEFAULT_SLOTS = ["frostShard", "fireball", "venomVine", "skyOfEmbers"];
  const DEFAULT_FORMULAS = [
    { id: "formula_1", name: "술식 1", spellIds: ["frostShard", "fireball", "venomVine", "skyOfEmbers"] },
    { id: "formula_2", name: "술식 2", spellIds: ["freezingVeil", "blastBrand", "natureGrace", "magmaEruption"] },
    { id: "formula_3", name: "술식 3", spellIds: ["manaSpring", "frostShackle", "lifeSprout", "dryadOfGreatForest"] }
  ];

  const spells = [
    { id: "frostShard", name: "서리 파편", color: "청", circle: 1, heartCost: 1, manaCost: 12 },
    { id: "freezingVeil", name: "결빙의 장막", color: "청", circle: 2, heartCost: 2, manaCost: 22 },
    { id: "manaSpring", name: "에테르 우물", color: "청", circle: 2, heartCost: 2, manaCost: 18 },
    { id: "frostShackle", name: "빙결의 족쇄", color: "청", circle: 3, heartCost: 3, manaCost: 31 },
    { id: "azureSiphon", name: "청맥 흡류", color: "청", circle: 3, heartCost: 3, manaCost: 30 },
    { id: "abyssalFrost", name: "극빙의 심연", color: "청", circle: 4, heartCost: 4, manaCost: 46 },
    { id: "aerisAzureSeal", name: "아에리스의 청색 봉인", color: "청", circle: 5, heartCost: 5, manaCost: 72 },
    { id: "fireball", name: "화염구", color: "적", circle: 1, heartCost: 1, manaCost: 13 },
    { id: "blastBrand", name: "폭열 낙인", color: "적", circle: 2, heartCost: 2, manaCost: 24 },
    { id: "magmaEruption", name: "용암 분출", color: "적", circle: 3, heartCost: 3, manaCost: 34 },
    { id: "skyOfEmbers", name: "불꽃이 내리는 하늘", color: "적", circle: 4, heartCost: 4, manaCost: 49 },
    { id: "purgatoriumFlame", name: "푸르가토리움의 화염", color: "적", circle: 5, heartCost: 5, manaCost: 70 },
    { id: "lifeSprout", name: "생명의 싹", color: "녹", circle: 1, heartCost: 1, manaCost: 10 },
    { id: "venomVine", name: "독침 덩굴", color: "녹", circle: 2, heartCost: 2, manaCost: 22 },
    { id: "natureGrace", name: "자연의 가호", color: "녹", circle: 3, heartCost: 3, manaCost: 32 },
    { id: "dryadOfGreatForest", name: "대삼림의 드라이어드", color: "녹", circle: 4, heartCost: 4, manaCost: 46 },
    { id: "cerisFinGarden", name: "세리스 핀의 마계정원", color: "녹", circle: 5, heartCost: 5, manaCost: 72 }
  ];

  const byId = Object.fromEntries(spells.map((spell) => [spell.id, spell]));
  const sorted = [...spells].sort((a, b) => {
    const order = { "청": 1, "적": 2, "녹": 3 };
    return (order[a.color] - order[b.color]) || (a.circle - b.circle) || a.name.localeCompare(b.name);
  });

  const dom = {
    tabs: document.getElementById("formula-tabs"),
    nameInput: document.getElementById("formula-name"),
    slotForm: document.getElementById("slot-form"),
    heartInfo: document.getElementById("heart-info"),
    saveBtn: document.getElementById("save-btn"),
    saveMsg: document.getElementById("save-msg")
  };

  let currentFormulaIndex = 0;
  let formulaBook = null;

  function totalHearts(slots) {
    return slots.reduce((sum, id) => sum + (byId[id]?.heartCost || 0), 0);
  }

  function sanitizeSlots(slots) {
    if (!Array.isArray(slots) || slots.length !== 4) return null;
    if (slots.some((id) => !byId[id])) return null;
    if (totalHearts(slots) > MAX_HEARTS) return null;
    return [...slots];
  }

  function sanitizeFormula(formula) {
    if (!formula || typeof formula !== "object") return null;
    const spellIds = sanitizeSlots(formula.spellIds);
    if (!spellIds) return null;
    return {
      id: typeof formula.id === "string" && formula.id.trim() ? formula.id : `formula_${Math.random().toString(36).slice(2, 8)}`,
      name: typeof formula.name === "string" && formula.name.trim() ? formula.name.trim() : "이름 없는 술식",
      spellIds
    };
  }

  function sanitizeFormulaBook(candidate) {
    if (!candidate || typeof candidate !== "object") return null;
    if (!Array.isArray(candidate.formulas) || candidate.formulas.length !== 3) return null;
    const formulas = candidate.formulas.map(sanitizeFormula).filter(Boolean);
    if (formulas.length !== 3) return null;
    const activeFormulaIndex = Number.isInteger(candidate.activeFormulaIndex)
      ? Math.min(2, Math.max(0, candidate.activeFormulaIndex))
      : 0;
    return { schemaVersion: 2, maxFormulaSlots: 3, activeFormulaIndex, formulas };
  }

  function loadLegacySlots() {
    try {
      const raw = localStorage.getItem(LOADOUT_STORAGE_KEY);
      if (!raw) return [...DEFAULT_SLOTS];
      return sanitizeSlots(JSON.parse(raw)) || [...DEFAULT_SLOTS];
    } catch (error) {
      return [...DEFAULT_SLOTS];
    }
  }

  function defaultFormulaBook(baseSlots) {
    const first = sanitizeSlots(baseSlots) || [...DEFAULT_SLOTS];
    return {
      schemaVersion: 2,
      maxFormulaSlots: 3,
      activeFormulaIndex: 0,
      formulas: DEFAULT_FORMULAS.map((formula, index) => ({
        id: formula.id,
        name: formula.name,
        spellIds: index === 0 ? [...first] : [...formula.spellIds]
      }))
    };
  }

  function loadFormulaBook() {
    try {
      const raw = localStorage.getItem(FORMULA_BOOK_STORAGE_KEY);
      if (raw) {
        const parsed = sanitizeFormulaBook(JSON.parse(raw));
        if (parsed) return parsed;
      }
    } catch (error) {
      // Ignore invalid payload and fallback.
    }
    return defaultFormulaBook(loadLegacySlots());
  }

  function saveFormulaBook(book) {
    const valid = sanitizeFormulaBook(book);
    if (!valid) return false;
    localStorage.setItem(FORMULA_BOOK_STORAGE_KEY, JSON.stringify(valid));
    const active = valid.formulas[valid.activeFormulaIndex];
    localStorage.setItem(LOADOUT_STORAGE_KEY, JSON.stringify(active.spellIds));
    return true;
  }

  function optionLabel(spell) {
    return `${spell.name} | ${spell.color} ${spell.circle}서클 | MP ${spell.manaCost} | 하트 ${spell.heartCost}`;
  }

  function currentFormula() {
    return formulaBook.formulas[currentFormulaIndex];
  }

  function renderTabs() {
    dom.tabs.innerHTML = "";
    formulaBook.formulas.forEach((formula, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "formula-tab";
      if (index === currentFormulaIndex) btn.classList.add("active");
      const active = formulaBook.activeFormulaIndex === index ? " (활성)" : "";
      btn.textContent = `${index + 1}번 술식${active}`;
      btn.addEventListener("click", () => {
        currentFormulaIndex = index;
        render();
      });
      dom.tabs.appendChild(btn);
    });
  }

  function renderSlots() {
    const formula = currentFormula();
    const options = sorted
      .map((spell) => `<option value="${spell.id}">${optionLabel(spell)}</option>`)
      .join("");

    dom.slotForm.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const box = document.createElement("div");
      box.className = "slot-item";
      box.innerHTML = `
        <label for="slot-${i}">주문 슬롯 ${i + 1}</label>
        <select id="slot-${i}">${options}</select>
      `;
      const select = box.querySelector("select");
      select.value = formula.spellIds[i];
      select.addEventListener("change", () => {
        const before = [...formula.spellIds];
        formula.spellIds[i] = select.value;
        if (totalHearts(formula.spellIds) > MAX_HEARTS) {
          formula.spellIds = before;
          select.value = before[i];
          dom.saveMsg.textContent = "하트 한도를 초과했습니다.";
          dom.saveMsg.style.color = "#ffb2a0";
          return;
        }
        dom.saveMsg.textContent = "";
        dom.heartInfo.textContent = `마나 하트: ${totalHearts(formula.spellIds)} / ${MAX_HEARTS}`;
      });
      dom.slotForm.appendChild(box);
    }
  }

  function render() {
    const formula = currentFormula();
    dom.nameInput.value = formula.name;
    dom.heartInfo.textContent = `마나 하트: ${totalHearts(formula.spellIds)} / ${MAX_HEARTS}`;
    renderTabs();
    renderSlots();
  }

  dom.nameInput.addEventListener("input", () => {
    currentFormula().name = dom.nameInput.value.trim() || "이름 없는 술식";
    dom.saveMsg.textContent = "";
    renderTabs();
  });

  dom.saveBtn.addEventListener("click", () => {
    formulaBook.activeFormulaIndex = currentFormulaIndex;
    if (!saveFormulaBook(formulaBook)) {
      dom.saveMsg.textContent = "저장 실패: 하트 한도와 술식 구성을 확인하세요.";
      dom.saveMsg.style.color = "#ffb2a0";
      return;
    }
    dom.saveMsg.textContent = "저장 완료. 전투 화면에서 즉시 반영됩니다.";
    dom.saveMsg.style.color = "#b8dfff";
    renderTabs();
  });

  formulaBook = loadFormulaBook();
  currentFormulaIndex = formulaBook.activeFormulaIndex;
  render();
})();
