import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { Col, Row, Image, Rate } from 'antd';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai';
import { GrFormNext } from 'react-icons/gr';

import * as ProductService from '~/service/ProductService';

import { InputNumber } from 'antd';
import Button from '../Button';
import { useQuery } from 'react-query';
import Loading from '../LoadingComponent';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ProductDetail({ idProduct }) {
    const [numProduct, setNumProduct] = useState(1);

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1);
        } else {
            if (numProduct <= 1) {
                setNumProduct(1);
            } else {
                setNumProduct(numProduct - 1);
            }
        }
        console.log('type', type);
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailProduct(id);
            return res.data;
        }
    };
    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, {
        enabled: !!idProduct,
    });
    return (
        <Loading isLoading={isLoading}>
            <div className={cx('title')}>
                Trang chủ <GrFormNext />
                <span className={cx('title-type')}>{productDetails?.type}</span>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('product')}>
                    <div className={'list-img'}>
                        <Row>
                            <Image.PreviewGroup
                                preview={{
                                    onChange: (current, prev) =>
                                        console.log(`current index: ${current}, prev index: ${prev}`),
                                }}
                            >
                                <Col span={4} className={cx('img-small')}>
                                    <Image
                                        height={80}
                                        width={70}
                                        src={productDetails?.image}
                                        alt=""
                                        className={cx('img-product')}
                                    />
                                </Col>
                                <Col span={10}>
                                    <Image width={400} src={productDetails?.image} alt="" className={cx('')} />
                                </Col>
                            </Image.PreviewGroup>
                        </Row>
                    </div>

                    <div className={cx('product-info')}>
                        <span className={cx('name-product')}>{productDetails?.name}</span>
                        <div className={cx('product-right')}>
                            <div className={cx('company')}>
                                <span className={cx('company-home')}>
                                    Nhà cung cấp:<span className={cx('company-home-text')}> Nhà Xuất Bản Kim Đồng</span>
                                </span>
                                <span className={cx('company-name')}>
                                    Nhà xuất bản:<span className={cx('do-author-text')}> Kim Đồng</span>
                                </span>
                            </div>
                            <div className={cx('do')}>
                                <span className={cx('do-author')}>
                                    Tác giả:
                                    <span className={cx('do-author-text')}> {productDetails?.author}</span>
                                </span>
                                <span className={cx('do-type')}>
                                    Hình thức: <span className={cx('do-author-text')}>Bìa Mềm</span>
                                </span>
                            </div>
                        </div>
                        <div className={cx('star')}>
                            <Rate disabled value={productDetails?.rating} allowHalf />
                        </div>
                        <div className={cx('price')}>
                            <div className={cx('price-sale')}>{productDetails?.pricesale.toLocaleString()}</div>
                            <div className={cx('price-current')}>{productDetails?.price.toLocaleString()} </div>
                            <span className={cx('sale')}>-{productDetails?.discount}%</span>
                        </div>
                        <div className={cx('delivery')}>
                            <div className={cx('time-delivery')}> Thời gian giao hàng</div>
                            <div className={cx('delivery-info')}>
                                <div className={cx('place-delivery')}>
                                    Giao hàng đến: <span className={cx('place-delivery-text')}> Từ sơn - Bắc Ninh</span>
                                    <span className={cx('place-delivery-change')}> Thay đổi</span>
                                </div>
                                <div className={cx('expected-delivery')}>
                                    Dự kiến giao:<span className={cx('place-delivery-text')}> Thứ 2 - 30/7</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('amount')}>
                            <span className={cx('amount-text')}>Số lượng</span>
                            <div className={cx('amount-so')}>
                                <AiOutlineMinus
                                    className={cx('btn-less')}
                                    onClick={() => handleChangeCount('decrease')}
                                />
                                <InputNumber
                                    min={1}
                                    className={cx('input-amount')}
                                    onChange={onChange}
                                    defaultValue={numProduct}
                                    value={numProduct}
                                />
                                <AiOutlinePlus
                                    className={cx('btn-more')}
                                    onClick={() => handleChangeCount('increase')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('btn-buy')}>
                    <Button
                        className={cx('btn-buy-cart')}
                        register
                        leftIcon={<AiOutlineShoppingCart className={cx('btn-icon-cart')} />}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                    <Button className={cx('btn-buy-cart')} login>
                        Mua ngay
                    </Button>
                </div>
            </div>
        </Loading>
    );
}

export default ProductDetail;
