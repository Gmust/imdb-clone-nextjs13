import Link from 'next/link';

interface MovieListsProps {
  lists: List[];
}

export const MovieLists = ({ lists }: MovieListsProps) => {
  return (
    <div className='flex flex-wrap space-x-4 space-y-4 items-center'>
      {lists.map(list =>
        <Link href={`/personal-area/list/${list.id}`}>
          <div
            className='border-2 border-solid border-white flex flex-col rounded-lg p-2 cursor-pointer hover:scale-110
             transition duration-200 w-64'>
            <span className='text-lg flex space-x-1'>
              <label className='text-amber-500'>Name: </label>
              <span className='line-clamp-1'>{list.name}</span> ({list.item_count})
            </span>
            <span className='text-lg flex'>
              <label className=' text-amber-500  '>Description: </label>
              <span className='line-clamp-1'>{list.description ? list.description : 'No description provided'}</span>
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

