import { useQuery } from 'react-query';
import { getCollection } from '../services/API';

export default function ContactList() {
  const { data: contacts } = useQuery('contacts', getCollection);

  if (!contacts) return <p>loading</p>;

  return (
    <div className="App">
      {contacts.map((c) => (
        <p key={c.id}>{c.name}</p>
      ))}
    </div>
  );
}
