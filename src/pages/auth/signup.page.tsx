import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/forms/signup.form';
import PageTitle from '@/components/common/pageTitle.common';
import { APP_NAME } from '@/constants/config.constant';

const SignupPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${APP_NAME} | Signup`} />
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome to {APP_NAME}.</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </>
  );
};

export default SignupPage;
