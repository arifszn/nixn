import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/forms/login.form';
import PageTitle from '@/components/common/page-title.common';
import { APP_NAME } from '@/constants/config.constant';

const LoginPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${APP_NAME} | Login`} />
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
