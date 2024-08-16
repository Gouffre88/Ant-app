import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  useGetCountriesQuery, 
  useDeleteCountryMutation,
  useCreateCountryMutation,
  useUpdateCountryMutation
} from '../../Api/CountryItemApi';
import CountriesModel from '../../Interfaces/CountriesModel';
import { MainLoader } from '../../Components/Page/Common';
import { useDispatch } from 'react-redux';
import { setCountry } from '../../Storage/Redux/countrySlice';
import ImageUploader from '../../Components/Page/Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';


const { Option } = Select;

const Countries: React.FC = () => {
  const [form] = Form.useForm<CountriesModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<CountriesModel | null>(null);

  const dispatch = useDispatch();
  const [deleteCountry] = useDeleteCountryMutation();
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const { data, isLoading, refetch } = useGetCountriesQuery(null);

// for img
 /* const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };*/
  //

  const handleCountryDelete = async (id: string) => {
    toast.promise(
      deleteCountry(id),
      {
        pending: 'Processing your request...',
        success: 'Country has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: CountriesModel | null = null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);   
  };

  const onFinish = async (values: CountriesModel) => {
    try {
      if (editingItem) {
        await updateCountry({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Country updated successfully');    
      } else {
        await createCountry(values).unwrap();
        toastNotify('Country created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setCountry(updatedData.data));  
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
      dataIndex: 'titleCountry',
      key: 'titleCountry',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: CountriesModel) => (
        <>
        <ButtonGroup aria-label="Basic example">
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleCountryDelete(record.id)} />
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
            <h1 className="text-success">List of Countries</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Country
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit country" : "Add new country"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<CountriesModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleCountry" label="Country" rules={[{ required: true }]}>
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

export default Countries;
