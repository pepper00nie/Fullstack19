import React from 'react';

const NewPersonForm = ({ name, number, nameHandler, numberHandler, addHandler }) => {
  return (
    <>
      <form>
        <div>
          Name: <input value={name} onChange={nameHandler} /><br />
          Number: <input value={number} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit" onClick={addHandler}>add</button>
        </div>
      </form>
    </>
  )
}

export default NewPersonForm