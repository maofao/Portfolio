import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Asset, Prices } from '../types/types';
import { AppDispatch } from '../../store';
import { removeAsset } from '../../store/slice';

export const getColumns = (
  prices: Prices,
  totalValue: number,
  dispatch: AppDispatch
) => [
  {
    title: 'Название',
    dataIndex: 'symbol',
    key: 'symbol',
    width: 100, 
    sorter: (a: Asset, b: Asset) => a.symbol.localeCompare(b.symbol),
    render: (symbol: string) => symbol.replace('USDT', ''),
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
    sorter: (a: Asset, b: Asset) => a.quantity - b.quantity,
    render: (quantity: number) => quantity.toFixed(4),
  },
  {
    title: 'Цена',
    key: 'price',
    width: 100,
    render: (_: unknown, record: Asset) =>
      `$${prices[record.symbol]?.price.toFixed(2) || '0.00'}`,
  },
  {
    title: 'Стоимость',
    key: 'value',
    width: 100,
    sorter: (a: Asset, b: Asset) =>
      (prices[a.symbol]?.price || 0) * a.quantity - (prices[b.symbol]?.price || 0) * b.quantity,
    render: (_: unknown, record: Asset) =>
      `$${(prices[record.symbol]?.price * record.quantity || 0).toFixed(2)}`,
  },
  {
    title: '24ч',
    key: 'change24h',
    width: 80,
    render: (_: unknown, record: Asset) => {
      const change = prices[record.symbol]?.change24h || 0;
      return (
        <span style={{ color: change >= 0 ? 'var(--success-color)' : 'var(--error-color)' }}>
          {change.toFixed(2)}%
        </span>
      );
    },
  },
  {
    title: 'Доля',
    key: 'share',
    width: 80,
    render: (_: unknown, record: Asset) =>
      totalValue > 0
        ? ((prices[record.symbol]?.price * record.quantity) / totalValue * 100).toFixed(2) + '%'
        : '0%',
  },
  {
    title: 'Действия',
    key: 'action',
    width: 80,
    render: (_: unknown, record: Asset) => (
      <Button
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => dispatch(removeAsset(record.symbol))}
        style={{ color: 'var(--error-color)' }}
        aria-label={`Удалить ${record.symbol}`}
      />
    ),
  },
];