'use client'
import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface LeaderboardEntry {
  userId: string;
  username: string;
  highScore: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/game/leaderboard?limit=10');
        
        if (response.data.success) {
          setLeaderboardData(response.data.data.leaderboard);
          
          // Find user's rank if they're in the leaderboard
          if (session?.user?._id) {
            const userEntry = response.data.data.leaderboard.find(
              (entry: LeaderboardEntry) => entry.userId === session.user._id
            );
            if (userEntry) {
              setUserRank(userEntry.rank);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [session]);

  return (
    <div className="min-h-screen hero-pattern pt-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6 w-full">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-blue-500" /> Leaderboard
          </h1>
        </div>

        <div className="glass-card rounded-xl p-6 w-full">
          <h2 className="text-xl font-bold text-center mb-6">Top Globetrotters</h2>

          {isLoading ? (
            <div className="text-center py-10">Loading leaderboard...</div>
          ) : (
            <div className="space-y-2">
              {leaderboardData.map((entry) => (
                <div 
                  key={entry.userId}
                  className={`flex justify-between items-center p-4 rounded-lg 
                    ${entry.rank <= 3 ? 'bg-black/50' : 'bg-black/30'}
                    ${session?.user?._id === entry.userId ? 'border border-blue-500/50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center flex justify-center items-center">
                      {entry.rank <= 3 ? (
                        <span className="text-xl">
                          {entry.rank === 1 && <span className="text-yellow-400">🥇</span>}
                          {entry.rank === 2 && <span className="text-gray-400">🥈</span>}
                          {entry.rank === 3 && <span className="text-amber-700">🥉</span>}
                        </span>
                      ) : (
                        <span className="text-gray-400">{entry.rank}</span>
                      )}
                    </span>
                    <span className="font-medium">{entry.username}</span>
                  </div>
                  <span className="font-bold">{entry.highScore} pts</span>
                </div>
              ))}

              {leaderboardData.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  No scores recorded yet. Be the first to play!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}