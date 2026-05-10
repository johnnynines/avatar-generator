import { getAvatarPalette, getIndustryColor } from './theme'

// Deterministic random number generator based on seed string
function seededRandom(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash = hash & hash // Convert to 32-bit integer
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

// Generate a color palette based on persona type
function generatePalette(persona) {
  const palette = getAvatarPalette(persona.type)
  const backgroundColor = getIndustryColor(persona.industry)
  return { palette, backgroundColor }
}

// Generate a pattern based on persona data
function generatePattern(persona) {
  if (!persona) {
    return {
      pattern: Array(12).fill(Array(12).fill('#E5E7EB')),
      backgroundColor: '#F3F4F6'
    }
  }

  const size = 12
  const pattern = []
  const seed = `${persona.name || ''}${persona.job || ''}${persona.company || ''}`
  const { palette, backgroundColor } = generatePalette(persona)

  for (let y = 0; y < size; y++) {
    pattern[y] = []
    for (let x = 0; x < size / 2; x++) {
      const random = seededRandom(`${seed}${x}${y}`)
      const colorIndex = Math.floor(random * palette.length)
      pattern[y][x] = palette[colorIndex]
      pattern[y][size - 1 - x] = pattern[y][x]
    }
  }

  return { pattern, backgroundColor }
}

function renderPixel(px, py, ps, color, shape) {
  const cx = px + ps / 2
  const cy = py + ps / 2
  const r = ps / 2

  switch (shape) {
    case 'circle':
      return `<circle cx="${cx}" cy="${cy}" r="${r * 0.85}" fill="${color}" />`

    case 'triangle':
      return `<polygon points="${cx},${py + ps * 0.1} ${px + ps * 0.9},${py + ps * 0.9} ${px + ps * 0.1},${py + ps * 0.9}" fill="${color}" />`

    case 'diamond':
      return `<polygon points="${cx},${py} ${px + ps},${cy} ${cx},${py + ps} ${px},${cy}" fill="${color}" />`

    case 'square':
      return `<rect x="${px}" y="${py}" width="${ps}" height="${ps}" fill="${color}" />`

    case 'rounded':
    default:
      return `<rect x="${px}" y="${py}" width="${ps}" height="${ps}" fill="${color}" rx="2" ry="2" />`
  }
}

// Convert pattern to SVG
export function generateAvatar(persona, size = 100, shape = 'rounded') {
  if (!persona) {
    const defaultPattern = generatePattern(null)
    return generateSVG(defaultPattern, size, shape)
  }

  const { pattern, backgroundColor } = generatePattern(persona)
  return generateSVG({ pattern, backgroundColor }, size, shape)
}

export const SHAPES = ['rounded', 'square', 'circle', 'triangle', 'diamond']

// Helper function to generate SVG
function generateSVG({ pattern, backgroundColor }, size, shape) {
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="${size}" height="${size}" fill="${backgroundColor}" />`

  if (pattern) {
    const pixelSize = size / (pattern.length || 12)
    pattern.forEach((row, y) => {
      row.forEach((color, x) => {
        svg += renderPixel(x * pixelSize, y * pixelSize, pixelSize, color, shape)
      })
    })
  }

  svg += '</svg>'
  return `data:image/svg+xml;base64,${btoa(svg)}`
}
