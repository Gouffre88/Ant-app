import React, { useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetTeamPlayerQuery, 
  useDeleteTeamPlayerMutation,
  useCreateTeamPlayerMutation,
  useUpdateTeamPlayerMutation
} from '../../Api/TeamPlayerApi';
import TeamPlayerModel from '../../Interfaces/TeamPlayerModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setTeamPlayer } from '../../Storage/Redux/teamplayerSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const TeamPlayer: React.FC = () => {
  const [form] = Form.useForm<TeamPlayerModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TeamPlayerModel | null>(null);

  const dispatch = useDispatch();
  const [deleteTeamPlayer] = useDeleteTeamPlayerMutation();
  const [createTeamPlayer] = useCreateTeamPlayerMutation();
  const [updateTeamPlayer] = useUpdateTeamPlayerMutation();
  const { data, isLoading, refetch } = useGetTeamPlayerQuery(null);

// for img
  /*const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleTeamPlayerDelete = async (id: string) => {
    toast.promise(
      deleteTeamPlayer(id),
      {
        pending: 'Processing your request...',
        success: 'Team Player has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: TeamPlayerModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: TeamPlayerModel) => {
    try {
      if (editingItem) {
        await updateTeamPlayer({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Team Player updated successfully');    
      } else {
        await createTeamPlayer(values).unwrap();
        toastNotify('Team Player created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTeamPlayer(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred',"error");
    }
  };

  const columns: ColumnProps<TeamPlayerModel>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Team Id',
        dataIndex: 'teamId',
        key: 'teamId',
      },
    {
      title: 'Player Id',
      dataIndex: 'playerId',
      key: 'playerId',
    },
    {
      title: 'Year 1',
      dataIndex: 'year1',
      key: 'year1',
    },
    {
      title: 'Year 2',
      dataIndex: 'year2',
      key: 'year2',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TeamPlayerModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTeamPlayerDelete(record.id)} />
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
            <h1 className="text-success">List of TeamPlayers</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add TeamPlayer
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit TeamPlayer" : "Add new TeamPlayer"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<TeamPlayerModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="teamId" label="Team" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="playerId" label="Player" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="year1" label="Year 1" rules={[{ required: true }]}>
                <Input />
              </Form.Item>   
              <Form.Item name="year2" label="Year 2" rules={[{ required: true }]}>
                <Input />
              </Form.Item>             
                <Button type="primary" htmlType="submit">
                  {editingItem ? "Update" : "Create"}
                </Button>
            </Form>
          </Modal>   
        </div>
      )}
    </>
  );
};

export default TeamPlayer;
