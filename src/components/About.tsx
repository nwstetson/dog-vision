const references = [
  {
    id: 1,
    citation:
      'Neitz, J., Geist, T., & Jacobs, G. H. (1989). Color vision in the dog. Visual Neuroscience, 3(2), 119-125.',
    url: 'https://doi.org/10.1017/S0952523800004430',
  },
  {
    id: 2,
    citation:
      'Miller, P. E., & Murphy, C. J. (1995). Vision in dogs. Journal of the American Veterinary Medical Association, 207(12), 1623-1634.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8537658/',
  },
  {
    id: 3,
    citation:
      'Byosiere, S. E., Chouinard, P. A., Howell, T. J., & Bennett, P. C. (2018). What do dogs (Canis familiaris) see? A review of vision in dogs and implications for cognition research. Psychonomic Bulletin & Review, 25, 1798-1813.',
    url: 'https://doi.org/10.3758/s13423-018-1487-4',
  },
]

export function About() {
  return (
    <section className="panel about-panel" aria-labelledby="about-title">
      <h2 id="about-title">About the science</h2>
      <p>
        Dogs are dichromats with two cone classes, so they discriminate a blue/yellow axis
        while having much less red/green hue separation [1,3]. This simulator applies a
        canine-inspired color matrix based on published dog-vision work [1].
      </p>
      <p>
        Dogs also have lower visual acuity than humans. A commonly cited estimate is near
        20/75, so this app adds slight blur to reflect reduced sharpness [2,3].
      </p>

      <h3>References</h3>
      <ol className="reference-list">
        {references.map((reference) => (
          <li key={reference.id}>
            <a href={reference.url} target="_blank" rel="noreferrer">
              {reference.citation}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
