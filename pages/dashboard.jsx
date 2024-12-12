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