import React from "react";
import { LoginContainer } from "./style";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button/Button";
import { picture1 } from "@/assets/image/home";
import { LoginForm } from "./components/useForm";
import { Tabs, TabsContent, TabsList } from "@/components/ui/Tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
interface Props {
  // define your props here
}

const Login: React.FC<Props> = () => {
  return (
    <LoginContainer>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900">
            <img
              src={picture1}
              className="h-full object-fit bg-black opacity-40"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Domus Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-full w-[80%]">
          <Tabs
            defaultValue="account"
            className="flex flex-col justify-center items-center"
          >
            <TabsList className="grid w-[60%] grid-cols-2">
              <TabsTrigger value="account" className="rounded data-[state=active]:bg-yellowCustom">
                Account
              </TabsTrigger>
              <TabsTrigger className="rounded data-[state=active]:bg-yellowCustom" value="password">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">
                    Login by using your Account
                  </h1>
                </div>
                <LoginForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                  By clicking continue, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Dont have an account ? go to{" "}
                  <Link
                    to="/privacy"
                    className="underline underline-offset-4 text-yellowCustom hover:text-yellowCustom"
                  >
                    Signup
                  </Link>
                  .
                </p>
              </div>
            </TabsContent>
            <TabsContent value="password">paas</TabsContent>
          </Tabs>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Login;
