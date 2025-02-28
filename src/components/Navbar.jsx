import React, { useState, useEffect, useContext } from 'react'; 
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import supabase from '../supabase/client';
import { Link , useLoaderData} from 'react-router';
import AutoSuggestSearch from './AutoSearch';
import InputGroup from 'react-bootstrap/InputGroup';
import nav from '../css/nav.module.css';
import SessionContext from "../globalContext/SessionContext";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Avatar from '../AvatarUi/Avatar';
import useProfile from '../hooks/useProfile';


function NavbarComponent() {
    const [isSticky, setIsSticky] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { username, avatar_url } = useProfile();
    const session = useContext(SessionContext);
    
    const data = useLoaderData() || { genres: [], platforms: [] };
    const genres = data.genres || [];
    const platforms = data.platforms || [];

    const [showAllGenres, setShowAllGenres] = useState(false);
    const [showAllPlatforms, setShowAllPlatforms] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleScroll = () => {
            setIsSticky(window.scrollY > 1000);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error);
        }
    };

    return (
        <>
            {/* Navbar principale */}
            <Nav className={`${nav.nav} ${isSticky ? nav.sticky : ''}`}>
                {isMobile && (
                    <Button variant="dark" className={nav.menuToggle} onClick={() => setShowOffcanvas(true)}>
                        <i className="bi bi-list"></i>
                    </Button>
                )}

                <InputGroup className={nav.searchContainer}>
                    <Link to="/" className={nav.logo}>
                        <span>
                            <img 
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '5px', marginBottom: '5px'}} 
                                src="/gaming.jpg" 
                                alt="GameFrame"
                            />
                            GameFrame
                        </span>
                    </Link>

                    <AutoSuggestSearch />

                    {session ? (
                        <div className={nav.navLinks}>
                            <Dropdown as={NavItem}>
                                <Dropdown.Toggle as={NavLink} className={nav.dropToggle} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ fontSize: '20px', color: '#ccc', marginRight: '15px' }}> {username} </div>
                                    <Link to="/profile">
                                        {avatar_url ? 
                                            <Avatar url={avatar_url} size="35px" style={{ fontSize: '10px', color: '#ccc', marginLeft: '5px' }} /> :
                                            <i className="bi bi-person-circle" style={{ fontSize: '20px', color: '#ccc' }}></i>
                                        }
                                    </Link>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} className={nav.drop} to="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} className={nav.drop} to="/settings">Settings</Dropdown.Item>
                                    <Dropdown.Item className={nav.drop} onClick={signOut}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className={nav.navLinks}>
                            <ul>
                                <li><Link to="/login">Log in</Link></li>
                                <li><Link to="/register">Sign up</Link></li>
                            </ul>
                        </div>
                    )}
                </InputGroup>
            </Nav>

            {/* Offcanvas Sidebar solo per mobile */}
            {isMobile && (
                <Offcanvas className={nav.offcanvas} show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
                    <Offcanvas.Header closeButton closeVariant="white" >
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {session ? (
                                <ul>
                                    <li><Link className={nav.navLink} to="/" onClick={() => setShowOffcanvas(false)}>Home</Link></li>
                                    <li><Link className={nav.navLink} to="/profile" onClick={() => setShowOffcanvas(false)}>Your Profile</Link></li>
                                    <li><Link className={nav.navLink} to="/favorites" onClick={() => setShowOffcanvas(false)}>Your Favorites</Link></li>
                                    <li><Link className={nav.navLink} to="/reviews" onClick={() => setShowOffcanvas(false)}>Your Reviews</Link></li>
                                    <li><Button variant="danger" onClick={signOut}>Logout</Button></li>
                                </ul>
                            ) : (
                                <ul>
                                    <li><Link className={nav.navLink} to="/" onClick={() => setShowOffcanvas(false)}>Home</Link></li>
                                    <li><Link className={nav.navLink} to="/register" onClick={() => setShowOffcanvas(false)}>Register</Link></li>
                                    <li><Link className={nav.navLink} to="/login" onClick={() => setShowOffcanvas(false)}>Login</Link></li>
                                </ul>
                            )}

                            {/* Sezione Generi */}
                            <h3>Genres</h3>
                            {genres.slice(0, 3).map(genre => (
                                <Link key={genre.id} to={`/games/${genre.slug}`} className={nav.navLink} onClick={() => setShowOffcanvas(false)}>
                                    {genre.name}
                                </Link>
                            ))}
                            {showAllGenres && genres.slice(3).map(genre => (
                                <Link key={genre.id} to={`/games/${genre.slug}`} className={nav.navLink} onClick={() => setShowOffcanvas(false)}>
                                    {genre.name}
                                </Link>
                            ))}
                            <Button variant="link" onClick={() => setShowAllGenres(!showAllGenres)}>
                                {showAllGenres ? 'Show Less' : 'Show More'}
                            </Button>

                            {/* Sezione Piattaforme */}
                            <h3>Platforms</h3>
                            {platforms.slice(0, 3).map(platform => (
                                <Link key={platform.id} to={`/platforms/${platform.slug}`} className={nav.navLink} onClick={() => setShowOffcanvas(false)}>
                                    {platform.name}
                                </Link>
                            ))}
                            {showAllPlatforms && platforms.slice(3).map(platform => (
                                <Link key={platform.id} to={`/platforms/${platform.slug}`} className={nav.navLink} onClick={() => setShowOffcanvas(false)}>
                                    {platform.name}
                                </Link>
                            ))}
                            <Button variant="link" onClick={() => setShowAllPlatforms(!showAllPlatforms)}>
                                {showAllPlatforms ? 'Show Less' : 'Show More'}
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
}

export default NavbarComponent;
