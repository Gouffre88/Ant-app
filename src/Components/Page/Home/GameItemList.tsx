import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Dropdown, Menu, Col, Row, Carousel, Spin } from 'antd';

import { gameItemModel } from '../../../Interfaces';
import { useGetGameItemsQuery } from '../../../Api/gameItemApi';
import { setGameItem } from '../../../Storage/Redux/gameItemSlice';
import GameItemCard from './GameItemCard';
import GameItemCarousel from './GameItemsCarousel';
import { MainLoader } from '../Common';


const GameItemList = () => {
  const [gameItems, setGameItems] = useState<gameItemModel[]>([]);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetGameItemsQuery(null);


  /* useEffect(() => {
     if (!isLoading) {
       dispatch(setGameItem(data.result));
       setGameItems(data.result);
     }
   }, [isLoading]);*/


  useEffect(() => {
    if (!isLoading && data) {
      setGameItems(data.$values);
    }
  }, [isLoading, data]);


  if (isLoading) {
    return <MainLoader/>;
    }

  return (
    <div>
    
      { <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px' }}>
        {gameItems.map((gameItem: gameItemModel, index: number) => (
          <div key={index}>
            <GameItemCard gameItem={gameItem} />
          </div>
        ))}
      </div> }
      <div>
         <GameItemCarousel gameItem={gameItems} />
      </div>
    </div>
  );
};

export default GameItemList;
