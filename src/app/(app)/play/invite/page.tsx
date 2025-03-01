import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: { username: string; password: string };
};

// Generate metadata for OpenGraph
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = searchParams.username || 'a friend';
  
  // Using Railway's OG image service
  const ogImageUrl = `https://og.railway.app/api/image?fileType=png&layoutName=Simple&theme=dark&text=Join%20Globetrotter!&subtitle=${encodeURIComponent(`Play with ${username} and test your geography knowledge!`)}&left=%230037ff&right=%23ff0909`;
  
  const description = `${username} has invited you to play Globetrotter. Sign in and start exploring!`;

  return {
    title: "Globetrotter Challenge Invitation",
    description: description,
    openGraph: {
      title: "Globetrotter Challenge Invitation",
      description: description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Globetrotter Challenge",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Globetrotter Challenge Invitation",
      description: description,
      images: [ogImageUrl],
    },
  };
}

// This is a server component that handles both the metadata and redirection
export default function InvitePage({ searchParams }: Props) {
  const username = searchParams.username || '';
  const password = searchParams.password || '';
  
  // For server components, we'll use the redirect function instead of router
  // But we'll render a page first to let the OG tags be processed
  return (
    <div className="min-h-screen hero-pattern flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Redirecting you...</h1>
        <p>If you're not redirected, <a href={`/sign-in?username=${username}&password=${password}`} className="text-blue-500 hover:underline">click here</a></p>
        
        {/* Add client-side redirect script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(() => {
                window.location.href = "/sign-in?username=${username}&password=${password}";
              }, 1500);
            `,
          }}
        />
      </div>
    </div>
  );
} 