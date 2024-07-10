import React from "react";
import { gameItemModel, userModel } from "../../../Interfaces";
import { Link } from "react-router-dom";


import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { Card } from "antd";




 //   src={props.gameItem.image}

 interface Props {
    gameItem: gameItemModel;
  }
  
  const { Meta } = Card;
  
  function GameItemCard(props: Props) {
    const userData: userModel = useSelector(
      (state: RootState) => state.userAuthStore
    );
  
    return (
      <div>
        <Link
          to={`/menuItemDetails/${props.gameItem.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card
            hoverable
            style={{ width: 200 }}
            cover={
              <img
                alt="example"
                src={props.gameItem.imageId ? `http://asutp-web-001:7152/api/storage/${props.gameItem.imageId}`
                : require("../../../Assets/Images/nocontent.png")}
               // style={{ borderRadius: '50%' }}
  
              />
            }
          >
            <Meta
              title={
                <div style={{ textAlign: 'center' , color: 'lightgreen' }}>
                  {props.gameItem.titleGame}
                </div>
              }
              description={
                <div style={{ textAlign: 'center' }}>
                  {props.gameItem.description}
                </div>
              }
            />
          </Card>
        </Link>
      </div>
    );
  }
  
  export default GameItemCard;
