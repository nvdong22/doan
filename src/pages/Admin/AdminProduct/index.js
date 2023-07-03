import { Button as But } from 'antd/es/radio';
import { IoMdAddCircleOutline } from 'react-icons/io';
import classNames from 'classnames/bind';
import TableComponent from '../TableComponent';
import { Modal, Upload, Button as BTN, Form, Input, Space } from 'antd';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';

import Button from '~/components/Button';
import { getBase64 } from '~/ultil';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as ProductService from '~/service/ProductService';
import * as messages from '~/components/Message';
import style from './AdminProduct.module.scss';
import DrawerComponent from '../DrawerComponent';
import { useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent';
import ModalComponent from '../ModalComponent';
import Highlighter from 'react-highlight-words';

const cx = classNames.bind(style);
function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        image: '',
        type: '',
        author: '',
        sold: '',
        price: '',
        pricesale: '',
        countInStock: '',
        rating: '',
        chapter: '',
        description: '',
        discount: '',
    });

    //thêm dữ liệu vào Product bằng react query
    const mutation = useMutationHooks((data) => {
        const {
            name,
            image,
            type,
            author,
            sold,
            price,
            pricesale,
            countInStock,
            rating,
            chapter,
            description,
            discount,
        } = data;
        const res = ProductService.createProduct({
            name,
            image,
            type,
            author,
            sold,
            price,
            pricesale,
            countInStock,
            rating,
            chapter,
            description,
            discount,
        });
        return res;
    });
    //
    const { data, isSuccess, isError } = mutation;

    //get All product ra table
    const getAllProduct = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };
    const queryProduct = useQuery(['products'], getAllProduct);
    const { isLoading: isLoadingProduct, data: products } = queryProduct;
    const renderAction = () => {
        return (
            <div>
                <AiOutlineDelete style={{ fontSize: '30px' }} onClick={() => setIsModalOpenDelete(true)} />
                <AiOutlineEdit style={{ fontSize: '30px' }} onClick={handleDetailProduct} />
            </div>
        );
    };

    const dataTable =
        products?.data?.length &&
        products?.data?.map((product) => {
            return { ...product, key: product._id };
        });

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            messages.success('thêm thành công');
            handleCancel();
        } else if (isError && data?.status === 'ERR') {
            messages.error('thêm thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            image: '',
            type: '',
            author: '',
            sold: '',
            price: '',
            pricesale: '',
            countInStock: '',
            rating: '',
            chapter: '',
            description: '',
            discount: '',
        });
    };
    const handleOnfinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
        handleCancel();
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    //Update

    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        image: '',
        type: '',
        author: '',
        sold: '',
        price: '',
        pricesale: '',
        countInStock: '',
        rating: '',
        chapter: '',
        description: '',
        discount: '',
    });
    const handleOnChangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview,
        });
    };
    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected);
        if (res?.data) {
            setStateProductDetail({
                name: res?.data?.name,
                image: res?.data?.image,
                type: res?.data?.type,
                author: res?.data?.author,
                sold: res?.data?.sold,
                price: res?.data?.price,
                pricesale: res?.data?.pricesale,
                countInStock: res?.data?.countInStock,
                rating: res?.data?.rating,
                chapter: res?.data?.chapter,
                description: res?.data?.description,
                discount: res?.data?.discount,
            });
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, { ...rests });
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
            fetchGetDetailProduct(rowSelected);
        }
        setStateProductDetail({
            name: '',
            image: '',
            type: '',
            author: '',
            sold: '',
            price: '',
            pricesale: '',
            countInStock: '',
            rating: '',
            chapter: '',
            description: '',
            discount: '',
        });
    }, [rowSelected]);

    const handleDetailProduct = () => {
        if (rowSelected) {
            setIsOpenDrawer(true);
        }
    };
    //
    const handleOnUpdate = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetail },
            {
                onSettled: () => {
                    queryProduct.refetch();
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
        const res = ProductService.deleteProduct(id, token);
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
    const handleDeleteProduct = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
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
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>=150',
                    value: '>=',
                },
                {
                    text: '<=150',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 150;
                } else if (value === '<=') {
                    return record.price <= 150;
                }
            },
            filterSearch: true,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            sorter: (a, b) => a.author.length - b.author.length,
            ...getColumnSearchProps('author'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.author.length - b.author.length,
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    };
    //Delete Many
    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = ProductService.deleteManyProduct(ids, token);
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
    const handleDeleteManyProduct = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div>Quản lý người dùng</div>
            <But className={cx('btn-add')} onClick={() => setIsModalOpen(true)}>
                <IoMdAddCircleOutline className={cx('icon-add')} />
            </But>
            <div>
                <Loading isLoading={isLoading}>
                    <TableComponent
                        handleDeleteMany={handleDeleteManyProduct}
                        columns={columns}
                        dataSource={dataTable}
                        isLoading={isLoadingProduct}
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
            <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null} width="80%">
                <form method="post" action="">
                    <div className={cx('form-group')}>
                        <label htmlFor="name" className={cx('form-label')}>
                            Name
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nhập tên sách"
                                className={cx('form-control')}
                                id="name"
                                name="name"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="type" className={cx('form-label')}>
                            Type
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.type}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nhập Type"
                                className={cx('form-control')}
                                id="type"
                                name="type"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="author" className={cx('form-label')}>
                            author
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.author}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nhập tác giả"
                                className={cx('form-control')}
                                id="author"
                                name="author"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="sold" className={cx('form-label')}>
                            sold
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.sold}
                                onChange={handleOnChange}
                                name="sold"
                                type="number"
                                placeholder="Nhập đã bán"
                                className={cx('form-control')}
                                id="sold"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="price" className={cx('form-label')}>
                            price
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
                                type="number"
                                placeholder="Nhập giá"
                                className={cx('form-control')}
                                id="price"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="pricesale" className={cx('form-label')}>
                            pricesale
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.pricesale}
                                onChange={handleOnChange}
                                name="pricesale"
                                type="number"
                                placeholder="Nhập giá giảm"
                                className={cx('form-control')}
                                id="pricesale"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="countInStock" className={cx('form-label')}>
                            countInStock
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name="countInStock"
                                type="number"
                                placeholder="Nhập số lượng tồn"
                                className={cx('form-control')}
                                id="countInStock"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="rating" className={cx('form-label')}>
                            rating
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name="rating"
                                type="number"
                                placeholder="Nhập rating"
                                className={cx('form-control')}
                                id="rating"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="chapter" className={cx('form-label')}>
                            chapter
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.chapter}
                                onChange={handleOnChange}
                                name="chapter"
                                type="text"
                                placeholder="Nhập số tập"
                                className={cx('form-control')}
                                id="chapter"
                            />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="discount" className={cx('form-label')}>
                            discount
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.discount}
                                onChange={handleOnChange}
                                name="discount"
                                type="text"
                                placeholder="Nhập phần trăm giảm"
                                className={cx('form-control')}
                                id="discount"
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="description" className={cx('form-label')}>
                            description
                        </label>
                        <div className={cx('form-input')}>
                            <input
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
                                type="text"
                                placeholder="Nhập giới thiệu"
                                className={cx('form-control')}
                                id="description"
                            />
                        </div>
                    </div>
                    <div className={cx('form-input-avatar')}>
                        <Upload
                            onChange={handleOnChangeAvatar}
                            className={cx('ant-upload-list-item.ant-upload-list-item-error')}
                            maxCount={1}
                        >
                            <BTN>Select File</BTN>
                        </Upload>
                        {stateProduct?.image && (
                            <img src={stateProduct?.image} className={cx('input-avatar')} alt="avatar" />
                        )}
                    </div>
                </form>
                <Button login className={cx('btn-save')} onClick={handleOnfinish}>
                    Lưu
                </Button>
            </Modal>
            <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={handleCloseDrawer} width="80%">
                <Loading isLoading={isLoading}>
                    <form method="" action="" form={form}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name" className={cx('form-label')}>
                                Name
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.name}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập tên sách"
                                    className={cx('form-control')}
                                    id="name"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="type" className={cx('form-label')}>
                                Type
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.type}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập Type"
                                    className={cx('form-control')}
                                    id="type"
                                    name="type"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="author" className={cx('form-label')}>
                                author
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.author}
                                    onChange={handleOnChangeDetail}
                                    type="text"
                                    placeholder="Nhập tác giả"
                                    className={cx('form-control')}
                                    id="author"
                                    name="author"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="sold" className={cx('form-label')}>
                                sold
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.sold}
                                    onChange={handleOnChangeDetail}
                                    name="sold"
                                    type="number"
                                    placeholder="Nhập đã bán"
                                    className={cx('form-control')}
                                    id="sold"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="price" className={cx('form-label')}>
                                price
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.price}
                                    onChange={handleOnChangeDetail}
                                    name="price"
                                    type="number"
                                    placeholder="Nhập giá"
                                    className={cx('form-control')}
                                    id="price"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="pricesale" className={cx('form-label')}>
                                pricesale
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.pricesale}
                                    onChange={handleOnChangeDetail}
                                    name="pricesale"
                                    type="number"
                                    placeholder="Nhập giá giảm"
                                    className={cx('form-control')}
                                    id="pricesale"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="countInStock" className={cx('form-label')}>
                                countInStock
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.countInStock}
                                    onChange={handleOnChangeDetail}
                                    name="countInStock"
                                    type="number"
                                    placeholder="Nhập số lượng tồn"
                                    className={cx('form-control')}
                                    id="countInStock"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="rating" className={cx('form-label')}>
                                rating
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.rating}
                                    onChange={handleOnChangeDetail}
                                    name="rating"
                                    type="number"
                                    placeholder="Nhập rating"
                                    className={cx('form-control')}
                                    id="rating"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="chapter" className={cx('form-label')}>
                                chapter
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.chapter}
                                    onChange={handleOnChangeDetail}
                                    name="chapter"
                                    type="text"
                                    placeholder="Nhập số tập"
                                    className={cx('form-control')}
                                    id="chapter"
                                />
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="discount" className={cx('form-label')}>
                                discount
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.discount}
                                    onChange={handleOnChangeDetail}
                                    name="discount"
                                    type="text"
                                    placeholder="Nhập phần trăm giảm"
                                    className={cx('form-control')}
                                    id="discount"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="description" className={cx('form-label')}>
                                description
                            </label>
                            <div className={cx('form-input')}>
                                <input
                                    value={stateProductDetail.description}
                                    onChange={handleOnChangeDetail}
                                    name="description"
                                    type="text"
                                    placeholder="Nhập giới thiệu"
                                    className={cx('form-control')}
                                    id="description"
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
                            {stateProductDetail?.image && (
                                <img src={stateProductDetail?.image} className={cx('input-avatar')} alt="avatar" />
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
                onOk={handleDeleteProduct}
            >
                <div>Bạn có chắc xóa sản phẩm này không</div>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct;
