# Dog Vision Simulator

A React + Vite web app that simulates dog vision for uploaded media, sample images, and mobile live camera use.

## Features

- Upload an image or video and compare normal view vs simulated dog vision.
- Pick sample scenes from `public/samples/` (currently outdoors and agility course).
- On mobile devices, use live camera preview with the same dog-vision filter.
- Switch between side-by-side and toggle preview modes.
- Read the science and references in the in-app **About** page.

## Dog vision model used

- **Color (dichromacy):** The app applies a canine-oriented color transform matrix based on published dog color-vision work from Neitz et al. (1989), reducing red/green discrimination and preserving a blue/yellow axis.
- **Acuity:** The output includes slight Gaussian blur to approximate lower canine visual acuity (commonly cited near 20/75).

## Local development

```bash
npm install
npm run dev
```

Then open the URL shown by Vite (usually `http://localhost:5173`).

## Build and lint

```bash
npm run lint
npm run build
```

## References

1. Neitz, J., Geist, T., & Jacobs, G. H. (1989). *Color vision in the dog*. Visual Neuroscience, 3(2), 119-125. https://doi.org/10.1017/S0952523800004430
2. Miller, P. E., & Murphy, C. J. (1995). *Vision in dogs*. Journal of the American Veterinary Medical Association, 207(12), 1623-1634. https://pubmed.ncbi.nlm.nih.gov/8537658/
3. Byosiere, S. E., Chouinard, P. A., Howell, T. J., & Bennett, P. C. (2018). *What do dogs (Canis familiaris) see? A review of vision in dogs and implications for cognition research*. Psychonomic Bulletin & Review, 25, 1798-1813. https://doi.org/10.3758/s13423-018-1487-4
