import React from 'react'
import { Table } from 'antd'
import { Row, Col } from 'antd'
import { PageHeader } from '../Components/Page/Common';
import { ColumnProps } from 'antd/lib/table';



const news = [
    { id: 1, title: 'Команда по киберспорту выигрывает международный турнир', game: 'CS-GO', date: '2024-06-01', source: 'ESPN' },
    { id: 2, title: 'Топовый игрок по киберспорту присоединяется к новой команде', game: 'CS-GO', date: '2024-06-02', source: 'IGN' },
    { id: 3, title: 'Лига по киберспорту объявляет новый сезон', game: 'CS-GO', date: '2024-06-03', source: 'BBC Sport' },
    { id: 4, title: 'Киберспортивная организация получает крупное спонсорство', game: 'LOL', date: '2024-06-04', source: 'The Verge' },
    { id: 5, title: 'Обзор финала чемпионата по киберспорту', game: 'CS-GO', date: '2024-06-05', source: 'Kotaku' },
    { id: 6, title: 'Новая игра по киберспорту набирает популярность', game: 'LOL', date: '2024-06-06', source: 'Polygon' },
    { id: 7, title: 'Игрок по киберспорту устанавливает мировой рекорд', game: 'CS-GO', date: '2024-06-07', source: 'GameSpot' },
    { id: 8, title: 'Киберспортивная команда расширяется в новый регион', game: 'LOL', date: '2024-06-08', source: 'PC Gamer' },
    { id: 9, title: 'Киберспортивное событие устанавливает рекорд по просмотрам', game: 'CS-GO', date: '2024-06-09', source: 'Eurogamer' },
    { id: 10, title: 'Игрок по киберспорту получает престижную награду', game: 'CS-GO', date: '2024-06-10', source: 'Forbes' },
];

interface NewsItem {
    id: number;
    title: string;
    game: string;
    date: string;
    source: string;
}


const sourcesList = [...new Set(news.map(item => item.source))];
const gameList = [...new Set(news.map(item => item.game))];


const columns: ColumnProps<NewsItem>[] = [
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        sorter: (a: NewsItem, b: NewsItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
        title: 'Игра',
        dataIndex: 'game',
        key: 'game',
        filters: gameList.map(game => ({ text: game, value: game })),
        onFilter: (value, record: NewsItem) => {
            if (typeof value === 'string') {
                return record.game.includes(value);
            } else {
                return false;
            }
        },
    },
    {
        title: 'Описание',
        dataIndex: 'title',
        key: 'title',
    },
    
    {
        title: 'Источник',
        dataIndex: 'source',
        key: 'source',
        filters: sourcesList.map(source => ({ text: source, value: source })),
        onFilter: (value, record: NewsItem) => {
            if (typeof value === 'string') {
                return record.source.includes(value);
            } else {
                return false;
            }
        },
    },
];

function News() {
    return (
        <>
            <PageHeader pageTitle="Новости в мире киберспорта" />
            <Row>
                <Col xs={24} md={{span: 16, offset: 4}}>
                    <Table<NewsItem>
                        dataSource={news}
                        columns={columns}
                    />
                </Col>
            </Row>
        </>
    )
}

export default News;
