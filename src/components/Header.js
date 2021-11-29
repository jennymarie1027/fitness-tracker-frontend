import { Link } from 'react-router-dom';

const Header = ({ token }) => {
    return (
        <header className='navbar navbar-expand-sm navbar-light bg-light fixed-top'>
            <Link to='/' className='navbar-brand mb-0 h1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
            </svg> 
            </Link>
            <button 
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                className='navbar-toggler'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/routines' className='nav-link'> Routines </Link>
                <Link to='/activities' className='nav-link'> Activities </Link>
            {!token ? ( 
                <>
                <Link to='/login' className='nav-link'> Login </Link>
            </>
            ) : ( 
                <>
                <Link to='/myroutines' className='nav-link'> My Routines </Link>
                <Link to='/profile' className='nav-link'> Profile </Link>
                <Link to='/logout' className='nav-link'> Logout </Link>
             </> 
             )}
            </div>
        </header>
    )
}

export default Header;