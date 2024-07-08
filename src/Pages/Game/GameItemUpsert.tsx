import React, { useEffect, useState } from "react";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { useCreateGameItemMutation, useGetGameItemByIdQuery, useUpdateGameItemMutation } from "../../Api/gameItemApi";

const gameItemData = {
  titleGame: "",
  description: "",
  category: "",            // жанр игры
};

function GameItemUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [gameItemInputs, setGameItemInputs] = useState(gameItemData);
  const [loading, setLoading] = useState(false);
  const [createGameItem] = useCreateGameItemMutation();
  const [updateGameItem] = useUpdateGameItemMutation();
  const { data } = useGetGameItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        titleGame: data.result.titleGame,
        description: data.result.description,
        category: data.result.category,
      };
      setGameItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleGameItemInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGameItemInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    
     }

    const formData = new FormData();

    formData.append("Name", gameItemInputs.titleGame);
    formData.append("Description", gameItemInputs.description);
    formData.append("Category", gameItemInputs.category);

    if (imageToDisplay) formData.append("File", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateGameItem({ data: formData, id });
      toastNotify("Game updated successfully", "success");
    } else {
      //create
      response = await createGameItem(formData);
      toastNotify("Game created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/gameitems");
    }

    setLoading(false);

  };

  return (
    <div className="container  mt-5 p-5 ">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Game" : "Add Game"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter game name"
              required
              name="titleGame"
              value={gameItemInputs.titleGame}
              onChange={handleGameItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter description"
              name="description"
              rows={10}
              value={gameItemInputs.description}
              onChange={handleGameItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter game category"
              name="category"
              value={gameItemInputs.category}
              onChange={handleGameItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/gameItems")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Game Items
                </a>
              </div>
            </div>
          </div>
          <div className="border col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default GameItemUpsert;

// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Upload, message, Row, Col, Typography, Spin } from 'antd';
// import { toastNotify } from "../../Helper";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCreateGameItemMutation, useGetGameItemByIdQuery, useUpdateGameItemMutation } from "../../Api/gameItemApi";
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadChangeParam } from 'antd/es/upload';
// import type { UploadFile } from 'antd/es/upload/interface';

// const gameItemData = {
//   titleGame: "",
//   description: "",
//   category: "", // жанр игры
// };

// const { TextArea } = Input;
// const { Title } = Typography;

// function GameItemUpsert() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [imageToStore, setImageToStore] = useState<File | null>(null);
//   const [imageToDisplay, setImageToDisplay] = useState<string>("");
//   const [gameItemInputs, setGameItemInputs] = useState(gameItemData);
//   const [loading, setLoading] = useState(false);
//   const [createGameItem] = useCreateGameItemMutation();
//   const [updateGameItem] = useUpdateGameItemMutation();
//   const { data } = useGetGameItemByIdQuery(id);

//   useEffect(() => {
//     if (data && data.result) {
//       const tempData = {
//         titleGame: data.result.titleGame,
//         description: data.result.description,
//         category: data.result.category,
//       };
//       setGameItemInputs(tempData);
//       setImageToDisplay(data.result.image);
//     }
//   }, [data]);

//   const handleGameItemInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setGameItemInputs((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
//     const file = info.file.originFileObj as File;
//     if (!file) {
//       console.error('No file found in the upload info.');
//       return;
//     }

//     const imgType = file.type.split("/")[1];
//     const validImgTypes = ["jpeg", "jpg", "png"];

//     if (file.size > 1000 * 1024) {
//       setImageToStore(null);
//       toastNotify("File must be less than 1 MB", "error");
//       return;
//     } else if (!validImgTypes.includes(imgType)) {
//       setImageToStore(null);
//       toastNotify("File must be in jpeg, jpg or png format", "error");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const imgUrl = e.target?.result as string;
//       setImageToDisplay(imgUrl);
//     };
//     reader.readAsDataURL(file);
//     setImageToStore(file);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     if (!imageToStore && !id) {
//       toastNotify("Please upload an image", "error");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Name", gameItemInputs.titleGame);
//     formData.append("Description", gameItemInputs.description);
//     formData.append("Category", gameItemInputs.category);

//     if (imageToStore) formData.append("File", imageToStore);

//     let response;

//     if (id) {
//       //update
//       formData.append("Id", id);
//       response = await updateGameItem({ data: formData, id });
//       toastNotify("Game updated successfully", "success");
//     } else {
//       //create
//       response = await createGameItem(formData);
//       toastNotify("Game created successfully", "success");
//     }

//     if (response) {
//       setLoading(false);
//       navigate("/gameitems");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5 p-5">
//       {loading && <Spin />}
//       <Title level={3} className="px-2 text-success">
//         {id ? "Edit Game" : "Add Game"}
//       </Title>
//       <Form
//         layout="vertical"
//         onFinish={handleSubmit}
//       >
//         <Row gutter={16} className="mt-3">
//           <Col md={14}>
//             <Form.Item
//               label="Game Name"
//               name="titleGame"
//               rules={[{ required: true, message: 'Please enter game name' }]}
//             >
//               <Input 
//                 placeholder="Enter game name" 
//                 value={gameItemInputs.titleGame}
//                 onChange={handleGameItemInput}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[{ required: true, message: 'Please enter description' }]}
//             >
//               <TextArea
//                 placeholder="Enter description"
//                 rows={4}
//                 value={gameItemInputs.description}
//                 onChange={handleGameItemInput}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Category"
//               name="category"
//               rules={[{ required: true, message: 'Please enter game category' }]}
//             >
//               <Input 
//                 placeholder="Enter game category"
//                 value={gameItemInputs.category}
//                 onChange={handleGameItemInput}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Upload Image"
//             >
//               <Upload
//                 beforeUpload={() => false}
//                 onChange={handleFileChange}
//                 showUploadList={false}
//               >
//                 <Button icon={<UploadOutlined />}>Select File</Button>
//               </Upload>
//             </Form.Item>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item>
//                   <Button 
//                     type="primary" 
//                     htmlType="submit" 
//                     className="form-control mt-3"
//                   >
//                     {id ? "Update" : "Create"}
//                   </Button>
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   type="default" 
//                   className="form-control mt-3"
//                   onClick={() => navigate("/gameItems")}
//                 >
//                   Back to Game Items
//                 </Button>
//               </Col>
//             </Row>
//           </Col>
//           <Col md={10} className="text-center">
//             <img
//               src={imageToDisplay}
//               style={{ width: "100%", borderRadius: "30px" }}
//               alt="Game Item"
//             />
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// }

// export default GameItemUpsert;




