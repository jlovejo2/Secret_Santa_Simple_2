import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import s from './modal.module.scss';

const Modal = ({
	show,
	onClose,
	closeModalInHeader,
	modalHeader,
	modalBody,
	modalFooter
}) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleModalClose = e => {
		e.preventDefault();
		onClose();
	};

	const modalContent = show ? (
		<div
			className={`${s.modalOverlay} bg-grey-lighter min-h-screen flex flex-col`}
		>
			<div
				className={`${s.modalContainer} container bg-white max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
			>
				<div className={`${s.modalHeader}`}>
					{modalHeader}
					{closeModalInHeader ? (
						<a href='#' onClick={handleModalClose}>
							x
						</a>
					) : null}
				</div>
				<div className={`${s.modalBody}`}>{modalBody}</div>
				<div className={`${s.modalFooter}`}>{modalFooter}</div>
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById('modal-root')
		);
	} else {
		return null;
	}
};

export default Modal;
