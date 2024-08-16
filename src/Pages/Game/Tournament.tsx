import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetTournamentQuery, 
  useDeleteTournamentMutation,
  useCreateTournamentMutation,
  useUpdateTournamentMutation
} from '../../Api/TournamentApi';
import TournamentModel from '../../Interfaces/TournamentModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setTournament } from '../../Storage/Redux/TournamentSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const Tournament: React.FC = () => {
  const [form] = Form.useForm<TournamentModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TournamentModel | null>(null);

  const dispatch = useDispatch();
  const [deleteTournament] = useDeleteTournamentMutation();
  const [createTournament] = useCreateTournamentMutation();
  const [updateTournament] = useUpdateTournamentMutation();
  const { data, isLoading, refetch } = useGetTournamentQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleTournamentDelete = async (id: string) => {
    toast.promise(
      deleteTournament(id),
      {
        pending: 'Processing your request...',
        success: 'Tournament has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: TournamentModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: TournamentModel) => {
    try {
      if (editingItem) {
        await updateTournament({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Tournament updated successfully');    
      } else {
        await createTournament(values).unwrap();
        toastNotify('Tournament created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTournament(updatedData.data));
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
      title: 'Game items id',
      dataIndex: 'gameTypeId',
      key: 'gameTypeId',
    },
    {
      title: 'Title tournament',
      dataIndex: 'titleTournament',
      key: 'titleTournament',
    },
    {
      title: 'Type tournament',
      dataIndex: 'typeTournament',
      key: 'typeTournament',
    },
    {
      title: 'Date init',
      dataIndex: 'dataTournamentInit',
      key: 'dataTournamentInit',
    },
    {
      title: 'Date end',
      dataIndex: 'dataTournamentEnd',
      key: 'dataTournamentEnd',
    },
    {
      title: 'Place name',
      dataIndex: 'placeName',
      key: 'placeName',
    },
    {
      title: 'Earnd tournament',
      dataIndex: 'earndTournament',
      key: 'earndTournament',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TournamentModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTournamentDelete(record.id)} />
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
            <h1 className="text-success">List of Tournament</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add new tournament
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit tournament" : "Add new tournament"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<TournamentModel> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="gameTypeId" label="Game items id" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="titleTournament" label="Title tournament" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="typeTournament" label="Type tournament" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="dataTournamentInit" label="Date init" rules={[{ required: true }]}>  
              <Input type='date' />              
              </Form.Item>
              <Form.Item name="dataTournamentEnd" label="Date end" rules={[{ required: true }]}>  
              <Input type='date' />              
              </Form.Item>
              <Form.Item name="placeName" label="Place name">  
              <Input />              
              </Form.Item>
              <Form.Item name="earndTournament" label="Earnd tournament">
                <Input />
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

export default Tournament;
