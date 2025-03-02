"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import GoogleIcon from "../../../../public/GoogleIcon.svg";
import { signInSchema } from "@/schemas/signInSchema";

// Create a client component that uses useSearchParams
function SignInContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get invitation parameters if they exist
  const inviteUsername = searchParams.get('username');
  const invitePassword = searchParams.get('password');
  const isInviteLink = inviteUsername && invitePassword;

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: isInviteLink ? inviteUsername : "",
      password: isInviteLink ? invitePassword : "",
    },
  });

  // Auto-login if coming from an invitation link
  useEffect(() => {
    if (isInviteLink) {
      handleInviteLogin();
    }
  }, [inviteUsername, invitePassword]);

  const handleInviteLogin = async () => {
    if (!inviteUsername || !invitePassword) return;
    
    toast({
      title: "Welcome!",
      description: "You've been invited to Globetrotter. Signing you in...",
    });
    
    const result = await signIn("credentials", {
      redirect: false,
      identifier: inviteUsername,
      password: invitePassword,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Unable to sign in with the invitation link",
        variant: "destructive",
      });
    } else if (result?.url) {
      router.replace("/dashboard");
    }
  };

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive",
      });
    }
    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="min-h-screen hero-pattern flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-8 rounded-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            {isInviteLink ? "Welcome to Globetrotter!" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isInviteLink 
              ? "You've been invited to play. Signing you in..." 
              : "Sign in to access your account"}
          </p>
        </div>

        {isInviteLink ? (
          <div className="text-center p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-blue-500/20 rounded mx-auto w-3/4"></div>
              <div className="h-4 bg-blue-500/20 rounded mx-auto w-1/2"></div>
            </div>
            <p className="mt-4 text-sm">
              Signing you in automatically with the invitation link...
            </p>
            <Button 
              onClick={handleInviteLogin} 
              className="mt-4"
            >
              Sign in manually
            </Button>
          </div>
        ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <Input {...field} className="bg-background/50" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        {...field}
                        className="bg-background/50"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
            <div className="flex items-center">
              <hr className="flex-grow border-t border-white" />
              <p className="mx-2 text-sm text-white">or</p>
              <hr className="flex-grow border-t border-white" />
            </div>
            <Button
              onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
              className="h-14 w-full text-sm rounded-xl flex gap-2 bg-white border-2 border-border text-[#565656] hover:text-white hover:border-black"
            >
              <Image src={GoogleIcon} alt="Google Icon" />
              <p>Sign in with Google</p>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full text-sm border border-dashed border-blue-500/50 hover:bg-blue-500/10"
              onClick={() => {
                toast({
                  title: "Guest Login",
                  description: "Guest login will be implemented soon!",
                });
              }}
            >
              Continue as Guest
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-blue-500 hover:text-blue-400">
                  Sign up
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen hero-pattern flex items-center justify-center">
      <div className="glass-card p-6 rounded-lg shadow-xl w-full max-w-md">
        <p className="text-center text-white">Loading...</p>
      </div>
    </div>}>
      <SignInContent />
    </Suspense>
  );
}