"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Globe, MapPin, Trophy, Users } from "lucide-react";
import { Spotlight } from "@/components/ui/Sportlight";

export default function Home() {
  return (
    <main className="min-h-screen hero-pattern relative overflow-hidden">
      <Spotlight 
        className="absolute sm:left-1/6 md:left-x-[20%]  -top-40 sm:-top-44 md:-top-64 lg:-top-60"
        fill="white"
      />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12 mt-16">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Globetrotter: The Ultimate Travel Guessing Game
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Solve cryptic clues about famous destinations, test your travel knowledge, and challenge your friends to see who's the ultimate globetrotter!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start Exploring <MapPin className="ml-2" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Explore the World</h3>
            <p className="text-muted-foreground">
              Discover fascinating destinations through cryptic clues and unlock fun facts about places around the globe.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Track Your Score</h3>
            <p className="text-muted-foreground">
              See how many destinations you can correctly identify and improve your travel knowledge with each game.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Challenge Friends</h3>
            <p className="text-muted-foreground">
              Create a unique username and invite friends to see who can identify the most destinations correctly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}