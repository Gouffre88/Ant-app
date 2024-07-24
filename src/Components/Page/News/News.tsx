import React from 'react';
import { Table, TableProps } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { MainLoader, TopicHeader } from '../Common';
import { newsItemModel } from '../../../Interfaces';
import { useGetNewsQuery } from '../../../Api/newsItemsApi';

const News: React.FC = () => {
    const { data, isLoading } = useGetNewsQuery(null);

    if (isLoading) {
        return <MainLoader />;
    }

    const dataSource: newsItemModel[] = data || [];
    const tabledata = data.map((item: newsItemModel) => ({ ...item, key: item.id }));
    const sourcesList = [...new Set(dataSource.map((item: newsItemModel) => item.source))];
    const gameList = [...new Set(dataSource.map((item: newsItemModel) => item.game))];

    const sourceFilters = sourcesList.map((source) => ({ text: source as React.ReactNode, value: source as string }));
    const gameFilters = gameList.map((game) => ({ text: game as React.ReactNode, value: game as string }));

    const columns: ColumnProps<newsItemModel>[] = [
        {
            title: 'Дата',
            dataIndex: 'dataInfo',
            key: 'dataInfo',
            sorter: (a: newsItemModel, b: newsItemModel) => new Date(a.dataInfo).getTime() - new Date(b.dataInfo).getTime(),
        },
        {
            title: 'Игра',
            dataIndex: 'game',
            key: 'game',
            filters: gameFilters,
            onFilter: (value, record: newsItemModel) => {
                if (typeof value === 'string') {
                    return record.game.includes(value);
                }
                return false;
            },
        },
        {
            title: 'Заголовок',
            dataIndex: 'titleInfo',
            key: 'titleInfo',
        },
        {
            title: 'Описание',
            dataIndex: 'textInfo',
            key: 'textInfo',
        },
        {
            title: 'Источник',
            dataIndex: 'source',
            key: 'source',
            showSorterTooltip: { title: 'Источник сортировка' },
            filters: sourceFilters,
            onFilter: (value, record) => record.source.indexOf(value as string) === 0,
        },
    ];

    const onChange: TableProps<newsItemModel>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <TopicHeader pageTitle="Новости в мире киберспорта" />
            <Table<newsItemModel>
                dataSource={tabledata}
                columns={columns}
                onChange={onChange}
                pagination={{ pageSize: 5 }}
                showSorterTooltip={{ title: 'Sorter Tooltips' }}
            />
        </>
    );
}

export default News;
