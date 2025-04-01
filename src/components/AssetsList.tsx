import { Table, Button } from 'antd';
import { Asset, Prices } from '../shared/types/types';

interface AssetListProps {
  assets: Asset[];
  prices: Prices;
  totalValue: number;
  onRemove: (symbol: string) => void;
}

function AssetList({ assets, prices, totalValue, onRemove }: AssetListProps) {
  const columns = [
    {
      title: 'Название',
      dataIndex: 'symbol',
      sorter: (a: Asset, b: Asset) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      sorter: (a: Asset, b: Asset) => a.quantity - b.quantity,
      render: (quantity: number) => quantity.toFixed(4),
    },
    {
      title: 'Цена',
      key: 'price',
      render: (_: unknown, record: Asset) =>
        `$${prices[record.symbol]?.price.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Стоимость',
      key: 'value',
      sorter: (a: Asset, b: Asset) =>
        (prices[a.symbol]?.price || 0) * a.quantity - (prices[b.symbol]?.price || 0) * b.quantity,
      render: (_: unknown, record: Asset) =>
        `$${(prices[record.symbol]?.price * record.quantity || 0).toFixed(2)}`,
    },
    {
      title: 'Изменение 24ч',
      key: 'change24h',
      render: (_: unknown, record: Asset) => {
        const change = prices[record.symbol]?.change24h || 0;
        return <span style={{ color: change >= 0 ? '#F7C627' : '#FF4D4F' }}>{change.toFixed(2)}%</span>;
      },
    },
    {
      title: 'Доля',
      key: 'share',
      render: (_: unknown, record: Asset) =>
        totalValue > 0
          ? ((prices[record.symbol]?.price * record.quantity) / totalValue * 100).toFixed(2) + '%'
          : '0%',
    },
    {
      title: '',
      key: 'action',
      render: (_: unknown, record: Asset) => (
        <Button type="link" danger onClick={() => onRemove(record.symbol)} style={{ color: '#FF4D4F' }}>
          ✕
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={assets}
      columns={columns}
      rowKey="symbol"
      size="small"
      pagination={false}
      loading={Object.keys(prices).length === 0}
      locale={{ emptyText: 'Пока нет активов' }}
      style={{ background: '#2A2D3A', color: '#D3D6E0' }}
      rowClassName={() => 'ant-table-row-custom'}
    />
  );
}

export default AssetList;