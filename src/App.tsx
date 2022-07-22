import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Pagination, Button } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Card from './components/Card';
import SearchInput from './components/SearchInput';
import { countProduct, getProducts } from './firebase/services';
const { Header, Content, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
  const [prodRenders, setProdRenders] = useState<Array<any>>([]);
  const [totalProduct, setTotalProduct] = useState<number>();

  const products = useMemo(async () => {
    return await getProducts();
  }, []);

  const getProductRenders = useCallback(async (page: number) => {
    const start = (page - 1) * 20;
    const end = page * 20;
    const data = (await products).slice(start, end);
    setProdRenders([...data]);
  }, [products]);

  const getTotalProduct = useCallback(async () => {
    const count = await countProduct();
    setTotalProduct(count);
  }, []);

  useEffect(() => {
    getTotalProduct();
    getProductRenders(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 10,
          }}
          className="flex justify-between items-center"
        >
          <Button type="primary" className='h-full'>Primary</Button>
          <SearchInput />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            className="bg-transparent"
            style={{
              padding: 24,
              textAlign: 'center',
            }}
          >
            <div className="grid grid-cols-4 gap-4">
              {prodRenders?.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            <div className="flex justify-end mt-3 w-full">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={20}
                total={totalProduct}
                onChange={(page) => {
                  getProductRenders(page);
                }}
                onShowSizeChange={(pageSize) => {
                  console.log(pageSize);
                }}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
