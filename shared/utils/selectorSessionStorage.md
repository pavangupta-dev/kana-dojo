# Selector Session Storage

`selectorSessionStorage.ts` owns short-lived selector persistence for training
menus. It uses `sessionStorage`, not `localStorage`, so the remembered selection
is scoped to the current browser tab session.

## Kana

- Key: `kana-unit-selector-selection`
- Stored state:
  - `selected`: `hiragana` or `katakana`
  - `selectedSubset`: `base`, `dakuon`, `yoon`, or `foreign`
- Reader/writer: `features/Kana/components/KanaCards/index.tsx`
- Reset boundary: `features/Kana/components/Game/index.tsx`

When a user changes the Kana card selector, the selected unit and subset are
saved immediately. If they leave the Kana page and later return during the same
browser tab session, the card selector restores that saved unit/subset.

Starting a new Kana classic training session clears the saved selector state.
After that reset, the next Kana card selector mount falls back to Hiragana Base.

## Kanji And Vocabulary

- Keys:
  - `kanji-unit-selector-selection`
  - `vocabulary-unit-selector-selection`
- Stored state:
  - `selectedCollection`: the active JLPT collection (`n5` through `n1`)
  - `selectedSubunitByUnit`: selected subunit id per collection
- Reader/writer: `shared/ui-composite/Menu/UnitSelector.tsx`
- Reset boundaries:
  - `features/Kanji/components/Game/index.tsx`
  - `features/Vocabulary/components/Game/index.tsx`

When a user changes the shared Kanji/Vocabulary unit selector, the selected unit
and per-unit subunit map are saved for the active content type. Returning to the
menu in the same browser tab session restores that unit and subunit.

Starting a new Kanji or Vocabulary classic training session clears the relevant
session-storage key and resets the in-memory selector state to Unit 1 / N5,
subunit `1-10`. That keeps the next post-session return at the default starting
point instead of the unit used to launch the previous training session.
