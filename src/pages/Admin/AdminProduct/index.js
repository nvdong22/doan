import { Button as But } from 'antd/es/radio';
import Button from '~/components/Button';
import { IoMdAddCircleOutline } from 'react-icons/io';
import classNames from 'classnames/bind';
import style from './AdminProduct.module.scss';
import TableComponent from '../TableComponent';
import { Modal, Upload, Button as BTN } from 'antd';

import { useState } from 'react';
import { getBase64 } from '~/ultil';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as ProductService from '~/service/ProductService';
import { useEffect } from 'react';
import * as messages from '~/components/Message';

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
    const { data, isSuccess, isError } = mutation;
    //

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
        mutation.mutate(stateProduct);
        handleCancel();
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
        console.log('onchange', e.target.name, e.target.value);
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
    return (
        <div className={cx('wrapper')}>
            <div>Quản lý người dùng</div>
            <But className={cx('btn-add')} onClick={() => setIsModalOpen(true)}>
                <IoMdAddCircleOutline className={cx('icon-add')} />
            </But>
            <div>
                <TableComponent />
            </div>
            <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
        </div>
    );
}

export default AdminProduct;
