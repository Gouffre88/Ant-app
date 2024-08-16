import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetTournamentMeetQuery, 
  useDeleteTournamentMeetMutation,
  useCreateTournamentMeetMutation,
  useUpdateTournamentMeetMutation
} from '../../Api/tournamentmeetApi';
import TournamentMeetModel from '../../Interfaces/TournamentMeetModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setTournamentMeet } from '../../Storage/Redux/tournamentmeetSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const TournamentMeet: React.FC = () => {
  const [form] = Form.useForm<TournamentMeetModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TournamentMeetModel | null>(null);

  const dispatch = useDispatch();
  const [deleteTournamentMeet] = useDeleteTournamentMeetMutation();
  const [createTournamentMeet] = useCreateTournamentMeetMutation();
  const [updateTournamentMeet] = useUpdateTournamentMeetMutation();
  const { data, isLoading, refetch } = useGetTournamentMeetQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleTournamentMeetDelete = async (id: string) => {
    toast.promise(
      deleteTournamentMeet(id),
      {
        pending: 'Processing your request...',
        success: 'Tournament Meet has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: TournamentMeetModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: TournamentMeetModel) => {
    try {
      if (editingItem) {
        await updateTournamentMeet({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Tournament Meet updated successfully');    
      } else {
        await createTournamentMeet(values).unwrap();
        toastNotify('Tournament Meet created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTournamentMeet(updatedData.data));
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
      title: 'Tournament id',
      dataIndex: 'tournamentId',
      key: 'tournamentId',
    },
    {
      title: 'Date tournament meet',
      dataIndex: 'dataTournamentMeet',
      key: 'dataTournamentMeet',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TournamentMeetModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTournamentMeetDelete(record.id)} />
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
            <h1 className="text-success">List of tournament meet</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add new tournament meet
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit tournament meet" : "Add new tournament meet"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<TournamentMeetModel> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="tournamentId" label="Tournament id" rules={[{ required: true }]}>  
              <Input/>              
              </Form.Item>
              <Form.Item name="dataTournamentMeet" label="Date tournament meet" rules={[{ required: true }]}>  
              <Input type='date' />              
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

export default TournamentMeet;
