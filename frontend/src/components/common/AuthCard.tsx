import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logoIssat from "@/assets/logo_issat.png";
import { ReactNode } from "react";

interface AuthCardProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  label: string;
  footerLinks?: ReactNode;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  label,
  footerLinks,
  children,
  className,
  ...props
}: AuthCardProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <img
            src={logoIssat}
            alt="ISSAT Sousse"
            className="mx-auto mb-2 h-16 w-auto object-contain"
          />
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4"></div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                {label}
              </span>
            </div>
            {children}
            {footerLinks && (
              <div className="text-center text-sm flex flex-col gap-2">
                {footerLinks}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
