import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { Dispatch, SetStateAction } from 'react';

interface ListConfirmProps {
  showModal: Dispatch<SetStateAction<boolean>>,
  func: () => void,
  text: string
}

export const ListConfirm = ({ showModal, text, func }: ListConfirmProps) => {
  return (
    <div className='text-2xl space-y-2'>
      <h2 className='text-black'>Are you sure you want to {text} the list?</h2>
      <div className='flex justify-center space-x-4 text-3xl'>
        <GiConfirmed onClick={func}
                     className='text-emerald-600 cursor-pointer hover:scale-110  transition duration-200' />
        <GiCancel onClick={() => showModal(false)}
                  className='text-red-600 cursor-pointer hover:scale-110  transition duration-200' />
      </div>
    </div>
  );
};

