(() => {
  const LOADOUT_STORAGE_KEY = "fanta_spell_loadout_v1";
  const FORMULA_BOOK_STORAGE_KEY = "fanta_formula_book_v2";
  const UNLOCKED_SPELLS_STORAGE_KEY = "fanta_unlocked_spells_v1";
  const UNLOCKED_CORES_STORAGE_KEY = "fanta_unlocked_cores_v1";
  const FRAME_STYLE_STORAGE_KEY = "fanta_frame_style_v1";
  const FONT_WEIGHT_STORAGE_KEY = "fanta_font_weight_v1";
  const STORY_PROGRESS_STORAGE_KEY = "fanta_story_progress_v1";
  const STARTING_TRAIT_STORAGE_KEY = "fanta_starting_trait_v1";
  const STARTING_TRAIT_OFFER_STORAGE_KEY = "fanta_starting_trait_offer_v1";
  const STORY_REVEAL_SPEED_STORAGE_KEY = "fanta_story_reveal_speed_v1";
  const PROGRESS_RESET_VERSION_KEY = "fanta_progress_reset_version";
  const BOOT_RESET_SESSION_KEY = "fanta_boot_reset_done_v1";
  const RESET_ALL_PROGRESS_ON_EACH_BOOT = false;
  const MAX_HEARTS = 12;
  const DEFAULT_CORE_ID = "core_balanced";
  const CORE_LIBRARY = {
    core_balanced: { id: "core_balanced", rarity: "common", name: "낡은 마도서", cols: 3, rows: 3, blocked: [], passiveText: "[일반] 전투 시작 시 마나 +1 | 기본 마나재생 +1/s" },
    core_lance: {
      id: "core_lance",
      rarity: "common",
      name: "빛바랜 오브",
      cols: 4,
      rows: 4,
      blocked: [[0, 0], [2, 0], [3, 0], [3, 1], [0, 2], [0, 3], [1, 3], [3, 3]],
      passiveText: "[일반] 주문 2회 발동마다 마나 +2 | 기본 마나재생 +2/s"
    },
    core_bastion: { id: "core_bastion", rarity: "common", name: "고목나무 지팡이", cols: 2, rows: 4, blocked: [], passiveText: "[일반] 2서클 이상 주문 피해 +1 | 기본 마나재생 +1/s" },
    core_grimoire_plus: { id: "core_grimoire_plus", rarity: "rare", name: "고급 마도서", cols: 4, rows: 4, blocked: [], passiveText: "[희귀] 전투 시작 시 마나 +8 | 기본 마나재생 +2/s" },
    core_frozen_staff: { id: "core_frozen_staff", rarity: "rare", name: "얼어붙은 지팡이", cols: 5, rows: 4, blocked: [[0, 0], [4, 0]], passiveText: "[희귀] 한기/둔화/동결 부여 시 스택 +2 | 기본 마나재생 +2/s" },
    core_morellonomicon: { id: "core_morellonomicon", rarity: "legendary", name: "모렐로노미콘", cols: 5, rows: 5, blocked: [], passiveText: "[전설] 전투 시작 시 마나 +50 | 기본 마나재생 +3/s" },
    core_inferno_orb: { id: "core_inferno_orb", rarity: "legendary", name: "연옥의 오브", cols: 6, rows: 4, blocked: [[0, 0], [5, 0], [0, 3], [5, 3]], passiveText: "[전설] 모든 적색 술식 2회 발동 | 기본 마나재생 +3/s" }
  };
  const STARTER_CORE_IDS = ["core_balanced"];
  const STARTER_SPELL_IDS = [
    "red_flame_shard",
    "red_heat_stock"
  ];
  const DEFAULT_SLOTS = ["red_flame_shard", "red_heat_stock"];
  const DEFAULT_FORMULAS = [
    { id: "formula_1", name: "기초 술식", coreId: "core_balanced", spellIds: ["red_flame_shard", "red_heat_stock"], gridLayout: {} },
    { id: "formula_2", name: "잠긴 술식 II", coreId: "core_lance", spellIds: ["red_flame_shard", "red_heat_stock"], gridLayout: {} },
    { id: "formula_3", name: "잠긴 술식 III", coreId: "core_bastion", spellIds: ["red_flame_shard", "red_heat_stock"], gridLayout: {} }
  ];

  const dom = {
    tabs: document.getElementById("formula-tabs"),
    nameInput: document.getElementById("formula-name"),
    coreSelect: document.getElementById("formula-core"),
    circleSlots: document.getElementById("circle-slots"),
    catalog: document.getElementById("spell-catalog"),
    colorFilter: document.getElementById("catalog-color-filter"),
    circleFilter: document.getElementById("catalog-circle-filter"),
    heartInfo: document.getElementById("heart-info"),
    saveBtn: document.getElementById("save-btn"),
    saveMsg: document.getElementById("save-msg")
  };

  let spells = [];
  let byId = {};
  let sorted = [];
  let sortedUnlocked = [];
  let currentFormulaIndex = 0;
  let formulaBook = null;
  let unlockedSet = new Set();
  let unlockedCoreSet = new Set();
  let selectedSlotIndex = 1;
  let draggingSpellId = null;
  const MANA_CRYSTAL_ICON_PATH = "assets/status/mana_crystal.svg";

  function resetAllProgressForFreshBoot() {
    if (!RESET_ALL_PROGRESS_ON_EACH_BOOT) return;
    try {
      if (sessionStorage.getItem(BOOT_RESET_SESSION_KEY) === "1") return;
      sessionStorage.setItem(BOOT_RESET_SESSION_KEY, "1");
    } catch {
      // ignore and continue reset
    }
    try {
      [
        UNLOCKED_SPELLS_STORAGE_KEY,
        UNLOCKED_CORES_STORAGE_KEY,
        LOADOUT_STORAGE_KEY,
        FORMULA_BOOK_STORAGE_KEY,
        STORY_PROGRESS_STORAGE_KEY,
        STARTING_TRAIT_STORAGE_KEY,
        STARTING_TRAIT_OFFER_STORAGE_KEY,
        STORY_REVEAL_SPEED_STORAGE_KEY,
        FRAME_STYLE_STORAGE_KEY,
        FONT_WEIGHT_STORAGE_KEY,
        PROGRESS_RESET_VERSION_KEY
      ].forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
  }

  function colorKo(color) {
    const map = { red: "적", blue: "청", yellow: "황", green: "녹", white: "백", black: "흑" };
    return map[color] || color;
  }

  function spellIconPathById(spellId) {
    const starterIcons = {
      red_flame_shard: "assets/spells/v2/starter_basic_bolt.svg",
      red_heat_stock: "assets/spells/v2/starter_basic_focus.svg"
    };
    return starterIcons[spellId] || `assets/spells/v2/${spellId}.svg`;
  }

  function statusKo(id) {
    const map = {
      burn: "화상",
      poison: "중독",
      slow: "둔화",
      freeze: "동결",
      stun: "봉인",
      weak: "약화",
      petrify: "석화",
      blind: "실명",
      confuse: "혼란"
    };
    return map[id] || id;
  }

  function hashCode(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function rotateCell(cell, turns) {
    const t = ((turns % 4) + 4) % 4;
    if (t === 0) return [cell[0], cell[1]];
    if (t === 1) return [cell[1], -cell[0]];
    if (t === 2) return [-cell[0], -cell[1]];
    return [-cell[1], cell[0]];
  }

  function normalizeCells(cells) {
    let minX = Infinity;
    let minY = Infinity;
    cells.forEach(([x, y]) => {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
    });
    return cells.map(([x, y]) => [x - minX, y - minY]);
  }

  function makeCircleShape(circle) {
    if (circle <= 1) return [[0, 0]];
    if (circle === 2) return [[0, 0], [1, 0]];
    if (circle === 3) return [[0, 0], [1, 0], [0, 1]];
    if (circle === 4) return [[0, 0], [1, 0], [0, 1], [1, 1]];
    return [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]];
  }

  function makeShapeVariants(circle) {
    const base = makeCircleShape(circle);
    const seen = new Set();
    const out = [];
    for (let i = 0; i < 4; i += 1) {
      const rotated = normalizeCells(base.map((c) => rotateCell(c, i)));
      const key = JSON.stringify(rotated.sort((a, b) => (a[1] - b[1]) || (a[0] - b[0])));
      if (!seen.has(key)) {
        seen.add(key);
        out.push(rotated);
      }
    }
    return out;
  }

  function totalHearts(slots) {
    return slots.reduce((sum, id) => sum + (byId[id]?.heartCost || 0), 0);
  }

  function normalizeUnlockedIds(ids) {
    const source = Array.isArray(ids) ? ids : STARTER_SPELL_IDS;
    const normalized = source.filter((id) => byId[id]);
    STARTER_SPELL_IDS.forEach((id) => {
      if (byId[id] && !normalized.includes(id)) normalized.push(id);
    });
    return normalized;
  }

  function loadUnlockedSet() {
    try {
      const raw = localStorage.getItem(UNLOCKED_SPELLS_STORAGE_KEY);
      if (!raw) return new Set(normalizeUnlockedIds(STARTER_SPELL_IDS));
      return new Set(normalizeUnlockedIds(JSON.parse(raw)));
    } catch {
      return new Set(normalizeUnlockedIds(STARTER_SPELL_IDS));
    }
  }

  function isUnlocked(spellId) {
    return unlockedSet.has(spellId);
  }

  function normalizeUnlockedCoreIds(ids) {
    const source = Array.isArray(ids) ? ids : STARTER_CORE_IDS;
    const normalized = source.filter((id) => CORE_LIBRARY[id]);
    STARTER_CORE_IDS.forEach((id) => {
      if (CORE_LIBRARY[id] && !normalized.includes(id)) normalized.push(id);
    });
    return normalized;
  }

  function loadUnlockedCoreSet() {
    try {
      const raw = localStorage.getItem(UNLOCKED_CORES_STORAGE_KEY);
      if (!raw) return new Set(normalizeUnlockedCoreIds(STARTER_CORE_IDS));
      return new Set(normalizeUnlockedCoreIds(JSON.parse(raw)));
    } catch {
      return new Set(normalizeUnlockedCoreIds(STARTER_CORE_IDS));
    }
  }

  function isCoreUnlocked(coreId) {
    return unlockedCoreSet.has(coreId);
  }

  function sanitizeSlots(slots) {
    if (!Array.isArray(slots) || slots.length < 1) return null;
    if (slots.some((id) => !byId[id] || !isUnlocked(id))) return null;
    if (totalHearts(slots) > MAX_HEARTS) return null;
    return [...slots];
  }

  function sanitizeGridLayout(layout) {
    if (!layout || typeof layout !== "object") return {};
    return Object.fromEntries(
      Object.entries(layout)
        .filter(([k, v]) => typeof k === "string" && v && typeof v === "object")
        .map(([k, v]) => [k, {
          x: Number.isFinite(v.x) ? Math.floor(v.x) : 0,
          y: Number.isFinite(v.y) ? Math.floor(v.y) : 0,
          variant: Number.isFinite(v.variant) ? Math.floor(v.variant) : 0
        }])
    );
  }

  function sanitizeFormula(formula) {
    if (!formula || typeof formula !== "object") return null;
    const seedSpellIds = Array.isArray(formula.spellIds) ? formula.spellIds : [];
    const slotMap = defaultActionSlots();
    if (formula.slotMap && typeof formula.slotMap === "object") {
      [1, 2, 3, 4].forEach((slotIndex) => {
        const spellId = formula.slotMap[slotIndex];
        const spell = byId[spellId];
        if (!spell || !isUnlocked(spellId)) return;
        slotMap[slotIndex] = spellId;
      });
    }
    seedSpellIds.forEach((spellId, i) => {
      const spell = byId[spellId];
      if (!spell || !isUnlocked(spellId)) return;
      const slotIndex = i + 1;
      if (slotIndex < 1 || slotIndex > 4) return;
      if (!slotMap[slotIndex]) slotMap[slotIndex] = spellId;
    });
    const spellIds = spellIdsFromActionSlots(slotMap);
    if (spellIds.length < 1) return null;
    return {
      id: typeof formula.id === "string" && formula.id.trim() ? formula.id : `formula_${Math.random().toString(36).slice(2, 8)}`,
      name: typeof formula.name === "string" && formula.name.trim() ? formula.name.trim() : "이름 없는 술식",
      coreId: (typeof formula.coreId === "string" && CORE_LIBRARY[formula.coreId]) ? formula.coreId : DEFAULT_CORE_ID,
      spellIds,
      slotMap,
      gridLayout: {}
    };
  }

  function sanitizeFormulaBook(candidate) {
    if (!candidate || typeof candidate !== "object") return null;
    if (!Array.isArray(candidate.formulas) || candidate.formulas.length !== 3) return null;
    const formulas = candidate.formulas.map(sanitizeFormula).filter(Boolean);
    if (formulas.length !== 3) return null;
    const activeFormulaIndex = Number.isInteger(candidate.activeFormulaIndex) ? Math.min(2, Math.max(0, candidate.activeFormulaIndex)) : 0;
    return { schemaVersion: 2, maxFormulaSlots: 3, activeFormulaIndex, formulas };
  }

  function loadLegacySlots() {
    try {
      const raw = localStorage.getItem(LOADOUT_STORAGE_KEY);
      if (!raw) return [...DEFAULT_SLOTS];
      return sanitizeSlots(JSON.parse(raw)) || [...DEFAULT_SLOTS];
    } catch {
      return [...DEFAULT_SLOTS];
    }
  }

  function defaultFormulaBook(baseSlots) {
    const first = sanitizeSlots(baseSlots) || [...DEFAULT_SLOTS];
    const firstSlotMap = defaultActionSlots();
    first.forEach((spellId, i) => {
      const slotIndex = i + 1;
      if (slotIndex >= 1 && slotIndex <= 4 && !firstSlotMap[slotIndex]) firstSlotMap[slotIndex] = spellId;
    });
    return {
      schemaVersion: 2,
      maxFormulaSlots: 3,
      activeFormulaIndex: 0,
      formulas: DEFAULT_FORMULAS.map((formula, index) => ({
        id: formula.id,
        name: formula.name,
        coreId: formula.coreId || DEFAULT_CORE_ID,
        spellIds: index === 0 ? spellIdsFromActionSlots(firstSlotMap) : [...formula.spellIds],
        slotMap: index === 0 ? { ...firstSlotMap } : defaultActionSlots(),
        gridLayout: {}
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
    } catch {
      // ignore
    }
    return defaultFormulaBook(loadLegacySlots());
  }

  function saveFormulaBook(book) {
    const valid = sanitizeFormulaBook(book);
    if (!valid) return false;
    localStorage.setItem(FORMULA_BOOK_STORAGE_KEY, JSON.stringify(valid));
    localStorage.setItem(LOADOUT_STORAGE_KEY, JSON.stringify(valid.formulas[valid.activeFormulaIndex].spellIds));
    return true;
  }

  function currentFormula() {
    return formulaBook.formulas[currentFormulaIndex];
  }

  function currentCore() {
    const formula = currentFormula();
    return CORE_LIBRARY[formula?.coreId] || CORE_LIBRARY[DEFAULT_CORE_ID];
  }

  function defaultActionSlots() {
    return { 1: null, 2: null, 3: null, 4: null };
  }

  function spellIdsFromActionSlots(slotMap) {
    const out = [];
    [1, 2, 3, 4].forEach((slotIndex) => {
      const spellId = slotMap[slotIndex];
      if (!spellId || !byId[spellId]) return;
      if (!isUnlocked(spellId)) return;
      out.push(spellId);
    });
    return out;
  }

  function ensureFormulaActionSlots(formula) {
    const next = defaultActionSlots();
    if (formula && formula.slotMap && typeof formula.slotMap === "object") {
      [1, 2, 3, 4].forEach((slotIndex) => {
        const spellId = formula.slotMap[slotIndex];
        if (!spellId || !byId[spellId]) return;
        if (!isUnlocked(spellId)) return;
        next[slotIndex] = spellId;
      });
    }
    (Array.isArray(formula.spellIds) ? formula.spellIds : []).forEach((spellId, i) => {
      const slotIndex = i + 1;
      if (slotIndex > 4) return;
      const spell = byId[spellId];
      if (!spell) return;
      if (!next[slotIndex]) next[slotIndex] = spellId;
    });
    formula.slotMap = next;
    formula.spellIds = spellIdsFromActionSlots(next);
  }

  function renderTabs() {
    dom.tabs.innerHTML = "";
    formulaBook.formulas.forEach((formula, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "formula-tab";
      if (index === currentFormulaIndex) btn.classList.add("active");
      btn.textContent = `${index + 1}번 술식${formulaBook.activeFormulaIndex === index ? " (활성)" : ""}`;
      btn.addEventListener("click", () => { currentFormulaIndex = index; render(); });
      dom.tabs.appendChild(btn);
    });
  }

  function renderCoreSelect() {
    if (!dom.coreSelect) return;
    const formula = currentFormula();
    const rarityOrder = { common: 1, rare: 2, legendary: 3 };
    const rarityKo = { common: "일반", rare: "희귀", legendary: "전설" };
    const options = Object.values(CORE_LIBRARY)
      .sort((a, b) => (rarityOrder[a.rarity] - rarityOrder[b.rarity]) || a.name.localeCompare(b.name))
      .map((core) => {
        const unlocked = isCoreUnlocked(core.id);
        const lockText = unlocked ? "" : " [잠김]";
        return `<option value="${core.id}" ${unlocked ? "" : "disabled"}>[${rarityKo[core.rarity] || "일반"}] ${core.name}${lockText} (${core.cols}x${core.rows}) - ${core.passiveText || ""}</option>`;
      })
      .join("");
    dom.coreSelect.innerHTML = options;
    const chosen = (formula.coreId && CORE_LIBRARY[formula.coreId] && isCoreUnlocked(formula.coreId))
      ? formula.coreId
      : DEFAULT_CORE_ID;
    formula.coreId = chosen;
    dom.coreSelect.value = chosen;
  }

  function normalizeFormulaSpells(formula) {
    ensureFormulaActionSlots(formula);
    formula.spellIds = spellIdsFromActionSlots(formula.slotMap);
  }

  function spellDetailText(spell) {
    if (!spell) return "장착 해제됨";
    const raw = rawById[spell.id] || {};
    const effects = [
      ...((raw.effects || []).map((effect) => effectText(effect, spell.color))),
      ...((raw.linkSynergy || []).map((rule) => linkSynergyText(rule)))
    ];
    return `${spell.name} | ${colorKo(spell.color)} ${spell.circle}서클 | MP ${spell.manaCost} | 하트 ${spell.heartCost} :: ${effects.join(" / ") || (raw.notes || "-")}`;
  }

  function setSlotSpell(slotIndex, spellId) {
    const formula = currentFormula();
    ensureFormulaActionSlots(formula);
    const slots = formula.slotMap;
    if (!Number.isInteger(slotIndex) || slotIndex < 1 || slotIndex > 4) return false;
    if (spellId && (!byId[spellId] || !isUnlocked(spellId))) return false;
    const beforeIds = spellIdsFromActionSlots(slots);
    const beforeCount = beforeIds.length;

    [1, 2, 3, 4].forEach((idx) => {
      if (idx !== slotIndex && slots[idx] === spellId) slots[idx] = null;
    });
    slots[slotIndex] = spellId || null;
    const afterIds = spellIdsFromActionSlots(slots);
    if (beforeCount > 0 && afterIds.length < 1) {
      slots[slotIndex] = beforeIds[0];
      formula.spellIds = spellIdsFromActionSlots(slots);
      dom.saveMsg.textContent = "최소 1개 주문은 장착되어야 합니다.";
      dom.saveMsg.style.color = "#ffb2a0";
      return false;
    }
    formula.spellIds = afterIds;
    dom.saveMsg.textContent = "";
    dom.saveMsg.style.color = "#b8dfff";
    render();
    return true;
  }

  function renderCircleSlots() {
    const formula = currentFormula();
    ensureFormulaActionSlots(formula);
    const slots = formula.slotMap;
    dom.circleSlots.innerHTML = "";
    const detailNode = document.createElement("div");
    detailNode.className = "slot-spell-detail";
    detailNode.textContent = "주문 도감 카드를 슬롯으로 드래그해서 장착하세요.";
    const showDetail = (spell) => {
      detailNode.textContent = spellDetailText(spell);
    };
    [1, 2, 3, 4].forEach((slotIndex) => {
      const row = document.createElement("div");
      row.className = "circle-slot-row";
      if (selectedSlotIndex === slotIndex) row.classList.add("active");
      const equippedId = slots[slotIndex] || "";
      row.innerHTML = `
        <label class="circle-slot-label">슬롯 ${slotIndex}</label>
        <div class="circle-slot-cards"></div>
      `;
      const cardWrap = row.querySelector(".circle-slot-cards");
      if (equippedId && byId[equippedId]) {
        const spell = byId[equippedId];
        const card = document.createElement("button");
        card.type = "button";
        card.className = `circle-spell-card selected ${spell.color}`;
        const iconPath = spellIconPathById(spell.id);
        card.innerHTML = `
          <div class="circle-spell-head">
            <span class="circle-spell-icon"${iconPath ? ` style="background-image:url('${iconPath}')"` : ""}></span>
            <strong>${spell.name}</strong>
          </div>
          <span>${colorKo(spell.color)} ${spell.circle}서클 | MP ${spell.manaCost}</span>
        `;
        card.addEventListener("mouseenter", () => showDetail(spell));
        card.addEventListener("focus", () => showDetail(spell));
        card.addEventListener("touchstart", () => showDetail(spell), { passive: true });
        card.addEventListener("click", () => {
          selectedSlotIndex = slotIndex;
          showDetail(spell);
          renderCircleSlots();
        });
        cardWrap.appendChild(card);

        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.className = "slot-clear-btn";
        clearBtn.textContent = "장착 해제";
        clearBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          setSlotSpell(slotIndex, null);
        });
        cardWrap.appendChild(clearBtn);
      } else {
        const empty = document.createElement("p");
        empty.className = "circle-slot-empty";
        empty.textContent = "여기에 주문을 드래그";
        cardWrap.appendChild(empty);
      }

      row.addEventListener("click", () => {
        selectedSlotIndex = slotIndex;
        renderCircleSlots();
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        row.classList.add("drag-over");
      });
      row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
      row.addEventListener("drop", (event) => {
        event.preventDefault();
        row.classList.remove("drag-over");
        const spellId = event.dataTransfer?.getData("text/plain") || draggingSpellId;
        if (!spellId) return;
        selectedSlotIndex = slotIndex;
        setSlotSpell(slotIndex, spellId);
      });
      dom.circleSlots.appendChild(row);
    });
    dom.circleSlots.appendChild(detailNode);
  }

  function render() {
    const formula = currentFormula();
    normalizeFormulaSpells(formula);
    dom.nameInput.value = formula.name;
    dom.heartInfo.textContent = `마나 하트: ${totalHearts(formula.spellIds)} / ${MAX_HEARTS}`;
    renderTabs();
    renderCoreSelect();
    renderCircleSlots();
    renderCatalog();
  }

  function statusIconPath(effect, spellColor) {
    if (effect.type === "silence") return "assets/status/freeze.svg";
    if (effect.type === "frostSlow") return "assets/status/slow.svg";
    if (effect.type === "status") return effect.id ? `assets/status/${effect.id}.svg` : "";
    if (effect.type === "regen" || effect.type === "hot") return "assets/status/regen.svg";
    if (effect.type === "dot") return (spellColor === "green" || spellColor === "black") ? "assets/status/poison.svg" : "assets/status/burn.svg";
    return "";
  }

  function effectText(e, spellColor) {
    if (e.type === "damage") return `직접 피해 ${e.value}`;
    if (e.type === "conditionalDamage") return `조건부 피해 ${e.value}`;
    if (e.type === "heal") return `체력 회복 ${e.value}`;
    if (e.type === "shield") return `보호막 ${e.value}`;
    if (e.type === "manaGain") return `즉시 마나 +${e.value}`;
    if (e.type === "manaOnEvent") {
      const map = {
        onDamageDealt: "피해를 주면",
        onControlApplied: "제어 효과를 부여하면"
      };
      return `${map[e.event] || "이벤트 성공 시"} 마나 +${e.value || 1}`;
    }
    if (e.type === "manaOnCondition") {
      const map = {
        selfShieldPositive: "내 보호막이 남아있으면",
        selfManaLow: "내 마나가 낮으면"
      };
      return `${map[e.condition] || "조건 만족 시"} 마나 +${e.value || 1}`;
    }
    if (e.type === "manaReduce") return `상대 마나 -${e.value}`;
    if (e.type === "manaDelete") return "상대 마나 전량 삭제";
    if (e.type === "silence") return `봉인 상태부여 (${e.duration || 1}초)`;
    if (e.type === "dot") return `${(spellColor === "green" || spellColor === "black") ? "중독" : "화상"} 상태부여 (${e.duration || 2}초, ${e.value})`;
    if (e.type === "status") return `${statusKo(e.id)} 상태부여 (${e.duration || 2}초)`;
    if (e.type === "regen") return `재생 상태부여 (${e.duration || 2}초, ${e.value}/초)`;
    if (e.type === "hot") return `재생 상태부여 (${e.duration || 2}초, ${e.value || 1}/초)`;
    if (e.type === "frostSlow") return `둔화 상태부여 (${e.duration || 2}초, ${e.slowPct || 10}%)`;
    if (e.type === "cooldownAdd") return `상대 쿨다운 +${e.value || 0}초`;
    if (e.type === "castRateMultiplier") return `시전속도 배율 x${e.value || 1}`;
    if (e.type === "nullifyNextCast") return "다음 시전 무효화";
    if (e.type === "freezeAllEffects") return "적 효과 일시 동결";
    if (e.type === "allyColorDamageBonus") return `아군 ${colorKo(e.color || spellColor)}색 피해 +${e.value || 0}`;
    return e.type;
  }

  function effectHtml(effect, spellColor) {
    const icon = statusIconPath(effect, spellColor);
    const text = effectText(effect, spellColor);
    const debuffTypes = new Set(["dot", "silence", "frostSlow", "status", "manaReduce", "manaDelete", "cooldownAdd", "nullifyNextCast"]);
    const buffTypes = new Set(["regen", "hot", "shield", "heal", "manaGain", "manaOnEvent", "manaOnCondition", "manaFlow", "castRateMultiplier", "allyColorDamageBonus"]);
    const tone = debuffTypes.has(effect.type) ? "debuff" : (buffTypes.has(effect.type) ? "buff" : "neutral");
    const toneLabel = tone === "debuff" ? "디버프" : (tone === "buff" ? "버프" : "기타");
    const iconHtml = icon ? `<img src="${icon}" alt="" class="effect-icon">` : "";
    return `<span class="effect-line ${tone}">${iconHtml}<span>${text}</span><em class="effect-tone">${toneLabel}</em></span>`;
  }

  function linkSynergyText(rule) {
    const colorLabel = colorKo(rule.neighborColor || "all");
    if (rule.effect === "self_regen") return `공명: 인접 ${colorLabel} 1개당 재생 +${rule.scale || 1} (${rule.duration || 5}초)`;
    if (rule.effect === "self_heal") return `공명: 인접 ${colorLabel} 1개당 즉시 회복 +${rule.scale || 1}`;
    if (rule.effect === "self_mana") return `공명: 인접 ${colorLabel} 1개당 마나 +${rule.scale || 1}`;
    if (rule.effect === "self_shield") return `공명: 인접 ${colorLabel} 1개당 보호막 +${rule.scale || 1}`;
    if (rule.effect === "enemy_poison") return `공명: 인접 ${colorLabel} 1개당 중독 +${rule.scale || 1}`;
    if (rule.effect === "enemy_burn") return `공명: 인접 ${colorLabel} 1개당 화상 +${rule.scale || 1}`;
    if (rule.effect === "enemy_slow") return `공명: 인접 ${colorLabel} 1개당 둔화 부여`;
    if (rule.effect === "enemy_petrify") return `공명: 인접 ${colorLabel} 1개당 석화 부여`;
    if (rule.effect === "enemy_blind") return `공명: 인접 ${colorLabel} 1개당 실명 부여`;
    if (rule.effect === "enemy_confuse") return `공명: 인접 ${colorLabel} 1개당 혼란 부여`;
    if (rule.effect === "enemy_mana_burn") return `공명: 인접 ${colorLabel} 1개당 마나 소각 +${rule.scale || 1}`;
    return `공명: ${rule.effect}`;
  }

  function linkSynergyHtml(rule) {
    const text = linkSynergyText(rule);
    return `<span class="effect-line buff"><span>${text}</span><em class="effect-tone">공명</em></span>`;
  }

  function hasManaGeneration(raw) {
    return (raw.effects || []).some((e) => (
      e.type === "manaGain"
      || e.type === "manaOnEvent"
      || e.type === "manaOnCondition"
      || e.type === "hot"
      || e.type === "manaFlow"
    ));
  }

  function renderCatalog() {
    dom.catalog.innerHTML = "";
    const color = dom.colorFilter?.value || "all";
    const circle = dom.circleFilter?.value || "all";
    const usedSet = new Set(currentFormula().spellIds);
    sortedUnlocked
      .filter((spell) => (color === "all" ? true : spell.color === color))
      .filter((spell) => (circle === "all" ? true : String(spell.circle) === circle))
      .forEach((spell) => {
      const raw = rawById[spell.id];
      const card = document.createElement("article");
      card.className = `spell-card ${spell.color}`;
      if (usedSet.has(spell.id)) card.classList.add("used");
      card.dataset.spellId = spell.id;
      card.draggable = true;
      const effects = [
        ...(raw.effects || []).map((effect) => effectHtml(effect, spell.color)),
        ...((raw.linkSynergy || []).map((rule) => linkSynergyHtml(rule)))
      ];
      const manaMaker = hasManaGeneration(raw);
      card.innerHTML = `
        <div class="spell-card-head">
          <h3>${spell.name}</h3>
          <div class="spell-head-badges">
            ${manaMaker ? `<span class="spell-mana-badge"><img src="${MANA_CRYSTAL_ICON_PATH}" alt="마나 생성">마나 생성</span>` : ""}
            ${usedSet.has(spell.id) ? "<span class=\"spell-used-badge\">배치됨</span>" : ""}
          </div>
        </div>
        <p class="spell-meta"><span class="spell-color-dot ${spell.color}"></span>${colorKo(spell.color)} ${spell.circle}서클 | MP ${spell.manaCost} | 하트 ${spell.heartCost}</p>
        <p class="spell-effects">${effects.length > 0 ? effects.join("") : (raw.notes || "-")}</p>
      `;
      card.addEventListener("mouseenter", () => {
        const detail = dom.circleSlots.querySelector(".slot-spell-detail");
        if (detail) detail.textContent = spellDetailText(spell);
      });
      card.addEventListener("dragstart", (event) => {
        draggingSpellId = spell.id;
        card.classList.add("dragging");
        if (event.dataTransfer) {
          event.dataTransfer.setData("text/plain", spell.id);
          event.dataTransfer.effectAllowed = "copy";
        }
      });
      card.addEventListener("dragend", () => {
        draggingSpellId = null;
        card.classList.remove("dragging");
      });
      card.addEventListener("click", () => {
        setSlotSpell(selectedSlotIndex, spell.id);
      });
      dom.catalog.appendChild(card);
      });
    if (dom.catalog.childElementCount === 0) {
      dom.catalog.innerHTML = "<p class=\"catalog-empty\">조건에 맞는 보유 주문이 없습니다.</p>";
    }
  }

  const rawById = {};

  async function loadCatalog() {
    const response = await fetch("spell_catalog_v2.json", { cache: "no-store" });
    const payload = await response.json();
    spells = payload.spells.map((s) => {
      rawById[s.id] = s;
      return {
      id: s.id,
      name: s.name,
      color: s.color,
      circle: s.circle,
      heartCost: s.gridCost || s.circle,
      manaCost: s.manaCost
      };
    });
    byId = Object.fromEntries(spells.map((spell) => [spell.id, spell]));
    sorted = [...spells].sort((a, b) => {
      const order = { blue: 1, red: 2, yellow: 3, green: 4, white: 5, black: 6 };
      const oa = order[a.color] ?? 99;
      const ob = order[b.color] ?? 99;
      return (oa - ob) || (a.circle - b.circle) || a.name.localeCompare(b.name);
    });
    unlockedSet = loadUnlockedSet();
    sortedUnlocked = sorted.filter((spell) => isUnlocked(spell.id));
  }

  async function init() {
    resetAllProgressForFreshBoot();
    await loadCatalog();
    unlockedCoreSet = loadUnlockedCoreSet();
    formulaBook = loadFormulaBook();
    currentFormulaIndex = formulaBook.activeFormulaIndex;

    dom.nameInput.addEventListener("input", () => {
      currentFormula().name = dom.nameInput.value.trim() || "이름 없는 술식";
      dom.saveMsg.textContent = "";
      renderTabs();
    });

    if (dom.coreSelect) {
      dom.coreSelect.addEventListener("change", () => {
        const formula = currentFormula();
        const picked = dom.coreSelect.value;
        formula.coreId = (CORE_LIBRARY[picked] && isCoreUnlocked(picked)) ? picked : DEFAULT_CORE_ID;
        dom.saveMsg.textContent = "";
        renderCircleSlots();
      });
    }

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

    if (dom.colorFilter) dom.colorFilter.addEventListener("change", renderCatalog);
    if (dom.circleFilter) dom.circleFilter.addEventListener("change", renderCatalog);

    render();
  }

  init().catch(() => {
    dom.saveMsg.textContent = "주문 카탈로그를 불러오지 못했습니다.";
    dom.saveMsg.style.color = "#ffb2a0";
  });
})();
