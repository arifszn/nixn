import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/forms/signup.form';

const SignupPage: React.FC = () => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome to {import.meta.env.VITE_APP_NAME}.</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </>
  );
};

export default SignupPage;
