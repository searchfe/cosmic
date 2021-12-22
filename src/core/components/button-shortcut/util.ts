import keycode from 'keycode';

export function normalizeShortcutKey(
  /** e.g.  "67" | "67,72" | "B" | "B,Z | "B,13""*/
  keys: string,
) {
  const shortcutKeycodes: number[] = [];
  let shortcutKeyText = '';
  keys.split(',').forEach((key: string) => {
    let text;
    if (parseFloat(key).toString() === 'NaN') {
      // case string
      shortcutKeycodes.push(keycode(key));
      text = key;
    } else {
      // case number
      shortcutKeycodes.push(parseInt(key, 10));
      text = keycode(parseInt(key, 10));
    }
    shortcutKeyText = shortcutKeyText || text.substring(0, 1).toUpperCase();
  });
  return {
    keycodes: shortcutKeycodes,
    text: shortcutKeyText,
  };
}
