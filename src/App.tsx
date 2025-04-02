import { Layout } from 'antd';
import AssetForm from './components/AssetsForm';
import AssetList from './components/AssetsList';
import PortfolioAnalytics from './components/Portfolio';
import { useBinanceWebSocket } from './hooks/useWebSocket';

const { Header, Content } = Layout;

function App() {

  useBinanceWebSocket({ enabled: true });

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <h1 className="app-title">Крипто Портфель</h1>
      </Header>
      <Content className="app-content">
        <div className="dashboard">
          <div className="dashboard-left">
            <AssetForm />
            <AssetList />
          </div>
          <div className="dashboard-right">
            <PortfolioAnalytics />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;