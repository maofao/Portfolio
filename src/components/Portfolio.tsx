import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

function PortfolioAnalytics() {
  const assets = useSelector((state: RootState) => state.assets.assets);
  const prices = useSelector((state: RootState) => state.assets.prices);

  const totalValue = assets.reduce(
    (sum, asset) => sum + (prices[asset.symbol]?.price || 0) * asset.quantity,
    0
  );

  const chartData = assets.map((asset) => {
    const value = (prices[asset.symbol]?.price || 0) * asset.quantity;
    return {
      name: asset.symbol.replace('USDT', ''),
      value: value,
    };
  });

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ${c} ({d}%)',
      backgroundColor: 'rgba(30, 30, 50, 0.9)',
      borderColor: '#663399',
      textStyle: {
        color: '#D4BFFF',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'], 
        center: ['50%', '50%'],
        roseType: 'radius', 
        itemStyle: {
          borderRadius: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 231, 255, 0.5)',
          shadowOffsetY: 5,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#D4BFFF',
          textShadowBlur: 5,
          textShadowColor: 'rgba(212, 191, 255, 0.5)',
        },
        labelLine: {
          length: 10,
          length2: 10,
          smooth: true,
          lineStyle: {
            color: '#663399',
          },
        },
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 30,
            shadowColor: 'rgba(0, 231, 255, 0.8)',
            scale: true,
          },
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDuration: 1000,
      },
    ],
    color: ['#00E7FF', '#FF00DD', '#FF3366', '#33FF99'], 
  };

  return (
    <motion.div
      className="portfolio-analytics"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="analytics-card">
        <h2>Общая стоимость: ${totalValue.toFixed(2)}</h2>
        {assets.length > 0 ? (
          <ReactECharts
            option={options}
            style={{ height: 300, width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        ) : (
          <p>Добавьте активы, чтобы увидеть аналитику</p>
        )}
      </Card>
    </motion.div>
  );
}

export default PortfolioAnalytics;