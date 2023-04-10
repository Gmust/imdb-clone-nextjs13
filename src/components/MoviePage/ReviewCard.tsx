'use client';
import Image from 'next/image';
import { useState } from 'react';
import { BiStar } from 'react-icons/bi';
import { truncateString } from '@utils/truncateString';
import { CONSTANTS } from '@utils/constants';

export const ReviewCard = ({ id, url, content, author_details, author, updated_at, created_at }: Review) => {

  const truncatedText = truncateString(content!, 400);
  let src;

  const [showFullReview, setShowFullReview] = useState<boolean>(false);

  if (author_details?.avatar_path.includes('https')) {
    console.log(author_details?.avatar_path);
    src = author_details?.avatar_path;
  } else if (author_details?.avatar_path === null) {
    src = '../../assets/defaultAvatar.webp';
  } else {
    src = `${CONSTANTS.IMAGE_URL}/${author_details?.avatar_path}`;
  }


  return (
    <div className='flex flex-col rounded-3xl bg-amber-50 dark:bg-slate-1000 p-4 w-5/6'>

      <div className='flex text-2xl justify-between'>
        <div className='space-x-4 flex'>
          <div className='relative object-cover w-24 h-24 drop-shadow-2xl'>
            <Image src={src} className='rounded-full' alt={'There is no avatar'}
                   fill />
          </div>
          <div className='font-bold'>
            {author}
          </div>
        </div>

        <div>
          <div className='text-xl'>Created at: {// @ts-ignore
            new Date(created_at).toLocaleDateString('en-es', CONSTANTS.REVIEW_DATA_OPTIONS)}</div>
          {updated_at &&
            <div className='text-lg text-gray-600 opacity-90'>Updated at: { //@ts-ignore
              new Date(updated_at).toLocaleDateString('en-es', CONSTANTS.REVIEW_DATA_OPTIONS)}</div>}
          {author_details?.rating && <div className='flex text-xl items-center justify-end'>
            {author_details?.rating}/10
            <BiStar className='ml-1' />
          </div>}
        </div>

      </div>

      <hr className='h-px my-3  border-0 bg-amber-500' />

      <div className='text-xl divide-amber-500 flex'>
        {
          showFullReview ?
            <div onClick={() => setShowFullReview(!showFullReview)}>
              {content}
            </div>
            :
            <div onClick={() => setShowFullReview(!showFullReview)}>
              {truncatedText}
            </div>
        }
      </div>

    </div>
  );
};

