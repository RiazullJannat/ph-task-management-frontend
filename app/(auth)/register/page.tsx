import LoginText from "@/components/auth/login/LoginText";
import OrganizationRegisterForm from "@/components/auth/register/organization/OrganizationRegisterForm";



const RegistrationPage = async () => {

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <LoginText />
      <OrganizationRegisterForm />
    </section>
  );
};

export default RegistrationPage;
