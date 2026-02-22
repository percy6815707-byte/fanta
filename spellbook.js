(() => {
  const LOADOUT_STORAGE_KEY = "fanta_spell_loadout_v1";
  const FORMULA_BOOK_STORAGE_KEY = "fanta_formula_book_v2";
  const UNLOCKED_SPELLS_STORAGE_KEY = "fanta_unlocked_spells_v1";
  const UNLOCKED_CORES_STORAGE_KEY = "fanta_unlocked_cores_v1";
  const MAX_HEARTS = 12;
  const DEFAULT_CORE_ID = "core_balanced";
  const CORE_LIBRARY = {
    core_balanced: { id: "core_balanced", rarity: "common", name: "낡은 마도서", cols: 4, rows: 4, blocked: [], passiveText: "[일반] 전투 시작 시 마나 +1" },
    core_lance: { id: "core_lance", rarity: "common", name: "빛바랜 오브", cols: 5, rows: 5, blocked: [[0, 0], [4, 0], [0, 4], [4, 4]], passiveText: "[일반] 주문 3회 발동마다 마나 +1" },
    core_bastion: { id: "core_bastion", rarity: "common", name: "고목나무 지팡이", cols: 2, rows: 8, blocked: [], passiveText: "[일반] 2서클 이상 주문 피해 +1" },
    core_grimoire_plus: { id: "core_grimoire_plus", rarity: "rare", name: "고급 마도서", cols: 4, rows: 4, blocked: [], passiveText: "[희귀] 전투 시작 시 마나 +5" },
    core_frozen_staff: { id: "core_frozen_staff", rarity: "rare", name: "얼어붙은 지팡이", cols: 5, rows: 4, blocked: [[0, 0], [4, 0]], passiveText: "[희귀] 한기/둔화/동결 부여 시 스택 +1" },
    core_morellonomicon: { id: "core_morellonomicon", rarity: "legendary", name: "모렐로노미콘", cols: 5, rows: 5, blocked: [], passiveText: "[전설] 전투 시작 시 마나 +50" },
    core_inferno_orb: { id: "core_inferno_orb", rarity: "legendary", name: "연옥의 오브", cols: 6, rows: 4, blocked: [[0, 0], [5, 0], [0, 3], [5, 3]], passiveText: "[전설] 모든 적색 술식 2회 발동" }
  };
  const STARTER_CORE_IDS = ["core_balanced", "core_lance", "core_bastion"];
  const STARTER_SPELL_IDS = [
    "red_flame_shard",
    "red_heat_stock",
    "blue_frost_poke",
    "blue_chill_condense",
    "green_guard_bud",
    "green_life_breath"
  ];
  const DEFAULT_SLOTS = ["red_flame_shard", "blue_frost_poke", "green_guard_bud", "red_heat_stock"];
  const DEFAULT_FORMULAS = [
    { id: "formula_1", name: "술식 1", coreId: "core_balanced", spellIds: ["red_flame_shard", "blue_frost_poke", "green_guard_bud", "red_heat_stock"], gridLayout: {} },
    { id: "formula_2", name: "술식 2", coreId: "core_lance", spellIds: ["blue_chill_condense", "green_life_breath", "red_flame_shard", "green_guard_bud"], gridLayout: {} },
    { id: "formula_3", name: "술식 3", coreId: "core_bastion", spellIds: ["green_life_breath", "red_heat_stock", "blue_frost_poke", "green_guard_bud"], gridLayout: {} }
  ];

  const dom = {
    tabs: document.getElementById("formula-tabs"),
    nameInput: document.getElementById("formula-name"),
    coreSelect: document.getElementById("formula-core"),
    spellPool: document.getElementById("spell-pool"),
    grid: document.getElementById("formula-grid"),
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
  let dragState = null;
  let unlockedSet = new Set();
  let unlockedCoreSet = new Set();

  function colorKo(color) {
    return color === "red" ? "적" : color === "green" ? "녹" : "청";
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
    const spellIds = sanitizeSlots(formula.spellIds);
    if (!spellIds) return null;
    return {
      id: typeof formula.id === "string" && formula.id.trim() ? formula.id : `formula_${Math.random().toString(36).slice(2, 8)}`,
      name: typeof formula.name === "string" && formula.name.trim() ? formula.name.trim() : "이름 없는 술식",
      coreId: (typeof formula.coreId === "string" && CORE_LIBRARY[formula.coreId] && isCoreUnlocked(formula.coreId)) ? formula.coreId : DEFAULT_CORE_ID,
      spellIds,
      gridLayout: sanitizeGridLayout(formula.gridLayout)
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
    return {
      schemaVersion: 2,
      maxFormulaSlots: 3,
      activeFormulaIndex: 0,
      formulas: DEFAULT_FORMULAS.map((formula, index) => ({
        id: formula.id,
        name: formula.name,
        coreId: formula.coreId || DEFAULT_CORE_ID,
        spellIds: index === 0 ? [...first] : [...formula.spellIds],
        gridLayout: sanitizeGridLayout(formula.gridLayout)
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

  function slotEntries(formula) {
    return formula.spellIds.map((id, slotIndex) => {
      const spell = byId[id];
      return spell ? { ...spell, slotIndex, itemKey: id, legacyItemKey: `${id}@${slotIndex}` } : null;
    }).filter(Boolean);
  }

  function buildLayout(entries, manualLayout, core) {
    const cols = core?.cols || CORE_LIBRARY[DEFAULT_CORE_ID].cols;
    const rows = core?.rows || CORE_LIBRARY[DEFAULT_CORE_ID].rows;
    const blockedSet = new Set((core?.blocked || []).map(([x, y]) => `${x},${y}`));
    const occupied = Array.from({ length: rows }, () => Array(cols).fill(null));
    const placed = [];
    const pending = [];

    function fits(shape, x, y) {
      for (const [sx, sy] of shape) {
        const px = x + sx;
        const py = y + sy;
        if (px < 0 || py < 0 || px >= cols || py >= rows) return false;
        if (blockedSet.has(`${px},${py}`)) return false;
        if (occupied[py][px]) return false;
      }
      return true;
    }

    function place(entry, shape, x, y, variant) {
      if (!fits(shape, x, y)) return false;
      shape.forEach(([sx, sy]) => { occupied[y + sy][x + sx] = entry.itemKey; });
      placed.push({ ...entry, shape, x, y, variant });
      return true;
    }

    entries.forEach((entry) => {
      const preset = manualLayout[entry.itemKey] || manualLayout[entry.legacyItemKey];
      if (!preset) {
        pending.push(entry);
        return;
      }
      const variants = makeShapeVariants(entry.circle);
      const variant = Math.max(0, preset.variant || 0) % variants.length;
      if (!place(entry, variants[variant], Math.floor(preset.x || 0), Math.floor(preset.y || 0), variant)) pending.push(entry);
    });

    pending.forEach((entry) => {
      const variants = makeShapeVariants(entry.circle);
      const start = hashCode(entry.itemKey) % variants.length;
      const rotated = variants.slice(start).concat(variants.slice(0, start));
      let ok = false;
      for (let v = 0; v < rotated.length && !ok; v += 1) {
        const shape = rotated[v];
        const w = Math.max(...shape.map((c) => c[0])) + 1;
        const h = Math.max(...shape.map((c) => c[1])) + 1;
        for (let y = 0; y <= rows - h && !ok; y += 1) {
          for (let x = 0; x <= cols - w && !ok; x += 1) {
            ok = place(entry, shape, x, y, v);
          }
        }
      }
      if (!ok) {
        for (let y = 0; y < rows && !ok; y += 1) {
          for (let x = 0; x < cols && !ok; x += 1) {
            if (blockedSet.has(`${x},${y}`)) continue;
            ok = place(entry, [[0, 0]], x, y, 0);
          }
        }
      }
    });

    return placed;
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
    formula.spellIds = formula.spellIds.filter((id, index, arr) => byId[id] && isUnlocked(id) && arr.indexOf(id) === index);
    while (totalHearts(formula.spellIds) > MAX_HEARTS) {
      formula.spellIds.pop();
    }
  }

  function removeSpellFromFormula(spellId) {
    const formula = currentFormula();
    if (!formula.spellIds.includes(spellId)) return;
    if (formula.spellIds.length <= 1) {
      dom.saveMsg.textContent = "최소 1개 주문은 유지해야 합니다.";
      dom.saveMsg.style.color = "#ffb2a0";
      return;
    }
    formula.spellIds = formula.spellIds.filter((id) => id !== spellId);
    delete formula.gridLayout[spellId];
    dom.saveMsg.textContent = "";
    render();
  }

  function addSpellToFormula(spellId, presetPosition = null) {
    const formula = currentFormula();
    const spell = byId[spellId];
    if (!spell || !isUnlocked(spellId)) return false;
    if (formula.spellIds.includes(spellId)) return true;
    if (totalHearts([...formula.spellIds, spellId]) > MAX_HEARTS) {
      dom.saveMsg.textContent = "하트 한도를 초과했습니다.";
      dom.saveMsg.style.color = "#ffb2a0";
      return false;
    }
    formula.spellIds.push(spellId);
    if (presetPosition) {
      formula.gridLayout[spellId] = { x: presetPosition.x, y: presetPosition.y, variant: 0 };
    }
    const placed = buildLayout(slotEntries(formula), formula.gridLayout, currentCore()).some((entry) => entry.itemKey === spellId);
    if (!placed) {
      formula.spellIds = formula.spellIds.filter((id) => id !== spellId);
      delete formula.gridLayout[spellId];
      dom.saveMsg.textContent = "그리드 공간이 부족합니다.";
      dom.saveMsg.style.color = "#ffb2a0";
      return false;
    }
    dom.saveMsg.textContent = "";
    dom.saveMsg.style.color = "#b8dfff";
    return true;
  }

  function renderSpellPool() {
    if (!dom.spellPool) return;
    dom.spellPool.innerHTML = "";
    if (sortedUnlocked.length === 0) {
      dom.spellPool.innerHTML = "<p>해금된 주문이 없습니다. 전투/이벤트를 통해 주문을 획득하세요.</p>";
      return;
    }
    const usedSet = new Set(currentFormula().spellIds);
    sortedUnlocked.forEach((spell) => {
      const item = document.createElement("div");
      item.className = "spell-pool-item";
      if (usedSet.has(spell.id)) item.classList.add("used");
      item.draggable = true;
      item.dataset.spellId = spell.id;
      item.innerHTML = `
        <strong>${spell.name}</strong>
        <span>${colorKo(spell.color)} ${spell.circle}서클 | MP ${spell.manaCost} | 하트 ${spell.heartCost}${usedSet.has(spell.id) ? " | 배치됨" : ""}</span>
      `;
      item.addEventListener("dragstart", (event) => {
        event.dataTransfer?.setData("text/plain", spell.id);
        event.dataTransfer?.setData("application/x-fanta-spell", spell.id);
      });
      dom.spellPool.appendChild(item);
    });
  }

  function cellFromPointer(event) {
    const core = currentCore();
    const rect = dom.grid.getBoundingClientRect();
    const cx = Math.floor(((event.clientX - rect.left) / rect.width) * core.cols);
    const cy = Math.floor(((event.clientY - rect.top) / rect.height) * core.rows);
    return {
      x: Math.max(0, Math.min(core.cols - 1, cx)),
      y: Math.max(0, Math.min(core.rows - 1, cy))
    };
  }

  function renderGrid() {
    const formula = currentFormula();
    const core = currentCore();
    const blockedSet = new Set((core.blocked || []).map(([x, y]) => `${x},${y}`));
    const entries = slotEntries(formula);
    const layout = buildLayout(entries, formula.gridLayout, core);
    dom.grid.innerHTML = "";
    dom.grid.style.setProperty("--cols", String(core.cols));
    dom.grid.style.setProperty("--rows", String(core.rows));
    const cell = core.rows >= 7 ? 32 : (core.rows >= 5 || core.cols >= 5 ? 38 : 44);
    dom.grid.style.setProperty("--cell", `${cell}px`);

    for (let y = 0; y < core.rows; y += 1) {
      for (let x = 0; x < core.cols; x += 1) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        if (blockedSet.has(`${x},${y}`)) {
          cell.classList.add("blocked");
        }
        dom.grid.appendChild(cell);
      }
    }

    layout.forEach((entry) => {
      const sortedShape = [...entry.shape].sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
      formula.gridLayout[entry.itemKey] = { x: entry.x, y: entry.y, variant: entry.variant || 0 };
      sortedShape.forEach(([sx, sy], idx) => {
        const tile = document.createElement("div");
        tile.className = `grid-item ${entry.color}`;
        tile.dataset.itemKey = entry.itemKey;
        tile.dataset.sx = String(sx);
        tile.dataset.sy = String(sy);
        tile.style.gridColumn = `${entry.x + sx + 1}`;
        tile.style.gridRow = `${entry.y + sy + 1}`;
        if (idx === 0) {
          const icon = document.createElement("img");
          icon.src = `assets/spells/v2/${entry.id}.svg`;
          icon.alt = `${entry.name} 아이콘`;
          tile.appendChild(icon);
          const label = document.createElement("span");
          label.textContent = entry.name;
          tile.appendChild(label);
          const rotate = document.createElement("button");
          rotate.type = "button";
          rotate.className = "grid-rotate-btn";
          rotate.dataset.itemKey = entry.itemKey;
          rotate.textContent = "⟳";
          rotate.addEventListener("click", (event) => {
            event.stopPropagation();
            const variants = makeShapeVariants(entry.circle);
            const current = formula.gridLayout[entry.itemKey] || { x: entry.x, y: entry.y, variant: 0 };
            formula.gridLayout[entry.itemKey] = { x: current.x, y: current.y, variant: (current.variant + 1) % variants.length };
            renderGrid();
          });
          tile.appendChild(rotate);
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className = "grid-remove-btn";
          remove.dataset.itemKey = entry.itemKey;
          remove.textContent = "✕";
          remove.addEventListener("click", (event) => {
            event.stopPropagation();
            removeSpellFromFormula(entry.id);
          });
          tile.appendChild(remove);
        }
        dom.grid.appendChild(tile);
      });
    });
  }

  function bindGridEvents() {
    dom.grid.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    dom.grid.addEventListener("drop", (event) => {
      event.preventDefault();
      const spellId = event.dataTransfer?.getData("application/x-fanta-spell")
        || event.dataTransfer?.getData("text/plain");
      if (!spellId || !byId[spellId]) return;
      const cell = cellFromPointer(event);
      if (!addSpellToFormula(spellId, cell)) return;
      render();
    });
    dom.grid.addEventListener("pointerdown", (event) => {
      const tile = event.target.closest(".grid-item");
      if (!tile || !dom.grid.contains(tile)) return;
      dragState = {
        itemKey: tile.dataset.itemKey,
        offsetX: Number(tile.dataset.sx || 0),
        offsetY: Number(tile.dataset.sy || 0)
      };
    });
    window.addEventListener("pointermove", (event) => {
      if (!dragState) return;
      const formula = currentFormula();
      const cell = cellFromPointer(event);
      formula.gridLayout[dragState.itemKey] = {
        ...(formula.gridLayout[dragState.itemKey] || { variant: 0 }),
        x: cell.x - dragState.offsetX,
        y: cell.y - dragState.offsetY
      };
      renderGrid();
    });
    window.addEventListener("pointerup", () => { dragState = null; });
    dom.grid.addEventListener("dblclick", (event) => {
      const tile = event.target.closest(".grid-item");
      if (!tile || !dom.grid.contains(tile)) return;
      const formula = currentFormula();
      const itemKey = tile.dataset.itemKey;
      const entry = slotEntries(formula).find((e) => e.itemKey === itemKey);
      if (!entry) return;
      const variants = makeShapeVariants(entry.circle);
      const current = formula.gridLayout[itemKey] || { x: 0, y: 0, variant: 0 };
      formula.gridLayout[itemKey] = { x: current.x, y: current.y, variant: (current.variant + 1) % variants.length };
      renderGrid();
    });
  }

  function render() {
    const formula = currentFormula();
    normalizeFormulaSpells(formula);
    dom.nameInput.value = formula.name;
    dom.heartInfo.textContent = `마나 하트: ${totalHearts(formula.spellIds)} / ${MAX_HEARTS}`;
    renderTabs();
    renderCoreSelect();
    renderSpellPool();
    renderGrid();
    renderCatalog();
  }

  function effectText(e) {
    if (e.type === "damage") return `직접 피해 ${e.value}`;
    if (e.type === "conditionalDamage") return `조건부 피해 ${e.value}`;
    if (e.type === "heal") return `체력 회복 ${e.value}`;
    if (e.type === "shield") return `보호막 ${e.value}`;
    if (e.type === "manaGain") return `즉시 마나 +${e.value}`;
    if (e.type === "manaOnEvent") {
      const map = {
        onDamageDealt: "피해를 주면",
        onControlApplied: "제어 효과가 걸리면"
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
    if (e.type === "silence") return `봉인 ${e.duration || 1}초`;
    if (e.type === "dot") return `${e.duration || 2}초 동안 지속피해 ${e.value}`;
    if (e.type === "regen") return `${e.duration || 2}초 동안 재생 ${e.value}/초`;
    if (e.type === "frostSlow") return `${e.duration || 2}초 둔화 ${e.slowPct || 10}% (쿨회복 x${e.cooldownRate || 0.9})`;
    return e.type;
  }

  function renderCatalog() {
    dom.catalog.innerHTML = "";
    const color = dom.colorFilter?.value || "all";
    const circle = dom.circleFilter?.value || "all";
    sorted
      .filter((spell) => (color === "all" ? true : spell.color === color))
      .filter((spell) => (circle === "all" ? true : String(spell.circle) === circle))
      .forEach((spell) => {
      const raw = rawById[spell.id];
      const card = document.createElement("article");
      card.className = "spell-card";
      const locked = !isUnlocked(spell.id);
      if (locked) card.classList.add("locked");
      const effects = (raw.effects || []).map(effectText);
      card.innerHTML = `
        <h3>${spell.name}${locked ? " 🔒" : ""}</h3>
        <p>${colorKo(spell.color)} ${spell.circle}서클 | MP ${spell.manaCost} | 하트 ${spell.heartCost}</p>
        <p>${locked ? "미해금 주문: 전투/이벤트 보상으로 획득" : (effects.length > 0 ? effects.join("<br>") : (raw.notes || "-"))}</p>
      `;
      dom.catalog.appendChild(card);
      });
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
      const order = { blue: 1, red: 2, green: 3 };
      return (order[a.color] - order[b.color]) || (a.circle - b.circle) || a.name.localeCompare(b.name);
    });
    unlockedSet = loadUnlockedSet();
    sortedUnlocked = sorted.filter((spell) => isUnlocked(spell.id));
  }

  async function init() {
    await loadCatalog();
    unlockedCoreSet = loadUnlockedCoreSet();
    formulaBook = loadFormulaBook();
    currentFormulaIndex = formulaBook.activeFormulaIndex;
    bindGridEvents();

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
        formula.gridLayout = {};
        dom.saveMsg.textContent = "";
        renderGrid();
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
