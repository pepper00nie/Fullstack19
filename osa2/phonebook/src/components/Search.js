import React from 'react';

const Search = (props) => {
  return (
    <>
      Search: <input value={props.search} onChange={props.handler} />
    </>
  )
}

export default Search