import LoginComponent from "@/components/auth/login/LoginComponent";
import LoginText from "@/components/auth/login/LoginText";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-44 px-6 py-12 md:py-20 lg:py-0">
      <LoginText />
      <LoginComponent />
    </section>
  );
};

export default LoginPage;
