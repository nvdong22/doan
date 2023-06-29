import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { BsBell, BsCart2 } from 'react-icons/bs';

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
import UserTip from './UserTip';

const cx = classNames.bind(styles);

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

                    <UserTip />
                </div>
            </div>
        </header>
    );
}

export default Header;
