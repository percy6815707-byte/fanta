# Formula System Migration (Spellbook -> Spell/Formula)

## 1) Target terms
- `Spell`: atomic combat unit (old: magic book entry).
- `Formula`: set of spells used as one battle package.
- `Player formulas`: up to 3 saved formulas, 1 active at a time.
- `Battle`: formula vs formula.

## 2) Data schema (v2)

```js
// spell (global library)
{
  id: "frostShackle",
  name: "Frost Shackle",
  circle: 3,                // 1..5
  color: "blue",            // blue | red | green
  archetype: "control",     // burst | control | dot | support
  manaCost: 31,
  cooldown: 5.6,
  tags: ["stun", "single"]
}

// formula (player/enemy loadout unit)
{
  id: "formula_blue_lock",
  name: "Blue Lock",
  spellIds: ["frostShard", "frostShackle", "azureSiphon", "manaSpring"],
  totalCircle: 9
}

// player formula book (saved set)
{
  schemaVersion: 2,
  maxFormulaSlots: 3,
  activeFormulaIndex: 0, // 0..2
  formulas: [
    { id: "f1", name: "Blue Lock", spellIds: ["frostShard", "frostShackle", "manaSpring", "fireball"] },
    { id: "f2", name: "Crimson Fall", spellIds: ["fireball", "blastBrand", "magmaEruption", "skyOfEmbers"] },
    { id: "f3", name: "Green Tide", spellIds: ["lifeSprout", "venomVine", "natureGrace", "dryadOfGreatForest"] }
  ]
}

// runtime combat snapshot
{
  manaHeart: { current: 3, max: 15 },
  player: {
    activeFormulaId: "f1",
    spellSlots: ["frostShard", "frostShackle", "manaSpring", "fireball"],
    cooldowns: { frostShard: 0, frostShackle: 0, manaSpring: 0, fireball: 0 }
  },
  enemy: {
    phaseFormulaId: "allen_phase_1",
    spellSlots: ["flareBurst", "scarletShard", "brandBreaker", "allenTrueName"]
  }
}
```

## 3) Storage keys
- Current: `fanta_spell_loadout_v1`
- New:
  - `fanta_formula_book_v2` (3 formulas + active index)
  - `fanta_formula_autoname_v1` (optional auto-name seed/history)

## 4) Migration mapping (v1 -> v2)
- Source: old 4-slot loadout array (`fanta_spell_loadout_v1`)
- Target:
  - create formula 1 from old slots
  - formula 2/3 from defaults (color starters)
  - set `activeFormulaIndex = 0`
- Keep old key for one release as fallback read-only.

## 5) Executable TODO (by file)

1. `game.js`
- Add data helpers:
  - `calcFormulaCircle(spellIds)`
  - `sanitizeFormula(formula, manaHeartCurrent)`
  - `sanitizeFormulaBook(book)`
- Replace `player.spellSlots` single source with:
  - `player.formulaBook`
  - `player.activeFormulaId`
  - derived `player.spellSlots = activeFormula.spellIds`
- Keep cast/cooldown behavior unchanged (only source array changes).
- Phase transition hook:
  - in `systems.phaseSystem.maybeHandlePhaseDeath()`
  - open formula switch UI (existing rearrange panel can be reused first)
  - on switch: recover partial MP, clear formula-bound buffs, preserve cooldowns.

2. `spellbook.js`
- Convert from single loadout editor to formula editor:
  - tabs for Formula 1/2/3
  - formula name input
  - spell select for each formula
  - circle sum preview vs current mana heart
- Save to `fanta_formula_book_v2`.

3. `spellbook.html`
- Rename UI text from `마법서 로드아웃` to `술식 관리`.
- Add formula name field and active formula selector.

4. `index.html`
- Rename player panel label to formula terminology.
- Keep current 4-slot battle bar; it now visualizes active formula.

5. `style.css` / `spellbook.css`
- Add styles for 3 formula cards and active indicator.

## 6) Rules to enforce in code
- Formula count: max 3.
- Equip check: `sum(circle) <= manaHeart.current`.
- Switch timing: only on enemy phase transition.
- Switch effects:
  - recover MP percent (currently 25% is already in phase transition flow).
  - remove formula-specific buffs (`bluePulse`, `redFury`, `greenWard` in current code).
  - do not reset cooldowns.

## 7) Suggested implementation order
1. Data/storage migration (`game.js`, `spellbook.js`).
2. UI labels and formula naming.
3. Phase-transition formula switch.
4. Buff-clearing and cooldown-preservation validation.
5. Optional auto-name generator.

## 8) Definition of done
- Player can save 3 named formulas.
- Battle starts with active formula.
- Player can switch formula only during enemy phase transition.
- Heart/circle validation blocks invalid formulas.
- Enemy status icon/tooltip behavior remains unchanged.
