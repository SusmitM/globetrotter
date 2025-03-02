'use client'
import { ArrowLeft, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  highScore: number;
};

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
    <div className="min-h-screen hero-pattern pt-16 md:pt-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="glass-card p-4 md:p-6 rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 text-sm hover:underline cursor-pointer mb-4 md:mb-0">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </div>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-white text-center">
              Global Leaderboard
            </h1>
          </div>

          {isLoading ? (
            <div className="text-center py-6">
              <p className="text-gray-400">Loading leaderboard data...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboardData.map((entry) => (
                <div 
                  key={entry.userId}
                  className={`flex justify-between items-center p-3 md:p-4 rounded-lg 
                    ${entry.rank <= 3 ? 'bg-black/50' : 'bg-black/30'}
                    ${session?.user?._id === entry.userId ? 'border border-blue-500/50' : ''}`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-6 md:w-8 text-center flex justify-center items-center">
                      {entry.rank <= 3 ? (
                        <span className="text-lg md:text-xl">
                          {entry.rank === 1 && <span className="text-yellow-400">🥇</span>}
                          {entry.rank === 2 && <span className="text-gray-400">🥈</span>}
                          {entry.rank === 3 && <span className="text-amber-700">🥉</span>}
                        </span>
                      ) : (
                        <span className="text-gray-400">{entry.rank}</span>
                      )}
                    </span>
                    <span className="text-sm md:text-base font-medium">{entry.username}</span>
                  </div>
                  <span className="text-sm md:text-base font-bold">{entry.highScore} pts</span>
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