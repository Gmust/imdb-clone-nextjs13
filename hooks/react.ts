import { AuthAPI } from '@/src/service/auth';
import { useContext } from 'react';
import { AuthContext, useSnackbar} from '@/context';


export const useGuestLogin = () => {

  const {  setIsGuest } = useContext(AuthContext);
  const addSnackBar = useSnackbar();

  const handleLoginLikeGuest = async () => {
    try {
      const res = await AuthAPI.createGuestSession();
      setIsGuest(res.success);
      addSnackBar({
        key: 'success',
        text: 'Successfully logged in like guest',
        variant: 'success'
      });
    } catch (e: any) {
      alert(e.message);
    }
  };

  return handleLoginLikeGuest;
}
