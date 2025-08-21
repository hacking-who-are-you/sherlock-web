import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import logo from "@/assets/logo.svg";
import { useMode } from "@/features/dashboard/hooks/use-mode";

export const LoginFrame = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { mode, setMode } = useMode();

  const { onSubmit, register, loading, error } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <img src={logo} alt="SHERLOCK" className="size-10 opacity-60" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-100">
              {isSignUp
                ? "Create Account"
                : `SHERLOCK ${mode ? "Scanner" : "Detector"}`}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isSignUp ? "Join the SHERLOCK" : "Access your SHERLOCK"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="security@company.com"
                  className="pl-10 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium"
            >
              {loading
                ? "Processing..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Need an account? Sign up"}
            </button>
          </div>

          <div className="text-center text-sm text-slate-400">
            <button onClick={() => setMode(!mode)}>
              Use SHERLOCK {mode ? "Detector" : "Scanner"}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              Secure access to vulnerability scanning, traffic analysis, and
              security reporting tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
