import './Header.styled.scss'

import { useLocation, useNavigate } from 'react-router-dom'

import { RoutesManager } from '../../routesManager'
import { Logo } from '../../ui-base/logo/Logo'

export const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className="container">
      <Logo />
      <div className="buttonsWrapper">
        <button
          className={pathname === '/home' ? 'active' : ''}
          onClick={() => navigate(RoutesManager.home.root.getURL())}
        >
          Home
        </button>
      </div>
    </header>
  )
}
