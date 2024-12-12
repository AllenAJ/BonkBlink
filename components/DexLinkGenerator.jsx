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