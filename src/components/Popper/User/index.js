import { FaFacebookF } from 'react-icons/fa';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './User.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import UserItem from './UserItem';

const cx = classNames.bind(styles);

const currentUser = true;

function User({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <UserItem key={index} data={item} />);
    };

    return (
        <div>
            <Tippy
                delay={[0, 700]}
                placement="bottom-end"
                interactive
                render={(attrs) => (
                    <div className={cx('list-users')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {currentUser ? (
                                renderItems()
                            ) : (
                                <div className={cx('user-items')}>
                                    <Button login className={cx('loggin')}>
                                        Đăng nhập
                                    </Button>
                                    <Button register>Đăng ký</Button>
                                    <Button facebook className={cx('icon-fa')}>
                                        <FaFacebookF />
                                        Đăng nhập bằng facebook
                                    </Button>
                                </div>
                            )}
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default User;
