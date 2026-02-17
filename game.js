(() => {
  const TICK_MS = 1000;
  const MAX_LOG = 80;

  const gameState = {
    mode: "prep",
    tick: 0,
    pendingPhase: null,
    choiceTimeoutId: null,
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
    phaseChoices: document.getElementById("phase-choices"),
    phaseTitle: document.getElementById("phase-title"),
    phaseDesc: document.getElementById("phase-desc"),
    phaseGuide: document.getElementById("phase-guide"),
    modalLoadout: document.getElementById("modal-loadout")
  };

  const spells = {
    sparkBolt: {
      id: "sparkBolt",
      name: "스파크 볼트",
      color: "blue",
      circle: 1,
      heartCost: 1,
      manaCost: 16,
      cooldown: 2,
      castTime: 0,
      description: "빠르게 발사되는 기본 비전 탄환.",
      effect: ({ dealBossDamage, log }) => {
        dealBossDamage(115, "스파크 볼트");
        log("스파크 볼트가 115 피해를 입혔습니다.");
      }
    },
    emberLance: {
      id: "emberLance",
      name: "엠버 랜스",
      color: "red",
      circle: 2,
      heartCost: 2,
      manaCost: 26,
      cooldown: 3,
      castTime: 0,
      description: "집중된 화염 창으로 적을 관통합니다.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(150, "엠버 랜스");
        addBossStatus("burnFlat", { dps: 36, remaining: 5 });
        log("엠버 랜스: 5초 동안 화상 효과를 부여합니다.");
      }
    },
    brambleWard: {
      id: "brambleWard",
      name: "브램블 워드",
      color: "green",
      circle: 2,
      heartCost: 2,
      manaCost: 24,
      cooldown: 5,
      castTime: 0,
      description: "가시 결계를 형성해 받는 피해를 줄입니다.",
      effect: ({ addPlayerStatus, log }) => {
        addPlayerStatus("ward", { remaining: 4, reduction: 0.25 });
        log("브램블 워드: 4초 동안 받는 피해가 25% 감소합니다.");
      }
    },
    glacialPrism: {
      id: "glacialPrism",
      name: "글레이셜 프리즘",
      color: "blue",
      circle: 3,
      heartCost: 3,
      manaCost: 40,
      cooldown: 5,
      castTime: 1,
      description: "강력한 냉기 폭발로 둔화를 유발합니다.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(295, "글레이셜 프리즘");
        addBossStatus("slow", { value: 2, remaining: 4 });
        log("글레이셜 프리즘이 적중해 보스를 둔화시킵니다.");
      }
    },
    toxicRain: {
      id: "toxicRain",
      name: "톡식 레인",
      color: "green",
      circle: 3,
      heartCost: 3,
      manaCost: 38,
      cooldown: 5,
      castTime: 0,
      description: "부식성 비를 내려 지속 독 피해를 부여합니다.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("poison", { stacks: 8, remaining: 8 });
        log("톡식 레인: 8초 동안 독(8)을 부여합니다.");
      }
    },
    infernalDrive: {
      id: "infernalDrive",
      name: "인페르날 드라이브",
      color: "red",
      circle: 4,
      heartCost: 4,
      manaCost: 58,
      cooldown: 6,
      castTime: 1,
      description: "폭발과 함께 화염 압박을 지속시킵니다.",
      effect: ({ dealBossDamage, addBossStatus, log }) => {
        dealBossDamage(390, "인페르날 드라이브");
        addBossStatus("burnFlat", { dps: 48, remaining: 6 });
        log("인페르날 드라이브: 잔류 화염을 남깁니다.");
      }
    },
    aerisAzureSeal: {
      id: "aerisAzureSeal",
      name: "아에리스의 청인",
      color: "blue",
      circle: 5,
      heartCost: 5,
      manaCost: 120,
      cooldown: 999,
      castTime: 5,
      oneUse: true,
      interruptible: true,
      description: "적 HP가 30% 미만이면 즉사, 아니면 최대 HP의 40% 피해.",
      effect: ({ dealBossDamage, log }) => {
        const hpRatio = boss.hp / boss.maxHp;
        if (hpRatio < 0.3) {
          boss.hp = 0;
          log("아에리스의 청인: 조건 충족으로 즉사 발동.");
        } else {
          const damage = Math.floor(boss.maxHp * 0.4);
          dealBossDamage(damage, "아에리스의 청인");
          log("아에리스의 청인: 최대 HP의 40% 피해를 입혔습니다.");
        }
        player.flags.aerisUsed = true;
      }
    },
    cerysAbyssalGarden: {
      id: "cerysAbyssalGarden",
      name: "세리스 핀의 심연 정원",
      color: "green",
      circle: 5,
      heartCost: 5,
      manaCost: 130,
      cooldown: 14,
      castTime: 4,
      description: "15초 장판: 독10/화염5/둔화3, 초당 최대 HP 3% 피해. 종료 시 MP 0.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("abyssalGarden", {
          remaining: 15,
          poison: 10,
          fire: 5,
          slow: 3
        });
        log("심연의 정원이 15초간 전장을 뒤덮습니다.");
      }
    },
    flamesPurgatorium: {
      id: "flamesPurgatorium",
      name: "연옥의 불꽃",
      color: "red",
      circle: 5,
      heartCost: 5,
      manaCost: 130,
      cooldown: 12,
      castTime: 3,
      description: "가중 화상: 경과 초 x 최대 HP 1.5%. 해제 불가.",
      effect: ({ addBossStatus, log }) => {
        addBossStatus("purgatorium", { elapsed: 0 });
        log("연옥의 불꽃 발동: 해제되지 않는 화상이 시작됩니다.");
      }
    }
  };

  const buffs = [
    {
      id: "heartRelic",
      name: "마나 유물",
      description: "최대 마나 하트 +2 (최대 15).",
      apply: () => {
        player.maxHearts = Math.min(15, player.maxHearts + 2);
        log("마나 유물: 최대 마나 하트가 2 증가했습니다.");
      }
    },
    {
      id: "vitalityDraft",
      name: "생명력 비약",
      description: "최대 HP의 25% 회복, 최대 HP +10%.",
      apply: () => {
        player.maxHp = Math.floor(player.maxHp * 1.1);
        player.hp = Math.min(player.maxHp, player.hp + Math.floor(player.maxHp * 0.25));
        log("생명력 비약: 체력 한계가 확장되었습니다.");
      }
    },
    {
      id: "etherWell",
      name: "에테르 우물",
      description: "초당 MP 재생 +8.",
      apply: () => {
        player.manaRegen += 8;
        log("에테르 우물: MP 재생이 강화되었습니다.");
      }
    },
    {
      id: "quickTongue",
      name: "속성 영창",
      description: "모든 재사용 대기시간 20% 감소.",
      apply: () => {
        Object.values(spells).forEach((spell) => {
          spell.cooldown = Math.max(1, Math.floor(spell.cooldown * 0.8));
        });
        log("속성 영창: 주문 회전이 빨라졌습니다.");
      }
    },
    {
      id: "resonantInk",
      name: "공명 잉크",
      description: "주문 피해량 15% 증가.",
      apply: () => {
        addPlayerStatus("spellAmp", { value: 0.15, remaining: 9999 });
        log("공명 잉크: 주문 위력이 증폭됩니다.");
      }
    },
    {
      id: "shellOfThorns",
      name: "가시 껍질",
      description: "받는 피해 15% 감소.",
      apply: () => {
        addPlayerStatus("ward", { reduction: 0.15, remaining: 9999 });
        log("가시 껍질: 상시 방어막이 형성되었습니다.");
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
        log(`${spell.name} 시전 시작 (${spell.castTime}초).`);
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
        log(`보스의 치명타! ${dealt} 피해.`);
      } else {
        log(`보스 공격: ${dealt} 피해.`);
      }
      dealPlayerDamage(dealt, "보스 공격", true);
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
        log("전투 시작 전 주문을 1개 이상 장착하세요.");
        return;
      }
      phaseStateMachine.showBattleBriefing();
    },
    reset() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = null;

      gameState.mode = "prep";
      gameState.tick = 0;
      gameState.pendingPhase = null;
      if (gameState.choiceTimeoutId) {
        clearTimeout(gameState.choiceTimeoutId);
        gameState.choiceTimeoutId = null;
      }
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
      dom.phaseGuide.classList.add("hidden");
      dom.modalLoadout.classList.add("hidden");
      log("전투 상태를 초기화했습니다.");
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
    showBattleBriefing() {
      gameState.mode = "briefing";
      dom.phaseTitle.textContent = "전투 브리핑";
      dom.phaseDesc.textContent = "보스 패턴을 확인하고 시작할 준비를 마치세요.";
      dom.phaseGuide.innerHTML = `
        <p>페이즈 1 (100%~71%): 기본 공격 주기 2초</p>
        <p>페이즈 2 (70%~41%): 공격력이 상승합니다.</p>
        <p>페이즈 3 (40%~0%): 공격이 매우 빨라지고 강해집니다.</p>
        <p>페이즈 전환 시마다 강화 1개를 고르고, 주문 슬롯을 다시 조정할 수 있습니다.</p>
      `;
      dom.phaseGuide.classList.remove("hidden");
      dom.modalLoadout.classList.remove("hidden");
      renderModalLoadoutSelectors();
      renderPhaseChoices([{
        id: "beginBattle",
        name: "전투 개시",
        description: "현재 로드아웃으로 전투를 시작합니다."
      }], (choiceId) => {
        if (choiceId !== "beginBattle") {
          return;
        }
        dom.phaseModal.classList.add("hidden");
        dom.phaseGuide.classList.add("hidden");
        dom.modalLoadout.classList.add("hidden");
        gameState.mode = "running";
        dom.phasePill.textContent = "페이즈 1";
        log("전투를 시작합니다.");
        combatSystem.timerId = setInterval(() => combatSystem.tick(), TICK_MS);
      });
      dom.phaseModal.classList.remove("hidden");
    },
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
      dom.phaseTitle.textContent = "페이즈 전환";
      dom.phaseDesc.textContent = "강화 1개를 선택하고, 필요하면 주문 슬롯도 변경하세요.";
      dom.phaseGuide.classList.add("hidden");
      dom.modalLoadout.classList.remove("hidden");
      renderModalLoadoutSelectors();
      renderPhaseChoices(gameState.phaseChoices, (buffId) => phaseStateMachine.applyChoice(buffId));
      dom.phaseModal.classList.remove("hidden");
      dom.phasePill.textContent = `페이즈 ${nextPhase - 1} -> 선택`;
      log(`보스가 페이즈 ${nextPhase}(으)로 전환합니다. 강화 1개를 선택하세요.`);
      if (gameState.choiceTimeoutId) {
        clearTimeout(gameState.choiceTimeoutId);
      }
      gameState.choiceTimeoutId = setTimeout(() => {
        if (gameState.mode === "choice" && gameState.phaseChoices.length > 0) {
          phaseStateMachine.applyChoice(gameState.phaseChoices[0].id, true);
        }
      }, 15000);
    },
    applyChoice(buffId, isAuto = false) {
      const chosen = buffs.find((buff) => buff.id === buffId);
      if (!chosen || gameState.mode !== "choice") {
        return;
      }
      chosen.apply();
      if (gameState.choiceTimeoutId) {
        clearTimeout(gameState.choiceTimeoutId);
        gameState.choiceTimeoutId = null;
      }
      if (isAuto) {
        log("선택 시간이 초과되어 첫 번째 강화가 자동 적용되었습니다.");
      }
      if (heartSystem.usedHearts(player.spellSlots) > player.maxHearts) {
        log("현재 로드아웃이 하트 제한을 초과합니다. 주문을 해제하세요.");
      }
      boss.phase = gameState.pendingPhase;
      dom.phasePill.textContent = `페이즈 ${boss.phase}`;
      gameState.pendingPhase = null;
      gameState.mode = "running";
      dom.phaseModal.classList.add("hidden");
      dom.modalLoadout.classList.add("hidden");
      render();
    }
  };

  function processStatuses() {
    if (boss.statuses.poison) {
      const poisonDamage = boss.statuses.poison.stacks * 9;
      dealBossDamage(poisonDamage, "중독");
      boss.statuses.poison.remaining -= 1;
      if (boss.statuses.poison.remaining <= 0) {
        delete boss.statuses.poison;
      }
    }

    if (boss.statuses.burnFlat) {
      dealBossDamage(boss.statuses.burnFlat.dps, "화상");
      boss.statuses.burnFlat.remaining -= 1;
      if (boss.statuses.burnFlat.remaining <= 0) {
        delete boss.statuses.burnFlat;
      }
    }

    if (boss.statuses.purgatorium) {
      boss.statuses.purgatorium.elapsed += 1;
      const mult = boss.statuses.purgatorium.elapsed * 0.015;
      const damage = Math.floor(boss.maxHp * mult);
      dealBossDamage(damage, "연옥 화상");
    }

    if (boss.statuses.abyssalGarden) {
      const field = boss.statuses.abyssalGarden;
      const gardenDamage = Math.floor(boss.maxHp * 0.03);
      dealBossDamage(gardenDamage, "심연의 정원");
      addBossStatus("poison", { stacks: field.poison, remaining: 2 });
      addBossStatus("burnFlat", { dps: field.fire * 10, remaining: 2 });
      addBossStatus("slow", { value: field.slow, remaining: 2 });
      field.remaining -= 1;
      if (field.remaining <= 0) {
        delete boss.statuses.abyssalGarden;
        player.mp = 0;
        log("심연의 정원 종료: 플레이어 MP가 0이 됩니다.");
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
      log(`${interruptedName} 시전이 피격으로 중단되었습니다.`);
    }

    if (source) {
      log(`${source}: 플레이어에게 ${final} 피해.`);
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
      dom.phasePill.textContent = "승리";
      log("보스를 쓰러뜨렸습니다. 승리!");
      stopTimer();
      return;
    }
    if (player.hp <= 0 && gameState.mode !== "defeat") {
      gameState.mode = "defeat";
      dom.phasePill.textContent = "패배";
      log("플레이어가 쓰러졌습니다.");
      stopTimer();
    }
  }

  function stopTimer() {
    if (combatSystem.timerId) {
      clearInterval(combatSystem.timerId);
      combatSystem.timerId = null;
    }
  }

  function spellOptionsHTML() {
    return Object.values(spells)
      .sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name))
      .map((spell) => {
        const label = `${spell.name} | ${spell.circle}서클 | 하트 ${spell.heartCost} | 마나 ${spell.manaCost}`;
        return `<option value="${spell.id}">${label}</option>`;
      })
      .join("");
  }

  function applySlotChange(slotIndex, selected, previous, selectEl) {
    if (!selected) {
      player.spellSlots[slotIndex] = null;
      renderSpellSlots();
      render();
      return true;
    }

    if (!heartSystem.canEquip(slotIndex, selected)) {
      if (selectEl) {
        selectEl.value = previous || "";
      }
      log("장착 실패: 마나 하트 한도를 초과했습니다.");
      render();
      return false;
    }

    player.spellSlots[slotIndex] = selected;
    renderSpellSlots();
    render();
    return true;
  }

  function renderLoadoutSelectors() {
    const options = spellOptionsHTML();

    dom.loadoutSelects.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const slot = document.createElement("div");
      slot.className = "select-card";
      slot.innerHTML = `
        <label for="slot-select-${i}">슬롯 ${i + 1}</label>
        <select id="slot-select-${i}">
          <option value="">비어 있음</option>
          ${options}
        </select>
      `;
      const select = slot.querySelector("select");
      select.value = player.spellSlots[i] || "";
      select.addEventListener("change", (event) => {
        const selected = event.target.value || null;
        const previous = player.spellSlots[i];
        applySlotChange(i, selected, previous, event.target);
      });
      dom.loadoutSelects.appendChild(slot);
    }
  }

  function renderModalLoadoutSelectors() {
    const options = spellOptionsHTML();
    dom.modalLoadout.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const slot = document.createElement("div");
      slot.className = "modal-slot";
      slot.innerHTML = `
        <label for="modal-slot-select-${i}">전환 로드아웃 슬롯 ${i + 1}</label>
        <select id="modal-slot-select-${i}">
          <option value="">비어 있음</option>
          ${options}
        </select>
      `;
      const select = slot.querySelector("select");
      select.value = player.spellSlots[i] || "";
      select.addEventListener("change", (event) => {
        const selected = event.target.value || null;
        const previous = player.spellSlots[i];
        const changed = applySlotChange(i, selected, previous, event.target);
        if (changed) {
          renderLoadoutSelectors();
        }
      });
      dom.modalLoadout.appendChild(slot);
    }
  }

  function renderSpellSlots() {
    dom.spellSlots.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const spellId = player.spellSlots[i];
      const card = document.createElement("div");
      card.className = "spell-slot";

      if (!spellId) {
        card.innerHTML = `<div class="spell-name">슬롯 ${i + 1}: 비어 있음</div>`;
        dom.spellSlots.appendChild(card);
        continue;
      }

      const spell = spells[spellId];
      card.classList.add(spell.color);
      const cooldown = player.cooldowns[spell.id] || 0;
      const castingText = gameState.playerCast && gameState.playerCast.spellId === spell.id
        ? `시전 중 (${gameState.playerCast.remaining}초)`
        : "준비 완료";

      card.innerHTML = `
        <div class="spell-name">${spell.name}</div>
        <div class="spell-meta">
          <span>${spell.circle}서클 | 하트 ${spell.heartCost}</span>
          <span>마나 ${spell.manaCost} | 쿨다운 ${spell.cooldown}초</span>
          <span>${castingText}</span>
        </div>
        <div class="cooldown-overlay ${cooldown > 0 ? "" : "hidden"}">${cooldown}</div>
      `;
      dom.spellSlots.appendChild(card);
    }
  }

  function spellSpecialNote(spell) {
      if (spell.id === "aerisAzureSeal") {
      return "시전 5초, 전투당 1회, 시전 중 피격 시 중단";
      }
      if (spell.id === "cerysAbyssalGarden") {
      return "시전 4초, 장판 15초 유지, 종료 시 MP 0";
      }
      if (spell.id === "flamesPurgatorium") {
      return "시전 3초, 시간 경과형 가중 화상, 해제 불가";
      }
      if (spell.castTime > 0) {
      return `시전 시간: ${spell.castTime}초`;
      }
    return "즉시 시전";
  }

  function renderCompendium() {
    const colorNameMap = {
      blue: "청",
      red: "적",
      green: "녹"
    };
    const sorted = Object.values(spells).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name));
    dom.spellCompendium.innerHTML = sorted
      .map((spell) => `
        <article class="compendium-card ${spell.color}">
          <div class="compendium-head">
            <div class="compendium-name">${spell.name}</div>
            <div>${spell.circle}C</div>
          </div>
          <div class="compendium-meta">
            <span>속성: ${colorNameMap[spell.color] || spell.color}</span>
            <span>하트: ${spell.heartCost}</span>
            <span>마나: ${spell.manaCost}</span>
            <span>쿨다운: ${spell.cooldown}초</span>
          </div>
          <div class="compendium-desc">${spell.description}</div>
          <div class="compendium-desc">${spellSpecialNote(spell)}</div>
        </article>
      `)
      .join("");
  }

  function renderPhaseChoices(choices, onSelect) {
    dom.phaseChoices.innerHTML = "";
    choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-btn";
      button.innerHTML = `<strong>${choice.name}</strong><span>${choice.description}</span>`;
      button.addEventListener("click", () => onSelect(choice.id));
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
      return '<span class="status-pill">없음</span>';
    }
    const statusNameMap = {
      ward: "보호막",
      spellAmp: "주문 증폭",
      poison: "중독",
      burnFlat: "화상",
      purgatorium: "연옥 화상",
      abyssalGarden: "심연의 정원",
      slow: "둔화"
    };
    const statusFieldNameMap = {
      remaining: "남은시간",
      reduction: "피해감소",
      value: "값",
      stacks: "중첩",
      dps: "초당피해",
      elapsed: "경과",
      poison: "독",
      fire: "화염",
      slow: "둔화"
    };
    return keys
      .map((key) => {
        const status = statusObj[key];
        const parts = Object.entries(status)
          .map(([k, value]) => `${statusFieldNameMap[k] || k}:${value}`)
          .join(" ");
        return `<span class="status-pill">${statusNameMap[key] || key} ${parts}</span>`;
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
    dom.heartText.textContent = `마나 하트: ${usedHearts} / ${player.maxHearts}`;
    dom.heartText.style.color = usedHearts > player.maxHearts ? "var(--danger)" : "var(--heart)";

    if (gameState.mode === "prep") {
      dom.phasePill.textContent = "준비";
    }

    const mainEditable = gameState.mode === "prep";
    dom.loadoutSelects.querySelectorAll("select").forEach((select) => {
      select.disabled = !mainEditable;
    });

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
    log("프로토타입 준비 완료. 로드아웃을 구성하고 전투를 시작하세요.");
  }

  init();
})();
