(() => {
  const dom = {
    appShell: document.querySelector(".app-shell"),
    playerHpFill: document.getElementById("player-hp-fill"),
    playerMpFill: document.getElementById("player-mp-fill"),
    bossHpFill: document.getElementById("boss-hp-fill"),
    bossMpFill: document.getElementById("boss-mp-fill"),
    playerHpText: document.getElementById("player-hp-text"),
    playerMpText: document.getElementById("player-mp-text"),
    bossHpText: document.getElementById("boss-hp-text"),
    bossMpText: document.getElementById("boss-mp-text"),
    heartText: document.getElementById("heart-text"),
    enemyHeartText: document.getElementById("enemy-heart-text"),
    phasePill: document.getElementById("phase-pill"),
    loadoutHeartText: document.getElementById("loadout-heart-text"),
    loadoutSlots: document.getElementById("loadout-slots"),
    combatLog: document.getElementById("combat-log"),
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

  const spellList = Object.values(spellLibrary);

  const enemyProfiles = {
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
          maxHp: 640,
          enemyMaxMp: 180,
          enemyManaRegen: 14,
          enemyLoadout: ["flareBurst", "scarletShard", "brandBreaker", "allenTrueName"]
        },
        {
          id: 2,
          name: "홍염의 폭주",
          title: "페이즈 2: 홍염의 폭주",
          quote: "이제 시험은 끝이다. 네가 버티는지 보겠다.",
          maxHp: 760,
          enemyMaxMp: 220,
          enemyManaRegen: 16,
          enemyLoadout: ["flameStrike", "allensMark", "skyFallingFlame", "infernoCharge"]
        },
        {
          id: 3,
          name: "푸르가토리움의 잔재",
          title: "페이즈 3: 푸르가토리움의 잔재",
          quote: "태워라… 전부 태워라… 남는 것은 재 뿐이다…",
          maxHp: 920,
          enemyMaxMp: 260,
          enemyManaRegen: 18,
          enemyLoadout: ["ragingFlare", "purgatoriumEcho", "searingPrison", "selfImmolation"]
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
          maxHp: 620,
          enemyMaxMp: 200,
          enemyManaRegen: 15,
          enemyLoadout: ["flareBurst", "scarletShard", "brandBreaker", "allenTrueName"]
        },
        {
          id: 2,
          name: "빙결 연산",
          title: "페이즈 2: 빙결 연산",
          quote: "수식은 완성됐다. 너의 선택지는 없다.",
          maxHp: 740,
          enemyMaxMp: 235,
          enemyManaRegen: 17,
          enemyLoadout: ["flameStrike", "allensMark", "skyFallingFlame", "infernoCharge"]
        },
        {
          id: 3,
          name: "절대영도 재귀",
          title: "페이즈 3: 절대영도 재귀",
          quote: "무한히 반복되는 냉각 속에서 사라져라.",
          maxHp: 900,
          enemyMaxMp: 275,
          enemyManaRegen: 19,
          enemyLoadout: ["ragingFlare", "purgatoriumEcho", "searingPrison", "selfImmolation"]
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
          maxHp: 680,
          enemyMaxMp: 175,
          enemyManaRegen: 13,
          enemyLoadout: ["flareBurst", "scarletShard", "brandBreaker", "allenTrueName"]
        },
        {
          id: 2,
          name: "덩굴의 포위",
          title: "페이즈 2: 덩굴의 포위",
          quote: "도망칠 길은 없다. 숲은 이미 널 감쌌다.",
          maxHp: 810,
          enemyMaxMp: 215,
          enemyManaRegen: 16,
          enemyLoadout: ["flameStrike", "allensMark", "skyFallingFlame", "infernoCharge"]
        },
        {
          id: 3,
          name: "거목의 심판",
          title: "페이즈 3: 거목의 심판",
          quote: "모든 생장은 끝내 회수된다.",
          maxHp: 960,
          enemyMaxMp: 250,
          enemyManaRegen: 18,
          enemyLoadout: ["ragingFlare", "purgatoriumEcho", "searingPrison", "selfImmolation"]
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

  const LOADOUT_STORAGE_KEY = "fanta_spell_loadout_v1";
  const FORMULA_BOOK_STORAGE_KEY = "fanta_formula_book_v2";
  const DEFAULT_PLAYER_SPELL_SLOTS = ["frostShard", "fireball", "venomVine", "skyOfEmbers"];
  const DEFAULT_PLAYER_FORMULAS = [
    { id: "formula_1", name: "술식 1", spellIds: ["frostShard", "fireball", "venomVine", "skyOfEmbers"] },
    { id: "formula_2", name: "술식 2", spellIds: ["freezingVeil", "blastBrand", "natureGrace", "magmaEruption"] },
    { id: "formula_3", name: "술식 3", spellIds: ["manaSpring", "frostShackle", "lifeSprout", "dryadOfGreatForest"] }
  ];
  const PLAYER_MAX_HEARTS = 12;

  function totalHeartCost(slots) {
    return slots.reduce((sum, id) => {
      const spell = spellLibrary[id];
      return sum + (spell ? spell.heartCost : 0);
    }, 0);
  }

  function sanitizeSpellSlots(candidate, maxHearts = PLAYER_MAX_HEARTS) {
    if (!Array.isArray(candidate) || candidate.length !== 4) return null;
    const normalized = candidate.map((id) => (spellLibrary[id] ? id : null));
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
    return {
      id: typeof formula.id === "string" && formula.id.trim() ? formula.id : `formula_${Math.random().toString(36).slice(2, 8)}`,
      name: typeof formula.name === "string" && formula.name.trim() ? formula.name.trim() : "이름 없는 술식",
      spellIds,
      totalCircle: calcFormulaCircle(spellIds)
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
    phaseBuffChosen: false,
    phaseBuffChoice: null,
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

  const relicPool = [
    "숲지기의 징표",
    "붉은 홍옥",
    "서리 수정핵",
    "유영하는 기억석",
    "잔광의 인장"
  ];

  const act1Scenes = [
    {
      id: "s1",
      title: "① 낯선 길 위에서",
      body: "정신을 차려보니 이 길 위에 서 있다.",
      image: "assets/씬/scene_open_frontier_road.png",
      tone: "neutral",
      choices: [
        { label: "기억을 더듬는다", effect: "memory_plus" },
        { label: "주변의 마력을 감지한다", effect: "gain_random_circle1" },
        { label: "아무 생각 없이 전진한다", effect: "battle_bias_up" }
      ]
    },
    {
      id: "s2",
      title: "② 버려진 마을",
      body: "불탄 흔적과 마력 잔재가 골목을 채운다.",
      image: "assets/씬/scene_village_stone_lane.png",
      tone: "amber",
      choices: [
        { label: "집을 수색한다", effect: "battle_farmer" },
        { label: "광장을 조사한다", effect: "relic_pick" },
        { label: "그냥 떠난다", effect: "heal_small" }
      ]
    },
    {
      id: "s3",
      title: "③ 숲의 속삭임",
      body: "녹빛 안개가 계약의 문장을 속삭인다.",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "green",
      choices: [
        { label: "계약한다", effect: "gain_green_spell" },
        { label: "힘으로 제압한다", effect: "battle_dryad_reward" },
        { label: "무시한다", effect: "mana_recover" }
      ]
    },
    {
      id: "s4",
      title: "④ 붉은 하늘",
      body: "폭발음이 멀리서 울리고 붉은 잔광이 번진다.",
      image: "assets/씬/scene_crimson_sky_tower.png",
      tone: "red",
      choices: [
        { label: "근원으로 간다", effect: "battle_red_mage" },
        { label: "멀리서 관찰한다", effect: "enemy_intel" },
        { label: "다른 길을 택한다", effect: "relic_pick" }
      ]
    },
    {
      id: "s5",
      title: "⑤ 폐허의 금서",
      body: "마탑 서고의 잔해 속에서 금서가 맥동한다.",
      image: "assets/씬/scene_ruined_gate_trail.png",
      tone: "amber",
      choices: [
        { label: "읽는다", effect: "gain_circle3_with_hp_cost" },
        { label: "봉인한다", effect: "max_heart_up" },
        { label: "찢어버린다", effect: "status_res_up" }
      ]
    },
    {
      id: "s6",
      title: "⑥ 청색의 달라한스",
      body: "푸른 마법사 달라한스가 길목에서 술식을 펼친다.",
      image: "assets/씬/scene_valley_bridge_path.png",
      tone: "blue",
      choices: [
        { label: "전투", effect: "battle_dalahans_blue" },
        { label: "대화 시도", effect: "intel_and_weaken" },
        { label: "술식 교환 제안", effect: "random_spell_trade" }
      ]
    },
    {
      id: "s7",
      title: "⑦ 오염 지역",
      body: "마력이 뒤틀린 땅이 호흡처럼 요동친다.",
      image: "assets/씬/scene_crimson_sky_tower.png",
      tone: "red",
      choices: [
        { label: "깊이 들어간다", effect: "battle_hard_relic" },
        { label: "가장자리 탐색", effect: "mid_reward" },
        { label: "돌아간다", effect: "heal_small" }
      ]
    },
    {
      id: "s8",
      title: "⑧ 사라진 제자의 흔적",
      body: "익숙한 마력 파동이 끊긴 시간의 끝에서 스민다.",
      image: "assets/씬/scene_ruined_gate_trail.png",
      tone: "blue",
      choices: [
        { label: "추적한다", effect: "battle_trace_memory" },
        { label: "기억을 되살린다", effect: "memory_plus" },
        { label: "모른 척한다", effect: "no_change" }
      ]
    },
    {
      id: "s9",
      title: "⑨ 세상 끝의 마탑",
      body: "공간이 비틀리고 마탑의 그림자가 갈라진다.",
      image: "assets/씬/scene_crimson_sky_tower.png",
      tone: "red",
      choices: [
        { label: "정면 돌파", effect: "battle_boss_now" },
        { label: "술식 정비 후 진입", effect: "heart_up_boss_up" },
        { label: "다른 루트 탐색", effect: "battle_miniboss_relic" }
      ]
    },
    {
      id: "s10",
      title: "⑩ 마도왕과의 대면",
      body: "“나는 그들을 되살리고 싶었을 뿐이다.”",
      image: "assets/씬/scene_crimson_sky_tower.png",
      tone: "red",
      choices: [
        { label: "공격한다", effect: "battle_final_now" },
        { label: "설득한다", effect: "battle_weaken_phase1" },
        { label: "시간을 멈춘다", effect: "battle_with_shield_100" }
      ]
    }
  ];

  const initialLegacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
  const initialFormulaBook = loadStoredFormulaBook(initialLegacySlots);
  const initialActiveFormula = initialFormulaBook.formulas[initialFormulaBook.activeFormulaIndex] || initialFormulaBook.formulas[0];

  const player = {
    hp: 700,
    maxHp: 700,
    mp: 420,
    maxMp: 420,
    manaRegen: 24,
    maxHearts: PLAYER_MAX_HEARTS,
    shield: 0,
    formulaBook: initialFormulaBook,
    activeFormulaIndex: initialFormulaBook.activeFormulaIndex,
    activeFormulaId: initialActiveFormula.id,
    spellSlots: [...initialActiveFormula.spellIds],
    statuses: {}
  };

  const enemy = {
    hp: currentEnemyProfile().phaseDefs[0].maxHp,
    maxHp: currentEnemyProfile().phaseDefs[0].maxHp,
    mp: currentEnemyProfile().phaseDefs[0].enemyMaxMp,
    maxMp: currentEnemyProfile().phaseDefs[0].enemyMaxMp,
    manaRegen: currentEnemyProfile().phaseDefs[0].enemyManaRegen,
    maxHearts: 10,
    spellSlots: [...currentEnemyProfile().phaseDefs[0].enemyLoadout],
    cooldowns: Object.fromEntries(Object.keys(enemySpellLibrary).map((id) => [id, 0])),
    statuses: {}
  };

  const ui = {};
  const systems = {};

  function getActiveFormula() {
    return player.formulaBook.formulas[player.activeFormulaIndex] || player.formulaBook.formulas[0];
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
    const pool = spellList.filter(filterFn);
    if (pool.length === 0) return null;
    return pool[randomInt(0, pool.length - 1)];
  }

  function randomRelicName() {
    return relicPool[randomInt(0, relicPool.length - 1)];
  }

  function renderStoryHeroInfo() {
    if (!dom.storyHeroInfo) return;
    const lines = [
      `HP: ${Math.floor(player.hp)} / ${player.maxHp}`,
      `MP: ${Math.floor(player.mp)} / ${player.maxMp}`,
      `마나하트: ${player.maxHearts}`,
      `기억의 파편: ${state.story.memoryFragments}`,
      `적 술식 정보: ${state.story.enemyIntel}`,
      `획득 유물: ${state.story.relics.length > 0 ? state.story.relics.join(", ") : "없음"}`
    ];
    dom.storyHeroInfo.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
  }

  function renderStoryChoices(choices, onPick) {
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

  function sceneContinueButton() {
    renderStoryChoices([{ label: "다음 장면으로" }], () => {
      state.story.sceneIndex += 1;
      renderStoryScene();
    });
  }

  function startStoryBattle(config) {
    state.story.awaitingBattle = true;
    state.story.pendingBattle = config;
    setEnemyProfile(config.enemyProfileId || "allen");
    setWorldMode("battle");
    resetBattle();

    if (config.phase1EnemyHpMul) {
      enemy.maxHp = Math.max(1, Math.floor(enemy.maxHp * config.phase1EnemyHpMul));
      enemy.hp = enemy.maxHp;
    }
    if (config.playerShield) {
      player.shield += config.playerShield;
    }
    if (config.playerHpDelta) {
      player.hp = Math.min(player.maxHp, Math.max(1, player.hp + config.playerHpDelta));
    }
    if (config.playerMpDelta) {
      player.mp = Math.min(player.maxMp, Math.max(0, player.mp + config.playerMpDelta));
    }

    pushStoryLog(`전투 발생: ${config.enemyName}`);
    ui.combatLog.push(`스토리 전투: ${config.enemyName}`, true);
    startBattle();
  }

  function offerRelicSelection(onDone) {
    const options = [randomRelicName(), randomRelicName(), randomRelicName()];
    renderStoryChoices(options.map((name) => ({ label: `${name} 획득` })), (choice) => {
      const relicName = choice.label.replace(" 획득", "");
      state.story.relics.push(relicName);
      pushStoryLog(`유물 획득: ${relicName}`);
      onDone();
    });
  }

  function applySceneEffect(effectId) {
    if (effectId === "memory_plus") {
      state.story.memoryFragments += 1;
      pushStoryLog("기억의 파편 +1");
      sceneContinueButton();
      return;
    }
    if (effectId === "gain_random_circle1") {
      const spell = randomSpellBy((item) => item.circle === 1);
      pushStoryLog(`랜덤 1서클 주문 연구: ${spell ? spell.name : "없음"}`);
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
      startStoryBattle({ enemyName: "되살아난 농부" });
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
      const spell = randomSpellBy((item) => item.color === "green");
      pushStoryLog(`녹색 주문 연구: ${spell ? spell.name : "없음"}`);
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_dryad_reward") {
      startStoryBattle({
        enemyName: "드라이어드",
        enemyProfileId: "serion",
        onWin: () => {
          state.story.relics.push("심층 녹림의 인장");
          pushStoryLog("고급 보상 획득: 심층 녹림의 인장");
        }
      });
      return;
    }
    if (effectId === "mana_recover") {
      const gain = Math.floor(player.maxMp * 0.2);
      player.mp = Math.min(player.maxMp, player.mp + gain);
      pushStoryLog(`아무 일 없음. MP ${gain} 회복`);
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_red_mage") {
      startStoryBattle({ enemyName: "적색 술식 사용자", phase1EnemyHpMul: 1.08 });
      return;
    }
    if (effectId === "enemy_intel") {
      state.story.enemyIntel += 1;
      pushStoryLog("적 술식 정보 획득: 다음 전투 대응 +");
      sceneContinueButton();
      return;
    }
    if (effectId === "gain_circle3_with_hp_cost") {
      const spell = randomSpellBy((item) => item.circle === 3);
      const loss = Math.floor(player.maxHp * 0.14);
      player.hp = Math.max(1, player.hp - loss);
      pushStoryLog(`3서클 주문 연구: ${spell ? spell.name : "없음"} / HP ${loss} 감소`);
      sceneContinueButton();
      return;
    }
    if (effectId === "max_heart_up") {
      player.maxHearts = Math.min(15, player.maxHearts + 1);
      pushStoryLog(`마나하트 +1 (현재 ${player.maxHearts})`);
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
        onWin: () => {
          const spell = randomSpellBy((item) => item.color === "blue");
          pushStoryLog(`청색 주문 해금: ${spell ? spell.name : "없음"}`);
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
      const give = randomSpellBy(() => true);
      const take = randomSpellBy(() => true);
      pushStoryLog(`술식 교환: ${give ? give.name : "-"} -> ${take ? take.name : "-"}`);
      sceneContinueButton();
      return;
    }
    if (effectId === "battle_hard_relic") {
      startStoryBattle({
        enemyName: "오염핵 수호체",
        enemyProfileId: "serion",
        phase1EnemyHpMul: 1.15,
        onWin: () => {
          const relic = randomRelicName();
          state.story.relics.push(relic);
          pushStoryLog(`고급 유물 획득: ${relic}`);
        }
      });
      return;
    }
    if (effectId === "mid_reward") {
      player.mp = Math.min(player.maxMp, player.mp + 60);
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
      pushStoryLog("마나하트 +1, 다음 보스가 강화됩니다.");
      startStoryBattle({ enemyName: "강화된 세상 끝의 수문장", phase1EnemyHpMul: 1.2 });
      return;
    }
    if (effectId === "battle_miniboss_relic") {
      startStoryBattle({
        enemyName: "미니보스 - 심연의 파수꾼",
        onWin: () => {
          const relic = randomRelicName();
          state.story.relics.push(relic);
          pushStoryLog(`유물 획득: ${relic}`);
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
      if (typeof pending.onWin === "function") pending.onWin();
    } else {
      pushStoryLog(`전투 패배: ${pending.enemyName}`);
      if (typeof pending.onLose === "function") pending.onLose();
      player.hp = Math.floor(player.maxHp * 0.65);
      player.mp = Math.floor(player.maxMp * 0.45);
    }

    setWorldMode("story");
    resetBattle();
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

  function spellIconPath(spell) {
    return `assets/spells/${spell.id}.svg`;
  }

  function statusLine(status) {
    const nameMap = {
      burn: "화상",
      poison: "중독",
      slow: "둔화",
      weak: "약점",
      stun: "봉인/행동불가",
      inferno: "연옥 화상"
    };
    const chunks = [`${nameMap[status.id] || status.id}`];
    if (status.stacks) chunks.push(`${status.stacks}스택`);
    if (status.duration) chunks.push(`${status.duration}초`);
    if (status.dps) chunks.push(`매초 ${status.dps} 피해`);
    if (status.slowPct) chunks.push(`감속 ${status.slowPct}%`);
    if (status.vulnPct) chunks.push(`받피 +${status.vulnPct}%`);
    if (status.growPerTick) chunks.push(`피해/초 +${status.growPerTick} 증가`);
    return chunks.join(" / ");
  }

  function spellDetailLines(spell) {
    const lines = [];
    const hitCount = spell.hits || 1;
    const minTotal = spell.damage[0] * hitCount;
    const maxTotal = spell.damage[1] * hitCount;
    lines.push(`직접 피해: ${minTotal}~${maxTotal}${hitCount > 1 ? ` (${hitCount}타)` : ""}`);

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
    if (spell.id === "aerisAzureSeal") {
      lines.push(`봉인 판정: ${Math.floor((spell.executionChance || 0) * 100)}% (둔화/마비 시 보정)`);
      lines.push("성공: 적 최대 HP 65% 피해 + 봉인(행동불가) 3초");
      lines.push("실패: 적 최대 HP 34% 피해");
    }
    return lines;
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
    const info = {
      burn: { icon: "🔥", name: "화상", effect: "지속 피해" },
      poison: { icon: "☠", name: "중독", effect: "지속 피해" },
      bleed: { icon: "🩸", name: "출혈", effect: "지속 피해" },
      slow: { icon: "🕒", name: "둔화", effect: "행동 속도 감소" },
      stun: { icon: "⚡", name: "마비", effect: "일시 행동 불능" },
      shield: { icon: "🛡", name: "보호막", effect: "피해 흡수" },
      weak: { icon: "💥", name: "약점", effect: "받는 피해 증가" },
      mark: { icon: "👁", name: "표식", effect: "보호막 추가 파괴" },
      overheat: { icon: "⚠", name: "과열", effect: "치명타율 증가" },
      inferno: { icon: "🔥", name: "연옥 화상", effect: "매초 피해가 증가하는 화상" }
    };

    function tooltipFor(id, status) {
      const base = info[id] || { name: id };
      const lines = [`${base.name} x${status.stacks || 1}`];
      if (base.effect) {
        lines.push(`효과: ${base.effect}`);
      }
      if (typeof status.dps === "number") {
        lines.push(`매초 ${status.dps * (status.stacks || 1)} 피해`);
      }
      if (typeof status.growPerTick === "number" && status.growPerTick > 0) {
        lines.push(`피해 증가: 매초 +${status.growPerTick}`);
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
      openStatusId = null;
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".status-icon")) {
        closeAll();
      }
    });

    return {
      render(statuses) {
        const entries = Object.entries(statuses).filter(([, value]) => value && value.remaining > 0);
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
          const meta = info[id] || { icon: "?", name: id };
          const detailText = tooltipFor(id, value);
          let node = nodesById.get(id);
          if (!node) {
            node = document.createElement("button");
            node.type = "button";
            node.className = "status-icon";
            node.innerHTML = `
              <span class="status-glyph"></span>
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

          node.querySelector(".status-glyph").textContent = meta.icon;
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
        if (dom.spellSlots.children.length !== player.spellSlots.length) {
          dom.spellSlots.innerHTML = "";
          player.spellSlots.forEach((spellId, index) => {
            const spell = spellLibrary[spellId];
            if (!spell) return;
            const card = document.createElement("article");
            card.dataset.slotIndex = String(index);
            card.innerHTML = `
              <div class="spell-art">
                <img class="spell-art-img" alt="">
              </div>
              <div class="spell-name"></div>
              <div class="spell-meta">
                <span class="meta-inline">
                  <span class="color-dot"></span>
                  <span class="archetype-tag"></span>
                </span>
                <span class="spell-tier"></span>
                <span class="spell-cost"></span>
                <span class="spell-warning"></span>
              </div>
              <div class="spell-tooltip"></div>
              <div class="cooldown-overlay">
                <div class="cooldown-fill"></div>
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

        player.spellSlots.forEach((spellId, index) => {
          const spell = spellLibrary[spellId];
          const card = dom.spellSlots.children[index];
          if (!spell || !card) return;

          const cd = state.cooldowns[spell.id] || 0;
          const cdProgress = Math.min(1, cd / spell.cooldown);
          card.className = `spell-slot ${spell.color} ${stateClass(spell)}`;
          if (flashing.has(index)) card.classList.add("casting");

          const art = card.querySelector(".spell-art-img");
          art.src = spellIconPath(spell);
          art.alt = `${spell.name} 아이콘`;
          card.querySelector(".spell-name").textContent = spell.name;
          card.querySelector(".color-dot").textContent = colorLabel(spell.color);
          card.querySelector(".archetype-tag").textContent = spell.archetype;
          card.querySelector(".spell-tier").textContent = `${spell.circle}서클 | 하트 ${spell.heartCost}`;
          card.querySelector(".spell-cost").textContent = `MP ${spell.manaCost} ${cdText(cd)}`;
          const detailLines = spellDetailLines(spell).map((line) => `• ${line}`).join("<br>");
          card.querySelector(".spell-tooltip").innerHTML = `<strong>${spell.name}</strong><br>${spell.description}<br>${detailLines}`;
          card.querySelector(".cooldown-fill").style.setProperty("--cd-progress", String(cdProgress));
          const warn = card.querySelector(".spell-warning");
          if (player.mp < spell.manaCost && cd <= 0) {
            warn.textContent = "MP 부족";
          } else {
            warn.textContent = "";
          }
        });
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

    function syncEnemyPortrait() {
      const profile = currentEnemyProfile();
      if (dom.enemyPortraitImg && profile.portrait) {
        dom.enemyPortraitImg.src = profile.portrait;
        dom.enemyPortraitImg.alt = `${profile.name} 초상화`;
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
            persistPlayerFormulaState();
          }
          dom.rearrangeHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
          renderPhaseBuffChoices();
        });

        dom.rearrangeSlots.appendChild(block);
      }
    }

    function colorCounts() {
      const counts = { blue: 0, red: 0, green: 0 };
      player.spellSlots.forEach((id) => {
        const spell = spellLibrary[id];
        if (spell && counts[spell.color] !== undefined) {
          counts[spell.color] += 1;
        }
      });
      return counts;
    }

    function applyPhaseBuff(choice) {
      if (choice === "blue") {
        const counts = colorCounts();
        const bonus = 4 + counts.blue * 2;
        systems.statusSystem.applyPlayer({ id: "bluePulse", duration: 9999, bonus, stacks: 1 });
        ui.combatLog.push(`강화 선택: 청색 공명 (MP 재생 +${bonus}/초)`, true);
      }
      if (choice === "red") {
        const counts = colorCounts();
        const damagePct = 10 + counts.red * 6;
        systems.statusSystem.applyPlayer({ id: "redFury", duration: 9999, damagePct, stacks: 1 });
        ui.combatLog.push(`강화 선택: 적색 격류 (적색 피해 +${damagePct}%)`, true);
      }
      if (choice === "green") {
        const counts = colorCounts();
        const reduction = 0.06 + counts.green * 0.04;
        const regenPerSec = 2 + counts.green;
        systems.statusSystem.applyPlayer({ id: "greenWard", duration: 9999, reduction, regenPerSec, stacks: 1 });
        ui.combatLog.push(`강화 선택: 녹색 생장 (피해감소 ${Math.floor(reduction * 100)}%, 초당 회복 ${regenPerSec})`, true);
      }
      state.phaseBuffChoice = choice;
      state.phaseBuffChosen = true;
      dom.readyBtn.disabled = false;
      renderPhaseBuffChoices();
    }

    function renderPhaseBuffChoices() {
      const counts = colorCounts();
      const blueBonus = 4 + counts.blue * 2;
      const redBonus = 10 + counts.red * 6;
      const greenReduction = Math.floor((0.06 + counts.green * 0.04) * 100);
      const greenRegen = 2 + counts.green;
      const choices = [
        { id: "blue", name: "청색 공명", desc: `MP 재생 +${blueBonus}/초` },
        { id: "red", name: "적색 격류", desc: `적색 마법 피해 +${redBonus}%` },
        { id: "green", name: "녹색 생장", desc: `피해감소 ${greenReduction}% + 초당 ${greenRegen} 회복` }
      ];
      dom.phaseBuffChoices.innerHTML = "";
      choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "phase-buff-btn";
        if (state.phaseBuffChoice === choice.id) {
          btn.classList.add("active");
        }
        btn.innerHTML = `<strong>${choice.name}</strong><span>${choice.desc}</span>`;
        btn.disabled = state.phaseBuffChosen;
        btn.addEventListener("click", () => {
          if (state.phaseBuffChosen) return;
          applyPhaseBuff(choice.id);
        });
        dom.phaseBuffChoices.appendChild(btn);
      });
      if (state.phaseBuffChosen) {
        dom.phaseBuffHint.textContent = "강화 선택 완료.";
      } else {
        dom.phaseBuffHint.textContent = "페이즈 강화 1개를 선택하세요.";
      }
    }

    return {
      resetPhase() {
        state.phaseIndex = 0;
        const phase = currentPhase();
        syncEnemyPortrait();
        enemy.maxHp = phase.maxHp;
        enemy.hp = phase.maxHp;
        enemy.maxMp = phase.enemyMaxMp;
        enemy.mp = phase.enemyMaxMp;
        enemy.manaRegen = phase.enemyManaRegen;
        enemy.spellSlots = [...phase.enemyLoadout];
        Object.keys(enemy.cooldowns).forEach((id) => {
          enemy.cooldowns[id] = 0;
        });
        enemy.statuses = {};
        setupPhaseAI();
      },
      maybeHandlePhaseDeath() {
        if (enemy.hp > 0 || state.mode !== "running") {
          return false;
        }

        if (state.phaseIndex < currentEnemyProfile().phaseDefs.length - 1) {
          state.phaseIndex += 1;
          const phase = currentPhase();

          // Phase transition reward: recover 25% of max resources.
          player.hp = Math.min(player.maxHp, player.hp + Math.floor(player.maxHp * 0.25));
          player.mp = Math.min(player.maxMp, player.mp + Math.floor(player.maxMp * 0.25));

          enemy.maxHp = phase.maxHp;
          enemy.hp = phase.maxHp;
          enemy.maxMp = phase.enemyMaxMp;
          enemy.mp = phase.enemyMaxMp;
          enemy.manaRegen = phase.enemyManaRegen;
          enemy.spellSlots = [...phase.enemyLoadout];
          Object.keys(enemy.cooldowns).forEach((id) => {
            enemy.cooldowns[id] = 0;
          });
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
            state.phaseBuffChosen = false;
            state.phaseBuffChoice = null;
            dom.rearrangePanel.classList.remove("hidden");
            dom.rearrangeError.textContent = "";
            dom.rearrangeHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
            dom.readyBtn.disabled = true;
            renderRearrange();
            renderPhaseBuffChoices();
            ui.combatLog.push("술식 재배치 시간(10초).", true);
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
          if (!state.phaseBuffChosen) {
            applyPhaseBuff("blue");
          }
          this.exitRearrange();
        }
      },
      exitRearrange() {
        if (state.mode !== "rearrange") return;
        if (!state.phaseBuffChosen) {
          dom.rearrangeError.textContent = "강화 선택 후 진행할 수 있습니다.";
          return;
        }
        dom.rearrangePanel.classList.add("hidden");
        state.mode = "running";
        systems.combatLoop.setPaused(false);
        ui.combatLog.push("술식 재배치 종료. 전투 재개.", true);
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

    if (spell.color === "red" && player.statuses.redFury) {
      damage = Math.floor(damage * (1 + (player.statuses.redFury.damagePct || 0) / 100));
    }
    damage = Math.floor(damage * (1 + state.playerDamageBonus));

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

    if (spell.mpRestore) {
      const gain = randomInt(spell.mpRestore[0], spell.mpRestore[1]);
      player.mp = Math.min(player.maxMp, player.mp + gain);
      line += ` MP ${gain} 회복.`;
    }

    if (spell.manaFlow) {
      systems.statusSystem.applyPlayer({ id: "manaFlow", duration: spell.manaFlow.duration, bonus: spell.manaFlow.bonus, stacks: 1 });
    }

    if (spell.enemyMpBurn) {
      const burn = randomInt(spell.enemyMpBurn[0], spell.enemyMpBurn[1]);
      const actualBurn = Math.min(enemy.mp, burn);
      enemy.mp = Math.max(0, enemy.mp - actualBurn);
      if (spell.mpStealRatio) {
        const gain = Math.floor(actualBurn * spell.mpStealRatio);
        player.mp = Math.min(player.maxMp, player.mp + gain);
        line += ` 적 MP ${actualBurn} 소각, MP ${gain} 흡수.`;
      } else {
        line += ` 적 MP ${actualBurn} 소각.`;
      }
    }

    if (spell.poisonRes) {
      systems.statusSystem.applyPlayer({ id: "poisonRes", duration: spell.poisonRes.duration, reduction: spell.poisonRes.reduction, stacks: 1 });
    }

    if (spell.reactiveSlow) {
      systems.statusSystem.applyPlayer({ id: "reactiveSlow", duration: spell.reactiveSlow.duration, slowPct: spell.reactiveSlow.slowPct, stacks: 1 });
    }

    if (spell.summonDryad) {
      systems.statusSystem.applyPlayer({
        id: "dryad",
        duration: spell.summonDryad.duration,
        stacks: 1,
        dryadCastIndex: 0,
        ...spell.summonDryad
      });
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

  function castEnemySpell(spellId, options = {}) {
    const spell = enemySpellLibrary[spellId];
    if (!spell) return { ok: false, reason: "missing" };
    if (!enemy.spellSlots.includes(spellId)) return { ok: false, reason: "not-equipped" };
    if ((enemy.cooldowns[spell.id] || 0) > 0) return { ok: false, reason: "cooldown" };
    if (enemy.mp < spell.manaCost) return { ok: false, reason: "mana" };

    enemy.mp = Math.max(0, enemy.mp - spell.manaCost);
    enemy.cooldowns[spell.id] = spell.cooldown;

    let damage = 0;
    const hitCount = spell.hits || 1;
    for (let i = 0; i < hitCount; i += 1) {
      damage += randomInt(spell.damage[0], spell.damage[1]);
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

    const dealt = dealPlayerDamage(damage, { shieldBreakMul: spell.shieldBreakMul || 1 });
    applyReactiveSlow();

    if (spell.addPlayerStatus) {
      systems.statusSystem.applyPlayer(spell.addPlayerStatus);
    }
    if (spell.addEnemyStatus) {
      systems.statusSystem.applyEnemy(spell.addEnemyStatus);
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
    return { ok: true, dealt };
  }

  function runAutoCast(dt) {
    state.castGap = Math.max(0, state.castGap - dt);
    if (state.castGap > 0) return;
    if (player.statuses.stun) return;

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

  function playerManaRegenPerSec() {
    const flow = player.statuses.manaFlow ? (player.statuses.manaFlow.bonus || 0) : 0;
    const bluePulse = player.statuses.bluePulse ? (player.statuses.bluePulse.bonus || 0) : 0;
    return player.manaRegen + flow + bluePulse;
  }

  function phase1AI(dt) {
    state.ai.rapidTimer -= dt;
    state.ai.burstTimer -= dt;

    if (state.ai.rapidTimer <= 0) {
      state.ai.rapidTimer += 1.05 + Math.random() * 0.25;
      const cast = castEnemySpell("flareBurst");
      if (!cast.ok) {
        castEnemySpell("scarletShard");
      }
    }

    if (state.ai.burstTimer <= 0) {
      state.ai.burstTimer += 4.6 + Math.random() * 1.2;
      const cast = castEnemySpell("allenTrueName", { logName: `4서클 마법 '${currentPhase().name}'`, important: true });
      if (!cast.ok) {
        castEnemySpell("brandBreaker");
      }
    }
  }

  function phase2AI(dt) {
    state.ai.basicTimer -= dt;

    if (state.ai.charging) {
      state.ai.chargeRemaining -= dt;
      if (state.ai.chargeRemaining <= 0) {
        state.ai.charging = false;
        state.ai.chargeRemaining = 3.4 + Math.random() * 1.1;
        const cast = castEnemySpell("skyFallingFlame", { logName: "4서클 마법 '불꽃이 내리는 하늘'", important: true });
        if (!cast.ok) {
          castEnemySpell("infernoCharge");
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
      const cast = castEnemySpell("flameStrike");
      if (!cast.ok) {
        castEnemySpell("allensMark");
      }
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
      const cast = castEnemySpell("ragingFlare", { rampBonus: state.ai.phase3Ramp * 3, important: true });
      if (!cast.ok) {
        castEnemySpell("purgatoriumEcho", { rampBonus: Math.floor(state.ai.phase3Ramp * 1.5), important: true });
      }
    }

    if (state.ai.meltdownRemaining <= 0) {
      const cast = castEnemySpell("selfImmolation", { logName: "푸르가토리움 붕괴", important: true });
      if (!cast.ok) {
        const dealt = dealPlayerDamage(randomInt(96, 132));
        applyReactiveSlow();
        ui.combatLog.push(`알렌: 푸르가토리움 붕괴! ${dealt} 피해.`, true);
      }
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
    player.mp = Math.min(player.maxMp, player.mp + playerManaRegenPerSec() * dt);
    enemy.mp = Math.min(enemy.maxMp, enemy.mp + enemy.manaRegen * dt);
    if (player.statuses.greenWard && player.statuses.greenWard.regenPerSec) {
      player.hp = Math.min(player.maxHp, player.hp + player.statuses.greenWard.regenPerSec * dt);
    }

    spellList.forEach((spell) => {
      state.cooldowns[spell.id] = Math.max(0, (state.cooldowns[spell.id] || 0) - dt);
    });
    Object.keys(enemy.cooldowns).forEach((id) => {
      enemy.cooldowns[id] = Math.max(0, (enemy.cooldowns[id] || 0) - dt);
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
    dom.playerMpFill.style.width = `${Math.max(0, (player.mp / player.maxMp) * 100)}%`;
    dom.bossHpFill.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
    dom.bossMpFill.style.width = `${Math.max(0, (enemy.mp / enemy.maxMp) * 100)}%`;

    dom.playerHpText.textContent = `${Math.floor(player.hp)} / ${player.maxHp}`;
    dom.playerMpText.textContent = `${Math.floor(player.mp)} / ${player.maxMp}`;
    dom.bossHpText.textContent = `${Math.floor(enemy.hp)} / ${enemy.maxHp}`;
    dom.bossMpText.textContent = `${Math.floor(enemy.mp)} / ${enemy.maxMp}`;

    dom.heartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts} | 보호막 ${Math.floor(player.shield)}`;
    dom.enemyHeartText.textContent = `보스 하트: ${enemyUsedHearts()} / ${enemy.maxHearts}`;
    dom.loadoutHeartText.textContent = `마나 하트: ${usedHearts()} / ${player.maxHearts}`;
    dom.loadoutSlots.querySelectorAll("select").forEach((select) => {
      select.disabled = state.mode !== "prep";
    });
    dom.speedBtn.textContent = `속도 x${state.speed}`;
    dom.speedBtn.classList.toggle("active", state.speed > 1);

    if (state.mode === "running") dom.phasePill.textContent = `페이즈 ${state.phaseIndex + 1}`;
    if (state.mode === "rearrange") dom.phasePill.textContent = "재배치";
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
    state.pendingTimeout = null;
    state.phaseBuffChosen = false;
    state.phaseBuffChoice = null;

    resetCooldowns();

    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.shield = 0;
    player.statuses = {};
    const legacySlots = loadStoredSpellSlots() || [...DEFAULT_PLAYER_SPELL_SLOTS];
    player.formulaBook = loadStoredFormulaBook(legacySlots);
    player.activeFormulaIndex = player.formulaBook.activeFormulaIndex;
    syncPlayerSlotsFromActiveFormula();
    persistPlayerFormulaState();
    renderPrepLoadout();

    systems.phaseSystem.resetPhase();

    dom.rearrangePanel.classList.add("hidden");
    dom.phaseBuffChoices.innerHTML = "";
    dom.phaseBuffHint.textContent = "페이즈 강화 1개를 선택하세요.";
    dom.readyBtn.disabled = false;
    systems.combatLoop.setPaused(true);

    ui.combatLog.clear();
    ui.combatLog.push("전투 초기화 완료.");
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
