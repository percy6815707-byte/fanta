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
    enemyFloatLayer: document.getElementById("enemy-float-layer"),
    rearrangePanel: document.getElementById("rearrange-panel"),
    rearrangeTimerText: document.getElementById("rearrange-timer-text"),
    rearrangeHeartText: document.getElementById("rearrange-heart-text"),
    rearrangeError: document.getElementById("rearrange-error"),
    rearrangeSlots: document.getElementById("rearrange-slots"),
    readyBtn: document.getElementById("ready-btn"),
    phaseOverlay: document.getElementById("phase-overlay"),
    phaseOverlayTitle: document.getElementById("phase-overlay-title"),
    phaseOverlayQuote: document.getElementById("phase-overlay-quote")
  };

  const spellLibrary = {
    magicMissile: {
      id: "magicMissile",
      name: "매직 미사일",
      color: "blue",
      archetype: "극딜",
      manaCost: 18,
      cooldown: 2.4,
      heartCost: 2,
      damage: [14, 21]
    },
    glacialSpike: {
      id: "glacialSpike",
      name: "글레이셜 스파이크",
      color: "blue",
      archetype: "제어",
      manaCost: 26,
      cooldown: 4.8,
      heartCost: 3,
      damage: [20, 30],
      applyEnemyStatus: { id: "slow", stacks: 1, duration: 4, slowPct: 18 }
    },
    emberLance: {
      id: "emberLance",
      name: "엠버 랜스",
      color: "red",
      archetype: "지속딜",
      manaCost: 24,
      cooldown: 3.4,
      heartCost: 2,
      damage: [18, 25],
      applyEnemyStatus: { id: "burn", stacks: 2, duration: 6, dps: 4 }
    },
    toxicRain: {
      id: "toxicRain",
      name: "톡식 레인",
      color: "green",
      archetype: "지속딜",
      manaCost: 28,
      cooldown: 5.2,
      heartCost: 3,
      damage: [16, 24],
      applyEnemyStatus: { id: "poison", stacks: 3, duration: 8, dps: 3 }
    },
    aegisVeil: {
      id: "aegisVeil",
      name: "아이기스 베일",
      color: "green",
      archetype: "제어",
      manaCost: 30,
      cooldown: 6,
      heartCost: 3,
      damage: [8, 14],
      shield: 72,
      dampen: { duration: 4, reduction: 0.16 }
    },
    crimsonTrueName: {
      id: "crimsonTrueName",
      name: "적색 진명",
      color: "red",
      archetype: "극딜",
      manaCost: 48,
      cooldown: 8,
      heartCost: 4,
      damage: [72, 90],
      applyEnemyStatus: { id: "burn", stacks: 3, duration: 6, dps: 4 },
      highCircle: true
    }
  };

  const spellList = Object.values(spellLibrary);

  const phaseDefs = [
    {
      id: 1,
      name: "적색 진명",
      title: "페이즈 1: 적색 진명",
      quote: "불꽃은 거짓말을 하지 않는다. 네가 약할 뿐이다.",
      maxHp: 640
    },
    {
      id: 2,
      name: "홍염의 폭주",
      title: "페이즈 2: 홍염의 폭주",
      quote: "이제 시험은 끝이다. 네가 버티는지 보겠다.",
      maxHp: 760
    },
    {
      id: 3,
      name: "푸르가토리움의 잔재",
      title: "페이즈 3: 푸르가토리움의 잔재",
      quote: "태워라… 전부 태워라… 남는 것은 재 뿐이다…",
      maxHp: 920
    }
  ];

  const state = {
    mode: "prep",
    cooldowns: Object.fromEntries(spellList.map((spell) => [spell.id, 0])),
    castGap: 0,
    phaseIndex: 0,
    rearrangeRemaining: 0,
    pendingTimeout: null,
    ai: {
      rapidTimer: 1.0,
      burstTimer: 4.6,
      basicTimer: 2.4,
      charging: false,
      chargeRemaining: 0,
      frenzyTimer: 2.8,
      phase3Tick: 0,
      phase3BurnTick: 0,
      phase3Ramp: 0,
      meltdownRemaining: 0
    }
  };

  const player = {
    hp: 560,
    maxHp: 560,
    mp: 320,
    maxMp: 320,
    manaRegen: 18,
    maxHearts: 10,
    shield: 0,
    spellSlots: ["magicMissile", "emberLance", "toxicRain", "crimsonTrueName"],
    statuses: {}
  };

  const enemy = {
    hp: phaseDefs[0].maxHp,
    maxHp: phaseDefs[0].maxHp,
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

  function usedHearts(slots = player.spellSlots) {
    return slots.reduce((sum, id) => {
      const spell = spellLibrary[id];
      return sum + (spell ? spell.heartCost : 0);
    }, 0);
  }

  function toFixed1(value) {
    return Number(value).toFixed(1);
  }

  function consumeShield(amount, shieldBreakMul) {
    if (player.shield <= 0 || amount <= 0) {
      return amount;
    }
    const absorbableIncoming = player.shield / shieldBreakMul;
    const absorbedIncoming = Math.min(amount, absorbableIncoming);
    player.shield = Math.max(0, player.shield - absorbedIncoming * shieldBreakMul);
    return amount - absorbedIncoming;
  }

  function playerReductionRate() {
    const dampen = player.statuses.dampen;
    return dampen ? dampen.reduction || 0 : 0;
  }

  function dealPlayerDamage(rawDamage, options = {}) {
    const shieldBreakMul = options.shieldBreakMul || 1;
    const afterShield = consumeShield(rawDamage, shieldBreakMul);
    const reduced = Math.floor(afterShield * (1 - playerReductionRate()));
    player.hp = Math.max(0, player.hp - reduced);
    return reduced;
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

  // ui/damageFloat
  ui.damageFloat = (() => {
    return {
      show(value) {
        const node = document.createElement("span");
        node.className = "dot-float";
        node.textContent = `-${value}`;
        node.style.left = `${48 + Math.random() * 14 - 7}%`;
        dom.enemyFloatLayer.appendChild(node);
        node.addEventListener("animationend", () => {
          node.remove();
        }, { once: true });
      }
    };
  })();

  // ui/phaseOverlay
  ui.phaseOverlay = (() => {
    return {
      show(title, quote) {
        dom.phaseOverlayTitle.textContent = title;
        dom.phaseOverlayQuote.textContent = quote;
        dom.phaseOverlay.classList.remove("hidden");
        dom.enemyPortraitFrame.classList.add("phase-silhouette");
      },
      hide() {
        dom.phaseOverlay.classList.add("hidden");
        dom.enemyPortraitFrame.classList.remove("phase-silhouette");
      }
    };
  })();

  // ui/enemyStatusBar
  ui.enemyStatusBar = (() => {
    const info = {
      burn: { icon: "🔥", name: "화상" },
      poison: { icon: "☠", name: "중독" },
      bleed: { icon: "🩸", name: "출혈" },
      slow: { icon: "🕒", name: "둔화" },
      stun: { icon: "⚡", name: "마비" },
      shield: { icon: "🛡", name: "보호막" },
      weak: { icon: "💥", name: "약점" },
      mark: { icon: "👁", name: "표식" },
      overheat: { icon: "⚠", name: "과열" }
    };

    function tooltipFor(id, status) {
      const base = info[id] || { name: id };
      const lines = [`${base.name} x${status.stacks || 1}`];
      if (typeof status.dps === "number") {
        lines.push(`매초 ${status.dps * (status.stacks || 1)} 피해`);
      }
      if (typeof status.slowPct === "number") {
        lines.push(`감속 ${status.slowPct}%`);
      }
      if (typeof status.vulnPct === "number") {
        lines.push(`받는 피해 +${status.vulnPct}%`);
      }
      if (typeof status.critPct === "number") {
        lines.push(`치명타율 +${status.critPct}%`);
      }
      if (typeof status.shieldBreakPct === "number") {
        lines.push(`보호막 피해 +${status.shieldBreakPct}%`);
      }
      lines.push(`${toFixed1(Math.max(0, status.remaining))}초 남음`);
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
        const entries = Object.entries(statuses).filter(([, value]) => value && value.remaining > 0);
        dom.enemyStatusBar.innerHTML = "";

        entries.forEach(([id, value]) => {
          const meta = info[id] || { icon: "?", name: id };
          const node = document.createElement("button");
          node.type = "button";
          node.className = "status-icon";
          node.innerHTML = `
            <span>${meta.icon}</span>
            <span class="status-stack">${value.stacks || 1}</span>
            <span class="status-tooltip">${tooltipFor(id, value).replace(/\n/g, "<br>")}</span>
          `;
          node.addEventListener("click", (event) => {
            event.stopPropagation();
            const opened = node.classList.contains("open");
            closeAll();
            if (!opened) node.classList.add("open");
          });
          dom.enemyStatusBar.appendChild(node);
        });
      }
    };
  })();

  // ui/spellBar
  ui.spellBar = (() => {
    const flashing = new Set();

    function colorLabel(color) {
      if (color === "red") return "● 적";
      if (color === "green") return "● 녹";
      return "● 청";
    }

    function stateClass(spell) {
      const cd = state.cooldowns[spell.id] || 0;
      if (cd > 0) return "cooldown";
      if (player.mp < spell.manaCost) return "low-mp";
      return "ready";
    }

    function cdText(value) {
      return `CD ${value > 0 ? value.toFixed(1) : "0.0"}s`;
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
          if (!spell) return;

          const cd = state.cooldowns[spell.id] || 0;
          const cdProgress = Math.min(1, cd / spell.cooldown);
          const card = document.createElement("article");

          card.className = `spell-slot ${spell.color} ${stateClass(spell)}`;
          if (flashing.has(index)) card.classList.add("casting");

          card.innerHTML = `
            <div class="spell-name">${spell.name}</div>
            <div class="spell-meta">
              <span class="meta-inline">
                <span class="color-dot">${colorLabel(spell.color)}</span>
                <span class="archetype-tag">${spell.archetype}</span>
              </span>
              <span>MP ${spell.manaCost} ${cdText(cd)}</span>
              ${player.mp < spell.manaCost && cd <= 0 ? '<span class="spell-warning">MP 부족</span>' : ""}
            </div>
            <div class="cooldown-overlay">
              <div class="cooldown-fill" style="--cd-progress:${cdProgress}"></div>
            </div>
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
        vulnPct: incoming.vulnPct ?? current.vulnPct,
        critPct: incoming.critPct ?? current.critPct,
        shieldBreakPct: incoming.shieldBreakPct ?? current.shieldBreakPct,
        tick: current.tick || 0
      };
    }

    return {
      applyEnemy(payload) {
        enemy.statuses[payload.id] = mergeStatus(enemy.statuses[payload.id], payload);
      },
      applyPlayer(payload) {
        player.statuses[payload.id] = mergeStatus(player.statuses[payload.id], payload);
      },
      tickEnemy(dt) {
        Object.entries(enemy.statuses).forEach(([id, status]) => {
          status.remaining -= dt;
          status.tick = (status.tick || 0) + dt;

          if (status.dps) {
            while (status.tick >= 1) {
              status.tick -= 1;
              const dmg = status.dps * (status.stacks || 1);
              enemy.hp = Math.max(0, enemy.hp - dmg);
              ui.damageFloat.show(dmg);
            }
          }

          if (status.remaining <= 0) {
            delete enemy.statuses[id];
          }
        });
      },
      tickPlayer(dt) {
        Object.entries(player.statuses).forEach(([id, status]) => {
          status.remaining -= dt;
          status.tick = (status.tick || 0) + dt;

          if (status.dps) {
            while (status.tick >= 1) {
              status.tick -= 1;
              dealPlayerDamage(status.dps * (status.stacks || 1));
            }
          }

          if (status.remaining <= 0) {
            delete player.statuses[id];
          }
        });
      },
      enemyVulnerability() {
        return enemy.statuses.weak ? enemy.statuses.weak.vulnPct || 0 : 0;
      },
      enemySlowRate() {
        return enemy.statuses.slow ? (enemy.statuses.slow.slowPct || 0) / 100 : 0;
      },
      enemyOverheatCrit() {
        return enemy.statuses.overheat ? enemy.statuses.overheat.critPct || 0 : 0;
      }
    };
  })();

  // systems/phaseSystem
  systems.phaseSystem = (() => {
    function clearTimeoutIfAny() {
      if (state.pendingTimeout) {
        clearTimeout(state.pendingTimeout);
        state.pendingTimeout = null;
      }
    }

    function setupPhaseAI() {
      state.ai.rapidTimer = 1.0;
      state.ai.burstTimer = 4.6;
      state.ai.basicTimer = 2.4;
      state.ai.charging = false;
      state.ai.chargeRemaining = 0;
      state.ai.frenzyTimer = 2.8;
      state.ai.phase3Tick = 0;
      state.ai.phase3BurnTick = 0;
      state.ai.phase3Ramp = 0;
      state.ai.meltdownRemaining = 0;

      if (state.phaseIndex === 2) {
        state.ai.meltdownRemaining = randomInt(16, 22);
      }
    }

    function renderRearrange() {
      dom.rearrangeSlots.innerHTML = "";

      for (let i = 0; i < 4; i += 1) {
        const block = document.createElement("div");
        block.className = "rearrange-slot";
        block.innerHTML = `
          <label for="rearrange-slot-${i}">슬롯 ${i + 1}</label>
          <select id="rearrange-slot-${i}">
            ${spellList
              .map((spell) => `<option value="${spell.id}">${spell.name} | 하트 ${spell.heartCost} | MP ${spell.manaCost}</option>`)
              .join("")}
          </select>
        `;

        const select = block.querySelector("select");
        select.value = player.spellSlots[i];

        select.addEventListener("change", (event) => {
          const before = [...player.spellSlots];
          player.spellSlots[i] = event.target.value;
          if (usedHearts(player.spellSlots) > player.maxHearts) {
            player.spellSlots = before;
            event.target.value = before[i];
            dom.rearrangeError.textContent = "마나 하트 한도를 초과했습니다.";
          } else {
            dom.rearrangeError.textContent = "";
          }
          dom.rearrangeHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
        });

        dom.rearrangeSlots.appendChild(block);
      }
    }

    return {
      resetPhase() {
        state.phaseIndex = 0;
        const phase = currentPhase();
        enemy.maxHp = phase.maxHp;
        enemy.hp = phase.maxHp;
        enemy.statuses = {};
        setupPhaseAI();
      },
      maybeHandlePhaseDeath() {
        if (enemy.hp > 0 || state.mode !== "running") {
          return false;
        }

        if (state.phaseIndex < phaseDefs.length - 1) {
          state.phaseIndex += 1;
          const phase = currentPhase();
          enemy.maxHp = phase.maxHp;
          enemy.hp = phase.maxHp;
          enemy.statuses = {};
          setupPhaseAI();

          state.mode = "phase-transition";
          systems.combatLoop.setPaused(true);
          ui.combatLog.push(`— 페이즈 ${phase.id}: '${phase.name}' —`, true);
          ui.phaseOverlay.show(phase.title, phase.quote);

          clearTimeoutIfAny();
          state.pendingTimeout = setTimeout(() => {
            ui.phaseOverlay.hide();
            state.mode = "rearrange";
            state.rearrangeRemaining = 10;
            dom.rearrangePanel.classList.remove("hidden");
            dom.rearrangeError.textContent = "";
            dom.rearrangeHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
            renderRearrange();
            ui.combatLog.push("마법서 재배치 시간(10초).", true);
          }, 1300);
          return true;
        }

        state.mode = "victory";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("알렌이 붕괴했다. 전투 승리.", true);
        return true;
      },
      updateRearrange(dt) {
        if (state.mode !== "rearrange") return;
        state.rearrangeRemaining = Math.max(0, state.rearrangeRemaining - dt);
        dom.rearrangeTimerText.textContent = `남은 시간: ${state.rearrangeRemaining.toFixed(1)}초`;
        if (state.rearrangeRemaining <= 0) {
          this.exitRearrange();
        }
      },
      exitRearrange() {
        if (state.mode !== "rearrange") return;
        dom.rearrangePanel.classList.add("hidden");
        state.mode = "running";
        systems.combatLoop.setPaused(false);
        ui.combatLog.push("마법서 재배치 종료. 전투 재개.", true);
      },
      clearPendingTimeout: clearTimeoutIfAny
    };
  })();

  function resetCooldowns() {
    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = 0;
    });
  }

  function castPlayerSpell(slotIndex, spell) {
    player.mp = Math.max(0, player.mp - spell.manaCost);
    state.cooldowns[spell.id] = spell.cooldown;
    ui.spellBar.flash(slotIndex);
    ui.enemyPortraitEffects.trigger(spell.color);

    let damage = randomInt(spell.damage[0], spell.damage[1]);
    const vulnPct = systems.statusSystem.enemyVulnerability();
    if (vulnPct > 0) {
      damage = Math.floor(damage * (1 + vulnPct / 100));
    }

    enemy.hp = Math.max(0, enemy.hp - damage);

    let line = `플레이어의 ${spell.name} 발동! ${damage} 피해.`;

    if (spell.shield) {
      player.shield += spell.shield;
      line += ` 보호막 ${spell.shield}.`;
    }

    if (spell.dampen) {
      systems.statusSystem.applyPlayer({ id: "dampen", duration: spell.dampen.duration, reduction: spell.dampen.reduction, stacks: 1 });
    }

    ui.combatLog.push(line, Boolean(spell.highCircle));

    if (spell.applyEnemyStatus) {
      systems.statusSystem.applyEnemy(spell.applyEnemyStatus);
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
      state.castGap = 0.25;
      return;
    }
  }

  function phase1AI(dt) {
    state.ai.rapidTimer -= dt;
    state.ai.burstTimer -= dt;

    if (state.ai.rapidTimer <= 0) {
      state.ai.rapidTimer += 1.05 + Math.random() * 0.25;
      const hitCount = randomInt(2, 3);
      let total = 0;
      for (let i = 0; i < hitCount; i += 1) {
        total += dealPlayerDamage(randomInt(8, 13), { shieldBreakMul: 2 });
      }
      systems.statusSystem.applyPlayer({ id: "burn", stacks: 1, duration: 4, dps: 2 });
      systems.statusSystem.applyEnemy({ id: "mark", stacks: 1, duration: 2.8, shieldBreakPct: 50 });
      ui.combatLog.push(`알렌의 연속 화염탄! ${total} 피해.`);
    }

    if (state.ai.burstTimer <= 0) {
      state.ai.burstTimer += 4.6 + Math.random() * 1.2;
      const dealt = dealPlayerDamage(randomInt(30, 44), { shieldBreakMul: 2 });
      ui.combatLog.push(`알렌: 4서클 마법 '적색 진명'! ${dealt} 피해.`, true);
    }
  }

  function phase2AI(dt) {
    state.ai.basicTimer -= dt;

    if (state.ai.charging) {
      state.ai.chargeRemaining -= dt;
      if (state.ai.chargeRemaining <= 0) {
        state.ai.charging = false;
        state.ai.chargeRemaining = 3.4 + Math.random() * 1.1;

        let damage = randomInt(66, 86);
        const critChance = 0.32 + systems.statusSystem.enemyOverheatCrit() / 100;
        const crit = Math.random() < critChance;
        if (crit) damage = Math.floor(damage * 1.45);

        const dealt = dealPlayerDamage(damage);
        systems.statusSystem.applyPlayer({ id: "burn", stacks: randomInt(5, 8), duration: 8, dps: 3 });

        if (crit) {
          ui.combatLog.push(`알렌: 4서클 마법 '불꽃이 내리는 하늘'! ${dealt} 피해 (치명).`, true);
        } else {
          ui.combatLog.push(`알렌: 4서클 마법 '불꽃이 내리는 하늘'! ${dealt} 피해.`, true);
        }
      }
    } else {
      state.ai.chargeRemaining -= dt;
      if (state.ai.chargeRemaining <= 0) {
        state.ai.charging = true;
        state.ai.chargeRemaining = 1.35 + Math.random() * 0.55;
      }
    }

    if (state.ai.basicTimer <= 0) {
      state.ai.basicTimer += 2.9;
      const dealt = dealPlayerDamage(randomInt(20, 30));
      ui.combatLog.push(`알렌의 화염 강타! ${dealt} 피해.`);
    }

    systems.statusSystem.applyEnemy({ id: "overheat", stacks: 1, duration: 2.1, critPct: 15 });
  }

  function phase3AI(dt) {
    state.ai.meltdownRemaining -= dt;
    state.ai.phase3Tick += dt;
    state.ai.phase3BurnTick += dt;
    state.ai.frenzyTimer -= dt;

    if (state.ai.phase3Tick >= 1) {
      state.ai.phase3Tick -= 1;
      state.ai.phase3Ramp += 1;
      const selfBurn = Math.floor(enemy.maxHp * (0.032 + state.ai.phase3Ramp * 0.004));
      enemy.hp = Math.max(0, enemy.hp - selfBurn);
      ui.damageFloat.show(selfBurn);
      systems.statusSystem.applyEnemy({ id: "overheat", stacks: Math.min(8, 1 + Math.floor(state.ai.phase3Ramp / 2)), duration: 1.2, critPct: 15 });
    }

    if (state.ai.phase3BurnTick >= 2) {
      state.ai.phase3BurnTick -= 2;
      systems.statusSystem.applyPlayer({ id: "burn", stacks: 1 + Math.floor(state.ai.phase3Ramp / 2), duration: 6, dps: 4 });
    }

    if (state.ai.frenzyTimer <= 0) {
      state.ai.frenzyTimer += Math.max(1.3, 2.4 - state.ai.phase3Ramp * 0.08);
      const base = randomInt(40, 56) + state.ai.phase3Ramp * 3;
      const dealt = dealPlayerDamage(base);
      ui.combatLog.push(`알렌의 폭주 화염! ${dealt} 피해.`, true);
    }

    if (state.ai.meltdownRemaining <= 0) {
      const dealt = dealPlayerDamage(randomInt(96, 132));
      ui.combatLog.push(`알렌: 푸르가토리움 붕괴! ${dealt} 피해.`, true);
      if (player.hp > 0) {
        state.mode = "victory";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("자폭을 버텨냈다. 전투 승리.", true);
      }
    }
  }

  function runEnemyAI(dt) {
    const slowRate = systems.statusSystem.enemySlowRate();
    const scaledDt = dt * Math.max(0.15, 1 - slowRate);

    if (state.phaseIndex === 0) phase1AI(scaledDt);
    if (state.phaseIndex === 1) phase2AI(scaledDt);
    if (state.phaseIndex === 2) phase3AI(scaledDt);
  }

  function runCombat(dt) {
    player.mp = Math.min(player.maxMp, player.mp + player.manaRegen * dt);

    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = Math.max(0, (state.cooldowns[spell.id] || 0) - dt);
    });

    systems.statusSystem.tickEnemy(dt);
    systems.statusSystem.tickPlayer(dt);

    if (systems.phaseSystem.maybeHandlePhaseDeath()) {
      return;
    }

    runAutoCast(dt);
    runEnemyAI(dt);

    if (systems.phaseSystem.maybeHandlePhaseDeath()) {
      return;
    }

    if (player.hp <= 0 && state.mode === "running") {
      state.mode = "defeat";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("전투 패배.", true);
    }
  }

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

      updateUI();
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

  function updateUI() {
    dom.playerHpFill.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    dom.playerMpFill.style.width = `${Math.max(0, (player.mp / player.maxMp) * 100)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;

    dom.heartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts} | 보호막 ${Math.floor(player.shield)}`;

    if (state.mode === "running") dom.phasePill.textContent = `페이즈 ${state.phaseIndex + 1}`;
    if (state.mode === "rearrange") dom.phasePill.textContent = "재배치";
    if (state.mode === "phase-transition") dom.phasePill.textContent = "전환";
    if (state.mode === "victory") dom.phasePill.textContent = "승리";
    if (state.mode === "defeat") dom.phasePill.textContent = "패배";
    if (state.mode === "prep") dom.phasePill.textContent = "준비";
  }

  function resetBattle() {
    systems.phaseSystem.clearPendingTimeout();
    ui.phaseOverlay.hide();

    state.mode = "prep";
    state.castGap = 0;
    state.rearrangeRemaining = 0;
    state.pendingTimeout = null;

    resetCooldowns();

    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.shield = 0;
    player.statuses = {};
    player.spellSlots = ["magicMissile", "emberLance", "toxicRain", "crimsonTrueName"];

    systems.phaseSystem.resetPhase();

    dom.rearrangePanel.classList.add("hidden");
    systems.combatLoop.setPaused(true);

    ui.combatLog.clear();
    ui.combatLog.push("전투 초기화 완료.");
    updateUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
  }

  function startBattle() {
    if (state.mode === "running" || state.mode === "rearrange" || state.mode === "phase-transition") {
      return;
    }
    if (state.mode === "victory" || state.mode === "defeat") {
      resetBattle();
    }
    state.mode = "running";
    systems.combatLoop.setPaused(false);
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
    updateUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
  }

  init();
})();
