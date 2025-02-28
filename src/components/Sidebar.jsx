import { useState } from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import SessionContext from "../globalContext/SessionContext";
import Nav from 'react-bootstrap/Nav';
import sidebar from '../css/sidebar.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useProfile from '../hooks/useProfile';
import Avatar from '../AvatarUi/Avatar';

function Sidebar() {


  const session = useContext(SessionContext);
  const { username, avatar_url } = useProfile();

 // Controllo che useLoaderData() non sia undefined
  const data = useLoaderData() || { genres: [], platforms: [] };

  // Destrutturo solo se i dati sono disponibili
  const genres = data.genres || [];
  const platforms = data.platforms || [];

  console.log("LOADER:", data); // Debug

  const maxVisibleOnExpand = 10;
  const alwaysVisibleCount = 3;

  const [showAllGenres, setShowAllGenres] = useState(false);
  const alwaysVisibleGenres = genres.slice(0, alwaysVisibleCount);
  const toggleableGenres = genres.slice(alwaysVisibleCount, alwaysVisibleCount + maxVisibleOnExpand - alwaysVisibleCount);

  const [showAllPlatforms, setShowAllPlatforms] = useState(
    platforms.length <= maxVisibleOnExpand
  );
  const alwaysVisiblePlatforms = platforms.slice(0, alwaysVisibleCount);
  const toggleablePlatforms = platforms.slice(alwaysVisibleCount, alwaysVisibleCount + maxVisibleOnExpand - alwaysVisibleCount);

  const toggleGenres = (event) => {
    event.stopPropagation();
    setShowAllGenres(!showAllGenres);
  };

  const togglePlatforms = (event) => {
    event.stopPropagation();
    setShowAllPlatforms(!showAllPlatforms);
  };

  // console.log("Platforms ricevute nella Sidebar:", platforms);


  const platformIcons = {
    "PlayStation 5": "bi-playstation",
    "PlayStation 4": "bi-playstation",
    "Xbox One": "bi-xbox",
    "Xbox Series S/X": "bi-xbox",
    "PC": "bi-windows",
    "Nintendo Switch": "bi-nintendo-switch",
    "iOS": "bi-phone",
    "Android": "bi-android",
    "Nintendo 3DS": "bi-nintendo-switch",
    "Nintendo DS": "bi-nintendo-switch",
  };

  






  return (
    <div className={`${sidebar.sidebar}`} >
      <Nav className='flex-column'>

        {session ? (

          <ul>
            <li style={{fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid white' , textAlign: 'center'}}> <Link className={sidebar.navLink} to="/">Home</Link></li>
            <li> <Link to="/settings">  {avatar_url ? <Avatar url={avatar_url} size="35px" style={{ fontSize: '10px', color: '#ccc', marginLeft: '5px' }} /> :    <i className="bi bi-person-circle" style={{ fontSize: '20px', color: '#ccc' }}></i> } </Link> </li>
            <li style={{fontSize: '10px', fontWeight: 'bold', marginBottom: '10px'}}> <Link to="/profile" className={sidebar.navLink} >Welcome {username}</Link></li>
            <li> <Link  to="/profile" className={sidebar.navLink} >Your Favourites</Link></li>
            <li> <Link to="/profile" className={sidebar.navLink} >Your Reviews</Link></li>
          </ul>

        ) : (

          <ul>
            <li> <Link className={sidebar.navLink} to="/">Home</Link></li>
            <li> <Link className={sidebar.navLink} to="/register">Register</Link></li>
            <li> <Link className={sidebar.navLink} to="/login">Login</Link></li>
          </ul>

        )}

        < div style={{ margin: "10px 30px" }}>
          <span >
            <h3>Genres</h3>
          </span>
          <div>
            {alwaysVisibleGenres.map((genre) => (
              <div key={genre.id} style={{ padding: '5px 0' }}>
                <img
                  src={genre.image_background}
                  alt={genre.name}
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <Link key={genre.id} to={`/games/${genre.slug}`}> {genre.name}</Link>
              </div>
            )

            )

            }

            {showAllGenres &&
              toggleableGenres.map((genre) => (
                <div key={genre.id} style={{ padding: '5px 0' }}>
                  <img
                    src={genre.image_background}
                    alt={genre.name}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Link key={genre.id} to={`/games/${genre.slug}`}> {genre.name}</Link>


                </div>
              ))}

            {toggleableGenres.length > 0 && (
              <div
                className={sidebar.toggle}
                onClick={toggleGenres}
                style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
              >
                {showAllGenres ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down"></i>}

              </div>
            )}

          </div>
          <div>
            <span

            >
              <h3>Platforms</h3>
            </span>
            <div>
              {alwaysVisiblePlatforms.map((platform) => (
                <div key={platform.id} style={{ padding: '5px 0' }}>
                  <i className={`bi ${platformIcons[platform.name]}`}> </i>
                  <Link key={platform.id} to={`/platforms/${platform.slug}`}>{platform.name}</Link>


                </div>
              ))}

              {showAllPlatforms &&
                toggleablePlatforms.map((platform) => (
                  <div key={platform.id} style={{ padding: '5px 0' }}>
                    <i className={`bi ${platformIcons[platform.name]}`}> </i>
                    <Link key={platform.id} to={`/platforms/${platform.slug}`}>{platform.name}</Link>


                  </div>
                ))}

              {toggleablePlatforms.length > 0 && (
                <div
                  className={sidebar.toggle}
                  onClick={togglePlatforms}
                  style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
                >
                  {showAllPlatforms ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down"></i>}
                </div>
              )}
            </div>
          </div >

        </div >



      </Nav>
    </div >
  );
}

export default Sidebar;

