import React from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { useHistory } from 'react-router';

import { getCollection } from '../services/API';

export default function ContactList() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const searchParams = {
    limit: 10,
    offset: 0,
    ...queryString.parse(window.location.search),
  };
  const { limit, offset } = searchParams;
  const currentPage = offset / limit + 1;

  const updateSearchUrl = (params) => {
    const clientQueryParams = queryString.stringify(params);
    history.push(`/contacts?${clientQueryParams}`);
  };
  const setCurrentPage = (pageNum) => {
    updateSearchUrl({
      ...searchParams,
      offset: parseInt(limit, 10) * (pageNum - 1),
    });
  };
  const { data } = useQuery(['contacts', searchParams], () => {
    const APIQueryParams = {
      limit: searchParams.limit,
      offset: searchParams.offset,
      sort_by: searchParams.sort_by,
      'first_name[equals]': searchParams.first_name || undefined,
      [`last_name[${searchParams.last_name_operator}]`]:
        searchParams.last_name || undefined,
    };
    return getCollection('contacts', APIQueryParams);
  });
  const { items: contacts, total: numberOfItemsMatchingSearch } = data || {};
  const lastPage = Math.ceil(numberOfItemsMatchingSearch / limit);

  return (
    <div className="contacts">
      <h2>Filters</h2>
      <form onSubmit={handleSubmit(updateSearchUrl)}>
        <label htmlFor="first_name">
          first name :
          <input
            name="first_name"
            id="first_name"
            type="text"
            defaultValue={searchParams.first_name}
            ref={register}
          />
        </label>
        <br />
        <label htmlFor="last_name">
          last name :
          <label htmlFor="last_name_operator">
            <select
              name="last_name_operator"
              id="last_name_operator"
              ref={register}
              defaultValue={searchParams.last_name_operator}
            >
              {['equals', 'contains', 'not'].map((operator) => {
                return (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                );
              })}
            </select>
          </label>
          <input
            name="last_name"
            id="last_name"
            type="text"
            defaultValue={searchParams.last_name}
            ref={register}
          />
        </label>
        <br />
        <br />

        <button type="submit">Filter</button>
      </form>

      <h2>Sort results</h2>
      <form>
        <label htmlFor="sort_by">
          <select
            name="sort_by"
            id="sort_by"
            ref={register}
            onChange={handleSubmit(updateSearchUrl)}
            defaultValue={searchParams.sort_by}
          >
            <option value="first_name.asc">First name [A-Z]</option>
            <option value="first_name.desc">First name [Z-A]</option>
            <option value="last_name.asc">Last name [A-Z]</option>
            <option value="last_name.desc">Last name [Z-A]</option>
          </select>
        </label>
      </form>

      <h2>Contact list</h2>
      {!contacts ? (
        'loading...'
      ) : (
        <>
          <em>
            {numberOfItemsMatchingSearch} contacts in the DB matched your search
          </em>
          {!!contacts.length && (
            <form onSubmit={handleSubmit(updateSearchUrl)}>
              <label htmlFor="limit">
                See
                <input
                  name="limit"
                  id="limit"
                  type="number"
                  defaultValue={limit}
                  min="1"
                  ref={register}
                />
                items per page.
              </label>
              <button type="submit">Ok</button>
            </form>
          )}
          <ul>
            {contacts.map((contact) => {
              return <li key={contact.id}>{contact.name}</li>;
            })}
          </ul>
          {lastPage !== 1 && !!contacts.length && (
            <div>
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                First page
              </button>
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous page
              </button>
              page courante : {currentPage}
              <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next page
              </button>
              <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(lastPage)}
              >
                Last page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
