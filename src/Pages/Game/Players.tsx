import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetPlayerQuery, 
  useDeletePlayerMutation,
  useCreatePlayerMutation,
  useUpdatePlayerMutation
} from '../../Api/PlayerApi';
import PlayerModel from '../../Interfaces/PlayerModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setPlayer } from '../../Storage/Redux/playerSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const Players: React.FC = () => {
  const [form] = Form.useForm<PlayerModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<PlayerModel | null>(null);

  const dispatch = useDispatch();
  const [deletePlayer] = useDeletePlayerMutation();
  const [createPlayer] = useCreatePlayerMutation();
  const [updatePlayer] = useUpdatePlayerMutation();
  const { data, isLoading, refetch } = useGetPlayerQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handlePlayerDelete = async (id: string) => {
    toast.promise(
      deletePlayer(id),
      {
        pending: 'Processing your request...',
        success: 'Player has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: PlayerModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: PlayerModel) => {
    try {
      if (editingItem) {
        await updatePlayer({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Player updated successfully');    
      } else {
        await createPlayer(values).unwrap();
        toastNotify('Player created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setPlayer(updatedData.data));
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
      title: 'Country',
      dataIndex: 'countryId',
      key: 'countryId',
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Second name',
      dataIndex: 'secondName',
      key: 'secondName',
    },
    {
        title: 'Nick name',
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: 'Birth date',
        dataIndex: 'birthDate',
        key: 'birthDate',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: PlayerModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handlePlayerDelete(record.id)} />
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
            <h1 className="text-success">List of Players</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add player
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit player" : "Add new player"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<PlayerModel> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="countryId" label="Country" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="secondName" label="Second name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="nickName" label="Nick name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="birthDate" label="Birth date" rules={[{ required: true }]}>
                <Input type='date'/>
              </Form.Item>
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

export default Players;
