import { useState, useEffect } from 'react';
import AssetList from './components/AssetsList';
import AssetForm from './components/AssetsForm';
import { Asset, Prices } from './shared/types/types';

function App() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('portfolioAssets');
    return saved ? JSON.parse(saved) : [];
  });
  const [prices, setPrices] = useState<Prices>({});

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.stream && data.data) {
        const symbol = data.stream.split('@')[0].toUpperCase();
        const price = parseFloat(data.data.c);
        setPrices((prev) => ({ ...prev, [symbol]: price }));
      }
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
  }, [assets]);

  const totalValue = assets.reduce(
    (sum, asset) => sum + (prices[asset.symbol] || 0) * asset.quantity,
    0
  );

  const addAsset = (newAsset: Asset) => {
    setAssets((prev) => [...prev, { ...newAsset, symbol: newAsset.symbol.toUpperCase() }]);
  };

  const removeAsset = (symbol: string) => {
    setAssets((prev) => prev.filter((asset) => asset.symbol !== symbol));
  };

  return (
    <div className="min-h-screen bg-light-gray p-6 flex flex-col items-center">
      <h1 className="mb-8">Портфель активов</h1>
      <AssetForm onAdd={addAsset} />
      <AssetList assets={assets} prices={prices} totalValue={totalValue} onRemove={removeAsset} />
    </div>
  );
}

export default App;