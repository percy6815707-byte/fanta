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
    enemyPortraitFrame: document.getElementById("enemy-portrait-frame"),
    enemyStatusBar: document.getElementById("enemy-status-bar"),
    rearrangePanel: document.getElementById("rearrange-panel"),
    rearrangeTimerText: document.getElementById("rearrange-timer-text"),
    rearrangeHeartText: document.getElementById("rearrange-heart-text"),
    rearrangeError: document.getElementById("rearrange-error"),
    rearrangeSlots: document.getElementById("rearrange-slots"),
    readyBtn: document.getElementById("ready-btn")
  };

  const spellLibrary = {
    magicMissile: {
      id: "magicMissile",
      name: "매직 미사일",
      color: "blue",
      colorKo: "청",
      archetype: "극딜",
      manaCost: 18,
      cooldown: 2.4,
      heartCost: 2,
      damage: [14, 20]
    },
    glacialSpike: {
      id: "glacialSpike",
      name: "글레이셜 스파이크",
      color: "blue",
      colorKo: "청",
      archetype: "제어",
      manaCost: 26,
      cooldown: 4.8,
      heartCost: 3,
      damage: [22, 30],
      applyStatus: { id: "slow", stacks: 1, duration: 4, slowPct: 18 }
    },
    emberLance: {
      id: "emberLance",
      name: "엠버 랜스",
      color: "red",
      colorKo: "적",
      archetype: "지속딜",
      manaCost: 24,
      cooldown: 3.5,
      heartCost: 2,
      damage: [18, 24],
      applyStatus: { id: "burn", stacks: 2, duration: 6, dps: 4 }
    },
    crimsonTrueName: {
      id: "crimsonTrueName",
      name: "적색 진명",
      color: "red",
      colorKo: "적",
      archetype: "극딜",
      manaCost: 48,
      cooldown: 8,
      heartCost: 4,
      damage: [72, 88],
      applyStatus: { id: "burn", stacks: 3, duration: 6, dps: 4 },
      isHighCircle: true,
      enemyCastName: "불꽃이 내리는 하늘"
    },
    toxicRain: {
      id: "toxicRain",
      name: "톡식 레인",
      color: "green",
      colorKo: "녹",
      archetype: "지속딜",
      manaCost: 28,
      cooldown: 5.2,
      heartCost: 3,
      damage: [16, 22],
      applyStatus: { id: "poison", stacks: 3, duration: 8, dps: 3 }
    },
    verdantWard: {
      id: "verdantWard",
      name: "베르던트 워드",
      color: "green",
      colorKo: "녹",
      archetype: "제어",
      manaCost: 30,
      cooldown: 6,
      heartCost: 3,
      damage: [12, 18],
      heal: [14, 22]
    }
  };

  const spellList = Object.values(spellLibrary);

  const phaseDefs = [
    { name: "개전", maxHp: 560, enemyDamage: [16, 23], enemySkillName: "무채색 균열" },
    { name: "사냥꾼의 영역", maxHp: 720, enemyDamage: [22, 32], enemySkillName: "불꽃이 내리는 하늘" },
    { name: "붉은 월식", maxHp: 860, enemyDamage: [28, 38], enemySkillName: "절멸의 심판" }
  ];

  const state = {
    mode: "prep",
    cooldowns: Object.fromEntries(spellList.map((spell) => [spell.id, 0])),
    castGap: 0,
    isRunning: false,
    rearrangeRemaining: 0,
    phaseIndex: 0
  };

  const player = {
    hp: 380,
    maxHp: 380,
    mp: 210,
    maxMp: 210,
    manaRegen: 18,
    maxHearts: 10,
    spellSlots: ["magicMissile", "emberLance", "toxicRain", "crimsonTrueName"]
  };

  const enemy = {
    hp: phaseDefs[0].maxHp,
    maxHp: phaseDefs[0].maxHp,
    basicAttackTimer: 2.2,
    skillTimer: 7,
    statuses: {}
  };

  const ui = {};
  const systems = {};

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function currentPhase() {
    return phaseDefs[state.phaseIndex];
  }

  function getUsedHearts(slots = player.spellSlots) {
    return slots.reduce((sum, id) => {
      const spell = spellLibrary[id];
      return sum + (spell ? spell.heartCost : 0);
    }, 0);
  }

  function formatNumber(value) {
    return Number(value).toFixed(1);
  }

  // ui/combatLog
  ui.combatLog = (() => {
    const MAX_LINES = 6;

    return {
      push(message, important = false) {
        const item = document.createElement("li");
        item.textContent = message;
        if (important) {
          item.classList.add("important");
        }
        dom.combatLog.appendChild(item);
        while (dom.combatLog.children.length > MAX_LINES) {
          dom.combatLog.removeChild(dom.combatLog.firstChild);
        }
        dom.combatLog.scrollTop = dom.combatLog.scrollHeight;
      },
      clear() {
        dom.combatLog.innerHTML = "";
      }
    };
  })();

  // ui/enemyPortraitEffects
  ui.enemyPortraitEffects = (() => {
    const classes = ["hit-blue", "hit-red", "hit-green"];

    function classByColor(color) {
      if (color === "red") return "hit-red";
      if (color === "green") return "hit-green";
      return "hit-blue";
    }

    return {
      trigger(color) {
        const targetClass = classByColor(color);
        dom.enemyPortraitFrame.classList.remove(...classes);
        void dom.enemyPortraitFrame.offsetWidth;
        dom.enemyPortraitFrame.classList.add(targetClass);
        dom.enemyPortraitFrame.addEventListener("animationend", () => {
          dom.enemyPortraitFrame.classList.remove(targetClass);
        }, { once: true });
      }
    };
  })();

  // ui/enemyStatusBar
  ui.enemyStatusBar = (() => {
    const infoMap = {
      burn: { icon: "🔥", name: "화상" },
      poison: { icon: "☠️", name: "중독" },
      slow: { icon: "❄️", name: "둔화" }
    };

    function tooltipText(id, status) {
      const lines = [];
      const base = infoMap[id] || { name: id };
      lines.push(`${base.name} (${status.stacks || 1}스택)`);
      if (typeof status.dps === "number") {
        lines.push(`매초 ${status.dps * (status.stacks || 1)} 피해`);
      }
      if (typeof status.slowPct === "number") {
        lines.push(`감속 ${status.slowPct}%`);
      }
      lines.push(`${formatNumber(Math.max(0, status.remaining))}초 남음`);
      return lines.join("\n");
    }

    function closeAll() {
      dom.enemyStatusBar.querySelectorAll(".status-icon").forEach((el) => el.classList.remove("open"));
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".status-icon")) {
        closeAll();
      }
    });

    return {
      render(statuses) {
        const entries = Object.entries(statuses).filter(([, status]) => status && status.remaining > 0);
        dom.enemyStatusBar.innerHTML = "";
        entries.forEach(([id, status]) => {
          const data = infoMap[id] || { icon: "?", name: id };
          const node = document.createElement("button");
          node.type = "button";
          node.className = "status-icon";
          node.innerHTML = `
            <span>${data.icon}</span>
            <span class="status-stack">${status.stacks || 1}</span>
            <span class="status-tooltip">${tooltipText(id, status).replace(/\n/g, "<br>")}</span>
          `;
          node.addEventListener("click", (event) => {
            event.stopPropagation();
            const opened = node.classList.contains("open");
            closeAll();
            if (!opened) {
              node.classList.add("open");
            }
          });
          dom.enemyStatusBar.appendChild(node);
        });
      }
    };
  })();

  // ui/spellBar
  ui.spellBar = (() => {
    const flashing = new Set();

    function formatCd(value) {
      return `CD ${value > 0 ? value.toFixed(1) : "0.0"}`;
    }

    function dotByColor(color) {
      if (color === "red") return "● 적";
      if (color === "green") return "● 녹";
      return "● 청";
    }

    function slotState(spell) {
      const cd = state.cooldowns[spell.id] || 0;
      if (cd > 0) return "cooldown";
      if (player.mp < spell.manaCost) return "low-mp";
      return "ready";
    }

    return {
      flash(index) {
        flashing.add(index);
        setTimeout(() => flashing.delete(index), 200);
      },
      render() {
        dom.spellSlots.innerHTML = "";

        player.spellSlots.forEach((spellId, index) => {
          const spell = spellLibrary[spellId];
          const cd = state.cooldowns[spell.id] || 0;
          const progress = Math.min(1, cd / spell.cooldown);
          const card = document.createElement("article");
          const status = slotState(spell);

          card.className = `spell-slot ${spell.color} ${status}`;
          if (flashing.has(index)) {
            card.classList.add("casting");
          }

          card.innerHTML = `
            <div class="spell-name">${spell.name}</div>
            <div class="spell-meta">
              <span class="meta-inline">
                <span class="color-dot">${dotByColor(spell.color)}</span>
                <span class="archetype-tag">${spell.archetype}</span>
              </span>
              <span>MP ${spell.manaCost} ${formatCd(cd)}s</span>
              ${status === "low-mp" ? '<span class="spell-warning">MP 부족</span>' : ""}
            </div>
            <div class="cooldown-overlay"><div class="cooldown-fill" style="--cd-progress:${progress}"></div></div>
          `;
          dom.spellSlots.appendChild(card);
        });
      }
    };
  })();

  // systems/statusSystem
  systems.statusSystem = (() => {
    function mergeStatus(current, incoming) {
      if (!current) {
        return { ...incoming, tick: 0 };
      }
      return {
        ...current,
        stacks: Math.max(current.stacks || 1, incoming.stacks || 1),
        remaining: Math.max(current.remaining || 0, incoming.remaining || 0),
        dps: incoming.dps ?? current.dps,
        slowPct: incoming.slowPct ?? current.slowPct,
        tick: current.tick || 0
      };
    }

    return {
      applyEnemyStatus(payload) {
        const id = payload.id;
        enemy.statuses[id] = mergeStatus(enemy.statuses[id], payload);
      },
      update(dt) {
        Object.entries(enemy.statuses).forEach(([id, status]) => {
          if (!status) return;

          status.remaining -= dt;
          status.tick = (status.tick || 0) + dt;

          if (status.dps) {
            while (status.tick >= 1) {
              status.tick -= 1;
              enemy.hp = Math.max(0, enemy.hp - status.dps * (status.stacks || 1));
            }
          }

          if (status.remaining <= 0) {
            delete enemy.statuses[id];
          }
        });
      }
    };
  })();

  // systems/phaseSystem
  systems.phaseSystem = (() => {
    function renderRearrangeSelectors() {
      dom.rearrangeSlots.innerHTML = "";

      for (let i = 0; i < 4; i += 1) {
        const wrap = document.createElement("div");
        wrap.className = "rearrange-slot";

        const options = spellList
          .map((spell) => `<option value="${spell.id}">${spell.name} | 하트 ${spell.heartCost} | MP ${spell.manaCost}</option>`)
          .join("");

        wrap.innerHTML = `
          <label for="rearrange-slot-${i}">슬롯 ${i + 1}</label>
          <select id="rearrange-slot-${i}">${options}</select>
        `;

        const select = wrap.querySelector("select");
        select.value = player.spellSlots[i];

        select.addEventListener("change", (event) => {
          const before = [...player.spellSlots];
          player.spellSlots[i] = event.target.value;
          if (getUsedHearts(player.spellSlots) > player.maxHearts) {
            player.spellSlots = before;
            event.target.value = before[i];
            dom.rearrangeError.textContent = "마나 하트 한도를 초과했습니다.";
          } else {
            dom.rearrangeError.textContent = "";
            ui.spellBar.render();
            updateBaseUI();
          }
          dom.rearrangeHeartText.textContent = `마나 하트: ${getUsedHearts()} / ${player.maxHearts}`;
        });

        dom.rearrangeSlots.appendChild(wrap);
      }
    }

    function enterRearrangeMode() {
      state.mode = "rearrange";
      state.rearrangeRemaining = 10;
      dom.rearrangePanel.classList.remove("hidden");
      dom.rearrangeError.textContent = "";
      dom.rearrangeHeartText.textContent = `마나 하트: ${getUsedHearts()} / ${player.maxHearts}`;
      renderRearrangeSelectors();

      ui.combatLog.push("마법서 재배치 시간(10초).", true);
      systems.combatLoop.setPaused(true);
    }

    return {
      maybeAdvance() {
        if (enemy.hp > 0) {
          return false;
        }

        if (state.phaseIndex < phaseDefs.length - 1) {
          state.phaseIndex += 1;
          const phase = currentPhase();
          enemy.maxHp = phase.maxHp;
          enemy.hp = phase.maxHp;
          enemy.statuses = {};
          enemy.basicAttackTimer = 2.2;
          enemy.skillTimer = 6.8;

          ui.combatLog.push(`- 페이즈 ${state.phaseIndex + 1}: '${phase.name}' -`, true);
          enterRearrangeMode();
          return true;
        }

        state.mode = "victory";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("전투 승리.", true);
        return true;
      },
      updateRearrange(dt) {
        if (state.mode !== "rearrange") {
          return;
        }
        state.rearrangeRemaining = Math.max(0, state.rearrangeRemaining - dt);
        dom.rearrangeTimerText.textContent = `남은 시간: ${state.rearrangeRemaining.toFixed(1)}초`;
        if (state.rearrangeRemaining <= 0) {
          this.exitRearrange();
        }
      },
      exitRearrange() {
        if (state.mode !== "rearrange") {
          return;
        }
        dom.rearrangePanel.classList.add("hidden");
        state.mode = "running";
        systems.combatLoop.setPaused(false);
        ui.combatLog.push("마법서 재배치 종료. 전투 재개.", true);
      }
    };
  })();

  // systems/combatLoop
  systems.combatLoop = (() => {
    let rafId = null;
    let lastTs = 0;
    let paused = true;

    function frame(ts) {
      if (!rafId) return;
      if (!lastTs) lastTs = ts;

      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      if (!paused) {
        if (state.mode === "running") {
          runCombat(dt);
        }
        if (state.mode === "rearrange") {
          systems.phaseSystem.updateRearrange(dt);
        }
      }

      updateBaseUI();
      ui.spellBar.render();
      ui.enemyStatusBar.render(enemy.statuses);
      rafId = requestAnimationFrame(frame);
    }

    return {
      start() {
        if (rafId) return;
        lastTs = 0;
        rafId = requestAnimationFrame(frame);
      },
      setPaused(next) {
        paused = next;
      }
    };
  })();

  function castPlayerSpell(slotIndex, spell) {
    player.mp = Math.max(0, player.mp - spell.manaCost);
    state.cooldowns[spell.id] = spell.cooldown;
    ui.spellBar.flash(slotIndex);
    ui.enemyPortraitEffects.trigger(spell.color);

    const damage = randomInt(spell.damage[0], spell.damage[1]);
    enemy.hp = Math.max(0, enemy.hp - damage);

    let line = `플레이어의 ${spell.name} 발동! ${damage} 피해.`;

    if (spell.heal) {
      const heal = randomInt(spell.heal[0], spell.heal[1]);
      player.hp = Math.min(player.maxHp, player.hp + heal);
      line += ` ${heal} 회복.`;
    }

    ui.combatLog.push(line, Boolean(spell.isHighCircle));

    if (spell.applyStatus) {
      systems.statusSystem.applyEnemyStatus(spell.applyStatus);
    }
  }

  function runAutoCast(dt) {
    state.castGap = Math.max(0, state.castGap - dt);
    if (state.castGap > 0) return;

    for (let i = 0; i < player.spellSlots.length; i += 1) {
      const spell = spellLibrary[player.spellSlots[i]];
      if (!spell) continue;
      if ((state.cooldowns[spell.id] || 0) > 0) continue;
      if (player.mp < spell.manaCost) continue;

      castPlayerSpell(i, spell);
      state.castGap = 0.24;
      return;
    }
  }

  function runEnemy(dt) {
    const phase = currentPhase();
    const slow = enemy.statuses.slow ? (enemy.statuses.slow.slowPct || 0) / 100 : 0;
    const attackSpeedFactor = 1 + slow;

    enemy.basicAttackTimer -= dt;
    enemy.skillTimer -= dt;

    if (enemy.basicAttackTimer <= 0) {
      enemy.basicAttackTimer += 2.2 * attackSpeedFactor;
      const dmg = randomInt(phase.enemyDamage[0], phase.enemyDamage[1]);
      player.hp = Math.max(0, player.hp - dmg);
      ui.combatLog.push(`적 기본 공격! ${dmg} 피해.`);
    }

    if (enemy.skillTimer <= 0) {
      enemy.skillTimer += 6.5 * attackSpeedFactor;
      const dmg = randomInt(phase.enemyDamage[1] + 14, phase.enemyDamage[1] + 28);
      player.hp = Math.max(0, player.hp - dmg);
      ui.combatLog.push(`알렌: 4서클 마법 '${phase.enemySkillName}'! ${dmg} 피해.`, true);
    }
  }

  function runCombat(dt) {
    player.mp = Math.min(player.maxMp, player.mp + player.manaRegen * dt);

    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = Math.max(0, (state.cooldowns[spell.id] || 0) - dt);
    });

    systems.statusSystem.update(dt);

    if (!systems.phaseSystem.maybeAdvance()) {
      runAutoCast(dt);
      runEnemy(dt);

      if (player.hp <= 0) {
        state.mode = "defeat";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("전투 패배.", true);
      }

      systems.phaseSystem.maybeAdvance();
    }
  }

  function updateBaseUI() {
    dom.playerHpFill.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    dom.playerMpFill.style.width = `${Math.max(0, (player.mp / player.maxMp) * 100)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;

    dom.heartText.textContent = `마나 하트: ${getUsedHearts()} / ${player.maxHearts}`;

    if (state.mode === "running") dom.phasePill.textContent = `페이즈 ${state.phaseIndex + 1}`;
    if (state.mode === "rearrange") dom.phasePill.textContent = "재배치";
    if (state.mode === "victory") dom.phasePill.textContent = "승리";
    if (state.mode === "defeat") dom.phasePill.textContent = "패배";
    if (state.mode === "prep") dom.phasePill.textContent = "준비";
  }

  function resetBattle() {
    state.mode = "prep";
    state.phaseIndex = 0;
    state.castGap = 0;
    state.rearrangeRemaining = 0;

    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = 0;
    });

    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.spellSlots = ["magicMissile", "emberLance", "toxicRain", "crimsonTrueName"];

    enemy.maxHp = phaseDefs[0].maxHp;
    enemy.hp = enemy.maxHp;
    enemy.basicAttackTimer = 2.2;
    enemy.skillTimer = 7;
    enemy.statuses = {};

    dom.rearrangePanel.classList.add("hidden");
    systems.combatLoop.setPaused(true);

    ui.combatLog.clear();
    ui.combatLog.push("전투 초기화 완료.");
    updateBaseUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
  }

  function startBattle() {
    if (state.mode === "running" || state.mode === "rearrange") {
      return;
    }
    if (state.mode === "victory" || state.mode === "defeat") {
      resetBattle();
    }
    state.mode = "running";
    systems.combatLoop.setPaused(false);
    ui.combatLog.push("전투 시작.");
  }

  function bindEvents() {
    dom.startBtn.addEventListener("click", startBattle);
    dom.resetBtn.addEventListener("click", resetBattle);
    dom.readyBtn.addEventListener("click", () => {
      systems.phaseSystem.exitRearrange();
    });
  }

  function init() {
    bindEvents();
    systems.combatLoop.start();
    resetBattle();
    updateBaseUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
  }

  init();
})();
