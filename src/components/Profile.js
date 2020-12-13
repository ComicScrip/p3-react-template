import { useQuery } from 'react-query';
import API, { getCollection } from '../services/API';

export default function Profile() {
  const { data: profile } = useQuery('me', getCollection);

  const logout = async () => {
    try {
      await API.get('auth/logout');
      console.log('logged out sucessfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p>{JSON.stringify(profile)}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
