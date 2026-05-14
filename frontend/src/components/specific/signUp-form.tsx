import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/common/AuthCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import { useContext, useState } from "react";
import { Post } from "@/services/api";
import { AuthContext } from "@/context/AuthProvider";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const url: string = "http://localhost:5432/signUp";
  const AuthSettings = useContext(AuthContext);
  const navigate = useNavigate();
  function handleEmail(e: any) {
    setEmail(e.target.value ?? "");
  }
  async function get() {
    return {
      status: 400,
      ok: 1,
      message: "Invalid url",
      data: { user: {}, userToken: "azd" },
    };
  }
  async function sign() {
    let ret = { status: 400, ok: 0, message: "Invalid url" };
    try {
      if (url) {
        //   ret = await Post(url, { email: email, password: password });
        ret = await get();

        if (ret.ok === 1) {
          //later for push notification ->
          //display(ret.message)
          //redirect
          navigate("/login");
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
      title="Welcome"
      label="Sign Up with"
      className={className}
      {...props}
      footerLinks={
        <span>
          Already have an account? <Link to="/login">Login</Link>
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
          <Button onClick={sign} type="button" className="w-full">
            Sign Up
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
