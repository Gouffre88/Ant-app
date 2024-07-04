import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Table, Button, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetGameItemsQuery, useDeleteGameItemMutation } from '../../Api/gameItemApi';
import { gameItemModel } from '../../Interfaces';
import { MainLoader } from '../../Components/Page/Common';

const GameItems = () => {
  const [deleteGameItem] = useDeleteGameItemMutation();
  const { data, isLoading } = useGetGameItemsQuery(null);
  const navigate = useNavigate();

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

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <Image src= {image || "https://localhost:7152/api/storage/668696a8bb7fabae698e2a15"} alt="no content" style={{ width: '100%', maxWidth: '120px' }} />,
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
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/gameitemupsert/${record.id}`)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleGameItemDelete(record.id)} />
        </>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <MainLoader/>
      ) : (
        <div className="p-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of Games</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/gameitemupsert')}>
              Add New Game
            </Button>
          </div>
          <Table dataSource={data?.$values} columns={columns} rowKey="id" />
        </div>
      )}
    </>
  );
};

export default GameItems;
