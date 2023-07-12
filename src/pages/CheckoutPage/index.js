import { WrapperForm, WrapperInput, WrapperRadio, BuyWayRadio } from './styles';
import classNames from 'classnames/bind';
import style from './CheckoutPage.module.scss';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { FaMoneyBill } from 'react-icons/fa';
import { AiFillBackward } from 'react-icons/ai';

import { useMemo } from 'react';
import { convertPrice } from '~/ultil';
import Button from '~/components/Button';
import { useMutationHooks } from '~/hooks/useMutationHook';
import * as OrderService from '~/service/OrderSevice';
import Loading from '~/components/LoadingComponent';
import * as messages from '~/components/Message';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '~/redux/slides/orderSlide';
const cx = classNames.bind(style);
function CheckoutPage() {
    const order = useSelector((state) => state?.order);
    const [delivery, setDelivery] = useState('good');
    const [payment, setPayment] = useState('later_money');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    });
    const handleOnChangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetail);
    }, [form, stateUserDetail]);

    useEffect(() => {
        setStateUserDetail({
            city: user?.city,
            name: user?.name,
            address: user?.address,
            phone: user?.phone,
        });
    }, [user]);
    const diliveryPriceMemo = useMemo(() => {
        if (delivery === 'good') {
            return 21000;
        } else if (delivery === 'fast') {
            return 31000;
        }
    }, [delivery]);
    const priceMemo = useMemo(() => {
        const totalPrice = order?.orderItemSelected?.reduce((total, curr) => {
            return total + Math.trunc(curr.price - (curr.price * curr.discount) / 100) * curr.amount;
        }, 0);
        return totalPrice;
    }, [order]);

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(diliveryPriceMemo);
    }, [priceMemo, diliveryPriceMemo]);
    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rest } = data;
        const res = OrderService.createOrder({ ...rest }, token);
        return res;
    });
    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemSelected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
            });
        }
    };

    const { isLoading, isSuccess, isError, data } = mutationAddOrder;
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            const arrayOrder = [];
            order?.orderItemSelected.forEach((element) => {
                arrayOrder.push(element.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrder }));
            messages.success('Mua hàng thành công');
            navigate('/ordersuccess', {
                state: {
                    delivery,
                    payment,
                    order: order?.orderItemSelected,
                },
            });
        } else if (isError && data?.status === 'ERR') {
            messages.error('Mua hàng thất bại');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);

    const handleDilivery = (e) => {
        setDelivery(e.target.value);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };
    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('info')}>
                    <div className={cx('title')}>Địa chỉ giao hàng</div>
                    <WrapperForm name="basic" labelCol={{ span: 3 }} wrapperCol={{ span: 8 }} initialValues={{ remember: true }} autoComplete="off" form={form}>
                        <WrapperForm.Item label="Họ và tên người nhận" name="name" rules={[{ required: true, message: 'Thông tin này không thể để trống!' }]}>
                            <WrapperInput placeholder="Nhập họ và tên người nhận" value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name" />
                        </WrapperForm.Item>
                        <WrapperForm.Item label="Địa chỉ " name="address" rules={[{ required: true, message: 'Thông tin này không thể để trống!' }]}>
                            <WrapperInput placeholder="Nhập địa chỉ người nhận" value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address" />
                        </WrapperForm.Item>
                        <WrapperForm.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Thông tin này không thể để trống!' }]}>
                            <WrapperInput placeholder="Nhập số điện thoại người nhận" value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone" />
                        </WrapperForm.Item>
                        <WrapperForm.Item label="Địa chỉ nhận" name="city" rules={[{ required: true, message: 'Thông tin này không thể để trống!' }]}>
                            <WrapperInput placeholder="Nhập địa chỉ nhận" value={stateUserDetail.city} onChange={handleOnChangeDetail} name="city" />
                        </WrapperForm.Item>
                    </WrapperForm>
                </div>

                <div className={cx('delivery')}>
                    <div className={cx('delivery-title')}>Phương Thức giao hàng</div>
                    <Radio.Group onChange={handleDilivery} value={delivery}>
                        <div className={cx('delivery-way')}>
                            <WrapperRadio value="good">Giao Hàng Tiêu Chuẩn : 21.000đ </WrapperRadio>
                            <WrapperRadio value="fast">Giao Hàng Nhanh : 31.000đ</WrapperRadio>
                        </div>
                    </Radio.Group>
                </div>

                <div className={cx('method-buy')}>
                    <div className={cx('method-title')}>Phương thức thanh Toán</div>
                    <Radio.Group onChange={handlePayment} value={payment}>
                        <div className={cx('method-way')}>
                            <BuyWayRadio value="later_money">
                                <div className={cx('method-text')}>
                                    <FaMoneyBill className={cx('buy-icon')} /> <span>Thanh toán tiền mặt khi nhận hàng</span>
                                </div>
                            </BuyWayRadio>
                        </div>
                    </Radio.Group>
                </div>
                <div className={cx('buy')}>
                    <div className={cx('buy-inner')}>
                        <div className={cx('total-name')}>
                            <div className={cx('total-title')}>Thành tiền : </div>
                            <div className={cx('total-tt')}> {convertPrice(priceMemo)}</div>
                        </div>
                        <div className={cx('total-sum')}>
                            <div className={cx('sum-title')}>Phí vận chuyển : </div>
                            <div className={cx('sum-vat')}> {convertPrice(diliveryPriceMemo)}</div>
                        </div>
                        <div className={cx('into-sum')}>
                            <div className={cx('into-title')}>Tổng Số Tiền (gồm VAT) : </div>
                            <div className={cx('into-money')}> {convertPrice(totalPriceMemo)}</div>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <span className={cx('option-back')}>
                            <AiFillBackward className={cx('back-icon')} />
                            Quay về giỏ hàng
                        </span>
                        <Button login className={cx('btn-buy')} onClick={() => handleAddOrder()}>
                            Xác Nhận Thanh Toán
                        </Button>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default CheckoutPage;