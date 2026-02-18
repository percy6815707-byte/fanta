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
    loadoutHeartText: document.getElementById("loadout-heart-text"),
    loadoutSlots: document.getElementById("loadout-slots"),
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
    frostShard: {
      id: "frostShard",
      name: "서리 파편",
      color: "blue",
      circle: 1,
      archetype: "제어",
      manaCost: 12,
      cooldown: 1.9,
      heartCost: 1,
      damage: [9, 12],
      applyEnemyStatus: { id: "slow", stacks: 1, duration: 3, slowPct: 10 },
      description: "10 내외 피해 + 둔화 1"
    },
    freezingVeil: {
      id: "freezingVeil",
      name: "결빙의 장막",
      color: "blue",
      circle: 2,
      archetype: "생존",
      manaCost: 22,
      cooldown: 4.2,
      heartCost: 2,
      damage: [6, 10],
      shield: 40,
      reactiveSlow: { duration: 3.5, slowPct: 10 },
      description: "보호막 40 + 피격 시 둔화 부여"
    },
    frostShackle: {
      id: "frostShackle",
      name: "빙결의 족쇄",
      color: "blue",
      circle: 3,
      archetype: "제어",
      manaCost: 31,
      cooldown: 5.6,
      heartCost: 3,
      damage: [24, 34],
      chanceStun: 0.3,
      stunBonusDamage: [22, 30],
      description: "중간 피해 + 30% 마비, 성공 시 추가 피해"
    },
    abyssalFrost: {
      id: "abyssalFrost",
      name: "극빙의 심연",
      color: "blue",
      circle: 4,
      archetype: "제어/폭딜",
      manaCost: 46,
      cooldown: 8.2,
      heartCost: 4,
      damage: [58, 76],
      castTime: 2,
      applyEnemyStatus: { id: "stun", stacks: 1, duration: 1.2 },
      description: "2초 시전, 동결 후 큰 피해"
    },
    aerisAzureSeal: {
      id: "aerisAzureSeal",
      name: "「아에리스의 청색 봉인」",
      color: "blue",
      circle: 5,
      archetype: "궁극 제어",
      manaCost: 72,
      cooldown: 15,
      heartCost: 5,
      damage: [130, 170],
      channelTime: 2.8,
      executionChance: 0.14,
      highCircle: true,
      description: "긴 채널링, 성공 시 대량 피해 + 3턴 봉인"
    },
    fireball: {
      id: "fireball",
      name: "화염구",
      color: "red",
      circle: 1,
      archetype: "극딜",
      manaCost: 13,
      cooldown: 2.1,
      heartCost: 1,
      damage: [14, 18],
      applyEnemyStatus: { id: "burn", stacks: 1, duration: 4, dps: 2 },
      description: "15 내외 피해 + 화상 1"
    },
    blastBrand: {
      id: "blastBrand",
      name: "폭열 낙인",
      color: "red",
      circle: 2,
      archetype: "폭딜/디버프",
      manaCost: 24,
      cooldown: 4.4,
      heartCost: 2,
      damage: [18, 24],
      applyEnemyStatus: { id: "weak", stacks: 1, duration: 6, vulnPct: 30 },
      description: "표식 부여, 이후 적색 피해 증가"
    },
    magmaEruption: {
      id: "magmaEruption",
      name: "용암 분출",
      color: "red",
      circle: 3,
      archetype: "지속딜",
      manaCost: 34,
      cooldown: 6,
      heartCost: 3,
      damage: [13, 19],
      hits: 3,
      burnBonusPerStack: 4,
      description: "3회 공격 + 화상 스택 연동 추가 피해"
    },
    skyOfEmbers: {
      id: "skyOfEmbers",
      name: "불꽃이 내리는 하늘",
      color: "red",
      circle: 4,
      archetype: "극딜",
      manaCost: 49,
      cooldown: 8.5,
      heartCost: 4,
      damage: [16, 22],
      hits: 5,
      shieldBreakMul: 2,
      applyEnemyStatus: { id: "burn", stacks: 3, duration: 6, dps: 3 },
      description: "5연타 + 보호막 2배 피해 + 화상 3"
    },
    purgatoriumFlame: {
      id: "purgatoriumFlame",
      name: "「푸르가토리움의 화염」",
      color: "red",
      circle: 5,
      archetype: "지속 폭딜",
      manaCost: 70,
      cooldown: 15.5,
      heartCost: 5,
      damage: [42, 58],
      applyEnemyStatus: { id: "inferno", stacks: 1, duration: 10, dps: 6, growPerTick: 2 },
      highCircle: true,
      description: "강화 화상 부여, 매초 피해 증가"
    },
    lifeSprout: {
      id: "lifeSprout",
      name: "생명의 싹",
      color: "green",
      circle: 1,
      archetype: "생존",
      manaCost: 10,
      cooldown: 2.4,
      heartCost: 1,
      damage: [4, 8],
      heal: [14, 16],
      description: "즉시 15 회복"
    },
    venomVine: {
      id: "venomVine",
      name: "독침 덩굴",
      color: "green",
      circle: 2,
      archetype: "지속딜",
      manaCost: 22,
      cooldown: 4.2,
      heartCost: 2,
      damage: [10, 14],
      applyEnemyStatus: { id: "poison", stacks: 3, duration: 3, dps: 4 },
      description: "중독 3, 3초 지속"
    },
    natureGrace: {
      id: "natureGrace",
      name: "자연의 가호",
      color: "green",
      circle: 3,
      archetype: "생존",
      manaCost: 32,
      cooldown: 6,
      heartCost: 3,
      damage: [8, 12],
      heal: [28, 36],
      poisonRes: { duration: 6, reduction: 0.4 },
      description: "회복 + 중독 저항 상승"
    },
    dryadOfGreatForest: {
      id: "dryadOfGreatForest",
      name: "대삼림의 드라이어드",
      color: "green",
      circle: 4,
      archetype: "지속딜",
      manaCost: 46,
      cooldown: 9,
      heartCost: 4,
      damage: [14, 20],
      summonDryad: { duration: 9, mpDrain: 8, dps: 8, healPerTick: 8, poisonStacks: 1, stunChance: 0.2 },
      description: "소환 유지형, 공격/독/회복 동시 제공"
    },
    cerisFinGarden: {
      id: "cerisFinGarden",
      name: "「세리스 핀의 마계정원」",
      color: "green",
      circle: 5,
      archetype: "광역 지속",
      manaCost: 72,
      cooldown: 16,
      heartCost: 5,
      damage: [28, 40],
      applyEnemyStatuses: [
        { id: "burn", stacks: 1, duration: 5, dps: 3 },
        { id: "poison", stacks: 1, duration: 5, dps: 3 },
        { id: "slow", stacks: 1, duration: 5, slowPct: 12 },
        { id: "weak", stacks: 1, duration: 5, vulnPct: 12 }
      ],
      highCircle: true,
      description: "전장 오염, 상태이상 일괄 부여"
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
    spellSlots: ["frostShard", "fireball", "venomVine", "skyOfEmbers"],
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

  function spellSort(a, b) {
    const colorOrder = { blue: 1, red: 2, green: 3 };
    return (colorOrder[a.color] - colorOrder[b.color]) || (a.circle - b.circle) || a.name.localeCompare(b.name);
  }

  function spellLabel(spell) {
    const colorKo = spell.color === "blue" ? "청" : spell.color === "red" ? "적" : "녹";
    return `${spell.name} | ${colorKo} | ${spell.circle}서클 | ${spell.archetype} | MP ${spell.manaCost} | 하트 ${spell.heartCost}`;
  }

  function renderPrepLoadout() {
    dom.loadoutSlots.innerHTML = "";
    const sorted = [...spellList].sort(spellSort);
    const options = sorted.map((spell) => `<option value="${spell.id}">${spellLabel(spell)}</option>`).join("");

    for (let i = 0; i < 4; i += 1) {
      const card = document.createElement("div");
      card.className = "loadout-slot";
      card.innerHTML = `
        <label for="loadout-slot-${i}">전투 슬롯 ${i + 1}</label>
        <select id="loadout-slot-${i}">${options}</select>
      `;
      const select = card.querySelector("select");
      select.value = player.spellSlots[i];
      select.disabled = state.mode !== "prep";
      select.addEventListener("change", (event) => {
        const before = [...player.spellSlots];
        player.spellSlots[i] = event.target.value;
        if (usedHearts(player.spellSlots) > player.maxHearts) {
          player.spellSlots = before;
          event.target.value = before[i];
          ui.combatLog.push("마나 하트 한도를 초과했습니다.", true);
          return;
        }
        updateUI();
        ui.spellBar.render();
      });
      dom.loadoutSlots.appendChild(card);
    }

    dom.loadoutHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
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
      overheat: { icon: "⚠", name: "과열" },
      inferno: { icon: "🔥", name: "연옥 화상" }
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
              <span>${spell.circle}서클 | 하트 ${spell.heartCost}</span>
              <span>MP ${spell.manaCost} ${cdText(cd)}</span>
              ${player.mp < spell.manaCost && cd <= 0 ? '<span class="spell-warning">MP 부족</span>' : ""}
            </div>
            <div class="spell-tooltip">
              <strong>${spell.name}</strong><br>
              ${spell.description}
            </div>
            <div class="cooldown-overlay">
              <div class="cooldown-fill" style="--cd-progress:${cdProgress}"></div>
            </div>
          `;

          card.addEventListener("click", (event) => {
            event.stopPropagation();
            const opened = card.classList.contains("open");
            dom.spellSlots.querySelectorAll(".spell-slot").forEach((el) => el.classList.remove("open"));
            if (!opened) card.classList.add("open");
          });

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
        growPerTick: incoming.growPerTick ?? current.growPerTick,
        mpDrain: incoming.mpDrain ?? current.mpDrain,
        healPerTick: incoming.healPerTick ?? current.healPerTick,
        poisonStacks: incoming.poisonStacks ?? current.poisonStacks,
        stunChance: incoming.stunChance ?? current.stunChance,
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
              if (status.growPerTick) {
                status.dps += status.growPerTick;
              }
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
              let dot = status.dps * (status.stacks || 1);
              if ((id === "burn" || id === "poison") && player.statuses.poisonRes) {
                dot = Math.floor(dot * (1 - (player.statuses.poisonRes.reduction || 0)));
              }
              dealPlayerDamage(dot);
            }
          }

          if (id === "dryad") {
            while (status.tick >= 1) {
              status.tick -= 1;
              player.mp = Math.max(0, player.mp - (status.mpDrain || 0));
              const dryadDmg = status.dps || 0;
              enemy.hp = Math.max(0, enemy.hp - dryadDmg);
              if (dryadDmg > 0) {
                ui.damageFloat.show(dryadDmg);
              }
              if (status.poisonStacks) {
                this.applyEnemy({ id: "poison", stacks: status.poisonStacks, duration: 2, dps: 3 });
              }
              if (status.stunChance && Math.random() < status.stunChance) {
                this.applyEnemy({ id: "stun", stacks: 1, duration: 0.8 });
              }
              if (status.healPerTick) {
                player.hp = Math.min(player.maxHp, player.hp + status.healPerTick);
              }
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
            ${[...spellList]
              .sort(spellSort)
              .map((spell) => `<option value="${spell.id}">${spellLabel(spell)}</option>`)
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

    const hits = spell.hits || 1;
    let damage = 0;
    for (let i = 0; i < hits; i += 1) {
      damage += randomInt(spell.damage[0], spell.damage[1]);
    }

    const burnStacks = enemy.statuses.burn ? enemy.statuses.burn.stacks || 0 : 0;
    if (spell.burnBonusPerStack) {
      damage += burnStacks * spell.burnBonusPerStack;
    }

    const vulnPct = systems.statusSystem.enemyVulnerability();
    if (vulnPct > 0) {
      damage = Math.floor(damage * (1 + vulnPct / 100));
    }

    if (spell.id === "aerisAzureSeal") {
      let successChance = spell.executionChance || 0.1;
      if (enemy.statuses.slow) successChance += 0.16;
      if (enemy.statuses.stun) successChance += 0.16;
      if (Math.random() < successChance) {
        damage = Math.floor(enemy.maxHp * 0.65);
        systems.statusSystem.applyEnemy({ id: "stun", stacks: 1, duration: 3 });
      } else {
        damage = Math.floor(enemy.maxHp * 0.34);
      }
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

    if (spell.heal) {
      const heal = randomInt(spell.heal[0], spell.heal[1]);
      player.hp = Math.min(player.maxHp, player.hp + heal);
      line += ` ${heal} 회복.`;
    }

    if (spell.poisonRes) {
      systems.statusSystem.applyPlayer({ id: "poisonRes", duration: spell.poisonRes.duration, reduction: spell.poisonRes.reduction, stacks: 1 });
    }

    if (spell.reactiveSlow) {
      systems.statusSystem.applyPlayer({ id: "reactiveSlow", duration: spell.reactiveSlow.duration, slowPct: spell.reactiveSlow.slowPct, stacks: 1 });
    }

    if (spell.summonDryad) {
      systems.statusSystem.applyPlayer({ id: "dryad", duration: spell.summonDryad.duration, stacks: 1, ...spell.summonDryad });
    }

    if (spell.chanceStun && Math.random() < spell.chanceStun) {
      systems.statusSystem.applyEnemy({ id: "stun", stacks: 1, duration: 1.2 });
      if (spell.stunBonusDamage) {
        const bonus = randomInt(spell.stunBonusDamage[0], spell.stunBonusDamage[1]);
        enemy.hp = Math.max(0, enemy.hp - bonus);
        line += ` ${bonus} 추가 피해.`;
      }
    }

    ui.combatLog.push(line, Boolean(spell.highCircle));

    if (spell.applyEnemyStatus) {
      systems.statusSystem.applyEnemy(spell.applyEnemyStatus);
    }
    if (spell.applyEnemyStatuses) {
      spell.applyEnemyStatuses.forEach((status) => systems.statusSystem.applyEnemy(status));
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
      let castDelay = Math.max(0.25, spell.castTime || 0, spell.channelTime || 0);
      if (spell.id === "aerisAzureSeal" && (enemy.statuses.slow || enemy.statuses.stun)) {
        castDelay *= 0.7;
      }
      state.castGap = castDelay;
      return;
    }
  }

  function applyReactiveSlow() {
    if (player.statuses.reactiveSlow) {
      systems.statusSystem.applyEnemy({
        id: "slow",
        stacks: 1,
        duration: player.statuses.reactiveSlow.duration || 2,
        slowPct: player.statuses.reactiveSlow.slowPct || 10
      });
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
        applyReactiveSlow();
      }
      systems.statusSystem.applyPlayer({ id: "burn", stacks: 1, duration: 4, dps: 2 });
      systems.statusSystem.applyEnemy({ id: "mark", stacks: 1, duration: 2.8, shieldBreakPct: 50 });
      ui.combatLog.push(`알렌의 연속 화염탄! ${total} 피해.`);
    }

    if (state.ai.burstTimer <= 0) {
      state.ai.burstTimer += 4.6 + Math.random() * 1.2;
      const dealt = dealPlayerDamage(randomInt(30, 44), { shieldBreakMul: 2 });
      applyReactiveSlow();
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
        applyReactiveSlow();
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
      applyReactiveSlow();
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
      applyReactiveSlow();
      ui.combatLog.push(`알렌의 폭주 화염! ${dealt} 피해.`, true);
    }

    if (state.ai.meltdownRemaining <= 0) {
      const dealt = dealPlayerDamage(randomInt(96, 132));
      applyReactiveSlow();
      ui.combatLog.push(`알렌: 푸르가토리움 붕괴! ${dealt} 피해.`, true);
      if (player.hp > 0) {
        state.mode = "victory";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("자폭을 버텨냈다. 전투 승리.", true);
      }
    }
  }

  function runEnemyAI(dt) {
    if (enemy.statuses.stun) {
      return;
    }
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
    dom.loadoutHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
    dom.loadoutSlots.querySelectorAll("select").forEach((select) => {
      select.disabled = state.mode !== "prep";
    });

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
    player.spellSlots = ["frostShard", "fireball", "venomVine", "skyOfEmbers"];
    renderPrepLoadout();

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
    document.addEventListener("click", () => {
      dom.spellSlots.querySelectorAll(".spell-slot").forEach((el) => el.classList.remove("open"));
    });
  }

  function init() {
    bindEvents();
    systems.combatLoop.start();
    resetBattle();
    renderPrepLoadout();
    updateUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
  }

  init();
})();
