import { useQuery } from 'react-query';
import { getCollection } from '../services/API';

export default function Profile() {
  const { data: profile } = useQuery('me', getCollection);

  return <p>{JSON.stringify(profile)}</p>;
}
