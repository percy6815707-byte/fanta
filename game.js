(() => {
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
    spellSlots: document.getElementById("spell-slots"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    enemyPortraitFrame: document.getElementById("enemy-portrait-frame")
  };

  const spells = [
    {
      id: "magicMissile",
      name: "매직 미사일",
      color: "blue",
      circle: 1,
      manaCost: 18,
      cooldown: 2.4,
      minDamage: 14,
      maxDamage: 20,
      castLog: (damage) => `플레이어의 매직 미사일 발동! ${damage} 피해를 입혔다.`
    },
    {
      id: "verdantPulse",
      name: "베르던트 펄스",
      color: "green",
      circle: 2,
      manaCost: 22,
      cooldown: 4.2,
      minDamage: 10,
      maxDamage: 15,
      onCast: () => {
        player.hp = Math.min(player.maxHp, player.hp + 22);
      },
      castLog: (damage) => `플레이어의 베르던트 펄스 발동! ${damage} 피해 + 체력 회복.`
    },
    {
      id: "frostNeedles",
      name: "프로스트 니들",
      color: "blue",
      circle: 3,
      manaCost: 28,
      cooldown: 5.4,
      minDamage: 23,
      maxDamage: 34,
      onCast: () => {
        addEnemyStatus("poison", { stacks: 2, remaining: 5 });
      },
      castLog: (damage) => `플레이어의 프로스트 니들 발동! ${damage} 피해를 입혔다. 중독 2스택.`
    },
    {
      id: "crimsonTrueName",
      name: "적색 진명",
      color: "red",
      circle: 4,
      manaCost: 48,
      cooldown: 8,
      minDamage: 72,
      maxDamage: 88,
      onCast: () => {
        addEnemyStatus("burn", { stacks: 3, remaining: 7 });
      },
      castLog: (damage) => `알렌의 4서클 마법, 적색 진명 발동! ${damage} 피해를 입었다. 화상 3스택.`
    }
  ];

  const gameState = {
    mode: "prep",
    time: 0,
    autoCastGap: 0,
    cooldowns: Object.fromEntries(spells.map((spell) => [spell.id, 0]))
  };

  const player = {
    hp: 340,
    maxHp: 340,
    mp: 180,
    maxMp: 180,
    manaRegen: 18,
    spellSlots: spells.map((spell) => spell.id)
  };

  const enemy = {
    hp: 980,
    maxHp: 980,
    attackTimer: 1.8,
    skillTimer: 5.8,
    statuses: {
      burn: null,
      poison: null
    }
  };

  const ui = {};
  const systems = {};

  // ui/combatLog
  ui.combatLog = (() => {
    const MAX_LINES = 6;

    function isImportant(message) {
      return /치명타|4서클|5서클|상태|스택|화상|중독/.test(message);
    }

    return {
      push(message, options = {}) {
        const item = document.createElement("li");
        item.textContent = message;
        if (options.important || isImportant(message)) {
          item.classList.add("important");
        }
        dom.combatLog.appendChild(item);
        while (dom.combatLog.children.length > MAX_LINES) {
          dom.combatLog.removeChild(dom.combatLog.firstChild);
        }
        dom.combatLog.scrollTop = dom.combatLog.scrollHeight;
      },
      reset() {
        dom.combatLog.innerHTML = "";
      }
    };
  })();

  // ui/enemyPortraitEffects
  ui.enemyPortraitEffects = (() => {
    const classes = ["hit-blue", "hit-red", "hit-green"];

    function classByColor(color) {
      if (color === "red") {
        return "hit-red";
      }
      if (color === "green") {
        return "hit-green";
      }
      return "hit-blue";
    }

    return {
      trigger(color) {
        const targetClass = classByColor(color);
        dom.enemyPortraitFrame.classList.remove(...classes);
        void dom.enemyPortraitFrame.offsetWidth;
        dom.enemyPortraitFrame.classList.add(targetClass);
        const cleanup = () => {
          dom.enemyPortraitFrame.classList.remove(targetClass);
        };
        dom.enemyPortraitFrame.addEventListener("animationend", cleanup, { once: true });
      }
    };
  })();

  // ui/spellBar
  ui.spellBar = (() => {
    const flashing = new Set();

    function slotState(spell) {
      const cooldownRemaining = gameState.cooldowns[spell.id] || 0;
      if (cooldownRemaining > 0) {
        return "cooldown";
      }
      if (player.mp < spell.manaCost) {
        return "low-mp";
      }
      return "ready";
    }

    function formatCooldown(cooldownRemaining) {
      return cooldownRemaining > 0 ? `CD ${cooldownRemaining.toFixed(1)}s` : "CD 0.0s";
    }

    return {
      flash(slotIndex) {
        flashing.add(slotIndex);
        setTimeout(() => {
          flashing.delete(slotIndex);
        }, 200);
      },
      render() {
        dom.spellSlots.innerHTML = "";
        for (let i = 0; i < 4; i += 1) {
          const spell = spells[i];
          const card = document.createElement("article");
          const cooldownRemaining = gameState.cooldowns[spell.id] || 0;
          const cooldownProgress = Math.min(1, cooldownRemaining / spell.cooldown);
          const state = slotState(spell);

          card.className = `spell-slot ${spell.color} ${state}`;
          if (flashing.has(i)) {
            card.classList.add("casting");
          }

          const warning = state === "low-mp" ? '<span class="spell-warning">MP 부족</span>' : "";
          card.innerHTML = `
            <div class="spell-name">${spell.name}</div>
            <div class="spell-meta">
              <span>MP ${spell.manaCost}</span>
              <span>${formatCooldown(cooldownRemaining)}</span>
              ${warning}
            </div>
            <div class="cooldown-overlay">
              <div class="cooldown-fill" style="--cd-progress:${cooldownProgress}"></div>
            </div>
          `;
          dom.spellSlots.appendChild(card);
        }
      }
    };
  })();

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addEnemyStatus(type, payload) {
    const base = enemy.statuses[type] || { stacks: 0, remaining: 0, tick: 0 };
    enemy.statuses[type] = {
      stacks: Math.max(base.stacks, payload.stacks),
      remaining: Math.max(base.remaining, payload.remaining),
      tick: base.tick
    };
  }

  function dealEnemyDamage(amount) {
    enemy.hp = Math.max(0, enemy.hp - amount);
  }

  function dealPlayerDamage(amount) {
    player.hp = Math.max(0, player.hp - amount);
  }

  function castSpell(slotIndex, spell) {
    player.mp = Math.max(0, player.mp - spell.manaCost);
    gameState.cooldowns[spell.id] = spell.cooldown;
    ui.spellBar.flash(slotIndex);
    ui.enemyPortraitEffects.trigger(spell.color);

    let damage = randomInt(spell.minDamage, spell.maxDamage);
    const critical = Math.random() < 0.22;
    if (critical) {
      damage = Math.floor(damage * 1.5);
    }

    dealEnemyDamage(damage);
    if (typeof spell.onCast === "function") {
      spell.onCast();
    }

    ui.combatLog.push(spell.castLog(damage), {
      important: spell.circle >= 4 || critical
    });
    if (critical) {
      ui.combatLog.push(`치명타 적중! ${spell.name}의 피해가 강화되었다.`, { important: true });
    }
  }

  function runAutoCast(dt) {
    gameState.autoCastGap = Math.max(0, gameState.autoCastGap - dt);
    if (gameState.autoCastGap > 0) {
      return;
    }

    for (let i = 0; i < 4; i += 1) {
      const spell = spells[i];
      if ((gameState.cooldowns[spell.id] || 0) > 0) {
        continue;
      }
      if (player.mp < spell.manaCost) {
        continue;
      }
      castSpell(i, spell);
      gameState.autoCastGap = 0.22;
      return;
    }
  }

  function tickEnemyStatuses(dt) {
    ["burn", "poison"].forEach((key) => {
      const status = enemy.statuses[key];
      if (!status) {
        return;
      }

      status.remaining -= dt;
      status.tick += dt;

      while (status.tick >= 1) {
        status.tick -= 1;
        if (key === "burn") {
          const damage = status.stacks * 6;
          dealEnemyDamage(damage);
          ui.combatLog.push(`화상 ${status.stacks}스택: ${damage} 피해를 입혔다.`, { important: true });
        }
        if (key === "poison") {
          const damage = status.stacks * 4;
          dealEnemyDamage(damage);
          ui.combatLog.push(`중독 ${status.stacks}스택: ${damage} 피해를 입혔다.`, { important: true });
        }
      }

      if (status.remaining <= 0) {
        enemy.statuses[key] = null;
      }
    });
  }

  function runEnemyAI(dt) {
    enemy.attackTimer -= dt;
    enemy.skillTimer -= dt;

    if (enemy.attackTimer <= 0) {
      enemy.attackTimer += 1.8;
      const damage = randomInt(14, 22);
      dealPlayerDamage(damage);
      ui.combatLog.push(`적의 기본 공격: ${damage} 피해를 받았다.`);
    }

    if (enemy.skillTimer <= 0) {
      enemy.skillTimer += randomInt(7, 9);
      const heavy = Math.random() < 0.45;
      const circle = heavy ? 5 : 4;
      const damage = heavy ? randomInt(42, 54) : randomInt(32, 43);
      dealPlayerDamage(damage);
      ui.combatLog.push(`적의 ${circle}서클 마법 폭주! ${damage} 피해를 입었다. 감전 상태.`, { important: true });
    }
  }

  function updateCooldowns(dt) {
    spells.forEach((spell) => {
      gameState.cooldowns[spell.id] = Math.max(0, (gameState.cooldowns[spell.id] || 0) - dt);
    });
  }

  function updateUI() {
    const playerHpPct = (player.hp / player.maxHp) * 100;
    const playerMpPct = (player.mp / player.maxMp) * 100;
    const bossHpPct = (enemy.hp / enemy.maxHp) * 100;

    dom.playerHpFill.style.width = `${Math.max(0, playerHpPct)}%`;
    dom.playerMpFill.style.width = `${Math.max(0, playerMpPct)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, bossHpPct)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;

    dom.heartText.textContent = `마나 하트: ${player.spellSlots.length} / 4`;

    if (gameState.mode === "running") {
      dom.phasePill.textContent = "전투 중";
    }
    if (gameState.mode === "victory") {
      dom.phasePill.textContent = "승리";
    }
    if (gameState.mode === "defeat") {
      dom.phasePill.textContent = "패배";
    }
    if (gameState.mode === "prep") {
      dom.phasePill.textContent = "준비";
    }

    ui.spellBar.render();
  }

  function checkEndState() {
    if (enemy.hp <= 0 && gameState.mode === "running") {
      gameState.mode = "victory";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("적이 쓰러졌다. 전투 승리.", { important: true });
    }
    if (player.hp <= 0 && gameState.mode === "running") {
      gameState.mode = "defeat";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("플레이어가 쓰러졌다. 전투 패배.", { important: true });
    }
  }

  function resetCombat() {
    gameState.mode = "prep";
    gameState.time = 0;
    gameState.autoCastGap = 0;

    spells.forEach((spell) => {
      gameState.cooldowns[spell.id] = 0;
    });

    player.hp = player.maxHp;
    player.mp = player.maxMp;

    enemy.hp = enemy.maxHp;
    enemy.attackTimer = 1.8;
    enemy.skillTimer = 5.8;
    enemy.statuses.burn = null;
    enemy.statuses.poison = null;

    systems.combatLoop.setPaused(true);
    ui.combatLog.reset();
    ui.combatLog.push("전투 초기화 완료. 전투 시작 버튼을 누르세요.");
    updateUI();
  }

  // systems/combatLoop
  systems.combatLoop = (() => {
    let rafId = null;
    let lastTime = 0;
    let paused = true;
    let speed = 1;

    function frame(ts) {
      if (!rafId) {
        return;
      }

      if (!lastTime) {
        lastTime = ts;
      }

      const rawDt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;

      if (!paused && gameState.mode === "running") {
        const dt = rawDt * speed;
        gameState.time += dt;

        player.mp = Math.min(player.maxMp, player.mp + player.manaRegen * dt);
        updateCooldowns(dt);
        tickEnemyStatuses(dt);
        runAutoCast(dt);
        runEnemyAI(dt);
        checkEndState();
      }

      updateUI();
      rafId = requestAnimationFrame(frame);
    }

    return {
      start() {
        if (rafId) {
          return;
        }
        lastTime = 0;
        rafId = requestAnimationFrame(frame);
      },
      stop() {
        if (!rafId) {
          return;
        }
        cancelAnimationFrame(rafId);
        rafId = null;
      },
      setPaused(nextPaused) {
        paused = nextPaused;
      },
      setSpeed(nextSpeed) {
        speed = Math.max(0.1, nextSpeed);
      }
    };
  })();

  function bindEvents() {
    dom.startBtn.addEventListener("click", () => {
      if (gameState.mode === "running") {
        return;
      }
      if (gameState.mode === "victory" || gameState.mode === "defeat") {
        resetCombat();
      }
      gameState.mode = "running";
      systems.combatLoop.setPaused(false);
      ui.combatLog.push("전투 시작: 주문이 자동 순환 발동합니다.");
    });

    dom.resetBtn.addEventListener("click", () => {
      resetCombat();
    });
  }

  function init() {
    bindEvents();
    systems.combatLoop.start();
    resetCombat();
    ui.combatLog.push("프로토타입 준비 완료.");
  }

  init();
})();
