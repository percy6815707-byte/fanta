(() => {
  const TICK_MS = 1000;
  const MAX_LOG = 100;

  const MEMORY_STAGES = {
    1: "잔향",
    2: "파편",
    3: "균열",
    4: "왜곡",
    5: "각성"
  };

  const gameState = {
    mode: "prep",
    tick: 0,
    pendingPhase: null,
    choiceTimeoutId: null,
    playerCast: null,
    phaseChoices: [],
    phaseThresholdsHit: {
      phase2: false,
      phase3: false
    },
    story: {
      stage: 1,
      sceneId: 1,
      path: null,
      pendingEncounterId: null,
      stageLocked: false
    },
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
    id: null,
    name: "적 없음",
    hp: 0,
    maxHp: 0,
    phase: 1,
    phaseEnabled: false,
    statuses: {},
    attackCooldown: 0,
    statsByPhase: {
      1: { damage: 0, attackRate: 2 },
      2: { damage: 0, attackRate: 2 },
      3: { damage: 0, attackRate: 1 }
    }
  };

  const encounters = {
    shadowKing: {
      id: "shadowKing",
      name: "스승의 그림자",
      maxHp: 2400,
      phaseEnabled: false,
      statsByPhase: {
        1: { damage: 90, attackRate: 2 },
        2: { damage: 90, attackRate: 2 },
        3: { damage: 90, attackRate: 2 }
      }
    },
    corruptedVillage: {
      id: "corruptedVillage",
      name: "왜곡 마을의 오염수",
      maxHp: 3400,
      phaseEnabled: true,
      statsByPhase: {
        1: { damage: 95, attackRate: 2 },
        2: { damage: 125, attackRate: 2 },
        3: { damage: 155, attackRate: 1 }
      }
    },
    endTowerMageKing: {
      id: "endTowerMageKing",
      name: "세상 끝의 마도왕",
      maxHp: 5200,
      phaseEnabled: true,
      statsByPhase: {
        1: { damage: 105, attackRate: 2 },
        2: { damage: 140, attackRate: 2 },
        3: { damage: 185, attackRate: 1 }
      }
    }
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
    memoryStageSelect: document.getElementById("memory-stage-select"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    sceneTitle: document.getElementById("scene-title"),
    sceneBody: document.getElementById("scene-body"),
    sceneChoices: document.getElementById("scene-choices"),
    spellCompendium: document.getElementById("spell-compendium"),
    spellSlots: document.getElementById("spell-slots"),
    playerStatuses: document.getElementById("player-statuses"),
    bossStatuses: document.getElementById("boss-statuses"),
    phaseModal: document.getElementById("phase-modal"),
    phaseTitle: document.getElementById("phase-title"),
    phaseDesc: document.getElementById("phase-desc"),
    phaseGuide: document.getElementById("phase-guide"),
    modalLoadout: document.getElementById("modal-loadout"),
    phaseChoices: document.getElementById("phase-choices")
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
        const hpRatio = boss.hp / Math.max(1, boss.maxHp);
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
      description: "최대 마나 하트 +2 (최대 15)",
      apply: () => {
        player.maxHearts = Math.min(15, player.maxHearts + 2);
        log("마나 유물: 최대 마나 하트가 2 증가했습니다.");
      }
    },
    {
      id: "vitalityDraft",
      name: "생명력 비약",
      description: "최대 HP의 25% 회복, 최대 HP +10%",
      apply: () => {
        player.maxHp = Math.floor(player.maxHp * 1.1);
        player.hp = Math.min(player.maxHp, player.hp + Math.floor(player.maxHp * 0.25));
        log("생명력 비약: 체력 한계가 확장되었습니다.");
      }
    },
    {
      id: "etherWell",
      name: "에테르 우물",
      description: "초당 MP 재생 +8",
      apply: () => {
        player.manaRegen += 8;
        log("에테르 우물: MP 재생이 강화되었습니다.");
      }
    },
    {
      id: "quickTongue",
      name: "속성 영창",
      description: "모든 쿨다운 20% 감소",
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
      description: "주문 피해 +15%",
      apply: () => {
        addPlayerStatus("spellAmp", { value: 0.15, remaining: 9999 });
        log("공명 잉크: 주문 위력이 증폭됩니다.");
      }
    },
    {
      id: "shellOfThorns",
      name: "가시 껍질",
      description: "받는 피해 15% 감소",
      apply: () => {
        addPlayerStatus("ward", { reduction: 0.15, remaining: 9999 });
        log("가시 껍질: 상시 방어막이 형성되었습니다.");
      }
    }
  ];

  const sceneSystem = {
    getLinePack(sceneId, stage) {
      const s = String(stage);
      const byScene = {
        1: {
          title: "SCENE 1 — 낯선 익숙함",
          lines: {
            1: ["정신을 차려보니 이 길 위에 서 있다.", "머리가 아프다. 이미 걸어본 길 같다."],
            2: ["낯선 길인데 발걸음은 익숙하다.", "멀리 마탑이 보이고, 기억의 파편이 스친다."],
            3: ["가슴이 거칠게 뛴다.", "이 시작점은 평범한 우연이 아니다."],
            4: ["풍경 위로 붉게 갈라진 하늘이 겹쳐 보인다.", "루프의 잡음이 귀를 파고든다."],
            5: ["여기가 루프의 시작점임을 안다.", "이번에도 실패하면 끝이다."]
          }
        },
        2: {
          title: "SCENE 2 — 불완전한 기억",
          lines: {
            1: ["부서진 마법 문양에서 불길한 진동이 새어나온다."],
            2: ["붕괴하는 하늘, 불타는 탑이 스쳐 지나간다."],
            3: ["누군가의 목소리: '실패작.'"],
            4: ["그 말이 자신을 향한 것임을 직감한다."],
            5: ["문양은 금단 실험의 잔해다. 기억이 연결되기 시작한다."]
          }
        },
        3: {
          title: "SCENE 3 — 스승의 그림자",
          lines: {
            1: ["마도왕: '떠돌이 마법사인가. 돌아가라.'"],
            2: ["마도왕: '이곳은 위험하다. 지금이라면 늦지 않았다.'"],
            3: ["이유 없는 분노가 치밀어 오른다.", "그를 향해 마력을 끌어올린다."],
            4: ["마도왕: '네 눈빛... 낯설지 않군.'"],
            5: ["그는 여전히 나를 알아보지 못한다."]
          }
        },
        4: {
          title: "SCENE 4 — 미래의 잔상",
          lines: {
            1: ["짧은 섬광만 스친다."],
            2: ["붉게 갈라진 하늘과 괴물로 변한 마법사들."],
            3: ["목소리: '또 하나의 실패작이군.'"],
            4: ["그 말이 자신에게 꽂힌다."],
            5: ["미래의 스승은 끝내 자신을 알아보지 못했다."]
          }
        },
        5: {
          title: "SCENE 5 — 왜곡된 마을",
          lines: {
            1: ["오염된 마을에서 시간이 느리게 흐른다.", "NPC: '그를 막으러 왔나?'"],
            2: ["NPC: '여긴 시간이 썩어가고 있어.'"],
            3: ["NPC: '아니면... 또 실패하러 왔나?'"],
            4: ["마을 시계가 서로 다른 속도로 회전한다."],
            5: ["NPC: '넌 이미 여기서 여러 번 울었어.'"]
          }
        },
        6: {
          title: "SCENE 6 — 붕괴된 미래의 기억",
          lines: {
            1: ["기억의 문이 아직 닫혀 있다."],
            2: ["잿빛 마탑의 환영이 비친다."],
            3: ["미래의 마도왕: '나는 더 이상 잃을 것이 없다.'"],
            4: ["그를 쓰러뜨린 직후, 세계 붕괴가 시작됐다."],
            5: ["승리가 멸망의 기점이었다는 사실이 되살아난다."]
          }
        },
        7: {
          title: "SCENE 7 — 회귀의 대가",
          lines: {
            1: ["인과가 어긋난 흔적만 남는다."],
            2: ["'이대로 끝낼 수는 없다.' 시간을 되감는다."],
            3: ["기억이 찢어지고 마력 균열이 생긴다."],
            4: ["루프가 고정된다. 탈출구는 보이지 않는다."],
            5: ["구원이 아닌 반복. 대가는 이미 치렀다."]
          }
        },
        8: {
          title: "SCENE 8 — 스승의 인간성",
          lines: {
            1: ["말끝을 흐리는 그의 눈빛이 흔들린다."],
            2: ["마도왕: '나는 제자를 잃어본 적이 있다.'"],
            3: ["마도왕: '두 번은 겪고 싶지 않다.'"],
            4: ["설명할 수 없는 죄책감이 목을 죈다."],
            5: ["모든 진실을 아는데도, 이 말은 가볍지 않다."]
          }
        },
        9: {
          title: "SCENE 9 — 완전한 각성",
          lines: {
            1: ["아직 닿을 수 없는 기억이다."],
            2: ["아직 닿을 수 없는 기억이다."],
            3: ["아직 닿을 수 없는 기억이다."],
            4: ["아직 닿을 수 없는 기억이다."],
            5: ["미래의 마도왕: '또 하나의 실패작이군.'", "그는 끝내 자신을 알아보지 못했다."]
          }
        },
        10: {
          title: "SCENE 10 — 세상 끝의 마탑",
          lines: {
            1: ["마도왕: '나는 세상을 멸망시키려는 것이 아니다.'"],
            2: ["마도왕: '나는 그 아이들을 되돌리고 싶을 뿐이다.'"],
            3: ["주인공: '나는 미래를 보았다.'"],
            4: ["주인공: '당신의 마법은 결국 모든 것을 무너뜨린다.'"],
            5: ["어떤 선택을 하든 완전한 구원은 없다."]
          }
        }
      };

      const pack = byScene[sceneId];
      return {
        title: pack.title,
        lines: pack.lines[s] || pack.lines[1]
      };
    },
    renderScene() {
      const sceneId = gameState.story.sceneId;
      const stage = gameState.story.stage;
      const pack = this.getLinePack(sceneId, stage);
      dom.sceneTitle.textContent = `${pack.title} (${stage}단계: ${MEMORY_STAGES[stage]})`;
      dom.sceneBody.innerHTML = pack.lines.map((line) => `<p class="scene-line">${line}</p>`).join("");

      const choices = this.getSceneChoices(sceneId, stage);
      dom.sceneChoices.innerHTML = "";
      choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.className = "scene-btn";
        btn.textContent = choice.label;
        btn.addEventListener("click", choice.action);
        dom.sceneChoices.appendChild(btn);
      });
    },
    getSceneChoices(sceneId, stage) {
      if (sceneId === 1) {
        return [
          {
            label: "전투 노드로 이동",
            action: () => {
              gameState.story.path = "battle";
              this.gotoScene(3);
            }
          },
          {
            label: "이벤트 노드로 이동",
            action: () => {
              gameState.story.path = "event";
              this.gotoScene(2);
            }
          }
        ];
      }

      if (sceneId === 2) {
        return [{ label: "다음", action: () => this.gotoScene(3) }];
      }

      if (sceneId === 3) {
        return [{
          label: "스승의 그림자 전투 준비",
          action: () => {
            queueEncounter("shadowKing");
            log("인카운터 준비: 스승의 그림자");
            render();
          }
        }];
      }

      if (sceneId === 4) {
        return [{ label: "다음", action: () => this.gotoScene(5) }];
      }

      if (sceneId === 5) {
        return [{
          label: "오염수 전투 준비",
          action: () => {
            queueEncounter("corruptedVillage");
            log("인카운터 준비: 왜곡 마을의 오염수");
            render();
          }
        }];
      }

      if (sceneId === 6) {
        return [{ label: "다음", action: () => this.gotoScene(7) }];
      }

      if (sceneId === 7) {
        return [{ label: "다음", action: () => this.gotoScene(8) }];
      }

      if (sceneId === 8) {
        return [{
          label: "다음",
          action: () => this.gotoScene(stage >= 5 ? 9 : 10)
        }];
      }

      if (sceneId === 9) {
        return [{ label: "최종 대면으로", action: () => this.gotoScene(10) }];
      }

      if (sceneId === 10) {
        return [{
          label: "마도왕 최종전 준비",
          action: () => {
            queueEncounter("endTowerMageKing");
            log("인카운터 준비: 세상 끝의 마도왕");
            render();
          }
        }];
      }

      if (sceneId === 11) {
        return [{ label: "루프 재시작", action: () => combatSystem.resetCampaign() }];
      }

      return [{ label: "다음", action: () => this.gotoScene(sceneId + 1) }];
    },
    gotoScene(sceneId) {
      gameState.story.sceneId = sceneId;
      this.renderScene();
      render();
    },
    onEncounterWin(encounterId) {
      if (encounterId === "shadowKing") {
        this.gotoScene(4);
        return;
      }
      if (encounterId === "corruptedVillage") {
        this.gotoScene(6);
        return;
      }
      if (encounterId === "endTowerMageKing") {
        gameState.story.sceneId = 11;
        dom.sceneTitle.textContent = "결말 — 부서진 구원";
        dom.sceneBody.innerHTML = [
          "마도왕은 쓰러졌지만, 루프는 멈추지 않는다.",
          "완전한 구원은 없다. 다음 반복이 시작될 뿐이다."
        ].map((line) => `<p class=\"scene-line\">${line}</p>`).join("");
        dom.sceneChoices.innerHTML = "";
        const btn = document.createElement("button");
        btn.className = "scene-btn";
        btn.textContent = "루프 재시작";
        btn.addEventListener("click", () => combatSystem.resetCampaign());
        dom.sceneChoices.appendChild(btn);
      }
    },
    showPhaseFlashback() {
      if (gameState.story.stage < 2) {
        return;
      }
      const lines = this.getLinePack(4, gameState.story.stage).lines;
      dom.phaseGuide.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
      dom.phaseGuide.classList.remove("hidden");
    }
  };

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
      return this.usedHearts(nextSlots) <= player.maxHearts;
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
    pickAutoCastSpell() {
      const equipped = this.getEquipped().filter(Boolean);
      for (const spell of equipped) {
        if (this.isAvailable(spell)) {
          return spell;
        }
      }
      return null;
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
    },
    resolveSpell(spell) {
      player.mp = Math.max(0, player.mp - spell.manaCost);
      player.cooldowns[spell.id] = spell.cooldown;
      spell.effect({
        dealBossDamage,
        addPlayerStatus,
        addBossStatus,
        log
      });
    }
  };

  const bossAI = {
    performAction() {
      if (boss.hp <= 0) {
        return;
      }
      boss.attackCooldown -= 1;
      if (boss.attackCooldown > 0) {
        return;
      }
      const stat = boss.statsByPhase[boss.phase] || boss.statsByPhase[1];
      const slow = boss.statuses.slow ? boss.statuses.slow.value : 0;
      boss.attackCooldown = Math.max(1, stat.attackRate + slow);

      const crit = Math.random() < 0.15;
      const dealt = crit ? Math.floor(stat.damage * 1.5) : stat.damage;
      if (crit) {
        log(`${boss.name}의 치명타! ${dealt} 피해.`);
      } else {
        log(`${boss.name} 공격: ${dealt} 피해.`);
      }
      dealPlayerDamage(dealt, boss.name, true);
    }
  };

  const phaseStateMachine = {
    maybeTrigger() {
      if (!boss.phaseEnabled) {
        return;
      }
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
      dom.phaseDesc.textContent = "강화 1개를 선택하고, 필요하면 주문 슬롯을 변경하세요.";
      sceneSystem.showPhaseFlashback();
      dom.modalLoadout.classList.remove("hidden");
      renderModalLoadoutSelectors();
      renderPhaseChoices(gameState.phaseChoices, (buffId) => this.applyChoice(buffId));
      dom.phaseModal.classList.remove("hidden");
      dom.phasePill.textContent = `페이즈 ${nextPhase - 1} -> 선택`;

      if (gameState.choiceTimeoutId) {
        clearTimeout(gameState.choiceTimeoutId);
      }
      gameState.choiceTimeoutId = setTimeout(() => {
        if (gameState.mode === "choice" && gameState.phaseChoices.length > 0) {
          this.applyChoice(gameState.phaseChoices[0].id, true);
        }
      }, 15000);
    },
    applyChoice(buffId, auto = false) {
      const chosen = buffs.find((buff) => buff.id === buffId);
      if (!chosen || gameState.mode !== "choice") {
        return;
      }
      chosen.apply();
      if (gameState.choiceTimeoutId) {
        clearTimeout(gameState.choiceTimeoutId);
        gameState.choiceTimeoutId = null;
      }
      if (auto) {
        log("시간 초과: 첫 번째 강화가 자동 적용되었습니다.");
      }

      boss.phase = gameState.pendingPhase;
      gameState.pendingPhase = null;
      gameState.mode = "running";
      dom.phaseModal.classList.add("hidden");
      dom.modalLoadout.classList.add("hidden");
      dom.phaseGuide.classList.add("hidden");
      dom.phasePill.textContent = `페이즈 ${boss.phase}`;
      render();
    }
  };

  const combatSystem = {
    timerId: null,
    start() {
      if (gameState.mode !== "prep") {
        return;
      }
      if (!gameState.story.pendingEncounterId) {
        log("현재 준비된 전투가 없습니다. 씬 선택지를 진행하세요.");
        return;
      }
      if (!player.spellSlots.some(Boolean)) {
        log("전투 시작 전 주문을 1개 이상 장착하세요.");
        return;
      }

      if (!gameState.story.stageLocked) {
        gameState.story.stage = Number(dom.memoryStageSelect.value || 1);
        gameState.story.stageLocked = true;
        dom.memoryStageSelect.disabled = true;
        sceneSystem.renderScene();
      }

      this.spawnEncounter(gameState.story.pendingEncounterId);
      gameState.mode = "running";
      dom.phasePill.textContent = "페이즈 1";
      log(`전투 시작: ${boss.name}`);

      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => this.tick(), TICK_MS);
      render();
    },
    spawnEncounter(encounterId) {
      const data = encounters[encounterId];
      boss.id = data.id;
      boss.name = data.name;
      boss.maxHp = data.maxHp;
      boss.hp = data.maxHp;
      boss.phase = 1;
      boss.phaseEnabled = data.phaseEnabled;
      boss.statuses = {};
      boss.attackCooldown = 0;
      boss.statsByPhase = structuredClone(data.statsByPhase);

      gameState.phaseThresholdsHit.phase2 = false;
      gameState.phaseThresholdsHit.phase3 = false;
      gameState.playerCast = null;
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
    },
    onVictory() {
      const encounterId = gameState.story.pendingEncounterId;
      gameState.story.pendingEncounterId = null;
      gameState.mode = "prep";
      stopTimer();
      dom.phasePill.textContent = "준비";
      log(`${boss.name} 격파.`);
      sceneSystem.onEncounterWin(encounterId);
      render();
    },
    onDefeat() {
      gameState.mode = "prep";
      stopTimer();
      dom.phasePill.textContent = "패배";
      log("패배. 같은 인카운터에 재도전할 수 있습니다.");
      player.hp = player.maxHp;
      player.mp = player.maxMp;
      player.cooldowns = {};
      player.statuses = {};
      player.flags.aerisUsed = false;
      render();
    },
    resetCampaign() {
      stopTimer();
      gameState.mode = "prep";
      gameState.tick = 0;
      gameState.pendingPhase = null;
      gameState.phaseChoices = [];
      gameState.story.stage = Number(dom.memoryStageSelect.value || 1);
      gameState.story.sceneId = 1;
      gameState.story.path = null;
      gameState.story.pendingEncounterId = null;
      gameState.story.stageLocked = false;
      dom.memoryStageSelect.disabled = false;

      player.hp = player.maxHp = 1000;
      player.mp = player.maxMp = 240;
      player.manaRegen = 14;
      player.maxHearts = 3;
      player.cooldowns = {};
      player.statuses = {};
      player.flags.aerisUsed = false;
      player.spellSlots = [null, null, null, null];

      boss.id = null;
      boss.name = "적 없음";
      boss.hp = 0;
      boss.maxHp = 0;
      boss.phase = 1;
      boss.phaseEnabled = false;
      boss.statuses = {};
      boss.attackCooldown = 0;

      dom.phaseModal.classList.add("hidden");
      dom.modalLoadout.classList.add("hidden");
      dom.phaseGuide.classList.add("hidden");

      renderLoadoutSelectors();
      sceneSystem.renderScene();
      renderSpellSlots();
      render();
      log("캠페인을 초기화했습니다.");
    }
  };

  function queueEncounter(encounterId) {
    gameState.story.pendingEncounterId = encounterId;
    gameState.mode = "prep";
    render();
  }

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
      const damage = Math.floor(boss.maxHp * 0.03);
      dealBossDamage(damage, "심연의 정원");
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
    if (boss.hp <= 0) {
      return;
    }
    let amount = baseAmount;
    if (player.statuses.spellAmp) {
      amount = Math.floor(amount * (1 + player.statuses.spellAmp.value));
    }
    boss.hp = Math.max(0, boss.hp - amount);
    if (source && !["중독", "화상"].includes(source)) {
      log(`${source}: ${amount} 피해.`);
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
    player.statuses[id] = existing ? mergeStatus(existing, payload) : { ...payload };
  }

  function addBossStatus(id, payload) {
    if (id === "purgatorium" && boss.statuses.purgatorium) {
      return;
    }
    const existing = boss.statuses[id];
    boss.statuses[id] = existing ? mergeStatus(existing, payload) : { ...payload };
  }

  function mergeStatus(existing, incoming) {
    const out = { ...existing };
    Object.keys(incoming).forEach((key) => {
      if (typeof incoming[key] === "number" && typeof existing[key] === "number") {
        out[key] = Math.max(existing[key], incoming[key]);
      } else {
        out[key] = incoming[key];
      }
    });
    return out;
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
    if (boss.hp <= 0 && gameState.mode === "running") {
      combatSystem.onVictory();
      return;
    }
    if (player.hp <= 0 && gameState.mode === "running") {
      combatSystem.onDefeat();
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
      .map((spell) => `<option value="${spell.id}">${spell.name} | ${spell.circle}서클 | 하트 ${spell.heartCost} | 마나 ${spell.manaCost}</option>`)
      .join("");
  }

  function applySlotChange(slotIndex, selected, previous, selectEl) {
    if (!selected) {
      player.spellSlots[slotIndex] = null;
      render();
      return true;
    }

    if (!heartSystem.canEquip(slotIndex, selected)) {
      if (selectEl) {
        selectEl.value = previous || "";
      }
      log("장착 실패: 마나 하트 한도를 초과했습니다.");
      return false;
    }

    player.spellSlots[slotIndex] = selected;
    render();
    return true;
  }

  function renderLoadoutSelectors() {
    const options = spellOptionsHTML();
    dom.loadoutSelects.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const card = document.createElement("div");
      card.className = "select-card";
      card.innerHTML = `
        <label for="slot-select-${i}">슬롯 ${i + 1}</label>
        <select id="slot-select-${i}">
          <option value="">비어 있음</option>
          ${options}
        </select>
      `;
      const select = card.querySelector("select");
      select.value = player.spellSlots[i] || "";
      select.addEventListener("change", (event) => {
        const selected = event.target.value || null;
        const previous = player.spellSlots[i];
        applySlotChange(i, selected, previous, event.target);
      });
      dom.loadoutSelects.appendChild(card);
    }
  }

  function renderModalLoadoutSelectors() {
    const options = spellOptionsHTML();
    dom.modalLoadout.innerHTML = "";
    for (let i = 0; i < 4; i += 1) {
      const card = document.createElement("div");
      card.className = "modal-slot";
      card.innerHTML = `
        <label for="modal-slot-select-${i}">전환 슬롯 ${i + 1}</label>
        <select id="modal-slot-select-${i}">
          <option value="">비어 있음</option>
          ${options}
        </select>
      `;
      const select = card.querySelector("select");
      select.value = player.spellSlots[i] || "";
      select.addEventListener("change", (event) => {
        const selected = event.target.value || null;
        const previous = player.spellSlots[i];
        const changed = applySlotChange(i, selected, previous, event.target);
        if (changed) {
          renderLoadoutSelectors();
        }
      });
      dom.modalLoadout.appendChild(card);
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
    const colorNameMap = { blue: "청", red: "적", green: "녹" };
    const list = Object.values(spells).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name));
    dom.spellCompendium.innerHTML = list
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

  function formatStatuses(statusObj) {
    const statusNameMap = {
      ward: "보호막",
      spellAmp: "주문 증폭",
      poison: "중독",
      burnFlat: "화상",
      purgatorium: "연옥 화상",
      abyssalGarden: "심연의 정원",
      slow: "둔화"
    };
    const fieldNameMap = {
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

    const keys = Object.keys(statusObj);
    if (keys.length === 0) {
      return '<span class="status-pill">없음</span>';
    }
    return keys
      .map((key) => {
        const status = statusObj[key];
        const parts = Object.entries(status).map(([k, v]) => `${fieldNameMap[k] || k}:${v}`).join(" ");
        return `<span class="status-pill">${statusNameMap[key] || key} ${parts}</span>`;
      })
      .join("");
  }

  function renderStatuses() {
    dom.playerStatuses.innerHTML = formatStatuses(player.statuses);
    dom.bossStatuses.innerHTML = formatStatuses(boss.statuses);
  }

  function updateStartButton() {
    if (gameState.mode === "running") {
      dom.startBtn.textContent = "전투 진행 중";
      dom.startBtn.disabled = true;
      return;
    }
    const pending = gameState.story.pendingEncounterId;
    if (!pending) {
      dom.startBtn.textContent = "전투 시작";
      dom.startBtn.disabled = true;
      return;
    }
    dom.startBtn.textContent = `전투 시작: ${encounters[pending].name}`;
    dom.startBtn.disabled = false;
  }

  function render() {
    const playerHpPct = player.maxHp ? (player.hp / player.maxHp) * 100 : 0;
    const playerMpPct = player.maxMp ? (player.mp / player.maxMp) * 100 : 0;
    const bossHpPct = boss.maxHp ? (boss.hp / boss.maxHp) * 100 : 0;

    dom.playerHpFill.style.width = `${Math.max(0, playerHpPct)}%`;
    dom.playerMpFill.style.width = `${Math.max(0, playerMpPct)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, bossHpPct)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(boss.hp)} / ${boss.maxHp}`;

    const usedHearts = heartSystem.usedHearts(player.spellSlots);
    dom.heartText.textContent = `마나 하트: ${usedHearts} / ${player.maxHearts}`;
    dom.heartText.style.color = usedHearts > player.maxHearts ? "var(--danger)" : "var(--heart)";

    if (gameState.mode === "prep" && !gameState.story.pendingEncounterId) {
      dom.phasePill.textContent = "준비";
    }

    const selectable = gameState.mode === "prep";
    dom.loadoutSelects.querySelectorAll("select").forEach((el) => {
      el.disabled = !selectable;
    });

    updateStartButton();
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
    dom.resetBtn.addEventListener("click", () => combatSystem.resetCampaign());
    dom.memoryStageSelect.addEventListener("change", () => {
      if (gameState.story.stageLocked) {
        return;
      }
      gameState.story.stage = Number(dom.memoryStageSelect.value || 1);
      sceneSystem.renderScene();
      render();
    });
  }

  function init() {
    renderLoadoutSelectors();
    renderCompendium();
    bindEvents();
    sceneSystem.renderScene();
    render();
    log("프로토타입 준비 완료. 씬을 진행해 전투를 준비하세요.");
  }

  init();
})();
