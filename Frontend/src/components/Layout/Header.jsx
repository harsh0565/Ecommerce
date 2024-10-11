import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import SearchInput from '../Form/SearchInput';
import { useCategory } from '../../hooks/useCategory';
import { useCart } from '../context/Cart';
import { Badge } from 'antd'

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    window.location.reload();

  }
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand align-content-center" to="/">
            <img src="/images/logo.png" alt="" height={'40px'} /> <span className=' fst-italic'>Sengar</span></Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>


              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/categories"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li><Link className="dropdown-item" to={`/category/${c.slug}`} >{c.name}</Link></li>

                  ))}
                </ul>

              </li>
              {!auth.user ? (<>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">Register</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login" >Login</Link>
                </li>
              </>
              ) : (

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dahsboard</Link></li>
                    <li><Link className="dropdown-item" onClick={handleLogout} to={'/login'}>Logout</Link></li>
                  </ul>
                </li>
              )}

              <li class="nav-item">

                <Badge count={cart?.length} showZero>
                  <Link class="nav-link" to="/cart" > <h6>Cart</h6></Link>
                </Badge>

              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
