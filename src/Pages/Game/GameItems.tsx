import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetGameItemsQuery, 
  useDeleteGameItemMutation,
  useCreateGameItemMutation,
  useUpdateGameItemMutation
} from '../../Api/gameItemApi';
import gameItemModel from '../../Interfaces/gameItemModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setGameItem } from '../../Storage/Redux/gameItemSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const GameItems: React.FC = () => {
  const [form] = Form.useForm<gameItemModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<gameItemModel | null>(null);

  const dispatch = useDispatch();
  const [deleteGameItem] = useDeleteGameItemMutation();
  const [createGameItem] = useCreateGameItemMutation();
  const [updateGameItem] = useUpdateGameItemMutation();
  const { data, isLoading, refetch } = useGetGameItemsQuery(null);

// for img
  const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };
  //

  const handleGameItemDelete = async (id: string) => {
    toast.promise(
      deleteGameItem(id),
      {
        pending: 'Processing your request...',
        success: 'Game has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: gameItemModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: gameItemModel) => {
    try {
      if (editingItem) {
        await updateGameItem({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Game updated successfully');    
      } else {
        await createGameItem(values).unwrap();
        toastNotify('Game created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setGameItem(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred',"error");
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) => 
      <Image src=
          { imageId ? `https://localhost:7152/api/storage/${imageId}` : require("../../Assets/Images/nocontent.png")} 
          alt="no content" 
          style={{ width: '100%', maxWidth: '120px' }} />,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'titleGame',
      key: 'titleGame',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: gameItemModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleGameItemDelete(record.id)} />
        </ButtonGroup>
        </>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="p-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of Games</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add New Game
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit Game" : "Add New Game"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<gameItemModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleGame" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Option key="id-tournament" value="action">Action</Option>
                  <Option value="adventure">Adventure</Option>
                  <Option value="strategy">Strategy</Option>
                  {/* Add more */}
                </Select>
              </Form.Item>
              <Form.Item name="imageId" label="Image ID">
                <Input />
              </Form.Item>
              <ImageUploader onImageIdChange={handleImageIdChange} />
              {imageId && <p>File ID: {imageId}</p>}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItem ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>   
        </div>
      )}
    </>
  );
};

export default GameItems;
