import { DOG_VISION_MATRIX, DOG_VISION_STD_DEV } from '../lib/dogVision'

const matrixValues = DOG_VISION_MATRIX.join(' ')

export function DogVisionFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute' }}
    >
      <filter id="dog-vision-filter">
        <feColorMatrix type="matrix" values={matrixValues} />
        <feGaussianBlur stdDeviation={DOG_VISION_STD_DEV} />
      </filter>
    </svg>
  )
}
