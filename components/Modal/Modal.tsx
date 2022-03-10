import { calculateObjectSize } from 'bson';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CloseMenuIcon } from '../UI/Icons';
import s from './modal.module.scss';

interface ModalProps {
	show: Boolean;
	onClose: () => void;
	closeModalInHeader: Boolean;
	modalHeader: JSX.Element;
	modalBody: JSX.Element;
	modalFooter: JSX.Element;
	maxHeight?: String | Number;
	maxWidth?: String | Number;
}

const Modal = (props: ModalProps) => {
	const {
		show,
		onClose,
		closeModalInHeader,
		modalHeader,
		modalBody,
		modalFooter,
		maxHeight,
		maxWidth
	} = props;
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleModalClose = e => {
		e.preventDefault();
		onClose();
	};

	const style = {
		'--modal-container-max-height': maxHeight ? maxHeight : '65%',
		'--modal-container-max-width': maxWidth ? maxWidth : '35%'
	} as React.CSSProperties;

	const modalContent = show ? (
		<div
			className={`${s.modalOverlay} bg-grey-lighter min-h-screen flex flex-col`}
		>
			<div
				className={`${s.modalContainer} container bg-white max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2`}
				style={style}
			>
				<div className={`${s.modalHeader}`}>
					{modalHeader}
					{closeModalInHeader ? (
						<span onClick={handleModalClose}>
							<CloseMenuIcon />
						</span>
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
