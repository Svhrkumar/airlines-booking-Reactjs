import React, { useState, useEffect } from 'react';

const Table = ({ passengerList }) => {
	const [startRec, setStartRec] = useState(null);
	const [endRec, setEndRec] = useState(null);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const next = () => {
		console.log('next', page === totalPages);
		if (page + 1 > totalPages) {
			setPage(totalPages);
		} else {
			setPage(() => page + 1);
		}

		// setStartRec(() => page * 5);
		// setEndRec(() => page * 5 + 5);
	};

	const Prev = () => {
		if (page === 0) {
			setPage(0);
		} else {
			setPage(() => page - 1);
		}
	};

	useEffect(() => {
		setStartRec(() => page * 5);

		setEndRec(() => page * 5 + 5);
		const total = Math.floor(passengerList.length / 5);
		setTotalPages(total);
	}, [page, passengerList]);

	console.log('total pages', totalPages, page);
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Age</th>
						<th>Seat No</th>
						<th>Ordered Meal</th>
					</tr>
				</thead>
				<tbody>
					{passengerList &&
						passengerList
							.sort((a, b) => a.age - b.age)
							.slice(startRec, endRec)
							.map((data, id) => {
								return (
									<tr>
										<td>{data.name}</td>
										<td>{data.gender}</td>
										<td>{data.age}</td>
										<td>{data.seatNo}</td>
										<td>{data.mealType}</td>
									</tr>
								);
							})}
				</tbody>
			</table>

			<div
				style={{
					maxWidth: '100%',
					display: 'flex',
					height: '30px',
					justifyContent: 'space-between',
					margin: '5px 10px',
				}}>
				<div>
					<p>Total {passengerList.length}</p>
				</div>
				<div>
					<p>
						Records {startRec + 1} to {endRec}
					</p>
				</div>
				<div>
					<p>
						Page {page + 1} of {totalPages + 1}
					</p>
				</div>
				<div>
					<button
						style={{
							backgroundColor: '#0039a6',
							padding: '5px 8px',
							color: 'white',
							borderRadius: '9px',
							border: 'none',
							margin: '5px 10px',
						}}
						onClick={Prev}>
						Prev
					</button>
					<button
						style={{
							backgroundColor: '#0039a6',
							padding: '5px 8px',
							color: 'white',
							borderRadius: '9px',
							border: 'none',
						}}
						onClick={next}>
						Next
					</button>
				</div>
			</div>
		</>
	);
};

export default Table;
