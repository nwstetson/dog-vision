// Adapted for canine dichromacy simulation from Neitz et al. (1989).
// This matrix collapses most red/green hue separation while preserving
// a blue/yellow axis and is applied before a small blur for acuity.
export const DOG_VISION_MATRIX = [
  0.25, 0.7, 0.05, 0, 0,
  0.25, 0.7, 0.05, 0, 0,
  0.0, 0.3, 0.7, 0, 0,
  0.0, 0.0, 0.0, 1, 0,
]

// Slight blur approximates reduced canine acuity (~20/75 in review literature).
export const DOG_VISION_STD_DEV = 1.1
