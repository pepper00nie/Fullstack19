import React from 'react';

const Search = (props) => {
  return (
    <>
      search: <input value={props.search} onChange={props.handler} />
    </>
  )
}

export default Search