import { AiOutlineHeart } from 'react-icons/ai';
import { BsFileText } from 'react-icons/bs';
import { CiUser, CiLogout } from 'react-icons/ci';
import { HiUserCircle, HiOutlineTicket } from 'react-icons/hi';
import { TbSquareLetterF } from 'react-icons/tb';

import classNames from 'classnames/bind';
import styles from './UserTip.module.scss';
import User from '~/components/Popper/User';
import * as UserService from '~/service/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/slides/userSlide';

const cx = classNames.bind(styles);

function UserTip() {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const MENU_ITEMS = [
        {
            icon: <HiUserCircle />,
            title: 'Thành viên Fahasa',
            to: '/profile',
        },
        {
            icon: <BsFileText />,
            title: 'Đơn hàng của tôi',
            to: '/order',
        },
        {
            icon: <AiOutlineHeart />,
            title: 'Sản phẩm yêu thích',
            to: '/love',
        },
        {
            icon: <HiOutlineTicket />,
            title: 'Wallet Voucher',
            to: '/voucher',
        },
        {
            icon: <TbSquareLetterF />,
            title: 'Tài Khoản F-point',
            to: '/point',
        },
        {
            icon: <CiLogout />,
            title: 'Thoát tài khoản',
            onClick: async function () {
                await UserService.logOutUser();
                dispatch(resetUser());
            },
            to: '',
        },
    ];

    return (
        <User items={MENU_ITEMS}>
            <div className={cx('user')}>
                <button className={cx('btn-user')}>
                    <CiUser />
                </button>
                <span className={cx('text-user')}>
                    {user?.name ? <span>{user.name}</span> : <span>Tài Khoản</span>}
                </span>
            </div>
        </User>
    );
}

export default UserTip;
