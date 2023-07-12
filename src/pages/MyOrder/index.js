import { useQuery } from 'react-query';
// import { useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent';
import * as OrderService from '~/service/OrderSevice';
import classNames from 'classnames/bind';
import style from './MyOrder.module.scss';
import Button from '~/components/Button';
import { convertPrice } from '~/ultil';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
function MyOrder() {
    // const user = useSelector((state) => state?.user);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const fetchMyOrder = async () => {
        const res = await OrderService.getDetailOrderUser(state?.id, state?.token);
        return res.data;
    };
    const queryOrder = useQuery(
        { queryKey: ['orders'], queryFn: fetchMyOrder },
        {
            enabled: state?.id && state?.token,
        },
    );
    const { data, isLoading } = queryOrder;

    const renderProduct = (list) => {
        return list?.map((item) => {
            const pricesale = Math.trunc(item?.price - (item?.price * item?.discount) / 100);
            return (
                <div className={cx('product')} key={item?.product}>
                    <img className={cx('img')} src={item?.image} alt="" />
                    <div className={cx('info')}>
                        <div className={cx('name')}>{item?.name}</div>
                        <div className={cx('option-price')}>
                            <span className={cx('price')}>{convertPrice(pricesale)}</span>
                            <span className={cx('price-old')}>{convertPrice(item?.price)}</span>
                        </div>
                    </div>
                </div>
            );
        });
    };
    const handleDetailsOrder = (id) => {
        navigate(`/detail_Order/${id}`, {
            state: {
                token: state?.token,
            },
        });
    };
    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                {data?.map((order) => {
                    return (
                        <div className={cx('inner')} key={order?._id}>
                            <div className={cx('order')}>
                                <div className={cx('order-way')}>
                                    <div className={cx('order-option-title')}>TRẠNG THÁI SẢN PHẨM</div>
                                    <div className={cx('order-delivery')}>
                                        Giao Hàng : <span className={cx('order-delivery-text')}>{`${order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                                    </div>
                                    <div className={cx('order-pay')}>
                                        Thanh Toán : <span className={cx('order-pay-text')}>{`${order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                                    </div>
                                </div>
                                {renderProduct(order?.orderItems)}
                                <div className={cx('total')}>
                                    Tổng tiền : <span className={cx('total-num')}>{convertPrice(order?.totalPrice)}</span>
                                </div>
                            </div>
                            <div className={cx('order-option')}>
                                <Button register className={cx('btn-huy')}>
                                    Hủy Đơn Hàng
                                </Button>
                                <Button login className={cx('btn-detail')} onClick={() => handleDetailsOrder(order?._id)}>
                                    Xem Chi Tiết
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Loading>
    );
}

export default MyOrder;
