/**
 * One place for every colour and size, so 65 videos look like one course.
 * "Looks like Miro" is a styling problem: generous padding, rounded corners,
 * one soft shadow, two-tone accents per role, one typeface, a real grid.
 */

export const theme = {
  bg: '#0F172A',
  bgGrid: 'rgba(148, 163, 184, 0.07)',
  gridSize: 60,

  text: '#F1F5F9',
  textMuted: '#94A3B8',
  textFaint: '#64748B',

  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif",

  card: {
    radius: 22,
    border: 2,
    shadow: '0 24px 60px rgba(0,0,0,0.45)',
  },

  edge: {
    width: 4,
    colour: '#64748B',
  },

  accents: {
    blue:  { fill: '#1E3A5F', border: '#38BDF8', glow: 'rgba(56,189,248,0.22)', text: '#E0F2FE' },
    green: { fill: '#14432F', border: '#34D399', glow: 'rgba(52,211,153,0.22)', text: '#D1FAE5' },
    amber: { fill: '#45320E', border: '#FBBF24', glow: 'rgba(251,191,36,0.22)', text: '#FEF3C7' },
    slate: { fill: '#1E293B', border: '#94A3B8', glow: 'rgba(148,163,184,0.18)', text: '#E2E8F0' },
    red:   { fill: '#4C1D24', border: '#FB7185', glow: 'rgba(251,113,133,0.22)', text: '#FFE4E6' },
  },
} as const

export const FPS = 30
export const WIDTH = 1920
export const HEIGHT = 1080
