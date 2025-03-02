"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleIcon from "../../../../public/GoogleIcon.svg";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const[usernameState,setUsernameState]=useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setLoading(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          
          if (response.data.data?.isAvailable) {
            setUsernameMessage("Username is available!");
            setUsernameState(true);
          } else {
            setUsernameMessage("Username is already taken");
            setUsernameState(false);
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage("Error checking username");
          setUsernameState(false);
        } finally {
          setLoading(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/sign-up`, data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Signup failed",
        description: axiosError.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Start receiving anonymous messages today
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    className="bg-background/50"
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  <div className="mt-1">
                    {loading && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        <p className="text-sm text-muted-foreground">
                          Checking username...
                        </p>
                      </div>
                    )}
                    {!loading && usernameMessage && (
                      <p className={`text-sm ${usernameState ? "text-green-500" : "text-red-500"}`}>
                        {usernameMessage}
                      </p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} className="bg-background/50" />
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll send you a verification code
                  </p>
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
                  <Input type="password" {...field} className="bg-background/50" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
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
          className="h-14 w-full text-sm rounded-xl  flex gap-2 bg-white border-2 border-border text-[#565656] hover:text-white hover:border-black"
        >
          <Image src={GoogleIcon} alt="Google Icon" />
          <p>Sign up with Google</p>
        </Button>
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}