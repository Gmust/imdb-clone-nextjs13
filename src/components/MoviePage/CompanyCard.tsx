import Image from 'next/image';
import { CONSTANTS } from '@utils/constants';

export const CompanyCard = (company: Company) => {
  return (
    <div key={company.id} className='border-solid border-2 border-slate-400 rounded-lg p-2 sm:w-44 sm:h-44
                                                 flex flex-col justify-between space-y-2  mt-3'>
      <h3>{company.name}</h3>
      <div className='bg-slate-200 dark:bg-amber-50 relative object-cover w-16 h-9 sm:w-36 sm:h-32 '>
        <Image src={CONSTANTS.IMAGE_URL + company.logo_path} alt={'There is no logo'} fill />
      </div>
      <div className='font-bold'>
        Country:
        {company.origin_country ? company.origin_country.toUpperCase() : 'Unknown'}
      </div>
    </div>
  );
};