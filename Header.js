import { Link } from 'react-router-dom';

const Header = ({ token }) => {
    return (
        <header>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <Link to='/'>Home</Link>
            {!token ? ( 
            <>
                {/* <Link to='/login'> Login </Link>
                <Link to='/activities'> Activities </Link>
                <Link to='/routines'> Routines </Link> */}
            </>
            ) : ( 
            <>
                
                <Link to='/profile' className='nav-link'> Profile </Link>
                <Link to='/activities'> Activities </Link>
                <Link to='/routines'> Routines </Link>
                <Link to='/myroutines'> My Routines </Link>
                <Link to='/logout' className='nav-link'> Logout </Link>
             </> 
             )}
            </div>
        </header>
    )
}

export default Header;