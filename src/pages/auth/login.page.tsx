import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/forms/login.form';

const LoginPage: React.FC = () => {
  return (
    <>
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
