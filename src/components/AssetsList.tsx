import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Table } from 'antd';
import { getColumns } from '../shared/columns/columns';

function AssetList() {
  const dispatch = useDispatch<AppDispatch>();
  const assets = useSelector((state: RootState) => state.assets.assets);
  const prices = useSelector((state: RootState) => state.assets.prices);

  const totalValue = assets.reduce(
    (sum, asset) => sum + (prices[asset.symbol]?.price || 0) * asset.quantity,
    0
  );

  const columns = getColumns(prices, totalValue, dispatch);

  return (
    <div className="asset-table-wrapper">
      <Table
        dataSource={assets}
        columns={columns}
        rowKey="symbol"
        pagination={false}
        locale={{ emptyText: 'Пока нет активов' }}
        className="asset-table"
        scroll={{ x: 'max-content' }} 
      />
    </div>
  );
}

export default AssetList;