export const defaultTheme = 'light';
export const availableThemes = ['light', 'dark'] as const;
export type ThemeName = typeof availableThemes[number];
