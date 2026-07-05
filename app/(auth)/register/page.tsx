import LoginText from "@/components/auth/login/LoginText";
import OrganizationRegisterForm from "@/components/auth/register/organization/OrganizationRegisterForm";



const RegistrationPage = async () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-y-10 lg:gap-x-20 px-6 py-12 lg:py-0 max-w-5xl mx-auto w-full">
      <LoginText />
      <OrganizationRegisterForm />
    </section>
  );
};

export default RegistrationPage;
