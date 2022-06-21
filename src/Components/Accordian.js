import React, { useState } from 'react';
import './accordian.css';
const Accordian = () => {
	const [viewDetails, setViewDetails] = useState(false);
	const handleDetailsTab = () => {
		if (viewDetails === false) {
			setViewDetails(true);
		} else {
			setViewDetails(false);
		}
	};
	return (
		<>
			<div className='accordian-ctn bg-light'>
				<h4> Add Flight</h4>
				<span onClick={handleDetailsTab}>Open</span>
			</div>

			{<div className='accordian-card'></div>}
		</>
	);
};

export default Accordian;
