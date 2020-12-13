import { useForm } from 'react-hook-form';
import API from '../services/API';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post('auth/login', data);
      console.log('logged in successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="email" type="email" />
        <input ref={register} name="password" type="password" />
        <input type="submit" />
      </form>
    </>
  );
}
