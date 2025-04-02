import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { updatePrices, setAvailableSymbols } from '../store/slice';
import { RootState } from '../store';
import { BinanceTicker } from '../shared/types/types';

const WS_URL = 'wss://stream.binance.com:9443/stream';
const REST_API_URL = 'https://api.binance.com/api/v3/exchangeInfo';


interface BinanceSymbol {
  symbol: string;
  quoteAsset: string;
}

interface ExchangeInfoResponse {
  symbols: BinanceSymbol[];
}

interface UseWebSocketProps {
  enabled: boolean;
}

export const useBinanceWebSocket = ({ enabled }: UseWebSocketProps) => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.assets.assets);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(REST_API_URL);
        const data: ExchangeInfoResponse = await response.json();
        const symbols = data.symbols
          .filter((symbol) => symbol.quoteAsset === 'USDT')
          .map((symbol) => symbol.symbol);
        dispatch(setAvailableSymbols(symbols));
      } catch (error) {
        console.error('Ошибка при загрузке символов:', error);
      }
    };

    fetchSymbols();
  }, [dispatch]);

  const symbols = assets.map((asset) => asset.symbol);
  const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join('/');
  const wsUrlWithStreams = enabled && streams ? `${WS_URL}?streams=${streams}` : null;

  const { lastJsonMessage } = useWebSocket(wsUrlWithStreams, {
    onOpen: () => console.log('WebSocket подключён'),
    onClose: () => console.log('WebSocket отключён'),
    shouldReconnect: () => enabled, 
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (!enabled || !lastJsonMessage) {
      return; 
    }

    const data: BinanceTicker = lastJsonMessage as BinanceTicker;
    if (data.stream && data.data) {
      const symbol = data.stream.split('@')[0].toUpperCase();
      const price = parseFloat(data.data.c);
      const change24h = parseFloat(data.data.P);
      dispatch(updatePrices({ [symbol]: { price, change24h } }));
    }
  }, [lastJsonMessage, dispatch, enabled]);
};