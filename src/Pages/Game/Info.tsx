import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetInfoQuery, 
  useDeleteInfoMutation,
  useCreateInfoMutation,
  useUpdateInfoMutation
} from '../../Api/InfoApi';
import InfoModel from '../../Interfaces/InfoModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setNewsItem } from '../../Storage/Redux/newsItemSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const Info: React.FC = () => {
  const [form] = Form.useForm<InfoModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InfoModel | null>(null);

  const dispatch = useDispatch();
  const [deleteInfo] = useDeleteInfoMutation();
  const [createInfo] = useCreateInfoMutation();
  const [updateInfo] = useUpdateInfoMutation();
  const { data, isLoading, refetch } = useGetInfoQuery(null);

// for img
  const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };
  //

  const handleInfoDelete = async (id: string) => {
    toast.promise(
      deleteInfo(id),
      {
        pending: 'Processing your request...',
        success: 'Info has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: InfoModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: InfoModel) => {
    try {
      if (editingItem) {
        await updateInfo({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Information updated successfully');    
      } else {
        await createInfo(values).unwrap();
        toastNotify('Information created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setNewsItem(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred',"error");
    }
  };

  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
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
      title: 'Title information',
      dataIndex: 'titleInfo',
      key: 'titleInfo',
    },
    {
      title: ' Text information',
      dataIndex: 'textInfo',
      key: 'textInfo',
    },
    {
      title: 'Date',
      dataIndex: 'dataInfo',
      key: 'dataInfo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: InfoModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleInfoDelete(record.id)} />
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
            <h1 className="text-success">List of information</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add information
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit information" : "Add new information"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<InfoModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleInfo" label="Title information" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="textInfo" label="Text information" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="dataInfo" label="Date" rules={[{ required: true }]}>
                <Input type='date'/>
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

export default Info;
