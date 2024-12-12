import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Wallet, ArrowRight, Link as LinkIcon, MessageCircle, Vote, ShoppingBag, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setShowSparkle(true);
    const timer = setTimeout(() => setShowSparkle(false), 1000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    document.body.style.backgroundColor = '#000';
    const mainContent = document.createElement('div');
    mainContent.style.position = 'fixed';
    mainContent.style.top = '50%';
    mainContent.style.left = '50%';
    mainContent.style.width = '30rem';
    mainContent.style.height = '30rem';
    mainContent.style.transform = 'translate(-50%, -50%)';
    mainContent.style.filter = 'blur(120px)';
    mainContent.style.background = 'radial-gradient(circle, rgba(232,65,66,0.15) 0%, rgba(220,38,38,0.1) 100%)';
    mainContent.style.animation = 'float 8s ease-in-out infinite';
    mainContent.style.zIndex = '0';
    document.body.appendChild(mainContent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(mainContent);
      clearTimeout(timer);
    };
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setShowSparkle(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 800);
      } else {
        alert('Please install a Web3 wallet like MetaMask');
      }
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Cross-Chain Swaps",
      description: "Seamlessly swap tokens across multiple chains with instant finality on Avalanche"
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "DeFi Integration",
      description: "Access Avalanche's DeFi ecosystem through simple, shareable links"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "AVAX Payments",
      description: "Send and receive AVAX payments through user-friendly payment links"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>AVAX Links - Web3 Links for the Avalanche Ecosystem</title>
        <meta name="description" content="Transform Avalanche transactions into shareable links. Create Web3 actions that work anywhere - powered by AVAX." />
      </Head>

      {/* Animated background effect */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(232,65,66,0.15) 0%, rgba(0,0,0,0) 50%)`
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/avalanche.png" 
                alt="Avalanche Logo" 
                width={32} 
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold">AVAX Links</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Main content */}
            <div className="space-y-8">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Turn Avalanche Actions Into Shareable Links
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                Create Web3 links that work anywhere on the internet. Built for the Avalanche ecosystem, 
                powered by AVAX. Experience the speed and security of Avalanche in every link.
              </p>

              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 
                         rounded-xl font-medium text-xl text-white hover:shadow-lg hover:shadow-red-500/20 
                         transition-all duration-300"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    Connect Wallet
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Right column - Feature cards */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                           hover:border-red-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 
                                group-hover:from-red-500/20 group-hover:to-red-600/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-12">
              Built on <span className="text-red-500">Avalanche</span>
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}