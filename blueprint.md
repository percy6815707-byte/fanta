# Path of the Wandering Mage - Project Blueprint

## 1. Overview & Purpose

This document outlines the development plan for "Path of the Wandering Mage," a web-based, single-page auto-battle game prototype. The project will be built using vanilla HTML, CSS, and JavaScript, with no external frameworks, and will be prepared for deployment on Firebase Hosting.

The core of the game is a real-time combat system where a player-controlled mage automatically battles a multi-phase boss. The gameplay revolves around a unique "Circle Weight System" for spell management and strategic choices offered to the player during the boss's phase transitions.

## 2. Implemented Design, Style, and Features

This section will be updated as features are implemented.

*   **Initial Structure:**
    *   `index.html`: Main entry point containing the UI structure.
    *   `style.css`: Styles for the game's visual presentation.
    *   `game.js`: Core game logic, state management, and DOM manipulation.
*   **Visual Design:**
    *   A dark, fantasy-themed aesthetic suitable for a mage combat game.
    *   Clear visual hierarchy for player/boss stats, combat logs, and spell cooldowns.
    *   Responsive layout for various screen sizes.
*   **Core Systems (To be implemented):**
    *   Game Loop: A `setInterval` based loop to drive real-time auto-battle.
    *   State Management: Plain JavaScript objects to manage player, boss, and game state.
    *   UI Rendering: Functions to update the DOM based on state changes.
    *   Phase Machine: A state machine to control the boss's behavior across different phases.
    *   Spell System: Data structures and logic for spell casting, cooldowns, and the Circle Weight system.
    *   Status Effects: Logic for applying and tracking effects like FireStack, Poison, and Slow.

## 3. Current Development Plan

The following steps will be taken to build the initial prototype:

1.  **Project Reset:** The existing project files (`index.html`, `style.css`, `main.js`) will be replaced to reflect the new game concept. `main.js` will be removed and `game.js` will be created.
2.  **HTML Structure (`index.html`):**
    *   Create the main container for the game.
    *   Add divs for player stats (HP/MP), boss stats (HP), and phase display.
    *   Create a combat log area.
    *   Set up the 4 spell slots/buttons at the bottom.
    *   Design a hidden modal for phase transition choices.
3.  **CSS Styling (`style.css`):**
    *   Implement a dark theme with accent colors for spells and UI elements.
    *   Style the HP/MP bars.
    *   Style the spell buttons, including states for cooldown and being unusable.
    *   Style the combat log and phase transition modal.
4.  **Game Logic (`game.js`):**
    *   **Phase 1: Game State & Data:**
        *   Define initial state objects for the `player` and `boss`.
        *   Create a data structure (e.g., an array of objects) for all 12 spells with their properties (circle, cost, cooldown, etc.).
    *   **Phase 2: The Game Loop:**
        *   Initialize the main game loop (`setInterval`).
        *   Inside the loop, call placeholder functions for `playerAction()`, `bossAction()`, and `updateUI()`.
    *   **Phase 3: Core Actions & UI:**
        *   Implement `playerAction()`: Logic to automatically select and cast an available spell.
        *   Implement `bossAction()`: Logic for the boss's Phase 1 attacks.
        *   Implement `updateUI()`: Functions to render HP/MP bars, logs, and spell cooldowns based on the game state.
    *   **Phase 4: Advanced Systems:**
        *   Implement the full status effect logic (Fire, Poison, Slow, Overheat).
        *   Implement the phase transition logic, including pausing the game and showing the choice modal.
        *   Implement the Circle Weight System to validate equipped spells.
