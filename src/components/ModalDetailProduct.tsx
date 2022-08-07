import { Col, Image, Modal, Row, Typography, Divider } from "antd";
import React, { useCallback } from "react";

interface ModalProps {
  visible: boolean;
  handleChangeVisible: (visible: boolean) => void;
  product: any;
}

const changeEvaluateToText = (evaluate: string) => {
  switch (evaluate) {
    case "POSITIVE":
      return "Tốt";
    case "NEUTRAL":
      return "Trung bình";
    case "NEGATIVE":
      return "Không tốt";
    default:
      return "Chưa đánh giá";
  }
};

const changeIdShopToText = (id_shop: number) => {
  switch(id_shop) {
    case 1:
      return "Tiki";
    case 2:
      return "Sendo";
    case 3:
      return "Shopee";
    case 4:
      return "Thế giới di động";
    case 5:
      return "Nguyễn Kim";
  }
}

const ModalDetailProduct: React.FC<ModalProps> = ({
  visible,
  handleChangeVisible,
  product,
}: ModalProps) => {
  const { name, price, star, evaluate, image, id_shop } = product;

  const handleCancel = () => {
    handleChangeVisible(false);
  };

  useCallback(changeEvaluateToText, []);

  return (
    product && (
      <Modal
        centered
        visible={visible}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        <Row>
          <Col xs={10} sm={10} md={12} lg={12}>
            <Image className="w-full" src={image} />
          </Col>
          <Col xs={14} sm={14} md={12} lg={12}>
            <Typography.Title level={4} className="text-center">
              Thông tin sản phẩm
            </Typography.Title>
            <div className="mx-3">
              <div className="mx-2 flex justify-between">
                <div className="flex-none text-lg mr-2">Trang: </div>
                <div className="flex-1 w-90 break-words text-lg">{changeIdShopToText(id_shop)}</div>
              </div>
              <Divider />
              <div className="mx-2 flex justify-between">
                <div className="flex-none text-lg mr-2">Tên: </div>
                <div className="flex-1 w-90 break-words text-lg">{name}</div>
              </div>
              <Divider />
              <div className="mx-2 flex justify-between">
                <div className="flex-none text-lg mr-2">Giá bán: </div>
                <div className="flex-1 w-90 break-words text-lg">
                  {price?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <Divider />
              <div className="mx-2 flex justify-between">
                <div className="flex-none text-lg mr-2">Đánh giá: </div>
                <div className="flex-1 w-90 break-words text-lg">
                  {changeEvaluateToText(evaluate)}
                </div>
              </div>
              <Divider />
              <div className="mx-2 flex justify-between">
                <div className="flex-none text-lg mr-2">Số sao: </div>
                <div className="flex-1 w-90 break-words text-lg flex items-center ">
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      star > 0.9 ? "text-yellow-300" : "text-black"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      star > 1.9 ? "text-yellow-300" : "text-black"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      star > 2.9 ? "text-yellow-300" : "text-black"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      star > 3.9 ? "text-yellow-300" : "text-black"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      star > 4.7 ? "text-yellow-300" : "text-black"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <Divider />
            </div>
          </Col>
        </Row>
      </Modal>
    )
  );
};

export default ModalDetailProduct;
