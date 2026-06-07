export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
};

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#1D4ED8',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  success: '#16A34A',
  warning: '#F59E0B',
};

export const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#111827',
  primary: '#60A5FA',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#1E293B',
  success: '#22C55E',
  warning: '#FBBF24',
};
