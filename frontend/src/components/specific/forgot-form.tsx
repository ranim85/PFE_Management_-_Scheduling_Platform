import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/common/AuthCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Post } from "@/services/api";
import { AuthContext } from "@/context/AuthProvider";

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [timing, setTiming] = useState<number>(0);
  const [recoveryStatus, setRecoveryStatus] = useState<Boolean>(false);
  const url: string = "http://localhost:5432/recover";
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
  async function login() {
    setRecoveryStatus(true);
    setTiming(5);
    let ret = { status: 400, ok: 0, message: "Invalid url" };
    try {
      if (url) {
        //   ret = await Post(url, { email: email });
        ret = await get();

        if (ret.ok === 1) {
          //recovery update
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
  useEffect(() => {
    let id: any;
    let intid: any;
    if (recoveryStatus) {
      intid = setInterval(() => {
        setTiming((prev) => Math.max(prev - 1, 0));
      }, 1000);
      id = setTimeout(() => {
        setRecoveryStatus(false);
      }, 6000);
    }
    return () => {
      clearTimeout(id);
      clearInterval(intid);
    };
  }, [recoveryStatus]);
  return (
    <AuthCard
      title="Recover Password"
      label="Recover with"
      className={className}
      {...props}
      footerLinks={
        <>
          <span>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </span>
          <span>
            Account Recovered? <Link to="/login">Login</Link>
          </span>
        </>
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
          <Button
            disabled={recoveryStatus as boolean}
            onClick={login}
            type="button"
            className="w-full"
          >
            Recover
            {recoveryStatus && ` (${timing})`}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
