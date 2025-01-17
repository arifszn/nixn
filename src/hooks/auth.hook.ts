import { useAppSelector } from '@/hooks/redux.hook';
import { selectToken } from '@/store/slices/token.slice';

export const useAuth = () => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = !!token.accessToken && !!token.refreshToken;

  return { isAuthenticated };
};
