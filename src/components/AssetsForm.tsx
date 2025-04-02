import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Form, Input, Button, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { addAsset } from '../store/slice';

const { Option } = Select;

function AssetForm() {
  const dispatch = useDispatch();
  const [form] = useForm();
  const availableSymbols = useSelector((state: RootState) => state.assets.availableSymbols);

  const onFinish = (values: { symbol: string; quantity: string }) => {
    const quantity = parseFloat(values.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      form.setFields([{ name: 'quantity', errors: ['Введи корректное количество!'] }]);
      return;
    }
    dispatch(addAsset({ symbol: values.symbol.toUpperCase(), quantity }));
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="inline"
      className="asset-form"
    >
      <Form.Item
        name="symbol"
        rules={[{ required: true, message: 'Выбери актив!' }]}
      >
        <Select
          placeholder="Актив"
          style={{ width: 160 }}
          showSearch
          allowClear
          optionFilterProp="children"
          aria-label="Выбор актива"
          loading={availableSymbols.length === 0} 
        >
          {availableSymbols.map((symbol) => (
            <Option key={symbol} value={symbol}>
              {symbol.replace('USDT', '')}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        rules={[{ required: true, message: 'Введи количество!' }]}
      >
        <Input
          type="number"
          step="0.0001"
          placeholder="0.0000"
          style={{ width: 160 }}
          onKeyPress={(e) => {
            if (e.key === '-' || e.key === 'e') e.preventDefault();
          }}
          aria-label="Количество актива"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" aria-label="Добавить актив">
          Добавить
        </Button>
        <Button
          onClick={() => form.resetFields()}
          style={{ marginLeft: 8 }}
          aria-label="Сбросить форму"
        >
          Сбросить
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AssetForm;