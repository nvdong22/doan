import classNames from 'classnames/bind';
import style from './AdminUser.module.scss';
import TableComponent from '../TableComponent';
import { Input, Space } from 'antd';
import { useState, useRef, useEffect } from 'react';
import Loading from '~/components/LoadingComponent';
import ModalComponent from '../ModalComponent';
import { Upload, Button as BTN } from 'antd';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as UserService from '~/service/UserService';
import { useQuery } from 'react-query';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import * as messages from '~/components/Message';
import { getBase64 } from '~/ultil';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent';
import Highlighter from 'react-highlight-words';
import Button from '~/components/Button';

const cx = classNames.bind(style);
function AdminUser() {
    //get All product ra table
    const getAllUsers = async () => {
        const res = await UserService.getAllUser();
        return res;
    };
    const queryUser = useQuery(['user'], getAllUsers);
    const { isLoading: isLoadingUser, data: users } = queryUser;
    const renderAction = () => {
        return (
            <div>
                <AiOutlineDelete style={{ fontSize: '30px' }} onClick={() => setIsModalOpenDelete(true)} />
                <AiOutlineEdit style={{ fontSize: '30px' }} onClick={handleDetailUser} />
            </div>
        );
    };

    const dataTable =
        users?.data?.length &&
        users?.data?.map((user) => {
            return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' };
        });

    //Update

    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        avatar: '',
        email: '',
        phone: '',
        address: '',
        isAdmin: false,
    });
    const handleOnChangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetail({
            ...stateUserDetail,
            avatar: file.preview,
        });
    };
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    };
    const fetchGetDetailUser = async (rowSelected) => {
        const res = await UserService.getDetailUser(rowSelected);
        if (res?.data) {
            setStateUserDetail({
                name: res?.data?.name,
                avatar: res?.data?.avatar,
                email: res?.data?.email,
                phone: res?.data?.phone,
                address: res?.data?.address,
                isAdmin: res?.data?.isAdmin,
            });
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated, isLoading } = mutationUpdate;

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            messages.success('sửa thành công');
            setIsOpenDrawer(false);
        } else if (isErrorUpdated && dataUpdated?.status === 'ERR') {
            messages.error('sửa thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessUpdated, isErrorUpdated]);

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailUser(rowSelected);
        }
        setStateUserDetail({
            name: '',
            avatar: '',
            email: '',
            phone: '',
            address: '',
            isAdmin: false,
        });
    }, [rowSelected]);

    const handleDetailUser = () => {
        if (rowSelected) {
            setIsOpenDrawer(true);
        }
    };
    //
    const handleOnUpdate = () => {
        mutationUpdate.mutate(
            { id: rowSelected, ...stateUserDetail, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    //Delete
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted;
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            messages.success('xóa thành công');
            setIsModalOpenDelete(false);
        } else if (isErrorDeleted && dataDeleted?.status === 'ERR') {
            messages.error('xóa thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessDeleted, isErrorDeleted]);
    const handleDeleteUser = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };
    //Search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <BTN
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </BTN>
                    <BTN
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </BTN>
                    <BTN
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </BTN>
                    <BTN
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </BTN>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#fff',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (text) => <span>{text}</span>,
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
        // {
        //     title: 'isAdmin',
        //     dataIndex: 'isAdmin',
        //     filters: [
        //         { text: 'True', value: true },
        //         { text: 'False', value: false },
        //     ],
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    //DeleteMany
    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = UserService.deleteManyUser(ids, token);
        return res;
    });
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany;
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            messages.success('xóa thành công');
        } else if (isErrorDeletedMany && dataDeletedMany?.status === 'ERR') {
            messages.error('xóa thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessDeletedMany, isErrorDeletedMany]);
    const handleDeleteManyUser = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div>Quản lý người dùng</div>

            <div>
                <Loading isLoading={isLoading}>
                    <TableComponent
                        handleDeleteMany={handleDeleteManyUser}
                        columns={columns}
                        dataSource={dataTable}
                        isLoading={isLoadingUser}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setRowSelected(record._id);
                                },
                            };
                        }}
                    />
                </Loading>
            </div>

            <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="80%">
                <Loading isLoading={isLoading}>
                    <form method="" action="">
                        <div className={cx('form-group')}>
                            <label htmlFor="name" className={cx('form-label')}>
                                Name
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateUserDetail.name}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập tên"
                                    className={cx('form-control')}
                                    id="name"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="email" className={cx('form-label')}>
                                email
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateUserDetail.email}
                                    onChange={handleOnChangeDetail}
                                    type="email"
                                    placeholder="Nhập email"
                                    className={cx('form-control')}
                                    id="email"
                                    name="email"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="phone" className={cx('form-label')}>
                                phone
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateUserDetail.phone}
                                    onChange={handleOnChangeDetail}
                                    type="number"
                                    placeholder="Nhập số điện thoại"
                                    className={cx('form-control')}
                                    id="phone"
                                    name="phone"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address" className={cx('form-label')}>
                                address
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateUserDetail.address}
                                    onChange={handleOnChangeDetail}
                                    name="address"
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    className={cx('form-control')}
                                    id="address"
                                />
                            </div>
                        </div>

                        <div className={cx('form-input-avatar')}>
                            <Upload
                                onChange={handleOnChangeAvatarDetail}
                                className={cx('ant-upload-list-item.ant-upload-list-item-error')}
                                maxCount={1}
                            >
                                <BTN>Select File</BTN>
                            </Upload>
                            {stateUserDetail?.avatar && (
                                <img src={stateUserDetail?.avatar} className={cx('input-avatar')} alt="avatar" />
                            )}
                        </div>
                    </form>
                    <Button login className={cx('btn-save')} onClick={handleOnUpdate}>
                        Update
                    </Button>
                </Loading>
            </DrawerComponent>

            <ModalComponent
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
            >
                <div>Bạn có chắc xóa User này không</div>
            </ModalComponent>
        </div>
    );
}

export default AdminUser;
