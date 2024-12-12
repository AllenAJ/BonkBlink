# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .vercel/project.json

```json
{"orgId":"team_KHAELfOHJMd9bgdTf3izvyOL","projectId":"prj_diR72fwvr30RFRxNCCi7OiJ0jHwA"}
```

# .vercel/README.txt

```txt
> Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you link a directory to a Vercel project.

> What does the "project.json" file contain?
The "project.json" file contains:
- The ID of the Vercel project that you linked ("projectId")
- The ID of the user or team your Vercel project is owned by ("orgId")

> Should I commit the ".vercel" folder?
No, you should not share the ".vercel" folder with anyone.
Upon creation, it will be automatically added to your ".gitignore" file.

```

# components/DexLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function AvaxServicesGenerator() {
  const [selectedService, setSelectedService] = useState('staking');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const services = {
    staking: {
      title: 'BENQI Staking',
      description: 'Generate link for BENQI staking platform',
      baseUrl: 'https://staking.benqi.fi/stake'
    },
    dex: {
      title: 'Wombat Exchange',
      description: 'Generate link for Wombat DEX swaps',
      baseUrl: 'https://app.wombat.exchange/swap?from=WAVAX%2Cavalanche&to=USDC%2Cavalanche&chain=avalanche'
    },
    trade: {
      title: 'LFG Trading',
      description: 'Generate link for LFG trading platform',
      baseUrl: 'https://lfj.gg/avalanche/trade'
    }
  };

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    const serviceUrl = services[selectedService].baseUrl;
    const displayUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${serviceUrl}&t=${timestamp}`;
    const actualUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${encodeURIComponent(serviceUrl)}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink.actual);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Avalanche Services Link Generator</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.entries(services).map(([key, service]) => (
          <button
            key={key}
            onClick={() => setSelectedService(key)}
            className={`p-4 rounded-xl font-medium transition-all duration-300
              ${selectedService === key 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Selected Service</p>
          <div className="text-white">
            {services[selectedService].description}
          </div>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating}
          className="w-full p-4 bg-red-600 hover:bg-red-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Link'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Link:</p>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

# jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:;"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

# package.json

```json
{
  "name": "unfold2024",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "next": "15.0.3",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106"
  },
  "devDependencies": {
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}

```

# pages/_app.js

```js
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

```

# pages/_document.js

```js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```

# pages/dashboard.jsx

```jsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  LogOut, 
  Zap, 
  ChevronRight, 
  Copy, 
  ExternalLink, 
  Link2, 
  History,
  AlertCircle,
  ArrowRightLeft,
  ShoppingBag
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [fullAddress, setFullAddress] = useState('');
  const [displayAddress, setDisplayAddress] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [blinks, setBlinks] = useState([]);
  const [stats, setStats] = useState({
    totalBlinks: 0,
    last24h: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts[0]) {
            const address = accounts[0];
            setFullAddress(address);
            setDisplayAddress(address.slice(0, 6) + '...' + address.slice(-4));
            loadBlinks(address);
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    connectWallet();

    window.ethereum?.on('accountsChanged', (accounts) => {
      if (accounts[0]) {
        setFullAddress(accounts[0]);
        setDisplayAddress(accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4));
        loadBlinks(accounts[0]);
      } else {
        setFullAddress('');
        setDisplayAddress('');
        setBlinks([]);
        calculateStats([]);
      }
    });

    const handleStorageChange = () => {
      if (fullAddress) {
        loadBlinks(fullAddress);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.ethereum?.removeAllListeners('accountsChanged');
    };
  }, []);

  const calculateStats = (blinksData) => {
    const now = new Date();
    const last24h = new Date(now - 24 * 60 * 60 * 1000);

    const newStats = {
      totalBlinks: blinksData.length,
      last24h: blinksData.filter(blink => new Date(blink.timestamp) > last24h).length
    };

    setStats(newStats);
  };

  const loadBlinks = (address) => {
    try {
      const savedBlinks = localStorage.getItem(`blinks_${address}`);
      if (savedBlinks) {
        const parsedBlinks = JSON.parse(savedBlinks);
        setBlinks(parsedBlinks);
        calculateStats(parsedBlinks);
      } else {
        setBlinks([]);
        calculateStats([]);
      }
    } catch (error) {
      console.error('Error loading blinks:', error);
      setBlinks([]);
      calculateStats([]);
    }
  };

  const platforms = [
    {
      id: 'staking',
      title: 'Yield Yak',
      description: 'Stake your AVAX tokens on Yak platform',
      icon: Zap,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'dex',
      title: 'Steakhut Finance',
      description: 'Swap tokens on Steakhut Finance',
      icon: ArrowRightLeft,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'trade',
      title: 'Aave',
      description: 'Supply, borrow, swap, stake and more',
      icon: ShoppingBag,
      gradient: 'from-red-500 to-orange-500'
    }
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'staking':
        return <Zap className="w-5 h-5 text-black" />;
      case 'dex':
        return <ArrowRightLeft className="w-5 h-5 text-black" />;
      case 'trade':
        return <ShoppingBag className="w-5 h-5 text-black" />;
      default:
        return <Link2 className="w-5 h-5 text-black" />;
    }
  };

  const getPlatformTitle = (platform) => {
    switch (platform) {
      case 'staking':
        return 'Yield Yak';
      case 'dex':
        return 'Steakhut Finance';
      case 'trade':
        return 'Aave';
      default:
        return 'Avax Blink';
    }
  };

  const handleCardClick = (platform) => {
    setActiveCard(platform.id);
    const urls = {
      staking: 'https://yieldyak.com/avalanche/staking/',
      dex: 'https://www.steakhut.finance/swap',
      trade: 'https://app.aave.com/?marketName=proto_avalanche_v3'
    };

    const timestamp = Date.now();
    const dexUrl = urls[platform.id];
    const actualUrl = `https://unfold2024mlinks.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    const newBlink = {
      platform: platform.id,
      timestamp: new Date().toISOString(),
      display: dexUrl,
      actual: actualUrl
    };

    const existingBlinks = JSON.parse(localStorage.getItem(`blinks_${fullAddress}`) || '[]');
    localStorage.setItem(`blinks_${fullAddress}`, JSON.stringify([newBlink, ...existingBlinks]));
    loadBlinks(fullAddress);
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (!fullAddress) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Wallet Not Connected</h1>
          <p className="text-gray-400">
            Please connect your wallet to access your Avax Blinks dashboard.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 
                     rounded-xl font-medium text-black hover:shadow-lg 
                     hover:shadow-red-500/20 transition-all duration-300"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Dashboard - Avax Blinks</title>
      </Head>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-lg font-mono text-red-500">Avax Blinks</span>
            </div>
            <span className="text-red-500">⚡</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-400">{displayAddress}</span>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-white/5 hover:bg-white/10 backdrop-blur-sm
                       transition-all duration-300"
            >
              <LogOut size={20} />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                       hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-800">
                <Link2 className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-sm text-gray-400">Total Blinks</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalBlinks}</p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                       hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-900 to-red-900">
                <History className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-sm text-gray-400">Last 24 Hours</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.last24h}</p>
          </div>
        </div>

        {/* Create New Blink Section */}
        <h2 className="text-2xl font-bold mb-6">Create New Blink</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <div 
              key={platform.id}
              onClick={() => handleCardClick(platform)}
              className="relative group cursor-pointer transform transition-all duration-300
                        hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl" />
              <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
              
              <div className="relative p-8 rounded-2xl border border-white/10 
                           transition-all duration-300 group-hover:border-red-500/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-black">
                        <platform.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-red-500 transition-colors">
                        {platform.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300">
                      {platform.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Blinks Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Blinks</h2>
          {blinks.length > 0 ? (
            <div className="space-y-4">
              {blinks.map((blink, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                           hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500">
                        {getPlatformIcon(blink.platform)}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          {getPlatformTitle(blink.platform)}
                        </h3>
                        <p className="text-gray-400 text-sm mb-1">
                          Created: {formatDate(blink.timestamp)}
                        </p>
                        <div className="text-sm text-gray-500 break-all">
                          {blink.display}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => copyToClipboard(blink.actual)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Copy Link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a 
                        href={blink.actual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        title="Open Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-white/10 rounded-xl bg-white/5">
              <div className="flex flex-col items-center gap-4">
                <Link2 className="w-12 h-12 text-gray-500" />
                <div>
                  <p className="text-gray-400 mb-2">No Blinks created yet.</p>
                  <p className="text-gray-500">Create your first one by selecting a platform above!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

# pages/index.jsx

```jsx
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
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/avalanche.png

This is a binary file of the type: Image

# public/favicon.ico

This is a binary file of the type: Binary

# public/manifest.json

```json
{
    "short_name": "MlinksApp",
    "name": "Mlinks Decentralized Actions",
    "icons": [
      {
        "src": "https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg",
        "type": "image/png",
        "sizes": "192x192"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
```

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

```

# styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
```

