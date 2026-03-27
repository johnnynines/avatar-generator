export const theme = {
  colors: {
    primary: { 50:'#EBF5FF',100:'#E1EFFE',200:'#C3DDFD',300:'#A4CAFE',400:'#76A9FA',500:'#3F83F8',600:'#1C64F2',700:'#1A56DB',800:'#1E429F',900:'#233876' },
    secondary: { 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',300:'#CBD5E1',400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A' },
    accent: { 50:'#FDF2F8',100:'#FCE7F3',200:'#FBCFE8',300:'#F9A8D4',400:'#F472B6',500:'#EC4899',600:'#DB2777',700:'#BE185D',800:'#9D174D',900:'#831843' },
    success: { 50:'#ECFDF5',100:'#D1FAE5',200:'#A7F3D0',300:'#6EE7B7',400:'#34D399',500:'#10B981',600:'#059669',700:'#047857',800:'#065F46',900:'#064E3B' },
    warning: { 50:'#FFFBEB',100:'#FEF3C7',200:'#FDE68A',300:'#FCD34D',400:'#FBBF24',500:'#F59E0B',600:'#D97706',700:'#B45309',800:'#92400E',900:'#78350F' },
    error: { 50:'#FEF2F2',100:'#FEE2E2',200:'#FECACA',300:'#FCA5A5',400:'#F87171',500:'#EF4444',600:'#DC2626',700:'#B91C1C',800:'#991B1B',900:'#7F1D1D' },
    neutral: { 50:'#FAFAFA',100:'#F4F4F5',200:'#E4E4E7',300:'#D4D4D8',400:'#A1A1AA',500:'#71717A',600:'#52525B',700:'#3F3F46',800:'#27272A',900:'#18181B' }
  }
}

export function getColor(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], theme.colors)
}

export function getAvatarPalette(type) {
  const palettes = {
    'Decision Maker': [getColor('primary.900'),getColor('primary.700'),getColor('primary.500'),getColor('neutral.50')],
    'End User': [getColor('success.900'),getColor('success.700'),getColor('success.500'),getColor('neutral.50')],
    'Technical User': [getColor('secondary.900'),getColor('secondary.700'),getColor('secondary.500'),getColor('neutral.50')],
    'Administrator': [getColor('accent.900'),getColor('accent.700'),getColor('accent.500'),getColor('neutral.50')],
    'Manager': [getColor('error.900'),getColor('error.700'),getColor('error.500'),getColor('neutral.50')],
    'Executive': [getColor('primary.900'),getColor('secondary.900'),getColor('neutral.900'),getColor('neutral.50')],
    'Influencer': [getColor('warning.900'),getColor('warning.700'),getColor('warning.500'),getColor('neutral.50')],
    'Developer': [getColor('success.900'),getColor('success.700'),getColor('primary.700'),getColor('neutral.50')],
    'Designer': [getColor('accent.900'),getColor('accent.700'),getColor('error.700'),getColor('neutral.50')],
    'Business Analyst': [getColor('primary.900'),getColor('primary.700'),getColor('secondary.700'),getColor('neutral.50')]
  }
  return palettes[type] || [getColor('primary.900'),getColor('primary.700'),getColor('primary.500'),getColor('neutral.50')]
}

export function getIndustryColor(industry) {
  const colors = {
    'Technology': getColor('primary.50'),
    'Healthcare': getColor('success.50'),
    'Finance': getColor('warning.50'),
    'Education': getColor('accent.50'),
    'Manufacturing': getColor('neutral.100'),
    'Retail': getColor('primary.50'),
    'Professional Services': getColor('secondary.50'),
    'Media & Entertainment': getColor('error.50'),
    'Transportation': getColor('success.50'),
    'Energy': getColor('warning.50'),
    'Real Estate': getColor('accent.50')
  }
  return colors[industry] || getColor('neutral.50')
}
