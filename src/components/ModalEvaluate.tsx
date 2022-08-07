import { Modal, Form, Radio, Input, Button, notification } from "antd";
import React from "react";
import { evaluateProduct } from "../services";

interface ModalProps {
  visible: boolean;
  handleChangeVisible: (visible: boolean) => void;
  handleSetProductSelected: (product: any) => void;
}

const crawlerComment = async (link: string, shop: string) => {
  return await evaluateProduct(link, shop);
};

const ModalEvaluate: React.FC<ModalProps> = ({
  visible,
  handleChangeVisible,
  handleSetProductSelected,
}: ModalProps) => {
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const [link, setLink] = React.useState<string>("");
  const [shop, setShop] = React.useState<string>("");
  const handleOk = async () => {
    if (!link || !shop) {
      notification["error"]({
        message: "Thông báo",
        description: "Bạn cần chọn trang và nhập đường dẫn đầy đủ",
      });
      return;
    }
    setConfirmLoading(true);
    const product = await crawlerComment(link, shop);
    handleSetProductSelected(product);
    setConfirmLoading(false);
    setLink("");
    setShop("");
    handleChangeVisible(false);
  };

  const handleCancel = () => {
    setConfirmLoading(false);
    setLink("");
    setShop("");
    handleChangeVisible(false);
  };

  return (
    <>
      <Modal
        title="Đánh giá theo đường dẫn"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-sky-600"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Đánh giá
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="Radio">
            <Radio.Group
              onChange={(e) => {
                setShop(e.target.value);
              }}
              value={shop}
            >
              <Radio value="tgdd"> Thế giới di động </Radio>
              <Radio value="nguyenkim"> Nguyễn Kim </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Link">
            <Input
              className="w-full"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEvaluate;
