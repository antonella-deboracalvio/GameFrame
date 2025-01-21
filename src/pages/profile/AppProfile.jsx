import { useState } from 'react';
import useProfile from '../../hooks/useProfile';
import { useFavourites } from "../../globalContext/FavouritesContext";
import { useEffect } from 'react';
import supabase from '../../supabase/client';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router';
import "../../css/profile.css";


export default function AppProfile() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { loading, username, first_name, last_name, avatar_url } = useProfile();
  const [activeTab, setActiveTab] = useState('');
  const { favourites } = useFavourites();
  // const {id} = useParams();





  useEffect(() => {
    if (avatar_url) {
      async function downloadImage() {
        try {
          const { data, error } = await supabase.storage
            .from('avatars')
            .download(avatar_url);

          if (error) throw error;

          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        } catch (error) {
          console.error('Error downloading image:', error.message);
        }
      }
      downloadImage();
    }
  }, [avatar_url]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Preferiti':
        return <p>List of favourites</p>;
      case 'Info utente':
        return <p>Info user</p>;
      case 'Reviews':
        return <p>No reviews</p>;
      case 'Followers':
        return <p>You don't have any followers yet</p>;
      default:
        return null;
    }
  };

  if (loading) {
    return <p> <Spinner /> </p>;
  }

  return (
    <div>
      <article>
        <header>
          <h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: '30px', fontWeight: 'bold',color: 'lightblack' }}>Welcome to your profile, {username} !</h1>
        </header>
        <div>
          <section style={{ display: 'flex', alignItems: 'center' }}>
          {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%' , marginLeft: '50px'}}
              />
            ) : (
              <i className="bi bi-person-circle" style={{ fontSize: '150px', color: '#ccc' }}></i>
            )}
            
          </section>

          <section>
            <Nav
              fill
              variant="tabs"
              defaultActiveKey="preferiti"
              onSelect={(selectedKey) => setActiveTab(selectedKey)}
              style={{ marginTop: '70px'}}
              
            >
              <Nav.Item>
                <Nav.Link eventKey="preferiti">List my favourites</Nav.Link>
                <div>
                {favourites?.length ? (
                  <ul>
                    {favourites.map(fav => (
                      <li  key={fav.game_id}>
                        <Link to={`/game/${fav.game_id}`}>{fav.game_name}</Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You haven't added any games yet</p>
                )}
                </div>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Info user">Info user</Nav.Link>
                <div>
                  <p>Username : {username}</p>
                  <p>Nome : {first_name}</p>
                  <p>Cognome : {last_name}</p>
                 
                </div>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Reviews">Your Reviews</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Followers" >
                  Your Followers
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </section>

          <section style={{ marginTop: '30px' }}>
  
            {renderContent()}
          </section>
        </div>
      </article>
    </div>
  );
}

