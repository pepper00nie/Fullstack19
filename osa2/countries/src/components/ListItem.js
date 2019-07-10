import React from 'react';

function ListItem({ country, handler }) {
  return (
  	<>
  	<div>
  		{country.name + " "}
  		<button id={country.name} onClick={handler} >Show</button>
  	</div>
  	</>
  );
}

export default ListItem;