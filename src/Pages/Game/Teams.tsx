import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetTeamQuery, 
  useDeleteTeamMutation,
  useCreateTeamMutation,
  useUpdateTeamMutation
} from '../../Api/TeamItemApi';
import TeamModel from '../../Interfaces/TeamModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setTeam } from '../../Storage/Redux/TeamSlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const Teams: React.FC = () => {
  const [form] = Form.useForm<TeamModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<TeamModel | null>(null);

  const dispatch = useDispatch();
  const [deleteTeam] = useDeleteTeamMutation();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { data, isLoading, refetch } = useGetTeamQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleTeamDelete = async (id: string) => {
    toast.promise(
      deleteTeam(id),
      {
        pending: 'Processing your request...',
        success: 'Team has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: TeamModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: TeamModel) => {
    try {
      if (editingItem) {
        await updateTeam({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Team updated successfully');    
      } else {
        await createTeam(values).unwrap();
        toastNotify('Team created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTeam(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred',"error");
    }
  };

  const columns = [
    /*{
      title: 'Image',
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) => 
      <Image src=
          { imageId ? `https://localhost:7152/api/storage/${imageId}` : require("../../Assets/Images/nocontent.png")} 
          alt="no content" 
          style={{ width: '100%', maxWidth: '120px' }} />,
    },*/
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Team',
      dataIndex: 'titleTeam',
      key: 'titleTeam',
    },
    {
      title: 'Founded',
      dataIndex: 'founded',
      key: 'founded',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TeamModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTeamDelete(record.id)} />
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
            <h1 className="text-success">List of team</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add team
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit team" : "Add new team"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<TeamModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleTeam" label="Team" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="founded" label="Founded" rules={[{ required: true }]}>
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

export default Teams;
