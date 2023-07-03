import { Dropdown, Space, Table } from 'antd';
import classNames from 'classnames/bind';
import style from './table.module.scss';

import { DownOutlined } from '@ant-design/icons';
import Loading from '~/components/LoadingComponent';
import { useState } from 'react';
const cx = classNames.bind(style);
function TableComponent(props) {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    const items = [
        {
            label: <span onClick={handleDeleteAll}>Xóa tất cả</span>,
            key: '0',
        },
        {
            label: <span>2nd menu item</span>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                {rowSelectedKeys.length > 0 && (
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <span className={cx('option')} onClick={(e) => e.preventDefault()}>
                            <Space>
                                Chọn phương thức
                                <DownOutlined />
                            </Space>
                        </span>
                    </Dropdown>
                )}

                <Table
                    className={cx('table')}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </div>
        </Loading>
    );
}

export default TableComponent;
