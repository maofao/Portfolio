import { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import AssetForm from './components/AssetsForm';
import AssetList from './components/AssetsList';
import { Asset, Prices } from './shared/types/types';

const { Header, Content } = Layout;
const { Title } = Typography;

interface BinanceTicker {
  stream: string;
  data: { c: string; P: string };
}

function App() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('portfolioAssets');
    return saved ? JSON.parse(saved) : [];
  });
  const [prices, setPrices] = useState<Prices>({});

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker');
    ws.onmessage = (event: MessageEvent<string>) => {
      const data: BinanceTicker = JSON.parse(event.data);
      if (data.stream && data.data) {
        const symbol = data.stream.split('@')[0].toUpperCase();
        const price = parseFloat(data.data.c);
        const change24h = parseFloat(data.data.P);
        setPrices((prev) => ({ ...prev, [symbol]: { price, change24h } }));
      }
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
  }, [assets]);

  const totalValue = assets.reduce(
    (sum, asset) => sum + ((prices[asset.symbol]?.price || 0) * asset.quantity),
    0
  );

  const addAsset = (newAsset: Asset) => {
    setAssets((prev) => [...prev, { ...newAsset, symbol: newAsset.symbol.toUpperCase() }]);
  };

  const removeAsset = (symbol: string) => {
    setAssets((prev) => prev.filter((asset) => asset.symbol !== symbol));
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#1A1C24' }}>
      <Header style={{ background: '#1A1C24', padding: '0 16px', borderBottom: '1px solid #3A3F50' }}>
        <Title level={3} style={{ color: '#F7C627', margin: 0, lineHeight: '64px' }}>
          Портфель: ${totalValue.toFixed(2)}
        </Title>
      </Header>
      <Content style={{ padding: '16px', maxWidth: '800px', margin: '0 auto', background: '#1A1C24' }}>
        <AssetForm onAdd={addAsset} />
        <AssetList assets={assets} prices={prices} totalValue={totalValue} onRemove={removeAsset} />
      </Content>
    </Layout>
  );
}

export default App;