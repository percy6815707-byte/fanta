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
    heartText: document.getElementById("heart-text"),
    enemyHeartText: document.getElementById("enemy-heart-text"),
    phasePill: document.getElementById("phase-pill"),
    loadoutHeartText: document.getElementById("loadout-heart-text"),
    loadoutSlots: document.getElementById("loadout-slots"),
    combatLog: document.getElementById("combat-log"),
    combatLogToggle: document.getElementById("combat-log-toggle"),
    combatLogBody: document.getElementById("combat-log-body"),
    topPanel: document.querySelector(".top-panel"),
    enemyBoard: document.getElementById("enemy-board"),
    playerGridTitle: document.getElementById("player-grid-title"),
    playerGridCore: document.getElementById("player-grid-core"),
    enemyGridTitle: document.getElementById("enemy-grid-title"),
    enemyGridCore: document.getElementById("enemy-grid-core"),
    playerGridPanel: document.querySelector(".player-grid-panel"),
    enemyGridPanel: document.querySelector(".enemy-grid-panel"),
    playerDuelSide: document.querySelector(".duel-side.duel-player"),
    enemyDuelSide: document.querySelector(".duel-side.duel-enemy"),
    spellSlots: document.getElementById("spell-slots"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    speedBtn: document.getElementById("speed-btn"),
    battleSpeedBtn: document.getElementById("battle-speed-btn"),
    battlePauseBtn: document.getElementById("battle-pause-btn"),
    battleMenuBtn: document.getElementById("battle-menu-btn"),
    battleStaffBtn: document.getElementById("battle-staff-btn"),
    battleActionBar: document.getElementById("battle-action-bar"),
    battleCircle1Btn: document.getElementById("battle-circle-1-btn"),
    battleCircle2Btn: document.getElementById("battle-circle-2-btn"),
    battleCircle3Btn: document.getElementById("battle-circle-3-btn"),
    battleCircle4Btn: document.getElementById("battle-circle-4-btn"),
    battleActionDetail: document.getElementById("battle-action-detail"),
    battleLogToggle: document.getElementById("battle-log-toggle"),
    resonanceGrid: document.getElementById("resonance-grid"),
    resonanceHint: document.getElementById("resonance-hint"),
    frameStyleBtn: document.getElementById("frame-style-btn"),
    fontWeightBtn: document.getElementById("font-weight-btn"),
    enemyPortraitFrame: document.getElementById("enemy-portrait-frame"),
    enemyPortraitImg: document.getElementById("enemy-portrait-img"),
    enemyStatusBar: document.getElementById("enemy-status-bar"),
    enemyFloatLayer: document.getElementById("enemy-float-layer"),
    summonStructure: document.getElementById("summon-structure"),
    summonStructureBody: document.getElementById("summon-structure-body"),
    rearrangePanel: document.getElementById("rearrange-panel"),
    rearrangeEnemyPortraitImg: document.getElementById("rearrange-enemy-portrait-img"),
    rearrangeEnemyName: document.getElementById("rearrange-enemy-name"),
    rearrangeEnemyFormula: document.getElementById("rearrange-enemy-formula"),
    rearrangeTimerText: document.getElementById("rearrange-timer-text"),
    rearrangeHeartText: document.getElementById("rearrange-heart-text"),
    phaseBuffHint: document.getElementById("phase-buff-hint"),
    phaseBuffChoices: document.getElementById("phase-buff-choices"),
    rearrangeError: document.getElementById("rearrange-error"),
    rearrangeSlots: document.getElementById("rearrange-slots"),
    readyBtn: document.getElementById("ready-btn"),
    phaseOverlay: document.getElementById("phase-overlay"),
    phaseOverlayPortraitImg: document.getElementById("phase-overlay-portrait-img"),
    phaseOverlayEnemyName: document.getElementById("phase-overlay-enemy-name"),
    phaseOverlayTitle: document.getElementById("phase-overlay-title"),
    phaseOverlayQuote: document.getElementById("phase-overlay-quote"),
    storyScreen: document.getElementById("story-screen"),
    storyArtFrame: document.querySelector(".story-art-frame"),
    storyArtImg: document.getElementById("story-art-img"),
    storySceneTitle: document.getElementById("story-scene-title"),
    storyRevealSpeedBtn: document.getElementById("story-reveal-speed-btn"),
    storyRevealSkipBtn: document.getElementById("story-reveal-skip-btn"),
    storySceneBody: document.getElementById("story-scene-body"),
    storyLog: document.getElementById("story-log"),
    storyChoices: document.getElementById("story-choices"),
    storyMapPanel: document.getElementById("story-map-panel"),
    storyMapTitle: document.getElementById("story-map-title"),
    storyMapClose: document.getElementById("story-map-close"),
    storyMapLines: document.getElementById("story-map-lines"),
    storyMapNodes: document.getElementById("story-map-nodes"),
    storyDock: document.getElementById("story-dock"),
    storyFontWeightBtn: document.getElementById("story-font-weight-btn"),
    storyInfoBtn: document.getElementById("story-info-btn"),
    storyMenuBtn: document.getElementById("story-menu-btn"),
    storyInfoPanel: document.getElementById("story-info-panel"),
    storyHeroInfo: document.getElementById("story-hero-info"),
    storyInfoClose: document.getElementById("story-info-close"),
    storyMenuPanel: document.getElementById("story-menu-panel"),
    storyMenuClose: document.getElementById("story-menu-close"),
    startTraitPanel: document.getElementById("start-trait-panel"),
    startTraitChoices: document.getElementById("start-trait-choices")
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
    { id: "red_flame_shard", name: "기초 화염탄", color: "red", circle: 1, manaCost: 1, cooldown: 1.0, effects: [{ type: "damage", value: 1 }, { type: "dot", value: 1, duration: 1 }], notes: "초반 기본 공격 주문" },
    { id: "red_ignite", name: "연소", color: "red", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "dot", value: 1, duration: 2 }], notes: "2초 도트" },
    { id: "red_lunge", name: "급습", color: "red", circle: 1, manaCost: 1, cooldown: 1.5, effects: [{ type: "damage", value: 2 }, { type: "dot", value: 1, duration: 1 }], notes: "개시 압박 + 점화" },
    { id: "red_heat_stock", name: "기초 마력집중", color: "red", circle: 1, manaCost: 0, cooldown: 2.0, effects: [{ type: "manaGain", value: 1 }], notes: "초반 기본 충전 주문" },
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
    { id: "green_natural_recover", name: "자연 회복", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "heal", value: 1 }, { type: "regen", value: 1, duration: 2 }], linkSynergy: [{ neighborColor: "green", effect: "self_heal", scale: 1 }], notes: "기본 회복 + 재생 (인접 녹색당 추가 치유)" },
    { id: "green_life_breath", name: "생명의 숨결", color: "green", circle: 1, manaCost: 0, cooldown: 3.0, effects: [{ type: "manaGain", value: 1 }, { type: "manaFlow", value: 1, duration: 3 }], notes: "지속 충전" },
    { id: "green_absorb", name: "흡수", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "damage", value: 1 }, { type: "heal", value: 1 }, { type: "dot", value: 1, duration: 2 }], notes: "흡혈 + 독성 침식" },
    { id: "green_guard_bud", name: "보호의 싹", color: "green", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "shield", value: 1 }], linkSynergy: [{ neighborColor: "green", effect: "self_regen", scale: 1, duration: 5 }], notes: "기초 보호막 (인접 녹색 연계 재생)" },
    { id: "green_brutal_branch", name: "난타 덩굴", color: "green", circle: 1, manaCost: 1, cooldown: 1.9, effects: [{ type: "damage", value: 2 }], notes: "순수 타격" },
    { id: "green_venom_seed", name: "맹독 씨앗", color: "green", circle: 1, manaCost: 1, cooldown: 2.8, effects: [{ type: "dot", value: 1, duration: 3 }], linkSynergy: [{ neighborColor: "green", effect: "enemy_poison", scale: 1, duration: 3, dps: 1 }], notes: "중독 씨앗 부여 (인접 녹색당 독성 강화)" },
    { id: "green_life_curtain", name: "생명의 장막", color: "green", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "shield", value: 3 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 1 }], notes: "보호막 유지 시 마나 +1" },
    { id: "green_cycle_boost", name: "순환 강화", color: "green", circle: 2, manaCost: 2, cooldown: 4.0, effects: [{ type: "manaGain", value: 1 }, { type: "regen", value: 1, duration: 3 }], linkSynergy: [{ neighborColor: "green", effect: "self_mana", scale: 1 }], notes: "역전 충전 + 재생 (인접 녹색당 마나 추가)" },
    { id: "green_regrowth", name: "재생", color: "green", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "regen", value: 1, duration: 4 }], notes: "초당 체력 회복" },
    { id: "green_moss_grasp", name: "이끼 속박", color: "green", circle: 2, manaCost: 2, cooldown: 3.6, effects: [{ type: "dot", value: 2, duration: 2 }], notes: "짧은 중독 속박" },
    { id: "green_thorn_barrage", name: "가시 탄막", color: "green", circle: 3, manaCost: 3, cooldown: 4.3, effects: [{ type: "damage", value: 4 }, { type: "dot", value: 1, duration: 2 }], notes: "강한 단일 피해 + 독가시" },
    { id: "green_bark_skin", name: "수피 갑주", color: "green", circle: 2, manaCost: 2, cooldown: 3.4, effects: [{ type: "shield", value: 2 }, { type: "regen", value: 1, duration: 3 }], notes: "중형 보호막 + 재생" },
    { id: "green_thorn_ward", name: "가시 수호", color: "green", circle: 3, manaCost: 3, cooldown: 4.6, effects: [{ type: "shield", value: 4 }, { type: "dot", value: 1, duration: 3 }], notes: "강한 보호막 + 독성 역장" },
    { id: "green_cycle_oath", name: "순환의 맹세", color: "green", circle: 3, manaCost: 3, cooldown: 5.0, effects: [{ type: "shield", value: 3 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 1 }], notes: "위기 반전 + 순환 회수" },
    { id: "green_life_transfer", name: "생명 전이", color: "green", circle: 3, manaCost: 3, cooldown: 4.0, effects: [{ type: "damage", value: 2 }, { type: "heal", value: 2 }], notes: "공수 전환" },
    { id: "green_earth_guard", name: "대지의 가호", color: "green", circle: 4, manaCost: 4, cooldown: 6.0, effects: [{ type: "shield", value: 5 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 2 }], notes: "대형 방어 + 마나 순환" },
    { id: "green_life_return", name: "생명의 귀환", color: "green", circle: 5, manaCost: 5, cooldown: 8.0, effects: [{ type: "heal", value: 5 }, { type: "manaGain", value: 2 }], notes: "대회복" },
    { id: "yellow_clay_guard", name: "황토 장벽", color: "yellow", circle: 1, manaCost: 1, cooldown: 2.1, effects: [{ type: "shield", value: 2 }], notes: "기본 방어벽 전개" },
    { id: "yellow_stone_lance", name: "암석 창", color: "yellow", circle: 1, manaCost: 1, cooldown: 2.0, effects: [{ type: "damage", value: 2 }], notes: "단일 관통 타격" },
    { id: "yellow_rampart", name: "지층 방벽", color: "yellow", circle: 2, manaCost: 2, cooldown: 3.2, effects: [{ type: "shield", value: 3 }, { type: "manaOnCondition", condition: "selfShieldPositive", value: 1 }], notes: "방어 유지 시 마나 회수" },
    { id: "yellow_gear_forge", name: "구성 연성", color: "yellow", circle: 2, manaCost: 2, cooldown: 3.5, effects: [{ type: "damage", value: 2 }, { type: "manaGain", value: 1 }], notes: "타격과 동시 구성 마력 회수" },
    { id: "yellow_earthbind", name: "대지 결박", color: "yellow", circle: 3, manaCost: 3, cooldown: 4.7, effects: [{ type: "damage", value: 3 }, { type: "status", id: "petrify", stacks: 1, duration: 2.5, slowPct: 32, cooldownRate: 0.66 }], notes: "석화로 행동을 크게 늦춤" },
    { id: "white_ray_pierce", name: "광휘 관통", color: "white", circle: 1, manaCost: 1, cooldown: 1.9, effects: [{ type: "damage", value: 2 }], notes: "빛의 직선 타격" },
    { id: "white_mana_trace", name: "마력 추적", color: "white", circle: 1, manaCost: 1, cooldown: 2.2, effects: [{ type: "manaGain", value: 1 }, { type: "status", id: "weak", stacks: 1, duration: 2, vulnPct: 10 }], notes: "마력 감지로 약점 노출" },
    { id: "white_prism_shield", name: "프리즘 방호", color: "white", circle: 2, manaCost: 2, cooldown: 3.0, effects: [{ type: "shield", value: 2 }, { type: "heal", value: 1 }], notes: "방어 + 미약한 치유" },
    { id: "white_purify_wave", name: "정화 파동", color: "white", circle: 3, manaCost: 3, cooldown: 4.8, effects: [{ type: "damage", value: 3 }, { type: "status", id: "blind", stacks: 1, duration: 2.4, damageOutMul: 0.75 }], notes: "적 위력을 낮추는 광역 정화광" },
    { id: "white_time_fold", name: "시공 접힘", color: "white", circle: 4, manaCost: 4, cooldown: 6.6, effects: [{ type: "manaGain", value: 2 }, { type: "status", id: "freeze", stacks: 1, duration: 1.4 }], notes: "짧은 시공 정지 + 자원 회수" },
    { id: "black_shadow_bite", name: "그림자 이빨", color: "black", circle: 1, manaCost: 1, cooldown: 1.8, effects: [{ type: "damage", value: 2 }, { type: "dot", value: 1, duration: 2 }], notes: "기본 침식 타격" },
    { id: "black_hex_mark", name: "오염 각인", color: "black", circle: 2, manaCost: 2, cooldown: 3.4, effects: [{ type: "status", id: "weak", stacks: 1, duration: 3, vulnPct: 18 }, { type: "manaOnEvent", event: "onDamageDealt", value: 1 }], notes: "저주 표식 + 연계 회수" },
    { id: "black_mind_haze", name: "혼탁 장막", color: "black", circle: 2, manaCost: 2, cooldown: 3.8, effects: [{ type: "status", id: "confuse", stacks: 1, duration: 2.6, miscastChance: 0.35 }], notes: "혼란으로 시전 실패 유도" },
    { id: "black_puppet_string", name: "사령 인형실", color: "black", circle: 3, manaCost: 3, cooldown: 5.2, effects: [{ type: "damage", value: 3 }, { type: "manaReduce", value: 1 }, { type: "status", id: "confuse", stacks: 1, duration: 2.2, miscastChance: 0.3 }], notes: "정신 교란 + 마나 침식" },
    { id: "black_night_requiem", name: "흑야 진혼", color: "black", circle: 5, manaCost: 5, cooldown: 8.4, effects: [{ type: "damage", value: 6 }, { type: "dot", value: 2, duration: 3 }, { type: "manaOnCondition", condition: "selfManaLow", value: 2 }], notes: "고위 흑마법 피니시" }
  ];

  function deriveLinkSynergy(v2) {
    if (Array.isArray(v2.linkSynergy) && v2.linkSynergy.length > 0) {
      return v2.linkSynergy.map((rule) => ({ ...rule }));
    }
    const hasType = (type) => (Array.isArray(v2.effects) && v2.effects.some((e) => e.type === type));
    const color = v2.color;
    const circle = Math.max(1, Math.floor(v2.circle || 1));

    if (color === "green") {
      if (hasType("dot")) return [{ neighborColor: "green", effect: "enemy_poison", scale: 1, duration: 3, dps: 1 }];
      if (hasType("manaGain") || hasType("manaOnCondition")) return [{ neighborColor: "green", effect: "self_mana", scale: 1 }];
      if (hasType("heal") || hasType("regen")) return [{ neighborColor: "green", effect: "self_heal", scale: 1 }];
      return [{ neighborColor: "green", effect: "self_regen", scale: 1, duration: 5 }];
    }
    if (color === "blue") {
      if (hasType("silence") || hasType("frostSlow")) {
        return [{ neighborColor: "blue", effect: "enemy_slow", scale: 1, duration: 2 + (circle >= 3 ? 1 : 0), slowPct: 9 + (circle * 2), cooldownRate: Math.max(0.72, 0.96 - (circle * 0.04)) }];
      }
      return [{ neighborColor: "blue", effect: "self_mana", scale: 1 }];
    }
    if (color === "red") {
      return [{ neighborColor: "red", effect: "enemy_burn", scale: circle >= 3 ? 2 : 1, duration: 2 + (circle >= 3 ? 1 : 0), dps: 1 }];
    }
    if (color === "yellow") {
      if (hasType("status")) {
        return [{ neighborColor: "yellow", effect: "enemy_petrify", scale: 1, duration: 2.5, slowPct: 30, cooldownRate: 0.72 }];
      }
      return [{ neighborColor: "yellow", effect: "self_shield", scale: 1 + Math.floor(circle / 3) }];
    }
    if (color === "white") {
      return [{ neighborColor: "white", effect: "enemy_blind", scale: 1, duration: 2 + (circle >= 4 ? 1 : 0), damageOutMul: Math.max(0.65, 0.86 - (circle * 0.03)) }];
    }
    if (color === "black") {
      if (hasType("manaReduce") || hasType("manaDelete")) {
        return [{ neighborColor: "black", effect: "enemy_mana_burn", scale: 1 + Math.floor(circle / 2) }];
      }
      return [{ neighborColor: "black", effect: "enemy_confuse", scale: 1, duration: 2 + (circle >= 4 ? 1 : 0), miscastChance: Math.min(0.45, 0.2 + (circle * 0.04)) }];
    }
    return [];
  }

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
    const statusEff = v2.effects.find((e) => e.type === "status");
    const selfStatusEff = v2.effects.find((e) => e.type === "selfStatus");
    const archetypeByColor = {
      red: "속공",
      blue: "제어",
      green: "생존",
      yellow: "방어/구성",
      white: "정화/시공",
      black: "침식/교란"
    };
    const archetype = archetypeByColor[v2.color] || "복합";
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
    const linkSynergy = deriveLinkSynergy(v2);
    if (linkSynergy.length > 0) runtime.linkSynergy = linkSynergy;
    if (healValue > 0) runtime.heal = [healValue, healValue];
    if (shieldValue > 0) runtime.shield = shieldValue;
    if (manaGain > 0) runtime.mpRestore = [manaGain, manaGain];
    if (manaOnEvent) runtime.manaOnEvent = { event: manaOnEvent.event, value: manaOnEvent.value || 1 };
    if (manaOnCondition) runtime.manaOnCondition = { condition: manaOnCondition.condition, value: manaOnCondition.value || 1 };
    if (manaBurn > 0) runtime.enemyMpBurn = [manaBurn, manaBurn];
    if (dot) {
      runtime.applyEnemyStatus = (v2.color === "green" || v2.color === "black")
        ? { id: "poison", stacks: 1, duration: dot.duration || 2, dps: dot.value || 1, decayPerTick: 1 }
        : { id: "burn", stacks: 1, duration: dot.duration || 2, dps: dot.value || 1, stackDecayOnHealthHit: 1 };
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
    if (statusEff && statusEff.id) {
      runtime.applyEnemyStatus = {
        id: statusEff.id,
        stacks: statusEff.stacks || 1,
        duration: statusEff.duration || 2,
        slowPct: statusEff.slowPct,
        cooldownRate: statusEff.cooldownRate,
        vulnPct: statusEff.vulnPct,
        damageOutMul: statusEff.damageOutMul,
        miscastChance: statusEff.miscastChance
      };
    }
    if (selfStatusEff && selfStatusEff.id) {
      runtime.applySelfStatus = {
        id: selfStatusEff.id,
        stacks: selfStatusEff.stacks || 1,
        duration: selfStatusEff.duration || 2,
        reduction: selfStatusEff.reduction,
        healPerTick: selfStatusEff.healPerTick,
        manaPerTick: selfStatusEff.manaPerTick
      };
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
          enemyLoadout: ["black_shadow_bite", "blue_frost_poke", "green_absorb", "red_heat_stock", "black_mind_haze", "green_life_breath"]
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
          enemyLoadout: ["green_guard_bud", "green_natural_recover", "blue_chill_condense", "green_venom_seed", "green_life_breath", "blue_analyze"]
        }
      ]
    },
    hermit_druid: {
      id: "hermit_druid",
      name: "은거한 드루이드",
      portrait: "assets/적/enemy_serion_v2.png",
      phaseDefs: [
        {
          id: 1,
          name: "맥동하는 숲",
          title: "은거한 드루이드 - 맥동하는 숲",
          quote: "숲의 심장은 멈추지 않는다. 네 숨이 먼저 끊길 뿐.",
          maxHp: 34,
          coreId: "core_grimoire_plus",
          enemyMaxMp: 14,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath", "green_cycle_boost", "green_regrowth", "green_bark_skin", "green_venom_seed", "green_thorn_barrage"]
        },
        {
          id: 2,
          name: "태초의 나무",
          title: "은거한 드루이드 - 태초의 나무",
          quote: "뿌리는 땅 아래에서 이미 네 패배를 끝냈다.",
          maxHp: 36,
          coreId: "core_frozen_staff",
          enemyMaxMp: 15,
          enemyManaRegen: 0,
          enemyLoadout: ["green_guard_bud", "green_life_curtain", "green_thorn_ward", "green_earth_guard", "green_natural_recover", "green_life_return"]
        },
        {
          id: 3,
          name: "영원한 순환",
          title: "은거한 드루이드 - 영원한 순환",
          quote: "끝은 시작이 되고, 상처는 다시 힘이 된다.",
          maxHp: 38,
          coreId: "core_morellonomicon",
          enemyMaxMp: 16,
          enemyManaRegen: 0,
          enemyLoadout: ["green_life_breath", "green_cycle_boost", "green_cycle_oath", "green_life_transfer", "green_regrowth", "green_life_return"]
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
          enemyLoadout: ["red_ignite", "blue_suppress", "green_absorb", "red_blast_chain", "red_heat_stock", "blue_chill_condense", "green_life_breath"]
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
          enemyLoadout: ["black_shadow_bite", "red_quick_slash", "black_hex_mark", "blue_analyze", "red_heat_stock", "black_puppet_string"]
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
          enemyLoadout: ["yellow_stone_lance", "yellow_clay_guard", "red_flame_shard", "blue_frost_poke", "yellow_rampart", "red_heat_stock", "green_life_breath"]
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
          enemyLoadout: ["yellow_earthbind", "red_quick_slash", "red_blast_chain", "blue_mana_seal", "yellow_gear_forge", "red_full_focus", "yellow_rampart"]
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
          enemyLoadout: ["red_heat_stock", "blue_chill_condense", "yellow_gear_forge", "red_overheat_cycle", "red_flame_shard", "white_mana_trace", "red_blast_chain", "black_hex_mark"]
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
          enemyLoadout: ["red_heat_stock", "white_prism_shield", "green_life_breath", "blue_analyze", "red_overheat_cycle", "white_purify_wave", "blue_freeze_bind", "blue_mana_seal", "blue_stop_order"]
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
          enemyLoadout: ["red_heat_stock", "red_overheat_cycle", "black_night_requiem", "green_cycle_boost", "green_guard_bud", "green_life_curtain", "black_mind_haze", "green_earth_guard"]
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
          enemyLoadout: ["blue_chill_condense", "white_mana_trace", "blue_frost_poke", "blue_ice_barrier", "blue_freeze_bind", "white_purify_wave", "blue_mana_seal"]
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
          enemyLoadout: ["blue_chill_condense", "white_time_fold", "blue_frost_poke", "white_prism_shield", "blue_freeze_bind", "blue_flow_block", "blue_mana_seal", "red_full_focus"]
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
          enemyLoadout: ["blue_chill_condense", "white_time_fold", "green_life_breath", "white_prism_shield", "blue_freeze_bind", "blue_flow_block", "blue_time_dilate", "blue_stop_order", "blue_time_freeze"]
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
          enemyLoadout: ["green_life_breath", "blue_chill_condense", "green_cycle_boost", "green_bark_skin", "green_life_curtain", "green_regrowth", "green_life_transfer", "green_earth_guard"]
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
          enemyLoadout: ["green_life_breath", "yellow_rampart", "red_heat_stock", "green_cycle_boost", "green_bark_skin", "yellow_earthbind", "green_life_curtain", "green_cycle_oath", "green_life_return", "blue_time_freeze", "red_collapse_flare"]
        }
      ]
    }
  };

  const ENEMY_FORMULA_PRESENTATION = {
    "hunter:1": {
      name: "수렵자의 화선",
      ment: "도망치는 순간, 화살보다 빠른 불씨가 너를 꿰뚫는다.",
      tip: "짧은 쿨다운으로 압박하는 선제형 술식입니다. 초반 마나 흐름을 안정시키세요."
    },
    "lesser_spirit:1": {
      name: "숲의 잔향",
      ment: "낯선 숨결은 숲의 맥동에 잠겨 천천히 사라진다.",
      tip: "회복과 완만한 유지력이 강합니다. 단기 폭딜보다 지속 압박이 유효합니다."
    },
    "road_wraith:1": {
      name: "망각 포식",
      ment: "길 위의 흔적은 모두 먹이가 된다. 너의 기억도 예외는 아니다.",
      tip: "3색 혼합 압박으로 변수를 만듭니다. 상태이상 누적을 초반에 끊어내세요."
    },
    "forest_watcher:1": {
      name: "수림 감시 결계",
      ment: "숲이 눈을 뜨면, 침입자의 시간은 느려진다.",
      tip: "방어와 둔화가 결합된 안정형 술식입니다. 쿨다운 지연 관리가 핵심입니다."
    },
    "hermit_druid:1": {
      name: "맥동하는 숲",
      ment: "숲의 심장은 멈추지 않는다. 네 숨이 먼저 끊길 뿐.",
      tip: "초반에 약해 보여도 회복/보호막 루프가 붙으면 급격히 단단해집니다."
    },
    "hermit_druid:2": {
      name: "태초의 나무",
      ment: "뿌리는 땅 아래에서 이미 네 패배를 끝냈다.",
      tip: "고내구 수비형 술식입니다. 폭딜 타이밍을 놓치면 내구도 격차가 크게 벌어집니다."
    },
    "hermit_druid:3": {
      name: "영원한 순환",
      ment: "끝은 시작이 되고, 상처는 다시 힘이 된다.",
      tip: "장기전 지배형 술식입니다. 마나 순환이 붙기 전에 전투를 끝내야 합니다."
    },
    "seal_husk:1": {
      name: "파열 봉인식",
      ment: "봉인이 깨진 틈으로 타인의 마력을 흡입한다.",
      tip: "연소, 억제, 흡수 연계가 위협적입니다. 마나 고갈을 먼저 방지하세요."
    },
    "bounty_hunter:1": {
      name: "현상 집행식",
      ment: "살아서 끌고 가든, 여기서 끝내든 값은 같다.",
      tip: "급습형 고타점이 들어옵니다. 초반 보호막 또는 제어기로 템포를 뺏으세요."
    },
    "inn_raider:1": {
      name: "포위망 전개",
      ment: "도망칠 문은 없다. 여기는 이미 우리 전장이다.",
      tip: "다수 저서클 주문으로 공백 없이 압박합니다. 회전률을 늦추는 대응이 좋습니다."
    },
    "inn_raider:2": {
      name: "추적자 집행",
      ment: "표식이 찍힌 순간부터 네 숨은 끝까지 계산된다.",
      tip: "고화력 연계가 시작됩니다. 핵심 스킬 타이밍에 방어 자원을 남겨두세요."
    },
    "allen:1": {
      name: "홍염 예열식",
      ment: "불꽃은 거짓말을 하지 않는다. 타오르는 쪽이 진실이다.",
      tip: "연소 누적이 빠르게 쌓입니다. 해제/완화 수단을 초반부터 준비하세요."
    },
    "allen:2": {
      name: "폭주 전이식",
      ment: "고열과 냉각의 경계가 무너질 때, 넌 대응할 틈을 잃는다.",
      tip: "적색 화력 + 청색 제어 복합형입니다. 동결 타이밍에 핵심기를 아끼세요."
    },
    "allen:3": {
      name: "푸르가토리움 잔광",
      ment: "재가 되지 못한 불은 끝내 영혼을 붙잡고 남는다.",
      tip: "장기전에 강한 후반 술식입니다. 마나하트 소모와 내구도 회복 계획이 중요합니다."
    },
    "dalahans:1": {
      name: "심연의 서리",
      ment: "네가 알고 있던 모든 것보다도 깊은 추위를 맞이하라.",
      tip: "지속 둔화와 동결을 잘 관리해야 합니다. 쿨다운이 꼬이면 그대로 밀립니다."
    },
    "dalahans:2": {
      name: "빙결 연산진",
      ment: "모든 경우의 수를 얼렸다. 남은 답은 정지뿐이다.",
      tip: "제어 성공 시 마나 격차가 벌어집니다. 무리한 난사보다 타이밍 교환이 핵심입니다."
    },
    "dalahans:3": {
      name: "절대영도 재귀식",
      ment: "끝없는 냉각의 고리 안에서 네 의지는 반복 소거된다.",
      tip: "후반 동결 연쇄가 매우 강합니다. 제어 저항 상태를 유지하며 짧게 끝내세요."
    },
    "serion:1": {
      name: "심록 발아식",
      ment: "연약한 싹처럼 보여도, 뿌리는 이미 네 발밑에 닿았다.",
      tip: "회복과 보호막이 동시에 굴러갑니다. 단일 큰 타격보다 누적 차단이 효율적입니다."
    },
    "serion:2": {
      name: "덩굴 포위진",
      ment: "숲은 도망치는 등을 가장 먼저 붙잡는다.",
      tip: "생존 루프가 완성되는 구간입니다. 치유 사이클을 끊을 제어기가 필요합니다."
    },
    "serion:3": {
      name: "거목 회수령",
      ment: "모든 생장은 회수된다. 네 힘도, 네 숨도.",
      tip: "고내구 + 제어 + 마무리 화력이 결합됩니다. 전투 마나를 아껴 폭딜 구간을 만드세요."
    }
  };

  const ENEMY_BESTIARY = {
    hunter: {
      role: "초반 추적형",
      temperament: "신중한 단일 표적 사냥",
      weak: "선공 방어, 짧은 제어",
      danger: "초반 2턴",
      pattern: "표식 -> 단타 마무리",
      tip: "첫 압박만 넘기면 화력이 급격히 줄어든다.",
      intel: ["정면 교전보다 각을 본 뒤 찌르는 타입", "방어가 빠진 턴을 정확히 노린다"],
      voice: {
        opening: ["발걸음이 가볍다. 사냥감은 늘 그렇게 시작하지.", "한 번만 빈틈을 주면 끝이다."],
        control: ["시야를 먼저 끊겠다.", "움직임부터 봉쇄한다."],
        recover: ["호흡을 정리한다.", "자세를 다시 잡는다."],
        burst: ["지금 베어낸다.", "여기서 끝낸다."],
        basic: ["거리 계산은 끝났다.", "짧게 끝내자."]
      }
    },
    lesser_spirit: {
      role: "유지/회복형",
      temperament: "완만한 압박과 복원",
      weak: "지속 피해, 치유 차단",
      danger: "장기전 4턴 이후",
      pattern: "회복 유지 -> 맥동 누적",
      tip: "짧은 폭딜보다 지속 피해 누적이 효율적이다.",
      intel: ["피해량은 낮지만 턴이 길어질수록 불리해진다", "정화 타이밍을 잃으면 전열이 무너진다"],
      voice: {
        opening: ["낯선 숨결… 숲이 거부한다.", "맥동은 네 맥을 따라온다."],
        control: ["맥동이 네 박자를 빼앗는다.", "네 흐름을 틀어쥔다."],
        recover: ["숲의 기운을 되감는다.", "생장의 결이 이어진다."],
        burst: ["잔향이 한꺼번에 덮친다.", "뒤늦게 오는 통증을 견뎌라."],
        basic: ["서서히 잠식한다.", "숨결이 무거워질 거다."]
      }
    },
    road_wraith: {
      role: "교란 혼합형",
      temperament: "다색 교란, 예측 불가",
      weak: "디버프 해제, 안정적인 MP 운영",
      danger: "상태이상 누적 직후",
      pattern: "교란 부여 -> 틈새 화력",
      tip: "상태이상을 먼저 끊고 한 색상으로 템포를 고정해라.",
      intel: ["순간 폭딜은 낮지만 교란이 쌓이면 선택지가 붕괴한다", "혼란/둔화가 겹치면 대응이 크게 늦어진다"],
      voice: {
        opening: ["길 위의 흔적은 모두 내 것이다.", "기억부터 흐릿하게 만들지."],
        control: ["판단을 흐려주마.", "네 순서를 비틀어놓겠다."],
        recover: ["흩어진 잔재를 모은다.", "깨진 리듬을 다시 엮는다."],
        burst: ["흐려진 틈으로 찢는다.", "지금 네 흔적을 삼킨다."],
        basic: ["방향 감각을 잃겠군.", "이미 늦었다."]
      }
    },
    forest_watcher: {
      role: "둔화 감시형",
      temperament: "진입 차단, 시간 지연",
      weak: "짧은 쿨 주문, 즉응 제어",
      danger: "행동 속도 저하 상태",
      pattern: "둔화 누적 -> 안전한 압박",
      tip: "긴 쿨 주문 위주면 손해가 누적된다. 짧고 자주 대응해라.",
      intel: ["피해보다 템포 손해를 강요하는 적", "행동 지연을 방치하면 역전이 어렵다"],
      voice: {
        opening: ["숲의 시선에서 벗어날 순 없다.", "침입자는 느려진다."],
        control: ["시간을 잡아당긴다.", "발걸음을 묶어둔다."],
        recover: ["결계를 재정렬한다.", "경계선을 다시 긋는다."],
        burst: ["정지한 틈을 찌른다.", "움직이지 못할 때 끝낸다."],
        basic: ["여긴 네 속도가 통하지 않는다.", "서두를수록 늦어진다."]
      }
    },
    hermit_druid: {
      role: "장기전 순환형",
      temperament: "재생 루프 중심",
      weak: "회복 타이밍 차단, 압축 화력",
      danger: "재생 버프 활성 턴",
      pattern: "회복 순환 -> 보호막 -> 역공",
      tip: "재생 루프가 완성되기 전, 회복 타이밍을 제어기로 끊어라.",
      intel: ["안정화되면 체감 난이도가 급상승한다", "중독/화상보다 회복 차단이 더 크게 먹힌다"],
      voice: {
        opening: ["숲의 숨이 네 숨보다 길다.", "뿌리가 이미 네 발밑을 감쌌다."],
        control: ["덩굴이 손발을 고정한다.", "순환 바깥으로 밀어내겠다."],
        recover: ["생장은 멈추지 않는다.", "상처는 곧 비료가 된다."],
        burst: ["거목의 숨결을 받아라.", "되돌린 힘으로 짓누른다."],
        basic: ["네 박자는 숲과 맞지 않는다.", "천천히 꺾어주지."]
      }
    },
    seal_husk: {
      role: "봉인 누출형",
      temperament: "불안정한 폭발과 흡수",
      weak: "마나 압박, 회복 동작 차단",
      danger: "MP 확보 직후",
      pattern: "누출 충전 -> 파열 타격",
      tip: "회복 동작을 끊으면 위협이 급감한다.",
      intel: ["패턴은 단순하지만 한 번 터지면 피해가 크다", "연속 행동을 허용하지 않는 것이 핵심"],
      voice: {
        opening: ["봉인이 찢어진다…", "새어 나오는 힘이 널 삼킨다."],
        control: ["균열이 네 몸을 붙든다.", "파편이 발목을 잠근다."],
        recover: ["누출된 힘을 주워 담는다.", "파열 직전까지 끌어올린다."],
        burst: ["지금 터뜨린다.", "파열파를 받아라."],
        basic: ["해방… 해방…", "균열이 커진다."]
      }
    },
    bounty_hunter: {
      role: "급습 처형형",
      temperament: "순간 처형, 빈틈 응징",
      weak: "선공 방어, 보호막 유지",
      danger: "턴 시작 직후",
      pattern: "견제 -> 처형 일격",
      tip: "초반 처형 콤보만 막으면 전투가 안정된다.",
      intel: ["행동 하나의 가치가 높은 타입", "HP가 낮을수록 처형 우선도가 올라간다"],
      voice: {
        opening: ["현상금은 도망친 자가 아니라 쓰러진 자의 이름이다.", "살아서 넘길 생각은 없다."],
        control: ["도주 경로부터 지운다.", "움직임을 끊겠다."],
        recover: ["손익 계산은 끝났다.", "칼끝을 다시 세운다."],
        burst: ["값을 치르게 해주지.", "목표를 집행한다."],
        basic: ["숨 고를 틈은 없다.", "사냥은 지금부터다."]
      }
    },
    inn_raider: {
      role: "다중 압박형",
      temperament: "연계 중심 집단전",
      weak: "연계 차단, 방어적 선턴",
      danger: "행동 연쇄 2회 이후",
      pattern: "포위 구축 -> 동시 압박",
      tip: "짧은 제어기로 연쇄를 끊어야 누적 손실을 막을 수 있다.",
      intel: ["개별 화력은 낮지만 연계가 붙으면 급격히 세진다", "MP를 나눠 쓰게 강제하는 패턴"],
      voice: {
        opening: ["진형 짜라. 도망칠 구멍은 막는다.", "좋게 끝낼 생각은 없다."],
        control: ["포위망을 닫는다.", "퇴로를 먼저 잘라낸다."],
        recover: ["진형을 다시 세운다.", "줄이 흐트러졌다. 재정렬한다."],
        burst: ["동시에 눌러라!", "지금 밀어붙인다."],
        basic: ["빈틈을 찔러라.", "줄 맞춰, 천천히 조인다."]
      }
    },
    allen: {
      role: "고화력 복합 보스",
      temperament: "화력/제어 혼합, 후반 폭주",
      weak: "타이밍 방어, 고위력기 회피",
      danger: "페이즈 전환 직후",
      pattern: "예열 -> 과열 폭발 -> 제어 혼합",
      tip: "과열 턴에 방어 자원, 냉각 턴에 공격 자원을 배분해라.",
      intel: ["페이즈가 오를수록 상태이상과 화력이 동시에 강해진다", "욕심낸 공격 턴이 그대로 패배 턴이 된다"],
      voice: {
        opening: ["불꽃은 거짓말을 하지 않는다. 네가 약할 뿐이다.", "버텨봐라. 어디까지 견디는지 보겠다."],
        control: ["네 선택지를 지워주마.", "타이밍을 빼앗아주지."],
        recover: ["열을 다시 끌어올린다.", "아직 끝나지 않았다."],
        burst: ["홍염이 전부 삼킨다.", "재만 남겨주마."],
        basic: ["그 정도냐?", "더 뜨거워질 거다."]
      }
    },
    dalahans: {
      role: "제어 특화 보스",
      temperament: "동결-봉쇄 연산형",
      weak: "제어 저항, 짧은 폭딜 턴",
      danger: "동결/정지 부여 직후",
      pattern: "속도 저하 -> 행동 봉쇄 -> 마무리",
      tip: "동결 연쇄 전에 짧은 창에 화력을 몰아넣어라.",
      intel: ["피해량보다 행동 불능 유도가 핵심", "정화/저항 수단 유무가 승패를 가른다"],
      voice: {
        opening: ["호흡을 얼려주지. 한 걸음도 더 못 간다.", "정지. 그게 네 결말이다."],
        control: ["연산값: 구속.", "움직임을 0으로 만든다."],
        recover: ["냉각 연산을 재개한다.", "오차를 보정한다."],
        burst: ["절대영도로 가라앉아라.", "정지한 틈에서 산산이 깨져라."],
        basic: ["느려졌다.", "다음 수는 이미 봉인됐다."]
      }
    },
    serion: {
      role: "회복/덩굴 보스",
      temperament: "회복 루프와 공간 통제",
      weak: "재생 끊기, 회복 턴 집중 타격",
      danger: "보호막+재생 동시 활성",
      pattern: "생장 준비 -> 덩굴 봉쇄 -> 거목 일격",
      tip: "회복이 시작되는 턴에 제어기를 맞추면 전황을 크게 꺾을 수 있다.",
      intel: ["한 번 굴러가기 시작하면 체감 체력이 급증한다", "광역 압박보다 핵심 타이밍 차단이 중요하다"],
      voice: {
        opening: ["싹은 약해 보여도 뿌리는 깊다.", "도망칠 길은 없다. 숲은 이미 널 감쌌다."],
        control: ["덩굴이 네 동선을 삼킨다.", "뿌리가 발목을 고정한다."],
        recover: ["생장은 멈추지 않는다.", "상처를 거두어 새살로 바꾼다."],
        burst: ["거목의 심판을 받아라.", "되감은 생명력이 널 짓누른다."],
        basic: ["싹은 다시 오른다.", "끝난 줄 알았나?"]
      }
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
    if (spell.linkSynergy) cloned.linkSynergy = spell.linkSynergy.map((rule) => ({ ...rule }));
    enemySpellLibrary[cloned.id] = cloned;
  });

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
  const PROGRESS_RESET_VERSION = 4;
  const RESET_ALL_PROGRESS_ON_EACH_BOOT = false;
  const RESET_RUN_SPELL_PROGRESS_ON_BOOT = false;
  const PLAYER_SPELL_DAMAGE_MULT = 1.45;
  const BASE_PLAYER_MAX_MP = 100;
  const BASE_PLAYER_DAMAGE_BONUS = 0.18;
  const TURN_BASED_COMBAT = true;
  const TURN_BASED_BASE_MP_RECOVERY = 1;
  const PLAYER_BASE_HP = 100;
  const PLAYER_BASE_MP = 100;
  const MANA_OVERDRIVE_TRIGGER_SEC = 40;
  const MANA_OVERDRIVE_SCALE_INTERVAL_SEC = 2;
  const ACT1_SCENE_SEED_STORAGE_KEY = "fanta_act1_scene_seed_v1";
  const BURN_DOT_MULTIPLIER = 0.55;
  const FRAME_STYLE_OPTIONS = [
    { id: "engraved", label: "각인" },
    { id: "rune", label: "룬석" },
    { id: "inlay", label: "인레이" }
  ];
  const FONT_WEIGHT_OPTIONS = [
    { id: 1, label: "1", uiWeight: 300, titleWeight: 500 },
    { id: 2, label: "2", uiWeight: 400, titleWeight: 600 },
    { id: 3, label: "3", uiWeight: 450, titleWeight: 650 },
    { id: 4, label: "4", uiWeight: 500, titleWeight: 700 },
    { id: 5, label: "5", uiWeight: 600, titleWeight: 800 },
    { id: 6, label: "6", uiWeight: 700, titleWeight: 900 }
  ];
  const STORY_REVEAL_SPEED_OPTIONS = [1, 2, 4];
  const STARTER_SPELL_IDS = [
    "red_flame_shard",
    "red_heat_stock"
  ];
  const DEFAULT_PLAYER_SPELL_SLOTS = ["red_flame_shard", "red_heat_stock"];
  const DEFAULT_CORE_ID = "core_balanced";
  const DEFAULT_CORE_DURABILITY = 50;
  const CORE_LIBRARY = {
    core_balanced: {
      id: "core_balanced",
      name: "낡은 마도서",
      rarity: "common",
      manaRegenPerSec: 1,
      durability: 50,
      cols: 3,
      rows: 3,
      blocked: [],
      passive: { type: "opening_mana", value: 1, text: "[일반] 전투 시작 시 마나 +1" }
    },
    core_lance: {
      id: "core_lance",
      name: "빛바랜 오브",
      rarity: "common",
      manaRegenPerSec: 2,
      durability: 50,
      cols: 4,
      rows: 4,
      blocked: [[0, 0], [2, 0], [3, 0], [3, 1], [0, 2], [0, 3], [1, 3], [3, 3]],
      passive: { type: "cycle_mana", every: 2, value: 2, text: "[일반] 주문 2회 발동마다 마나 +2" }
    },
    core_bastion: {
      id: "core_bastion",
      name: "고목나무 지팡이",
      rarity: "common",
      manaRegenPerSec: 1,
      durability: 52,
      cols: 2,
      rows: 4,
      blocked: [],
      passive: { type: "high_circle_power", minCircle: 2, bonusDamage: 1, text: "[일반] 2서클 이상 주문 피해 +1" }
    },
    core_grimoire_plus: {
      id: "core_grimoire_plus",
      name: "고급 마도서",
      rarity: "rare",
      manaRegenPerSec: 2,
      durability: 58,
      cols: 4,
      rows: 4,
      blocked: [],
      passive: { type: "opening_mana", value: 8, text: "[희귀] 전투 시작 시 마나 +8" }
    },
    core_frozen_staff: {
      id: "core_frozen_staff",
      name: "얼어붙은 지팡이",
      rarity: "rare",
      manaRegenPerSec: 2,
      durability: 58,
      cols: 5,
      rows: 4,
      blocked: [[0, 0], [4, 0]],
      passive: { type: "status_stack_bonus", statusIds: ["slow", "freeze", "stun"], bonusStacks: 2, text: "[희귀] 한기/둔화/동결 부여 시 스택 +2" }
    },
    core_morellonomicon: {
      id: "core_morellonomicon",
      name: "모렐로노미콘",
      rarity: "legendary",
      manaRegenPerSec: 3,
      durability: 66,
      cols: 5,
      rows: 5,
      blocked: [],
      passive: { type: "opening_mana", value: 50, text: "[전설] 전투 시작 시 마나 +50" }
    },
    core_inferno_orb: {
      id: "core_inferno_orb",
      name: "연옥의 오브",
      rarity: "legendary",
      manaRegenPerSec: 3,
      durability: 64,
      cols: 6,
      rows: 4,
      blocked: [[0, 0], [5, 0], [0, 3], [5, 3]],
      passive: { type: "red_double_cast", text: "[전설] 모든 적색 술식 2회 발동" }
    }
  };
  const STARTER_CORE_IDS = ["core_balanced"];
  const RARE_CORE_IDS = ["core_grimoire_plus", "core_frozen_staff"];
  const LEGENDARY_CORE_IDS = ["core_morellonomicon", "core_inferno_orb"];
  const STARTING_TRAITS = [
    { id: "red_inheritor", name: "홍염 계승자", description: "1서클 적색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "red" }] },
    { id: "frost_mage", name: "얼음의 마법사", description: "1서클 청색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "blue" }] },
    { id: "druid_legacy", name: "드루이드의 후예", description: "1서클 녹색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "green" }] },
    { id: "geomancer_seed", name: "지층의 설계자", description: "1서클 황색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "yellow" }] },
    { id: "prism_disciple", name: "프리즘 수련생", description: "1서클 백색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "white" }] },
    { id: "shadow_apprentice", name: "그림자 사도", description: "1서클 흑색 주문 모두 해금", effects: [{ type: "unlock_color_circle1", color: "black" }] },
    { id: "mana_specialist", name: "마나전문가", description: "초당 마나재생 +2", effects: [{ type: "mana_regen_flat", value: 2 }] },
    { id: "overclocker", name: "고속 연산자", description: "쿨다운 회복 속도 +18%", effects: [{ type: "cooldown_recovery_pct", value: 0.18 }] },
    { id: "arcane_sniper", name: "비전 저격수", description: "최종 피해 +10%", effects: [{ type: "damage_bonus_pct", value: 0.10 }] },
    { id: "iron_will", name: "강철 의지", description: "피해 감소 +12%", effects: [{ type: "damage_reduction_pct", value: 0.12 }] },
    { id: "deep_reservoir", name: "깊은 저장고", description: "최대 마나 +6", effects: [{ type: "max_mp_flat", value: 6 }] },
    { id: "swift_channel", name: "신속한 통로", description: "초당 마나재생 +1, 쿨다운 회복 +10%", effects: [{ type: "mana_regen_flat", value: 1 }, { type: "cooldown_recovery_pct", value: 0.10 }] },
    { id: "battle_meditation", name: "전투 명상", description: "전투 시작 시 마나 +5", effects: [{ type: "opening_mana_flat", value: 5 }] },
    { id: "red_conductor", name: "화염 지휘자", description: "1서클 적색 해금, 최종 피해 +5%", effects: [{ type: "unlock_color_circle1", color: "red" }, { type: "damage_bonus_pct", value: 0.05 }] },
    { id: "blue_strategist", name: "빙결 전략가", description: "1서클 청색 해금, 쿨다운 회복 +12%", effects: [{ type: "unlock_color_circle1", color: "blue" }, { type: "cooldown_recovery_pct", value: 0.12 }] },
    { id: "green_keeper", name: "생명의 수호자", description: "1서클 녹색 해금, 피해 감소 +8%", effects: [{ type: "unlock_color_circle1", color: "green" }, { type: "damage_reduction_pct", value: 0.08 }] },
    { id: "yellow_architect", name: "방벽 설계자", description: "1서클 황색 해금, 전투 시작 마나 +3", effects: [{ type: "unlock_color_circle1", color: "yellow" }, { type: "opening_mana_flat", value: 3 }] },
    { id: "white_oracle", name: "광휘 예언자", description: "1서클 백색 해금, 최대 마나 +3", effects: [{ type: "unlock_color_circle1", color: "white" }, { type: "max_mp_flat", value: 3 }] },
    { id: "black_occultist", name: "흑야 주술사", description: "1서클 흑색 해금, 초당 마나재생 +1", effects: [{ type: "unlock_color_circle1", color: "black" }, { type: "mana_regen_flat", value: 1 }] },
    { id: "dual_flux", name: "이중 유량", description: "초당 마나재생 +1, 최대 마나 +3", effects: [{ type: "mana_regen_flat", value: 1 }, { type: "max_mp_flat", value: 3 }] },
    { id: "glass_cannon", name: "유리 대포", description: "최종 피해 +16%", effects: [{ type: "damage_bonus_pct", value: 0.16 }] },
    { id: "fortress_mind", name: "요새 정신", description: "피해 감소 +18%", effects: [{ type: "damage_reduction_pct", value: 0.18 }] },
    { id: "burst_theory", name: "폭발 이론", description: "전투 시작 시 마나 +10, 쿨다운 회복 +15%", effects: [{ type: "opening_mana_flat", value: 10 }, { type: "cooldown_recovery_pct", value: 0.15 }] },
    { id: "efficient_core", name: "효율 핵심", description: "마나재생 +1, 피해 +4%, 피해감소 +5%", effects: [{ type: "mana_regen_flat", value: 1 }, { type: "damage_bonus_pct", value: 0.04 }, { type: "damage_reduction_pct", value: 0.05 }] },
    { id: "mana_harvester", name: "마나 수확자", description: "전투 시작 시 마나 +4, 최대 마나 +4", effects: [{ type: "opening_mana_flat", value: 4 }, { type: "max_mp_flat", value: 4 }] },
    { id: "quickened_mind", name: "가속 사고", description: "쿨다운 회복 속도 +25%", effects: [{ type: "cooldown_recovery_pct", value: 0.25 }] },
    { id: "relentless_focus", name: "집중 연쇄", description: "최종 피해 +12%, 쿨다운 회복 +8%", effects: [{ type: "damage_bonus_pct", value: 0.12 }, { type: "cooldown_recovery_pct", value: 0.08 }] },
    { id: "stable_circuits", name: "안정 회로", description: "피해 감소 +10%, 최대 마나 +2", effects: [{ type: "damage_reduction_pct", value: 0.10 }, { type: "max_mp_flat", value: 2 }] },
    { id: "nature_frost_link", name: "청록 연성", description: "1서클 녹색/청색 주문 해금", effects: [{ type: "unlock_color_circle1", color: "green" }, { type: "unlock_color_circle1", color: "blue" }] },
    { id: "twilight_prism", name: "황혼 프리즘", description: "1서클 백색/흑색 주문 해금", effects: [{ type: "unlock_color_circle1", color: "white" }, { type: "unlock_color_circle1", color: "black" }] }
  ];
  const DEFAULT_PLAYER_FORMULAS = [
    { id: "formula_1", name: "기초 술식", coreId: "core_balanced", spellIds: ["red_flame_shard", "red_heat_stock"] },
    { id: "formula_2", name: "잠긴 술식 II", coreId: "core_lance", spellIds: ["red_flame_shard", "red_heat_stock"] },
    { id: "formula_3", name: "잠긴 술식 III", coreId: "core_bastion", spellIds: ["red_flame_shard", "red_heat_stock"] }
  ];
  const PLAYER_MAX_HEARTS = 12;
  const PLAYER_BATTLE_HEARTS = 100;
  const EMPTY_STARTING_TRAIT_BONUSES = {
    manaRegenFlat: 0,
    damageBonusPct: 0,
    damageReductionPct: 0,
    maxMpFlat: 0,
    cooldownRecoveryMul: 1,
    openingManaFlat: 0
  };
  let unlockedSpellSet = new Set();
  let unlockedCoreSet = new Set();
  let selectedStartingTraitId = null;
  let activeStartingTraitBonuses = { ...EMPTY_STARTING_TRAIT_BONUSES };

  function loadStartingTraitId() {
    try {
      const raw = localStorage.getItem(STARTING_TRAIT_STORAGE_KEY);
      if (!raw) return null;
      return STARTING_TRAITS.some((trait) => trait.id === raw) ? raw : null;
    } catch (error) {
      return null;
    }
  }

  function saveStartingTraitId(traitId) {
    try {
      localStorage.setItem(STARTING_TRAIT_STORAGE_KEY, traitId);
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function normalizeStartingTraitOfferIds(ids) {
    if (!Array.isArray(ids)) return null;
    const unique = [...new Set(ids.filter((id) => STARTING_TRAITS.some((trait) => trait.id === id)))];
    if (unique.length !== 3) return null;
    return unique;
  }

  function loadStartingTraitOfferIds() {
    try {
      const raw = localStorage.getItem(STARTING_TRAIT_OFFER_STORAGE_KEY);
      if (!raw) return null;
      return normalizeStartingTraitOfferIds(JSON.parse(raw));
    } catch (error) {
      return null;
    }
  }

  function saveStartingTraitOfferIds(ids) {
    try {
      const normalized = normalizeStartingTraitOfferIds(ids);
      if (!normalized) return;
      localStorage.setItem(STARTING_TRAIT_OFFER_STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function clearStartingTraitOfferIds() {
    try {
      localStorage.removeItem(STARTING_TRAIT_OFFER_STORAGE_KEY);
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function buildStartingTraitBonuses(traitId) {
    const trait = getStartingTraitById(traitId);
    if (!trait) return { ...EMPTY_STARTING_TRAIT_BONUSES };
    const next = { ...EMPTY_STARTING_TRAIT_BONUSES };
    const effects = Array.isArray(trait.effects) ? trait.effects : [];
    effects.forEach((effect) => {
      if (!effect || typeof effect !== "object") return;
      if (effect.type === "mana_regen_flat") next.manaRegenFlat += Math.max(0, Number(effect.value) || 0);
      if (effect.type === "damage_bonus_pct") next.damageBonusPct += Math.max(0, Number(effect.value) || 0);
      if (effect.type === "damage_reduction_pct") next.damageReductionPct += Math.max(0, Number(effect.value) || 0);
      if (effect.type === "max_mp_flat") next.maxMpFlat += Math.max(0, Math.floor(Number(effect.value) || 0));
      if (effect.type === "cooldown_recovery_pct") next.cooldownRecoveryMul += Math.max(0, Number(effect.value) || 0);
      if (effect.type === "opening_mana_flat") next.openingManaFlat += Math.max(0, Math.floor(Number(effect.value) || 0));
    });
    next.damageReductionPct = Math.min(0.8, next.damageReductionPct);
    return next;
  }

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

  function isFormulaCoreUnlocked(formula) {
    const coreId = formula?.coreId || DEFAULT_CORE_ID;
    return isCoreUnlocked(coreId);
  }

  function getStartingTraitById(traitId) {
    return STARTING_TRAITS.find((trait) => trait.id === traitId) || null;
  }

  function traitUnlockSpellIds(traitId) {
    const trait = getStartingTraitById(traitId);
    if (!trait) return [];
    const effects = Array.isArray(trait.effects) ? trait.effects : [];
    const unlockColors = [...new Set(
      effects
        .filter((effect) => effect?.type === "unlock_color_circle1" && typeof effect.color === "string")
        .map((effect) => effect.color)
    )];
    if (unlockColors.length < 1) return [];
    return spellList
      .filter((spell) => spell.circle === 1 && unlockColors.includes(spell.color))
      .map((spell) => spell.id);
  }

  function traitPrimaryColor(traitId) {
    const trait = getStartingTraitById(traitId);
    if (!trait || !Array.isArray(trait.effects)) return "neutral";
    const unlock = trait.effects.find((effect) => effect?.type === "unlock_color_circle1" && typeof effect.color === "string");
    return unlock?.color || "neutral";
  }

  function applyStartingTraitUnlocks(traitId) {
    const unlockIds = traitUnlockSpellIds(traitId);
    if (unlockIds.length < 1) return [];
    const newlyUnlocked = [];
    unlockIds.forEach((spellId) => {
      if (!spellLibrary[spellId]) return;
      if (isSpellUnlocked(spellId)) return;
      unlockedSpellSet.add(spellId);
      newlyUnlocked.push(spellId);
    });
    if (newlyUnlocked.length > 0) {
      saveUnlockedSpellSet();
    }
    return newlyUnlocked;
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

  function normalizeActionSlotMap(slotMap, spellIds = []) {
    const next = { 1: null, 2: null, 3: null, 4: null };
    if (slotMap && typeof slotMap === "object") {
      [1, 2, 3, 4].forEach((idx) => {
        const id = slotMap[idx];
        if (!id) return;
        if (!spellLibrary[id] || !isSpellUnlocked(id)) return;
        next[idx] = id;
      });
    }
    (Array.isArray(spellIds) ? spellIds : []).forEach((id, i) => {
      const idx = i + 1;
      if (idx > 4) return;
      if (!id) return;
      if (!spellLibrary[id] || !isSpellUnlocked(id)) return;
      if (!next[idx]) next[idx] = id;
    });
    return next;
  }

  function spellIdsFromActionSlotMap(slotMap) {
    const out = [];
    [1, 2, 3, 4].forEach((idx) => {
      const id = slotMap?.[idx];
      if (!id || !spellLibrary[id] || !isSpellUnlocked(id)) return;
      out.push(id);
    });
    return out;
  }

  function sanitizeFormula(formula, maxHearts = PLAYER_MAX_HEARTS) {
    if (!formula || typeof formula !== "object") return null;
    const slotMap = normalizeActionSlotMap(formula.slotMap, formula.spellIds);
    let spellIds = spellIdsFromActionSlotMap(slotMap);
    if (spellIds.length < 1) {
      const fallback = sanitizeSpellSlots(formula.spellIds, maxHearts);
      if (!fallback) return null;
      spellIds = fallback.slice(0, 4);
      const fallbackSlotMap = normalizeActionSlotMap(null, spellIds);
      [1, 2, 3, 4].forEach((idx) => {
        slotMap[idx] = fallbackSlotMap[idx];
      });
    }
    if (totalHeartCost(spellIds) > maxHearts) return null;
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
      coreId: (typeof formula.coreId === "string" && CORE_LIBRARY[formula.coreId]) ? formula.coreId : DEFAULT_CORE_ID,
      spellIds,
      slotMap,
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

  function maybeResetProgressForVersion() {
    try {
      const stored = Number(localStorage.getItem(PROGRESS_RESET_VERSION_KEY) || "0");
      if (Number.isFinite(stored) && stored >= PROGRESS_RESET_VERSION) return;
      localStorage.removeItem(UNLOCKED_SPELLS_STORAGE_KEY);
      localStorage.removeItem(UNLOCKED_CORES_STORAGE_KEY);
      localStorage.removeItem(LOADOUT_STORAGE_KEY);
      localStorage.removeItem(FORMULA_BOOK_STORAGE_KEY);
      localStorage.removeItem(STORY_PROGRESS_STORAGE_KEY);
      localStorage.removeItem(ACT1_SCENE_SEED_STORAGE_KEY);
      localStorage.removeItem(STARTING_TRAIT_STORAGE_KEY);
      localStorage.removeItem(STARTING_TRAIT_OFFER_STORAGE_KEY);
      localStorage.removeItem(STORY_REVEAL_SPEED_STORAGE_KEY);
      localStorage.setItem(PROGRESS_RESET_VERSION_KEY, String(PROGRESS_RESET_VERSION));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function shouldForceFreshStartFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const raw = String(params.get("fresh") || "").toLowerCase();
      return raw === "1" || raw === "true" || raw === "yes";
    } catch (error) {
      return false;
    }
  }

  function consumeFreshStartQueryParam() {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has("fresh")) return;
      url.searchParams.delete("fresh");
      const next = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState({}, "", next);
    } catch (error) {
      // Ignore URL API failures.
    }
  }

  function resetAllProgressForFreshBoot(options = {}) {
    const forced = Boolean(options.force);
    if (!RESET_ALL_PROGRESS_ON_EACH_BOOT && !forced) return;
    try {
      if (!forced && sessionStorage.getItem(BOOT_RESET_SESSION_KEY) === "1") return;
      sessionStorage.setItem(BOOT_RESET_SESSION_KEY, "1");
    } catch (error) {
      // If session storage is blocked, fall through to local reset.
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
        PROGRESS_RESET_VERSION_KEY,
        ACT1_SCENE_SEED_STORAGE_KEY
      ].forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function createBattleStats() {
    return {
      damageDealt: 0,
      damageTaken: 0,
      statusesApplied: {}
    };
  }

  function resetRunSpellProgressStorage() {
    try {
      localStorage.removeItem(UNLOCKED_SPELLS_STORAGE_KEY);
      localStorage.removeItem(LOADOUT_STORAGE_KEY);
      localStorage.removeItem(FORMULA_BOOK_STORAGE_KEY);
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function loadStoryProgressSnapshot(sceneCount) {
    try {
      const raw = localStorage.getItem(STORY_PROGRESS_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      const clampScene = Math.max(0, Math.min((sceneCount || 1) - 1, Math.floor(parsed.sceneIndex || 0)));
      return {
        sceneIndex: clampScene,
        memoryFragments: Math.max(0, Math.floor(parsed.memoryFragments || 0)),
        battleBias: Math.max(0, Math.floor(parsed.battleBias || 0)),
        enemyIntel: Math.max(0, Math.floor(parsed.enemyIntel || 0)),
        relics: Array.isArray(parsed.relics) ? parsed.relics.filter((v) => typeof v === "string").slice(0, 20) : [],
        inlineSceneId: typeof parsed.inlineSceneId === "string" ? parsed.inlineSceneId : null,
        inlineStep: Math.max(0, Math.floor(parsed.inlineStep || 0)),
        awaitingContinue: Boolean(parsed.awaitingContinue),
        relicRewardCount: Math.max(0, Math.floor(parsed.relicRewardCount || 0)),
        sceneNotes: Array.isArray(parsed.sceneNotes) ? parsed.sceneNotes.filter((v) => typeof v === "string").slice(0, 60) : [],
        routePath: Array.isArray(parsed.routePath)
          ? parsed.routePath
              .map((v) => Math.floor(v))
              .filter((v) => Number.isFinite(v) && v >= 0 && v < (sceneCount || 1))
              .slice(0, 100)
          : [0]
      };
    } catch (error) {
      return null;
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
    turnCount: 1,
    turnPhase: "player",
    combatElapsedSec: 0,
    manaOverdriveActive: false,
    manaOverdriveTickAccum: 0,
    manaOverdriveIntensity: 1,
    resonanceBoard: Array.from({ length: 9 }, () => null),
    frameStyle: FRAME_STYLE_OPTIONS[0].id,
    fontWeightLevel: FONT_WEIGHT_OPTIONS[1].id,
    playerDamageBonus: BASE_PLAYER_DAMAGE_BONUS + activeStartingTraitBonuses.damageBonusPct,
    rearrangeRemaining: 0,
    rearrangeSelectedFormulaIndex: null,
    rearrangeEntryFormulaIndex: null,
    brokenFormulaIndexes: new Set(),
    pendingTimeout: null,
    battleStats: createBattleStats(),
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
      pendingBattle: null,
      inlineSceneId: null,
      inlineStep: 0,
      routePath: [0],
      awaitingContinue: false,
      relicRewardCount: 0,
      sceneNotes: [],
      renderedBody: "",
      revealTimer: null,
      revealTarget: "",
      revealOnDone: null,
      revealToken: 0,
      lastBodyScrollHeight: 0,
      revealSpeedMult: loadStoryRevealSpeed()
    }
  };

  function persistStoryProgressSnapshot() {
    try {
      const payload = {
        sceneIndex: state.story.sceneIndex,
        memoryFragments: state.story.memoryFragments,
        battleBias: state.story.battleBias,
        enemyIntel: state.story.enemyIntel,
        relics: state.story.relics,
        inlineSceneId: state.story.inlineSceneId,
        inlineStep: state.story.inlineStep,
        awaitingContinue: state.story.awaitingContinue,
        relicRewardCount: state.story.relicRewardCount,
        sceneNotes: state.story.sceneNotes,
        routePath: state.story.routePath
      };
      localStorage.setItem(STORY_PROGRESS_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // Ignore storage errors silently.
    }
  }

  function flushProgressSnapshot() {
    // Capture story and run-loadout state on lifecycle boundaries.
    persistStoryProgressSnapshot();
    saveSpellSlots(player.spellSlots);
    saveFormulaBook(player.formulaBook);
    saveUnlockedSpellSet();
    saveUnlockedCoreSet();
  }

  function getFrameStyleOption(styleId) {
    return FRAME_STYLE_OPTIONS.find((entry) => entry.id === styleId) || FRAME_STYLE_OPTIONS[0];
  }

  function getFontWeightOption(levelId) {
    return FONT_WEIGHT_OPTIONS.find((entry) => entry.id === levelId) || FONT_WEIGHT_OPTIONS[1];
  }

  function loadFrameStyle() {
    try {
      const raw = localStorage.getItem(FRAME_STYLE_STORAGE_KEY);
      if (!raw) return FRAME_STYLE_OPTIONS[0].id;
      return getFrameStyleOption(raw).id;
    } catch (error) {
      return FRAME_STYLE_OPTIONS[0].id;
    }
  }

  function saveFrameStyle(styleId) {
    try {
      localStorage.setItem(FRAME_STYLE_STORAGE_KEY, styleId);
    } catch (error) {
      // noop
    }
  }

  function applyFrameStyle(styleId) {
    const option = getFrameStyleOption(styleId);
    state.frameStyle = option.id;
    document.body.classList.remove(
      "frame-style-engraved",
      "frame-style-rune",
      "frame-style-inlay"
    );
    document.body.classList.add(`frame-style-${option.id}`);
    if (dom.frameStyleBtn) {
      dom.frameStyleBtn.textContent = `프레임: ${option.label}`;
    }
    saveFrameStyle(option.id);
  }

  function loadFontWeightLevel() {
    try {
      const raw = Number(localStorage.getItem(FONT_WEIGHT_STORAGE_KEY));
      if (!Number.isInteger(raw)) return FONT_WEIGHT_OPTIONS[1].id;
      return getFontWeightOption(raw).id;
    } catch (error) {
      return FONT_WEIGHT_OPTIONS[1].id;
    }
  }

  function saveFontWeightLevel(levelId) {
    try {
      localStorage.setItem(FONT_WEIGHT_STORAGE_KEY, String(levelId));
    } catch (error) {
      // noop
    }
  }

  function applyFontWeightLevel(levelId) {
    const option = getFontWeightOption(levelId);
    state.fontWeightLevel = option.id;
    document.body.style.setProperty("--font-ui-weight", String(option.uiWeight));
    document.body.style.setProperty("--font-title-weight", String(option.titleWeight));
    if (dom.fontWeightBtn) {
      dom.fontWeightBtn.textContent = `굵기: ${option.label}`;
    }
    if (dom.storyFontWeightBtn) {
      dom.storyFontWeightBtn.textContent = `굵기: ${option.label}`;
    }
    saveFontWeightLevel(option.id);
  }

  function cycleFontWeightLevel() {
    const index = FONT_WEIGHT_OPTIONS.findIndex((entry) => entry.id === state.fontWeightLevel);
    const nextIndex = index >= 0 ? (index + 1) % FONT_WEIGHT_OPTIONS.length : 0;
    applyFontWeightLevel(FONT_WEIGHT_OPTIONS[nextIndex].id);
  }

  function cycleFrameStyle() {
    const index = FRAME_STYLE_OPTIONS.findIndex((entry) => entry.id === state.frameStyle);
    const nextIndex = index >= 0 ? (index + 1) % FRAME_STYLE_OPTIONS.length : 0;
    applyFrameStyle(FRAME_STYLE_OPTIONS[nextIndex].id);
  }

  function currentEnemyProfile() {
    return enemyProfiles[state.enemyProfileId] || enemyProfiles.allen;
  }

  function normalizeStoryRevealSpeed(value) {
    const speed = Number(value);
    if (!Number.isFinite(speed)) return STORY_REVEAL_SPEED_OPTIONS[0];
    return STORY_REVEAL_SPEED_OPTIONS.includes(speed) ? speed : STORY_REVEAL_SPEED_OPTIONS[0];
  }

  function loadStoryRevealSpeed() {
    try {
      const raw = Number(localStorage.getItem(STORY_REVEAL_SPEED_STORAGE_KEY));
      return normalizeStoryRevealSpeed(raw);
    } catch (error) {
      return STORY_REVEAL_SPEED_OPTIONS[0];
    }
  }

  function saveStoryRevealSpeed(speed) {
    try {
      localStorage.setItem(STORY_REVEAL_SPEED_STORAGE_KEY, String(normalizeStoryRevealSpeed(speed)));
    } catch (error) {
      // noop
    }
  }

  function updateStoryRevealControls() {
    if (dom.storyRevealSpeedBtn) {
      dom.storyRevealSpeedBtn.textContent = `본문 x${state.story.revealSpeedMult}`;
      dom.storyRevealSpeedBtn.classList.toggle("active", state.story.revealSpeedMult > 1);
    }
    if (dom.storyRevealSkipBtn) {
      const revealing = Boolean(state.story.revealTimer);
      dom.storyRevealSkipBtn.textContent = revealing ? "즉시 출력" : "출력 완료";
      dom.storyRevealSkipBtn.disabled = !revealing;
      dom.storyRevealSkipBtn.classList.toggle("active", revealing);
    }
  }

  function applyStoryRevealSpeed(speed) {
    state.story.revealSpeedMult = normalizeStoryRevealSpeed(speed);
    updateStoryRevealControls();
    saveStoryRevealSpeed(state.story.revealSpeedMult);
  }

  function cycleStoryRevealSpeed() {
    const index = STORY_REVEAL_SPEED_OPTIONS.indexOf(state.story.revealSpeedMult);
    const nextIndex = index >= 0 ? (index + 1) % STORY_REVEAL_SPEED_OPTIONS.length : 0;
    applyStoryRevealSpeed(STORY_REVEAL_SPEED_OPTIONS[nextIndex]);
  }

  function skipStoryRevealIfRunning() {
    if (state.worldMode !== "story") return false;
    if (!state.story.revealTimer) return false;
    completeStoryReveal(true);
    return true;
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
      id: "hermit_druid",
      title: "은거한 드루이드의 숲",
      body: "숲의 경계는 조용했다.\n그러나 한 걸음 더 들어서는 순간, 나뭇잎 사이의 바람 소리가 뚝 끊긴다.\n\n앞을 가로막듯 굽은 거목 아래, 회색 로브의 노인이 천천히 모습을 드러낸다.\n그의 지팡이가 땅을 짚는 순간, 뿌리 같은 녹빛 문양이 발밑으로 퍼져 나간다.\n\n노인이 당신을 가만히 훑어본다.\n\n\"자네는 이 세계에 속하지 않는군.\n무엇을 바라고 이 길을 걸어가는겐가?\"\n\n대답을 고르기도 전에, 숲 전체가 당신의 마력을 시험하듯 조여 온다.\n지금의 술식 수준으로는 정면 승부가 거의 불가능해 보인다.",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "green",
      enemyName: "은거한 드루이드",
      enemyProfileId: "hermit_druid",
      battleConfig: { phase1EnemyHpMul: 1.35, phase1EnemyMpMul: 1.2 },
      loseLog: "거목의 뿌리가 발목을 감싼다. 의식이 숲의 맥동 속으로 가라앉는다.",
      choices: [
        { label: "정면으로 맞선다", effect: "battle_random:hermit_druid" },
        { label: "뜻을 밝히고 가르침을 청한다", effect: "druid_teach" },
        { label: "침묵한 채 뒤로 돌아가 우회로를 찾는다", effect: "druid_detour" }
      ]
    },
    {
      id: "wagon",
      title: "사라진 수레의 흔적",
      body: "대로 한가운데 수레가 옆으로 쓰러져 있다.\n바퀴 축은 반쯤 부러졌고, 말 마구는 끊어진 채 흙바닥에 질질 끌려간 자국만 남았다.\n짐은 손대지 않은 듯 포대째 남아 있는데, 이상하게도 사람의 흔적만 뚝 끊겨 있다.\n\n바람이 한 번 지나가자 짚단 사이에서 피 냄새가 늦게 따라온다.\n수레 아래, 바닥에 번진 검은 얼룩이 천천히 들숨을 쉬듯 부풀었다 가라앉는다.\n\n▶ 수레를 살펴본다.\n천 아래에서 검게 젖은 손이 갑자기 튀어나와 바퀴살을 움켜쥔다.\n\"아직… 따뜻…\"\n젖은 살점 같은 형체가 천천히 몸을 세운다.\n눈이 있어야 할 자리에는 텅 빈 구멍만 흔들린다.",
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
      body: "숲의 경계에 발을 들이는 순간 소리가 사라진다.\n방금 전까지 들리던 새소리와 풀벌레 울음이 동시에 꺼지고, 가지 사이를 흔들던 바람마저 멎는다.\n나뭇잎 끝마다 이슬처럼 맺힌 마력이 당신의 기척을 따라 미세하게 떨린다.\n\n보이지 않는 시선이 사방에서 겹쳐 온다.\n누군가가 아니라, 숲 자체가 당신의 숨을 세고 있는 느낌이다.\n\n▶ 마력을 흘려본다.\n손끝에서 흘린 마력이 청록빛 선이 되어 가지 사이를 스친다.\n겹겹이 포개진 그림자 틈에서 정령의 윤곽이 떠오른다.\n\"이질적이다.\"\n\"너는 이 땅의 시간이 아니다.\"",
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
      body: "길가의 진흙 위에 작은 나무 인형 하나가 놓여 있다.\n비를 맞았는데도 눈 부분만 유난히 반들거리며, 정확히 당신 쪽을 보고 멈춰 있다.\n주변에는 아이 발자국도, 누군가 두고 간 흔적도 없다.\n\n허리를 굽히는 순간 등 뒤의 공기가 한 톤 차가워진다.\n인형의 목이 아주 미세하게 끼익 소리를 내며 돌아간다.\n\n▶ 인형을 집는다.\n손가락이 닿자 땅이 금 간 도자기처럼 갈라진다.\n흙 틈 사이로 작고 창백한 손 여러 개가 동시에 솟아오른다.\n아이의 형체가 몸을 일으킨다.\n하지만 얼굴이 있어야 할 자리에는 매끈한 피부만 이어져 있다.",
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
      body: "길가 언덕 위에 봉인석 하나가 기울어진 채 박혀 있다.\n겉면은 불에 그을려 새까맣고, 새겨진 문양 절반은 녹아 흘러내린 촛농처럼 굳어 있다.\n누군가가 급하게 봉인을 완성하려다 중간에 끊긴 흔적이다.\n\n가까이 다가갈수록 공기가 물속처럼 무거워진다.\n귀 안쪽에서 낮은 진동이 울리고, 시야 가장자리로 검은 먼지가 거꾸로 떠오른다.\n\n▶ 돌기둥에 손을 댄다.\n차가운 감각이 손끝에서 팔꿈치까지 한 번에 올라온다.\n다음 순간 돌기둥 표면에 실금이 번지고,\n갈라진 틈에서 묵은 숨처럼 검은 연기가 새어 나온다.",
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
      body: "대로 옆 바위에 짐꾼 차림의 남자가 주저앉아 있다.\n등에는 포대 여러 개가 겹겹이 묶여 있고, 손등 핏줄은 금방이라도 끊어질 듯 부풀어 있다.\n그는 입술이 바짝 마른 목소리로 속삭인다.\n\"도와주시오… 조금만…\"\n\n짐은 천과 밧줄로 지나치게 단단히 감겨 있다.\n그런데 포대 안쪽에서 누군가 숨을 참고 버티는 듯, 일정한 간격으로 형태가 꿈틀거린다.\n남자의 시선은 끝내 당신 눈을 똑바로 보지 못한다.\n\n▶ 짐에 대해 묻는다.\n잠깐 망설인 뒤 남자가 침을 삼킨다.\n\"마탑에서 맡긴 물건이오… 열지 말라고 했는데… 안에서 자꾸…\"",
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
      body: "대로 한복판, 낡은 이정표 곁에 가면을 쓴 사내가 서 있다.\n해가 비스듬히 기울어 가면 아래 그림자가 턱선까지 길게 드리운다.\n그는 일부러 길 한가운데를 막고 선 채, 당신이 멈출 때까지 한 발도 비키지 않는다.\n\n\"마력 냄새가 진하군.\"\n\"최근에 현상금이 걸렸지.\"\n\n짧은 단검 두 자루가 손가락 사이에서 가볍게 회전한다.\n웃는 목소리와 달리 발끝의 중심은 이미 살의 쪽으로 쏠려 있다.",
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
      body: "해가 기울 무렵 작은 마을 어귀에 닿는다.\n집집마다 문은 반쯤 열린 채 흔들리고, 식탁 위에는 굳어 버린 빵과 식은 수프가 그대로 남아 있다.\n사람들이 짐을 챙길 틈도 없이 한꺼번에 떠난 듯하다.\n\n우물 두레박은 물에 잠긴 채 멈춰 있고,\n골목 끝에서는 바람 대신 낮은 숨소리 같은 메아리만 끌려온다.\n\n▶ 안으로 들어간다.\n가장 가까운 집 문턱을 넘는 순간 바닥 판자가 길게 삐걱거린다.\n어둠 속에서 무언가가 어깨를 비틀며 천천히 일어난다.\n사람의 형체다.\n하지만 눈동자가 유리막처럼 흐려져 초점이 없다.",
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
      body: "숲 가장자리 빈 터에 사슴 한 마리가 꼼짝없이 서 있다.\n눈동자는 자연스러운 갈색이 아니라 얼음 조각 같은 푸른빛을 띠고,\n옆구리 근육이 누군가의 손에 잡아당겨지듯 불규칙하게 떨린다.\n\n땅에는 발굽 자국이 원형으로 빽빽하다.\n도망치려다 같은 자리를 계속 맴돌았다는 뜻이다.\n\n▶ 다가간다.\n한 걸음 가까워지자 사슴이 갑자기 고개를 치켜들고 길게 울부짖는다.\n뿔 끝에서 파란 마력 스파크가 번쩍이며 공기를 찢는다.",
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
      body: "강을 가로지르던 돌다리가 반쯤 무너져 강심장 쪽으로 기울어 있다.\n부서진 난간 사이로 검은 물살이 느리게 말려 들어가며, 표면에는 기름막 같은 무늬가 떠다닌다.\n물소리는 분명한데 이상하게도 너무 멀리서 들리는 것처럼 먹먹하다.\n\n남은 다리 면에는 젖은 발자국이 끊겼다가 다시 시작된다.\n건넌 사람이 있었는데, 돌아온 자국은 없다.\n\n▶ 다리 위로 오른다.\n돌판이 체중에 맞춰 낮게 신음한다.\n난간 아래 검은 수면에서 사람 그림자 같은 형상이 길게 늘어나더니,\n당신 발밑 위치를 따라 꿈틀거리며 붙어 올라온다.",
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
      body: "대로에서 조금 벗어난 언덕 아래, 지붕이 반쯤 꺼진 폐가가 보인다.\n창문 틈으로 새는 빛은 단 하나의 촛불인데, 바람이 없는데도 불꽃이 누군가 숨을 불어넣듯 좌우로 흔들린다.\n문틀에는 오래된 손톱 자국이 빽빽하게 남아 있다.\n\n집 주변은 유난히 조용하다.\n풀벌레조차 이 집 반경만 비켜 가는 듯 소리가 끊긴다.\n\n▶ 문을 연다.\n문짝이 젖은 나무 소리를 내며 안쪽으로 밀린다.\n실내는 텅 비어 있고, 중앙 바닥에 촛불 하나만 놓여 있다.\n불꽃 뒤편의 가장 어두운 구석에서\n두 개의 눈동자가 천천히 떠오른다.",
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
    const choiceList = Array.isArray(seed.choices) && seed.choices.length > 0
      ? seed.choices
      : [
          { label: seed.fightLabel, effect: `battle_random:${seed.id}` },
          { label: seed.fleeLabel, effect: `flee_random:${seed.id}` }
        ];
    return {
      id: `s${slotNo}`,
      title: `${slotNo < 10 ? `0${slotNo}` : slotNo}. ${seed.title}`,
      body: seed.body,
      image: seed.image,
      tone: seed.tone,
      choices: choiceList
    };
  }

  function loadOrCreateAct1SceneSeeds() {
    const poolIds = new Set(ACT1_RANDOM_SCENE_POOL.map((scene) => scene.id));
    try {
      const raw = localStorage.getItem(ACT1_SCENE_SEED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 7 && parsed.every((id) => typeof id === "string" && poolIds.has(id))) {
          return parsed;
        }
      }
    } catch (error) {
      // Ignore invalid seed payload.
    }
    const seeded = shuffledCopy(ACT1_RANDOM_SCENE_POOL).slice(0, 7).map((scene) => scene.id);
    try {
      localStorage.setItem(ACT1_SCENE_SEED_STORAGE_KEY, JSON.stringify(seeded));
    } catch (error) {
      // Ignore storage errors silently.
    }
    return seeded;
  }

  function buildAct1Scenes(seedIds = []) {
    const byId = Object.fromEntries(ACT1_RANDOM_SCENE_POOL.map((scene) => [scene.id, scene]));
    const fallback = shuffledCopy(ACT1_RANDOM_SCENE_POOL).slice(0, 7);
    const picks = Array.from({ length: 7 }, (_, i) => byId[seedIds[i]] || fallback[i] || ACT1_RANDOM_SCENE_POOL[0]);
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
        body: "대로 끝, 익숙한 간판이 보인다.\n\n빛바랜 글씨. 문 앞 화분.\n\n변한 것은 없다.\n\n문을 열자 따뜻한 공기가 다시 얼굴을 감싼다.\n\n여관 주인이 당신을 알아보고 웃는다.\n\n\"돌아오셨군요.\"\n\n그는 여전히 온화하다.\n\n\"방을 쓰시겠습니까?\"\n\n▶ 방으로 올라간다.\n촛불이 흔들리는 복도. 익숙한 작은 방.\n\n문을 닫고 숨을 고른다.\n\n—\n\n똑, 똑.\n\n\"접니다.\"\n\n여관 주인의 목소리다.\n\n\"잠깐… 이야기 좀.\"\n\n문밖의 기척이 하나가 아니다.\n\n(어떤 선택을 하든 전투로 수렴)\n\n문이 열리는 순간 복도에는 여관 주인이 서 있다.\n\n그의 표정은 여전히 부드럽다.\n\n그러나 뒤에는 낯선 그림자들이 서 있다.\n\n계단 아래, 술을 마시던 모험가들이 조용히 무기를 들고 있다.\n\n아래층 문이 닫히는 소리.\n\n\"미안하오.\"\n\n그는 담담하게 말한다.\n\n\"이 일대에 현상금이 걸렸소.\"\n\n그의 손이 허리로 내려간다.\n\n단검이 보인다.\n\n\"세상은 바뀌었소. 요즘은 이런 기회가 오면… 잡아야 하지.\"\n\n그는 당신을 똑바로 본다.\n\n\"당신이 나쁜 사람이라는 생각은 들지 않소.\"\n\n\"하지만… 이건 일이지.\"\n\n그의 눈에 원망은 없다.\n\n체념과 책임만이 있다.",
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

  const forceFreshStart = shouldForceFreshStartFromUrl();
  resetAllProgressForFreshBoot({ force: forceFreshStart });
  if (forceFreshStart) consumeFreshStartQueryParam();
  const act1SceneSeeds = loadOrCreateAct1SceneSeeds();
  const act1Scenes = buildAct1Scenes(act1SceneSeeds);
  maybeResetProgressForVersion();
  const restoredStory = loadStoryProgressSnapshot(act1Scenes.length);
  if (restoredStory) {
    state.story.sceneIndex = restoredStory.sceneIndex;
    state.story.memoryFragments = restoredStory.memoryFragments;
    state.story.battleBias = restoredStory.battleBias;
    state.story.enemyIntel = restoredStory.enemyIntel;
    state.story.relics = restoredStory.relics;
    state.story.inlineSceneId = restoredStory.inlineSceneId;
    state.story.inlineStep = restoredStory.inlineStep;
    state.story.awaitingContinue = restoredStory.awaitingContinue;
    state.story.relicRewardCount = restoredStory.relicRewardCount;
    state.story.sceneNotes = restoredStory.sceneNotes;
    state.story.routePath = restoredStory.routePath.length > 0 ? restoredStory.routePath : [restoredStory.sceneIndex];
  }

  if (RESET_RUN_SPELL_PROGRESS_ON_BOOT) {
    resetRunSpellProgressStorage();
  }
  selectedStartingTraitId = loadStartingTraitId();
  activeStartingTraitBonuses = buildStartingTraitBonuses(selectedStartingTraitId);
  unlockedSpellSet = loadUnlockedSpellSet();
  if (selectedStartingTraitId) {
    applyStartingTraitUnlocks(selectedStartingTraitId);
  }
  saveUnlockedSpellSet();
  unlockedCoreSet = loadUnlockedCoreSet();
  saveUnlockedCoreSet();
  const initialLegacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
  const initialFormulaBook = loadStoredFormulaBook(initialLegacySlots);
  const initialPreferredFormulaIndex = Math.min(2, Math.max(0, Number.isInteger(initialFormulaBook.activeFormulaIndex) ? initialFormulaBook.activeFormulaIndex : 0));
  const initialActiveFormulaIndex = isFormulaCoreUnlocked(initialFormulaBook.formulas[initialPreferredFormulaIndex])
    ? initialPreferredFormulaIndex
    : Math.max(0, initialFormulaBook.formulas.findIndex((formula) => isFormulaCoreUnlocked(formula)));
  initialFormulaBook.activeFormulaIndex = initialActiveFormulaIndex;
  const initialActiveFormula = initialFormulaBook.formulas[initialActiveFormulaIndex] || initialFormulaBook.formulas[0];
  const initialCoreId = initialActiveFormula?.coreId || DEFAULT_CORE_ID;
  const initialCoreMaxHp = PLAYER_BASE_HP;
  const initialEnemyPhase = currentEnemyProfile().phaseDefs[0];
  const initialEnemyCoreId = initialEnemyPhase?.coreId || DEFAULT_CORE_ID;
  const initialEnemyCoreHp = (CORE_LIBRARY[initialEnemyCoreId]?.durability || DEFAULT_CORE_DURABILITY);

  const player = {
    hp: initialCoreMaxHp,
    maxHp: initialCoreMaxHp,
    mp: PLAYER_BASE_MP,
    maxMp: PLAYER_BASE_MP,
    manaRegen: 0,
    manaHearts: PLAYER_BATTLE_HEARTS,
    maxManaHearts: PLAYER_BATTLE_HEARTS,
    maxHearts: PLAYER_MAX_HEARTS,
    shield: 0,
    formulaBook: initialFormulaBook,
    activeFormulaIndex: initialActiveFormulaIndex,
    activeFormulaId: initialActiveFormula.id,
    activeCoreId: initialCoreId,
    coreDurabilityByCoreId: { [initialCoreId]: initialCoreMaxHp },
    spellSlots: [...initialActiveFormula.spellIds],
    coreCastCount: 0,
    runeDust: 0,
    relicPower: 0,
    statuses: {}
  };

  const enemy = {
    hp: initialEnemyCoreHp,
    maxHp: initialEnemyCoreHp,
    mp: 0,
    maxMp: initialEnemyPhase.enemyMaxMp,
    manaRegen: coreManaRegenPerSec(initialEnemyCoreId) + (initialEnemyPhase.enemyManaRegen || 0),
    coreId: initialEnemyCoreId,
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

  function coreMaxDurability(coreId) {
    if (TURN_BASED_COMBAT) return PLAYER_BASE_HP;
    const core = getCoreById(coreId);
    return Math.max(1, core?.durability || DEFAULT_CORE_DURABILITY);
  }

  function coreManaRegenPerSec(coreId) {
    if (TURN_BASED_COMBAT) return 0;
    const core = getCoreById(coreId);
    if (Number.isFinite(core?.manaRegenPerSec)) return Math.max(0, core.manaRegenPerSec);
    if (core?.rarity === "legendary") return 3;
    if (core?.rarity === "rare") return 2;
    return 1;
  }

  function corePassiveSummary(core) {
    if (!core) return "패시브 없음";
    const regen = coreManaRegenPerSec(core.id);
    const passiveText = core?.passive?.text || "패시브 없음";
    return `${passiveText} | 기본 마나재생 +${regen}/s`;
  }

  function ensureCoreDurabilityEntry(coreId) {
    if (!player.coreDurabilityByCoreId || typeof player.coreDurabilityByCoreId !== "object") {
      player.coreDurabilityByCoreId = {};
    }
    if (!Number.isFinite(player.coreDurabilityByCoreId[coreId])) {
      player.coreDurabilityByCoreId[coreId] = coreMaxDurability(coreId);
    }
  }

  function commitActiveCoreDurability() {
    if (TURN_BASED_COMBAT) return;
    const coreId = player.activeCoreId || getActiveFormula()?.coreId || DEFAULT_CORE_ID;
    ensureCoreDurabilityEntry(coreId);
    player.coreDurabilityByCoreId[coreId] = Math.max(0, Math.min(player.maxHp, player.hp));
  }

  function syncDurabilityWithActiveCore() {
    const active = getActiveFormula();
    const nextCoreId = active?.coreId || DEFAULT_CORE_ID;
    if (TURN_BASED_COMBAT) {
      player.activeCoreId = nextCoreId;
      player.maxHp = PLAYER_BASE_HP;
      player.hp = Math.max(0, Math.min(player.maxHp, player.hp));
      player.manaRegen = 0;
      return;
    }
    ensureCoreDurabilityEntry(nextCoreId);
    player.activeCoreId = nextCoreId;
    player.maxHp = coreMaxDurability(nextCoreId);
    player.hp = Math.max(0, Math.min(player.maxHp, player.coreDurabilityByCoreId[nextCoreId]));
    player.manaRegen = coreManaRegenPerSec(nextCoreId) + activeStartingTraitBonuses.manaRegenFlat;
  }

  function refillAllCoreDurabilities() {
    const ids = new Set(
      (player.formulaBook?.formulas || [])
        .map((formula) => formula?.coreId || DEFAULT_CORE_ID)
    );
    ids.add(DEFAULT_CORE_ID);
    ids.forEach((coreId) => {
      player.coreDurabilityByCoreId[coreId] = coreMaxDurability(coreId);
    });
  }

  function refreshStartingTraitBonuses() {
    selectedStartingTraitId = loadStartingTraitId();
    activeStartingTraitBonuses = buildStartingTraitBonuses(selectedStartingTraitId);
    state.playerDamageBonus = BASE_PLAYER_DAMAGE_BONUS + activeStartingTraitBonuses.damageBonusPct;
    player.maxMp = BASE_PLAYER_MAX_MP + activeStartingTraitBonuses.maxMpFlat;
    player.mp = Math.min(player.mp, player.maxMp);
    syncDurabilityWithActiveCore();
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
    commitActiveCoreDurability();
    const active = getActiveFormula();
    player.activeFormulaId = active.id;
    const slotMap = normalizeActionSlotMap(active.slotMap, active.spellIds);
    active.slotMap = slotMap;
    player.spellSlots = [slotMap[1], slotMap[2], slotMap[3], slotMap[4]];
    syncDurabilityWithActiveCore();
  }

  function syncActiveFormulaFromPlayerSlots() {
    const active = getActiveFormula();
    active.slotMap = normalizeActionSlotMap(active.slotMap, player.spellSlots);
    active.spellIds = spellIdsFromActionSlotMap(active.slotMap);
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

  function resetRunSpellProgress() {
    commitActiveCoreDurability();
    unlockedSpellSet = new Set(normalizeUnlockedSpellIds(STARTER_SPELL_IDS));
    saveUnlockedSpellSet();
    resetRunSpellProgressStorage();
    const freshBook = loadStoredFormulaBook([...DEFAULT_PLAYER_SPELL_SLOTS]);
    player.formulaBook = freshBook;
    player.activeFormulaIndex = freshBook.activeFormulaIndex;
    ensureActiveFormulaIndexUsable();
    player.coreDurabilityByCoreId = {};
    refillAllCoreDurabilities();
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    persistPlayerFormulaState();
    renderPrepLoadout();
    player.runeDust = 0;
    player.relicPower = 0;
    state.story.relicRewardCount = 0;
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

  function firstUnlockedFormulaIndex() {
    for (let i = 0; i < player.formulaBook.formulas.length; i += 1) {
      if (isFormulaCoreUnlocked(player.formulaBook.formulas[i])) return i;
    }
    return -1;
  }

  function ensureActiveFormulaIndexUsable() {
    const preferredIndex = Math.min(2, Math.max(0, Number.isInteger(player.activeFormulaIndex) ? player.activeFormulaIndex : 0));
    const preferredFormula = player.formulaBook.formulas[preferredIndex];
    const fallbackIndex = firstUnlockedFormulaIndex();
    const nextIndex = isFormulaCoreUnlocked(preferredFormula)
      ? preferredIndex
      : (fallbackIndex >= 0 ? fallbackIndex : 0);
    player.activeFormulaIndex = nextIndex;
    player.formulaBook.activeFormulaIndex = nextIndex;
    return nextIndex;
  }

  function nextUsableFormulaIndex() {
    for (let i = 0; i < player.formulaBook.formulas.length; i += 1) {
      if (i === player.activeFormulaIndex) continue;
      if (!isFormulaCoreUnlocked(player.formulaBook.formulas[i])) continue;
      if (!isFormulaBrokenByIndex(i)) return i;
    }
    return -1;
  }

  function handlePlayerFormulaBreak() {
    const brokenIndex = player.activeFormulaIndex;
    const broken = getActiveFormula();
    state.brokenFormulaIndexes.add(brokenIndex);
    ui.combatLog.push(`내 술식 파괴: ${broken?.name || `${brokenIndex + 1}번 술식`}.`, true);

    const nextIndex = nextUsableFormulaIndex();
    if (nextIndex < 0) {
      ui.combatLog.push("남은 술식이 없어 전투를 지속할 수 없다.", true);
      return false;
    }

    const nextFormula = player.formulaBook.formulas[nextIndex];
    const formulaHeartCost = usedHearts(nextFormula?.spellIds || []);
    if (!TURN_BASED_COMBAT && player.manaHearts < formulaHeartCost) {
      ui.combatLog.push(`마나하트 부족(${Math.floor(player.manaHearts)} / 필요 ${formulaHeartCost})으로 다음 술식 기동 실패.`, true);
      return false;
    }

    player.activeFormulaIndex = nextIndex;
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    resetCooldowns();
    player.shield = 0;
    player.coreCastCount = 0;
    state.castGap = 0;
    if (!TURN_BASED_COMBAT) {
      player.manaHearts = Math.max(0, player.manaHearts - formulaHeartCost);
      ui.combatLog.push(`${nextFormula?.name || `${nextIndex + 1}번 술식`} 자동 기동. (술식 점유량 -${formulaHeartCost})`, true);
    } else {
      ui.combatLog.push(`${nextFormula?.name || `${nextIndex + 1}번 술식`} 자동 기동.`, true);
    }
    return true;
  }

  function setWorldMode(mode) {
    if (mode !== "story" && state.story.revealTimer) {
      clearTimeout(state.story.revealTimer);
      state.story.revealTimer = null;
      state.story.revealToken += 1;
    }
    state.worldMode = mode;
    document.body.classList.toggle("story-mode", mode === "story");
    document.body.classList.toggle("battle-mode", mode === "battle");
  }

  function pushStoryLog(text) {
    if (typeof text !== "string" || !text.trim()) return;
    state.story.sceneNotes.push(text.trim());
    persistStoryProgressSnapshot();
    if (state.worldMode === "story") {
      renderStoryScene();
    }
  }

  function isRewardLikeText(text) {
    return /(보상|해금|획득)/.test(String(text || ""));
  }

  function renderStoryLogs() {
    if (!dom.storyLog) return;
    dom.storyLog.innerHTML = "";
    state.story.sceneNotes.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      if (isRewardLikeText(line)) item.classList.add("reward");
      dom.storyLog.appendChild(item);
    });
  }

  function makeRandomStartingTraitOfferIds() {
    const ids = STARTING_TRAITS.map((trait) => trait.id);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids.slice(0, 3);
  }

  function fillEarlyEmptyActionSlots() {
    const active = getActiveFormula();
    if (!active) return false;
    const slotMap = normalizeActionSlotMap(active.slotMap, active.spellIds);
    const used = new Set(Object.values(slotMap).filter(Boolean));
    const pool = unlockedSpellList()
      .filter((spell) => spell.circle <= 1 && !used.has(spell.id))
      .sort((a, b) => {
        if (a.manaCost !== b.manaCost) return a.manaCost - b.manaCost;
        if (a.cooldown !== b.cooldown) return a.cooldown - b.cooldown;
        return a.id.localeCompare(b.id);
      });
    // Ensure early turns have at least 3 actionable options in true fresh runs.
    const fallbackStarterIds = ["blue_frost_poke", "green_absorb", "yellow_stone_lance", "white_ray_pierce"];
    let unlockedFallback = false;
    fallbackStarterIds.forEach((id) => {
      if (pool.length >= 3) return;
      if (!spellLibrary[id] || used.has(id)) return;
      if (!isSpellUnlocked(id)) {
        unlockedSpellSet.add(id);
        unlockedFallback = true;
      }
      const spell = spellLibrary[id];
      if (!pool.some((item) => item.id === id)) pool.push(spell);
    });
    if (unlockedFallback) {
      saveUnlockedSpellSet();
    }
    pool.sort((a, b) => {
      if (a.manaCost !== b.manaCost) return a.manaCost - b.manaCost;
      if (a.cooldown !== b.cooldown) return a.cooldown - b.cooldown;
      return a.id.localeCompare(b.id);
    });
    let changed = false;
    for (let slot = 1; slot <= 4; slot += 1) {
      if (slotMap[slot]) continue;
      const pick = pool.shift();
      if (!pick) break;
      slotMap[slot] = pick.id;
      used.add(pick.id);
      changed = true;
    }
    if (!changed) return false;
    active.slotMap = slotMap;
    active.spellIds = spellIdsFromActionSlotMap(slotMap);
    active.totalCircle = calcFormulaCircle(active.spellIds);
    syncPlayerSlotsFromActiveFormula();
    persistPlayerFormulaState();
    return true;
  }

  function renderStartingTraitChoices(traitIds) {
    if (!dom.startTraitChoices) return;
    dom.startTraitChoices.innerHTML = "";
    traitIds.forEach((traitId) => {
      const trait = getStartingTraitById(traitId);
      if (!trait) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `start-trait-btn ${traitPrimaryColor(trait.id)}`;
      button.innerHTML = `
        <strong>${trait.name}</strong>
        <span>${trait.description}</span>
      `;
      button.addEventListener("click", () => {
        saveStartingTraitId(trait.id);
        clearStartingTraitOfferIds();
        refreshStartingTraitBonuses();
        const unlocked = applyStartingTraitUnlocks(trait.id);
        const autoFilled = fillEarlyEmptyActionSlots();
        if (dom.startTraitPanel) {
          dom.startTraitPanel.classList.add("hidden");
        }
        const unlockNames = unlocked.map((id) => spellLibrary[id]?.name || id).join(", ");
        pushStoryLog(
          unlocked.length > 0
            ? `시작 특전 선택: ${trait.name} (${unlockNames} 해금)`
            : `시작 특전 선택: ${trait.name}`
        );
        ui.combatLog.push(`시작 특전: ${trait.name}.`, true);
        if (autoFilled) {
          ui.combatLog.push("초반 자동 세팅: 빈 슬롯을 1서클 주문으로 채웠습니다.");
        }
        persistStoryProgressSnapshot();
        renderPrepLoadout();
        renderStoryHeroInfo();
        renderStoryScene();
        updateUI();
      });
      dom.startTraitChoices.appendChild(button);
    });
  }

  function showStartingTraitPanelIfNeeded() {
    if (!dom.startTraitPanel) return;
    const traitId = loadStartingTraitId();
    if (traitId) {
      refreshStartingTraitBonuses();
      applyStartingTraitUnlocks(traitId);
      dom.startTraitPanel.classList.add("hidden");
      return;
    }
    const offered = loadStartingTraitOfferIds() || makeRandomStartingTraitOfferIds();
    saveStartingTraitOfferIds(offered);
    renderStartingTraitChoices(offered);
    dom.startTraitPanel.classList.remove("hidden");
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

  function startingTraitSummaryText() {
    const trait = getStartingTraitById(selectedStartingTraitId);
    if (!trait) return "없음";
    const parts = [];
    if (activeStartingTraitBonuses.manaRegenFlat > 0) parts.push(`마나재생 +${activeStartingTraitBonuses.manaRegenFlat}/s`);
    if (activeStartingTraitBonuses.maxMpFlat > 0) parts.push(`최대마나 +${activeStartingTraitBonuses.maxMpFlat}`);
    if (activeStartingTraitBonuses.openingManaFlat > 0) parts.push(`시작마나 +${activeStartingTraitBonuses.openingManaFlat}`);
    if (activeStartingTraitBonuses.damageBonusPct > 0) parts.push(`피해 +${Math.round(activeStartingTraitBonuses.damageBonusPct * 100)}%`);
    if (activeStartingTraitBonuses.damageReductionPct > 0) parts.push(`피해감소 +${Math.round(activeStartingTraitBonuses.damageReductionPct * 100)}%`);
    if (activeStartingTraitBonuses.cooldownRecoveryMul > 1) {
      parts.push(`쿨회복 +${Math.round((activeStartingTraitBonuses.cooldownRecoveryMul - 1) * 100)}%`);
    }
    return parts.length > 0 ? `${trait.name} (${parts.join(", ")})` : trait.name;
  }

  function renderStoryHeroInfo() {
    if (!dom.storyHeroInfo) return;
    const portraitPath = "assets/player/player_wandering_mage_pixel.png";
    const lines = [
      "이름: 마법사",
      `시작 특전: ${startingTraitSummaryText()}`,
      `마나하트: ${Math.floor(player.manaHearts)} / ${player.maxManaHearts}`,
      `술식 점유 한도: ${player.maxHearts}`,
      `해금 주문: ${unlockedSpellSet.size} / ${spellList.length}`,
      `해금 술식핵: ${unlockedCoreSet.size} / ${Object.keys(CORE_LIBRARY).length}`,
      `기억의 파편: ${state.story.memoryFragments}`,
      `적 술식 정보: ${state.story.enemyIntel}`,
      `룬가루: ${Math.floor(player.runeDust || 0)}`,
      `유물력: ${Math.floor(player.relicPower || 0)} (액트 유물 보상 ${state.story.relicRewardCount}/2)`,
      `획득 술식핵: ${state.story.relics.length > 0 ? state.story.relics.join(", ") : "없음"}`
    ];
    dom.storyHeroInfo.innerHTML = `
      <div class="story-hero-head">
        <img src="${portraitPath}" alt="마법사 초상화" class="story-hero-portrait">
      </div>
      ${lines.map((line) => `<p>${line}</p>`).join("")}
    `;
  }

  function renderStoryChoices(choices, onPick) {
    if (dom.storyMapPanel) {
      dom.storyMapPanel.classList.add("hidden");
      dom.storyMapPanel.classList.remove("popup-open");
    }
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
    const validOptions = options.filter((index) => index >= 0 && index < act1Scenes.length);
    const fallbackIndex = state.story.sceneIndex + 1;
    const nextIndex = validOptions.length > 0
      ? validOptions[randomInt(0, validOptions.length - 1)]
      : fallbackIndex;

    if (dom.storyMapPanel) {
      dom.storyMapPanel.classList.add("hidden");
      dom.storyMapPanel.classList.remove("popup-open");
    }
    if (dom.storyChoices) dom.storyChoices.classList.add("hidden");

    const path = Array.isArray(state.story.routePath) ? [...state.story.routePath] : [];
    if (path.length === 0 || path[path.length - 1] !== state.story.sceneIndex) path.push(state.story.sceneIndex);
    if (nextIndex >= 0 && nextIndex < act1Scenes.length) {
      path.push(nextIndex);
      state.story.routePath = path;
      state.story.sceneIndex = nextIndex;
    } else {
      state.story.routePath = path;
      state.story.sceneIndex = act1Scenes.length;
    }
    persistStoryProgressSnapshot();
    renderStoryScene();
  }

  function renderContinueChoice() {
    renderStoryChoices([{ label: "여정 이어가기." }], () => {
      state.story.awaitingContinue = false;
      persistStoryProgressSnapshot();
      renderSceneMapChoice();
    });
  }

  function sceneContinueButton() {
    state.story.awaitingContinue = true;
    persistStoryProgressSnapshot();
    if (state.story.revealTimer) return;
    renderContinueChoice();
  }

  function startStoryBattle(config) {
    state.story.awaitingBattle = true;
    state.story.pendingBattle = config;
    flushProgressSnapshot();
    setEnemyProfile(config.enemyProfileId || "allen");
    setWorldMode("battle");
    resetBattle({ preservePlayerVitals: true });

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
    flushProgressSnapshot();
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
      const randomBattleConfig = (randomScene && randomScene.battleConfig && typeof randomScene.battleConfig === "object")
        ? randomScene.battleConfig
        : {};
      startStoryBattle({
        enemyName: randomScene?.enemyName || "이형체",
        enemyProfileId: randomScene?.enemyProfileId || "road_wraith",
        phase1EnemyHpMul: typeof randomBattleConfig.phase1EnemyHpMul === "number" ? randomBattleConfig.phase1EnemyHpMul : 0.95,
        phase1EnemyMpMul: typeof randomBattleConfig.phase1EnemyMpMul === "number" ? randomBattleConfig.phase1EnemyMpMul : undefined,
        resetToStartScene: true,
        onWin: () => {
          if (randomScene?.winLog) pushStoryLog(randomScene.winLog);
        },
        onLose: () => {
          state.story.sceneIndex = 0;
          state.story.routePath = [0];
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
    if (effectId === "druid_teach") {
      state.story.memoryFragments += 1;
      state.story.enemyIntel += 1;
      pushStoryLog("은거한 드루이드가 술식 순환의 요체를 전한다.");
      pushStoryLog("\"힘은 빌리는 것이 아니라, 감당하는 것이다.\"");
      pushStoryLog("기억의 파편 +1, 적 정보 +1");
      sceneContinueButton();
      return;
    }
    if (effectId === "druid_detour") {
      pushStoryLog("당신은 시선을 거두고 숲의 결계를 피해 우회로를 택했다.");
      pushStoryLog("멀어지는 뒤편에서 지팡이가 땅을 짚는 소리가 한 번 울린다.");
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_inn_raid") {
      startStoryBattle({
        enemyName: "여관 급습대",
        enemyProfileId: "inn_raider",
        phase1EnemyHpMul: 1.05,
        onWin: () => {
          pushStoryLog("여관 내부는 부서지고 불길이 천장에 번진다.");
          pushStoryLog("부하들은 쓰러졌다. 여관 주인은 벽에 기대어 앉아 있다.");
          pushStoryLog("\"괜찮소… 나도 언젠가는 이렇게 끝날 거였소.\"");
          pushStoryLog("그는 현상금 문서를 건넨다. 문서에는 청색 마탑 봉인이 찍혀 있다.");
          pushStoryLog("\"영원의 마탑을 찾는 자… 수도로 가시오. 황실 마법사가 아직 버티고 있소.\"");
          pushStoryLog("1막 종료. 불타는 여관을 등지고 주인공은 동쪽, 수도를 바라본다.");
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
      pushStoryLog(`술식 점유 한도 +1 (현재 ${player.maxHearts})`);
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
      pushStoryLog("술식 점유 한도 +1, 다음 보스가 강화됩니다.");
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
    if (dom.storyMapPanel) {
      dom.storyMapPanel.classList.add("hidden");
      dom.storyMapPanel.classList.remove("popup-open");
    }
    if (dom.storyChoices) dom.storyChoices.classList.remove("hidden");
    if (dom.storyChoices) dom.storyChoices.innerHTML = "";
    renderStoryHeroInfo();
    const scene = act1Scenes[state.story.sceneIndex];
    if (!scene) {
      stopStoryReveal();
      dom.storySceneTitle.textContent = "ACT 1 종료";
      dom.storySceneBody.textContent = "첫 루프의 기록이 완료되었습니다. 다음 ACT를 준비 중입니다.";
      if (dom.storyLog) dom.storyLog.innerHTML = "";
      dom.storyChoices.innerHTML = "";
      dom.storyArtImg.removeAttribute("src");
      dom.storyArtImg.classList.add("story-art-empty");
      dom.storyArtFrame.classList.add("empty", "tone-neutral");
      dom.storyArtFrame.classList.remove("tone-blue", "tone-green", "tone-amber", "tone-red");
      persistStoryProgressSnapshot();
      return;
    }
    if (state.story.inlineSceneId !== scene.id) {
      stopStoryReveal();
      state.story.inlineSceneId = scene.id;
      state.story.inlineStep = 0;
      state.story.sceneNotes = [];
      state.story.awaitingContinue = false;
      state.story.renderedBody = "";
      state.story.lastBodyScrollHeight = 0;
    }
    dom.storySceneTitle.textContent = `🜂 ACT 1 - ${scene.title}`;
    const inlineData = parseInlineStoryBody(scene.body || "");
    const step = Math.max(0, Math.min(state.story.inlineStep || 0, inlineData.prompts.length));
    const visibleBody = inlineData.segments.slice(0, step + 1).join("\n").replace(/\n{3,}/g, "\n\n").trim();
    const sceneBodyText = visibleBody || scene.body;
    renderStoryLogs();
    const sceneId = scene.id;
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
    persistStoryProgressSnapshot();

    playStoryReveal(sceneBodyText, () => {
      if (state.story.inlineSceneId !== sceneId || state.story.sceneIndex < 0 || state.story.sceneIndex >= act1Scenes.length) return;
      if (state.story.awaitingContinue) {
        renderContinueChoice();
        return;
      }
      if (step < inlineData.prompts.length) {
        const prompt = inlineData.prompts[step] || "다음";
        renderStoryChoices([{ label: `▶ ${prompt}`, effect: "__inline_continue__" }], () => {
          state.story.inlineStep = step + 1;
          renderStoryScene();
        });
        return;
      }

      renderStoryChoices(scene.choices, (choice) => {
        applySceneEffect(choice.effect);
        renderStoryHeroInfo();
      });
    });
  }

  function parseInlineStoryBody(text) {
    const body = typeof text === "string" ? text : "";
    const lines = body.split("\n");
    const segments = [];
    const prompts = [];
    let acc = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("▶")) {
        segments.push(acc.join("\n"));
        prompts.push(trimmed.replace(/^▶\s*/, "").trim() || "다음");
        acc = [];
      } else {
        acc.push(line);
      }
    });
    segments.push(acc.join("\n"));
    return { segments, prompts };
  }

  function stopStoryReveal() {
    completeStoryReveal(false);
    state.story.revealToken += 1;
  }

  function completeStoryReveal(callOnDone = false) {
    if (state.story.revealTimer) {
      clearTimeout(state.story.revealTimer);
      state.story.revealTimer = null;
    }
    const finalText = String(state.story.revealTarget || state.story.renderedBody || "").trim();
    const done = state.story.revealOnDone;
    if (finalText) {
      state.story.renderedBody = finalText;
      syncStoryBody(finalText, false);
    }
    state.story.revealTarget = "";
    state.story.revealOnDone = null;
    if (callOnDone && typeof done === "function") {
      done();
    }
    updateStoryRevealControls();
  }

  function revealDelayByChar(ch) {
    const speed = Math.max(1, Number(state.story.revealSpeedMult) || 1);
    if (!ch) return Math.max(10, Math.round(38 / speed));
    if (ch === "\n") return Math.max(10, Math.round(95 / speed));
    if (/\s/.test(ch)) return Math.max(10, Math.round(32 / speed));
    if (/[.!?…]/.test(ch)) return Math.max(10, Math.round(170 / speed));
    if (/[,:;]/.test(ch)) return Math.max(10, Math.round(125 / speed));
    return Math.max(10, Math.round(42 / speed));
  }

  function syncStoryBody(body, animateLastChar = false) {
    if (!dom.storySceneBody) return;
    const beforeHeight = state.story.lastBodyScrollHeight || dom.storySceneBody.scrollHeight || 0;
    const text = String(body || "");
    if (!text) {
      dom.storySceneBody.textContent = "📖";
      state.story.lastBodyScrollHeight = dom.storySceneBody.scrollHeight || 0;
      return;
    }

    if (!animateLastChar || text.length < 1) {
      dom.storySceneBody.textContent = `📖 ${text}`;
    } else {
      const lead = text.slice(0, -1);
      const tail = text.slice(-1);
      dom.storySceneBody.textContent = `📖 ${lead}`;
      const charNode = document.createElement("span");
      charNode.className = "story-ink-char";
      charNode.textContent = tail;
      dom.storySceneBody.appendChild(charNode);
    }

    const afterHeight = dom.storySceneBody.scrollHeight || 0;
    if (afterHeight > beforeHeight + 0.5) {
      dom.storySceneBody.scrollTop = afterHeight;
    }
    state.story.lastBodyScrollHeight = afterHeight;
  }

  function playStoryReveal(targetBody, onDone) {
    const next = String(targetBody || "").trim();
    const prev = String(state.story.renderedBody || "").trim();
    if (state.story.revealTimer) {
      completeStoryReveal(false);
    }
    stopStoryReveal();
    state.story.revealTarget = next;
    state.story.revealOnDone = onDone;

    if (!next) {
      state.story.renderedBody = "";
      syncStoryBody("");
      state.story.revealTarget = "";
      state.story.revealOnDone = null;
      updateStoryRevealControls();
      if (typeof onDone === "function") onDone();
      return;
    }

    let shown = prev;
    if (!next.startsWith(prev)) {
      shown = "";
    }
    if (shown === next) {
      syncStoryBody(next);
      state.story.revealTarget = "";
      state.story.revealOnDone = null;
      updateStoryRevealControls();
      if (typeof onDone === "function") onDone();
      return;
    }

    let cursor = shown.length;
    const token = state.story.revealToken;
    syncStoryBody(shown);

    const tick = () => {
      if (state.story.revealToken !== token) return;
      cursor += 1;
      const body = next.slice(0, cursor);
      state.story.renderedBody = body;
      syncStoryBody(body, true);
      if (cursor >= next.length) {
        state.story.revealTimer = null;
        state.story.revealTarget = "";
        state.story.revealOnDone = null;
        updateStoryRevealControls();
        if (typeof onDone === "function") onDone();
        return;
      }
      state.story.revealTimer = setTimeout(tick, revealDelayByChar(next[cursor - 1]));
    };

    updateStoryRevealControls();
    state.story.revealTimer = setTimeout(tick, Math.max(10, Math.round(60 / Math.max(1, Number(state.story.revealSpeedMult) || 1))));
  }

  function randomSample(items, count = 3) {
    const pool = [...items];
    const picked = [];
    while (pool.length > 0 && picked.length < count) {
      const idx = randomInt(0, pool.length - 1);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }

  function applyPostBattleRewardChoice(choice) {
    if (!choice) return;
    if (choice.type === "hp") {
      player.maxHp += 12;
      player.hp = Math.min(player.maxHp, player.hp + 12);
      pushStoryLog("전투 보상: 체력 강화 (최대 HP +12, HP +12)");
      return;
    }
    if (choice.type === "mp") {
      player.maxMp += 12;
      player.mp = Math.min(player.maxMp, player.mp + 12);
      pushStoryLog("전투 보상: 마나 강화 (최대 MP +12, MP +12)");
      return;
    }
    if (choice.type === "rune") {
      player.runeDust = Math.max(0, Math.floor((player.runeDust || 0) + 20));
      pushStoryLog("전투 보상: 룬가루 +20");
      return;
    }
    if (choice.type === "relic") {
      player.relicPower = Math.max(0, Math.floor((player.relicPower || 0) + 1));
      state.story.relicRewardCount = Math.min(2, Math.floor((state.story.relicRewardCount || 0) + 1));
      pushStoryLog(`전투 보상: 유물 획득 (유물력 ${player.relicPower}, 전투 시작 MP +${player.relicPower * 2})`);
      return;
    }
  }

  function offerPostBattleReward(onDone) {
    const basePool = [
      { type: "hp", label: "체력 +12 / 최대체력 +12" },
      { type: "mp", label: "마나 +12 / 최대마나 +12" },
      { type: "rune", label: "룬가루 +20" },
      { type: "rune", label: "룬가루 +30", bonus: 10 }
    ];
    if ((state.story.relicRewardCount || 0) < 2) {
      basePool.push({ type: "relic", label: "유물 획득 (전투 시작 MP 강화)" });
    }
    const picks = randomSample(basePool, 3);
    renderStoryChoices(
      picks.map((choice) => ({ label: `[전투 보상] ${choice.label}`, rewardChoice: choice })),
      (selected) => {
        const choice = selected.rewardChoice;
        if (choice?.type === "rune" && choice?.bonus) {
          player.runeDust = Math.max(0, Math.floor((player.runeDust || 0) + 20 + choice.bonus));
          pushStoryLog(`전투 보상: 룬가루 +${20 + choice.bonus}`);
        } else {
          applyPostBattleRewardChoice(choice);
        }
        renderStoryHeroInfo();
        persistStoryProgressSnapshot();
        if (typeof onDone === "function") onDone();
      }
    );
  }

  function resolveStoryBattle(result) {
    if (!state.story.awaitingBattle || !state.story.pendingBattle) return;
    const pending = state.story.pendingBattle;
    state.story.awaitingBattle = false;
    state.story.pendingBattle = null;
    flushProgressSnapshot();

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
    resetBattle({ preservePlayerVitals: true });
    if (result !== "victory" && pending.resetToStartScene) {
      resetRunSpellProgress();
      state.story.sceneIndex = 0;
      state.story.routePath = [0];
      flushProgressSnapshot();
      renderStoryScene();
      return;
    }
    if (result === "victory") {
      offerPostBattleReward(() => {
        sceneContinueButton();
        renderStoryHeroInfo();
        flushProgressSnapshot();
      });
    } else {
      sceneContinueButton();
      renderStoryHeroInfo();
      flushProgressSnapshot();
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function resetResonanceBoard() {
    state.resonanceBoard = Array.from({ length: 9 }, () => null);
  }

  function renderResonanceBoard() {
    if (!dom.resonanceGrid) return;
    const resonanceMarkSummary = (color) => {
      if (color === "red") return "즉시 피해 +1";
      if (color === "blue") return "MP +1";
      if (color === "green") return "재생 1스택";
      if (color === "yellow") return "보호막 +1";
      if (color === "white") return "디버프 1스택 해제";
      if (color === "black") return "적 디버프 1스택 부여";
      return "효과 없음";
    };
    const markColorKo = (color) => {
      const map = { red: "적", blue: "청", yellow: "황", green: "녹", white: "백", black: "흑" };
      return map[color] || color || "-";
    };

    dom.resonanceGrid.innerHTML = "";
    let activeMarks = 0;
    const activeByColor = { red: 0, blue: 0, green: 0, yellow: 0, white: 0, black: 0 };
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement("div");
      cell.className = "resonance-cell";
      const mark = state.resonanceBoard[i];
      if (mark && mark.color) {
        activeMarks += 1;
        if (activeByColor[mark.color] || activeByColor[mark.color] === 0) {
          activeByColor[mark.color] += 1;
        }
        cell.classList.add(mark.color);
        cell.textContent = String(Math.max(1, mark.duration || 1));
        cell.tabIndex = 0;
        const detail = `공명 ${i + 1}번 칸\n각인: ${markColorKo(mark.color)}\n효과: ${resonanceMarkSummary(mark.color)}\n지속 턴: ${Math.max(1, mark.duration || 1)}`;
        cell.title = detail.replace(/\n/g, " | ");
        cell.addEventListener("mouseenter", () => setBattleActionDetail(detail));
        cell.addEventListener("focus", () => setBattleActionDetail(detail));
        cell.addEventListener("click", () => setBattleActionDetail(detail));
        cell.addEventListener("touchstart", () => setBattleActionDetail(detail), { passive: true });
      }
      dom.resonanceGrid.appendChild(cell);
    }
    if (dom.resonanceHint) {
      if (activeMarks <= 0) {
        dom.resonanceHint.textContent = "공명 각인 없음";
      } else {
        const topColor = Object.entries(activeByColor).sort((a, b) => b[1] - a[1])[0]?.[0] || "red";
        const topText = resonanceMarkSummary(topColor);
        dom.resonanceHint.textContent = `공명 각인 ${activeMarks}칸 · 주효과: ${topText}`;
      }
    }
  }

  function oneDebuffStackOffPlayer() {
    const debuffOrder = ["burn", "poison", "slow", "freeze", "stun", "weak", "petrify", "blind", "confuse"];
    for (const id of debuffOrder) {
      const st = player.statuses[id];
      if (!st) continue;
      st.stacks = Math.max(0, (st.stacks || 1) - 1);
      if (st.stacks <= 0) delete player.statuses[id];
      return id;
    }
    return null;
  }

  function applyBlackRandomDebuffToEnemy() {
    const pool = [
      { id: "weak", stacks: 1, duration: 2, vulnPct: 10 },
      { id: "slow", stacks: 1, duration: 2, slowPct: 12, cooldownRate: 0.88 },
      { id: "burn", stacks: 1, duration: 2, dps: 1, stackDecayOnHealthHit: 1 },
      { id: "poison", stacks: 1, duration: 2, dps: 1, decayPerTick: 1 }
    ];
    const pick = pool[randomInt(0, pool.length - 1)];
    systems.statusSystem.applyEnemy(pick);
    recordPlayerAppliedStatus(pick);
    return pick.id;
  }

  function applyResonanceEffectFromMark(markColor) {
    if (markColor === "red") {
      enemy.hp = Math.max(0, enemy.hp - 1);
      recordPlayerDealtDamage(1);
      ui.damageFloat.show(1, "red");
      ui.combatLog.push("공명(적): 즉시 피해 +1");
      return { triggered: true, damage: 1, effect: "damage" };
    }
    if (markColor === "blue") {
      player.mp = player.mp + 1;
      ui.combatLog.push("공명(청): MP +1");
      return { triggered: true, damage: 0, effect: "mana" };
    }
    if (markColor === "green") {
      systems.statusSystem.applyPlayer({ id: "regen", stacks: 1, duration: 2, healPerTick: 1 });
      ui.combatLog.push("공명(녹): 재생 1스택");
      return { triggered: true, damage: 0, effect: "regen" };
    }
    if (markColor === "yellow") {
      player.shield += 1;
      ui.combatLog.push("공명(황): 보호막 +1");
      return { triggered: true, damage: 0, effect: "shield" };
    }
    if (markColor === "white") {
      const removed = oneDebuffStackOffPlayer();
      if (removed) ui.combatLog.push(`공명(백): ${statusName(removed)} 1스택 해제`);
      else ui.combatLog.push("공명(백): 해제할 디버프 없음");
      return { triggered: true, damage: 0, effect: "cleanse" };
    }
    if (markColor === "black") {
      const applied = applyBlackRandomDebuffToEnemy();
      ui.combatLog.push(`공명(흑): ${statusName(applied)} 1스택 부여`);
      return { triggered: true, damage: 0, effect: "debuff" };
    }
    return { triggered: false, damage: 0, effect: "none" };
  }

  function resonancePatternForSpell(spell) {
    const basePatterns = [
      [4],
      [1],
      [3],
      [5],
      [7],
      [4, 1],
      [4, 3],
      [4, 5],
      [4, 7],
      [1, 5],
      [3, 7],
      [4, 1, 5],
      [4, 3, 7],
      [4, 0, 8],
      [4, 2, 6],
      [0, 2, 4, 6, 8]
    ];
    const seed = Math.abs(hashCode(spell?.id || "spell"));
    const selected = basePatterns[seed % basePatterns.length] || [4];
    const circle = Math.max(1, Math.floor(spell?.circle || spell?.heartCost || 1));
    const limit = circle >= 5 ? 4 : circle >= 4 ? 4 : circle >= 3 ? 3 : circle >= 2 ? 2 : 1;
    return selected.slice(0, Math.max(1, limit));
  }

  function applyPlayerSpellResonance(spell) {
    const pattern = resonancePatternForSpell(spell);
    const summary = { triggered: 0, totalDamage: 0 };
    pattern.forEach((idx) => {
      if (idx < 0 || idx >= 9) return;
      const existing = state.resonanceBoard[idx];
      if (existing && existing.color) {
        const result = applyResonanceEffectFromMark(existing.color);
        if (result?.triggered) {
          summary.triggered += 1;
          summary.totalDamage += Math.max(0, result.damage || 0);
        }
      }
      state.resonanceBoard[idx] = { color: spell.color, duration: 3, turnPlaced: state.turnCount };
    });
    renderResonanceBoard();
    return summary;
  }

  function pendingResonanceTriggerCount(spell) {
    const pattern = resonancePatternForSpell(spell);
    return pattern.reduce((count, idx) => {
      if (idx < 0 || idx >= 9) return count;
      const mark = state.resonanceBoard[idx];
      return mark && mark.color ? count + 1 : count;
    }, 0);
  }

  function decayResonanceBoardTurn() {
    for (let i = 0; i < state.resonanceBoard.length; i += 1) {
      const mark = state.resonanceBoard[i];
      if (!mark) continue;
      mark.duration = Math.max(0, (mark.duration || 0) - 1);
      if (mark.duration <= 0) state.resonanceBoard[i] = null;
    }
    renderResonanceBoard();
  }

  function canPlayerAct() {
    return state.mode === "running" && state.turnPhase === "player" && TURN_BASED_COMBAT;
  }

  function restoreTurnStartMp() {
    const traitRegen = Math.max(0, Math.floor(activeStartingTraitBonuses.manaRegenFlat || 0));
    const gain = TURN_BASED_BASE_MP_RECOVERY + traitRegen;
    if (gain <= 0) return 0;
    const before = Math.floor(player.mp);
    player.mp = Math.min(player.maxMp, player.mp + gain);
    return Math.max(0, Math.floor(player.mp) - before);
  }

  function beginPlayerTurn(options = {}) {
    const advanceTurn = options.advanceTurn !== false;
    if (advanceTurn) {
      state.turnCount += 1;
    } else {
      state.turnCount = Math.max(1, state.turnCount || 1);
    }
    state.turnPhase = "player";
    resetCooldowns();
    Object.keys(enemy.cooldowns).forEach((id) => {
      enemy.cooldowns[id] = 0;
    });
    const recovered = restoreTurnStartMp();
    if (recovered > 0) {
      ui.combatLog.push(`턴 ${state.turnCount} 시작: 플레이어 차례. MP +${recovered}.`);
    } else {
      ui.combatLog.push(`턴 ${state.turnCount} 시작: 플레이어 차례.`);
    }
    setBattleActionDetail(recommendedPlayerActionDetail());
  }

  function endTurnRound() {
    systems.statusSystem.tickEnemy(1);
    systems.statusSystem.tickPlayer(1);
    decayResonanceBoardTurn();
    if (systems.phaseSystem.maybeHandlePhaseDeath()) return;
    if (player.hp <= 0 && state.mode === "running") {
      if (handlePlayerFormulaBreak()) return;
      state.mode = "defeat";
      systems.combatLoop.setPaused(true);
      ui.combatLog.push("전투 패배.", true);
      resolveStoryBattle("defeat");
      return;
    }
    beginPlayerTurn({ advanceTurn: true });
  }

  function averageDamageRange(range) {
    if (!Array.isArray(range) || range.length < 2) return 0;
    return ((Number(range[0]) || 0) + (Number(range[1]) || 0)) / 2;
  }

  function pickVoiceLine(lines, fallback = "") {
    if (Array.isArray(lines) && lines.length > 0) {
      return lines[randomInt(0, lines.length - 1)];
    }
    if (typeof lines === "string" && lines.trim()) return lines;
    return fallback;
  }

  function enemyVoiceSet() {
    const profile = currentEnemyProfile();
    return ENEMY_BESTIARY[profile.id]?.voice || {};
  }

  function enemyOpeningMent() {
    const voice = enemyVoiceSet();
    return pickVoiceLine(voice.opening, `${currentEnemyProfile().name}이 낮게 읊조린다.`);
  }

  function chooseEnemyTurnAction() {
    const castable = enemy.spellSlots
      .map((spellId, slotIndex) => ({ spellId, slotIndex, spell: enemySpellLibrary[spellId] }))
      .filter((entry) => entry.spell && enemy.mp >= entry.spell.manaCost);
    if (castable.length < 1) return { type: "basic" };

    const playerHpRate = player.maxHp > 0 ? (player.hp / player.maxHp) : 1;
    const enemyHpRate = enemy.maxHp > 0 ? (enemy.hp / enemy.maxHp) : 1;
    const playerControlWeak = !player.statuses.stun && !player.statuses.freeze && !player.statuses.petrify;

    let best = null;
    castable.forEach((entry) => {
      const spell = entry.spell;
      let score = 0;
      score += averageDamageRange(spell.damage) * 10;

      if (playerHpRate <= 0.35) score += averageDamageRange(spell.damage) * 8;
      if (enemyHpRate <= 0.35 && (spell.mpRestore || spell.manaFlow || spell.manaOnEvent || spell.manaOnCondition)) score += 70;
      if (spell.shieldBreakMul && player.shield > 0) score += 40;

      const statusId = spell.addPlayerStatus?.id || spell.applyPlayerStatus?.id || "";
      if (statusId) {
        const hasAlready = Boolean(player.statuses[statusId]);
        score += hasAlready ? 10 : 26;
        if (playerControlWeak && (statusId === "stun" || statusId === "freeze" || statusId === "petrify" || statusId === "confuse")) {
          score += 42;
        }
      }

      if (spell.mpRestore) score += 24;
      if (spell.manaFlow) score += 18;
      if (spell.manaOnEvent || spell.manaOnCondition) score += 14;
      if (enemy.mp < (enemy.maxMp * 0.4) && spell.manaCost <= Math.max(1, Math.floor(enemy.maxMp * 0.45))) score += 10;
      if (spell.manaCost > enemy.mp * 0.8) score -= 8;

      if (!best || score > best.score) {
        best = { ...entry, score };
      }
    });

    if (!best) return { type: "basic" };
    return { type: "spell", spellId: best.spellId, slotIndex: best.slotIndex };
  }

  function enemyActionTelegraph(action) {
    const voice = enemyVoiceSet();
    if (!action || action.type !== "spell") {
      return pickVoiceLine(voice.basic, "적이 무기를 고쳐 쥐었다. 직접 타격이 올 것 같다.");
    }
    const spell = enemySpellLibrary[action.spellId];
    if (!spell) return pickVoiceLine(voice.recover, "적이 마력을 끌어올리고 있다.");
    if (spell.addPlayerStatus || spell.applyPlayerStatus) {
      return pickVoiceLine(voice.control, "상태이상 계열 전조가 감지된다.");
    }
    if (spell.mpRestore || spell.manaFlow || spell.manaOnEvent || spell.manaOnCondition) {
      return pickVoiceLine(voice.recover, "자원 회복 동작이 보인다.");
    }
    const avg = averageDamageRange(spell.damage);
    if (avg >= 20) return pickVoiceLine(voice.burst, "강한 일격 전조가 보인다.");
    return pickVoiceLine(voice.basic, "직접 타격 전조가 보인다.");
  }

  function executeEnemyTurn() {
    if (state.mode !== "running") return;
    if (enemy.statuses.stun || enemy.statuses.freeze) {
      ui.combatLog.push("적이 행동 불가 상태다.");
      endTurnRound();
      return;
    }
    if (enemy.statuses.confuse && Math.random() < (enemy.statuses.confuse.miscastChance || 0.3)) {
      ui.combatLog.push("적이 혼란으로 행동에 실패했다.");
      endTurnRound();
      return;
    }
    const action = chooseEnemyTurnAction();
    ui.combatLog.push(`적의 예고: ${enemyActionTelegraph(action)}`);
    if (action.type === "spell") {
      castEnemySpell(action.spellId, { slotIndex: action.slotIndex });
    } else {
      const dmg = randomInt(2, 4);
      dealPlayerDamage(dmg);
      ui.combatLog.push(`적의 기본 공격! ${dmg} 피해.`);
    }
    endTurnRound();
  }

  function performPlayerStaffAttack() {
    if (!canPlayerAct()) return;
    const dmg = randomInt(3, 5);
    enemy.hp = Math.max(0, enemy.hp - dmg);
    player.mp = Math.min(player.maxMp, player.mp + 1);
    recordPlayerDealtDamage(dmg);
    ui.damageFloat.show(dmg, "yellow");
    ui.combatLog.push(`지팡이 휘두르기! ${dmg} 피해, MP +1.`);
    if (systems.phaseSystem.maybeHandlePhaseDeath()) return;
    state.turnPhase = "enemy";
    executeEnemyTurn();
  }

  function performPlayerSpellTurn(slotIndex) {
    if (!canPlayerAct()) return false;
    const spellId = player.spellSlots[slotIndex];
    const spell = spellLibrary[spellId];
    if (!spell) return false;
    if (player.mp < spell.manaCost) {
      ui.combatLog.push(`${spell.name}: MP 부족.`);
      return false;
    }
    const castResult = castPlayerSpell(slotIndex, spell);
    if (!castResult?.ok) return false;
    const resonanceSummary = applyPlayerSpellResonance(spell);
    const totalNow = Math.max(0, castResult.directDamage || 0) + Math.max(0, resonanceSummary?.totalDamage || 0);
    const summaryBits = [
      `전투 요약: 직접 ${Math.max(0, castResult.directDamage || 0)}`,
      `공명 ${Math.max(0, resonanceSummary?.totalDamage || 0)} (${Math.max(0, resonanceSummary?.triggered || 0)}칸)`,
      `합계 ${totalNow}`
    ];
    if ((castResult.dotEstimate || 0) > 0) {
      summaryBits.push(`예상 지속 ${castResult.dotEstimate}`);
    }
    ui.combatLog.push(summaryBits.join(" | "));
    if (systems.phaseSystem.maybeHandlePhaseDeath()) return true;
    state.turnPhase = "enemy";
    executeEnemyTurn();
    return true;
  }

  function performPlayerActionSlot(slotIndex) {
    if (!canPlayerAct()) return false;
    if (!Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex >= 4) return false;
    const spellId = player.spellSlots[slotIndex];
    if (!spellId || !spellLibrary[spellId]) {
      ui.combatLog.push(`슬롯 ${slotIndex + 1}에 배치된 주문이 없습니다.`);
      return false;
    }
    return performPlayerSpellTurn(slotIndex);
  }

  function beginTurnBattle(options = {}) {
    const resetTurn = options.resetTurn !== false;
    const resetBoard = options.resetBoard !== false;
    if (resetBoard) {
      resetResonanceBoard();
      renderResonanceBoard();
    }
    if (resetTurn) {
      state.turnCount = 1;
      beginPlayerTurn({ advanceTurn: false });
      ui.combatLog.push("턴제 전투 시작.", true);
      return;
    }
    state.turnPhase = "player";
    resetCooldowns();
    Object.keys(enemy.cooldowns).forEach((id) => {
      enemy.cooldowns[id] = 0;
    });
    ui.combatLog.push(`턴 ${state.turnCount} 유지: 플레이어 차례로 복귀.`);
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

  function currentFormulaHeartCost() {
    const active = getActiveFormula();
    return usedHearts(active?.spellIds || []);
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
    const colorOrder = { blue: 1, red: 2, yellow: 3, green: 4, white: 5, black: 6 };
    const aOrder = colorOrder[a.color] ?? 99;
    const bOrder = colorOrder[b.color] ?? 99;
    return (aOrder - bOrder) || (a.circle - b.circle) || a.name.localeCompare(b.name);
  }

  function spellLabel(spell) {
    const colorKo = {
      blue: "청",
      red: "적",
      yellow: "황",
      green: "녹",
      white: "백",
      black: "흑"
    }[spell.color] || spell.color;
    return `${spell.name} | ${colorKo} | ${spell.circle}서클 | ${spell.archetype} | MP ${spell.manaCost} | 하트 ${spell.heartCost}`;
  }

  const REARRANGE_STAY_RECOVER_RATIO = 0.12;
  const TRACKED_DEBUFF_IDS = new Set(["burn", "poison", "bleed", "slow", "stun", "freeze", "weak", "mark", "inferno", "petrify", "blind", "confuse"]);

  function recordPlayerDealtDamage(amount) {
    const value = Math.max(0, Math.floor(amount || 0));
    if (value <= 0) return;
    state.battleStats.damageDealt += value;
  }

  function recordPlayerTakenDamage(amount) {
    const value = Math.max(0, Math.floor(amount || 0));
    if (value <= 0) return;
    state.battleStats.damageTaken += value;
  }

  function recordPlayerAppliedStatus(status) {
    if (!status || !status.id || !TRACKED_DEBUFF_IDS.has(status.id)) return;
    const stacks = Math.max(1, Math.floor(status.stacks || 1));
    const current = state.battleStats.statusesApplied[status.id] || { count: 0, stacks: 0 };
    current.count += 1;
    current.stacks += stacks;
    state.battleStats.statusesApplied[status.id] = current;
  }

  function battleReportLines() {
    const lines = [];
    lines.push(`전투 리포트: 총 피해 ${Math.floor(state.battleStats.damageDealt)} | 받은 피해 ${Math.floor(state.battleStats.damageTaken)}`);
    const entries = Object.entries(state.battleStats.statusesApplied);
    if (entries.length === 0) {
      lines.push("부여 상태이상: 없음");
      return lines;
    }
    const labels = entries
      .sort((a, b) => b[1].stacks - a[1].stacks)
      .map(([id, data]) => `${statusName(id)} ${data.count}회 (총 ${data.stacks}스택)`);
    lines.push(`부여 상태이상: ${labels.join(" / ")}`);
    return lines;
  }

  function spellIconPath(spell) {
    const starterIcons = {
      red_flame_shard: "assets/spells/v2/starter_basic_bolt.svg",
      red_heat_stock: "assets/spells/v2/starter_basic_focus.svg"
    };
    if (starterIcons[spell.id]) return starterIcons[spell.id];
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
    redFury: "assets/status/redFury.svg",
    petrify: "assets/status/petrify.svg",
    blind: "assets/status/blind.svg",
    confuse: "assets/status/confuse.svg"
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
    redFury: "적의 분노",
    petrify: "석화",
    blind: "실명",
    confuse: "혼란"
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
    redFury: { effect: "적색 주문 강화" },
    petrify: { effect: "행동/쿨다운 속도 대폭 저하" },
    blind: { effect: "주문 피해량 감소" },
    confuse: { effect: "시전 실패 확률 증가" }
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
    if (typeof status.damageOutMul === "number") {
      lines.push(`가하는 피해 ${Math.floor(status.damageOutMul * 100)}%`);
    }
    if (typeof status.miscastChance === "number") {
      lines.push(`시전 실패 확률 ${Math.floor(status.miscastChance * 100)}%`);
    }
    if (typeof status.critPct === "number") {
      lines.push(`치명타율 +${status.critPct}%`);
    }
    if (typeof status.shieldBreakPct === "number") {
      lines.push(`보호막 피해 +${status.shieldBreakPct}%`);
    }
    if (typeof status.shieldValue === "number") {
      lines.push(`흡수량 ${Math.floor(status.shieldValue)}`);
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
    if (typeof status.remaining === "number" && Number.isFinite(status.remaining) && status.remaining > 0) {
      lines.push(`${toFixed1(Math.max(0, status.remaining || 0))}초 남음`);
    }
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
    if (Array.isArray(spell.linkSynergy) && spell.linkSynergy.length > 0) {
      spell.linkSynergy.forEach((rule) => {
        const colorKo = {
          red: "적색",
          blue: "청색",
          yellow: "황색",
          green: "녹색",
          white: "백색",
          black: "흑색"
        }[rule.neighborColor] || "인접";
        if (rule.effect === "self_regen") {
          lines.push(`공명: 인접 ${colorKo} 1개당 재생 +${rule.scale || 1} (${rule.duration || 5}초)`);
        } else if (rule.effect === "self_heal") {
          lines.push(`공명: 인접 ${colorKo} 1개당 즉시 회복 +${rule.scale || 1}`);
        } else if (rule.effect === "self_mana") {
          lines.push(`공명: 인접 ${colorKo} 1개당 마나 +${rule.scale || 1}`);
        } else if (rule.effect === "self_shield") {
          lines.push(`공명: 인접 ${colorKo} 1개당 보호막 +${rule.scale || 1}`);
        } else if (rule.effect === "enemy_poison") {
          lines.push(`공명: 인접 ${colorKo} 1개당 중독 +${rule.scale || 1} (${rule.duration || 3}초)`);
        } else if (rule.effect === "enemy_burn") {
          lines.push(`공명: 인접 ${colorKo} 1개당 화상 +${rule.scale || 1} (${rule.duration || 3}초)`);
        } else if (rule.effect === "enemy_slow") {
          lines.push(`공명: 인접 ${colorKo} 1개당 둔화 부여 (${rule.duration || 2}초)`);
        } else if (rule.effect === "enemy_petrify") {
          lines.push(`공명: 인접 ${colorKo} 1개당 석화 부여 (${rule.duration || 2}초)`);
        } else if (rule.effect === "enemy_blind") {
          lines.push(`공명: 인접 ${colorKo} 1개당 실명 부여 (${rule.duration || 2}초)`);
        } else if (rule.effect === "enemy_confuse") {
          lines.push(`공명: 인접 ${colorKo} 1개당 혼란 부여 (${rule.duration || 2}초)`);
        } else if (rule.effect === "enemy_mana_burn") {
          lines.push(`공명: 인접 ${colorKo} 1개당 마나 소각 +${rule.scale || 1}`);
        }
      });
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
    const spells = manualLayout
      ? [...rawSpells]
      : [...rawSpells].sort((a, b) => (b.circle - a.circle) || (a.slotIndex - b.slotIndex));
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
        const preset = (key && manualLayout[key])
          || (entry.id && manualLayout[entry.id])
          || null;
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
    if (enemySpellLibrary[spellId]?.color) return enemySpellLibrary[spellId].color;
    if (/yellow|earth|stone|clay|rampart|forge/i.test(spellId)) return "yellow";
    if (/white|ray|prism|purify|time|light/i.test(spellId)) return "white";
    if (/black|shadow|night|mind|hex|puppet/i.test(spellId)) return "black";
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
          ui.combatLog.push("술식 점유 한도를 초과했습니다.", true);
          return;
        }
        persistPlayerFormulaState();
        updateUI();
        ui.spellBar.render();
      });
      dom.loadoutSlots.appendChild(card);
    }

    dom.loadoutHeartText.textContent = `술식 점유량: ${usedHearts()} / ${player.maxHearts}`;
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
    const base = (dampen ? dampen.reduction || 0 : 0) + (greenWard ? greenWard.reduction || 0 : 0);
    return Math.min(0.85, base + activeStartingTraitBonuses.damageReductionPct);
  }

  function dealPlayerDamage(rawDamage, options = {}) {
    const shieldBreakMul = options.shieldBreakMul || 1;
    const afterShield = consumeShield(rawDamage, shieldBreakMul);
    const reduced = Math.floor(afterShield * (1 - playerReductionRate()));
    player.hp = Math.max(0, player.hp - reduced);
    recordPlayerTakenDamage(reduced);
    return reduced;
  }

  // ui/combatLog
  ui.combatLog = (() => {
    const MAX_LINES = 36;
    const enemyLineMatchers = [/^알렌[:의]/, /^알렌이\b/, /^적\b/];
    const rewardMatchers = [/보상/, /해금/, /획득/];
    const statusMatchers = [/상태/, /둔화/, /동결/, /중독/, /화상/, /봉인/, /혼란/, /약화/, /석화/];

    function inferOwner(message) {
      return enemyLineMatchers.some((pattern) => pattern.test(message)) ? "enemy" : "ally";
    }

    function inferTags(message) {
      const tags = [];
      const text = String(message || "");
      if (/피해/.test(text)) tags.push("피해");
      if (/MP|마나/.test(text)) tags.push("마나");
      if (/보호막|회복|재생/.test(text)) tags.push("생존");
      if (/공명/.test(text)) tags.push("공명");
      if (statusMatchers.some((pattern) => pattern.test(text))) tags.push("상태");
      if (rewardMatchers.some((pattern) => pattern.test(text))) tags.push("보상");
      return [...new Set(tags)].slice(0, 3);
    }

    return {
      push(message, important = false) {
        if (!dom.combatLog) return;
        const owner = inferOwner(message);
        const turnText = (TURN_BASED_COMBAT && state.worldMode === "battle")
          ? `T${Math.max(1, state.turnCount || 1)}`
          : "T-";
        const ownerText = owner === "enemy" ? "적군" : "아군";
        const tags = inferTags(message);

        const item = document.createElement("li");
        item.classList.add(owner);

        const head = document.createElement("div");
        head.className = "combat-log-head";
        const turn = document.createElement("span");
        turn.className = "combat-log-turn";
        turn.textContent = turnText;
        const side = document.createElement("span");
        side.className = "combat-log-side";
        side.textContent = ownerText;
        head.appendChild(turn);
        head.appendChild(side);

        const msg = document.createElement("p");
        msg.className = "combat-log-msg";
        msg.textContent = message;

        item.appendChild(head);
        item.appendChild(msg);

        if (tags.length > 0) {
          const tagWrap = document.createElement("div");
          tagWrap.className = "combat-log-tags";
          tags.forEach((tagText) => {
            const tag = document.createElement("span");
            tag.className = "combat-log-tag";
            tag.textContent = tagText;
            tagWrap.appendChild(tag);
          });
          item.appendChild(tagWrap);
        }

        if (rewardMatchers.some((pattern) => pattern.test(message))) {
          item.classList.add("reward");
        }
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
    const classes = ["hit-blue", "hit-red", "hit-green", "hit-yellow", "hit-white", "hit-black"];

    function classByColor(color) {
      if (color === "red") return "hit-red";
      if (color === "green") return "hit-green";
      if (color === "yellow") return "hit-yellow";
      if (color === "white") return "hit-white";
      if (color === "black") return "hit-black";
      return "hit-blue";
    }

    return {
      trigger(color) {
        const targetClass = classByColor(color);
        dom.enemyPortraitFrame.classList.remove(...classes);
        void dom.enemyPortraitFrame.offsetWidth;
        dom.enemyPortraitFrame.classList.add(targetClass);
        if (dom.topPanel) {
          dom.topPanel.classList.remove("impact-shake");
          void dom.topPanel.offsetWidth;
          dom.topPanel.classList.add("impact-shake");
          window.setTimeout(() => dom.topPanel.classList.remove("impact-shake"), 220);
        }
        dom.enemyPortraitFrame.addEventListener("animationend", () => {
          dom.enemyPortraitFrame.classList.remove(targetClass);
        }, { once: true });
      }
    };
  })();

  // ui/damageFloat
  ui.damageFloat = (() => {
    const toneClass = (tone) => {
      if (tone === "blue") return "tone-blue";
      if (tone === "green") return "tone-green";
      if (tone === "yellow") return "tone-yellow";
      if (tone === "white") return "tone-white";
      if (tone === "black") return "tone-black";
      return "tone-red";
    };
    return {
      show(value, tone = "red", heavy = false) {
        const node = document.createElement("span");
        node.className = "dot-float";
        node.classList.add(toneClass(tone));
        if (heavy) node.classList.add("heavy");
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
        const profile = currentEnemyProfile();
        if (dom.phaseOverlayPortraitImg && profile.portrait) {
          dom.phaseOverlayPortraitImg.src = profile.portrait;
          dom.phaseOverlayPortraitImg.alt = `${profile.name} 초상화`;
        }
        if (dom.phaseOverlayEnemyName) {
          dom.phaseOverlayEnemyName.textContent = profile.name;
        }
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
    const debuffIds = new Set(["burn", "poison", "bleed", "slow", "stun", "freeze", "weak", "mark", "inferno", "petrify", "blind", "confuse"]);
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
      if (state.config.kind === "buff") {
        if (state.config.key === "playerBuff" && player.shield > 0) {
          entries.unshift(["shield", { stacks: Math.floor(player.shield), shieldValue: player.shield }]);
        } else if (state.config.key === "bossBuff" && enemy.shield > 0) {
          entries.unshift(["shield", { stacks: Math.floor(enemy.shield), shieldValue: enemy.shield }]);
        }
      }
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
    let playerBoardSnapshot = [];
    let enemyBoardSnapshot = [];
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
      if (TURN_BASED_COMBAT) {
        if (state.mode !== "running" || state.turnPhase !== "player") return "cooldown";
        if (player.mp < spell.manaCost) return "low-mp";
        return "ready";
      }
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

    function renderBoard(container, spells, options = {}) {
      if (!container) return;
      const now = Date.now();
      pruneProcEffects(now);
      const boardCols = options.cols || 6;
      const boardRows = options.rows || 3;
      const blockedSet = new Set((options.blocked || []).map(([x, y]) => `${x},${y}`));
      container.classList.add("battle-grid");
      container.style.setProperty("--cols", String(boardCols));
      container.style.setProperty("--rows", String(boardRows));
      const cellSize = boardRows >= 7 ? 32 : (boardRows >= 5 || boardCols >= 5 ? 40 : 52);
      container.style.setProperty("--cell-size", `${cellSize}px`);
      container.innerHTML = "";
      const markerNodeMap = new Map();
      const ensureMarker = (key) => {
        let node = markerNodeMap.get(key);
        if (node) return node;
        const [x, y] = key.split(",").map(Number);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
        node = document.createElement("div");
        node.className = "battle-grid-marker";
        node.style.gridColumn = `${x + 1}`;
        node.style.gridRow = `${y + 1}`;
        container.appendChild(node);
        markerNodeMap.set(key, node);
        return node;
      };
      blockedSet.forEach((key) => {
        const node = ensureMarker(key);
        if (node) node.classList.add("blocked");
      });

      const layout = buildBoardLayout(spells, boardCols, boardRows, options.manualLayout || null, options.blocked || []);
      const layoutCellSets = layout.map((entry) => new Set(entry.shape.map(([sx, sy]) => `${entry.x + sx},${entry.y + sy}`)));
      function countAdjacentInLayout(index, neighborColor = null) {
        const target = layout[index];
        const targetCells = layoutCellSets[index];
        if (!target || !targetCells || layout.length < 2) return 0;
        const byCell = new Map();
        layoutCellSets.forEach((cells, idx) => {
          cells.forEach((key) => {
            const list = byCell.get(key) || [];
            list.push(idx);
            byCell.set(key, list);
          });
        });
        const touched = new Set();
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        targetCells.forEach((cellKey) => {
          const [sx, sy] = String(cellKey).split(",");
          const x = Number(sx);
          const y = Number(sy);
          dirs.forEach(([dx, dy]) => {
            const near = byCell.get(`${x + dx},${y + dy}`);
            if (!near || near.length === 0) return;
            near.forEach((otherIdx) => {
              if (otherIdx === index) return;
              const other = layout[otherIdx];
              if (!other) return;
              if (neighborColor && other.color !== neighborColor) return;
              touched.add(otherIdx);
            });
          });
        });
        return touched.size;
      }
      if (options.procOwner === "player") {
        playerBoardSnapshot = [];
      } else if (options.procOwner === "enemy") {
        enemyBoardSnapshot = [];
      }
      if (options.captureLayout) {
        playerPlacementsByKey = new Map();
      }
      if (options.captureEnemyLayout) {
        enemyPlacementsByKey = new Map();
      }
      layout.forEach((entry, layoutIndex) => {
        if (options.captureLayout && entry.itemKey) {
          playerPlacementsByKey.set(entry.itemKey, { x: entry.x, y: entry.y, variant: entry.variant || 0, shape: entry.shape });
        }
        if (options.captureEnemyLayout && entry.itemKey) {
          enemyPlacementsByKey.set(entry.itemKey, { x: entry.x, y: entry.y, variant: entry.variant || 0, shape: entry.shape });
        }
        const cellSet = new Set(entry.shape.map(([sx, sy]) => `${entry.x + sx},${entry.y + sy}`));
        const snapshotEntry = {
          itemKey: entry.itemKey,
          color: entry.color,
          slotIndex: entry.slotIndex,
          cells: cellSet
        };
        if (options.procOwner === "player") {
          playerBoardSnapshot.push(snapshotEntry);
        } else if (options.procOwner === "enemy") {
          enemyBoardSnapshot.push(snapshotEntry);
        }
        const entrySpell = options.procOwner === "enemy" ? enemySpellLibrary[entry.id] : spellLibrary[entry.id];
        const linkRules = Array.isArray(entrySpell?.linkSynergy) ? entrySpell.linkSynergy : [];
        const activeLinkCounts = linkRules.map((rule) => countAdjacentInLayout(layoutIndex, rule.neighborColor || null)).filter((v) => v > 0);
        const activeLinkTotal = activeLinkCounts.reduce((sum, v) => sum + v, 0);
        const sortedShape = [...entry.shape].sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
        sortedShape.forEach(([sx, sy], cellIndex) => {
          const node = document.createElement("div");
          node.className = `battle-grid-item ${entry.color} ${entry.stateClass}`;
          if (entry.casting) node.classList.add("casting");
          if (activeLinkTotal > 0) node.classList.add("link-synergy-active");
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
              manaBadge.title = `마나 생성 주문 (${entry.manaGainHint})`;
              manaBadge.setAttribute("aria-label", `마나 생성 주문 (${entry.manaGainHint})`);
              const manaIcon = document.createElement("img");
              manaIcon.src = MANA_CRYSTAL_ICON_PATH;
              manaIcon.alt = "마나 생성";
              manaBadge.appendChild(manaIcon);
              node.appendChild(manaBadge);
            }
            if (activeLinkTotal > 0) {
              const linkBadge = document.createElement("small");
              linkBadge.className = "grid-link-badge";
              linkBadge.textContent = `공명 x${activeLinkTotal}`;
              linkBadge.title = "인접 주문 공명 활성";
              node.appendChild(linkBadge);
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
      const styles = window.getComputedStyle(container);
      const cellSize = parseFloat(styles.getPropertyValue("--cell-size")) || 0;
      const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
      const borderTop = parseFloat(styles.borderTopWidth) || 0;
      const localX = event.clientX - rect.left - borderLeft;
      const localY = event.clientY - rect.top - borderTop;
      const cx = Math.floor(localX / Math.max(1, cellSize));
      const cy = Math.floor(localY / Math.max(1, cellSize));
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
        if (state.mode === "running" && TURN_BASED_COMBAT) {
          const itemKey = tile.dataset.itemKey;
          if (!itemKey) return;
          const entry = lastPlayerEntries.find((it) => it.itemKey === itemKey);
          if (!entry) return;
          event.stopPropagation();
          performPlayerSpellTurn(entry.slotIndex);
          return;
        }
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
      getBoardSnapshot(owner) {
        const source = owner === "enemy" ? enemyBoardSnapshot : playerBoardSnapshot;
        return source.map((entry) => ({
          itemKey: entry.itemKey,
          color: entry.color,
          slotIndex: entry.slotIndex,
          cells: new Set(entry.cells)
        }));
      },
      getAdjacentCount(owner, slotIndex, neighborColor = null) {
        const source = owner === "enemy" ? enemyBoardSnapshot : playerBoardSnapshot;
        if (!Array.isArray(source) || source.length === 0) return 0;
        const index = source.findIndex((entry) => entry.slotIndex === slotIndex);
        if (index < 0) return 0;
        const target = source[index];
        if (!target || !(target.cells instanceof Set)) return 0;
        const byCell = new Map();
        source.forEach((entry, idx) => {
          if (!entry || !(entry.cells instanceof Set)) return;
          entry.cells.forEach((cellKey) => {
            const list = byCell.get(cellKey) || [];
            list.push(idx);
            byCell.set(cellKey, list);
          });
        });
        const touched = new Set();
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        target.cells.forEach((cellKey) => {
          const [sx, sy] = String(cellKey).split(",");
          const x = Number(sx);
          const y = Number(sy);
          dirs.forEach(([dx, dy]) => {
            const near = byCell.get(`${x + dx},${y + dy}`);
            if (!near || near.length === 0) return;
            near.forEach((otherIdx) => {
              if (otherIdx === index) return;
              const other = source[otherIdx];
              if (!other) return;
              if (neighborColor && other.color !== neighborColor) return;
              touched.add(otherIdx);
            });
          });
        });
        return touched.size;
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
      damage = Math.max(0, Math.floor(damage * PLAYER_SPELL_DAMAGE_MULT));

      enemy.hp = Math.max(0, enemy.hp - damage);
      if (damage > 0) {
        ui.damageFloat.show(damage, "green", damage >= 14);
        recordPlayerDealtDamage(damage);
      }

      let line = `드라이어드의 ${spell.name}! ${damage} 피해.`;

      if (spell.heal) {
        const heal = randomInt(spell.heal[0], spell.heal[1]);
        player.hp = Math.min(player.maxHp, player.hp + heal);
        line += ` ${heal} 회복.`;
      }

      if (spell.applyEnemyStatus?.id === "poison") {
        const addStacks = spell.applyEnemyStatus.stacks || 1;
        systems.statusSystem.applyEnemy({
          id: "poison",
          stacks: addStacks,
          duration: spell.applyEnemyStatus.duration || 3,
          dps: spell.applyEnemyStatus.dps || 3
        });
        recordPlayerAppliedStatus({ id: "poison", stacks: addStacks });
        line += ` 중독 +${addStacks}.`;
      } else if (spell.applyEnemyStatus) {
        systems.statusSystem.applyEnemy(spell.applyEnemyStatus);
        recordPlayerAppliedStatus(spell.applyEnemyStatus);
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
        stacks: Math.max(1, current.stacks || 1) + Math.max(1, nextIncoming.stacks || 1),
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
        damageOutMul: nextIncoming.damageOutMul ?? current.damageOutMul,
        miscastChance: nextIncoming.miscastChance ?? current.miscastChance,
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
        const merged = mergeStatus(enemy.statuses[payload.id], payload);
        if (payload.id === "burn") {
          merged.stacks = Math.min(6, Math.max(1, merged.stacks || 1));
        }
        enemy.statuses[payload.id] = merged;
      },
      applyPlayer(payload) {
        const merged = mergeStatus(player.statuses[payload.id], payload);
        if (payload.id === "burn") {
          merged.stacks = Math.min(6, Math.max(1, merged.stacks || 1));
        }
        player.statuses[payload.id] = merged;
      },
      tickEnemy(dt) {
        Object.entries(enemy.statuses).forEach(([id, status]) => {
          status.remaining -= dt;
          status.tick = (status.tick || 0) + dt;

          if (status.dps) {
            while (status.tick >= 1) {
              status.tick -= 1;
              let dmg = status.dps * (status.stacks || 1);
              if (id === "burn") {
                dmg = Math.max(1, Math.floor(dmg * BURN_DOT_MULTIPLIER));
              }
              enemy.hp = Math.max(0, enemy.hp - dmg);
              ui.damageFloat.show(dmg, id === "poison" ? "green" : "red");
              recordPlayerDealtDamage(dmg);
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
              if (id === "burn") {
                dot = Math.max(1, Math.floor(dot * BURN_DOT_MULTIPLIER));
              }
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
        const slowA = enemy.statuses.slow ? (enemy.statuses.slow.slowPct || 0) / 100 : 0;
        const slowB = enemy.statuses.petrify ? (enemy.statuses.petrify.slowPct || 0) / 100 : 0;
        return Math.max(slowA, slowB);
      },
      playerCooldownRate() {
        const slow = player.statuses.slow;
        const petrify = player.statuses.petrify;
        const rates = [
          slow && typeof slow.cooldownRate === "number" ? slow.cooldownRate : 1,
          petrify && typeof petrify.cooldownRate === "number" ? petrify.cooldownRate : 1
        ];
        return Math.min(...rates);
      },
      enemyCooldownRate() {
        const slow = enemy.statuses.slow;
        const petrify = enemy.statuses.petrify;
        const rates = [
          slow && typeof slow.cooldownRate === "number" ? slow.cooldownRate : 1,
          petrify && typeof petrify.cooldownRate === "number" ? petrify.cooldownRate : 1
        ];
        return Math.min(...rates);
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

    function buildDefaultFormulaTip(loadout) {
      const tone = dominantSpellColor(loadout);
      if (tone === "red") return "고화력 연계가 빠르게 이어집니다. 보호막과 피해 완화를 미리 준비하세요.";
      if (tone === "blue") return "둔화/동결/봉쇄가 핵심입니다. 핵심 스킬 타이밍을 빼앗기지 마세요.";
      if (tone === "yellow") return "구성/방벽 계열 중심입니다. 한 번에 뚫기보다 마나 회전을 먼저 끊어내세요.";
      if (tone === "green") return "회복과 유지력이 강합니다. 긴 호흡 전에 누적 피해를 압축하세요.";
      if (tone === "white") return "정화/시공 제어형 술식입니다. 피해 교환보다 타이밍 싸움이 중요합니다.";
      if (tone === "black") return "교란/침식 계열 술식입니다. 상태이상과 마나 손실을 동시에 관리하세요.";
      return "복합 속성 술식입니다. 상태이상 누적과 마나 소모를 동시에 관리하세요.";
    }

    function getEnemyFormulaPresentation(phase) {
      const profile = currentEnemyProfile();
      const key = `${profile.id}:${phase.id}`;
      const preset = ENEMY_FORMULA_PRESENTATION[key];
      if (preset) return preset;
      return {
        name: phase.name,
        ment: `${profile.name}이 전투 태세를 갖춘다.`,
        tip: buildDefaultFormulaTip(phase.enemyLoadout || [])
      };
    }

    function playOpeningFormulaReveal() {
      const phase = currentPhase();
      const view = getEnemyFormulaPresentation(phase);
      clearTimeoutIfAny();
      state.mode = "phase-transition";
      systems.combatLoop.setPaused(true);
      dom.rearrangePanel.classList.add("hidden");
      ui.phaseOverlay.show(currentEnemyProfile().name, `${view.ment}\nTip: ${view.tip}`);
      ui.combatLog.push(`${currentEnemyProfile().name}: ${view.ment}`, true);
      state.pendingTimeout = setTimeout(() => {
        state.pendingTimeout = null;
        ui.phaseOverlay.hide();
        enterOpeningSelection();
      }, 1450);
    }

    function renderRearrange() {
      dom.readyBtn.textContent = "준비 완료";
      dom.rearrangeSlots.innerHTML = "";
      const entryIndex = Number.isInteger(state.rearrangeEntryFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeEntryFormulaIndex))
        : player.activeFormulaIndex;
      const selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : entryIndex;
      const switched = selectedIndex !== entryIndex;
      const recoverHint = Math.max(1, Math.floor(player.maxHp * REARRANGE_STAY_RECOVER_RATIO));

      dom.rearrangeError.textContent = "";
      renderRearrangeEnemyHead();
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
        const coreUnlocked = isFormulaCoreUnlocked(formula);
        if (broken || !coreUnlocked) block.disabled = true;
        const core = getCoreById(formula.coreId);
        const hearts = usedHearts(formula.spellIds || []);
        const spellNames = (formula.spellIds || [])
          .map((id) => spellLibrary[id]?.name || id)
          .join(", ");
        block.innerHTML = `
          <strong>${formula.name || `${index + 1}번 술식`}${index === entryIndex ? " (현재)" : ""}${broken ? " (파괴됨)" : ""}${!coreUnlocked ? " (핵 잠김)" : ""}</strong>
          <span>핵: ${core.name}${!coreUnlocked ? " [잠김]" : ""} | 하트: ${hearts}</span>
          <small>${spellNames}</small>
        `;
        block.addEventListener("click", () => {
          state.rearrangeSelectedFormulaIndex = index;
          renderRearrange();
        });
        dom.rearrangeSlots.appendChild(block);
      });
    }

    function renderEnemyOpenPreview(options = {}) {
      dom.phaseBuffChoices.innerHTML = "";
      const showUpcomingNamesOnly = Boolean(options.showUpcomingNamesOnly);
      const phase = currentPhase();
      const profile = currentEnemyProfile();
      const view = getEnemyFormulaPresentation(phase);
      const lore = ENEMY_BESTIARY[profile.id] || null;
      const card = document.createElement("article");
      card.className = "phase-formula-brief";
      const currentLine = showUpcomingNamesOnly
        ? `<p class="phase-formula-tip">Tip: 현재 전개 술식 대응에 집중하세요.</p>`
        : `<p class="phase-formula-tip">Tip: ${view.tip}</p>`;
      const infoLines = lore ? `
        <p class="phase-formula-ment">유형: ${lore.role}</p>
        <p class="phase-formula-ment">성향: ${lore.temperament || "-"}</p>
        <p class="phase-formula-ment">위험 구간: ${lore.danger || "-"}</p>
        <p class="phase-formula-ment">행동 패턴: ${lore.pattern || "-"}</p>
        <p class="phase-formula-ment">약점: ${lore.weak}</p>
        <p class="phase-formula-tip">대응: ${lore.tip}</p>
        ${Array.isArray(lore.intel) && lore.intel.length > 0
    ? lore.intel.map((line) => `<p class="phase-formula-tip">정보: ${line}</p>`).join("")
    : ""}
      ` : "";
      card.innerHTML = `
        <strong class="phase-formula-name">${profile.name}</strong>
        <p class="phase-formula-ment">${view.ment}</p>
        ${infoLines}
        ${currentLine}
      `;
      dom.phaseBuffChoices.appendChild(card);
    }

    function renderRearrangeEnemyHead() {
      const profile = currentEnemyProfile();
      const phase = currentPhase();
      const view = getEnemyFormulaPresentation(phase);
      if (dom.rearrangeEnemyPortraitImg && profile.portrait) {
        dom.rearrangeEnemyPortraitImg.src = profile.portrait;
        dom.rearrangeEnemyPortraitImg.alt = `${profile.name} 초상화`;
      }
      if (dom.rearrangeEnemyName) {
        dom.rearrangeEnemyName.textContent = profile.name;
      }
      if (dom.rearrangeEnemyFormula) {
        dom.rearrangeEnemyFormula.textContent = `대사 : ${view.ment}`;
      }
    }

    function renderOpeningSelection() {
      dom.readyBtn.textContent = "이 술식으로 전투 시작";
      dom.rearrangeSlots.innerHTML = "";
      const selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : player.activeFormulaIndex;
      const phase = currentPhase();
      const enemyCore = getCurrentEnemyCore();

      dom.rearrangeError.textContent = "";
      renderRearrangeEnemyHead();
      dom.rearrangeTimerText.textContent = `술식핵 : ${enemyCore.name} (${corePassiveSummary(enemyCore)})`;
      dom.phaseBuffHint.textContent = "상대 술식을 확인하고, 대응할 술식을 선택하세요.";
      renderEnemyOpenPreview({ showUpcomingNamesOnly: true });

      player.formulaBook.formulas.forEach((formula, index) => {
        const block = document.createElement("button");
        block.type = "button";
        block.className = "rearrange-slot rearrange-formula-btn";
        if (index === selectedIndex) block.classList.add("active");
        const coreUnlocked = isFormulaCoreUnlocked(formula);
        if (!coreUnlocked) block.disabled = true;
        const core = getCoreById(formula.coreId);
        const hearts = usedHearts(formula.spellIds || []);
        const spellNames = (formula.spellIds || [])
          .map((id) => spellLibrary[id]?.name || id)
          .join(", ");
        block.innerHTML = `
          <strong>${formula.name || `${index + 1}번 술식`}${index === player.activeFormulaIndex ? " (현재)" : ""}${!coreUnlocked ? " (핵 잠김)" : ""}</strong>
          <span>핵: ${core.name}${!coreUnlocked ? " [잠김]" : ""} | 하트: ${hearts}</span>
          <small>${spellNames}</small>
        `;
        block.addEventListener("click", () => {
          state.rearrangeSelectedFormulaIndex = index;
          renderOpeningSelection();
        });
        dom.rearrangeSlots.appendChild(block);
      });
    }

    function enterOpeningSelection() {
      state.mode = "prebattle";
      systems.combatLoop.setPaused(true);
      state.rearrangeSelectedFormulaIndex = player.activeFormulaIndex;
      state.rearrangeEntryFormulaIndex = player.activeFormulaIndex;
      dom.rearrangePanel.classList.remove("hidden");
      dom.rearrangeError.textContent = "";
      dom.readyBtn.disabled = false;
      renderOpeningSelection();
      ui.combatLog.push("전투 개시 전 술식 선택.", true);
    }

    function confirmOpeningSelection() {
      if (state.mode !== "prebattle") return;
      const selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : player.activeFormulaIndex;
      const selectedFormula = player.formulaBook.formulas[selectedIndex];
      dom.rearrangeError.textContent = "";
      if (!isFormulaCoreUnlocked(selectedFormula)) {
        dom.rearrangeError.textContent = "선택한 술식핵이 잠겨 있습니다.";
        return;
      }
      if (selectedIndex !== player.activeFormulaIndex) {
        player.activeFormulaIndex = selectedIndex;
        syncPlayerSlotsFromActiveFormula();
        ui.spellBar.resetPlayerLayout();
        persistPlayerFormulaState();
        ui.combatLog.push(`전투 시작 술식 선택: ${getActiveFormula().name}.`, true);
      }
      const openingHeartCost = currentFormulaHeartCost();
      if (!TURN_BASED_COMBAT) {
        if (player.manaHearts < openingHeartCost) {
          dom.rearrangeError.textContent = `마나하트 부족: ${Math.floor(player.manaHearts)} / 필요 ${openingHeartCost}`;
          ui.combatLog.push(`마나하트 부족(${Math.floor(player.manaHearts)} / 필요 ${openingHeartCost})으로 술식 전개 실패.`, true);
          return;
        }
        player.manaHearts = Math.max(0, player.manaHearts - openingHeartCost);
        ui.combatLog.push(`${getActiveFormula().name} 전개. (술식 점유량 -${openingHeartCost})`, true);
      } else {
        ui.combatLog.push(`${getActiveFormula().name} 전개.`, true);
      }
      state.rearrangeEntryFormulaIndex = null;
      state.rearrangeSelectedFormulaIndex = null;
      dom.rearrangePanel.classList.add("hidden");
      dom.readyBtn.textContent = "준비 완료";
      player.coreCastCount = 0;
      const openGain = applyOpeningCorePassive(player, getActiveFormulaCore());
      if (openGain > 0) {
        ui.combatLog.push(`핵 패시브 발동: 시작 마나 +${openGain}.`);
      }
      if (activeStartingTraitBonuses.openingManaFlat > 0) {
        player.mp = player.mp + activeStartingTraitBonuses.openingManaFlat;
        ui.combatLog.push(`특전 발동: 시작 마나 +${activeStartingTraitBonuses.openingManaFlat}.`);
      }
      if ((player.relicPower || 0) > 0) {
        const relicOpening = Math.max(0, Math.floor(player.relicPower * 2));
        if (relicOpening > 0) {
          player.mp = player.mp + relicOpening;
          ui.combatLog.push(`유물 효과: 시작 마나 +${relicOpening}.`);
        }
      }
      state.mode = "running";
      systems.combatLoop.setPaused(false);
      if (TURN_BASED_COMBAT) {
        beginTurnBattle({ resetTurn: true, resetBoard: true });
      }
      ui.combatLog.push("전투 시작.", true);
      ui.combatLog.push(`적: "${enemyOpeningMent()}"`, true);
    }

    function applyRearrangeChoice() {
      const entryIndex = Number.isInteger(state.rearrangeEntryFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeEntryFormulaIndex))
        : player.activeFormulaIndex;
      let selectedIndex = Number.isInteger(state.rearrangeSelectedFormulaIndex)
        ? Math.min(2, Math.max(0, state.rearrangeSelectedFormulaIndex))
        : entryIndex;
      const selectedFormula = player.formulaBook.formulas[selectedIndex];
      if (!isFormulaCoreUnlocked(selectedFormula) || isFormulaBroken(selectedFormula, selectedIndex)) {
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
        enemy.maxHp = coreMaxDurability(phase.coreId || DEFAULT_CORE_ID);
        enemy.hp = enemy.maxHp;
        enemy.maxMp = phase.enemyMaxMp;
        enemy.mp = 0;
        enemy.coreId = phase.coreId || DEFAULT_CORE_ID;
        enemy.manaRegen = coreManaRegenPerSec(enemy.coreId) + (phase.enemyManaRegen || 0);
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

          enemy.maxHp = coreMaxDurability(phase.coreId || DEFAULT_CORE_ID);
          enemy.hp = enemy.maxHp;
          enemy.maxMp = phase.enemyMaxMp;
          enemy.mp = 0;
          enemy.coreId = phase.coreId || DEFAULT_CORE_ID;
          enemy.manaRegen = coreManaRegenPerSec(enemy.coreId) + (phase.enemyManaRegen || 0);
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
          ui.combatLog.push(`— ${currentEnemyProfile().name}의 전개 변화 —`, true);
          ui.combatLog.push(`적: "${enemyOpeningMent()}"`, true);
          {
            const view = getEnemyFormulaPresentation(phase);
            ui.phaseOverlay.show(currentEnemyProfile().name, `${view.ment}\nTip: ${view.tip}`);
          }

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
            dom.readyBtn.textContent = "준비 완료";
            renderRearrange();
            dom.phaseBuffChoices.innerHTML = "";
            ui.combatLog.push("술식 재정비 가능(10초).", true);
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
        dom.readyBtn.textContent = "준비 완료";
        state.mode = "running";
        systems.combatLoop.setPaused(false);
        if (TURN_BASED_COMBAT) {
          beginTurnBattle({ resetTurn: false, resetBoard: false });
        }
        ui.combatLog.push("술식 선택 종료. 전투 재개.", true);
      },
      enterOpeningSelection,
      playOpeningFormulaReveal,
      confirmOpeningSelection,
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
    pulseFormulaLink("player", spell.color);
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
    if (player.statuses.blind?.damageOutMul) {
      damage = Math.floor(damage * player.statuses.blind.damageOutMul);
    }
    damage += corePassiveDamageBonus(player, playerCore, spell);
    damage = Math.floor(damage * (1 + state.playerDamageBonus));
    damage = Math.max(0, Math.floor(damage * PLAYER_SPELL_DAMAGE_MULT));

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
    if (healthDamage > 0) {
      recordPlayerDealtDamage(healthDamage);
      ui.damageFloat.show(healthDamage, spell.color, Boolean(spell.highCircle) || healthDamage >= 18);
    }

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
        recordPlayerDealtDamage(bonus);
        line += ` ${bonus} 추가 피해.`;
      }
    }

    const playerLinkLogs = triggerSpellLinkSynergy("player", spell, slotIndex);
    if (playerLinkLogs.length > 0) {
      line += ` ${playerLinkLogs.join(" / ")}.`;
    }
    ui.combatLog.push(line, Boolean(spell.highCircle));

    if (spell.applyEnemyStatus) {
      const boosted = applyCoreStatusBonus(playerCore, spell.applyEnemyStatus);
      systems.statusSystem.applyEnemy(boosted);
      recordPlayerAppliedStatus(boosted);
      queueStatusProc("player", slotIndex, boosted);
    }
    if (spell.applyEnemyStatuses) {
      spell.applyEnemyStatuses.forEach((status) => {
        const boosted = applyCoreStatusBonus(playerCore, status);
        systems.statusSystem.applyEnemy(boosted);
        recordPlayerAppliedStatus(boosted);
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
    return {
      ok: true,
      spellId: spell.id,
      spellName: spell.name,
      directDamage: healthDamage,
      dotEstimate: estimateSpellDotTotal(spell)
    };
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
    pulseFormulaLink("enemy", spell.color);

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
    if (enemy.statuses.blind?.damageOutMul) {
      damage = Math.floor(damage * enemy.statuses.blind.damageOutMul);
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
      ui.damageFloat.show(selfBurn, "black");
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
    const enemyLinkLogs = triggerSpellLinkSynergy("enemy", spell, options.slotIndex);
    if (enemyLinkLogs.length > 0) {
      ui.combatLog.push(`적 술식 공명: ${enemyLinkLogs.join(" / ")}`);
    }
    return { ok: true, dealt };
  }

  function runAutoCast(dt) {
    state.castGap = Math.max(0, state.castGap - dt);
    if (state.castGap > 0) return;
    if (player.statuses.stun || player.statuses.freeze) return;
    if (player.statuses.confuse && Math.random() < (player.statuses.confuse.miscastChance || 0.3)) {
      state.castGap = 0.35;
      ui.combatLog.push("혼란으로 플레이어 시전이 흐트러졌다.");
      return;
    }

    for (let i = 0; i < player.spellSlots.length; i += 1) {
      const spell = spellLibrary[player.spellSlots[i]];
      if (!spell) continue;
      if ((state.cooldowns[spell.id] || 0) > 0) continue;
      if (player.mp < spell.manaCost) continue;

      const cast = castPlayerSpell(i, spell);
      if (!cast?.ok) continue;
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
      const payload = {
        id: "slow",
        stacks: 1,
        duration: player.statuses.reactiveSlow.duration || 2,
        slowPct: player.statuses.reactiveSlow.slowPct || 10
      };
      systems.statusSystem.applyEnemy(payload);
      recordPlayerAppliedStatus(payload);
    }
  }

  function playerManaRegenPerSec() {
    const flow = player.statuses.manaFlow;
    const flowBonus = flow ? (flow.manaPerTick || flow.bonus || 0) : 0;
    return player.manaRegen + flowBonus;
  }

  function triggerSpellLinkSynergy(owner, spell, slotIndex) {
    if (!spell || !Array.isArray(spell.linkSynergy) || spell.linkSynergy.length === 0) return [];
    const isEnemy = owner === "enemy";
    const logs = [];
    spell.linkSynergy.forEach((rule) => {
      const neighborColor = rule?.neighborColor || null;
      const adjacent = ui.spellBar.getAdjacentCount(owner, slotIndex, neighborColor);
      if (adjacent <= 0) return;
      const magnitude = Math.max(1, Math.floor((rule.scale || 1) * adjacent));

      if (rule.effect === "self_regen") {
        const payload = { id: "regen", stacks: 1, duration: rule.duration || 5, healPerTick: magnitude };
        if (isEnemy) systems.statusSystem.applyEnemy(payload);
        else systems.statusSystem.applyPlayer(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 재생 +${magnitude}`);
        return;
      }
      if (rule.effect === "self_heal") {
        if (isEnemy) enemy.hp = Math.min(enemy.maxHp, enemy.hp + magnitude);
        else player.hp = Math.min(player.maxHp, player.hp + magnitude);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 즉시 회복 +${magnitude}`);
        return;
      }
      if (rule.effect === "self_mana") {
        if (isEnemy) enemy.mp = enemy.mp + magnitude;
        else player.mp = player.mp + magnitude;
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 마나 +${magnitude}`);
        return;
      }
      if (rule.effect === "enemy_poison") {
        const payload = { id: "poison", stacks: magnitude, duration: rule.duration || 3, dps: rule.dps || 1, decayPerTick: 1 };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 중독 +${magnitude}`);
        return;
      }
      if (rule.effect === "self_shield") {
        if (isEnemy) enemy.shield = (enemy.shield || 0) + magnitude;
        else player.shield = (player.shield || 0) + magnitude;
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 보호막 +${magnitude}`);
        return;
      }
      if (rule.effect === "enemy_burn") {
        const payload = { id: "burn", stacks: magnitude, duration: rule.duration || 3, dps: rule.dps || 1, stackDecayOnHealthHit: 1 };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 화상 +${magnitude}`);
        return;
      }
      if (rule.effect === "enemy_slow") {
        const payload = {
          id: "slow",
          stacks: Math.max(1, magnitude),
          duration: rule.duration || 2,
          slowPct: Math.max(5, (rule.slowPct || 12)),
          cooldownRate: typeof rule.cooldownRate === "number" ? rule.cooldownRate : 0.88
        };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 둔화 부여`);
        return;
      }
      if (rule.effect === "enemy_petrify") {
        const payload = {
          id: "petrify",
          stacks: Math.max(1, magnitude),
          duration: rule.duration || 2,
          slowPct: Math.max(15, (rule.slowPct || 30)),
          cooldownRate: typeof rule.cooldownRate === "number" ? rule.cooldownRate : 0.72
        };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 석화 부여`);
        return;
      }
      if (rule.effect === "enemy_blind") {
        const payload = {
          id: "blind",
          stacks: 1,
          duration: rule.duration || 2,
          damageOutMul: typeof rule.damageOutMul === "number" ? rule.damageOutMul : 0.8
        };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 실명 부여`);
        return;
      }
      if (rule.effect === "enemy_confuse") {
        const payload = {
          id: "confuse",
          stacks: 1,
          duration: rule.duration || 2,
          miscastChance: typeof rule.miscastChance === "number" ? rule.miscastChance : 0.3
        };
        if (isEnemy) systems.statusSystem.applyPlayer(payload);
        else systems.statusSystem.applyEnemy(payload);
        if (!isEnemy) recordPlayerAppliedStatus(payload);
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 혼란 부여`);
        return;
      }
      if (rule.effect === "enemy_mana_burn") {
        const amount = magnitude;
        if (isEnemy) {
          player.mp = Math.max(0, player.mp - amount);
        } else {
          enemy.mp = Math.max(0, enemy.mp - amount);
        }
        logs.push(`공명(인접 ${neighborColor || "전체"} ${adjacent}): 마나 소각 ${amount}`);
      }
    });
    return logs;
  }

  function enemyAutoCast(dt, baseInterval, jitter = 0.4) {
    state.ai.basicTimer -= dt;
    if (state.ai.basicTimer > 0) return;
    state.ai.basicTimer = Math.max(0.45, baseInterval + (Math.random() * jitter));

    function preferredColor() {
      if (state.enemyProfileId === "dalahans") return "blue";
      if (state.enemyProfileId === "serion") return "green";
      if (state.enemyProfileId === "bounty_hunter") return "black";
      if (state.enemyProfileId === "inn_raider") return "yellow";
      return "red";
    }

    const pref = preferredColor();
    const secondaryByColor = {
      red: "yellow",
      blue: "white",
      yellow: "green",
      green: "yellow",
      white: "blue",
      black: "red"
    };
    const secondary = secondaryByColor[pref] || "red";

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
      if (pref === "yellow" && spell.archetype && spell.archetype.includes("방어")) score += 18;
      if (pref === "white" && spell.archetype && spell.archetype.includes("정화")) score += 18;
      if (pref === "black" && spell.archetype && spell.archetype.includes("교란")) score += 18;
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
    if (enemy.statuses.confuse && Math.random() < (enemy.statuses.confuse.miscastChance || 0.3)) {
      ui.combatLog.push("적이 혼란으로 주문 진형을 잃었다.");
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
    if (TURN_BASED_COMBAT) return;
    commitActiveCoreDurability();
    state.combatElapsedSec += dt;
    player.mp = player.mp + playerManaRegenPerSec() * dt;
    enemy.mp = enemy.mp + enemy.manaRegen * dt;

    if (state.combatElapsedSec >= MANA_OVERDRIVE_TRIGGER_SEC) {
      if (!state.manaOverdriveActive) {
        state.manaOverdriveActive = true;
        state.manaOverdriveIntensity = 1;
        ui.combatLog.push("마나폭주 시작: 매초 HP -1, MP +1", true);
      }
      const elapsedOverdrive = Math.max(0, state.combatElapsedSec - MANA_OVERDRIVE_TRIGGER_SEC);
      const nextIntensity = 1 + Math.floor(elapsedOverdrive / MANA_OVERDRIVE_SCALE_INTERVAL_SEC);
      if (nextIntensity !== state.manaOverdriveIntensity) {
        state.manaOverdriveIntensity = nextIntensity;
        ui.combatLog.push(`마나폭주 강화: 현재 단계 ${state.manaOverdriveIntensity}`);
      }
      state.manaOverdriveTickAccum += dt;
      while (state.manaOverdriveTickAccum >= 1) {
        state.manaOverdriveTickAccum -= 1;
        const surge = Math.max(1, state.manaOverdriveIntensity);
        player.hp = Math.max(0, player.hp - surge);
        player.mp = player.mp + surge;
      }
    }
    if (player.statuses.greenWard && player.statuses.greenWard.regenPerSec) {
      player.hp = Math.min(player.maxHp, player.hp + player.statuses.greenWard.regenPerSec * dt);
    }

    const playerCdRate = systems.statusSystem.playerCooldownRate() * activeStartingTraitBonuses.cooldownRecoveryMul;
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
      },
      isPaused() {
        return paused;
      }
    };
  })();

  function dominantSpellColor(spellIds = []) {
    const counts = { red: 0, blue: 0, yellow: 0, green: 0, white: 0, black: 0 };
    const seenOrder = [];
    (Array.isArray(spellIds) ? spellIds : []).forEach((id) => {
      const color = spellLibrary[id]?.color || enemySpellLibrary[id]?.color;
      if (!counts[color] && counts[color] !== 0) return;
      counts[color] += 1;
      if (!seenOrder.includes(color)) seenOrder.push(color);
    });
    const max = Math.max(counts.red, counts.blue, counts.yellow, counts.green, counts.white, counts.black);
    if (max <= 0) return "neutral";
    const leaders = ["red", "blue", "yellow", "green", "white", "black"].filter((color) => counts[color] === max);
    if (leaders.length <= 1) return leaders[0];
    return seenOrder.find((color) => leaders.includes(color)) || leaders[0];
  }

  function applyFormulaTone(node, color) {
    if (!node) return;
    node.classList.remove("formula-tone-red", "formula-tone-blue", "formula-tone-yellow", "formula-tone-green", "formula-tone-white", "formula-tone-black", "formula-tone-neutral");
    node.classList.add(`formula-tone-${color || "neutral"}`);
  }

  function pulseFormulaLink(owner, color) {
    const panel = dom.topPanel;
    if (!panel) return;
    panel.classList.remove("cast-tone-red", "cast-tone-blue", "cast-tone-yellow", "cast-tone-green", "cast-tone-white", "cast-tone-black", "link-cast-player", "link-cast-enemy");
    if (["red", "blue", "yellow", "green", "white", "black"].includes(color)) {
      panel.classList.add(`cast-tone-${color}`);
    }
    const castClass = owner === "enemy" ? "link-cast-enemy" : "link-cast-player";
    // Restart keyframe cleanly on rapid casts.
    void panel.offsetWidth;
    panel.classList.add(castClass);
    window.setTimeout(() => {
      panel.classList.remove("link-cast-player", "link-cast-enemy", "cast-tone-red", "cast-tone-blue", "cast-tone-yellow", "cast-tone-green", "cast-tone-white", "cast-tone-black");
    }, 300);
  }

  function renderBattleActionBar() {
    if (!dom.battleActionBar) return;
    const isTurn = canPlayerAct();
    dom.battleActionBar.classList.toggle("player-turn", isTurn);

    const setupSlotBtn = (button, slotIndex) => {
      if (!button) return;
      const iconNode = button.querySelector(".battle-action-icon");
      const labelNode = button.querySelector(".battle-action-label");
      const subNode = button.querySelector(".battle-action-sub");
      button.classList.remove("recommended");
      const spellId = player.spellSlots[slotIndex];
      const spell = spellLibrary[spellId];
      if (!spell) {
        if (iconNode) {
          iconNode.textContent = "·";
          iconNode.style.backgroundImage = "";
        }
        if (labelNode) labelNode.textContent = `슬롯 ${slotIndex + 1} 비어있음`;
        button.disabled = true;
        if (subNode) subNode.textContent = "장착 없음";
        return;
      }
      const canCast = isTurn && player.mp >= spell.manaCost;
      const resonanceHits = pendingResonanceTriggerCount(spell);
      const recommended = canCast && resonanceHits > 0;
      button.disabled = !canCast;
      button.classList.toggle("recommended", recommended);
      button.dataset.slotIndex = String(slotIndex);
      if (iconNode) {
        iconNode.textContent = "";
        iconNode.style.backgroundImage = `url('${spellIconPath(spell)}')`;
      }
      if (labelNode) {
        labelNode.textContent = `슬롯 ${slotIndex + 1} ${spell.name}`;
      }
      if (subNode) {
        if (!isTurn) subNode.textContent = "적 턴";
        else if (player.mp < spell.manaCost) subNode.textContent = `MP 부족 (${spell.manaCost})`;
        else if (resonanceHits > 0) subNode.textContent = `공명 ${resonanceHits}칸 발동 가능`;
        else subNode.textContent = `사용 가능 · MP ${spell.manaCost}`;
      }
    };

    setupSlotBtn(dom.battleCircle1Btn, 0);
    setupSlotBtn(dom.battleCircle2Btn, 1);
    setupSlotBtn(dom.battleCircle3Btn, 2);
    setupSlotBtn(dom.battleCircle4Btn, 3);

    if (dom.battleStaffBtn) {
      dom.battleStaffBtn.disabled = !isTurn;
      const subNode = dom.battleStaffBtn.querySelector(".battle-action-sub");
      if (subNode) subNode.textContent = isTurn ? "기본 공격 · MP +1" : "적 턴";
    }
    if (dom.battleActionDetail && !dom.battleActionDetail.textContent) {
      setBattleActionDetail(recommendedPlayerActionDetail());
    }
  }

  function colorKo(color) {
    const map = { red: "적", blue: "청", yellow: "황", green: "녹", white: "백", black: "흑" };
    return map[color] || color;
  }

  function estimateSpellDotTotal(spell) {
    if (!spell) return 0;
    const statuses = [];
    if (spell.applyEnemyStatus) statuses.push(spell.applyEnemyStatus);
    if (Array.isArray(spell.applyEnemyStatuses)) statuses.push(...spell.applyEnemyStatuses);
    let total = 0;
    statuses.forEach((status) => {
      if (!status || typeof status !== "object") return;
      if (!Number.isFinite(status.dps)) return;
      const stacks = Math.max(1, Number(status.stacks) || 1);
      const duration = Math.max(1, Math.floor(Number(status.duration) || 1));
      total += Math.max(0, Number(status.dps) || 0) * stacks * duration;
    });
    return Math.max(0, Math.floor(total));
  }

  function spellDetailSummary(spell) {
    if (!spell) return "";
    const lines = spellDetailLines(spell);
    if (Array.isArray(spell.damage)) {
      const hitCount = spell.hits || 1;
      const baseMin = (spell.damage[0] || 0) * hitCount;
      const baseMax = (spell.damage[1] || 0) * hitCount;
      const previewMul = PLAYER_SPELL_DAMAGE_MULT * (1 + state.playerDamageBonus);
      const previewMin = Math.max(0, Math.floor(baseMin * previewMul));
      const previewMax = Math.max(0, Math.floor(baseMax * previewMul));
      lines.unshift(`실전 예상 피해: ${previewMin}~${previewMax}`);
    }
    const pattern = resonancePatternForSpell(spell);
    const triggerCount = pendingResonanceTriggerCount(spell);
    lines.push(`공명 각인 칸: ${pattern.map((idx) => idx + 1).join(", ")}`);
    lines.push(`현재 즉시 발동: ${triggerCount}칸`);
    return `${spell.name} | ${colorKo(spell.color)} ${spell.circle}서클\n${lines.slice(0, 6).join("\n")}`;
  }

  function recommendedPlayerActionDetail() {
    if (!canPlayerAct()) {
      return "아이콘 위에 포인터를 올리거나 터치하면 상세 효과를 볼 수 있습니다.";
    }
    let best = null;
    for (let i = 0; i < player.spellSlots.length; i += 1) {
      const spell = spellLibrary[player.spellSlots[i]];
      if (!spell) continue;
      if (player.mp < spell.manaCost) continue;
      const hitCount = spell.hits || 1;
      const baseMin = (spell.damage?.[0] || 0) * hitCount;
      const baseMax = (spell.damage?.[1] || 0) * hitCount;
      const scaledAvg = ((baseMin + baseMax) / 2) * PLAYER_SPELL_DAMAGE_MULT * (1 + state.playerDamageBonus);
      const resonanceHits = pendingResonanceTriggerCount(spell);
      const score = (resonanceHits * 1000) + scaledAvg;
      if (!best || score > best.score) {
        best = { slotIndex: i, spell, resonanceHits, scaledAvg, score };
      }
    }
    if (!best) {
      return "추천 행동: 지팡이 휘두르기 (MP +1)";
    }
    const dot = estimateSpellDotTotal(best.spell);
    return [
      `추천 행동: 슬롯 ${best.slotIndex + 1} ${best.spell.name}`,
      `예상 피해: ${Math.floor(best.scaledAvg)}`,
      `공명 즉시 발동: ${best.resonanceHits}칸`,
      dot > 0 ? `예상 지속 피해: ${dot}` : "지속 피해 없음"
    ].join("\n");
  }

  function setBattleActionDetail(text) {
    if (!dom.battleActionDetail) return;
    dom.battleActionDetail.textContent = text || "";
  }

  function updateUI() {
    commitActiveCoreDurability();
    dom.playerHpFill.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;

    const playerCore = getActiveFormulaCore();
    const enemyCore = getCurrentEnemyCore();
    const activeFormula = getActiveFormula();
    const phase = currentPhase();
    const playerTone = dominantSpellColor(activeFormula?.spellIds || []);
    const enemyTone = dominantSpellColor(enemy.spellSlots || []);
    if (TURN_BASED_COMBAT) {
      dom.heartText.textContent = `HP ${Math.floor(player.hp)} / ${player.maxHp} | MP ${Math.floor(player.mp)} / ${player.maxMp}`;
    } else {
      const timeText = `시간 ${state.combatElapsedSec.toFixed(1)}s`;
      const overdriveText = state.manaOverdriveActive
        ? ` | 마나폭주 ${state.manaOverdriveIntensity}단계`
        : "";
      dom.heartText.textContent = `마나하트: ${Math.floor(player.manaHearts)} / ${player.maxManaHearts} | ${timeText}${overdriveText}`;
    }
    dom.enemyHeartText.textContent = `보스 하트: ${enemyUsedHearts()} / ${enemy.maxHearts}`;
    dom.loadoutHeartText.textContent = `술식 점유량: ${usedHearts()} / ${player.maxHearts}`;

    ui.statusSummary.render(player.statuses, enemy.statuses);
    if (dom.playerNameText) dom.playerNameText.textContent = "마법사";
    if (dom.enemyNameText) dom.enemyNameText.textContent = currentEnemyProfile().name;
    if (dom.playerGridTitle) {
      dom.playerGridTitle.textContent = `[술식 : ${activeFormula?.name || "이름 없는 술식"}]`;
      applyFormulaTone(dom.playerGridTitle, playerTone);
    }
    if (dom.playerGridCore) {
      dom.playerGridCore.textContent = `술식핵 : ${playerCore.name} (${corePassiveSummary(playerCore)})`;
    }
    if (dom.enemyGridTitle) {
      dom.enemyGridTitle.textContent = `[술식 : ${phase?.name || currentEnemyProfile().name}]`;
      applyFormulaTone(dom.enemyGridTitle, enemyTone);
    }
    if (dom.enemyGridCore) {
      dom.enemyGridCore.textContent = `술식핵 : ${enemyCore.name} (${corePassiveSummary(enemyCore)})`;
    }
    applyFormulaTone(dom.playerGridPanel, playerTone);
    applyFormulaTone(dom.enemyGridPanel, enemyTone);
    applyFormulaTone(dom.playerDuelSide, playerTone);
    applyFormulaTone(dom.enemyDuelSide, enemyTone);
    dom.loadoutSlots.querySelectorAll("select").forEach((select) => {
      select.disabled = state.mode !== "prep";
    });
    if (dom.speedBtn) {
      dom.speedBtn.textContent = `속도 x${state.speed}`;
      dom.speedBtn.classList.toggle("active", state.speed > 1);
    }
    if (dom.battleSpeedBtn) {
      dom.battleSpeedBtn.textContent = `속도 x${state.speed}`;
      dom.battleSpeedBtn.classList.toggle("active", state.speed > 1);
    }
    if (dom.battlePauseBtn) {
      const paused = systems.combatLoop.isPaused();
      dom.battlePauseBtn.textContent = paused ? "재개" : "일시정지";
      dom.battlePauseBtn.classList.toggle("active", paused);
    }

    if (state.mode === "running") {
      if (TURN_BASED_COMBAT) {
        dom.phasePill.textContent = `${phase?.name || "술식 전개"} | 턴 ${state.turnCount} | ${state.turnPhase === "player" ? "내 차례" : "적 차례"}`;
      } else {
        dom.phasePill.textContent = phase?.name || "술식 전개";
      }
    }
    if (state.mode === "prebattle") dom.phasePill.textContent = "개시 선택";
    if (state.mode === "rearrange") dom.phasePill.textContent = "교체 선택";
    if (state.mode === "phase-transition") dom.phasePill.textContent = "전환";
    if (state.mode === "victory") dom.phasePill.textContent = "승리";
    if (state.mode === "defeat") dom.phasePill.textContent = "패배";
    if (state.mode === "prep") dom.phasePill.textContent = "준비";
    if (state.worldMode === "story") dom.phasePill.textContent = "스토리";
    renderResonanceBoard();
    renderBattleActionBar();
  }

  function resetBattle(options = {}) {
    const preservePlayerVitals = Boolean(options.preservePlayerVitals);
    systems.phaseSystem.clearPendingTimeout();
    ui.phaseOverlay.hide();

    state.mode = "prep";
    state.speed = 1;
    state.turnCount = 1;
    state.turnPhase = "player";
    state.combatElapsedSec = 0;
    state.manaOverdriveActive = false;
    state.manaOverdriveTickAccum = 0;
    state.manaOverdriveIntensity = 1;
    resetResonanceBoard();
    state.castGap = 0;
    state.rearrangeRemaining = 0;
    state.rearrangeSelectedFormulaIndex = null;
    state.rearrangeEntryFormulaIndex = null;
    state.brokenFormulaIndexes = new Set();
    state.pendingTimeout = null;

    resetCooldowns();

    if (!preservePlayerVitals) {
      player.hp = player.maxHp;
      player.mp = player.maxMp;
    } else {
      player.hp = Math.max(1, Math.min(player.maxHp, player.hp));
      player.mp = Math.max(0, Math.min(player.maxMp, player.mp));
    }
    player.coreCastCount = 0;
    player.shield = 0;
    player.statuses = {};
    const legacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
    player.formulaBook = loadStoredFormulaBook(legacySlots);
    player.activeFormulaIndex = player.formulaBook.activeFormulaIndex;
    ensureActiveFormulaIndexUsable();
    refillAllCoreDurabilities();
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    persistPlayerFormulaState();
    renderPrepLoadout();

    systems.phaseSystem.resetPhase();

    dom.rearrangePanel.classList.add("hidden");
    dom.phaseBuffChoices.innerHTML = "";
    dom.phaseBuffHint.textContent = "";
    dom.rearrangeTimerText.textContent = "남은 시간: 10.0초";
    dom.rearrangeHeartText.textContent = "선택 술식 점유량: 0 / 0";
    dom.readyBtn.textContent = "준비 완료";
    dom.readyBtn.disabled = false;
    systems.combatLoop.setPaused(true);

    ui.combatLog.clear();
    ui.combatLog.push("전투 초기화 완료.");
    renderResonanceBoard();
    if (dom.combatLogBody) dom.combatLogBody.classList.remove("hidden");
    if (dom.combatLogToggle) dom.combatLogToggle.textContent = "전투 로그 닫기";
    updateUI();
    ui.spellBar.render();
    ui.enemyStatusBar.render(enemy.statuses);
    ui.summonStructure.render(player.statuses);
  }

  function startBattle() {
    if (state.mode === "running" || state.mode === "prebattle" || state.mode === "rearrange" || state.mode === "phase-transition") {
      return;
    }
    if (dom.startTraitPanel && !dom.startTraitPanel.classList.contains("hidden")) {
      return;
    }
    if (state.mode === "victory" || state.mode === "defeat") {
      resetBattle({ preservePlayerVitals: true });
    }
    const latestLegacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
    player.formulaBook = loadStoredFormulaBook(latestLegacySlots);
    player.activeFormulaIndex = player.formulaBook.activeFormulaIndex;
    ensureActiveFormulaIndexUsable();
    syncPlayerSlotsFromActiveFormula();
    ui.spellBar.resetPlayerLayout();
    setWorldMode("battle");
    state.brokenFormulaIndexes = new Set();
    const openingFormula = getActiveFormula();
    ui.combatLog.push(`전투 준비: ${openingFormula?.name || "현재 술식"} 선택 대기.`, true);
    systems.phaseSystem.playOpeningFormulaReveal();
  }

  function bindEvents() {
    let battleMenuPaused = false;
    let storyHoldSkipTimer = null;
    const bindActionDetail = (button, detailProvider) => {
      if (!button) return;
      const show = () => setBattleActionDetail(detailProvider());
      button.addEventListener("mouseenter", show);
      button.addEventListener("focus", show);
      button.addEventListener("touchstart", show, { passive: true });
    };
    const toggleCombatLog = () => {
      if (!dom.combatLogBody) return;
      const open = !dom.combatLogBody.classList.contains("hidden");
      dom.combatLogBody.classList.toggle("hidden", open);
      const label = open ? "전투 로그 보기" : "전투 로그 닫기";
      if (dom.combatLogToggle) dom.combatLogToggle.textContent = label;
      if (dom.battleLogToggle) dom.battleLogToggle.textContent = label;
    };
    dom.startBtn.addEventListener("click", startBattle);
    dom.resetBtn.addEventListener("click", resetBattle);
    const toggleSpeed = () => {
      state.speed = state.speed === 1 ? 2 : 1;
      updateUI();
    };
    dom.speedBtn.addEventListener("click", toggleSpeed);
    if (dom.battleSpeedBtn) {
      dom.battleSpeedBtn.addEventListener("click", toggleSpeed);
    }
    if (dom.battlePauseBtn) {
      dom.battlePauseBtn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        systems.combatLoop.setPaused(!systems.combatLoop.isPaused());
        updateUI();
      });
    }
    if (dom.battleStaffBtn) {
      dom.battleStaffBtn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        performPlayerStaffAttack();
      });
      bindActionDetail(dom.battleStaffBtn, () => "지팡이 휘두르기\n즉시 피해를 주고 MP를 1 회복합니다.");
    }
    if (dom.battleCircle1Btn) {
      dom.battleCircle1Btn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        performPlayerActionSlot(0);
      });
      bindActionDetail(dom.battleCircle1Btn, () => spellDetailSummary(spellLibrary[player.spellSlots[0]]));
    }
    if (dom.battleCircle2Btn) {
      dom.battleCircle2Btn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        performPlayerActionSlot(1);
      });
      bindActionDetail(dom.battleCircle2Btn, () => spellDetailSummary(spellLibrary[player.spellSlots[1]]));
    }
    if (dom.battleCircle3Btn) {
      dom.battleCircle3Btn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        performPlayerActionSlot(2);
      });
      bindActionDetail(dom.battleCircle3Btn, () => spellDetailSummary(spellLibrary[player.spellSlots[2]]));
    }
    if (dom.battleCircle4Btn) {
      dom.battleCircle4Btn.addEventListener("click", () => {
        if (state.worldMode !== "battle") return;
        performPlayerActionSlot(3);
      });
      bindActionDetail(dom.battleCircle4Btn, () => spellDetailSummary(spellLibrary[player.spellSlots[3]]));
    }
    if (dom.battleMenuBtn) {
      dom.battleMenuBtn.addEventListener("click", () => {
        if (!dom.storyMenuPanel) return;
        if (state.worldMode === "battle") {
          battleMenuPaused = !systems.combatLoop.isPaused();
          systems.combatLoop.setPaused(true);
          updateUI();
        }
        dom.storyMenuPanel.classList.remove("hidden");
      });
    }
    if (dom.battleLogToggle && dom.combatLogBody) {
      dom.battleLogToggle.addEventListener("click", toggleCombatLog);
    }
    if (dom.frameStyleBtn) {
      dom.frameStyleBtn.addEventListener("click", cycleFrameStyle);
    }
    if (dom.fontWeightBtn) {
      dom.fontWeightBtn.addEventListener("click", cycleFontWeightLevel);
    }
    if (dom.storyFontWeightBtn) {
      dom.storyFontWeightBtn.addEventListener("click", cycleFontWeightLevel);
    }
    dom.readyBtn.addEventListener("click", () => {
      if (state.mode === "prebattle") {
        systems.phaseSystem.confirmOpeningSelection();
        return;
      }
      systems.phaseSystem.exitRearrange();
    });
    if (dom.combatLogToggle && dom.combatLogBody) {
      dom.combatLogToggle.addEventListener("click", toggleCombatLog);
    }
    if (dom.storySceneBody) {
      dom.storySceneBody.addEventListener("click", () => {
        skipStoryRevealIfRunning();
      });
      const clearStoryHoldSkip = () => {
        if (!storyHoldSkipTimer) return;
        clearTimeout(storyHoldSkipTimer);
        storyHoldSkipTimer = null;
      };
      const queueStoryHoldSkip = () => {
        clearStoryHoldSkip();
        storyHoldSkipTimer = setTimeout(() => {
          storyHoldSkipTimer = null;
          skipStoryRevealIfRunning();
        }, 360);
      };
      dom.storySceneBody.addEventListener("pointerdown", queueStoryHoldSkip);
      dom.storySceneBody.addEventListener("pointerup", clearStoryHoldSkip);
      dom.storySceneBody.addEventListener("pointerleave", clearStoryHoldSkip);
      dom.storySceneBody.addEventListener("pointercancel", clearStoryHoldSkip);
    }
    if (dom.storyRevealSpeedBtn) {
      dom.storyRevealSpeedBtn.addEventListener("click", cycleStoryRevealSpeed);
    }
    if (dom.storyRevealSkipBtn) {
      dom.storyRevealSkipBtn.addEventListener("click", skipStoryRevealIfRunning);
    }
    document.addEventListener("keydown", (event) => {
      if (state.worldMode !== "story") return;
      if (!state.story.revealTimer) return;
      if (event.key !== " " && event.key !== "Enter") return;
      const tag = String(event.target?.tagName || "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      event.preventDefault();
      skipStoryRevealIfRunning();
    });
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
        if (battleMenuPaused && state.worldMode === "battle") {
          systems.combatLoop.setPaused(false);
          battleMenuPaused = false;
          updateUI();
        }
      });
    }
    if (dom.storyMapClose && dom.storyMapPanel) {
      dom.storyMapClose.addEventListener("click", () => {
        dom.storyMapPanel.classList.add("hidden");
        dom.storyMapPanel.classList.remove("popup-open");
        sceneContinueButton();
      });
    }
    window.addEventListener("pagehide", flushProgressSnapshot);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushProgressSnapshot();
    });
  }

  function init() {
    try {
      bindEvents();
      applyFrameStyle(loadFrameStyle());
      applyFontWeightLevel(loadFontWeightLevel());
      applyStoryRevealSpeed(loadStoryRevealSpeed());
      systems.combatLoop.start();
      setWorldMode("story");
      renderPrepLoadout();
      if (fillEarlyEmptyActionSlots()) {
        renderPrepLoadout();
      }
      renderStoryScene();
      showStartingTraitPanelIfNeeded();
      updateUI();
      ui.spellBar.render();
      ui.enemyStatusBar.render(enemy.statuses);
      ui.summonStructure.render(player.statuses);
      updateStoryRevealControls();
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
