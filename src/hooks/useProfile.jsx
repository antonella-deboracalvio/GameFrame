import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import SessionContext from '../globalContext/SessionContext';

export default function useProfile() {
  const session = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
      let ignore = false;

      
    async function getProfile() {
        if (!session || !session.user) {
            // console.warn('Session :', session);
            setLoading(false);
            return;
          }
    
          const user = session.user;
          // console.log('id', user.id);
        
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('username, first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
            // console.error('Error fetching profile:', error);
          } else {
            // console.log('Fetched profile data:', data);
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
          }
          setLoading(false);
        }
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  return { loading, setLoading, username, setUsername, first_name, setFirstName, last_name, setLastName, avatar_url, setAvatarUrl };
}   
