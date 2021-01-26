import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import queryString from 'query-string';
import API from '../services/API';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { redirectPath } = queryString.parse(window.location.search);
  const history = useHistory();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    try {
      await API.post('auth/login', data);
      addToast('logged in successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      console.log(redirectPath);
      if (redirectPath) {
        history.push(redirectPath);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/facebook`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
  };

  return (
    <>
      <h1>Login Page</h1>
      {redirectPath && (
        <p>
          You were redirected here because your session is not valid. Maybe it
          has expired since the last time you visited this page ? Please log in
          again using the form below
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          {'Email : '}
          <input
            ref={register}
            name="email"
            id="email"
            type="email"
            autoComplete="username"
          />
        </label>
        <label htmlFor="password">
          {'Password : '}
          <input
            ref={register}
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </label>
        <label htmlFor="stayConnected">
          <input
            ref={register}
            name="stayConnected"
            id="stayConnected"
            type="checkbox"
          />
          Stay connected ?
        </label>
        <input type="submit" value="Log in" />
      </form>

      <button type="button" onClick={handleFacebookLogin}>
        Login with facebook
      </button>
      <button type="button" onClick={handleGoogleLogin}>
        Login with google
      </button>
    </>
  );
}
