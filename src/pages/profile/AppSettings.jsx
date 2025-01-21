import {useContext } from 'react';
import supabase from '../../supabase/client';
import SessionContext from '../../globalContext/SessionContext';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router';
import settings from '../../css/settings.module.css';
import useProfile from '../../hooks/useProfile';
import Avatar from '../../AvatarUi/Avatar';


export default function AppSettings() {
  const {loading, setLoading, first_name, setFirstName, last_name,  setLastName, username, setUsername, avatar_url, setAvatarUrl} = useProfile();
  const session = useContext(SessionContext);
//  const { navigate } = useContext(SessionContext);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase
    .from('profiles')
    .upsert(updates)
    .eq('id', user.id);

    if (error) {
      toast.error('Error profile');
    } else {
      toast.success('Profile updated!');
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (

  <div>

    <h1 style={{textAlign: 'center' , marginTop: '20px'}}>Settings your profile</h1>
    <form onSubmit={updateProfile} className={settings.formWidget}>
  <div   style={{ border: '1px solid black' , width: '200px', height: '200px', margin: '0', marginBottom: '10px'}}>
    <p style={{textAlign: 'center ', margin: '0' , padding: '0'}}>Inserisci immagine</p>
 
    <Avatar
      url={avatar_url}
      size={150}
      onUpload={(event, url) => {
          updateProfile(event, url);
      }}
    />



  </div>
      <div>
        <label htmlFor="email" className={settings.label}>
          Email
        </label>
        <input
          id="email"
          type="text"
          value={session.user.email}
          disabled
          className={settings.input}
        />
      </div>
      <div>
        <label htmlFor="username" className={settings.label}>
          Name
        </label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className={settings.input}
        />
      </div>
      <div>
        <label htmlFor="first_name" className={settings.label}>
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
          className={settings.input}
        />
      </div>
      <div>
        <label htmlFor="last_name" className={settings.label}>
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
          className={settings.input}
        />
      </div>
      <div>
        <button
          className={`${settings.button} ${settings.primary}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <Toaster theme='dark' richColors position="top-center" />
      </div>
      <div>
        <Link to="/profile">
          <button
            className={`${settings.button} ${settings.secondary}`}
            type="button"
          >
            My Profile
          </button>
        </Link>
      </div>
    </form>
    </div>
  );
}
