import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import supabase from '../supabase/client';
import { Link } from 'react-router';
import AutoSuggestSearch from './AutoSearch';
import InputGroup from 'react-bootstrap/InputGroup';
import nav from '../css/nav.module.css';
import SessionContext from "../globalContext/SessionContext";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import useProfile from '../hooks/useProfile';
import NavLink from 'react-bootstrap/NavLink';
import Avatar from '../AvatarUi/Avatar';

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const { username } = useProfile();
    const { avatar_url } = useProfile();
    const session = useContext(SessionContext);
    // console.log( 'session:',session)
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error);
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1000) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Nav className={`${nav.nav} ${isSticky ? nav.sticky : ''}`}>


            <InputGroup className={nav.searchContainer}>
                <Link to="/" className={nav.logo}>
                    <span >
                        <img style={{ width: '50px', height: '50px', borderRadius: '50%' , marginRight: '5px' , marginTop: '5px', marginBottom: '5px'}} src="/gaming.jpg" alt="GameFrame"/>
                        GameFrame
                    </span>

                </Link>

                <AutoSuggestSearch />


                {session ? (
                    <div className={nav.navLinks}>
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink} className={nav.dropToggle} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: '20px', color: '#ccc', marginRight: '15px' }}> {username}  </div> <Link to="/profile">
                                {avatar_url ? <Avatar url={avatar_url} size="35px" style={{ fontSize: '10px', color: '#ccc', marginLeft: '5px' }} /> :    <i className="bi bi-person-circle" style={{ fontSize: '20px', color: '#ccc' }}></i> }
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

    );
}






export default Navbar;

