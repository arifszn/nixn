import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/forms/login.form';
import PageTitle from '@/components/common/pageTitle.common';

const LoginPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${import.meta.env.VITE_APP_NAME} | Login`} />
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </>
  );
};

export default LoginPage;
