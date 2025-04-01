import { Asset } from '../shared/types/types';

interface AssetItemProps {
  asset: Asset;
  currentPrice: number;
  value: number;
  share: number;
  onRemove: (symbol: string) => void;
}

function AssetItem({ asset, currentPrice, value, share, onRemove }: AssetItemProps) {
  const change24h = 0;

  return (
    <div className="table-row" onClick={() => onRemove(asset.symbol)}>
      <span className="font-medium">{asset.symbol}</span>
      <span>{asset.quantity.toFixed(4)}</span>
      <span className="text-dark-gray">${currentPrice.toFixed(2)}</span>
      <span className="font-semibold">${value.toFixed(2)}</span>
      <span className={change24h >= 0 ? 'text-primary-orange' : 'text-red-500'}>
        {change24h.toFixed(2)}%
      </span>
      <span className="text-dark-gray">{share.toFixed(2)}%</span>
    </div>
  );
}

export default AssetItem;