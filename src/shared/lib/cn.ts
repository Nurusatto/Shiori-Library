export const cn = (styles: Record<string, string>, className: string): string =>
  styles[className] || className;
