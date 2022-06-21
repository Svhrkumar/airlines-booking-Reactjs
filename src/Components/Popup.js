import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modal.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './cards.css';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid ',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal({ openpop, confirmCancel, fetchedData }) {
	const [updateId, setUpdateId] = useState();
	const flightData = useSelector((state) => state.flightData);
	const [open, setOpen] = useState(false);

	const [refresh, setRefresh] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		console.log('--------------', openpop);
		setOpen(openpop);
	}, [openpop]);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<div>
						<center>
							<span>Are you sure do you want to cancel ticket</span>
							<button className='card-btn'>Yes</button>
							<button className='card-btn'>Cancel</button>
						</center>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
