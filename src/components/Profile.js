import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import API, { getCollection } from '../services/API';

export default function Profile() {
  const { data: profile } = useQuery('me', getCollection);
  const history = useHistory();
  const { addToast } = useToasts();

  const logout = async () => {
    try {
      await API.get('auth/logout');
      addToast('logged out successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Profile Page</h1>
      <p>{JSON.stringify(profile)}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
