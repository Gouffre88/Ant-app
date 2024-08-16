import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetTournamentMeetTeamQuery, 
  useDeleteTournamentMeetTeamMutation,
  useCreateTournamentMeetTeamMutation,
  useUpdateTournamentMeetTeamMutation
} from '../../Api/tournamentmeetteamApi';
import TournamentMeetModel from '../../Interfaces/TournamentMeetModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setTournamentMeetTeam } from '../../Storage/Redux/tournamentmeetteamSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const TournamentMeetTeam: React.FC = () => {
  const [form] = Form.useForm<TournamentMeetModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TournamentMeetModel | null>(null);

  const dispatch = useDispatch();
  const [deleteTournamentMeetTeam] = useDeleteTournamentMeetTeamMutation();
  const [createTournamentMeetTeam] = useCreateTournamentMeetTeamMutation();
  const [updateTournamentMeetTeam] = useUpdateTournamentMeetTeamMutation();
  const { data, isLoading, refetch } = useGetTournamentMeetTeamQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleTournamentMeetTeamDelete = async (id: string) => {
    toast.promise(
      deleteTournamentMeetTeam(id),
      {
        pending: 'Processing your request...',
        success: 'Tournament Meet Team has been deleted Successfully 👌',
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
        await updateTournamentMeetTeam({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Tournament Meet Team updated successfully');    
      } else {
        await createTournamentMeetTeam(values).unwrap();
        toastNotify('Tournament Meet Team created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTournamentMeetTeam(updatedData.data));
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
      title: 'Tournament meet id',
      dataIndex: 'tournamentMeetId',
      key: 'tournamentMeetId',
    },
    {
      title: 'Team id',
      dataIndex: 'teamId',
      key: 'teamId',
    },
    {
        title: 'Score team',
        dataIndex: 'scoreTeam',
        key: 'scoreTeam',
      },
      {
        title: 'Earnd team',
        dataIndex: 'earndTeam',
        key: 'earndTeam',
      },
      {
        title: 'Rating team',
        dataIndex: 'ratingTeam',
        key: 'ratingTeam',
      },
      {
        title: 'Win',
        dataIndex: 'win',
        key: 'win',
      },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TournamentMeetModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTournamentMeetTeamDelete(record.id)} />
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
            <h1 className="text-success">List of tournament meet team</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add new tournament meet team
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit tournament meet team" : "Add new tournament meet team"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<TournamentMeetModel> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="tournamentMeetId" label="Tournament meet id" rules={[{ required: true }]}>  
              <Input />              
              </Form.Item>
              <Form.Item name="teamId" label="Team id" rules={[{ required: true }]}>  
              <Input />              
              </Form.Item>
              <Form.Item name="scoreTeam" label="Score team" rules={[{ required: true }]}>  
              <Input />              
              </Form.Item>
              <Form.Item name="earndTeam" label="Earnd team" rules={[{ required: true }]}>  
              <Input />              
              </Form.Item>
              <Form.Item name="ratingTeam" label="Rating team" rules={[{ required: true }]}>  
              <Input />              
              </Form.Item>
              <Form.Item name="win" label="Win" rules={[{ required: true }]}>  
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

export default TournamentMeetTeam;
