import { GroupMember } from '../../src/graphql/types';
import { ChangeEvent, Fragment, FormEvent } from 'react';

interface Props {
	groupDetails: GroupMember | GroupMember[];
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleChangeGroupForm: (e: ChangeEvent) => void;
}

const GroupForm = (props: Props) => {
	const { onSubmit, handleChangeGroupForm } = props;

	return (
		<Fragment>
			<form className='m-2' onSubmit={onSubmit}>
				<div>
					<label className='block'>
						<span className='text-gray-800'>First Name:</span>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={handleChangeGroupForm}
							className='form-input mt-1 block w-full border-solid border-2 border-black-300'
						/>
					</label>
				</div>
				<div>
					<label className='block'>
						<span className='text-gray-800'>Last Name:</span>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={handleChangeGroupForm}
							className='form-input mt-1 block w-full border-solid border-2 border-black-300'
						/>
					</label>
				</div>
				<div>
					<label className='block'>
						<span className='text-gray-800'>Email:</span>
						<input
							type='text'
							name='email'
							placeholder='Email'
							onChange={handleChangeGroupForm}
							className='form-input mt-1 block w-full border-solid border-2 border-black-300'
						/>
					</label>
				</div>
				<div>
					<button
						type='submit'
						className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-900 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
					>
						Submit
					</button>
				</div>
			</form>
		</Fragment>
	);
};

export default GroupForm;
