"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebounceCallback } from "usehooks-ts";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { usernameValidation } from "@/schemas/signUpSchema";
import { ArrowLeft, Share2, Check, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useStateContext } from "@/context/StateProvider";

const inviteSchema = z.object({
  username: usernameValidation,
});

export default function Challenge() {
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameState, setUsernameState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteCreated, setInviteCreated] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteImageUrl, setInviteImageUrl] = useState("");
  
  const { toast } = useToast();
  const { userDetails } = useStateContext();
  const debounced = useDebounceCallback(setDebouncedUsername, 500);

  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setLoading(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          
          if (response.data.data?.isAvailable) {
            setUsernameMessage("Username is available!");
            setUsernameState(true);
          } else {
            setUsernameMessage("Username is already taken");
            setUsernameState(false);
          }
        } catch (error) {
          setUsernameMessage("Error checking username");
          setUsernameState(false);
        } finally {
          setLoading(false);
        }
      }
    };
    
    if (debouncedUsername) {
      checkUsernameUnique();
    }
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof inviteSchema>) => {
    if (!usernameState) {
      toast({
        title: "Error",
        description: "Please choose a unique username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/create-invitation", {
        username: data.username,
        inviterId: userDetails?.userId,
      });

      if (response.data.success) {
        const generatedLink = `${window.location.origin}/sign-in?username=${data.username}&password=${response.data.password}`;
        setInviteLink(generatedLink);
        
        // Create dynamic image URL with timestamp to prevent caching
        const imageUrl = `${window.location.origin}/api/generate-invite-image?username=${data.username}&t=${Date.now()}`;
        setInviteImageUrl(imageUrl);
        
        setInviteCreated(true);
        toast({
          title: "Success",
          description: "Invitation created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invitation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const invitePath = `/play/invite?username=${form.getValues().username}&password=${encodeURIComponent(inviteLink.split('password=')[1])}`;
    const fullInviteUrl = `${window.location.origin}${invitePath}`;
    
    navigator.clipboard.writeText(fullInviteUrl);
    toast({
      title: "Link copied",
      description: "Share it with your friend!",
    });
  };

  const shareOnWhatsApp = () => {
    try {
      const username = form.getValues().username;
      const invitePath = `/play/invite?username=${username}&password=${encodeURIComponent(inviteLink.split('password=')[1])}`;
      const fullInviteUrl = `${window.location.origin}${invitePath}`;
      
      const message = `Join me on Globetrotter! Click this link to start playing: ${fullInviteUrl}`;
      const encodedMessage = encodeURIComponent(message);
      
      const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp",
        description: "WhatsApp should open shortly with your invitation.",
      });
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Sharing Failed",
        description: "Unable to share. You can manually copy the link instead.",
        variant: "destructive"
      });
    }
  };

  const createAnotherInvite = () => {
    setInviteCreated(false);
    form.reset();
    setDebouncedUsername("");
    setUsernameMessage("");
    setUsernameState(false);
  };

  return (
    <div className="min-h-screen hero-pattern pt-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Share2 className="text-blue-500" size={24} /> Challenge a Friend
          </h1>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-2">Invite a Friend</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Create a unique username for your friend and send them a challenge
          </p>

          {!inviteCreated ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Friend's Username</FormLabel>
                      <Input
                        {...field}
                        className="bg-background/50"
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                      {loading && (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                          <p className="text-sm text-muted-foreground">Checking username...</p>
                        </div>
                      )}
                      {!loading && usernameMessage && (
                        <p className={`text-sm ${usernameState ? "text-green-500" : "text-red-500"}`}>
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !usernameState}
                >
                  {loading ? "Creating..." : "Create Challenge Link"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-lg mb-4">
                <img 
                  src={inviteImageUrl} 
                  alt="Globetrotter Invitation" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x300/1e3a8a/ffffff?text=Globetrotter+Challenge";
                  }}
                />
              </div>
              
              <div className="relative">
                <Input 
                  value={inviteLink} 
                  readOnly 
                  className="pr-10 bg-background/50"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0" 
                  onClick={handleCopyLink}
                >
                  <Copy size={16} />
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 flex items-start gap-2">
                <Check className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Account created for {form.getValues().username}</h3>
                  <p className="text-sm text-muted-foreground">
                    They'll be able to play as soon as they click the link
                  </p>
                </div>
              </div>

              <Button 
                onClick={shareOnWhatsApp} 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Share on WhatsApp
              </Button>

              <Button 
                onClick={createAnotherInvite} 
                variant="outline" 
                className="w-full"
              >
                Create Another Invite
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}