import { useForm } from 'react-hook-form';
import API from '../services/API';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await API.post('auth/login', data);
    console.log(res);
  };

  const logout = async () => {
    const res = await API.get('auth/logout');
    console.log(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="email" type="email" />
        <input ref={register} name="password" type="password" />
        <input type="submit" />
      </form>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
