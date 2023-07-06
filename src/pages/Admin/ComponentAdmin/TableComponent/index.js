import { Dropdown, Space, Table } from 'antd';
import style from './TableComponent.module.scss';
import classNames from 'classnames/bind';
import Loading from '~/components/LoadingComponent';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
<<<<<<< HEAD
// import { Excel } from 'antd-table-saveas-excel';
// import { useMemo } from 'react';
const cx = classNames.bind(style);
function TableComponent(props) {
    const { selectionType = 'checkbox', data, columns = [], isLoading = false, handleDeleteMany } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);
    // const newColumnExport = useMemo(() => {
    //     const arr = columns.filter((col) => col.dataIndex !== 'action');
    //     return arr;
    // }, [columns]);
=======

const cx = classNames.bind(style);
function TableComponent(props) {
    const { selectionType = 'checkbox', data, columns = [], isLoading = false } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);
>>>>>>> 9651f902113b1480aaf130625a9911ab6c135e3a
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setRowSelectedKey(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
<<<<<<< HEAD
    const hanleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey);
    };

    // const exportExcel = () => {
    //     const excel = new Excel();
    //     excel
    //         .addSheet('test')
    //         .addColumns(newColumnExport)
    //         .addDataSource(data, {
    //             str2Percent: true,
    //         })
    //         .saveAs('Excel.xlsx');
    // };

=======
    const hanleDeleteAll = () => {};
>>>>>>> 9651f902113b1480aaf130625a9911ab6c135e3a
    const items = [
        {
            label: <div onClick={hanleDeleteAll}>Xóa tất cả</div>,
            key: '0',
        },
        {
            label: <div>2nd menu item</div>,
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
        <div>
            <Loading isLoading={isLoading}>
                {rowSelectedKey.length > 0 && (
                    <div className={cx('dropdown')}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <span onClick={(e) => e.preventDefault()} className={cx('option')}>
                                <Space>
                                    Chọn hành động
                                    <DownOutlined />
                                </Space>
                            </span>
                        </Dropdown>
                    </div>
                )}
<<<<<<< HEAD
                {/* <button onClick={exportExcel}>export Excel</button> */}
=======

>>>>>>> 9651f902113b1480aaf130625a9911ab6c135e3a
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
            </Loading>
        </div>
    );
}

export default TableComponent;
