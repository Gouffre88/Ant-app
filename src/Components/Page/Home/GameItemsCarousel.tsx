import React from "react";
import { gameItemModel, userModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { Carousel } from "antd";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

interface Props {
  gameItem: gameItemModel[];
}

function GameItemCarousel(props: Props) {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "300px",
    color: "#fff",
    lineHeight: "300px",
    textAlign: "left",
    background: "transparent",
    padding: "20px",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
  };

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.6,
  };

  const textStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel
     /* arrows
      infinite={false}*/
      afterChange={onChange}
      autoplay
    >
      {props.gameItem.map((gameItem: gameItemModel, index: number) => (
        <div key={index}>
          <Link
            to={`/menuItemDetails/${gameItem.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={contentStyle}>
              <img
                alt={gameItem.titleGame}
                src={
                  gameItem.imageId
                    ? `http://asutp-web-001:7152/api/storage/${gameItem.imageId}`
                    : require("../../../Assets/Images/nocontent.png")
                }
                style={imageStyle}
              />
              <div style={textStyle}>
                <Title level={1} style={{ fontSize: "5em", color: "lightgreen" }}>
                  {gameItem.titleGame}
                </Title>
                <Paragraph>{gameItem.description}</Paragraph>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}

export default GameItemCarousel;