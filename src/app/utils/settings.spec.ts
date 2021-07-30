test('Basic', async () => {
  const [{ default: settingsA }, { default: settingsB }] = await Promise.all([
    import('./settings'),
    import('./settings'),
  ]);

  try {
    expect(settingsA.get('check')).toBeFalsy();
    settingsA.set('check', true);
    expect(settingsB.get('check')).toBeTruthy();
  } finally {
    settingsA.clear();
  }
});
