"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpDown, ShieldCheck, Wrench, Eye, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/app-context";
import { UserRole } from "@/types";
import { loginSchema, LoginFormValues } from "@/lib/validation/auth";

const ROLES: { value: UserRole; label: string; icon: typeof ShieldCheck }[] = [
  { value: "admin", label: "Administrator", icon: ShieldCheck },
  { value: "maintenance", label: "Maintenance Engineer", icon: Wrench },
  { value: "security", label: "Security Officer", icon: Eye },
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "admin" },
  });

  const role = watch("role");

  function onSubmit(values: LoginFormValues) {
    setUser({ id: "u1", name: values.email.split("@")[0] || "Avi", email: values.email, role: values.role });
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-secondary/15 blur-[120px]" />
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-xl md:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-primary/20 to-secondary/10 p-10 md:flex">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-glow">
              <ArrowUpDown className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Smart Lift</span>
          </Link>

          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="h-8 w-8 rounded-lg bg-success/20" />
                <div className="h-2 w-24 rounded-full bg-white/10" />
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Monitor every lift in real time, from a single console.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to access your dashboard.</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setValue("role", r.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors",
                    active
                      ? "border-primary/50 bg-primary/10 text-white shadow-glow"
                      : "border-border bg-card/40 text-muted-foreground hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px] leading-tight">{r.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@company.com"
                  className="border-border bg-card/60 pl-9 text-white placeholder:text-muted-foreground"
                />
              </div>
              {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="border-border bg-card/60 pl-9 text-white placeholder:text-muted-foreground"
                />
              </div>
              {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-border bg-card accent-primary" />
                Remember me
              </label>
              <a href="#" className="text-secondary hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full bg-primary text-white shadow-glow hover:bg-primary/90">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link href="/" className="hover:text-white">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}