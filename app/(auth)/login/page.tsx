import LoginComponent from "@/components/auth/login/LoginComponent";
import LoginText from "@/components/auth/login/LoginText";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-y-10 lg:gap-x-20 px-6 py-12 lg:py-0 max-w-5xl mx-auto w-full">
      <LoginText />
      <LoginComponent />
    </section>
  );
};

export default LoginPage;
