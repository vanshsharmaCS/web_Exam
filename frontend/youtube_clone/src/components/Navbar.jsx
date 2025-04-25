import { useState } from 'react'
function Navbar() {
  return (
    <>
    <h1>Youtube</h1>
    // the nav bar list element home contact about
    <ul>
      <button>Home</button>
      <button>Contact</button>
      <button>About</button>
    </ul>
    <input type="text" placeholder="Search" />
    <button>Search</button>
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="logo" />
    </>
  )
}
export default Navbar
