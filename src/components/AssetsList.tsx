import { List, ListRowRenderer } from 'react-virtualized';
import AssetItem from './AssetsItem';
import { Asset, Prices } from '../shared/types/types';

interface AssetListProps {
    assets: Asset[];
    prices: Prices;
    totalValue: number;
    onRemove: (symbol: string) => void;
  }
  
  function AssetList({ assets, prices, totalValue, onRemove }: AssetListProps) {
    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
      const asset = assets[index];
      const currentPrice = prices[asset.symbol] || 0;
      const value = currentPrice * asset.quantity;
      const share = totalValue > 0 ? ((value / totalValue) * 100).toFixed(2) : '0';
  
      return (
        <div key={key} style={style}>
          <AssetItem
            asset={asset}
            currentPrice={currentPrice}
            value={value}
            share={parseFloat(share)}
            onRemove={onRemove}
          />
        </div>
      );
    };
  
    return (
      <div className="w-full max-w-4xl">
        <div className="table-header grid grid-cols-6 gap-4">
          <span>Название</span>
          <span>Количество</span>
          <span>Цена</span>
          <span>Стоимость</span>
          <span>Изменение 24ч</span>
          <span>Доля</span>
        </div>
        <List
          width={896}
          height={400}
          rowCount={assets.length}
          rowHeight={60}
          rowRenderer={rowRenderer}
          className="bg-white rounded-b-lg shadow-md border border-gray-200"
        />
      </div>
    );
  }
  
  export default AssetList;