import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/forms/signup.form';
import PageTitle from '@/components/common/pageTitle.common';
const SignupPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${import.meta.env.VITE_APP_NAME} | Signup`} />
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
