import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/common/AuthCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Post } from "@/services/api";
import { AuthContext } from "@/context/AuthProvider";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const url: string = "http://localhost:5432/login";
  const AuthSettings = useContext(AuthContext);
  const navigate = useNavigate();
  function handleEmail(e: any) {
    setEmail(e.target.value ?? "");
  }
  function handlePassword() {
    setPassword(e.target.value ?? "");
  }
  async function get() {
    return {
      status: 400,
      ok: 1,
      message: "Invalid url",
      data: { user: {}, userToken: "azd" },
    };
  }
  async function login() {
    let ret = { status: 400, ok: 0, message: "Invalid url" };
    try {
      if (url) {
        //   ret = await Post(url, { email: email, password: password });
        ret = await get();

        if (ret.ok === 1) {
          //context update
          await AuthSettings.setUser((prev: any) => {
            return ret.data.user;
          });
          await AuthSettings.setUserToken((prev: any) => {
            return ret.data.userToken;
          });
          //redirect
          navigate("/");
        } else {
          //error logging
          //later for push notification ->
          //display(ret.message)
          console.log("error");
        }
      }
    } catch (e: unknown) {
      ret = { status: 400, ok: 0, message: "Frontend error" };
      console.log(e.message + " " + e.stack);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      label="Login with"
      className={className}
      {...props}
      footerLinks={
        <span>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </span>
      }
    >
      <form>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleEmail}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="********"
              onChange={handlePassword}
            />
          </div>
          <Button onClick={login} type="button" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
