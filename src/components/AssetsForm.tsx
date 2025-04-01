import { useState, FormEvent } from 'react';
import { Asset } from '../shared/types/types';

interface AssetFormProps {
    onAdd: (asset: Asset) => void;
  }
  
  function AssetForm({ onAdd }: AssetFormProps) {
    const [symbol, setSymbol] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (symbol && quantity) {
        onAdd({ symbol, quantity: parseFloat(quantity) });
        setSymbol('');
        setQuantity('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-lg card">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Символ (e.g., BTCUSDT)"
            className="input-field"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Количество"
            step="0.0001"
            className="input-field"
          />
          <button type="submit" className="btn-primary">
            Добавить
          </button>
        </div>
      </form>
    );
  }
  
  export default AssetForm;