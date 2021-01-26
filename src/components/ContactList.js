import React from 'react';
import { useQuery } from 'react-query';

import { getCollection } from '../services/API';

export default function ContactList() {
  const { data: contacts } = useQuery('contacts', () => {
    return getCollection('contacts');
  });

  return (
    <div className="contacts">
      <ul>
        {contacts.map((contact) => {
          return <li key={contact.id}>{contact.name}</li>;
        })}
      </ul>
    </div>
  );
}
