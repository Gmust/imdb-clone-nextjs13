import { SnackBarType } from '@utils/reducers';


type  SnackbarProps = Omit<SnackBarType, 'key'> & {
  handleClose: () => void,
  open: boolean
}

export const Snackbar = ({ handleClose, variant, text, icon: Icon }: SnackbarProps) => {
  const variants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };


  return (
    <div className='relative'>

      <div className='fixed left-4 bottom-4 '>
        <div
          className={` ${variants[variant]} flex min-w-[300px] items-center truncate whitespace-nowrap rounded-lg py-3 px-3.5 sm:text-xl text-white shadow-md`}
        >
          {Icon && (
            <span className='mr-4 text-base' aria-hidden='true'>
            <Icon className='h-5 w-5' />
          </span>
          )}
          <span>{text}</span>
          <button
            className='ml-auto bg-transparent !p-0 text-current underline'
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>

  );
};

