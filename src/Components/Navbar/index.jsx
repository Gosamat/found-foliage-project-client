import React from 'react'

function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"}>Homepage</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/signup"}>Sign up</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/logout"}>Log Out</Link>
    </nav>
    </div>
  )
}

export default Navbar