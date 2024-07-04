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