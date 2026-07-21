"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

const LOGIN_ENDPOINT = "/api/auth/login";
const SOCIAL_ENDPOINT = "/api/auth/social";

export default function SignInPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/recordings");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");

    if (next) {
      setNextPath(next);
    }

    if (params.get("registered") === "1") {
      setMessage({
        type: "success",
        text: "Account created. Sign in to access your purchased videos.",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const payload = await response.json().catch(() => null) as {
        success?: boolean;
        message?: string;
        redirectUrl?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "We could not sign you in. Please verify your credentials.");
      }

      setMessage({
        type: "success",
        text: payload.message || "Signed in successfully. Redirecting to your video library...",
      });

      if (payload.redirectUrl) {
        window.location.href = payload.redirectUrl;
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Unexpected error while signing in.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: "google" | "linkedin") => {
    const params = new URLSearchParams({ provider, next: nextPath })
    window.location.href = `${SOCIAL_ENDPOINT}?${params.toString()}`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: "linear-gradient(135deg, rgb(75, 0, 130) 0%, rgb(138, 43, 226) 100%)" }}>
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src={`${BASE_PATH}/logo.svg`} alt="Innovate QA" width={48} height={48} className="h-12 w-12" />
            <span className="text-2xl font-bold text-white">Innovate QA</span>
          </Link>
          <p className="text-purple-200 mt-2">Welcome back! Sign in to continue.</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "rgb(75, 0, 130)" }}>
              Sign In
            </h1>

            <p className="text-sm text-center text-gray-600 mb-6">
              Use your email and password from the member database, or continue with a connected social account.
            </p>

            {message && (
              <div
                className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                  message.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              className="mb-6 h-12 w-full text-base font-medium hover:bg-gray-800 hover:text-white"
              onClick={() => handleSocialSignIn("google")}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="mb-6 h-12 w-full text-base font-medium hover:bg-gray-800 hover:text-white"
              onClick={() => handleSocialSignIn("linkedin")}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#0A66C2"
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0Z"
                />
              </svg>
              Continue with LinkedIn
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "rgb(138, 43, 226)" }}
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold text-white"
                style={{ backgroundColor: "rgb(138, 43, 226)" }}
                disabled={isLoading || !formData.email || !formData.password}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold hover:underline"
                style={{ color: "rgb(138, 43, 226)" }}
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-purple-200 text-sm mt-6">
          By signing in, you agree to our{" "}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
