import { AiOutlineSearch, AiFillCaretDown, AiOutlineHeart } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { BsBell, BsCart2, BsFileText } from 'react-icons/bs';
import { CiUser, CiLogout } from 'react-icons/ci';
import { HiUserCircle, HiOutlineTicket } from 'react-icons/hi';
import { TbSquareLetterF } from 'react-icons/tb';

import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchResult from './SearchResult';
import Bell from '~/components/Popper/Bell';
import User from '~/components/Popper/User';

const cx = classNames.bind(styles);

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
        to: '/logout',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        });
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logo} alt="Fahasa" />
                </Link>
                <div className={cx('menu')}>
                    <CgMenuGridO />
                    <AiFillCaretDown className={cx('menu-down')} />
                </div>
                <Tippy
                    placement="bottom"
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Sản phẩm liên quan</h4>
                                <SearchResult />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm sản phẩm mong muốn ..." />
                        <button className={cx('search-btn')}>
                            <AiOutlineSearch />
                        </button>
                    </div>
                </Tippy>

                <div className={cx('action')}>
                    <Bell>
                        <div className={cx('bell')}>
                            <button className={cx('btn-bell')}>
                                <BsBell />
                            </button>
                            <span className={cx('text-bell')}>Thông Báo</span>
                        </div>
                    </Bell>

                    <Link to="/cart" className={cx('cart')}>
                        <button className={cx('btn-cart')}>
                            <BsCart2 />
                        </button>
                        <span className={cx('text-cart')}>Giỏ Hàng</span>
                    </Link>

                    <User items={MENU_ITEMS}>
                        <div className={cx('user')}>
                            <button className={cx('btn-user')}>
                                <CiUser />
                            </button>
                            <span className={cx('text-user')}>Tài Khoản</span>
                        </div>
                    </User>
                </div>
            </div>
        </header>
    );
}

export default Header;
