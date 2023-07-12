import classNames from 'classnames/bind';
import style from './DetailOrder.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import * as OrderService from '~/service/OrderSevice';
import { useQuery } from 'react-query';
import { orderContant } from '~/contant';
import Loading from '~/components/LoadingComponent';
import { convertPrice } from '~/ultil';

const cx = classNames.bind(style);
function DetailOrder() {
    const params = useParams();
    const location = useLocation();
    const { state } = location;
    const { id } = params;
    const fetchMyOrderDetail = async () => {
        const res = await OrderService.getDetailOrder(id, state?.token);
        return res.data;
    };
    const queryOrder = useQuery(
        { queryKey: ['orders-detail'], queryFn: fetchMyOrderDetail },
        {
            enabled: id,
        },
    );
    const { data, isLoading } = queryOrder;
    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('Title')}>Chi Tiết đơn hàng</div>
                <div className={cx('info')}>
                    <div className={cx('info-name')}>{data?.shippingAddress?.fullName}</div>
                    <div className={cx('info-place')}>
                        Địa Chỉ :{' '}
                        <span className={cx('info-place-text')}>
                            {data?.shippingAddress?.address} - {data?.shippingAddress?.city}
                        </span>
                    </div>
                    <div className={cx('info-phone')}>
                        Điện Thoại : <span className={cx('info-phone-num')}> {data?.shippingAddress?.phone}</span>
                    </div>
                </div>
                <div className={cx('delivery')}>
                    <span className={cx('delivery-way')}>Hình Thức Giao Hàng : </span>
                    <span className={cx('delivery-name')}>Giao Hàng Tiêu Chuẩn</span>
                    <span className={cx('delivery-price')}>
                        Phí Giao Hàng : <span> {convertPrice(data?.shippingPrice)}</span>
                    </span>
                </div>
                <div className={cx('pay')}>
                    <div className={cx('pay-title')}>Hình Thức Thanh Toán :</div>
                    <div className={cx('pay-way')}>{orderContant.payment[data?.paymentMethod]}</div>
                    <div className={cx('pay-was')}>{`${data?.isPaid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}`}</div>
                </div>
                {data?.orderItems?.map((item) => {
                    const pricesale = item?.price - (item?.price * item?.discount) / 100;
                    return (
                        <div key={item?._id}>
                            <div className={cx('product')}>
                                <img src={item?.image} alt="" />
                                <span className={cx('product-name')}>{item?.name}</span>
                                <span className={cx('product-price')}>{convertPrice(pricesale)}</span>
                                <span className={cx('product-price-old')}>{convertPrice(item?.price)}</span>
                            </div>
                            <div className={cx('product-info')}>
                                <div className={cx('product-info-discount')}>{item?.discount}</div>
                                <div className={cx('product-info-price')}>{convertPrice(pricesale)}</div>
                                <div className={cx('product-info-amount')}>{item?.amount}</div>
                            </div>
                        </div>
                    );
                })}
                <div className={cx('product-info-delivery')}>{convertPrice(data?.shippingPrice)}</div>
                <div className={cx('product-info-total')}>{convertPrice(data?.totalPrice)}</div>
            </div>
        </Loading>
    );
}

export default DetailOrder;
