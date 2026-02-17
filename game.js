(() => {
  const TICK_MS = 1000;
  const MAX_LOG = 80;

  const gameState = {
    mode: "prep",
    tick: 0,
    pendingPhase: null,
    phaseChoices: [],
    phaseThresholdsHit: {
      phase2: false,
      phase3: false
    },
    playerCast: null,
    firestoreBridge: {
      enabled: false,
      queue: []
    }
  };

  const player = {
    hp: 1000,
    maxHp: 1000,
    mp: 240,
    maxMp: 240,
    manaRegen: 14,
    maxHearts: 3,
    spellSlots: [null, null, null, null],
    cooldowns: {},
    statuses: {},
    flags: {
      aerisUsed: false
    }
  };

  const boss = {
    hp: 5000,
    maxHp: 5000,
    phase: 1,
    statuses: {},
    attackCooldown: 0
  };

  const dom = {
    playerHpFill: document.getElementById("player-hp-fill"),
    playerMpFill: document.getElementById("player-mp-fill"),
    bossHpFill: document.getElementById("boss-hp-fill"),
    playerHpText: document.getElementById("player-hp-text"),
    playerMpText: document.getElementById("player-mp-text"),
    bossHpText: document.getElementById("boss-hp-text"),
    heartText: document.getElementById("heart-text"),
    phasePill: document.getElementById("phase-pill"),
    combatLog: document.getElementById("combat-log"),
    loadoutSelects: document.getElementById("loadout-selects"),
    spellCompendium: document.getElementById("spell-compendium"),
    spellSlots: document.getElementById("spell-slots"),
    playerStatuses: document.getElementById("player-statuses"),
    bossStatuses: document.getElementById("boss-statuses"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    phaseModal: document.getElementById("phase-modal"),
    phaseChoices: document.getElementById("phase-choices")
  };

  const spells = {
    sparkBolt: {
      id: "sparkBolt",
      name: "Spark Bolt",
      color: "blue",
      circle: 1,
      heartCost: 1,
      manaCost: 16,
      cooldown: 2,
      castTime: 0,
      description: "Quick arcane bolt for steady damage.",
      effect: ({ dealBossDamage, log }) => {
        dealBossDamage(115, "Spark Bolt");
        log("Spark Bolt strikes for 115 damage.");
      }
    },
    emberLance: {
      id: "emberLance",
      name: "Ember Lance",
      color: "red",
      circle: 2,
      heartCost: 2,
      manaCost: 26,
      cooldown: 3,
      castTime: 0,
      description: "A focused lance of fire.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(150, "Ember Lance");
        addBossStatus("burnFlat", { dps: 36, remaining: 5 });
        log("Ember Lance ignites burn for 5 seconds.");
      }
    },
    brambleWard: {
      id: "brambleWard",
      name: "Bramble Ward",
      color: "green",
      circle: 2,
      heartCost: 2,
      manaCost: 24,
      cooldown: 5,
      castTime: 0,
      description: "Grow a defensive ward that reduces incoming damage.",
      effect: ({ addPlayerStatus, log }) => {
        addPlayerStatus("ward", { remaining: 4, reduction: 0.25 });
        log("Bramble Ward reduces incoming damage by 25% for 4s.");
      }
    },
    glacialPrism: {
      id: "glacialPrism",
      name: "Glacial Prism",
      color: "blue",
      circle: 3,
      heartCost: 3,
      manaCost: 40,
      cooldown: 5,
      castTime: 1,
      description: "Heavy arcane ice burst.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(295, "Glacial Prism");
        addBossStatus("slow", { value: 2, remaining: 4 });
        log("Glacial Prism lands and slows the boss.");
      }
    },
    toxicRain: {
      id: "toxicRain",
      name: "Toxic Rain",
      color: "green",
      circle: 3,
      heartCost: 3,
      manaCost: 38,
      cooldown: 5,
      castTime: 0,
      description: "Corrosive rain that poisons over time.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("poison", { stacks: 8, remaining: 8 });
        log("Toxic Rain applies poison (8) for 8s.");
      }
    },
    infernalDrive: {
      id: "infernalDrive",
      name: "Infernal Drive",
      color: "red",
      circle: 4,
      heartCost: 4,
      manaCost: 58,
      cooldown: 6,
      castTime: 1,
      description: "Brutal blast that ramps pressure.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(390, "Infernal Drive");
        addBossStatus("burnFlat", { dps: 48, remaining: 6 });
        log("Infernal Drive leaves lasting flames.");
      }
    },
    aerisAzureSeal: {
      id: "aerisAzureSeal",
      name: "Aeris's Azure Seal",
      color: "blue",
      circle: 5,
      heartCost: 5,
      manaCost: 120,
      cooldown: 999,
      castTime: 5,
      oneUse: true,
      interruptible: true,
      description: "If target HP < 30% instant kill, else 40% max HP damage.",
      effect: ({ dealBossDamage, log }) => {
        const hpRatio = boss.hp / boss.maxHp;
        if (hpRatio < 0.3) {
          boss.hp = 0;
          log("Aeris's Azure Seal executes the boss instantly.");
        } else {
          const damage = Math.floor(boss.maxHp * 0.4);
          dealBossDamage(damage, "Aeris's Azure Seal");
          log("Aeris's Azure Seal deals 40% max HP damage.");
        }
        player.flags.aerisUsed = true;
      }
    },
    cerysAbyssalGarden: {
      id: "cerysAbyssalGarden",
      name: "Cerys Finn's Abyssal Garden",
      color: "green",
      circle: 5,
      heartCost: 5,
      manaCost: 130,
      cooldown: 14,
      castTime: 4,
      description: "Field for 15s: poison 10, fire 5, slow 3 and 3% max HP/s. Ends with MP set to 0.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("abyssalGarden", {
          remaining: 15,
          poison: 10,
          fire: 5,
          slow: 3
        });
        log("Abyssal Garden blooms for 15s.");
      }
    },
    flamesPurgatorium: {
      id: "flamesPurgatorium",
      name: "Flames of Purgatorium",
      color: "red",
      circle: 5,
      heartCost: 5,
      manaCost: 130,
      cooldown: 12,
      castTime: 3,
      description: "Escalating burn: each second elapsed x 1.5% max HP. Cannot be removed.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("purgatorium", { elapsed: 0 });
        log("Flames of Purgatorium takes hold. The burn will not fade.");
      }
    }
  };

  const buffs = [
    {
      id: "heartRelic",
      name: "Mana Relic",
      description: "+2 max Mana Hearts (up to 15).",
      apply: () => {
        player.maxHearts = Math.min(15, player.maxHearts + 2);
        log("Mana Relic expands your Mana Heart capacity by 2.");
      }
    },
    {
      id: "vitalityDraft",
      name: "Vitality Draft",
      description: "Recover 25% max HP and gain +10% max HP.",
      apply: () => {
        player.maxHp = Math.floor(player.maxHp * 1.1);
        player.hp = Math.min(player.maxHp, player.hp + Math.floor(player.maxHp * 0.25));
        log("Vitality surges through your core.");
      }
    },
    {
      id: "etherWell",
      name: "Ether Well",
      description: "+8 MP regeneration each second.",
      apply: () => {
        player.manaRegen += 8;
        log("Your Mana Heart draws deeper Ether each second.");
      }
    },
    {
      id: "quickTongue",
      name: "Quick Tongue",
      description: "All cooldowns reduced by 20%.",
      apply: () => {
        Object.values(spells).forEach((spell) => {
          spell.cooldown = Math.max(1, Math.floor(spell.cooldown * 0.8));
        });
        log("Casting rhythm accelerates.");
      }
    },
    {
      id: "resonantInk",
      name: "Resonant Ink",
      description: "Spell damage increased by 15%.",
      apply: () => {
        addPlayerStatus("spellAmp", { value: 0.15, remaining: 9999 });
        log("Spellbooks resonate with amplified force.");
      }
    },
    {
      id: "shellOfThorns",
      name: "Shell of Thorns",
      description: "Incoming damage reduced by 15%.",
      apply: () => {
        addPlayerStatus("ward", { reduction: 0.15, remaining: 9999 });
        log("A constant thorn shell forms around you.");
      }
    }
  ];

  const heartSystem = {
    usedHearts(slots) {
      return slots.reduce((sum, spellId) => {
        if (!spellId || !spells[spellId]) {
          return sum;
        }
        return sum + spells[spellId].heartCost;
      }, 0);
    },
    canEquip(slotIndex, spellId) {
      const nextSlots = [...player.spellSlots];
      nextSlots[slotIndex] = spellId;
      const used = this.usedHearts(nextSlots);
      return used <= player.maxHearts;
    }
  };

  const spellSystem = {
    getEquipped() {
      return player.spellSlots.map((id) => (id ? spells[id] : null));
    },
    reduceCooldowns() {
      Object.keys(player.cooldowns).forEach((id) => {
        player.cooldowns[id] = Math.max(0, player.cooldowns[id] - 1);
      });
    },
    pickAutoCastSpell() {
      const equipped = this.getEquipped().filter(Boolean);
      for (const spell of equipped) {
        if (!this.isAvailable(spell)) {
          continue;
        }
        return spell;
      }
      return null;
    },
    isAvailable(spell) {
      if (player.mp < spell.manaCost) {
        return false;
      }
      if ((player.cooldowns[spell.id] || 0) > 0) {
        return false;
      }
      if (spell.id === "aerisAzureSeal" && player.flags.aerisUsed) {
        return false;
      }
      return true;
    },
    beginCastOrResolve(spell) {
      if (spell.castTime > 0) {
        gameState.playerCast = {
          spellId: spell.id,
          remaining: spell.castTime,
          interruptible: Boolean(spell.interruptible)
        };
        log(`${spell.name} casting started (${spell.castTime}s).`);
        return;
      }
      this.resolveSpell(spell);
    },
    resolveSpell(spell) {
      player.mp = Math.max(0, player.mp - spell.manaCost);
      player.cooldowns[spell.id] = spell.cooldown;
      spell.effect({
        dealBossDamage,
        dealPlayerDamage,
        addPlayerStatus,
        addBossStatus,
        log
      });
    },
    tickCast() {
      if (!gameState.playerCast) {
        return;
      }
      gameState.playerCast.remaining -= 1;
      if (gameState.playerCast.remaining > 0) {
        return;
      }
      const spell = spells[gameState.playerCast.spellId];
      gameState.playerCast = null;
      this.resolveSpell(spell);
    }
  };

  const bossAI = {
    performAction() {
      const cooldownGate = this.phaseAttackRate();
      boss.attackCooldown -= 1;
      if (boss.attackCooldown > 0) {
        return;
      }
      boss.attackCooldown = cooldownGate;

      const baseDmg = this.phaseDamage();
      const crit = Math.random() < 0.15;
      const dealt = crit ? Math.floor(baseDmg * 1.5) : baseDmg;
      if (crit) {
        log(`Boss lands a critical strike for ${dealt}.`);
      } else {
        log(`Boss attack hits for ${dealt}.`);
      }
      dealPlayerDamage(dealt, "Boss Attack", true);
    },
    phaseDamage() {
      if (boss.phase === 1) {
        return 90;
      }
      if (boss.phase === 2) {
        return 125;
      }
      return 170;
    },
    phaseAttackRate() {
      const slow = boss.statuses.slow ? boss.statuses.slow.value : 0;
      const base = boss.phase === 3 ? 1 : 2;
      return Math.max(1, base + slow);
    }
  };

  const combatSystem = {
    timerId: null,
    start() {
      if (gameState.mode !== "prep") {
        return;
      }
      if (!player.spellSlots.some(Boolean)) {
        log("Equip at least one spell before battle.");
        return;
      }
      gameState.mode = "running";
      dom.phasePill.textContent = "Phase 1";
      log("Battle starts.");
      this.timerId = setInterval(() => this.tick(), TICK_MS);
    },
    reset() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = null;

      gameState.mode = "prep";
      gameState.tick = 0;
      gameState.pendingPhase = null;
      gameState.phaseChoices = [];
      gameState.phaseThresholdsHit.phase2 = false;
      gameState.phaseThresholdsHit.phase3 = false;
      gameState.playerCast = null;

      player.hp = player.maxHp = 1000;
      player.mp = player.maxMp = 240;
      player.manaRegen = 14;
      player.maxHearts = 3;
      player.cooldowns = {};
      player.statuses = {};
      player.flags.aerisUsed = false;
      player.spellSlots = [null, null, null, null];

      boss.hp = boss.maxHp = 5000;
      boss.phase = 1;
      boss.attackCooldown = 0;
      boss.statuses = {};

      dom.phaseModal.classList.add("hidden");
      log("Battle state reset.");
      renderLoadoutSelectors();
      renderSpellSlots();
      render();
    },
    tick() {
      if (gameState.mode !== "running") {
        return;
      }

      gameState.tick += 1;
      spellSystem.reduceCooldowns();
      processStatuses();

      spellSystem.tickCast();
      if (!gameState.playerCast) {
        const spell = spellSystem.pickAutoCastSpell();
        if (spell) {
          spellSystem.beginCastOrResolve(spell);
        }
      }

      bossAI.performAction();
      player.mp = Math.min(player.maxMp, player.mp + player.manaRegen);

      phaseStateMachine.maybeTrigger();
      checkEndConditions();
      render();
    }
  };

  const phaseStateMachine = {
    maybeTrigger() {
      if (boss.hp <= boss.maxHp * 0.7 && !gameState.phaseThresholdsHit.phase2) {
        gameState.phaseThresholdsHit.phase2 = true;
        this.pauseForChoice(2);
        return;
      }
      if (boss.hp <= boss.maxHp * 0.4 && !gameState.phaseThresholdsHit.phase3) {
        gameState.phaseThresholdsHit.phase3 = true;
        this.pauseForChoice(3);
      }
    },
    pauseForChoice(nextPhase) {
      gameState.mode = "choice";
      gameState.pendingPhase = nextPhase;
      gameState.phaseChoices = pickRandomBuffs(3);
      renderPhaseChoices();
      dom.phaseModal.classList.remove("hidden");
      dom.phasePill.textContent = `Phase ${nextPhase - 1} -> Choice`;
      log(`Boss shifts toward Phase ${nextPhase}. Choose one boon.`);
    },
    applyChoice(buffId) {
      const chosen = buffs.find((buff) => buff.id === buffId);
      if (!chosen || gameState.mode !== "choice") {
        return;
      }
      chosen.apply();
      if (heartSystem.usedHearts(player.spellSlots) > player.maxHearts) {
        log("Current loadout exceeds new heart limit, unequip some spells.");
      }
      boss.phase = gameState.pendingPhase;
      dom.phasePill.textContent = `Phase ${boss.phase}`;
      gameState.pendingPhase = null;
      gameState.mode = "running";
      dom.phaseModal.classList.add("hidden");
      render();
    }
  };

  function processStatuses() {
    if (boss.statuses.poison) {
      const poisonDamage = boss.statuses.poison.stacks * 9;
      dealBossDamage(poisonDamage, "Poison");
      boss.statuses.poison.remaining -= 1;
      if (boss.statuses.poison.remaining <= 0) {
        delete boss.statuses.poison;
      }
    }

    if (boss.statuses.burnFlat) {
      dealBossDamage(boss.statuses.burnFlat.dps, "Burn");
      boss.statuses.burnFlat.remaining -= 1;
      if (boss.statuses.burnFlat.remaining <= 0) {
        delete boss.statuses.burnFlat;
      }
    }

    if (boss.statuses.purgatorium) {
      boss.statuses.purgatorium.elapsed += 1;
      const mult = boss.statuses.purgatorium.elapsed * 0.015;
      const damage = Math.floor(boss.maxHp * mult);
      dealBossDamage(damage, "Purgatorium");
    }

    if (boss.statuses.abyssalGarden) {
      const field = boss.statuses.abyssalGarden;
      const gardenDamage = Math.floor(boss.maxHp * 0.03);
      dealBossDamage(gardenDamage, "Abyssal Garden");
      addBossStatus("poison", { stacks: field.poison, remaining: 2 });
      addBossStatus("burnFlat", { dps: field.fire * 10, remaining: 2 });
      addBossStatus("slow", { value: field.slow, remaining: 2 });
      field.remaining -= 1;
      if (field.remaining <= 0) {
        delete boss.statuses.abyssalGarden;
        player.mp = 0;
        log("Abyssal Garden ends. Your MP falls to 0.");
      }
    }

    if (boss.statuses.slow) {
      boss.statuses.slow.remaining -= 1;
      if (boss.statuses.slow.remaining <= 0) {
        delete boss.statuses.slow;
      }
    }

    Object.keys(player.statuses).forEach((key) => {
      const status = player.statuses[key];
      if (status.remaining === 9999) {
        return;
      }
      status.remaining -= 1;
      if (status.remaining <= 0) {
        delete player.statuses[key];
      }
    });
  }

  function dealBossDamage(baseAmount, source) {
    let amount = baseAmount;
    if (player.statuses.spellAmp) {
      amount = Math.floor(amount * (1 + player.statuses.spellAmp.value));
    }
    boss.hp = Math.max(0, boss.hp - amount);
    if (source && source !== "Poison" && source !== "Burn") {
      log(`${source} deals ${amount} damage.`);
    }
  }

  function dealPlayerDamage(amount, source, canInterruptCast = false) {
    let final = amount;
    if (player.statuses.ward) {
      final = Math.floor(final * (1 - player.statuses.ward.reduction));
    }
    player.hp = Math.max(0, player.hp - final);

    if (canInterruptCast && gameState.playerCast && gameState.playerCast.interruptible) {
      const interruptedName = spells[gameState.playerCast.spellId].name;
      gameState.playerCast = null;
      log(`${interruptedName} was interrupted after taking damage.`);
    }

    if (source) {
      log(`${source} deals ${final} to you.`);
    }
  }

  function addPlayerStatus(id, payload) {
    const existing = player.statuses[id];
    if (!existing) {
      player.statuses[id] = { ...payload };
      return;
    }
    player.statuses[id] = mergeStatus(existing, payload);
  }

  function addBossStatus(id, payload) {
    if (id === "purgatorium" && boss.statuses.purgatorium) {
      return;
    }
    const existing = boss.statuses[id];
    if (!existing) {
      boss.statuses[id] = { ...payload };
      return;
    }
    boss.statuses[id] = mergeStatus(existing, payload);
  }

  function mergeStatus(existing, incoming) {
    const merged = { ...existing };
    Object.keys(incoming).forEach((key) => {
      if (typeof incoming[key] === "number" && typeof existing[key] === "number") {
        merged[key] = Math.max(existing[key], incoming[key]);
      } else {
        merged[key] = incoming[key];
      }
    });
    return merged;
  }

  function pickRandomBuffs(count) {
    const copy = [...buffs];
    const picked = [];
    while (picked.length < count && copy.length > 0) {
      const index = Math.floor(Math.random() * copy.length);
      picked.push(copy.splice(index, 1)[0]);
    }
    return picked;
  }

  function checkEndConditions() {
    if (boss.hp <= 0 && gameState.mode !== "victory") {
      gameState.mode = "victory";
      dom.phasePill.textContent = "Victory";
      log("The boss falls. Victory.");
      stopTimer();
      return;
    }
    if (player.hp <= 0 && gameState.mode !== "defeat") {
      gameState.mode = "defeat";
      dom.phasePill.textContent = "Defeat";
      log("You are defeated.");
      stopTimer();
    }
  }

  function stopTimer() {
    if (combatSystem.timerId) {
      clearInterval(combatSystem.timerId);
      combatSystem.timerId = null;
    }
  }

  function renderLoadoutSelectors() {
    const options = Object.values(spells)
      .sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name))
      .map((spell) => {
        const label = `${spell.name} | ${spell.circle}C | Hearts ${spell.heartCost} | MP ${spell.manaCost}`;
        return `<option value="${spell.id}">${label}</option>`;
      })
      .join("");

    dom.loadoutSelects.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const slot = document.createElement("div");
      slot.className = "select-card";
      slot.innerHTML = `
        <label for="slot-select-${i}">Slot ${i + 1}</label>
        <select id="slot-select-${i}">
          <option value="">Empty</option>
          ${options}
        </select>
      `;
      const select = slot.querySelector("select");
      select.value = player.spellSlots[i] || "";
      select.addEventListener("change", (event) => {
        const selected = event.target.value || null;
        const previous = player.spellSlots[i];

        if (!selected) {
          player.spellSlots[i] = null;
          renderSpellSlots();
          render();
          return;
        }

        if (!heartSystem.canEquip(i, selected)) {
          event.target.value = previous || "";
          log("Equip blocked: Mana Heart limit exceeded.");
          render();
          return;
        }

        player.spellSlots[i] = selected;
        renderSpellSlots();
        render();
      });
      dom.loadoutSelects.appendChild(slot);
    }
  }

  function renderSpellSlots() {
    dom.spellSlots.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const spellId = player.spellSlots[i];
      const card = document.createElement("div");
      card.className = "spell-slot";

      if (!spellId) {
        card.innerHTML = `<div class="spell-name">Slot ${i + 1}: Empty</div>`;
        dom.spellSlots.appendChild(card);
        continue;
      }

      const spell = spells[spellId];
      card.classList.add(spell.color);
      const cooldown = player.cooldowns[spell.id] || 0;
      const castingText = gameState.playerCast && gameState.playerCast.spellId === spell.id
        ? `Casting (${gameState.playerCast.remaining}s)`
        : `Ready`;

      card.innerHTML = `
        <div class="spell-name">${spell.name}</div>
        <div class="spell-meta">
          <span>${spell.circle}-Circle | Hearts ${spell.heartCost}</span>
          <span>Mana ${spell.manaCost} | CD ${spell.cooldown}s</span>
          <span>${castingText}</span>
        </div>
        <div class="cooldown-overlay ${cooldown > 0 ? "" : "hidden"}">${cooldown}</div>
      `;
      dom.spellSlots.appendChild(card);
    }
  }

  function spellSpecialNote(spell) {
    if (spell.id === "aerisAzureSeal") {
      return "5s cast, one-use per battle, interrupted if damaged while casting.";
    }
    if (spell.id === "cerysAbyssalGarden") {
      return "4s cast, 15s field, then your MP becomes 0.";
    }
    if (spell.id === "flamesPurgatorium") {
      return "3s cast, escalating burn that cannot be removed.";
    }
    if (spell.castTime > 0) {
      return `Cast time: ${spell.castTime}s`;
    }
    return "Instant cast";
  }

  function renderCompendium() {
    const sorted = Object.values(spells).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name));
    dom.spellCompendium.innerHTML = sorted
      .map((spell) => `
        <article class="compendium-card ${spell.color}">
          <div class="compendium-head">
            <div class="compendium-name">${spell.name}</div>
            <div>${spell.circle}C</div>
          </div>
          <div class="compendium-meta">
            <span>Color: ${spell.color}</span>
            <span>Hearts: ${spell.heartCost}</span>
            <span>Mana: ${spell.manaCost}</span>
            <span>Cooldown: ${spell.cooldown}s</span>
          </div>
          <div class="compendium-desc">${spell.description}</div>
          <div class="compendium-desc">${spellSpecialNote(spell)}</div>
        </article>
      `)
      .join("");
  }

  function renderPhaseChoices() {
    dom.phaseChoices.innerHTML = "";
    gameState.phaseChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-btn";
      button.innerHTML = `<strong>${choice.name}</strong><span>${choice.description}</span>`;
      button.addEventListener("click", () => phaseStateMachine.applyChoice(choice.id));
      dom.phaseChoices.appendChild(button);
    });
  }

  function renderStatuses() {
    dom.playerStatuses.innerHTML = formatStatuses(player.statuses);
    dom.bossStatuses.innerHTML = formatStatuses(boss.statuses);
  }

  function formatStatuses(statusObj) {
    const keys = Object.keys(statusObj);
    if (keys.length === 0) {
      return '<span class="status-pill">None</span>';
    }
    return keys
      .map((key) => {
        const status = statusObj[key];
        const parts = Object.entries(status)
          .map(([k, value]) => `${k}:${value}`)
          .join(" ");
        return `<span class="status-pill">${key} ${parts}</span>`;
      })
      .join("");
  }

  function render() {
    const playerHpPct = (player.hp / player.maxHp) * 100;
    const playerMpPct = (player.mp / player.maxMp) * 100;
    const bossHpPct = (boss.hp / boss.maxHp) * 100;

    dom.playerHpFill.style.width = `${Math.max(0, playerHpPct)}%`;
    dom.playerMpFill.style.width = `${Math.max(0, playerMpPct)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, bossHpPct)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(boss.hp)} / ${boss.maxHp}`;

    const usedHearts = heartSystem.usedHearts(player.spellSlots);
    dom.heartText.textContent = `Hearts: ${usedHearts} / ${player.maxHearts}`;
    dom.heartText.style.color = usedHearts > player.maxHearts ? "var(--danger)" : "var(--heart)";

    if (gameState.mode === "prep") {
      dom.phasePill.textContent = "Preparation";
    }

    renderSpellSlots();
    renderStatuses();
  }

  function log(message) {
    const item = document.createElement("li");
    item.textContent = `[t${gameState.tick}] ${message}`;
    dom.combatLog.prepend(item);

    while (dom.combatLog.children.length > MAX_LOG) {
      dom.combatLog.removeChild(dom.combatLog.lastChild);
    }

    gameState.firestoreBridge.queue.push({
      ts: Date.now(),
      tick: gameState.tick,
      message
    });
  }

  function bindEvents() {
    dom.startBtn.addEventListener("click", () => combatSystem.start());
    dom.resetBtn.addEventListener("click", () => combatSystem.reset());
  }

  function init() {
    renderLoadoutSelectors();
    renderCompendium();
    bindEvents();
    render();
    log("Prototype ready. Build your loadout and start battle.");
  }

  init();
})();
