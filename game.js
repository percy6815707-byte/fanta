(() => {
  const dom = {
    appShell: document.querySelector(".app-shell"),
    playerHpFill: document.getElementById("player-hp-fill"),
    bossHpFill: document.getElementById("boss-hp-fill"),
    playerHpText: document.getElementById("player-hp-text"),
    bossHpText: document.getElementById("boss-hp-text"),
    playerBuffsText: document.getElementById("player-buffs-text"),
    playerDebuffsText: document.getElementById("player-debuffs-text"),
    bossBuffsText: document.getElementById("boss-buffs-text"),
    bossDebuffsText: document.getElementById("boss-debuffs-text"),
    playerNameText: document.getElementById("player-name-text"),
    enemyNameText: document.getElementById("enemy-name-text"),
    playerCorePassiveTip: document.getElementById("player-core-passive-tip"),
    bossCorePassiveTip: document.getElementById("boss-core-passive-tip"),
    heartText: document.getElementById("heart-text"),
    enemyHeartText: document.getElementById("enemy-heart-text"),
    phasePill: document.getElementById("phase-pill"),
    loadoutHeartText: document.getElementById("loadout-heart-text"),
    loadoutSlots: document.getElementById("loadout-slots"),
    combatLog: document.getElementById("combat-log"),
    combatLogToggle: document.getElementById("combat-log-toggle"),
    combatLogBody: document.getElementById("combat-log-body"),
    enemyBoard: document.getElementById("enemy-board"),
    playerGridTitle: document.getElementById("player-grid-title"),
    enemyGridTitle: document.getElementById("enemy-grid-title"),
    spellSlots: document.getElementById("spell-slots"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    speedBtn: document.getElementById("speed-btn"),
    enemyPortraitFrame: document.getElementById("enemy-portrait-frame"),
    enemyPortraitImg: document.getElementById("enemy-portrait-img"),
    enemyStatusBar: document.getElementById("enemy-status-bar"),
    enemyFloatLayer: document.getElementById("enemy-float-layer"),
    summonStructure: document.getElementById("summon-structure"),
    summonStructureBody: document.getElementById("summon-structure-body"),
    rearrangePanel: document.getElementById("rearrange-panel"),
    rearrangeTimerText: document.getElementById("rearrange-timer-text"),
    rearrangeHeartText: document.getElementById("rearrange-heart-text"),
    phaseBuffHint: document.getElementById("phase-buff-hint"),
    phaseBuffChoices: document.getElementById("phase-buff-choices"),
    rearrangeError: document.getElementById("rearrange-error"),
    rearrangeSlots: document.getElementById("rearrange-slots"),
    readyBtn: document.getElementById("ready-btn"),
    phaseOverlay: document.getElementById("phase-overlay"),
    phaseOverlayTitle: document.getElementById("phase-overlay-title"),
    phaseOverlayQuote: document.getElementById("phase-overlay-quote"),
    storyScreen: document.getElementById("story-screen"),
    storyArtFrame: document.querySelector(".story-art-frame"),
    storyArtImg: document.getElementById("story-art-img"),
    storySceneTitle: document.getElementById("story-scene-title"),
    storySceneBody: document.getElementById("story-scene-body"),
    storyLog: document.getElementById("story-log"),
    storyChoices: document.getElementById("story-choices"),
    storyMapPanel: document.getElementById("story-map-panel"),
    storyMapTitle: document.getElementById("story-map-title"),
    storyMapNodes: document.getElementById("story-map-nodes"),
    storyDock: document.getElementById("story-dock"),
    storyInfoBtn: document.getElementById("story-info-btn"),
    storyMenuBtn: document.getElementById("story-menu-btn"),
    storyInfoPanel: document.getElementById("story-info-panel"),
    storyHeroInfo: document.getElementById("story-hero-info"),
    storyInfoClose: document.getElementById("story-info-close"),
    storyMenuPanel: document.getElementById("story-menu-panel"),
    storyMenuClose: document.getElementById("story-menu-close")
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
    manaSpring: {
      id: "manaSpring",
      name: "에테르 우물",
      color: "blue",
      circle: 2,
      archetype: "생존",
      manaCost: 18,
      cooldown: 4.6,
      heartCost: 2,
      damage: [4, 8],
      mpRestore: [28, 36],
      manaFlow: { duration: 6, bonus: 9 },
      description: "즉시 MP 회복 + 재생 증가"
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
    azureSiphon: {
      id: "azureSiphon",
      name: "청맥 흡류",
      color: "blue",
      circle: 3,
      archetype: "제어",
      manaCost: 30,
      cooldown: 5.8,
      heartCost: 3,
      damage: [18, 26],
      enemyMpBurn: [22, 34],
      mpStealRatio: 0.6,
      applyEnemyStatus: { id: "slow", stacks: 1, duration: 3, slowPct: 12 },
      description: "적 MP 소각 + 일부 흡수 + 둔화"
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
      heal: [22, 30],
      description: "즉시 체력 대량 회복"
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
      heal: [44, 58],
      poisonRes: { duration: 6, reduction: 0.4 },
      description: "강한 회복 + 중독 저항 상승"
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
      summonDryad: { duration: 12, mpDrain: 14, spellSlots: ["venomVine", "lifeSprout"] },
      description: "고소모 유지형, 드라이어드가 독침 덩굴/생명의 싹 시전"
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

  const v2SpellData = [
    { id: "red_flame_shard", name: "화염 파편", color: "red", circle: 1, manaCost: 1, cooldown: 1.0, effects: [{ type: "damage", value: 1 }, { type: "dot", value: 1, duration: 1 }], notes: "기본 반복 공격 + 약화 연소" },
    { id: "red_ignite", name: "연소", color: "red", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "dot", value: 1, duration: 2 }], notes: "2초 도트" },
    { id: "red_lunge", name: "급습", color: "red", circle: 1, manaCost: 1, cooldown: 1.5, effects: [{ type: "damage", value: 2 }, { type: "dot", value: 1, duration: 1 }], notes: "개시 압박 + 점화" },
    { id: "red_heat_stock", name: "열기 축적", color: "red", circle: 1, manaCost: 0, cooldown: 2.0, effects: [{ type: "manaGain", value: 1 }], notes: "마나 충전" },
    { id: "red_blast_chain", name: "폭열 연계", color: "red", circle: 2, manaCost: 2, cooldown: 2.0, effects: [{ type: "damage", value: 3 }, { type: "manaOnEvent", event: "onDamageDealt", value: 1 }], notes: "피해 성공 시 마나 +1" },
    { id: "red_overheat_cycle", name: "과열 순환", color: "red", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "manaGain", value: 1 }], notes: "리스크 충전" },
    { id: "red_chain_strike", name: "연쇄 타격", color: "red", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "damage", value: 2 }, { type: "dot", value: 1, duration: 2 }], notes: "연쇄 타격 + 화상 연계" },
    { id: "red_quick_slash", name: "홍염 참격", color: "red", circle: 2, manaCost: 2, cooldown: 2.4, effects: [{ type: "damage", value: 4 }, { type: "dot", value: 2, duration: 1 }], notes: "고타점 + 즉발 연소" },
    { id: "red_smoke_burst", name: "연막 작열", color: "red", circle: 2, manaCost: 2, cooldown: 3.4, effects: [{ type: "dot", value: 2, duration: 2 }], notes: "화상 부여" },
    { id: "red_overheat_burst", name: "과열 폭발", color: "red", circle: 3, manaCost: 3, cooldown: 4.0, effects: [{ type: "damage", value: 5 }, { type: "manaOnEvent", event: "onDamageDealt", value: 1 }], notes: "결정타 + 연소 회수" },
    { id: "red_burn_storm", name: "연소 폭풍", color: "red", circle: 3, manaCost: 3, cooldown: 5.0, effects: [{ type: "dot", value: 1, duration: 3 }], notes: "지속 압박" },
    { id: "red_full_focus", name: "전력 집중", color: "red", circle: 4, manaCost: 4, cooldown: 6.0, effects: [{ type: "damage", value: 6 }, { type: "dot", value: 2, duration: 2 }, { type: "manaOnCondition", condition: "selfManaLow", value: 2 }], notes: "고위 타격 + 연소 누적" },
    { id: "red_collapse_flare", name: "폭염 붕괴", color: "red", circle: 5, manaCost: 5, cooldown: 8.0, effects: [{ type: "damage", value: 7 }, { type: "manaDelete", value: 99 }], notes: "마나 붕괴" },
    { id: "blue_frost_poke", name: "서리 견제", color: "blue", circle: 1, manaCost: 1, cooldown: 1.5, effects: [{ type: "damage", value: 1 }, { type: "frostSlow", slowPct: 12, cooldownRate: 0.92, duration: 2 }, { type: "cooldownAdd", value: 0.5 }], notes: "쿨 지연 + 둔화" },
    { id: "blue_chill_condense", name: "냉기 응집", color: "blue", circle: 1, manaCost: 0, cooldown: 3.0, effects: [{ type: "manaGain", value: 1 }, { type: "frostSlow", slowPct: 10, cooldownRate: 0.95, duration: 2 }], notes: "충전 + 약둔화" },
    { id: "blue_suppress", name: "억제", color: "blue", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "manaReduce", value: 1 }, { type: "frostSlow", slowPct: 14, cooldownRate: 0.9, duration: 2 }], notes: "마나 감소 + 둔화" },
    { id: "blue_analyze", name: "분석", color: "blue", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "manaGain", value: 1 }, { type: "frostSlow", slowPct: 10, cooldownRate: 0.94, duration: 2 }], notes: "조건부 충전 + 둔화" },
    { id: "blue_shard_shot", name: "결정 사격", color: "blue", circle: 1, manaCost: 1, cooldown: 1.8, effects: [{ type: "damage", value: 2 }, { type: "frostSlow", slowPct: 15, cooldownRate: 0.88, duration: 2 }], notes: "피해 + 둔화 견제" },
    { id: "blue_ice_barrier", name: "빙정 장벽", color: "blue", circle: 2, manaCost: 2, cooldown: 3.2, effects: [{ type: "shield", value: 2 }, { type: "frostSlow", slowPct: 18, cooldownRate: 0.85, duration: 2 }], notes: "보호막 + 냉기 둔화" },
    { id: "blue_freeze_bind", name: "결빙 속박", color: "blue", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "silence", duration: 1 }, { type: "manaOnEvent", event: "onControlApplied", value: 1 }], notes: "동결(시전 봉인)" },
    { id: "blue_cooldown_chill", name: "냉각", color: "blue", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "frostSlow", slowPct: 30, cooldownRate: 0.7, duration: 2 }], notes: "쿨다운 둔화" },
    { id: "blue_flow_block", name: "흐름 차단", color: "blue", circle: 2, manaCost: 2, cooldown: 4.0, effects: [{ type: "silence", duration: 1 }], notes: "발동 차단" },
    { id: "blue_frost_trace", name: "빙흔 추적", color: "blue", circle: 2, manaCost: 2, cooldown: 3.2, effects: [{ type: "frostSlow", slowPct: 22, cooldownRate: 0.8, duration: 2 }], notes: "둔화 각인" },
    { id: "blue_zero_bind", name: "제로 구속", color: "blue", circle: 3, manaCost: 3, cooldown: 4.8, effects: [{ type: "silence", duration: 1.5 }], notes: "강화 동결" },
    { id: "blue_mana_seal", name: "마력 봉쇄", color: "blue", circle: 3, manaCost: 3, cooldown: 4.0, effects: [{ type: "manaReduce", value: 2 }], notes: "마나 봉쇄" },
    { id: "blue_time_dilate", name: "시간 지연", color: "blue", circle: 3, manaCost: 3, cooldown: 5.0, effects: [{ type: "silence", duration: 2 }, { type: "manaOnEvent", event: "onControlApplied", value: 1 }], notes: "지연 성공 시 마나 +1" },
    { id: "blue_stop_order", name: "정지 명령", color: "blue", circle: 4, manaCost: 4, cooldown: 7.0, effects: [{ type: "silence", duration: 2 }, { type: "manaOnEvent", event: "onControlApplied", value: 2 }], notes: "완전 정지 + 마나 회수" },
    { id: "blue_time_freeze", name: "시간 동결", color: "blue", circle: 5, manaCost: 5, cooldown: 9.0, effects: [{ type: "silence", duration: 2 }, { type: "manaReduce", value: 2 }], notes: "판도 제어" },
    { id: "green_natural_recover", name: "자연 회복", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "heal", value: 1 }, { type: "regen", value: 1, duration: 2 }], notes: "기본 회복 + 재생" },
    { id: "green_life_breath", name: "생명의 숨결", color: "green", circle: 1, manaCost: 0, cooldown: 3.0, effects: [{ type: "manaGain", value: 1 }, { type: "manaFlow", value: 1, duration: 3 }], notes: "지속 충전" },
    { id: "green_absorb", name: "흡수", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "damage", value: 1 }, { type: "heal", value: 1 }, { type: "dot", value: 1, duration: 2 }], notes: "흡혈 + 독성 침식" },
    { id: "green_guard_bud", name: "보호의 싹", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "shield", value: 1 }], notes: "기초 보호막" },
    { id: "green_brutal_branch", name: "난타 덩굴", color: "green", circle: 1, manaCost: 1, cooldown: 1.9, effects: [{ type: "damage", value: 2 }], notes: "순수 타격" },
    { id: "green_venom_seed", name: "맹독 씨앗", color: "green", circle: 1, manaCost: 1, cooldown: 2.8, effects: [{ type: "dot", value: 1, duration: 3 }], notes: "중독 씨앗 부여" },
    { id: "green_life_curtain", name: "생명의 장막", color: "green", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "shield", value: 3 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 1 }], notes: "보호막 유지 시 마나 +1" },
    { id: "green_cycle_boost", name: "순환 강화", color: "green", circle: 2, manaCost: 2, cooldown: 4.0, effects: [{ type: "manaGain", value: 1 }, { type: "regen", value: 1, duration: 3 }], notes: "역전 충전 + 재생" },
    { id: "green_regrowth", name: "재생", color: "green", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "regen", value: 1, duration: 4 }], notes: "초당 체력 회복" },
    { id: "green_moss_grasp", name: "이끼 속박", color: "green", circle: 2, manaCost: 2, cooldown: 3.6, effects: [{ type: "dot", value: 2, duration: 2 }], notes: "짧은 중독 속박" },
    { id: "green_thorn_barrage", name: "가시 탄막", color: "green", circle: 3, manaCost: 3, cooldown: 4.3, effects: [{ type: "damage", value: 4 }, { type: "dot", value: 1, duration: 2 }], notes: "강한 단일 피해 + 독가시" },
    { id: "green_bark_skin", name: "수피 갑주", color: "green", circle: 2, manaCost: 2, cooldown: 3.4, effects: [{ type: "shield", value: 2 }, { type: "regen", value: 1, duration: 3 }], notes: "중형 보호막 + 재생" },
    { id: "green_thorn_ward", name: "가시 수호", color: "green", circle: 3, manaCost: 3, cooldown: 4.6, effects: [{ type: "shield", value: 4 }, { type: "dot", value: 1, duration: 3 }], notes: "강한 보호막 + 독성 역장" },
    { id: "green_cycle_oath", name: "순환의 맹세", color: "green", circle: 3, manaCost: 3, cooldown: 5.0, effects: [{ type: "shield", value: 3 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 1 }], notes: "위기 반전 + 순환 회수" },
    { id: "green_life_transfer", name: "생명 전이", color: "green", circle: 3, manaCost: 3, cooldown: 4.0, effects: [{ type: "damage", value: 2 }, { type: "heal", value: 2 }], notes: "공수 전환" },
    { id: "green_earth_guard", name: "대지의 가호", color: "green", circle: 4, manaCost: 4, cooldown: 6.0, effects: [{ type: "shield", value: 5 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 2 }], notes: "대형 방어 + 마나 순환" },
    { id: "green_life_return", name: "생명의 귀환", color: "green", circle: 5, manaCost: 5, cooldown: 8.0, effects: [{ type: "heal", value: 5 }, { type: "manaGain", value: 2 }], notes: "대회복" }
  ];

  function convertV2ToRuntime(v2) {
    const damageValue = v2.effects.filter((e) => e.type === "damage" || e.type === "conditionalDamage").reduce((sum, e) => sum + (e.value || 0), 0);
    const healValue = v2.effects.filter((e) => e.type === "heal").reduce((sum, e) => sum + (e.value || 0), 0);
    const shieldValue = v2.effects.filter((e) => e.type === "shield").reduce((sum, e) => sum + (e.value || 0), 0);
    const manaGain = v2.effects.filter((e) => e.type === "manaGain").reduce((sum, e) => sum + (e.value || 0), 0);
    const manaOnEvent = v2.effects.find((e) => e.type === "manaOnEvent");
    const manaOnCondition = v2.effects.find((e) => e.type === "manaOnCondition");
    const manaBurn = v2.effects.filter((e) => e.type === "manaReduce" || e.type === "manaDelete").reduce((sum, e) => sum + (e.value || 0), 0);
    const silence = v2.effects.find((e) => e.type === "silence");
    const dot = v2.effects.find((e) => e.type === "dot");
    const regen = v2.effects.find((e) => e.type === "regen");
    const manaFlowEff = v2.effects.find((e) => e.type === "manaFlow");
    const frostSlow = v2.effects.find((e) => e.type === "frostSlow");
    const archetype = v2.color === "red" ? "속공" : v2.color === "blue" ? "제어" : "생존";
    const runtime = {
      id: v2.id,
      name: v2.name,
      color: v2.color,
      circle: v2.circle,
      archetype,
      manaCost: v2.manaCost,
      cooldown: v2.cooldown,
      heartCost: v2.circle,
      damage: [damageValue, damageValue],
      description: v2.notes || `${v2.circle}서클 ${archetype} 주문`
    };
    if (healValue > 0) runtime.heal = [healValue, healValue];
    if (shieldValue > 0) runtime.shield = shieldValue;
    if (manaGain > 0) runtime.mpRestore = [manaGain, manaGain];
    if (manaOnEvent) runtime.manaOnEvent = { event: manaOnEvent.event, value: manaOnEvent.value || 1 };
    if (manaOnCondition) runtime.manaOnCondition = { condition: manaOnCondition.condition, value: manaOnCondition.value || 1 };
    if (manaBurn > 0) runtime.enemyMpBurn = [manaBurn, manaBurn];
    if (dot) {
      runtime.applyEnemyStatus = (v2.color === "green")
        ? { id: "poison", stacks: 1, duration: dot.duration || 2, dps: dot.value || 1, decayPerTick: 1 }
        : { id: "burn", stacks: 2, duration: dot.duration || 2, dps: dot.value || 1, stackDecayOnHealthHit: 1 };
    }
    if (silence) runtime.applyEnemyStatus = { id: "freeze", stacks: 1, duration: silence.duration || 1 };
    if (frostSlow) {
      runtime.applyEnemyStatus = {
        id: "slow",
        stacks: 1,
        duration: frostSlow.duration || 2,
        slowPct: frostSlow.slowPct || 20,
        cooldownRate: frostSlow.cooldownRate || 0.75
      };
    }
    if (regen) {
      runtime.applySelfStatus = { id: "regen", stacks: 1, duration: regen.duration || 3, healPerTick: regen.value || 1 };
    }
    if (manaFlowEff) {
      runtime.applySelfStatus = { id: "manaFlow", stacks: 1, duration: manaFlowEff.duration || 3, manaPerTick: manaFlowEff.value || 1 };
    }
    return runtime;
  }

  const runtimeV2Library = Object.fromEntries(v2SpellData.map((item) => {
    const runtime = convertV2ToRuntime(item);
    return [runtime.id, runtime];
  }));

  Object.keys(spellLibrary).forEach((id) => delete spellLibrary[id]);
  Object.assign(spellLibrary, runtimeV2Library);

  const spellList = Object.values(spellLibrary);

  const enemyProfiles = {
    hunter: {
      id: "hunter",
      name: "사냥꾼",
      portrait: "assets/적/enemy_allen_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "경계 태세",
          title: "사냥꾼 - 경계 태세",
          quote: "거기서 멈춰. 한 걸음만 더 오면 쏜다.",
          maxHp: 12,
          coreId: "core_balanced",
          enemyMaxMp: 5,
          enemyManaRegen: 0,
          enemyLoadout: ["red_heat_stock"]
        }
      ]
    },
    lesser_spirit: {
      id: "lesser_spirit",
      name: "숲의 하급 정령",
      portrait: "assets/적/enemy_serion_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "잔향 맥동",
          title: "숲의 하급 정령 - 잔향 맥동",
          quote: "이질적인 것… 멈춰…",
          maxHp: 13,
          coreId: "core_lance",
          enemyMaxMp: 5,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath"]
        }
      ]
    },
    road_wraith: {
      id: "road_wraith",
      name: "도로 잔영체",
      portrait: "assets/적/enemy_allen_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "흔적 포식",
          title: "도로 잔영체 - 흔적 포식",
          quote: "남은 것들을 끌어안아라.",
          maxHp: 14,
          coreId: "core_balanced",
          enemyMaxMp: 6,
          enemyManaRegen: 0,
          enemyLoadout: ["red_flame_shard", "blue_frost_poke", "green_absorb", "red_heat_stock"]
        }
      ]
    },
    forest_watcher: {
      id: "forest_watcher",
      name: "숲 경계 감시자",
      portrait: "assets/적/enemy_serion_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "수림의 응시",
          title: "숲 감시자 - 수림의 응시",
          quote: "너는 이 땅의 시간이 아니다.",
          maxHp: 15,
          coreId: "core_lance",
          enemyMaxMp: 6,
          enemyManaRegen: 0,
          enemyLoadout: ["green_guard_bud", "green_natural_recover", "blue_chill_condense", "green_venom_seed"]
        }
      ]
    },
    seal_husk: {
      id: "seal_husk",
      name: "봉인 파열체",
      portrait: "assets/적/enemy_dalahans_v3.png",
      phaseDefs: [
        {
          id: 1,
          name: "균열 누출",
          title: "봉인 파열체 - 균열 누출",
          quote: "해방... 해방...",
          maxHp: 16,
          coreId: "core_bastion",
          enemyMaxMp: 7,
          enemyManaRegen: 0,
          enemyLoadout: ["red_ignite", "blue_suppress", "green_absorb", "red_blast_chain"]
        }
      ]
    },
    bounty_hunter: {
      id: "bounty_hunter",
      name: "현상금 사냥꾼",
      portrait: "assets/적/enemy_allen_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "급습 태세",
          title: "현상금 사냥꾼 - 급습 태세",
          quote: "현상금은 살아있는 자에게만 가치가 있지.",
          maxHp: 17,
          coreId: "core_lance",
          enemyMaxMp: 7,
          enemyManaRegen: 0,
          enemyLoadout: ["red_lunge", "red_quick_slash", "blue_analyze", "green_guard_bud"]
        }
      ]
    },
    inn_raider: {
      id: "inn_raider",
      name: "여관 급습대",
      portrait: "assets/적/enemy_allen_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "포위 개시",
          title: "여관 급습대 - 포위 개시",
          quote: "좋게 끝낼 생각은 없소.",
          maxHp: 18,
          coreId: "core_balanced",
          enemyMaxMp: 8,
          enemyManaRegen: 0,
          enemyLoadout: ["red_flame_shard", "blue_frost_poke", "green_absorb", "red_overheat_cycle", "blue_flow_block"]
        },
        {
          id: 2,
          name: "현상금 집행",
          title: "여관 급습대 - 현상금 집행",
          quote: "여기서 끝내자.",
          maxHp: 22,
          coreId: "core_lance",
          enemyMaxMp: 10,
          enemyManaRegen: 0,
          enemyLoadout: ["red_quick_slash", "red_blast_chain", "blue_mana_seal", "green_thorn_barrage", "red_full_focus"]
        }
      ]
    },
    allen: {
      id: "allen",
      name: "적색의 알렌",
      portrait: "assets/적/enemy_allen_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "적색 진명",
          title: "페이즈 1: 적색 진명",
          quote: "불꽃은 거짓말을 하지 않는다. 네가 약할 뿐이다.",
          maxHp: 18,
          coreId: "core_lance",
          enemyMaxMp: 8,
          enemyManaRegen: 0,
          enemyLoadout: ["red_heat_stock", "red_overheat_cycle", "red_flame_shard", "red_ignite", "red_blast_chain", "red_overheat_burst"]
        },
        {
          id: 2,
          name: "홍염의 폭주",
          title: "페이즈 2: 홍염의 폭주",
          quote: "이제 시험은 끝이다. 네가 버티는지 보겠다.",
          maxHp: 22,
          coreId: "core_balanced",
          enemyMaxMp: 10,
          enemyManaRegen: 0,
          enemyLoadout: ["red_heat_stock", "red_overheat_cycle", "blue_chill_condense", "blue_frost_poke", "blue_freeze_bind", "blue_mana_seal", "blue_stop_order"]
        },
        {
          id: 3,
          name: "푸르가토리움의 잔재",
          title: "페이즈 3: 푸르가토리움의 잔재",
          quote: "태워라… 전부 태워라… 남는 것은 재 뿐이다…",
          maxHp: 26,
          coreId: "core_bastion",
          enemyMaxMp: 12,
          enemyManaRegen: 0,
          enemyLoadout: ["red_heat_stock", "red_overheat_cycle", "green_life_breath", "green_cycle_boost", "green_guard_bud", "green_life_curtain", "green_cycle_oath", "green_earth_guard"]
        }
      ]
    },
    dalahans: {
      id: "dalahans",
      name: "청색의 달라한스",
      portrait: "assets/적/enemy_dalahans_v3.png",
      phaseDefs: [
        {
          id: 1,
          name: "청맥의 봉쇄",
          title: "페이즈 1: 청맥의 봉쇄",
          quote: "네 호흡을 얼려주지. 한 걸음도 더 못 간다.",
          maxHp: 18,
          coreId: "core_balanced",
          enemyMaxMp: 8,
          enemyManaRegen: 0,
          enemyLoadout: ["blue_chill_condense", "blue_analyze", "blue_frost_poke", "blue_ice_barrier", "blue_freeze_bind", "blue_cooldown_chill", "blue_mana_seal"]
        },
        {
          id: 2,
          name: "빙결 연산",
          title: "페이즈 2: 빙결 연산",
          quote: "수식은 완성됐다. 너의 선택지는 없다.",
          maxHp: 22,
          coreId: "core_lance",
          enemyMaxMp: 10,
          enemyManaRegen: 0,
          enemyLoadout: ["blue_chill_condense", "blue_analyze", "blue_frost_poke", "blue_ice_barrier", "blue_freeze_bind", "blue_flow_block", "blue_mana_seal", "red_full_focus"]
        },
        {
          id: 3,
          name: "절대영도 재귀",
          title: "페이즈 3: 절대영도 재귀",
          quote: "무한히 반복되는 냉각 속에서 사라져라.",
          maxHp: 26,
          coreId: "core_bastion",
          enemyMaxMp: 12,
          enemyManaRegen: 0,
          enemyLoadout: ["blue_chill_condense", "blue_analyze", "blue_ice_barrier", "blue_freeze_bind", "blue_flow_block", "blue_time_dilate", "blue_stop_order", "blue_time_freeze"]
        }
      ]
    },
    serion: {
      id: "serion",
      name: "녹색의 세리온",
      portrait: "assets/적/enemy_serion_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "심록의 맹아",
          title: "페이즈 1: 심록의 맹아",
          quote: "싹은 약해 보여도 뿌리는 단단하지.",
          maxHp: 20,
          coreId: "core_bastion",
          enemyMaxMp: 8,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath", "green_cycle_boost", "green_natural_recover", "green_absorb", "green_guard_bud", "green_bark_skin", "green_life_curtain"]
        },
        {
          id: 2,
          name: "덩굴의 포위",
          title: "페이즈 2: 덩굴의 포위",
          quote: "도망칠 길은 없다. 숲은 이미 널 감쌌다.",
          maxHp: 24,
          coreId: "core_balanced",
          enemyMaxMp: 10,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath", "green_cycle_boost", "green_bark_skin", "green_life_curtain", "green_regrowth", "green_life_transfer", "green_earth_guard"]
        },
        {
          id: 3,
          name: "거목의 심판",
          title: "페이즈 3: 거목의 심판",
          quote: "모든 생장은 끝내 회수된다.",
          maxHp: 28,
          coreId: "core_lance",
          enemyMaxMp: 12,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath", "green_cycle_boost", "green_bark_skin", "green_thorn_ward", "green_life_curtain", "green_cycle_oath", "green_life_return", "blue_time_freeze", "red_collapse_flare"]
        }
      ]
    }
  };

  const enemySpellLibrary = {
    flareBurst: { id: "flareBurst", name: "연속 화염탄", heartCost: 1, manaCost: 14, cooldown: 1.2, damage: [8, 13], hits: 2, shieldBreakMul: 2, addPlayerStatus: { id: "burn", stacks: 1, duration: 4, dps: 2 } },
    scarletShard: { id: "scarletShard", name: "적염 파편", heartCost: 1, manaCost: 18, cooldown: 2.8, damage: [18, 24], hits: 1, shieldBreakMul: 2 },
    brandBreaker: { id: "brandBreaker", name: "폭열 파쇄", heartCost: 2, manaCost: 26, cooldown: 4.6, damage: [22, 30], hits: 1, shieldBreakMul: 2, addEnemyStatus: { id: "mark", stacks: 1, duration: 3, shieldBreakPct: 50 } },
    allenTrueName: { id: "allenTrueName", name: "적색 진명", heartCost: 4, manaCost: 52, cooldown: 6.4, damage: [30, 44], hits: 1, shieldBreakMul: 2, highCircle: true },
    flameStrike: { id: "flameStrike", name: "화염 강타", heartCost: 2, manaCost: 26, cooldown: 2.9, damage: [20, 30], hits: 1 },
    allensMark: { id: "allensMark", name: "과열 표식", heartCost: 2, manaCost: 22, cooldown: 4.4, damage: [14, 20], hits: 1, addEnemyStatus: { id: "overheat", stacks: 1, duration: 2.1, critPct: 15 } },
    infernoCharge: { id: "infernoCharge", name: "홍염 예열", heartCost: 3, manaCost: 30, cooldown: 6.8, damage: [16, 22], hits: 1, addPlayerStatus: { id: "burn", stacks: 2, duration: 6, dps: 3 } },
    skyFallingFlame: { id: "skyFallingFlame", name: "불꽃이 내리는 하늘", heartCost: 4, manaCost: 68, cooldown: 8.2, damage: [66, 86], hits: 1, highCircle: true, critBase: 0.32, critMul: 1.45, addPlayerStatus: { id: "burn", stacks: 6, duration: 8, dps: 3 } },
    ragingFlare: { id: "ragingFlare", name: "폭주 화염", heartCost: 3, manaCost: 42, cooldown: 2.4, damage: [40, 56], hits: 1, highCircle: true },
    purgatoriumEcho: { id: "purgatoriumEcho", name: "푸르가토리움 메아리", heartCost: 4, manaCost: 58, cooldown: 4.6, damage: [54, 72], hits: 1, addPlayerStatus: { id: "burn", stacks: 3, duration: 6, dps: 4 } },
    searingPrison: { id: "searingPrison", name: "작열 구속", heartCost: 4, manaCost: 66, cooldown: 6.8, damage: [26, 34], hits: 1, addPlayerStatus: { id: "stun", stacks: 1, duration: 0.8 } },
    selfImmolation: { id: "selfImmolation", name: "자소 연소", heartCost: 5, manaCost: 72, cooldown: 7.2, damage: [36, 48], hits: 1, selfBurnPct: 0.05, addEnemyStatus: { id: "overheat", stacks: 2, duration: 2, critPct: 15 } }
  };

  Object.keys(enemySpellLibrary).forEach((id) => delete enemySpellLibrary[id]);
  Object.values(spellLibrary).forEach((spell) => {
    const cloned = {
      id: spell.id,
      name: spell.name,
      color: spell.color,
      archetype: spell.archetype,
      heartCost: spell.heartCost,
      manaCost: spell.manaCost,
      cooldown: spell.cooldown,
      damage: spell.damage || [0, 0],
      hits: spell.hits || 1
    };
    if (spell.mpRestore) cloned.mpRestore = spell.mpRestore;
    if (spell.manaFlow) cloned.manaFlow = spell.manaFlow;
    if (spell.manaOnEvent) cloned.manaOnEvent = spell.manaOnEvent;
    if (spell.manaOnCondition) cloned.manaOnCondition = spell.manaOnCondition;
    if (spell.applyEnemyStatus) cloned.addPlayerStatus = spell.applyEnemyStatus;
    if (spell.applySelfStatus) cloned.addEnemyStatus = spell.applySelfStatus;
    if (spell.applyEnemyStatuses && spell.applyEnemyStatuses[0]) cloned.addPlayerStatus = spell.applyEnemyStatuses[0];
    if (spell.enemyMpBurn) cloned.enemyMpBurn = spell.enemyMpBurn;
    enemySpellLibrary[cloned.id] = cloned;
  });

  const LOADOUT_STORAGE_KEY = "fanta_spell_loadout_v1";
  const FORMULA_BOOK_STORAGE_KEY = "fanta_formula_book_v2";
  const UNLOCKED_SPELLS_STORAGE_KEY = "fanta_unlocked_spells_v1";
  const UNLOCKED_CORES_STORAGE_KEY = "fanta_unlocked_cores_v1";
  const STARTER_SPELL_IDS = [
    "red_flame_shard",
    "red_heat_stock",
    "blue_frost_poke",
    "blue_chill_condense",
    "green_guard_bud",
    "green_life_breath"
  ];
  const DEFAULT_PLAYER_SPELL_SLOTS = ["red_flame_shard", "blue_frost_poke", "green_guard_bud", "red_heat_stock"];
  const DEFAULT_CORE_ID = "core_balanced";
  const CORE_LIBRARY = {
    core_balanced: {
      id: "core_balanced",
      name: "낡은 마도서",
      rarity: "common",
      cols: 4,
      rows: 4,
      blocked: [],
      passive: { type: "opening_mana", value: 1, text: "[일반] 전투 시작 시 마나 +1" }
    },
    core_lance: {
      id: "core_lance",
      name: "빛바랜 오브",
      rarity: "common",
      cols: 5,
      rows: 5,
      blocked: [[0, 0], [4, 0], [0, 4], [4, 4]],
      passive: { type: "cycle_mana", every: 3, value: 1, text: "[일반] 주문 3회 발동마다 마나 +1" }
    },
    core_bastion: {
      id: "core_bastion",
      name: "고목나무 지팡이",
      rarity: "common",
      cols: 2,
      rows: 8,
      blocked: [],
      passive: { type: "high_circle_power", minCircle: 2, bonusDamage: 1, text: "[일반] 2서클 이상 주문 피해 +1" }
    },
    core_grimoire_plus: {
      id: "core_grimoire_plus",
      name: "고급 마도서",
      rarity: "rare",
      cols: 4,
      rows: 4,
      blocked: [],
      passive: { type: "opening_mana", value: 5, text: "[희귀] 전투 시작 시 마나 +5" }
    },
    core_frozen_staff: {
      id: "core_frozen_staff",
      name: "얼어붙은 지팡이",
      rarity: "rare",
      cols: 5,
      rows: 4,
      blocked: [[0, 0], [4, 0]],
      passive: { type: "status_stack_bonus", statusIds: ["slow", "freeze", "stun"], bonusStacks: 1, text: "[희귀] 한기/둔화/동결 부여 시 스택 +1" }
    },
    core_morellonomicon: {
      id: "core_morellonomicon",
      name: "모렐로노미콘",
      rarity: "legendary",
      cols: 5,
      rows: 5,
      blocked: [],
      passive: { type: "opening_mana", value: 50, text: "[전설] 전투 시작 시 마나 +50" }
    },
    core_inferno_orb: {
      id: "core_inferno_orb",
      name: "연옥의 오브",
      rarity: "legendary",
      cols: 6,
      rows: 4,
      blocked: [[0, 0], [5, 0], [0, 3], [5, 3]],
      passive: { type: "red_double_cast", text: "[전설] 모든 적색 술식 2회 발동" }
    }
  };
  const STARTER_CORE_IDS = ["core_balanced", "core_lance", "core_bastion"];
  const RARE_CORE_IDS = ["core_grimoire_plus", "core_frozen_staff"];
  const LEGENDARY_CORE_IDS = ["core_morellonomicon", "core_inferno_orb"];
  const DEFAULT_PLAYER_FORMULAS = [
    { id: "formula_1", name: "술식 1", coreId: "core_balanced", spellIds: ["red_flame_shard", "blue_frost_poke", "green_guard_bud", "red_heat_stock"] },
    { id: "formula_2", name: "술식 2", coreId: "core_lance", spellIds: ["blue_chill_condense", "green_life_breath", "red_flame_shard", "green_guard_bud"] },
    { id: "formula_3", name: "술식 3", coreId: "core_bastion", spellIds: ["green_life_breath", "red_heat_stock", "blue_frost_poke", "green_guard_bud"] }
  ];
  const PLAYER_MAX_HEARTS = 12;
  const PLAYER_BATTLE_HEARTS = 100;
  let unlockedSpellSet = new Set();
  let unlockedCoreSet = new Set();

  function totalHeartCost(slots) {
    return slots.reduce((sum, id) => {
      const spell = spellLibrary[id];
      return sum + (spell ? spell.heartCost : 0);
    }, 0);
  }

  function normalizeUnlockedSpellIds(ids) {
    const source = Array.isArray(ids) ? ids : STARTER_SPELL_IDS;
    const normalized = source.filter((id) => spellLibrary[id]);
    STARTER_SPELL_IDS.forEach((id) => {
      if (spellLibrary[id] && !normalized.includes(id)) normalized.push(id);
    });
    return normalized;
  }

  function loadUnlockedSpellSet() {
    try {
      const raw = localStorage.getItem(UNLOCKED_SPELLS_STORAGE_KEY);
      if (!raw) return new Set(normalizeUnlockedSpellIds(STARTER_SPELL_IDS));
      return new Set(normalizeUnlockedSpellIds(JSON.parse(raw)));
    } catch (error) {
      return new Set(normalizeUnlockedSpellIds(STARTER_SPELL_IDS));
    }
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
    } catch (error) {
      return new Set(normalizeUnlockedCoreIds(STARTER_CORE_IDS));
    }
  }

  function saveUnlockedCoreSet() {
    try {
      const payload = normalizeUnlockedCoreIds([...unlockedCoreSet]);
      localStorage.setItem(UNLOCKED_CORES_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function saveUnlockedSpellSet() {
    try {
      const payload = normalizeUnlockedSpellIds([...unlockedSpellSet]);
      localStorage.setItem(UNLOCKED_SPELLS_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function isSpellUnlocked(spellId) {
    return unlockedSpellSet.has(spellId);
  }

  function isCoreUnlocked(coreId) {
    return unlockedCoreSet.has(coreId);
  }

  function unlockedSpellList() {
    return spellList.filter((spell) => isSpellUnlocked(spell.id));
  }

  function unlockSpell(spellId, sourceLabel = "연구") {
    if (!spellLibrary[spellId]) return false;
    if (isSpellUnlocked(spellId)) return false;
    unlockedSpellSet.add(spellId);
    saveUnlockedSpellSet();
    const spell = spellLibrary[spellId];
    pushStoryLog(`${sourceLabel} 보상: 주문 해금 - ${spell.name}`);
    ui.combatLog.push(`주문 해금: ${spell.name}`, true);
    renderPrepLoadout();
    return true;
  }

  function unlockCore(coreId, sourceLabel = "각성") {
    if (!CORE_LIBRARY[coreId]) return false;
    if (isCoreUnlocked(coreId)) return false;
    unlockedCoreSet.add(coreId);
    saveUnlockedCoreSet();
    const core = CORE_LIBRARY[coreId];
    pushStoryLog(`${sourceLabel} 보상: 술식핵 해금 - ${core.name} (${core.rarity === "legendary" ? "전설" : core.rarity === "rare" ? "희귀" : "일반"})`);
    ui.combatLog.push(`술식핵 해금: ${core.name}`, true);
    renderPrepLoadout();
    return true;
  }

  function sanitizeSpellSlots(candidate, maxHearts = PLAYER_MAX_HEARTS) {
    if (!Array.isArray(candidate) || candidate.length < 1) return null;
    const normalized = candidate.map((id) => (spellLibrary[id] && isSpellUnlocked(id) ? id : null));
    if (normalized.some((id) => !id)) return null;
    if (totalHeartCost(normalized) > maxHearts) return null;
    return normalized;
  }

  function calcFormulaCircle(spellIds) {
    return totalHeartCost(spellIds);
  }

  function sanitizeFormula(formula, maxHearts = PLAYER_MAX_HEARTS) {
    if (!formula || typeof formula !== "object") return null;
    const spellIds = sanitizeSpellSlots(formula.spellIds, maxHearts);
    if (!spellIds) return null;
    const gridLayout = (formula.gridLayout && typeof formula.gridLayout === "object")
      ? Object.fromEntries(
          Object.entries(formula.gridLayout)
            .filter(([k, v]) => typeof k === "string" && v && typeof v === "object")
            .map(([k, v]) => {
              const x = Number.isFinite(v.x) ? Math.floor(v.x) : 0;
              const y = Number.isFinite(v.y) ? Math.floor(v.y) : 0;
              const variant = Number.isFinite(v.variant) ? Math.floor(v.variant) : 0;
              return [k, { x, y, variant }];
            })
        )
      : {};
    return {
      id: typeof formula.id === "string" && formula.id.trim() ? formula.id : `formula_${Math.random().toString(36).slice(2, 8)}`,
      name: typeof formula.name === "string" && formula.name.trim() ? formula.name.trim() : "이름 없는 술식",
      coreId: (typeof formula.coreId === "string" && CORE_LIBRARY[formula.coreId] && isCoreUnlocked(formula.coreId)) ? formula.coreId : DEFAULT_CORE_ID,
      spellIds,
      totalCircle: calcFormulaCircle(spellIds),
      gridLayout
    };
  }

  function makeDefaultFormulaBook(baseSlots = DEFAULT_PLAYER_SPELL_SLOTS) {
    const first = sanitizeSpellSlots(baseSlots) || [...DEFAULT_PLAYER_SPELL_SLOTS];
    const defaults = DEFAULT_PLAYER_FORMULAS.map((formula, index) => {
      const source = index === 0 ? { ...formula, spellIds: first } : formula;
      return sanitizeFormula(source) || sanitizeFormula(DEFAULT_PLAYER_FORMULAS[index]);
    }).filter(Boolean);
    return {
      schemaVersion: 2,
      maxFormulaSlots: 3,
      activeFormulaIndex: 0,
      formulas: defaults
    };
  }

  function sanitizeFormulaBook(candidate, maxHearts = PLAYER_MAX_HEARTS) {
    if (!candidate || typeof candidate !== "object") return null;
    if (!Array.isArray(candidate.formulas) || candidate.formulas.length !== 3) return null;
    const formulas = candidate.formulas
      .map((formula) => sanitizeFormula(formula, maxHearts))
      .filter(Boolean);
    if (formulas.length !== 3) return null;
    const index = Number.isInteger(candidate.activeFormulaIndex) ? candidate.activeFormulaIndex : 0;
    const activeFormulaIndex = Math.min(2, Math.max(0, index));
    return {
      schemaVersion: 2,
      maxFormulaSlots: 3,
      activeFormulaIndex,
      formulas
    };
  }

  function loadStoredSpellSlots() {
    try {
      const raw = localStorage.getItem(LOADOUT_STORAGE_KEY);
      if (!raw) return null;
      return sanitizeSpellSlots(JSON.parse(raw));
    } catch (error) {
      return null;
    }
  }

  function saveSpellSlots(slots) {
    try {
      const valid = sanitizeSpellSlots(slots);
      if (valid) {
        localStorage.setItem(LOADOUT_STORAGE_KEY, JSON.stringify(valid));
      }
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function loadStoredFormulaBook(legacySlots = DEFAULT_PLAYER_SPELL_SLOTS) {
    try {
      const raw = localStorage.getItem(FORMULA_BOOK_STORAGE_KEY);
      if (raw) {
        const parsed = sanitizeFormulaBook(JSON.parse(raw));
        if (parsed) return parsed;
      }
    } catch (error) {
      // Ignore invalid formula-book payload.
    }

    const migrated = makeDefaultFormulaBook(legacySlots);
    try {
      localStorage.setItem(FORMULA_BOOK_STORAGE_KEY, JSON.stringify(migrated));
    } catch (error) {
      // Ignore storage errors silently.
    }
    return migrated;
  }

  function saveFormulaBook(book) {
    try {
      const valid = sanitizeFormulaBook(book);
      if (!valid) return false;
      localStorage.setItem(FORMULA_BOOK_STORAGE_KEY, JSON.stringify(valid));
      return true;
    } catch (error) {
      return false;
    }
  }

  const state = {
    mode: "prep",
    worldMode: "story",
    enemyProfileId: "allen",
    cooldowns: Object.fromEntries(spellList.map((spell) => [spell.id, 0])),
    castGap: 0,
    phaseIndex: 0,
    speed: 1,
    playerDamageBonus: 0.18,
    rearrangeRemaining: 0,
    rearrangeSelectedFormulaIndex: null,
    rearrangeEntryFormulaIndex: null,
    brokenFormulaIndexes: new Set(),
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
      meltdownRemaining: 0,
      enemyRearrangeTimer: 5.2
    },
    story: {
      sceneIndex: 0,
      memoryFragments: 0,
      battleBias: 0,
      enemyIntel: 0,
      relics: [],
      awaitingBattle: false,
      pendingBattle: null
    }
  };

  function currentEnemyProfile() {
    return enemyProfiles[state.enemyProfileId] || enemyProfiles.allen;
  }

  function setEnemyProfile(profileId) {
    if (enemyProfiles[profileId]) {
      state.enemyProfileId = profileId;
    } else {
      state.enemyProfileId = "allen";
    }
  }

  const relicPool = [
    "숲지기의 징표",
    "붉은 홍옥",
    "서리 수정핵",
    "유영하는 기억석",
    "잔광의 인장"
  ];

  const ACT1_RANDOM_SCENE_POOL = [
    {
      id: "wagon",
      title: "사라진 수레의 흔적",
      body: "대로 한가운데 수레가 옆으로 넘어져 있다. 바퀴는 부서져 있고 말은 보이지 않는다.\n짐은 그대로다. 사람만 사라졌다.\n\n바람이 분다.\n수레 아래에서 무언가가 꿈틀거린다.\n\n▶ 수레를 살펴본다.\n천 아래에서 검게 젖은 손이 튀어나온다.\n\"아직… 따뜻…\"\n형체가 천천히 일어난다. 눈동자가 없다.",
      image: "assets/씬/scene_village_stone_lane.png",
      tone: "amber",
      enemyName: "수레 잔영체",
      enemyProfileId: "road_wraith",
      fightLabel: "전투 준비한다",
      fleeLabel: "물러선다",
      winLog: "형체는 마력과 함께 흩어진다. 낡은 주문 조각이 남는다. → 주문 1개 획득",
      fleeLog: "형체는 더 이상 쫓아오지 않는다. \"집…\" 목소리가 바람에 흩어진다.",
      loseLog: "차가운 손이 목을 움켜쥔다. 시야가 어두워진다."
    },
    {
      id: "forest_edge",
      title: "숲의 경계선",
      body: "숲이 갑자기 조용해진다. 바람이 멎는다.\n보이지 않는 시선이 느껴진다.\n\n▶ 마력을 흘려본다.\n빛이 나뭇가지 사이로 스친다. 정령이 모습을 드러낸다.\n\"이질적이다.\" \"너는 이 땅의 시간이 아니다.\"",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "green",
      enemyName: "경계 정령",
      enemyProfileId: "forest_watcher",
      fightLabel: "맞선다",
      fleeLabel: "마력을 거둔다",
      winLog: "정령은 빛으로 흩어진다. 빛의 파편이 손에 스며든다. → 주문 1개 획득",
      fleeLog: "정령은 한동안 바라보다 사라진다. 숲은 다시 숨을 쉰다.",
      loseLog: "빛의 창이 가슴을 꿰뚫는다."
    },
    {
      id: "toy",
      title: "묻힌 아이의 장난감",
      body: "길가에 작은 나무 인형이 떨어져 있다. 눈이 정면을 향하고 있다.\n\n▶ 인형을 집는다.\n땅이 갈라진다. 작은 손이 올라온다.\n아이의 형체. 그러나 얼굴은 없다.",
      image: "assets/씬/scene_ruined_gate_trail.png",
      tone: "blue",
      enemyName: "빈껍질 아이",
      enemyProfileId: "road_wraith",
      fightLabel: "제거한다",
      fleeLabel: "인형을 내려놓는다",
      winLog: "형체는 소리 없이 흩어진다. 작은 마력의 조각이 남는다. → 주문 1개 획득",
      fleeLog: "아무 일도 일어나지 않는다. 그러나 몇 걸음 뒤 등 뒤에서 숨소리가 들린다.",
      loseLog: "땅 아래로 끌려 들어간다."
    },
    {
      id: "seal",
      title: "불에 그을린 봉인석",
      body: "길가 언덕 위에 검게 그을린 돌기둥이 서 있다. 문양이 반쯤 녹아내렸다.\n누군가 급히 봉인하려다 실패한 흔적. 주변 공기가 묘하게 무겁다.\n\n▶ 돌기둥에 손을 댄다.\n차가운 마력이 손끝을 타고 스며든다.\n돌기둥이 갈라지며 검은 연기가 흘러나온다.",
      image: "assets/씬/scene_crimson_sky_tower.png",
      tone: "red",
      enemyName: "봉인 파열체",
      enemyProfileId: "seal_husk",
      fightLabel: "봉인을 완전히 파괴한다",
      fleeLabel: "손을 떼고 물러난다",
      winLog: "검은 형체가 찢기듯 흩어진다. 돌기둥 안쪽에서 응축된 주문 핵이 떨어진다. → 주문 1개 획득",
      fleeLog: "돌기둥은 다시 잠잠해진다. 그러나 문양 일부가 빛난다. 불길한 예감이 남는다.",
      loseLog: "연기가 폐를 채운다. 숨을 들이쉴 수 없다."
    },
    {
      id: "porter",
      title: "길목의 짐꾼",
      body: "대로 옆, 짐을 잔뜩 실은 남자가 앉아 있다. 얼굴이 창백하다.\n\"도와주시오…\"\n짐은 천으로 단단히 묶여 있다. 안에서 무언가가 꿈틀거린다.\n\n▶ 짐에 대해 묻는다.\n\"마탑에서 맡긴 물건이오…\"",
      image: "assets/씬/scene_village_stone_lane.png",
      tone: "amber",
      enemyName: "짐짝 변이체",
      enemyProfileId: "seal_husk",
      fightLabel: "짐을 연다",
      fleeLabel: "등을 돌린다",
      winLog: "짐 안에서 튀어나온 변이체가 쓰러진다. 남자의 주머니에서 주문 기록 조각이 떨어진다. → 주문 1개 획득",
      fleeLog: "\"아무것도 보지 마시오…\" 걸음을 옮기자 뒤에서 비명이 울린다.",
      loseLog: "검은 촉수가 다리를 붙잡는다. 땅으로 끌려간다."
    },
    {
      id: "hunter",
      title: "현상금 사냥꾼",
      body: "대로 한복판. 가면을 쓴 사내가 길을 막는다.\n\"마력 냄새가 진하군. 최근에 현상금이 걸렸지.\"\n\n그의 손에는 짧은 단검 두 자루.",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "red",
      enemyName: "현상금 사냥꾼",
      enemyProfileId: "bounty_hunter",
      fightLabel: "공격한다",
      fleeLabel: "골드를 던진다",
      winLog: "가면이 깨지며 사내가 쓰러진다. 허리춤에서 주문 각인석이 떨어진다. → 주문 1개 획득",
      fleeLog: "골드를 집어든 사내는 웃으며 물러난다. \"다음엔 목숨값이 더 오를 거다.\"",
      loseLog: "차가운 칼날이 심장을 스친다."
    },
    {
      id: "village",
      title: "버려진 마을의 저녁",
      body: "해가 기울 무렵 작은 마을에 도착한다. 문은 열려 있고 식탁 위에는 마른 빵.\n급히 떠난 흔적.\n\n▶ 안으로 들어간다.\n어둠 속에서 무언가가 비틀거리며 일어난다. 사람의 형체. 그러나 눈동자가 흐리다.",
      image: "assets/씬/scene_village_stone_lane.png",
      tone: "amber",
      enemyName: "공허 주민",
      enemyProfileId: "road_wraith",
      fightLabel: "마력을 모은다",
      fleeLabel: "물러난다",
      winLog: "형체는 재처럼 흩어진다. 바닥에서 희미한 주문 파편이 발견된다. → 주문 1개 획득",
      fleeLog: "형체는 쫓아오지 않는다. 그러나 마을 전체가 숨을 죽인 듯 고요하다.",
      loseLog: "차가운 손이 얼굴을 덮는다."
    },
    {
      id: "beast",
      title: "마력에 잠긴 짐승",
      body: "숲 가장자리. 눈이 푸르게 빛나는 사슴이 서 있다.\n몸이 경련하듯 떨린다.\n\n▶ 다가간다.\n사슴이 고개를 들어 울부짖는다. 뿔 끝에서 마력이 번쩍인다.",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "green",
      enemyName: "광화 사슴",
      enemyProfileId: "forest_watcher",
      fightLabel: "끝낸다",
      fleeLabel: "지켜본다",
      winLog: "짐승은 조용히 무너진다. 그 자리에 응축된 주문 문양이 남는다. → 주문 1개 획득",
      fleeLog: "사슴은 숲 속으로 사라진다. 잠시 후 울음소리가 멎는다.",
      loseLog: "뿔이 가슴을 꿰뚫는다."
    },
    {
      id: "bridge",
      title: "무너진 다리",
      body: "강 위의 돌다리가 반쯤 붕괴되어 있다. 강물은 검게 흐른다.\n\n▶ 다리 위로 오른다.\n강 아래에서 그림자가 꿈틀거린다.",
      image: "assets/씬/scene_ruined_gate_trail.png",
      tone: "blue",
      enemyName: "강의 그림자",
      enemyProfileId: "road_wraith",
      fightLabel: "마력을 준비한다",
      fleeLabel: "돌아간다",
      winLog: "강물이 잠잠해진다. 물 위에 떠오른 마력 결정이 손에 들어온다. → 주문 1개 획득",
      fleeLog: "돌아가는 동안 강물에서 시선이 느껴진다.",
      loseLog: "발목이 붙잡힌다. 차가운 물이 몸을 덮친다."
    },
    {
      id: "candle",
      title: "폐가의 촛불",
      body: "대로에서 조금 벗어난 폐가. 창문 안쪽에서 촛불이 흔들린다.\n\n▶ 문을 연다.\n안은 텅 비어 있다. 촛불만 중앙에 놓여 있다.\n그 뒤에서 눈이 뜨인다.",
      image: "assets/씬/scene_ruined_gate_trail.png",
      tone: "red",
      enemyName: "암야 잠식체",
      enemyProfileId: "seal_husk",
      fightLabel: "빛을 만든다",
      fleeLabel: "문을 닫는다",
      winLog: "어둠이 갈라지며 사라진다. 바닥에 새겨진 주문 문양이 빛난다. → 주문 1개 획득",
      fleeLog: "문을 닫자 촛불이 꺼진다. 집은 다시 죽은 공간이 된다.",
      loseLog: "어둠이 삼킨다."
    }
  ];

  function shuffledCopy(list) {
    const next = [...list];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = randomInt(0, i);
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  function makeRandomAct1Scene(slotNo, seed) {
    return {
      id: `s${slotNo}`,
      title: `${slotNo < 10 ? `0${slotNo}` : slotNo}. ${seed.title}`,
      body: seed.body,
      image: seed.image,
      tone: seed.tone,
      choices: [
        { label: seed.fightLabel, effect: `battle_random:${seed.id}` },
        { label: seed.fleeLabel, effect: `flee_random:${seed.id}` }
      ]
    };
  }

  function buildAct1Scenes() {
    const picks = shuffledCopy(ACT1_RANDOM_SCENE_POOL).slice(0, 7);
    return [
      {
        id: "s1",
        title: "01. 기억의 잔향",
        body: "나는 죽었다.\n\n…아마도.\n\n그 순간을 떠올리려 하면 머릿속이 흐려진다.\n무언가가 무너지고 있었다는 감각만이 남아 있다.\n\n그 이상은 떠오르지 않는다.\n기억은 파편처럼 흩어져 있다.\n\n따뜻한 바람이 불어온다.\n숲이 우거진 흙길이 앞으로 펼쳐져 있다.\n세상은 평온해 보인다.\n\n그러나 가슴 깊은 곳에서 설명할 수 없는 충동이 꿈틀거린다.\n\n영원의 마탑.\n그곳으로 가야만 한다.\n\n▶ 주위를 살펴본다.\n길 가장자리에는 수레 바퀴 자국이 남아 있다.\n사람들이 오가고 있다는 뜻이다.\n숲 너머로 연기가 올라간다.\n작은 마을이 있는 듯하다.\n\n다만—\n이곳은 분명 처음이 아니다. 그러나 기억은 없다.\n\n희미하게 남은 주문들을 엮어 간신히 하나의 술식을 구성했다.\n완전하진 않다. 하지만 스스로를 지킬 정도는 될 것이다.",
        image: "assets/씬/scene_valley_bridge_path.png",
        tone: "neutral",
        choices: [
          { label: "여정 시작하기", effect: "gain_random_circle1" }
        ]
      },
      makeRandomAct1Scene(2, picks[0]),
      makeRandomAct1Scene(3, picks[1]),
      makeRandomAct1Scene(4, picks[2]),
      {
        id: "s5",
        title: "05. 여관 1차 방문",
        body: "대로를 따라 걷다 보니 길가에 오래된 여관이 보인다.\n빛이 바랜 간판. 그러나 지붕은 새 기와로 덮여 있고 문 앞 화분에는 작은 꽃이 피어 있다.\n\n문을 밀고 들어간다.\n따뜻한 공기가 얼굴을 감싼다.\n나무 타는 냄새. 잔이 부딪히는 소리. 낮은 웃음.\n\n푸근한 인상의 여관 주인이 다가온다.\n\"이곳은 안전합니다. 여행객은 언제든 환영이지요.\"\n\n그 말은 거짓처럼 들리지 않는다.",
        image: "assets/씬/scene_village_stone_lane.png",
        tone: "amber",
        choices: [
          { label: "방에 들어가 휴식한다", effect: "heal_small" },
          { label: "모험가 파티 술자리에 합류한다", effect: "mid_reward" },
          { label: "여관 주인에게 정보를 묻는다", effect: "enemy_intel" }
        ]
      },
      makeRandomAct1Scene(6, picks[3]),
      makeRandomAct1Scene(7, picks[4]),
      makeRandomAct1Scene(8, picks[5]),
      makeRandomAct1Scene(9, picks[6]),
      {
        id: "s10",
        title: "10. 여관 급습",
        body: "대로 끝, 익숙한 간판이 보인다.\n빛바랜 글씨, 문 앞 화분. 변한 것은 없다.\n\n문을 열자 따뜻한 공기가 다시 얼굴을 감싼다.\n여관 주인이 당신을 알아보고 웃는다.\n\"돌아오셨군요.\"\n\n방으로 올라간다.\n—\n똑, 똑.\n\"접니다. 잠깐… 이야기 좀.\"\n\n문이 열리는 순간 복도에는 여관 주인과 낯선 그림자들이 서 있다.\n계단 아래, 술을 마시던 모험가들이 조용히 무기를 든다.\n\n\"미안하오.\"\n\"이 일대에 현상금이 걸렸소. 요즘은 이런 기회가 오면… 잡아야 하지.\"\n\n원망은 없다. 체념과 책임만이 남아 있다.\n어떤 선택을 하든 전투로 수렴한다.",
        image: "assets/씬/scene_crimson_sky_tower.png",
        tone: "red",
        choices: [
          { label: "칼을 뽑는다", effect: "battle_inn_raid" },
          { label: "대화로 시간을 번다", effect: "battle_inn_raid" },
          { label: "선공한다", effect: "battle_inn_raid" }
        ]
      }
    ];
  }

  const act1Scenes = buildAct1Scenes();

  unlockedSpellSet = loadUnlockedSpellSet();
  saveUnlockedSpellSet();
  unlockedCoreSet = loadUnlockedCoreSet();
  saveUnlockedCoreSet();
  const initialLegacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
  const initialFormulaBook = loadStoredFormulaBook(initialLegacySlots);
  const initialActiveFormula = initialFormulaBook.formulas[initialFormulaBook.activeFormulaIndex] || initialFormulaBook.formulas[0];

  const player = {
    hp: 24,
    maxHp: 24,
    mp: 0,
    maxMp: 12,
    manaRegen: 0,
    manaHearts: PLAYER_BATTLE_HEARTS,
    maxManaHearts: PLAYER_BATTLE_HEARTS,
    maxHearts: PLAYER_MAX_HEARTS,
    shield: 0,
    formulaBook: initialFormulaBook,
    activeFormulaIndex: initialFormulaBook.activeFormulaIndex,
    activeFormulaId: initialActiveFormula.id,
    spellSlots: [...initialActiveFormula.spellIds],
    coreCastCount: 0,
    statuses: {}
  };

  const enemy = {
    hp: currentEnemyProfile().phaseDefs[0].maxHp,
    maxHp: currentEnemyProfile().phaseDefs[0].maxHp,
    mp: 0,
    maxMp: currentEnemyProfile().phaseDefs[0].enemyMaxMp,
    manaRegen: currentEnemyProfile().phaseDefs[0].enemyManaRegen,
    coreId: currentEnemyProfile().phaseDefs[0].coreId || DEFAULT_CORE_ID,
    maxHearts: 10,
    spellSlots: [...currentEnemyProfile().phaseDefs[0].enemyLoadout],
    coreCastCount: 0,
    cooldowns: Object.fromEntries(Object.keys(enemySpellLibrary).map((id) => [id, 0])),
    statuses: {}
  };

  const ui = {};
  const systems = {};

  function getActiveFormula() {
    return player.formulaBook.formulas[player.activeFormulaIndex] || player.formulaBook.formulas[0];
  }

  function getCoreById(coreId) {
    return CORE_LIBRARY[coreId] || CORE_LIBRARY[DEFAULT_CORE_ID];
  }

  function getActiveFormulaCore() {
    const formula = getActiveFormula();
    return getCoreById(formula?.coreId);
  }

  function getCurrentEnemyCore() {
    return getCoreById(enemy.coreId);
  }

  function passiveCircleOf(spell) {
    return Number.isFinite(spell.circle) ? spell.circle : (Number.isFinite(spell.heartCost) ? spell.heartCost : 1);
  }

  function applyCoreStatusBonus(core, status) {
    if (!core?.passive || !status) return status;
    if (core.passive.type !== "status_stack_bonus") return status;
    const ids = new Set(core.passive.statusIds || []);
    if (!ids.has(status.id)) return status;
    return {
      ...status,
      stacks: Math.max(1, status.stacks || 1) + Math.max(1, core.passive.bonusStacks || 1)
    };
  }

  function applyOpeningCorePassive(target, core) {
    if (!core?.passive) return 0;
    if (core.passive.type !== "opening_mana") return 0;
    const gain = Math.max(0, core.passive.value || 0);
    target.mp = target.mp + gain;
    return gain;
  }

  function corePassiveDamageBonus(target, core, spell) {
    if (!core?.passive) return 0;
    if (core.passive.type !== "high_circle_power") return 0;
    const minCircle = core.passive.minCircle || 2;
    return passiveCircleOf(spell) >= minCircle ? (core.passive.bonusDamage || 0) : 0;
  }

  function applyCycleCorePassive(target, core) {
    if (!core?.passive || core.passive.type !== "cycle_mana") return 0;
    target.coreCastCount = (target.coreCastCount || 0) + 1;
    const every = Math.max(1, core.passive.every || 3);
    if (target.coreCastCount % every !== 0) return 0;
    const gain = Math.max(0, core.passive.value || 0);
    target.mp = target.mp + gain;
    return gain;
  }

  function syncPlayerSlotsFromActiveFormula() {
    const active = getActiveFormula();
    player.activeFormulaId = active.id;
    player.spellSlots = [...active.spellIds];
  }

  function syncActiveFormulaFromPlayerSlots() {
    const active = getActiveFormula();
    active.spellIds = [...player.spellSlots];
    active.totalCircle = calcFormulaCircle(active.spellIds);
    player.formulaBook.activeFormulaIndex = player.activeFormulaIndex;
    player.activeFormulaId = active.id;
  }

  function persistPlayerFormulaState() {
    syncActiveFormulaFromPlayerSlots();
    saveFormulaBook(player.formulaBook);
    // Keep v1 key updated for backward compatibility with spellbook page.
    saveSpellSlots(player.spellSlots);
  }

  function isFormulaBrokenByIndex(index) {
    return state.brokenFormulaIndexes.has(index);
  }

  function isFormulaBroken(formula, index = -1) {
    if (Number.isInteger(index) && index >= 0) return isFormulaBrokenByIndex(index);
    if (!formula) return false;
    const idx = player.formulaBook.formulas.findIndex((item) => item?.id === formula.id);
    return idx >= 0 ? isFormulaBrokenByIndex(idx) : false;
  }

  function nextUsableFormulaIndex() {
    for (let i = 0; i < player.formulaBook.formulas.length; i += 1) {
      if (i === player.activeFormulaIndex) continue;
      if (!isFormulaBrokenByIndex(i)) return i;
    }
    return -1;
  }

  function handlePlayerFormulaBreak() {
    const brokenIndex = player.activeFormulaIndex;
    const broken = getActiveFormula();
    state.brokenFormulaIndexes.add(brokenIndex);
    ui.combatLog.push(`내 술식 파괴: ${broken?.name || `${brokenIndex + 1}번 술식`}.`, true);

    if (player.manaHearts <= 0) {
      ui.combatLog.push("전투 마나하트가 0이라 다음 술식 기동 실패. 즉시 패배.", true);
      return false;
    }

    const nextIndex = nextUsableFormulaIndex();
    if (nextIndex < 0) {
      ui.combatLog.push("남은 술식이 없어 전투를 지속할 수 없다.", true);
      return false;
    }

    player.activeFormulaIndex = nextIndex;
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    resetCooldowns();
    player.hp = player.maxHp;
    player.shield = 0;
    player.coreCastCount = 0;
    state.castGap = 0;
    const nextFormula = getActiveFormula();
    const formulaHeartCost = usedHearts(nextFormula.spellIds || []);
    let unstableDeficit = 0;
    if (player.manaHearts >= formulaHeartCost) {
      player.manaHearts = Math.max(0, player.manaHearts - formulaHeartCost);
    } else {
      unstableDeficit = formulaHeartCost - player.manaHearts;
      player.manaHearts = 0;
      player.hp = Math.max(0, player.hp - unstableDeficit);
    }
    let triggerLine = `${nextFormula.name} 자동 기동. (술식 하트 -${formulaHeartCost})`;
    if (unstableDeficit > 0) {
      triggerLine += ` 하트 부족으로 불안정 기동(내구도 -${unstableDeficit}).`;
    }
    ui.combatLog.push(triggerLine, true);
    if (player.hp <= 0) {
      ui.combatLog.push("불안정 기동으로 내구도가 0이 되어 전투 불가.", true);
      return false;
    }
    return true;
  }

  function setWorldMode(mode) {
    state.worldMode = mode;
    document.body.classList.toggle("story-mode", mode === "story");
    document.body.classList.toggle("battle-mode", mode === "battle");
  }

  function pushStoryLog(text) {
    if (!dom.storyLog) return;
    const li = document.createElement("li");
    li.textContent = text;
    dom.storyLog.prepend(li);
  }

  function randomSpellBy(filterFn) {
    const pool = unlockedSpellList().filter(filterFn);
    if (pool.length === 0) return null;
    return pool[randomInt(0, pool.length - 1)];
  }

  function randomLockedSpellBy(filterFn) {
    const pool = spellList.filter((spell) => !isSpellUnlocked(spell.id) && filterFn(spell));
    if (pool.length === 0) return null;
    return pool[randomInt(0, pool.length - 1)];
  }

  function coreRarityLabel(rarity) {
    if (rarity === "legendary") return "전설";
    if (rarity === "rare") return "희귀";
    return "일반";
  }

  function randomLockedCoreByRarity(rarity) {
    const pool = Object.values(CORE_LIBRARY).filter((core) => core.rarity === rarity && !isCoreUnlocked(core.id));
    if (pool.length === 0) return null;
    return pool[randomInt(0, pool.length - 1)];
  }

  function maybeUnlockCoreFromBattleWin(pending) {
    const profileId = pending?.enemyProfileId || state.enemyProfileId || "hunter";
    let rareChance = 0.12;
    let legendaryChance = 0.01;

    if (profileId === "dalahans" || profileId === "serion") {
      rareChance = 0.28;
      legendaryChance = 0.05;
    }
    if (profileId === "allen") {
      rareChance = 0.45;
      legendaryChance = 0.2;
    }
    if (state.story.sceneIndex >= 8) {
      rareChance += 0.08;
      legendaryChance += 0.03;
    }

    const legendary = randomLockedCoreByRarity("legendary");
    if (legendary && Math.random() < legendaryChance) {
      return unlockCore(legendary.id, "전투 승리");
    }
    const rare = randomLockedCoreByRarity("rare");
    if (rare && Math.random() < rareChance) {
      return unlockCore(rare.id, "전투 승리");
    }
    return false;
  }

  function renderStoryHeroInfo() {
    if (!dom.storyHeroInfo) return;
    const lines = [
      `술식 내구도: ${Math.floor(player.hp)} / ${player.maxHp}`,
      `버프 마나: ${Math.floor(player.mp)}`,
      `전투 마나하트: ${Math.floor(player.manaHearts)} / ${player.maxManaHearts}`,
      `술식 구성 하트 한도: ${player.maxHearts}`,
      `해금 주문: ${unlockedSpellSet.size} / ${spellList.length}`,
      `해금 술식핵: ${unlockedCoreSet.size} / ${Object.keys(CORE_LIBRARY).length}`,
      `기억의 파편: ${state.story.memoryFragments}`,
      `적 술식 정보: ${state.story.enemyIntel}`,
      `획득 술식핵: ${state.story.relics.length > 0 ? state.story.relics.join(", ") : "없음"}`
    ];
    dom.storyHeroInfo.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
  }

  function renderStoryChoices(choices, onPick) {
    if (dom.storyMapPanel) dom.storyMapPanel.classList.add("hidden");
    if (dom.storyChoices) dom.storyChoices.classList.remove("hidden");
    dom.storyChoices.innerHTML = "";
    choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "story-choice-btn";
      button.textContent = `${index + 1}. ${choice.label}`;
      button.addEventListener("click", () => onPick(choice));
      dom.storyChoices.appendChild(button);
    });
  }

  function isFixedSceneIndex(index) {
    return index === 0 || index === 4 || index === 9;
  }

  function sceneHasBattle(scene) {
    if (!scene || !Array.isArray(scene.choices)) return false;
    return scene.choices.some((choice) => typeof choice.effect === "string" && choice.effect.startsWith("battle_"));
  }

  function nextSceneCandidates(currentIndex) {
    const graph = {
      0: [1, 2],
      1: [2, 3],
      2: [3, 4],
      3: [4],
      4: [5, 6],
      5: [6, 7],
      6: [7, 8],
      7: [8, 9],
      8: [9]
    };
    const raw = graph[currentIndex] || [currentIndex + 1];
    return raw.filter((index) => index >= 0 && index < act1Scenes.length);
  }

  function renderSceneMapChoice() {
    const options = nextSceneCandidates(state.story.sceneIndex);
    if (!dom.storyMapPanel || !dom.storyMapNodes || options.length === 0) {
      state.story.sceneIndex += 1;
      renderStoryScene();
      return;
    }

    if (dom.storyChoices) dom.storyChoices.classList.add("hidden");
    dom.storyMapPanel.classList.remove("hidden");
    const current = act1Scenes[state.story.sceneIndex];
    if (dom.storyMapTitle) {
      dom.storyMapTitle.textContent = `다음 경로 선택 (${current?.title || "현재 씬"})`;
    }
    dom.storyMapNodes.innerHTML = "";

    options.forEach((sceneIndex) => {
      const scene = act1Scenes[sceneIndex];
      if (!scene) return;
      const node = document.createElement("button");
      node.type = "button";
      node.className = "story-map-node";
      const battle = sceneHasBattle(scene);
      if (battle) node.classList.add("battle");
      if (isFixedSceneIndex(sceneIndex)) node.classList.add("fixed");
      const iconPath = battle ? "assets/ui/map_node_battle.svg" : "assets/ui/map_node_unknown.svg";
      node.setAttribute("aria-label", battle ? "전투 가능 경로" : "미확인 경로");
      node.innerHTML = `<img class="story-map-icon" src="${iconPath}" alt="">`;
      node.addEventListener("click", () => {
        state.story.sceneIndex = sceneIndex;
        pushStoryLog(`경로 선택: ${scene.title}`);
        renderStoryScene();
      });
      dom.storyMapNodes.appendChild(node);
    });
  }

  function sceneContinueButton() {
    renderSceneMapChoice();
  }

  function startStoryBattle(config) {
    state.story.awaitingBattle = true;
    state.story.pendingBattle = config;
    setEnemyProfile(config.enemyProfileId || "allen");
    setWorldMode("battle");
    resetBattle();

    const earlyBattleDefaultMul = state.story.sceneIndex <= 2 ? 0.78 : 1;
    const hpMul = (typeof config.phase1EnemyHpMul === "number") ? config.phase1EnemyHpMul : earlyBattleDefaultMul;
    if (hpMul !== 1) {
      enemy.maxHp = Math.max(1, Math.floor(enemy.maxHp * hpMul));
      enemy.hp = enemy.maxHp;
    }
    if (typeof config.phase1EnemyMpMul === "number") {
      enemy.maxMp = Math.max(2, Math.floor(enemy.maxMp * config.phase1EnemyMpMul));
      enemy.mp = Math.max(0, enemy.mp);
    }
    if (config.playerShield) {
      player.shield += config.playerShield;
    }
    if (config.playerHpDelta) {
      player.hp = Math.min(player.maxHp, Math.max(1, player.hp + config.playerHpDelta));
    }
    if (config.playerMpDelta) {
      player.mp = Math.max(0, player.mp + config.playerMpDelta);
    }

    pushStoryLog(`전투 발생: ${config.enemyName}`);
    ui.combatLog.push(`스토리 전투: ${config.enemyName}`, true);
    startBattle();
  }

  function offerRelicSelection(onDone) {
    const locked = Object.values(CORE_LIBRARY)
      .filter((core) => !isCoreUnlocked(core.id))
      .sort((a, b) => {
        const order = { common: 1, rare: 2, legendary: 3 };
        return (order[a.rarity] - order[b.rarity]) || a.name.localeCompare(b.name);
      });
    if (locked.length === 0) {
      pushStoryLog("추가로 해금할 술식핵이 없습니다.");
      onDone();
      return;
    }
    const picks = [];
    const pool = [...locked];
    while (pool.length > 0 && picks.length < 3) {
      const idx = randomInt(0, pool.length - 1);
      picks.push(pool.splice(idx, 1)[0]);
    }
    renderStoryChoices(picks.map((core) => ({ label: `[${coreRarityLabel(core.rarity)}] ${core.name} 획득`, coreId: core.id })), (choice) => {
      const coreId = choice.coreId;
      if (coreId && unlockCore(coreId, "유적 탐색")) {
        const core = CORE_LIBRARY[coreId];
        state.story.relics.push(core.name);
        pushStoryLog(`술식핵 획득: [${coreRarityLabel(core.rarity)}] ${core.name}`);
      } else {
        pushStoryLog("선택한 술식핵은 이미 보유 중입니다.");
      }
      onDone();
    });
  }

  function applySceneEffect(effectId) {
    if (typeof effectId === "string" && effectId.startsWith("battle_random:")) {
      const randomId = effectId.split(":")[1] || "";
      const randomScene = ACT1_RANDOM_SCENE_POOL.find((item) => item.id === randomId);
      startStoryBattle({
        enemyName: randomScene?.enemyName || "이형체",
        enemyProfileId: randomScene?.enemyProfileId || "road_wraith",
        phase1EnemyHpMul: 0.95,
        resetToStartScene: true,
        onWin: () => {
          if (randomScene?.winLog) pushStoryLog(randomScene.winLog);
        },
        onLose: () => {
          state.story.sceneIndex = 0;
          if (randomScene?.loseLog) pushStoryLog(randomScene.loseLog);
          pushStoryLog("— 기억은 파편처럼 흩어진다. (1막 1씬으로 복귀) —");
        }
      });
      return;
    }
    if (typeof effectId === "string" && effectId.startsWith("flee_random:")) {
      const randomId = effectId.split(":")[1] || "";
      const randomScene = ACT1_RANDOM_SCENE_POOL.find((item) => item.id === randomId);
      pushStoryLog(randomScene?.fleeLog || "위험 징후를 피해 경로를 유지했다.");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_inn_raid") {
      startStoryBattle({
        enemyName: "여관 급습대",
        enemyProfileId: "inn_raider",
        phase1EnemyHpMul: 1.05,
        onWin: () => {
          pushStoryLog("여관 내부는 부서지고, 불길이 천장으로 번진다.");
          pushStoryLog("쓰러진 여관 주인은 마지막 힘으로 현상금 문서를 건넨다.");
          pushStoryLog("\"영원의 마탑을 찾는 자… 수도로 가시오.\"");
          pushStoryLog("1막 종료. 불타는 여관을 등지고 동쪽, 수도를 향한다.");
          state.story.enemyIntel += 1;
        }
      });
      return;
    }
    if (effectId === "memory_plus") {
      state.story.memoryFragments += 1;
      pushStoryLog("기억의 파편 +1");
      sceneContinueButton();
      return;
    }
    if (effectId === "gain_random_circle1") {
      const spell = randomLockedSpellBy((item) => item.circle === 1) || randomSpellBy((item) => item.circle === 1);
      if (spell) unlockSpell(spell.id, "탐색");
      else pushStoryLog("새로 해금할 1서클 주문이 없습니다.");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_bias_up") {
      state.story.battleBias += 1;
      pushStoryLog("전투 노드 확률 증가");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_farmer") {
      startStoryBattle({
        enemyName: "사냥꾼",
        enemyProfileId: "hunter",
        phase1EnemyHpMul: 0.95,
        phase1EnemyMpMul: 0.9
      });
      return;
    }
    if (effectId === "relic_pick") {
      offerRelicSelection(sceneContinueButton);
      return;
    }
    if (effectId === "heal_small") {
      const heal = Math.floor(player.maxHp * 0.12);
      player.hp = Math.min(player.maxHp, player.hp + heal);
      pushStoryLog(`휴식으로 HP ${heal} 회복`);
      sceneContinueButton();
      return;
    }
    if (effectId === "gain_green_spell") {
      const spell = randomLockedSpellBy((item) => item.color === "green") || randomSpellBy((item) => item.color === "green");
      if (spell) unlockSpell(spell.id, "정령 계약");
      else pushStoryLog("새로 해금할 녹색 주문이 없습니다.");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_dryad_reward") {
      startStoryBattle({
        enemyName: "숲의 하급 정령",
        enemyProfileId: "lesser_spirit",
        phase1EnemyHpMul: 1,
        phase1EnemyMpMul: 0.9,
        onWin: () => {
          const core = randomLockedCoreByRarity("rare");
          if (core && unlockCore(core.id, "드라이어드 전투")) {
            state.story.relics.push(core.name);
            pushStoryLog(`고급 보상 획득: [희귀] ${core.name}`);
          } else {
            pushStoryLog("고급 술식핵은 이미 모두 해금되었습니다.");
          }
          const spell = randomLockedSpellBy((item) => item.color === "green" || item.circle <= 2);
          if (spell) unlockSpell(spell.id, "드라이어드 전투");
        }
      });
      return;
    }
    if (effectId === "mana_recover") {
      const gain = Math.floor(player.maxMp * 0.2);
      player.mp = player.mp + gain;
      pushStoryLog(`아무 일 없음. MP ${gain} 회복`);
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_red_mage") {
      startStoryBattle({ enemyName: "적색 술식 사용자", phase1EnemyHpMul: 0.9 });
      return;
    }
    if (effectId === "enemy_intel") {
      state.story.enemyIntel += 1;
      pushStoryLog("적 술식 정보 획득: 다음 전투 대응 +");
      sceneContinueButton();
      return;
    }
    if (effectId === "gain_circle3_with_hp_cost") {
      const spell = randomLockedSpellBy((item) => item.circle === 3) || randomSpellBy((item) => item.circle === 3);
      const loss = Math.floor(player.maxHp * 0.14);
      player.hp = Math.max(1, player.hp - loss);
      if (spell) unlockSpell(spell.id, "금서 열람");
      pushStoryLog(`대가: 내구도 ${loss} 감소`);
      sceneContinueButton();
      return;
    }
    if (effectId === "max_heart_up") {
      player.maxHearts = Math.min(15, player.maxHearts + 1);
      pushStoryLog(`술식 구성 하트 한도 +1 (현재 ${player.maxHearts})`);
      sceneContinueButton();
      return;
    }
    if (effectId === "status_res_up") {
      pushStoryLog("상태이상 저항 상승");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_dalahans_blue") {
      startStoryBattle({
        enemyName: "청색의 달라한스",
        enemyProfileId: "dalahans",
        phase1EnemyHpMul: 0.88,
        onWin: () => {
          const spell = randomLockedSpellBy((item) => item.color === "blue") || randomSpellBy((item) => item.color === "blue");
          if (spell) unlockSpell(spell.id, "청색 처형자 격파");
        }
      });
      return;
    }
    if (effectId === "intel_and_weaken") {
      state.story.enemyIntel += 1;
      pushStoryLog("정보 획득 + 적 약화 단서 확보");
      sceneContinueButton();
      return;
    }
    if (effectId === "random_spell_trade") {
      const take = randomLockedSpellBy(() => true);
      if (take) {
        unlockSpell(take.id, "유랑 상인 거래");
      } else {
        pushStoryLog("교환 가능한 신규 주문이 없습니다.");
      }
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_hard_relic") {
      startStoryBattle({
        enemyName: "오염핵 수호체",
        enemyProfileId: "serion",
        phase1EnemyHpMul: 1.15,
        onWin: () => {
          const core = randomLockedCoreByRarity("legendary") || randomLockedCoreByRarity("rare");
          if (core && unlockCore(core.id, "오염핵 격파")) {
            state.story.relics.push(core.name);
            pushStoryLog(`고급 술식핵 획득: [${coreRarityLabel(core.rarity)}] ${core.name}`);
          } else {
            pushStoryLog("추가로 획득할 술식핵이 없습니다.");
          }
        }
      });
      return;
    }
    if (effectId === "mid_reward") {
      player.mp = player.mp + 60;
      pushStoryLog("중급 보상 획득: MP +60");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_trace_memory") {
      startStoryBattle({
        enemyName: "사라진 제자의 잔영",
        enemyProfileId: "serion",
        onWin: () => {
          if (Math.random() < 0.5) {
            state.story.memoryFragments += 1;
            pushStoryLog("기억 단계 상승 성공");
          } else {
            pushStoryLog("기억 단계 상승 실패");
          }
        }
      });
      return;
    }
    if (effectId === "no_change") {
      pushStoryLog("아무 변화 없음");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_boss_now") {
      startStoryBattle({ enemyName: "세상 끝의 수문장" });
      return;
    }
    if (effectId === "heart_up_boss_up") {
      player.maxHearts = Math.min(15, player.maxHearts + 1);
      pushStoryLog("술식 구성 하트 한도 +1, 다음 보스가 강화됩니다.");
      startStoryBattle({ enemyName: "강화된 세상 끝의 수문장", phase1EnemyHpMul: 1.2 });
      return;
    }
    if (effectId === "battle_miniboss_relic") {
      startStoryBattle({
        enemyName: "미니보스 - 심연의 파수꾼",
        onWin: () => {
          const core = randomLockedCoreByRarity("rare") || randomLockedCoreByRarity("common");
          if (core && unlockCore(core.id, "심연의 파수꾼 격파")) {
            state.story.relics.push(core.name);
            pushStoryLog(`술식핵 획득: [${coreRarityLabel(core.rarity)}] ${core.name}`);
          } else {
            pushStoryLog("추가로 획득할 술식핵이 없습니다.");
          }
        }
      });
      return;
    }
    if (effectId === "battle_final_now") {
      startStoryBattle({ enemyName: "마도왕 알렌" });
      return;
    }
    if (effectId === "battle_weaken_phase1") {
      startStoryBattle({ enemyName: "마도왕 알렌", phase1EnemyHpMul: 0.78 });
      return;
    }
    if (effectId === "battle_with_shield_100") {
      startStoryBattle({ enemyName: "마도왕 알렌", playerShield: 100 });
      return;
    }
    sceneContinueButton();
  }

  function renderStoryScene() {
    if (dom.storyMapPanel) dom.storyMapPanel.classList.add("hidden");
    if (dom.storyChoices) dom.storyChoices.classList.remove("hidden");
    renderStoryHeroInfo();
    const scene = act1Scenes[state.story.sceneIndex];
    if (!scene) {
      dom.storySceneTitle.textContent = "ACT 1 종료";
      dom.storySceneBody.textContent = "첫 루프의 기록이 완료되었습니다. 다음 ACT를 준비 중입니다.";
      dom.storyChoices.innerHTML = "";
      dom.storyArtImg.removeAttribute("src");
      dom.storyArtImg.classList.add("story-art-empty");
      dom.storyArtFrame.classList.add("empty", "tone-neutral");
      dom.storyArtFrame.classList.remove("tone-blue", "tone-green", "tone-amber", "tone-red");
      pushStoryLog("ACT 1 완료");
      return;
    }
    dom.storySceneTitle.textContent = `🜂 ACT 1 - ${scene.title}`;
    dom.storySceneBody.textContent = `📖 ${scene.body}`;
    const toneClass = `tone-${scene.tone || "neutral"}`;
    dom.storyArtFrame.classList.remove("tone-neutral", "tone-blue", "tone-green", "tone-amber", "tone-red");
    dom.storyArtFrame.classList.add(toneClass);
    if (scene.image) {
      dom.storyArtImg.src = scene.image;
      dom.storyArtImg.classList.remove("story-art-empty");
      dom.storyArtFrame.classList.remove("empty");
    } else {
      dom.storyArtImg.removeAttribute("src");
      dom.storyArtImg.classList.add("story-art-empty");
      dom.storyArtFrame.classList.add("empty");
    }
    renderStoryChoices(scene.choices, (choice) => {
      pushStoryLog(`${scene.title} 선택: ${choice.label}`);
      applySceneEffect(choice.effect);
      renderStoryHeroInfo();
    });
  }

  function resolveStoryBattle(result) {
    if (!state.story.awaitingBattle || !state.story.pendingBattle) return;
    const pending = state.story.pendingBattle;
    state.story.awaitingBattle = false;
    state.story.pendingBattle = null;

    if (result === "victory") {
      pushStoryLog(`전투 승리: ${pending.enemyName}`);
      const rewardSpell =
        randomLockedSpellBy((spell) => spell.circle <= 2)
        || randomLockedSpellBy(() => true);
      if (rewardSpell) {
        unlockSpell(rewardSpell.id, "전투 승리");
      } else {
        pushStoryLog("추가로 해금할 주문이 없습니다.");
      }
      maybeUnlockCoreFromBattleWin(pending);
      if (typeof pending.onWin === "function") pending.onWin();
    } else {
      pushStoryLog(`전투 패배: ${pending.enemyName}`);
      if (typeof pending.onLose === "function") pending.onLose();
      player.hp = Math.floor(player.maxHp * 0.65);
      player.mp = Math.floor(player.maxMp * 0.45);
    }

    setWorldMode("story");
    resetBattle();
    if (result !== "victory" && pending.resetToStartScene) {
      state.story.sceneIndex = 0;
      renderStoryScene();
      return;
    }
    sceneContinueButton();
    renderStoryHeroInfo();
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function currentPhase() {
    return currentEnemyProfile().phaseDefs[state.phaseIndex];
  }

  function usedHearts(slots = player.spellSlots) {
    return slots.reduce((sum, id) => {
      const spell = spellLibrary[id];
      return sum + (spell ? spell.heartCost : 0);
    }, 0);
  }

  function enemyUsedHearts(slots = enemy.spellSlots) {
    return slots.reduce((sum, id) => {
      const spell = enemySpellLibrary[id];
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

  const REARRANGE_STAY_RECOVER_RATIO = 0.12;

  function spellIconPath(spell) {
    if (v2SpellData.some((item) => item.id === spell.id)) {
      return `assets/spells/v2/${spell.id}.svg`;
    }
    return `assets/spells/${spell.id}.svg`;
  }

  const MANA_CRYSTAL_ICON_PATH = "assets/status/mana_crystal.svg";
  const STATUS_ICON_PATHS = {
    burn: "assets/status/burn.svg",
    poison: "assets/status/poison.svg",
    regen: "assets/status/regen.svg",
    manaFlow: "assets/status/manaFlow.svg",
    freeze: "assets/status/freeze.svg",
    bleed: "assets/status/bleed.svg",
    slow: "assets/status/slow.svg",
    stun: "assets/status/stun.svg",
    shield: "assets/status/shield.svg",
    weak: "assets/status/weak.svg",
    mark: "assets/status/mark.svg",
    overheat: "assets/status/overheat.svg",
    inferno: "assets/status/inferno.svg",
    dampen: "assets/status/dampen.svg",
    poisonRes: "assets/status/poisonRes.svg",
    reactiveSlow: "assets/status/reactiveSlow.svg",
    dryad: "assets/status/dryad.svg",
    greenWard: "assets/status/greenWard.svg",
    redFury: "assets/status/redFury.svg"
  };
  const STATUS_NAME_MAP = {
    burn: "화상",
    poison: "중독",
    regen: "재생",
    manaFlow: "마나순환",
    freeze: "동결",
    bleed: "출혈",
    slow: "둔화",
    stun: "봉인/행동불가",
    shield: "보호막",
    weak: "약점",
    mark: "표식",
    overheat: "과열",
    inferno: "연옥 화상",
    dampen: "피해완화",
    poisonRes: "해독 보호",
    reactiveSlow: "반응 둔화",
    dryad: "드라이어드",
    greenWard: "녹의 가호",
    redFury: "적의 분노"
  };
  const STATUS_META_MAP = {
    burn: { effect: "지속 피해" },
    poison: { effect: "지속 피해" },
    regen: { effect: "초당 회복" },
    manaFlow: { effect: "초당 마나 회복" },
    freeze: { effect: "시전 봉인" },
    bleed: { effect: "지속 피해" },
    slow: { effect: "행동/쿨다운 속도 저하" },
    stun: { effect: "일시 행동 불능" },
    shield: { effect: "피해 흡수" },
    weak: { effect: "받는 피해 증가" },
    mark: { effect: "보호막 추가 파괴" },
    overheat: { effect: "치명타율 증가" },
    inferno: { effect: "매초 피해가 증가하는 화상" },
    dampen: { effect: "받는 피해 감소" },
    poisonRes: { effect: "화상/중독 피해 저항" },
    reactiveSlow: { effect: "피격 시 적 둔화 반격" },
    dryad: { effect: "유지 중 자동 시전" },
    greenWard: { effect: "지속 회복 보호 효과" },
    redFury: { effect: "적색 주문 강화" }
  };

  function statusIconPath(statusId) {
    return STATUS_ICON_PATHS[statusId] || null;
  }

  function statusName(statusId) {
    return STATUS_NAME_MAP[statusId] || statusId;
  }

  function statusTooltipText(statusId, status) {
    const meta = STATUS_META_MAP[statusId] || {};
    const lines = [`${statusName(statusId)} x${status.stacks || 1}`];
    if (meta.effect) {
      lines.push(`효과: ${meta.effect}`);
    }
    if (typeof status.dps === "number") {
      lines.push(`매초 ${status.dps * (status.stacks || 1)} 피해`);
    }
    if (typeof status.growPerTick === "number" && status.growPerTick > 0) {
      lines.push(`피해 증가: 매초 +${status.growPerTick}`);
    }
    if (typeof status.decayPerTick === "number" && status.decayPerTick > 0) {
      lines.push(`피해 감소: 매초 -${status.decayPerTick}`);
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
    if (typeof status.cooldownRate === "number") {
      lines.push(`쿨다운 회복 x${status.cooldownRate.toFixed(2)}`);
    }
    if (typeof status.healPerTick === "number") {
      lines.push(`매초 체력 +${status.healPerTick}`);
    }
    if (typeof status.manaPerTick === "number") {
      lines.push(`매초 마나 +${status.manaPerTick}`);
    }
    if (typeof status.reduction === "number") {
      lines.push(`피해 감소 ${Math.floor(status.reduction * 100)}%`);
    }
    if (typeof status.damagePct === "number") {
      lines.push(`피해량 +${status.damagePct}%`);
    }
    if (typeof status.regenPerSec === "number") {
      lines.push(`매초 체력 +${status.regenPerSec}`);
    }
    if (typeof status.mpDrain === "number") {
      lines.push(`매초 MP 소모 ${status.mpDrain}`);
    }
    lines.push(`${toFixed1(Math.max(0, status.remaining || 0))}초 남음`);
    return lines.join("\n");
  }

  function statusLine(status) {
    const chunks = [statusName(status.id)];
    if (status.stacks) chunks.push(`${status.stacks}스택`);
    if (status.duration) chunks.push(`${status.duration}초`);
    if (status.dps) chunks.push(`매초 ${status.dps} 피해`);
    if (status.slowPct) chunks.push(`감속 ${status.slowPct}%`);
    if (status.vulnPct) chunks.push(`받피 +${status.vulnPct}%`);
    if (status.growPerTick) chunks.push(`피해/초 +${status.growPerTick} 증가`);
    if (status.decayPerTick) chunks.push(`피해/초 -${status.decayPerTick} 감소`);
    if (status.stackDecayOnHealthHit) chunks.push(`체력 피해 시 스택 -${status.stackDecayOnHealthHit}`);
    if (status.cooldownRate) chunks.push(`쿨회복 x${status.cooldownRate}`);
    if (status.healPerTick) chunks.push(`매초 체력 +${status.healPerTick}`);
    if (status.manaPerTick) chunks.push(`매초 마나 +${status.manaPerTick}`);
    return chunks.join(" / ");
  }

  function spellDetailLines(spell) {
    const lines = [];
    const hitCount = spell.hits || 1;
    if (Array.isArray(spell.damage)) {
      const minTotal = spell.damage[0] * hitCount;
      const maxTotal = spell.damage[1] * hitCount;
      lines.push(`직접 피해: ${minTotal}~${maxTotal}${hitCount > 1 ? ` (${hitCount}타)` : ""}`);
    }

    if (spell.burnBonusPerStack) {
      lines.push(`추가 피해: 화상 1스택당 +${spell.burnBonusPerStack}`);
    }
    if (spell.shield) {
      lines.push(`보호막: ${spell.shield}`);
    }
    if (spell.dampen) {
      lines.push(`피해 감쇠: ${Math.floor(spell.dampen.reduction * 100)}% (${spell.dampen.duration}초)`);
    }
    if (spell.heal) {
      lines.push(`회복: ${spell.heal[0]}~${spell.heal[1]}`);
    }
    if (spell.mpRestore) {
      lines.push(`MP 회복: ${spell.mpRestore[0]}~${spell.mpRestore[1]}`);
    }
    if (spell.manaFlow) {
      lines.push(`MP 재생 +${spell.manaFlow.bonus}/초 (${spell.manaFlow.duration}초)`);
    }
    if (spell.enemyMpBurn) {
      lines.push(`적 MP 소각: ${spell.enemyMpBurn[0]}~${spell.enemyMpBurn[1]}`);
    }
    if (spell.mpStealRatio) {
      lines.push(`소각 MP 흡수율: ${Math.floor(spell.mpStealRatio * 100)}%`);
    }
    if (spell.castTime) {
      lines.push(`시전 시간: ${spell.castTime}초`);
    }
    if (spell.channelTime) {
      lines.push(`채널링: ${spell.channelTime}초`);
    }
    if (spell.shieldBreakMul) {
      lines.push(`보호막 대상 피해: ${spell.shieldBreakMul}배`);
    }
    if (spell.chanceStun) {
      lines.push(`마비 확률: ${Math.floor(spell.chanceStun * 100)}%`);
      if (spell.stunBonusDamage) {
        lines.push(`마비 성공 추가 피해: ${spell.stunBonusDamage[0]}~${spell.stunBonusDamage[1]}`);
      }
    }
    if (spell.poisonRes) {
      lines.push(`중독/화상 저항: ${Math.floor(spell.poisonRes.reduction * 100)}% (${spell.poisonRes.duration}초)`);
    }
    if (spell.reactiveSlow) {
      lines.push(`피격 반응: 둔화 ${spell.reactiveSlow.slowPct}% (${spell.reactiveSlow.duration}초)`);
    }
    if (spell.summonDryad) {
      lines.push(`드라이어드 소환 ${spell.summonDryad.duration}초`);
      lines.push(`유지 코스트: MP ${spell.summonDryad.mpDrain}/초`);
      if (Array.isArray(spell.summonDryad.spellSlots) && spell.summonDryad.spellSlots.length > 0) {
        const names = spell.summonDryad.spellSlots
          .map((id) => spellLibrary[id]?.name || id)
          .join(", ");
        lines.push(`소환체 장착 마법: ${names}`);
      }
    }
    if (spell.applyEnemyStatus) {
      lines.push(`부여: ${statusLine(spell.applyEnemyStatus)}`);
    }
    if (spell.applyEnemyStatuses) {
      spell.applyEnemyStatuses.forEach((status) => {
        lines.push(`부여: ${statusLine(status)}`);
      });
    }
    if (spell.addPlayerStatus) {
      lines.push(`부여: ${statusLine(spell.addPlayerStatus)}`);
    }
    if (spell.addEnemyStatus) {
      lines.push(`자신 부여: ${statusLine(spell.addEnemyStatus)}`);
    }
    if (spell.selfBurnPct) {
      lines.push(`자가 피해: 최대 HP의 ${Math.floor(spell.selfBurnPct * 100)}%`);
    }
    if (typeof spell.critBase === "number") {
      lines.push(`기본 치명타율: ${Math.floor(spell.critBase * 100)}%`);
      if (typeof spell.critMul === "number") {
        lines.push(`치명타 배율: x${spell.critMul.toFixed(2)}`);
      }
    }
    if (spell.id === "aerisAzureSeal") {
      lines.push(`봉인 판정: ${Math.floor((spell.executionChance || 0) * 100)}% (둔화/마비 시 보정)`);
      lines.push("성공: 적 최대 HP 65% 피해 + 봉인(행동불가) 3초");
      lines.push("실패: 적 최대 HP 34% 피해");
    }
    return lines;
  }

  function spellManaGainHint(spell) {
    if (!spell) return "";
    let flat = 0;
    if (Array.isArray(spell.mpRestore)) {
      flat += Math.max(0, spell.mpRestore[0] || 0);
    }
    if (spell.manaOnEvent?.value) {
      flat += Math.max(0, spell.manaOnEvent.value || 0);
    }
    if (spell.manaOnCondition?.value) {
      flat += Math.max(0, spell.manaOnCondition.value || 0);
    }
    const parts = [];
    if (flat > 0) parts.push(`+M${flat}`);
    if (spell.manaFlow?.bonus || spell.manaFlow?.manaPerTick) parts.push("Flow");
    return parts.join(" ");
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

  function canonicalCells(cells) {
    return [...cells]
      .sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]))
      .map(([x, y]) => `${x},${y}`)
      .join("|");
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
    const unique = new Map();
    for (let turns = 0; turns < 4; turns += 1) {
      const rotated = normalizeCells(base.map((cell) => rotateCell(cell, turns)));
      unique.set(canonicalCells(rotated), rotated);
      const flipped = normalizeCells(rotated.map(([x, y]) => [-x, y]));
      unique.set(canonicalCells(flipped), flipped);
    }
    return [...unique.values()];
  }

  function fitsShape(occupied, cols, rows, shape, x, y, blockedSet = null) {
    for (let i = 0; i < shape.length; i += 1) {
      const px = x + shape[i][0];
      const py = y + shape[i][1];
      if (px < 0 || py < 0 || px >= cols || py >= rows) return false;
      if (blockedSet && blockedSet.has(`${px},${py}`)) return false;
      if (occupied[py][px]) return false;
    }
    return true;
  }

  function markShape(occupied, shape, x, y, value) {
    shape.forEach(([sx, sy]) => {
      occupied[y + sy][x + sx] = value;
    });
  }

  function buildBoardLayout(rawSpells, cols = 6, rows = 3, manualLayout = null, blocked = []) {
    const occupied = Array.from({ length: rows }, () => Array(cols).fill(null));
    const blockedSet = new Set((blocked || []).map(([x, y]) => `${x},${y}`));
    const spells = [...rawSpells].sort((a, b) => (b.circle - a.circle) || (a.slotIndex - b.slotIndex));
    const placements = [];
    const pending = [];

    function tryPlaceEntry(entry, shape, x, y, variant = 0) {
      if (!fitsShape(occupied, cols, rows, shape, x, y, blockedSet)) return false;
      markShape(occupied, shape, x, y, entry.id);
      placements.push({ ...entry, x, y, shape, variant });
      return true;
    }

    if (manualLayout) {
      spells.forEach((entry) => {
        const key = entry.itemKey;
        const preset = key ? manualLayout[key] : null;
        if (!preset) {
          pending.push(entry);
          return;
        }
        const variants = makeShapeVariants(entry.circle);
        const variant = Math.max(0, preset.variant || 0) % variants.length;
        const shape = variants[variant];
        const x = Math.floor(preset.x || 0);
        const y = Math.floor(preset.y || 0);
        if (!tryPlaceEntry(entry, shape, x, y, variant)) {
          pending.push(entry);
        }
      });
    } else {
      pending.push(...spells);
    }

    pending.forEach((entry) => {
      const variants = makeShapeVariants(entry.circle);
      const hash = hashCode(`${entry.id}:${entry.slotIndex}`);
      const rotatedStart = hash % variants.length;
      const orderedVariants = variants.slice(rotatedStart).concat(variants.slice(0, rotatedStart));
      let placed = false;

      for (let v = 0; v < orderedVariants.length && !placed; v += 1) {
        const shape = orderedVariants[v];
        const width = Math.max(...shape.map((cell) => cell[0])) + 1;
        const height = Math.max(...shape.map((cell) => cell[1])) + 1;
        for (let y = 0; y <= rows - height && !placed; y += 1) {
          for (let x = 0; x <= cols - width && !placed; x += 1) {
            if (!fitsShape(occupied, cols, rows, shape, x, y, blockedSet)) continue;
            placed = tryPlaceEntry(entry, shape, x, y, v);
          }
        }
      }

      if (!placed) {
        for (let y = 0; y < rows && !placed; y += 1) {
          for (let x = 0; x < cols && !placed; x += 1) {
            if (blockedSet.has(`${x},${y}`)) continue;
            if (occupied[y][x]) continue;
            placed = tryPlaceEntry(entry, [[0, 0]], x, y, 0);
          }
        }
      }
    });

    return placements;
  }

  function enemySpellColor(spellId) {
    if (/frost|azure|shackle|seal|chill|ice/i.test(spellId)) return "blue";
    if (/vine|dryad|nature|life|garden|bloom|root/i.test(spellId)) return "green";
    return "red";
  }

  function renderPrepLoadout() {
    dom.loadoutSlots.innerHTML = "";
    const sorted = [...unlockedSpellList()].sort(spellSort);
    if (sorted.length === 0) return;
    const options = sorted.map((spell) => `<option value="${spell.id}">${spellLabel(spell)}</option>`).join("");

    for (let i = 0; i < player.spellSlots.length; i += 1) {
      const card = document.createElement("div");
      card.className = "loadout-slot";
      card.innerHTML = `
        <label for="loadout-slot-${i}">전투 슬롯 ${i + 1}</label>
        <select id="loadout-slot-${i}">${options}</select>
      `;
      const select = card.querySelector("select");
      if (!isSpellUnlocked(player.spellSlots[i])) {
        player.spellSlots[i] = sorted[0].id;
      }
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
        persistPlayerFormulaState();
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
    const greenWard = player.statuses.greenWard;
    return (dampen ? dampen.reduction || 0 : 0) + (greenWard ? greenWard.reduction || 0 : 0);
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
    const enemyLineMatchers = [/^알렌[:의]/, /^알렌이\b/, /^적\b/];

    return {
      push(message, important = false) {
        const item = document.createElement("li");
        item.textContent = message;
        item.classList.add(enemyLineMatchers.some((pattern) => pattern.test(message)) ? "enemy" : "ally");
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
    let openStatusId = null;
    const nodesById = new Map();

    function closeAll() {
      openStatusId = null;
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".status-icon")) {
        closeAll();
      }
    });

    return {
      render(statuses) {
        const entries = Object.entries(statuses)
          .filter(([, value]) => value && value.remaining > 0)
          .sort((a, b) => {
            if (a[0] === "manaFlow") return -1;
            if (b[0] === "manaFlow") return 1;
            return a[0].localeCompare(b[0]);
          });
        const liveIds = new Set(entries.map(([id]) => id));

        nodesById.forEach((node, id) => {
          if (!liveIds.has(id)) {
            node.remove();
            nodesById.delete(id);
            if (openStatusId === id) {
              openStatusId = null;
            }
          }
        });

        if (entries.length === 0) {
          return;
        }

        entries.forEach(([id, value]) => {
          const detailText = statusTooltipText(id, value);
          const iconPath = statusIconPath(id);
          let node = nodesById.get(id);
          if (!node) {
            node = document.createElement("button");
            node.type = "button";
            node.className = "status-icon";
            node.innerHTML = `
              <span class="status-glyph">
                <img class="status-glyph-img" alt="">
                <span class="status-glyph-fallback"></span>
              </span>
              <span class="status-stack"></span>
              <span class="status-tooltip"></span>
            `;
            node.addEventListener("click", (event) => {
              event.stopPropagation();
              const next = openStatusId === id ? null : id;
              openStatusId = next;
            });
            nodesById.set(id, node);
          }

          const glyphImg = node.querySelector(".status-glyph-img");
          const glyphFallback = node.querySelector(".status-glyph-fallback");
          if (iconPath) {
            glyphImg.src = iconPath;
            glyphImg.alt = `${statusName(id)} 아이콘`;
            glyphImg.classList.remove("hidden");
            glyphFallback.textContent = "";
          } else {
            glyphImg.classList.add("hidden");
            glyphFallback.textContent = statusName(id).slice(0, 1);
          }
          node.querySelector(".status-stack").textContent = String(value.stacks || 1);
          node.querySelector(".status-tooltip").innerHTML = detailText.replace(/\n/g, "<br>");
          node.classList.toggle("open", openStatusId === id);

          if (!node.isConnected) {
            dom.enemyStatusBar.appendChild(node);
          }
        });
      }
    };
  })();

  // ui/statusSummary
  ui.statusSummary = (() => {
    const debuffIds = new Set(["burn", "poison", "bleed", "slow", "stun", "freeze", "weak", "mark", "inferno"]);
    const rowConfigs = [
      { key: "playerBuff", el: dom.playerBuffsText, label: "버프", kind: "buff", withMana: true },
      { key: "playerDebuff", el: dom.playerDebuffsText, label: "디버프", kind: "debuff", withMana: false },
      { key: "bossBuff", el: dom.bossBuffsText, label: "버프", kind: "buff", withMana: true },
      { key: "bossDebuff", el: dom.bossDebuffsText, label: "디버프", kind: "debuff", withMana: false }
    ].filter((row) => Boolean(row.el));
    const stateByKey = new Map();

    function sortEntries(entries) {
      return entries.sort((a, b) => {
        if (a[0] === "manaFlow") return -1;
        if (b[0] === "manaFlow") return 1;
        return a[0].localeCompare(b[0]);
      });
    }

    function rowEntries(statuses, kind) {
      const filtered = Object.entries(statuses || {}).filter(([id, value]) => {
        if (!value || value.remaining <= 0) return false;
        const isDebuff = debuffIds.has(id);
        return kind === "debuff" ? isDebuff : !isDebuff;
      });
      return sortEntries(filtered);
    }

    function ensureRowState(config) {
      let state = stateByKey.get(config.key);
      if (state) return state;

      const line = config.el;
      line.textContent = "";
      line.classList.add("status-inline-row");

      const label = document.createElement("span");
      label.className = "status-row-label";
      label.textContent = `${config.label}:`;
      line.appendChild(label);

      let mana = null;
      if (config.withMana) {
        mana = document.createElement("span");
        mana.className = "status-row-mp";
        line.appendChild(mana);
      }

      const list = document.createElement("span");
      list.className = "status-inline-list";
      line.appendChild(list);

      const empty = document.createElement("span");
      empty.className = "status-inline-empty";
      empty.textContent = "없음";
      list.appendChild(empty);

      state = {
        config,
        line,
        mana,
        list,
        empty,
        openStatusId: null,
        nodesById: new Map()
      };
      stateByKey.set(config.key, state);
      return state;
    }

    function syncOpenState(state) {
      state.nodesById.forEach((node, id) => {
        node.classList.toggle("open", state.openStatusId === id);
      });
    }

    function renderRow(state, statuses, mpValue) {
      if (state.mana) {
        state.mana.innerHTML = `<span class="inline-mana-flag"><img src="${MANA_CRYSTAL_ICON_PATH}" alt="마나수정">MP ${Math.floor(mpValue)}</span>`;
      }

      const entries = rowEntries(statuses, state.config.kind);
      const liveIds = new Set(entries.map(([id]) => id));

      state.nodesById.forEach((node, id) => {
        if (!liveIds.has(id)) {
          node.remove();
          state.nodesById.delete(id);
          if (state.openStatusId === id) {
            state.openStatusId = null;
          }
        }
      });

      state.empty.classList.toggle("hidden", entries.length > 0);
      if (entries.length === 0) {
        return;
      }

      entries.forEach(([id, value]) => {
        const detailText = statusTooltipText(id, value);
        const iconPath = statusIconPath(id);
        let node = state.nodesById.get(id);
        if (!node) {
          node = document.createElement("button");
          node.type = "button";
          node.className = "status-icon status-inline-icon";
          node.innerHTML = `
            <span class="status-glyph">
              <img class="status-glyph-img" alt="">
              <span class="status-glyph-fallback"></span>
            </span>
            <span class="status-stack"></span>
            <span class="status-tooltip"></span>
          `;
          node.addEventListener("click", (event) => {
            event.stopPropagation();
            state.openStatusId = state.openStatusId === id ? null : id;
            syncOpenState(state);
          });
          state.nodesById.set(id, node);
        }

        const glyphImg = node.querySelector(".status-glyph-img");
        const glyphFallback = node.querySelector(".status-glyph-fallback");
        if (iconPath) {
          glyphImg.src = iconPath;
          glyphImg.alt = `${statusName(id)} 아이콘`;
          glyphImg.classList.remove("hidden");
          glyphFallback.textContent = "";
        } else {
          glyphImg.classList.add("hidden");
          glyphFallback.textContent = statusName(id).slice(0, 1);
        }
        node.querySelector(".status-stack").textContent = String(value.stacks || 1);
        node.querySelector(".status-tooltip").innerHTML = detailText.replace(/\n/g, "<br>");

        if (!node.isConnected) {
          state.list.appendChild(node);
        }
      });

      syncOpenState(state);
    }

    document.addEventListener("click", (event) => {
      if (event.target.closest(".status-inline-icon")) return;
      stateByKey.forEach((state) => {
        state.openStatusId = null;
        syncOpenState(state);
      });
    });

    return {
      render(playerStatuses, enemyStatuses) {
        rowConfigs.forEach((config) => {
          const state = ensureRowState(config);
          if (config.key === "playerBuff") {
            renderRow(state, playerStatuses, player.mp);
          } else if (config.key === "playerDebuff") {
            renderRow(state, playerStatuses, 0);
          } else if (config.key === "bossBuff") {
            renderRow(state, enemyStatuses, enemy.mp);
          } else {
            renderRow(state, enemyStatuses, 0);
          }
        });
      }
    };
  })();

  // ui/spellBar
  ui.summonStructure = (() => {
    let opened = false;

    return {
      render(statuses) {
        const dryad = statuses.dryad;
        if (!dryad || dryad.remaining <= 0) {
          dom.summonStructure.classList.remove("active");
          dom.summonStructureBody.innerHTML = "";
          opened = false;
          return;
        }

        dom.summonStructure.classList.add("active");

        if (!dom.summonStructureBody.firstElementChild) {
          dom.summonStructureBody.innerHTML = `
            <button type="button" class="summon-pill">소환수: 드라이어드</button>
            <div class="summon-mini"></div>
          `;
          const pill = dom.summonStructureBody.querySelector(".summon-pill");
          pill.addEventListener("click", () => {
            opened = !opened;
          });
        }

        const pill = dom.summonStructureBody.querySelector(".summon-pill");
        const mini = dom.summonStructureBody.querySelector(".summon-mini");
        pill.textContent = "소환수: 드라이어드";
        pill.classList.toggle("open", opened);
        mini.textContent = `현재 드라이어드가 소환되어 있습니다. (${toFixed1(dryad.remaining)}초)`;
        mini.classList.toggle("open", opened);
      }
    };
  })();

  // ui/spellBar
  ui.spellBar = (() => {
    const flashing = new Set();
    const procEffects = [];
    const PROC_EFFECT_DURATION_MS = 620;
    let detailNode = null;
    let detailPinned = false;
    let detailPinnedKey = null;
    let dragState = null;
    let listenersBound = false;
    let playerPlacementsByKey = new Map();
    let enemyPlacementsByKey = new Map();
    let lastPlayerEntries = [];
    let lastEnemyEntries = [];

    const playerLayoutByFormula = {};
    const enemyLayoutByPhase = {};
    let enemyShuffleFxUntil = 0;

    function ensureDetailNode() {
      if (detailNode) return detailNode;
      detailNode = document.createElement("aside");
      detailNode.className = "grid-spell-detail hidden";
      detailNode.innerHTML = `
        <h4 class="grid-spell-detail-title"></h4>
        <p class="grid-spell-detail-meta"></p>
        <ul class="grid-spell-detail-lines"></ul>
      `;
      detailNode.addEventListener("click", (event) => event.stopPropagation());
      document.body.appendChild(detailNode);
      return detailNode;
    }

    function hideSpellDetail() {
      if (!detailNode) return;
      detailNode.classList.add("hidden");
    }

    function unpinSpellDetail() {
      detailPinned = false;
      detailPinnedKey = null;
    }

    function positionSpellDetail(anchorX, anchorY) {
      if (!detailNode) return;
      const margin = 12;
      const vw = window.innerWidth || 360;
      const vh = window.innerHeight || 640;
      detailNode.style.left = "0px";
      detailNode.style.top = "0px";
      const rect = detailNode.getBoundingClientRect();
      const desiredX = anchorX + 12;
      const desiredY = anchorY + 12;
      const x = Math.max(margin, Math.min(vw - rect.width - margin, desiredX));
      const y = Math.max(margin, Math.min(vh - rect.height - margin, desiredY));
      detailNode.style.left = `${Math.round(x)}px`;
      detailNode.style.top = `${Math.round(y)}px`;
    }

    function showSpellDetail(spell, entry, event, owner, options = {}) {
      if (!spell || !entry) return;
      const node = ensureDetailNode();
      const lines = spellDetailLines(spell);
      node.querySelector(".grid-spell-detail-title").textContent = `${entry.name}`;
      node.querySelector(".grid-spell-detail-meta").textContent = `${owner === "enemy" ? "적" : "플레이어"} | ${entry.circle}서클 | MP ${entry.manaCost} | CD ${entry.cooldown.toFixed(1)}s`;
      node.querySelector(".grid-spell-detail-lines").innerHTML = lines.map((line) => `<li>${line}</li>`).join("");
      node.classList.remove("hidden");
      if (options.pin) {
        detailPinned = true;
        detailPinnedKey = `${owner}:${entry.itemKey}`;
      }
      const pointX = typeof event?.clientX === "number" ? event.clientX : ((window.innerWidth || 360) * 0.5);
      const pointY = typeof event?.clientY === "number" ? event.clientY : ((window.innerHeight || 640) * 0.5);
      positionSpellDetail(pointX, pointY);
    }

    function showDetailFromTile(tile, owner, event, options = {}) {
      if (!tile) return false;
      const itemKey = tile.dataset.itemKey;
      if (!itemKey) return false;
      const entry = owner === "enemy"
        ? lastEnemyEntries.find((item) => item.itemKey === itemKey)
        : lastPlayerEntries.find((item) => item.itemKey === itemKey);
      if (!entry) return false;
      const spell = owner === "enemy" ? enemySpellLibrary[entry.id] : spellLibrary[entry.id];
      if (!spell) return false;
      showSpellDetail(spell, entry, event, owner, options);
      return true;
    }

    function pruneProcEffects(now = Date.now()) {
      for (let i = procEffects.length - 1; i >= 0; i -= 1) {
        if ((procEffects[i].endsAt || 0) <= now) {
          procEffects.splice(i, 1);
        }
      }
    }

    function effectOpacity(progress) {
      if (progress <= 0 || progress >= 1) return 0;
      if (progress < 0.15) return progress / 0.15;
      return (1 - progress) / 0.85;
    }

    function renderProcEffects(container, layout, owner, now) {
      const active = procEffects.filter((fx) => fx.owner === owner && fx.startsAt <= now && fx.endsAt > now);
      if (active.length === 0) return;
      const bySlot = new Map();
      active.forEach((fx) => {
        const list = bySlot.get(fx.slotIndex) || [];
        list.push(fx);
        bySlot.set(fx.slotIndex, list);
      });

      layout.forEach((entry) => {
        const list = bySlot.get(entry.slotIndex);
        if (!list || list.length === 0) return;
        const sortedShape = [...entry.shape].sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
        const [anchorX, anchorY] = sortedShape[0];

        list
          .sort((a, b) => (a.startsAt - b.startsAt))
          .slice(0, 3)
          .forEach((fx, fxIndex) => {
          const progress = (now - fx.startsAt) / Math.max(1, (fx.endsAt - fx.startsAt));
          if (progress <= 0 || progress >= 1) return;
          const risePx = Math.round(progress * 14) + (fxIndex * 5);
          const scale = 0.96 + (0.08 * (1 - progress));
          const node = document.createElement("div");
          node.className = `grid-proc-fx${fx.tone ? ` grid-proc-fx--${fx.tone}` : ""}`;
          node.style.gridColumn = `${entry.x + anchorX + 1}`;
          node.style.gridRow = `${entry.y + anchorY + 1}`;
          node.style.opacity = String(effectOpacity(progress));
          node.style.transform = `translate(20%, ${-risePx}px) scale(${scale.toFixed(3)})`;
          if (fx.iconPath) {
            const icon = document.createElement("img");
            icon.className = "grid-proc-icon";
            icon.src = fx.iconPath;
            icon.alt = fx.label || "효과";
            node.appendChild(icon);
          }
          const text = document.createElement("span");
          text.className = "grid-proc-text";
          text.textContent = fx.label || "";
          node.appendChild(text);
          container.appendChild(node);
          });
      });
    }

    function playerCore() {
      return getActiveFormulaCore();
    }

    function enemyCore() {
      return getCurrentEnemyCore();
    }

    function stateClass(spell) {
      const cd = state.cooldowns[spell.id] || 0;
      if (cd > 0) return "cooldown";
      if (player.mp < spell.manaCost) return "low-mp";
      return "ready";
    }

    function enemyStateClass(spell) {
      const cd = enemy.cooldowns[spell.id] || 0;
      if (cd > 0) return "cooldown";
      if (enemy.mp < spell.manaCost) return "low-mp";
      return "ready";
    }

    function formulaLayout() {
      const key = player.activeFormulaId || `formula_${player.activeFormulaIndex}`;
      if (!playerLayoutByFormula[key]) {
        const formula = getActiveFormula();
        const source = (formula && formula.gridLayout && typeof formula.gridLayout === "object") ? formula.gridLayout : {};
        playerLayoutByFormula[key] = Object.fromEntries(
          Object.entries(source).map(([k, v]) => [k, {
            x: Number.isFinite(v.x) ? Math.floor(v.x) : 0,
            y: Number.isFinite(v.y) ? Math.floor(v.y) : 0,
            variant: Number.isFinite(v.variant) ? Math.floor(v.variant) : 0
          }])
        );
      }
      return playerLayoutByFormula[key];
    }

    function enemyPhaseKey() {
      return `${state.enemyProfileId}:${state.phaseIndex}`;
    }

    function enemyLayout() {
      const key = enemyPhaseKey();
      if (!enemyLayoutByPhase[key]) enemyLayoutByPhase[key] = {};
      return enemyLayoutByPhase[key];
    }

    function appendGridCells(container, cols, rows, blocked = []) {
      const blockedSet = new Set((blocked || []).map(([x, y]) => `${x},${y}`));
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const cell = document.createElement("div");
          cell.className = "battle-grid-cell";
          if (blockedSet.has(`${x},${y}`)) {
            cell.classList.add("blocked");
          }
          cell.style.gridColumn = `${x + 1}`;
          cell.style.gridRow = `${y + 1}`;
          container.appendChild(cell);
        }
      }
    }

    function renderBoard(container, spells, options = {}) {
      if (!container) return;
      const now = Date.now();
      pruneProcEffects(now);
      const boardCols = options.cols || 6;
      const boardRows = options.rows || 3;
      container.classList.add("battle-grid");
      container.style.setProperty("--cols", String(boardCols));
      container.style.setProperty("--rows", String(boardRows));
      const cellSize = boardRows >= 7 ? 26 : (boardRows >= 5 || boardCols >= 5 ? 32 : 40);
      container.style.setProperty("--cell-size", `${cellSize}px`);
      container.innerHTML = "";
      appendGridCells(container, boardCols, boardRows, options.blocked || []);

      const layout = buildBoardLayout(spells, boardCols, boardRows, options.manualLayout || null, options.blocked || []);
      if (options.captureLayout) {
        playerPlacementsByKey = new Map();
      }
      if (options.captureEnemyLayout) {
        enemyPlacementsByKey = new Map();
      }
      layout.forEach((entry) => {
        if (options.captureLayout && entry.itemKey) {
          playerPlacementsByKey.set(entry.itemKey, { x: entry.x, y: entry.y, variant: entry.variant || 0, shape: entry.shape });
        }
        if (options.captureEnemyLayout && entry.itemKey) {
          enemyPlacementsByKey.set(entry.itemKey, { x: entry.x, y: entry.y, variant: entry.variant || 0, shape: entry.shape });
        }
        const sortedShape = [...entry.shape].sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
        sortedShape.forEach(([sx, sy], cellIndex) => {
          const node = document.createElement("div");
          node.className = `battle-grid-item ${entry.color} ${entry.stateClass}`;
          if (entry.casting) node.classList.add("casting");
          if (entry.itemKey) node.dataset.itemKey = entry.itemKey;
          node.dataset.sx = String(sx);
          node.dataset.sy = String(sy);
          node.style.gridColumn = `${entry.x + sx + 1}`;
          node.style.gridRow = `${entry.y + sy + 1}`;
          if (cellIndex === 0) {
            if (entry.iconPath) {
              const icon = document.createElement("img");
              icon.className = "battle-grid-icon";
              icon.src = entry.iconPath;
              icon.alt = `${entry.name} 아이콘`;
              node.appendChild(icon);
            }
            const label = document.createElement("span");
            label.textContent = entry.name;
            node.appendChild(label);
            if (entry.manaGainHint) {
              const manaBadge = document.createElement("small");
              manaBadge.className = "grid-mana-badge";
              manaBadge.textContent = entry.manaGainHint;
              node.appendChild(manaBadge);
            }
            if (options.editable) {
              const rotateBtn = document.createElement("button");
              rotateBtn.type = "button";
              rotateBtn.className = "grid-rotate-btn";
              rotateBtn.textContent = "⟳";
              rotateBtn.dataset.itemKey = entry.itemKey || "";
              rotateBtn.title = "회전";
              node.appendChild(rotateBtn);
            }
          }
          const mask = document.createElement("div");
          mask.className = "cooldown-mask";
          mask.style.setProperty("--cd-progress", String(entry.cdProgress));
          node.appendChild(mask);
          node.title = `${entry.name} | ${entry.circle}서클 | MP ${entry.manaCost} | CD ${entry.cooldown.toFixed(1)}s`;
          container.appendChild(node);
        });
      });
      if (options.procOwner) {
        renderProcEffects(container, layout, options.procOwner, now);
      }
    }

    function pointerToCell(event, container, boardCols, boardRows) {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const cellW = rect.width / boardCols;
      const cellH = rect.height / boardRows;
      const cx = Math.floor((event.clientX - rect.left) / cellW);
      const cy = Math.floor((event.clientY - rect.top) / cellH);
      return {
        x: Math.max(0, Math.min(boardCols - 1, cx)),
        y: Math.max(0, Math.min(boardRows - 1, cy))
      };
    }

    function applyManualMove(itemKey, nextX, nextY) {
      const current = formulaLayout()[itemKey] || playerPlacementsByKey.get(itemKey);
      if (!current) return;
      formulaLayout()[itemKey] = {
        x: nextX,
        y: nextY,
        variant: current.variant || 0
      };
    }

    function applyManualRotate(itemKey) {
      const current = formulaLayout()[itemKey] || playerPlacementsByKey.get(itemKey);
      if (!current) return;
      const entry = lastPlayerEntries.find((item) => item.itemKey === itemKey);
      if (!entry) return;
      const variants = makeShapeVariants(entry.circle);
      formulaLayout()[itemKey] = {
        x: current.x,
        y: current.y,
        variant: ((current.variant || 0) + 1) % variants.length
      };
    }

    function bindEditorListeners() {
      if (listenersBound) return;
      listenersBound = true;

      dom.spellSlots.addEventListener("pointerdown", (event) => {
        if (state.mode !== "prep") return;
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.spellSlots.contains(tile)) return;
        const itemKey = tile.dataset.itemKey;
        if (!itemKey) return;
        const place = playerPlacementsByKey.get(itemKey);
        if (!place) return;
        const sx = Number(tile.dataset.sx || 0);
        const sy = Number(tile.dataset.sy || 0);
        dragState = {
          pointerId: event.pointerId,
          itemKey,
          offsetX: sx,
          offsetY: sy
        };
      });

      dom.spellSlots.addEventListener("click", (event) => {
        const rotateBtn = event.target.closest(".grid-rotate-btn");
        if (!rotateBtn || !dom.spellSlots.contains(rotateBtn)) return;
        if (state.mode !== "prep") return;
        const itemKey = rotateBtn.dataset.itemKey;
        if (!itemKey) return;
        event.stopPropagation();
        applyManualRotate(itemKey);
      });

      dom.spellSlots.addEventListener("click", (event) => {
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.spellSlots.contains(tile)) return;
        if (event.target.closest(".grid-rotate-btn")) return;
        event.stopPropagation();
        showDetailFromTile(tile, "player", event, { pin: true });
      });

      dom.enemyBoard.addEventListener("click", (event) => {
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.enemyBoard.contains(tile)) return;
        event.stopPropagation();
        showDetailFromTile(tile, "enemy", event, { pin: true });
      });

      dom.spellSlots.addEventListener("mousemove", (event) => {
        if (detailPinned) return;
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.spellSlots.contains(tile)) {
          hideSpellDetail();
          return;
        }
        if (event.target.closest(".grid-rotate-btn")) return;
        showDetailFromTile(tile, "player", event);
      });

      dom.enemyBoard.addEventListener("mousemove", (event) => {
        if (detailPinned) return;
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.enemyBoard.contains(tile)) {
          hideSpellDetail();
          return;
        }
        showDetailFromTile(tile, "enemy", event);
      });

      dom.spellSlots.addEventListener("mouseleave", () => {
        if (detailPinned) return;
        hideSpellDetail();
      });
      dom.enemyBoard.addEventListener("mouseleave", () => {
        if (detailPinned) return;
        hideSpellDetail();
      });

      dom.spellSlots.addEventListener("dblclick", (event) => {
        if (state.mode !== "prep") return;
        const tile = event.target.closest(".battle-grid-item");
        if (!tile || !dom.spellSlots.contains(tile)) return;
        const itemKey = tile.dataset.itemKey;
        if (!itemKey) return;
        applyManualRotate(itemKey);
      });

      window.addEventListener("pointermove", (event) => {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        const core = playerCore();
        const cell = pointerToCell(event, dom.spellSlots, core.cols, core.rows);
        if (!cell) return;
        applyManualMove(dragState.itemKey, cell.x - dragState.offsetX, cell.y - dragState.offsetY);
      });

      window.addEventListener("pointerup", (event) => {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        dragState = null;
      });

      document.addEventListener("click", (event) => {
        if (!detailNode) return;
        if (event.target.closest(".grid-spell-detail")) return;
        if (event.target.closest(".battle-grid-item")) return;
        unpinSpellDetail();
        hideSpellDetail();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          unpinSpellDetail();
          hideSpellDetail();
        }
      });
      window.addEventListener("resize", () => {
        unpinSpellDetail();
        hideSpellDetail();
      });
    }

    function randomizeEnemyLayout(options = {}) {
      const moveCount = Math.max(1, options.maxMoves || 1);
      const rotateChance = typeof options.rotateChance === "number" ? options.rotateChance : 0.4;
      const entries = lastEnemyEntries.length > 0 ? [...lastEnemyEntries] : [];
      if (entries.length === 0) return false;
      const core = enemyCore();
      const blockedSet = new Set((core.blocked || []).map(([x, y]) => `${x},${y}`));
      const layout = enemyLayout();
      let changed = false;
      for (let i = 0; i < moveCount; i += 1) {
        const pick = entries[randomInt(0, entries.length - 1)];
        if (!pick || !pick.itemKey) continue;
        const current = enemyPlacementsByKey.get(pick.itemKey) || { x: 0, y: 0, variant: 0 };
        let nextX = Math.max(0, Math.min(core.cols - 1, current.x + randomInt(-2, 2)));
        let nextY = Math.max(0, Math.min(core.rows - 1, current.y + randomInt(-1, 1)));
        if (blockedSet.has(`${nextX},${nextY}`)) {
          for (let attempts = 0; attempts < 8; attempts += 1) {
            const rx = randomInt(0, core.cols - 1);
            const ry = randomInt(0, core.rows - 1);
            if (blockedSet.has(`${rx},${ry}`)) continue;
            nextX = rx;
            nextY = ry;
            break;
          }
        }
        const variants = makeShapeVariants(pick.circle);
        const nextVariant = Math.random() < rotateChance
          ? ((current.variant || 0) + randomInt(1, Math.max(1, variants.length - 1))) % variants.length
          : (current.variant || 0);
        layout[pick.itemKey] = { x: nextX, y: nextY, variant: nextVariant };
        changed = true;
      }
      if (changed) {
        enemyShuffleFxUntil = Date.now() + 420;
      }
      return changed;
    }

    return {
      flash(index) {
        flashing.add(index);
        setTimeout(() => flashing.delete(index), 200);
      },
      showProcEffect(owner, slotIndex, effect) {
        if (typeof slotIndex !== "number" || slotIndex < 0) return;
        const now = Date.now();
        const sameSlotCount = procEffects.filter((fx) => fx.owner === owner && fx.slotIndex === slotIndex && fx.endsAt > now).length;
        const startsAt = now + (Math.min(2, sameSlotCount) * 70);
        const tone = effect?.tone || "status";
        const iconPath = effect?.iconPath || null;
        const label = effect?.label || "";
        procEffects.push({
          owner,
          slotIndex,
          iconPath,
          label,
          tone,
          startsAt,
          endsAt: startsAt + PROC_EFFECT_DURATION_MS
        });
        while (procEffects.filter((fx) => fx.owner === owner && fx.slotIndex === slotIndex).length > 4) {
          const oldest = procEffects
            .filter((fx) => fx.owner === owner && fx.slotIndex === slotIndex)
            .sort((a, b) => a.startsAt - b.startsAt)[0];
          if (!oldest) break;
          const idx = procEffects.indexOf(oldest);
          if (idx < 0) break;
          procEffects.splice(idx, 1);
        }
      },
      resetPlayerLayout() {
        const key = player.activeFormulaId || `formula_${player.activeFormulaIndex}`;
        delete playerLayoutByFormula[key];
      },
      resetEnemyLayout() {
        delete enemyLayoutByPhase[enemyPhaseKey()];
      },
      randomizeEnemyLayout(options = {}) {
        return randomizeEnemyLayout(options);
      },
      render() {
        bindEditorListeners();
        const playerCoreDef = playerCore();
        const playerSpells = player.spellSlots
          .map((spellId, slotIndex) => {
            const spell = spellLibrary[spellId];
            if (!spell) return null;
            const cd = state.cooldowns[spell.id] || 0;
            const cdProgress = Math.min(1, cd / spell.cooldown);
            return {
              id: spell.id,
              name: spell.name,
              color: spell.color,
              circle: spell.circle,
              manaCost: spell.manaCost,
              cooldown: spell.cooldown,
              slotIndex,
              itemKey: `${spell.id}@${slotIndex}`,
              stateClass: stateClass(spell),
              cdProgress,
              casting: flashing.has(slotIndex),
              iconPath: spellIconPath(spell),
              manaGainHint: spellManaGainHint(spell)
            };
          })
          .filter(Boolean);
        lastPlayerEntries = playerSpells;

        renderBoard(dom.spellSlots, playerSpells, {
          cols: playerCoreDef.cols,
          rows: playerCoreDef.rows,
          blocked: playerCoreDef.blocked || [],
          manualLayout: formulaLayout(),
          captureLayout: true,
          editable: state.mode === "prep",
          procOwner: "player"
        });
        dom.spellSlots.classList.add("battle-grid-player");

        const enemyCoreDef = enemyCore();
        const enemySpells = enemy.spellSlots
          .map((spellId, slotIndex) => {
            const spell = enemySpellLibrary[spellId];
            if (!spell) return null;
            const cd = enemy.cooldowns[spell.id] || 0;
            const cdProgress = Math.min(1, cd / spell.cooldown);
            return {
              id: spell.id,
              name: spell.name,
              color: enemySpellColor(spell.id),
              circle: spell.heartCost || 1,
              manaCost: spell.manaCost,
              cooldown: spell.cooldown,
              slotIndex,
              itemKey: `${spell.id}@enemy${slotIndex}`,
              stateClass: enemyStateClass(spell),
              cdProgress,
              casting: false,
              iconPath: null,
              manaGainHint: spellManaGainHint(spell)
            };
          })
          .filter(Boolean);
        lastEnemyEntries = enemySpells;

        renderBoard(dom.enemyBoard, enemySpells, {
          cols: enemyCoreDef.cols,
          rows: enemyCoreDef.rows,
          blocked: enemyCoreDef.blocked || [],
          manualLayout: enemyLayout(),
          captureEnemyLayout: true,
          procOwner: "enemy"
        });
        if (dom.enemyBoard) {
          dom.enemyBoard.classList.add("battle-grid-enemy");
          const activeShuffleFx = Date.now() < enemyShuffleFxUntil;
          dom.enemyBoard.classList.toggle("shuffling", activeShuffleFx);
        }
      }
    };
  })();

  // systems/statusSystem
  systems.statusSystem = (() => {
    function castDryadSpell(status, spellId) {
      const spell = spellLibrary[spellId];
      if (!spell) return;

      let damage = randomInt(spell.damage[0], spell.damage[1]);
      const vulnPct = enemy.statuses.weak ? enemy.statuses.weak.vulnPct || 0 : 0;
      if (vulnPct > 0) {
        damage = Math.floor(damage * (1 + vulnPct / 100));
      }
      damage = Math.floor(damage * (1 + state.playerDamageBonus));

      enemy.hp = Math.max(0, enemy.hp - damage);
      if (damage > 0) {
        ui.damageFloat.show(damage);
      }

      let line = `드라이어드의 ${spell.name}! ${damage} 피해.`;

      if (spell.heal) {
        const heal = randomInt(spell.heal[0], spell.heal[1]);
        player.hp = Math.min(player.maxHp, player.hp + heal);
        line += ` ${heal} 회복.`;
      }

      if (spell.applyEnemyStatus?.id === "poison") {
        const addStacks = spell.applyEnemyStatus.stacks || 1;
        const currentPoisonStacks = enemy.statuses.poison ? (enemy.statuses.poison.stacks || 0) : 0;
        systems.statusSystem.applyEnemy({
          id: "poison",
          stacks: currentPoisonStacks + addStacks,
          duration: spell.applyEnemyStatus.duration || 3,
          dps: spell.applyEnemyStatus.dps || 3
        });
        line += ` 중독 +${addStacks}.`;
      } else if (spell.applyEnemyStatus) {
        systems.statusSystem.applyEnemy(spell.applyEnemyStatus);
      }

      ui.combatLog.push(line);
    }

    function normalizeStatus(payload) {
      const next = { ...payload };
      if (typeof next.remaining !== "number" && typeof next.duration === "number") {
        next.remaining = next.duration;
      }
      if (typeof next.stacks !== "number") {
        next.stacks = 1;
      }
      return next;
    }

    function mergeStatus(current, incoming) {
      const nextIncoming = normalizeStatus(incoming);
      if (!current) {
        return { ...nextIncoming, tick: 0 };
      }
      return {
        ...current,
        stacks: Math.max(current.stacks || 1, nextIncoming.stacks || 1),
        remaining: Math.max(current.remaining || 0, nextIncoming.remaining || 0),
        dps: nextIncoming.dps ?? current.dps,
        slowPct: nextIncoming.slowPct ?? current.slowPct,
        vulnPct: nextIncoming.vulnPct ?? current.vulnPct,
        critPct: nextIncoming.critPct ?? current.critPct,
        shieldBreakPct: nextIncoming.shieldBreakPct ?? current.shieldBreakPct,
        growPerTick: nextIncoming.growPerTick ?? current.growPerTick,
        mpDrain: nextIncoming.mpDrain ?? current.mpDrain,
        healPerTick: nextIncoming.healPerTick ?? current.healPerTick,
        manaPerTick: nextIncoming.manaPerTick ?? current.manaPerTick,
        decayPerTick: nextIncoming.decayPerTick ?? current.decayPerTick,
        stackDecayOnHealthHit: nextIncoming.stackDecayOnHealthHit ?? current.stackDecayOnHealthHit,
        cooldownRate: nextIncoming.cooldownRate ?? current.cooldownRate,
        poisonStacks: nextIncoming.poisonStacks ?? current.poisonStacks,
        stunChance: nextIncoming.stunChance ?? current.stunChance,
        spellSlots: nextIncoming.spellSlots ?? current.spellSlots,
        dryadCastIndex: nextIncoming.dryadCastIndex ?? current.dryadCastIndex,
        bonus: nextIncoming.bonus ?? current.bonus,
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
              if (status.decayPerTick) {
                status.dps = Math.max(0, status.dps - status.decayPerTick);
              }
            }
          }

          if (status.healPerTick) {
            while (status.tick >= 1) {
              enemy.hp = Math.min(enemy.maxHp, enemy.hp + status.healPerTick);
              status.tick -= 1;
            }
          }

          if (status.manaPerTick) {
            while (status.tick >= 1) {
              enemy.mp = enemy.mp + status.manaPerTick;
              status.tick -= 1;
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
              if (status.decayPerTick) {
                status.dps = Math.max(0, status.dps - status.decayPerTick);
              }
            }
          }

          if (status.healPerTick) {
            while (status.tick >= 1) {
              player.hp = Math.min(player.maxHp, player.hp + status.healPerTick);
              status.tick -= 1;
            }
          }

          if (status.manaPerTick) {
            while (status.tick >= 1) {
              player.mp = player.mp + status.manaPerTick;
              status.tick -= 1;
            }
          }

          if (id === "dryad") {
            while (status.tick >= 1) {
              status.tick -= 1;
              if (player.mp < (status.mpDrain || 0)) {
                delete player.statuses.dryad;
                ui.combatLog.push("드라이어드가 마나 고갈로 소멸했다.");
                break;
              }
              player.mp = Math.max(0, player.mp - (status.mpDrain || 0));
              const slots = Array.isArray(status.spellSlots) && status.spellSlots.length > 0
                ? status.spellSlots
                : ["venomVine", "lifeSprout"];
              const castIndex = status.dryadCastIndex || 0;
              const nextSpell = slots[castIndex % slots.length];
              castDryadSpell(status, nextSpell);
              status.dryadCastIndex = castIndex + 1;
              if (status.remaining > 0) {
                ui.combatLog.push(`드라이어드 유지: MP ${status.mpDrain || 0} 소모.`);
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
      playerCooldownRate() {
        const slow = player.statuses.slow;
        return slow && typeof slow.cooldownRate === "number" ? slow.cooldownRate : 1;
      },
      enemyCooldownRate() {
        const slow = enemy.statuses.slow;
        return slow && typeof slow.cooldownRate === "number" ? slow.cooldownRate : 1;
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
      state.ai.enemyRearrangeTimer = randomInt(32, 54) / 10;
      ui.spellBar.resetEnemyLayout();

      if (state.phaseIndex === 2) {
        state.ai.meltdownRemaining = randomInt(16, 22);
        state.ai.enemyRearrangeTimer = randomInt(22, 40) / 10;
      }
    }

    function syncEnemyPortrait() {
      const profile = currentEnemyProfile();
      if (dom.enemyPortraitImg && profile.portrait) {
        dom.enemyPortraitImg.src = profile.portrait;
        dom.enemyPortraitImg.alt = `${profile.name} 초상화`;
      }
      if (dom.enemyNameText) {
        dom.enemyNameText.textContent = profile.name;
      }
    }

    function renderRearrange() {
      dom.rearrangeSlots.innerHTML = "";
      const entryIndex = Number.isInteger(state.rearrangeEntryFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeEntryFormulaIndex))
        : player.activeFormulaIndex;
      const selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : entryIndex;
      const selectedFormula = player.formulaBook.formulas[selectedIndex] || getActiveFormula();
      const selectedHearts = usedHearts(selectedFormula?.spellIds || []);
      const switched = selectedIndex !== entryIndex;
      const recoverHint = Math.max(1, Math.floor(player.maxHp * REARRANGE_STAY_RECOVER_RATIO));

      dom.rearrangeError.textContent = "";
      dom.rearrangeHeartText.textContent = `선택 술식 하트: ${selectedHearts} / ${player.maxHearts}`;
      dom.phaseBuffHint.textContent = switched
        ? "술식을 교체하면 내구도 회복 없이 즉시 전투를 재개합니다."
        : `술식을 유지하면 내구도가 약간 회복됩니다. (최대 +${recoverHint})`;

      player.formulaBook.formulas.forEach((formula, index) => {
        const block = document.createElement("button");
        block.type = "button";
        block.className = "rearrange-slot rearrange-formula-btn";
        if (index === selectedIndex) block.classList.add("active");
        if (index === entryIndex) block.classList.add("current");
        const broken = isFormulaBroken(formula, index);
        if (broken) block.disabled = true;
        const core = getCoreById(formula.coreId);
        const hearts = usedHearts(formula.spellIds || []);
        const spellNames = (formula.spellIds || [])
          .map((id) => spellLibrary[id]?.name || id)
          .join(", ");
        block.innerHTML = `
          <strong>${index + 1}번 술식${index === entryIndex ? " (현재)" : ""}${broken ? " (파괴됨)" : ""}</strong>
          <span>핵: ${core.name} | 하트: ${hearts}</span>
          <small>${spellNames}</small>
        `;
        block.addEventListener("click", () => {
          state.rearrangeSelectedFormulaIndex = index;
          renderRearrange();
        });
        dom.rearrangeSlots.appendChild(block);
      });
    }

    function applyRearrangeChoice() {
      const entryIndex = Number.isInteger(state.rearrangeEntryFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeEntryFormulaIndex))
        : player.activeFormulaIndex;
      let selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : entryIndex;
      const selectedFormula = player.formulaBook.formulas[selectedIndex];
      if (isFormulaBroken(selectedFormula, selectedIndex)) {
        selectedIndex = entryIndex;
        state.rearrangeSelectedFormulaIndex = entryIndex;
      }
      if (selectedIndex !== entryIndex) {
        player.activeFormulaIndex = selectedIndex;
        syncPlayerSlotsFromActiveFormula();
        ui.spellBar.resetPlayerLayout();
        persistPlayerFormulaState();
        ui.combatLog.push(`술식 교체: ${getActiveFormula().name}.`, true);
      } else {
        const recover = Math.max(1, Math.floor(player.maxHp * REARRANGE_STAY_RECOVER_RATIO));
        const beforeHp = player.hp;
        player.hp = Math.min(player.maxHp, player.hp + recover);
        const healed = Math.max(0, Math.floor(player.hp - beforeHp));
        ui.combatLog.push(healed > 0 ? `술식 유지: 내구도 ${healed} 회복.` : "술식 유지: 내구도 회복 없음.");
      }
      state.rearrangeEntryFormulaIndex = null;
      state.rearrangeSelectedFormulaIndex = null;
    }

    return {
      resetPhase() {
        state.phaseIndex = 0;
        const phase = currentPhase();
        syncEnemyPortrait();
        enemy.maxHp = phase.maxHp;
        enemy.hp = phase.maxHp;
        enemy.maxMp = phase.enemyMaxMp;
        enemy.mp = 0;
        enemy.manaRegen = phase.enemyManaRegen;
        enemy.coreId = phase.coreId || DEFAULT_CORE_ID;
        enemy.coreCastCount = 0;
        enemy.spellSlots = [...phase.enemyLoadout];
        Object.keys(enemy.cooldowns).forEach((id) => {
          enemy.cooldowns[id] = 0;
        });
        enemy.statuses = {};
        applyOpeningCorePassive(enemy, getCurrentEnemyCore());
        setupPhaseAI();
      },
      maybeHandlePhaseDeath() {
        if (enemy.hp > 0 || state.mode !== "running") {
          return false;
        }

        if (state.phaseIndex < currentEnemyProfile().phaseDefs.length - 1) {
          state.phaseIndex += 1;
          const phase = currentPhase();

          // Phase transition reward: recover mana only.
          player.mp = player.mp + Math.floor(player.maxMp * 0.25);

          enemy.maxHp = phase.maxHp;
          enemy.hp = phase.maxHp;
          enemy.maxMp = phase.enemyMaxMp;
          enemy.mp = 0;
          enemy.manaRegen = phase.enemyManaRegen;
          enemy.coreId = phase.coreId || DEFAULT_CORE_ID;
          enemy.coreCastCount = 0;
          enemy.spellSlots = [...phase.enemyLoadout];
          Object.keys(enemy.cooldowns).forEach((id) => {
            enemy.cooldowns[id] = 0;
          });
          enemy.statuses = {};
          applyOpeningCorePassive(enemy, getCurrentEnemyCore());
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
            state.rearrangeEntryFormulaIndex = player.activeFormulaIndex;
            state.rearrangeSelectedFormulaIndex = player.activeFormulaIndex;
            dom.rearrangePanel.classList.remove("hidden");
            dom.rearrangeError.textContent = "";
            dom.readyBtn.disabled = false;
            renderRearrange();
            dom.phaseBuffChoices.innerHTML = "";
            ui.combatLog.push("술식 교체 선택 시간(10초).", true);
          }, 1300);
          return true;
        }

        state.mode = "victory";
        systems.combatLoop.setPaused(true);
        ui.combatLog.push("알렌이 붕괴했다. 전투 승리.", true);
        resolveStoryBattle("victory");
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
        applyRearrangeChoice();
        dom.rearrangePanel.classList.add("hidden");
        state.mode = "running";
        systems.combatLoop.setPaused(false);
        ui.combatLog.push("술식 선택 종료. 전투 재개.", true);
      },
      clearPendingTimeout: clearTimeoutIfAny
    };
  })();

  function resetCooldowns() {
    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = 0;
    });
  }

  function queueSpellProcEffect(owner, slotIndex, payload = {}) {
    if (!ui.spellBar || typeof ui.spellBar.showProcEffect !== "function") return;
    ui.spellBar.showProcEffect(owner, slotIndex, payload);
  }

  function queueStatusProc(owner, slotIndex, status) {
    if (!status || !status.id) return;
    const stacks = Math.max(1, status.stacks || 1);
    queueSpellProcEffect(owner, slotIndex, {
      iconPath: statusIconPath(status.id),
      label: `+${stacks}`,
      tone: "status"
    });
  }

  function castPlayerSpell(slotIndex, spell, options = {}) {
    const playerCore = getActiveFormulaCore();
    const isEchoCast = Boolean(options.echoCast);
    if (!isEchoCast) {
      player.mp = Math.max(0, player.mp - spell.manaCost);
    }
    const selfManaLowBeforeCast = player.mp <= 2;
    if (!isEchoCast) {
      state.cooldowns[spell.id] = spell.cooldown;
      ui.spellBar.flash(slotIndex);
    }
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

    if (spell.color === "red" && player.statuses.redFury) {
      damage = Math.floor(damage * (1 + (player.statuses.redFury.damagePct || 0) / 100));
    }
    damage += corePassiveDamageBonus(player, playerCore, spell);
    damage = Math.floor(damage * (1 + state.playerDamageBonus));

    if (spell.id === "aerisAzureSeal") {
      let successChance = spell.executionChance || 0.1;
      if (enemy.statuses.slow) successChance += 0.16;
      if (enemy.statuses.stun) successChance += 0.16;
      if (Math.random() < successChance) {
        damage = Math.floor(enemy.maxHp * 0.65);
        const stunStatus = applyCoreStatusBonus(playerCore, { id: "stun", stacks: 1, duration: 3 });
        systems.statusSystem.applyEnemy(stunStatus);
        queueStatusProc("player", slotIndex, stunStatus);
      } else {
        damage = Math.floor(enemy.maxHp * 0.34);
      }
    }

    const enemyHpBefore = enemy.hp;
    enemy.hp = Math.max(0, enemy.hp - damage);
    const healthDamage = Math.max(0, enemyHpBefore - enemy.hp);

    let line = `${isEchoCast ? `[${playerCore.name}] 메아리 발동!` : `플레이어의 ${spell.name} 발동!`} ${damage} 피해.`;

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
      queueSpellProcEffect("player", slotIndex, { iconPath: statusIconPath("regen"), label: `+${heal}`, tone: "heal" });
    }

    if (spell.mpRestore) {
      const gain = randomInt(spell.mpRestore[0], spell.mpRestore[1]);
      player.mp = player.mp + gain;
      line += ` MP ${gain} 회복.`;
      queueSpellProcEffect("player", slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${gain}`, tone: "mana" });
    }

    let bonusMana = 0;
    if (spell.manaOnEvent?.event === "onDamageDealt" && damage > 0) {
      bonusMana += spell.manaOnEvent.value || 1;
    }
    const controlApplied = Boolean(
      (spell.applyEnemyStatus && (spell.applyEnemyStatus.id === "stun" || spell.applyEnemyStatus.id === "slow" || spell.applyEnemyStatus.id === "freeze"))
      || (Array.isArray(spell.applyEnemyStatuses) && spell.applyEnemyStatuses.some((s) => s.id === "stun" || s.id === "slow" || s.id === "freeze"))
    );
    if (spell.manaOnEvent?.event === "onControlApplied" && controlApplied) {
      bonusMana += spell.manaOnEvent.value || 1;
    }
    if (spell.manaOnCondition?.condition === "selfShieldPositive" && player.shield > 0) {
      bonusMana += spell.manaOnCondition.value || 1;
    }
    if (spell.manaOnCondition?.condition === "selfManaLow" && selfManaLowBeforeCast) {
      bonusMana += spell.manaOnCondition.value || 1;
    }
    if (bonusMana > 0) {
      player.mp = player.mp + bonusMana;
      line += ` 마나 +${bonusMana}.`;
      queueSpellProcEffect("player", slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${bonusMana}`, tone: "mana" });
    }

    const cycleGain = applyCycleCorePassive(player, playerCore);
    if (cycleGain > 0) {
      line += ` [${playerCore.name}] 마나 +${cycleGain}.`;
      queueSpellProcEffect("player", slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${cycleGain}`, tone: "mana" });
    }

    if (spell.manaFlow) {
      systems.statusSystem.applyPlayer({ id: "manaFlow", duration: spell.manaFlow.duration, bonus: spell.manaFlow.bonus, stacks: 1 });
      queueStatusProc("player", slotIndex, { id: "manaFlow", stacks: 1 });
    }

    if (spell.applySelfStatus) {
      systems.statusSystem.applyPlayer(spell.applySelfStatus);
      queueStatusProc("player", slotIndex, spell.applySelfStatus);
    }

    if (spell.enemyMpBurn) {
      const burn = randomInt(spell.enemyMpBurn[0], spell.enemyMpBurn[1]);
      const actualBurn = Math.min(enemy.mp, burn);
      enemy.mp = Math.max(0, enemy.mp - actualBurn);
      if (spell.mpStealRatio) {
        const gain = Math.floor(actualBurn * spell.mpStealRatio);
        player.mp = player.mp + gain;
        line += ` 적 MP ${actualBurn} 소각, MP ${gain} 흡수.`;
        queueSpellProcEffect("player", slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${gain}`, tone: "mana" });
      } else {
        line += ` 적 MP ${actualBurn} 소각.`;
      }
    }

    if (spell.poisonRes) {
      systems.statusSystem.applyPlayer({ id: "poisonRes", duration: spell.poisonRes.duration, reduction: spell.poisonRes.reduction, stacks: 1 });
      queueStatusProc("player", slotIndex, { id: "poisonRes", stacks: 1 });
    }

    if (spell.reactiveSlow) {
      systems.statusSystem.applyPlayer({ id: "reactiveSlow", duration: spell.reactiveSlow.duration, slowPct: spell.reactiveSlow.slowPct, stacks: 1 });
      queueStatusProc("player", slotIndex, { id: "reactiveSlow", stacks: 1 });
    }

    if (spell.summonDryad) {
      systems.statusSystem.applyPlayer({
        id: "dryad",
        duration: spell.summonDryad.duration,
        stacks: 1,
        dryadCastIndex: 0,
        ...spell.summonDryad
      });
      queueStatusProc("player", slotIndex, { id: "dryad", stacks: 1 });
    }

    if (spell.chanceStun && Math.random() < spell.chanceStun) {
      const stunStatus = applyCoreStatusBonus(playerCore, { id: "stun", stacks: 1, duration: 1.2 });
      systems.statusSystem.applyEnemy(stunStatus);
      queueStatusProc("player", slotIndex, stunStatus);
      if (spell.stunBonusDamage) {
        const bonus = randomInt(spell.stunBonusDamage[0], spell.stunBonusDamage[1]);
        enemy.hp = Math.max(0, enemy.hp - bonus);
        line += ` ${bonus} 추가 피해.`;
      }
    }

    ui.combatLog.push(line, Boolean(spell.highCircle));

    if (spell.applyEnemyStatus) {
      const boosted = applyCoreStatusBonus(playerCore, spell.applyEnemyStatus);
      systems.statusSystem.applyEnemy(boosted);
      queueStatusProc("player", slotIndex, boosted);
    }
    if (spell.applyEnemyStatuses) {
      spell.applyEnemyStatuses.forEach((status) => {
        const boosted = applyCoreStatusBonus(playerCore, status);
        systems.statusSystem.applyEnemy(boosted);
        queueStatusProc("player", slotIndex, boosted);
      });
    }
    if (healthDamage > 0 && enemy.statuses.burn && (enemy.statuses.burn.stackDecayOnHealthHit || 0) > 0) {
      enemy.statuses.burn.stacks = Math.max(0, (enemy.statuses.burn.stacks || 1) - enemy.statuses.burn.stackDecayOnHealthHit);
      if (enemy.statuses.burn.stacks <= 0) delete enemy.statuses.burn;
    }
    if (!isEchoCast && playerCore?.passive?.type === "red_double_cast" && spell.color === "red") {
      castPlayerSpell(slotIndex, spell, { echoCast: true });
    }
    return true;
  }

  function castEnemySpell(spellId, options = {}) {
    const spell = enemySpellLibrary[spellId];
    if (!spell) return { ok: false, reason: "missing" };
    if (!enemy.spellSlots.includes(spellId)) return { ok: false, reason: "not-equipped" };
    if ((enemy.cooldowns[spell.id] || 0) > 0) return { ok: false, reason: "cooldown" };
    if (enemy.mp < spell.manaCost) return { ok: false, reason: "mana" };

    enemy.mp = Math.max(0, enemy.mp - spell.manaCost);
    const selfManaLowBeforeCast = enemy.mp <= 2;
    enemy.cooldowns[spell.id] = spell.cooldown;
    const enemyCore = getCurrentEnemyCore();

    let damage = 0;
    const hitCount = spell.hits || 1;
    for (let i = 0; i < hitCount; i += 1) {
      damage += randomInt(spell.damage[0], spell.damage[1]);
    }

    const hasTacticalEffect = Boolean(
      spell.addPlayerStatus
      || spell.enemyMpBurn
      || spell.mpRestore
      || spell.manaFlow
      || spell.manaOnEvent
      || spell.manaOnCondition
    );
    if (damage <= 0 && hasTacticalEffect) {
      damage = 1;
    }

    if (spell.critBase) {
      const critChance = spell.critBase + systems.statusSystem.enemyOverheatCrit() / 100;
      if (Math.random() < critChance) {
        damage = Math.floor(damage * (spell.critMul || 1.4));
      }
    }

    if (options.rampBonus) {
      damage += options.rampBonus;
    }
    damage += corePassiveDamageBonus(enemy, enemyCore, spell);

    const dealt = dealPlayerDamage(damage, { shieldBreakMul: spell.shieldBreakMul || 1 });
    applyReactiveSlow();

    if (spell.mpRestore) {
      const gain = randomInt(spell.mpRestore[0], spell.mpRestore[1]);
      enemy.mp = enemy.mp + gain;
      queueSpellProcEffect("enemy", options.slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${gain}`, tone: "mana" });
    }
    if (spell.manaFlow && spell.manaFlow.bonus) {
      enemy.mp = enemy.mp + Math.max(1, Math.floor(spell.manaFlow.bonus / 2));
      queueStatusProc("enemy", options.slotIndex, { id: "manaFlow", stacks: 1 });
    }

    let enemyBonusMana = 0;
    if (spell.manaOnEvent?.event === "onDamageDealt" && dealt > 0) {
      enemyBonusMana += spell.manaOnEvent.value || 1;
    }
    const enemyControlApplied = Boolean(spell.addPlayerStatus && (spell.addPlayerStatus.id === "stun" || spell.addPlayerStatus.id === "slow" || spell.addPlayerStatus.id === "freeze"));
    if (spell.manaOnEvent?.event === "onControlApplied" && enemyControlApplied) {
      enemyBonusMana += spell.manaOnEvent.value || 1;
    }
    if (spell.manaOnCondition?.condition === "selfShieldPositive" && spell.color === "green") {
      enemyBonusMana += spell.manaOnCondition.value || 1;
    }
    if (spell.manaOnCondition?.condition === "selfManaLow" && selfManaLowBeforeCast) {
      enemyBonusMana += spell.manaOnCondition.value || 1;
    }
    if (enemyBonusMana > 0) {
      enemy.mp = enemy.mp + enemyBonusMana;
      queueSpellProcEffect("enemy", options.slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${enemyBonusMana}`, tone: "mana" });
    }
    const enemyCycleGain = applyCycleCorePassive(enemy, enemyCore);
    if (enemyCycleGain > 0) {
      queueSpellProcEffect("enemy", options.slotIndex, { iconPath: MANA_CRYSTAL_ICON_PATH, label: `+${enemyCycleGain}`, tone: "mana" });
    }

    if (spell.addPlayerStatus) {
      const boosted = applyCoreStatusBonus(enemyCore, spell.addPlayerStatus);
      systems.statusSystem.applyPlayer(boosted);
      queueStatusProc("enemy", options.slotIndex, boosted);
    }
    if (spell.addEnemyStatus) {
      const boosted = applyCoreStatusBonus(enemyCore, spell.addEnemyStatus);
      systems.statusSystem.applyEnemy(boosted);
      queueStatusProc("enemy", options.slotIndex, boosted);
    }
    if (spell.selfBurnPct) {
      const selfBurn = Math.floor(enemy.maxHp * spell.selfBurnPct);
      enemy.hp = Math.max(0, enemy.hp - selfBurn);
      ui.damageFloat.show(selfBurn);
    }

    const message = options.logName || spell.name;
    if (spell.highCircle || options.important) {
      ui.combatLog.push(`알렌: ${message}! ${dealt} 피해.`, true);
    } else {
      ui.combatLog.push(`알렌의 ${message}! ${dealt} 피해.`);
    }
    if (Math.random() < 0.18) {
      ui.spellBar.randomizeEnemyLayout({ maxMoves: 1, rotateChance: 0.35 });
    }
    if (dealt > 0 && player.statuses.burn && (player.statuses.burn.stackDecayOnHealthHit || 0) > 0) {
      player.statuses.burn.stacks = Math.max(0, (player.statuses.burn.stacks || 1) - player.statuses.burn.stackDecayOnHealthHit);
      if (player.statuses.burn.stacks <= 0) delete player.statuses.burn;
    }
    return { ok: true, dealt };
  }

  function runAutoCast(dt) {
    state.castGap = Math.max(0, state.castGap - dt);
    if (state.castGap > 0) return;
    if (player.statuses.stun || player.statuses.freeze) return;

    for (let i = 0; i < player.spellSlots.length; i += 1) {
      const spell = spellLibrary[player.spellSlots[i]];
      if (!spell) continue;
      if ((state.cooldowns[spell.id] || 0) > 0) continue;
      if (player.mp < spell.manaCost) continue;

      if (!castPlayerSpell(i, spell)) continue;
      let castDelay = Math.max(0.25, spell.castTime || 0, spell.channelTime || 0);
      if (spell.id === "aerisAzureSeal" && (enemy.statuses.slow || enemy.statuses.stun || enemy.statuses.freeze)) {
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

  function playerManaRegenPerSec() {
    const flow = player.statuses.manaFlow;
    const flowBonus = flow ? (flow.manaPerTick || flow.bonus || 0) : 0;
    return player.manaRegen + flowBonus;
  }

  function enemyAutoCast(dt, baseInterval, jitter = 0.4) {
    state.ai.basicTimer -= dt;
    if (state.ai.basicTimer > 0) return;
    state.ai.basicTimer = Math.max(0.45, baseInterval + (Math.random() * jitter));

    function preferredColor() {
      if (state.enemyProfileId === "dalahans") return "blue";
      if (state.enemyProfileId === "serion") return "green";
      return "red";
    }

    const pref = preferredColor();
    const secondary = pref === "red" ? "blue" : pref === "blue" ? "green" : "red";

    function scoreSpell(spell) {
      const cd = enemy.cooldowns[spell.id] || 0;
      if (cd > 0) return -9999;
      const affordable = enemy.mp >= spell.manaCost;
      const manaEngine = Boolean(spell.mpRestore || spell.manaFlow || spell.manaCost === 0);
      const avgDamage = ((spell.damage?.[0] || 0) + (spell.damage?.[1] || 0)) / 2;
      let score = 0;
      if (affordable) score += 120;
      if (!affordable) score -= (spell.manaCost - enemy.mp) * 20;
      if (manaEngine && enemy.mp <= 2) score += 150;
      if (manaEngine && enemy.mp <= Math.floor(enemy.maxMp * 0.35)) score += 80;
      if (manaEngine && enemy.mp >= Math.floor(enemy.maxMp * 0.6)) score -= 60;
      if (!manaEngine && enemy.mp >= Math.floor(enemy.maxMp * 0.5)) score += (spell.heartCost || 0) * 22;
      if (avgDamage > 0 && affordable) score += 55 + avgDamage * 8;
      if (avgDamage <= 0 && enemy.mp >= Math.floor(enemy.maxMp * 0.5)) score -= 35;
      score += (spell.heartCost || 0) * 5;
      score -= spell.manaCost * 2;
      if (spell.color === pref) score += 65;
      else if (spell.color === secondary) score += 20;
      else score -= 8;
      if (pref === "red" && spell.archetype && spell.archetype.includes("속공")) score += 18;
      if (pref === "blue" && spell.archetype && spell.archetype.includes("제어")) score += 18;
      if (pref === "green" && spell.archetype && spell.archetype.includes("생존")) score += 18;
      return score;
    }

    const candidateIds = [...enemy.spellSlots].sort((a, b) => {
      const sa = enemySpellLibrary[a];
      const sb = enemySpellLibrary[b];
      return (scoreSpell(sb) - scoreSpell(sa));
    });
    for (let i = 0; i < candidateIds.length; i += 1) {
      const slotIndex = enemy.spellSlots.indexOf(candidateIds[i]);
      const cast = castEnemySpell(candidateIds[i], { slotIndex });
      if (cast.ok) return;
    }
  }

  function phase1AI(dt) {
    enemyAutoCast(dt, 1.6, 0.5);
  }

  function phase2AI(dt) {
    enemyAutoCast(dt, 1.25, 0.45);
  }

  function phase3AI(dt) {
    enemyAutoCast(dt, 0.95, 0.4);
  }

  function runEnemyAI(dt) {
    if (enemy.statuses.stun || enemy.statuses.freeze) {
      return;
    }
    const slowRate = systems.statusSystem.enemySlowRate();
    const scaledDt = dt * Math.max(0.15, 1 - slowRate);

    if (state.phaseIndex === 0) phase1AI(scaledDt);
    if (state.phaseIndex === 1) phase2AI(scaledDt);
    if (state.phaseIndex === 2) phase3AI(scaledDt);

    state.ai.enemyRearrangeTimer -= scaledDt;
    if (state.ai.enemyRearrangeTimer <= 0) {
      const moveCount = state.phaseIndex >= 2 ? 2 : 1;
      const rotated = ui.spellBar.randomizeEnemyLayout({ maxMoves: moveCount, rotateChance: 0.5 });
      if (rotated) {
        ui.combatLog.push("알렌이 술식 배열을 재정렬했다.");
      }
      if (state.phaseIndex === 0) {
        state.ai.enemyRearrangeTimer = randomInt(45, 70) / 10;
      } else if (state.phaseIndex === 1) {
        state.ai.enemyRearrangeTimer = randomInt(34, 56) / 10;
      } else {
        state.ai.enemyRearrangeTimer = randomInt(24, 44) / 10;
      }
    }
  }

  function runCombat(dt) {
    player.mp = player.mp + playerManaRegenPerSec() * dt;
    enemy.mp = enemy.mp + enemy.manaRegen * dt;
    if (player.statuses.greenWard && player.statuses.greenWard.regenPerSec) {
      player.hp = Math.min(player.maxHp, player.hp + player.statuses.greenWard.regenPerSec * dt);
    }

    const playerCdRate = systems.statusSystem.playerCooldownRate();
    const enemyCdRate = systems.statusSystem.enemyCooldownRate();
    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = Math.max(0, (state.cooldowns[spell.id] || 0) - (dt * playerCdRate));
    });
    Object.keys(enemy.cooldowns).forEach((id) => {
      enemy.cooldowns[id] = Math.max(0, (enemy.cooldowns[id] || 0) - (dt * enemyCdRate));
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
      if (handlePlayerFormulaBreak()) {
        return;
      }
      state.mode = "defeat";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("전투 패배.", true);
      resolveStoryBattle("defeat");
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
          runCombat(dt * state.speed);
        }
        if (state.mode === "rearrange") {
          systems.phaseSystem.updateRearrange(dt);
        }
      }

      updateUI();
      ui.spellBar.render();
      ui.enemyStatusBar.render(enemy.statuses);
      ui.summonStructure.render(player.statuses);
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
    dom.bossHpFill.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;

    const playerCore = getActiveFormulaCore();
    const enemyCore = getCurrentEnemyCore();
    const activeFormula = getActiveFormula();
    const phase = currentPhase();
    dom.heartText.textContent = `전투 마나하트: ${Math.floor(player.manaHearts)} / ${player.maxManaHearts} | 핵: ${playerCore.name} | 보호막 ${Math.floor(player.shield)}`;
    dom.enemyHeartText.textContent = `핵: ${enemyCore.name} | 하트: ${enemyUsedHearts()} / ${enemy.maxHearts}`;
    dom.loadoutHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;

    ui.statusSummary.render(player.statuses, enemy.statuses);
    if (dom.playerCorePassiveTip) {
      const text = playerCore?.passive?.text || "패시브 없음";
      dom.playerCorePassiveTip.textContent = text;
      dom.playerCorePassiveTip.title = text;
    }
    if (dom.bossCorePassiveTip) {
      const text = enemyCore?.passive?.text || "패시브 없음";
      dom.bossCorePassiveTip.textContent = text;
      dom.bossCorePassiveTip.title = text;
    }
    if (dom.playerNameText) dom.playerNameText.textContent = "죽은 마법사";
    if (dom.enemyNameText) dom.enemyNameText.textContent = currentEnemyProfile().name;
    if (dom.playerGridTitle) {
      dom.playerGridTitle.textContent = `내 술식: ${activeFormula?.name || "이름 없는 술식"} [${playerCore.name}] ${playerCore?.passive?.text || ""}`;
    }
    if (dom.enemyGridTitle) {
      dom.enemyGridTitle.textContent = `상대 술식: ${phase?.name || currentEnemyProfile().name} [${enemyCore.name}] ${enemyCore?.passive?.text || ""}`;
    }
    dom.loadoutSlots.querySelectorAll("select").forEach((select) => {
      select.disabled = state.mode !== "prep";
    });
    dom.speedBtn.textContent = `속도 x${state.speed}`;
    dom.speedBtn.classList.toggle("active", state.speed > 1);

    if (state.mode === "running") dom.phasePill.textContent = `페이즈 ${state.phaseIndex + 1}`;
    if (state.mode === "rearrange") dom.phasePill.textContent = "교체 선택";
    if (state.mode === "phase-transition") dom.phasePill.textContent = "전환";
    if (state.mode === "victory") dom.phasePill.textContent = "승리";
    if (state.mode === "defeat") dom.phasePill.textContent = "패배";
    if (state.mode === "prep") dom.phasePill.textContent = "준비";
    if (state.worldMode === "story") dom.phasePill.textContent = "스토리";
  }

  function resetBattle() {
    systems.phaseSystem.clearPendingTimeout();
    ui.phaseOverlay.hide();

    state.mode = "prep";
    state.speed = 1;
    state.castGap = 0;
    state.rearrangeRemaining = 0;
    state.rearrangeSelectedFormulaIndex = null;
    state.rearrangeEntryFormulaIndex = null;
    state.brokenFormulaIndexes = new Set();
    state.pendingTimeout = null;

    resetCooldowns();

    player.hp = player.maxHp;
    player.mp = 0;
    player.manaHearts = player.maxManaHearts;
    player.coreCastCount = 0;
    player.shield = 0;
    player.statuses = {};
    const legacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
    player.formulaBook = loadStoredFormulaBook(legacySlots);
    player.activeFormulaIndex = player.formulaBook.activeFormulaIndex;
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    persistPlayerFormulaState();
    renderPrepLoadout();

    systems.phaseSystem.resetPhase();

    dom.rearrangePanel.classList.add("hidden");
    dom.phaseBuffChoices.innerHTML = "";
    dom.phaseBuffHint.textContent = "";
    dom.readyBtn.disabled = false;
    systems.combatLoop.setPaused(true);

    ui.combatLog.clear();
    ui.combatLog.push("전투 초기화 완료.");
    if (dom.combatLogBody) dom.combatLogBody.classList.add("hidden");
    if (dom.combatLogToggle) dom.combatLogToggle.textContent = "전투 로그 보기";
    updateUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
    ui.summonStructure.render(player.statuses);
  }

  function startBattle() {
    if (state.mode === "running" || state.mode === "rearrange" || state.mode === "phase-transition") {
      return;
    }
    if (state.mode === "victory" || state.mode === "defeat") {
      resetBattle();
    }
    setWorldMode("battle");
    state.brokenFormulaIndexes = new Set();
    const openingFormula = getActiveFormula();
    const openingHeartCost = usedHearts(openingFormula?.spellIds || []);
    let openingDeficit = 0;
    if (player.manaHearts >= openingHeartCost) {
      player.manaHearts = Math.max(0, player.manaHearts - openingHeartCost);
    } else {
      openingDeficit = openingHeartCost - player.manaHearts;
      player.manaHearts = 0;
      player.hp = Math.max(0, player.hp - openingDeficit);
    }
    let openingLine = `전투 시작: ${openingFormula?.name || "현재 술식"} 기동 (술식 하트 -${openingHeartCost}).`;
    if (openingDeficit > 0) {
      openingLine += ` 하트 부족으로 불안정 기동(내구도 -${openingDeficit}).`;
    }
    ui.combatLog.push(openingLine, true);
    if (player.hp <= 0) {
      state.mode = "defeat";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("초기 술식 기동 실패로 전투 불가.", true);
      resolveStoryBattle("defeat");
      return;
    }
    player.coreCastCount = 0;
    const openGain = applyOpeningCorePassive(player, getActiveFormulaCore());
    if (openGain > 0) {
      ui.combatLog.push(`핵 패시브 발동: 시작 마나 +${openGain}.`);
    }
    state.mode = "running";
    systems.combatLoop.setPaused(false);
  }

  function bindEvents() {
    dom.startBtn.addEventListener("click", startBattle);
    dom.resetBtn.addEventListener("click", resetBattle);
    dom.speedBtn.addEventListener("click", () => {
      state.speed = state.speed === 1 ? 2 : 1;
      updateUI();
    });
    dom.readyBtn.addEventListener("click", () => {
      systems.phaseSystem.exitRearrange();
    });
    if (dom.combatLogToggle && dom.combatLogBody) {
      dom.combatLogToggle.addEventListener("click", () => {
        const open = !dom.combatLogBody.classList.contains("hidden");
        dom.combatLogBody.classList.toggle("hidden", open);
        dom.combatLogToggle.textContent = open ? "전투 로그 보기" : "전투 로그 닫기";
      });
    }
    document.addEventListener("click", () => {
      dom.spellSlots.querySelectorAll(".spell-slot").forEach((el) => el.classList.remove("open"));
    });

    if (dom.storyInfoBtn) {
      dom.storyInfoBtn.addEventListener("click", () => {
        renderStoryHeroInfo();
        dom.storyInfoPanel.classList.remove("hidden");
      });
    }
    if (dom.storyInfoClose) {
      dom.storyInfoClose.addEventListener("click", () => {
        dom.storyInfoPanel.classList.add("hidden");
      });
    }
    if (dom.storyMenuBtn) {
      dom.storyMenuBtn.addEventListener("click", () => {
        dom.storyMenuPanel.classList.remove("hidden");
      });
    }
    if (dom.storyMenuClose) {
      dom.storyMenuClose.addEventListener("click", () => {
        dom.storyMenuPanel.classList.add("hidden");
      });
    }
  }

  function init() {
    try {
      bindEvents();
      systems.combatLoop.start();
      setWorldMode("story");
      renderPrepLoadout();
      renderStoryScene();
      updateUI();
      ui.spellBar.render();
      ui.enemyStatusBar.render(enemy.statuses);
      ui.summonStructure.render(player.statuses);
    } catch (error) {
      console.error(error);
      if (dom.storySceneBody) {
        dom.storySceneBody.textContent = `초기화 오류: ${error && error.message ? error.message : "알 수 없는 오류"}`;
      }
      if (dom.storyChoices) {
        dom.storyChoices.innerHTML = "";
      }
    }
  }

  init();
})();
