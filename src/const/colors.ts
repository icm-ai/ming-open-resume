export interface ColorPalette {
  name: string;
  colors: {
    '--color-primary': string;
    '--color-secondary': string;
    '--color-accent': string;
    '--color-text-primary': string;
    '--color-text-secondary': string;
    '--color-background': string;
    '--color-border': string;
  };
}

export const colorPalettes: ColorPalette[] = [
  {
    name: 'Default',
    colors: {
      '--color-primary': '#09090b',
      '--color-secondary': '#fafafa',
      '--color-accent': '#fafafa',
      '--color-text-primary': '#09090b',
      '--color-text-secondary': '#737373',
      '--color-background': '#ffffff',
      '--color-border': '#e5e7eb', // Default light border
    },
  },
  {
    name: 'Corporate Blue',
    colors: {
      '--color-primary': '#005f73',
      '--color-secondary': '#0a9396',
      '--color-accent': '#94d2bd',
      '--color-text-primary': '#333333',
      '--color-text-secondary': '#555555',
      '--color-background': '#f8f9fa',
      '--color-border': '#ced4da',
    },
  },
  {
    name: 'Modern Dark',
    colors: {
      '--color-primary': '#1a1a1a',
      '--color-secondary': '#2c2c2c',
      '--color-accent': '#3f88c5',
      '--color-text-primary': '#e0e0e0',
      '--color-text-secondary': '#b0b0b0',
      '--color-background': '#121212',
      '--color-border': '#444444', // Dark border
    },
  },
  {
    name: 'Elegant Purple',
    colors: {
      '--color-primary': '#4a0072',
      '--color-secondary': '#6a0dad',
      '--color-accent': '#c471ed',
      '--color-text-primary': '#f3e5f5',
      '--color-text-secondary': '#d1c4e9',
      '--color-background': '#311b40',
      '--color-border': '#5c3b70', // Purple-ish dark border
    },
  },
];

export const defaultPalette = colorPalettes[0];
