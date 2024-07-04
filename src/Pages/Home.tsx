import React from 'react';
import { GameItemList } from '../Components/Page/Home';

import { Row, Col } from 'antd'
import { News } from '../Components/Page/News';



function Home() {

    return (
        <div style={{ paddingTop: "1em", height: "Auto" }}>
            <Row>
                <Col xs={24} md={{ span: 16, offset: 4 }}>
                    <GameItemList />

                    <News/>
                </Col>
            </Row>

        </div>
    )
}

export default Home;