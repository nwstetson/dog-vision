export type PageName = 'simulator' | 'about'

interface NavBarProps {
  currentPage: PageName
  onNavigate: (page: PageName) => void
}

export function NavBar({ currentPage, onNavigate }: NavBarProps) {
  return (
    <header className="top-nav" role="banner">
      <div className="top-nav__inner">
        <h1 className="site-title">Dog Vision Simulator</h1>
        <nav aria-label="Primary">
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className="nav-button"
                aria-current={currentPage === 'simulator' ? 'page' : undefined}
                onClick={() => onNavigate('simulator')}
              >
                Simulator
              </button>
            </li>
            <li>
              <button
                type="button"
                className="nav-button"
                aria-current={currentPage === 'about' ? 'page' : undefined}
                onClick={() => onNavigate('about')}
              >
                About
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
