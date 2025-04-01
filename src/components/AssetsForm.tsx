import { Form, Input, Button, Select } from 'antd';
import { Asset } from '../shared/types/types';

interface AssetFormProps {
  onAdd: (asset: Asset) => void;
}

const { Option } = Select;

function AssetForm({ onAdd }: AssetFormProps) {
  const [form] = Form.useForm();
  const popularAssets = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'ADAUSDT'];

  const onFinish = (values: { symbol: string; quantity: number }) => {
    onAdd({ symbol: values.symbol.toUpperCase(), quantity: values.quantity });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="inline"
      style={{ marginBottom: 16 }}
    >
      <Form.Item
        name="symbol"
        rules={[{ required: true, message: 'Выбери символ!' }]}
        style={{ marginRight: 8 }}
      >
        <Select placeholder="Символ" style={{ width: 150 }}>
          {popularAssets.map((asset) => (
            <Option key={asset} value={asset}>
              {asset}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        rules={[
          { required: true, message: 'Введи количество!' },
          { type: 'number', min: 0.0001, message: 'Количество должно быть больше 0!' },
        ]}
        style={{ marginRight: 8 }}
      >
        <Input
          type="number"
          step="0.0001"
          placeholder="Количество"
          style={{ width: 150, background: '#2A2D3A', color: '#D3D6E0', border: 'none' }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ background: '#F7C627', borderColor: '#F7C627' }}
        >
          +
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AssetForm;