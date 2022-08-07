import {
  StarOutlined,
  ContainerOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Pagination, Button } from "antd";
import type { MenuProps } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import SearchInput from "./components/SearchInput";
import ModalEvaluate from "./components/ModalEvaluate";
import ModalDetailProduct from "./components/ModalDetailProduct";
import {
  countProduct,
  getProductCategory,
  getProducts,
  getProductStar,
  sortPrice,
} from "./firebase/services";
import { OrderByDirection } from "firebase/firestore";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const getProductByPrice = async (sort: OrderByDirection) => {
  return await sortPrice(sort);
};

const getProductByStar = async (star: string) => {
  return await getProductStar(star);
};

const getProductByCategory = async (category: string) => {
  return await getProductCategory(category);
};

const items: MenuItem[] = [
  getItem("Số sao", "star", <StarOutlined />, [
    getItem("Từ 1 đến 2 sao", "1-2"),
    getItem("Từ 2 đến 3 sao", "2-3"),
    getItem("Từ 3 đến 4 sao", "3-4"),
    getItem("Từ 4 đến 5 sao", "4-5"),
  ]),
  getItem("Thể loại", "category", <ContainerOutlined />, [
    getItem("Tốt", "POSITIVE"),
    getItem("Trung bình", "NEUTRAL"),
    getItem("Không tốt", "NEGATIVE"),
  ]),
  getItem("Giá", "price", <MoneyCollectOutlined />, [
    getItem("Giá từ cao tới thấp", "desc"),
    getItem("Giá từ thấp tới cao", "asc"),
  ]),
];

const App: React.FC = () => {
  const [prodRenders, setProdRenders] = useState<Array<any>>([]);
  const [products, setProducts] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const [productSelected, setProductSelected] = useState<any>({});
  const [totalProduct, setTotalProduct] = useState<number>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleProd, setIsVisibleProd] = useState<boolean>(false);

  const getProductFromFS = async () => {
    const prods = await getProducts();
    setProducts([...prods]);
  };

  const handleSearchName = useCallback(async (search: string) => {
    const prods = await getProducts();
    const products = (prods as any).filter((item: { name: any }) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts([...products]);
    setTotalProduct(products.length);
  }, []);

  useCallback(getProductByPrice, []);
  useCallback(getProductByStar, []);
  useCallback(getProductByCategory, []);

  const getProductRenders = useCallback(
    (page: number) => {
      const start = (page - 1) * 20;
      const end = page * 20;
      const data = products.slice(start, end);
      setProdRenders([...data]);
    },
    [products]
  );

  const getTotalProduct = useCallback(async () => {
    const count = await countProduct();
    setTotalProduct(count);
  }, []);

  useEffect(() => {
    getProductRenders(1);
  }, [getProductRenders, products]);

  const handleChangeMenuItem = async (event: any) => {
    let prods: string | any[] = [];
    const caseKey = event.keyPath[1];
    const valueKey = event.keyPath[0];

    setSearch("");
    switch (caseKey) {
      case "star":
        prods = await getProductByStar(valueKey);
        break;
      case "category":
        prods = await getProductByCategory(valueKey);
        break;
      case "price":
        prods = await getProductByPrice(valueKey);
        break;
    }

    setProducts([...prods]);
    setTotalProduct(prods.length);
  };

  const handleSetProductSelected = (product: any) => {
    setProductSelected(product);
    setIsVisibleProd(true);
  };

  useEffect(() => {
    getProductFromFS();
    getTotalProduct();
    getProductRenders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={handleChangeMenuItem}
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
          <Button
            type="primary"
            className="h-full bg-sky-400 drop-shadow-xl hover:bg-sky-600"
            onClick={() => {
              setIsVisible(true);
            }}
          >
            Đánh giá
          </Button>
          <SearchInput
            search={search}
            setSearch={setSearch}
            handleSearchName={handleSearchName}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="bg-transparent"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            <div className="grid grid-cols-4 gap-4">
              {prodRenders?.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  handleSetProductSelected={handleSetProductSelected}
                />
              ))}
            </div>
            <div className="flex justify-end mt-3 w-full">
              {totalProduct && (
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
              )}
            </div>
            <ModalEvaluate
              visible={isVisible}
              handleChangeVisible={setIsVisible}
              handleSetProductSelected={handleSetProductSelected}
            />
            <ModalDetailProduct
              visible={isVisibleProd}
              handleChangeVisible={setIsVisibleProd}
              product={productSelected}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
