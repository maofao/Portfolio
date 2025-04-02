import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, Prices } from '../shared/types/types';

interface AssetsState {
  assets: Asset[];
  prices: Prices;
  availableSymbols: string[];
}

const initialState: AssetsState = {
  assets: [],
  prices: {},
  availableSymbols: [],
};

const loadAssetsFromStorage = (): Asset[] => {
  const saved = localStorage.getItem('portfolioAssets');
  return saved ? JSON.parse(saved) : [];
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState: {
    ...initialState,
    assets: loadAssetsFromStorage(),
  },
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      const { symbol, quantity } = action.payload;
      const existingAsset = state.assets.find((asset) => asset.symbol === symbol);

      if (existingAsset) {
        
        existingAsset.quantity += quantity;
      } else {
        
        state.assets.push(action.payload);
      }

      
      localStorage.setItem('portfolioAssets', JSON.stringify(state.assets));
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset.symbol !== action.payload);
      localStorage.setItem('portfolioAssets', JSON.stringify(state.assets));
    },
    updatePrices: (state, action: PayloadAction<Prices>) => {
      state.prices = { ...state.prices, ...action.payload };
    },
    setAvailableSymbols: (state, action: PayloadAction<string[]>) => {
      state.availableSymbols = action.payload;
    },
  },
});

export const { addAsset, removeAsset, updatePrices, setAvailableSymbols } = assetsSlice.actions;
export default assetsSlice.reducer;