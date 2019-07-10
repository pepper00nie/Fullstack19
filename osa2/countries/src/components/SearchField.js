import React from 'react';

function SearchField({ value, handler }) {
  return (
    <>
      Search for country: <input value={value} onChange={handler} /> <button value={""} onClick={handler}>Clear</button>
    </>
  );
}

export default SearchField;
