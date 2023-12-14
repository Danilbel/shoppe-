import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeGoods, plusCounter, minusCounter } from '../jewelryCatalog/JewelryCatalogSlice';

import CartItem from './cartItem/CartItem';
import './cart.scss';

const Cart = () => {
    const { orderedGoods } = useSelector((state) => state.goods);
    const dispatch = useDispatch();

    useEffect(() => {}, [orderedGoods]);

    const onRemove = (id) => {
        dispatch(removeGoods(id));
    };

    const onPlus = (id) => {
        dispatch(plusCounter(id));
    };

    const onMinus = (id) => {
        dispatch(minusCounter(id));
    };

    const renderCartCatalog = (orderedGoods) => {
        const cartCatalog = orderedGoods.map(({ id, name, price, info:{material}, imagePath, counter }, i) => {
            return (
                <CartItem
                    key={id}
                    id={id}
                    name={name}
                    price={price}
                    material={material}
                    imagePath={imagePath[0]}
                    counter={counter}
                    onRemove={() => onRemove(id)}
                    onPlus={() => onPlus(id)}
                    onMinus={() => onMinus(id)}
                />
            );
        });
        return <>{cartCatalog}</>;
    };

    let totalPrice = 0;
    orderedGoods.forEach((item) => {
        totalPrice += item.price * item.counter;
    });

    const content =
        orderedGoods.length === 0 ? (
            <div className='empty__cart-wrapper'>
                <div className='empty__cart cart__info-main-title'>Your cart is empty</div>
                <Link to='/shop' className='empty__cart-link'>
                    TO SHOP
                </Link>
            </div>
        ) : (
            renderCartCatalog(orderedGoods)
        );

    return (
        <div className='cart'>
            <div className='container'>
                <div className='cart__title'>Shopping Cart</div>
                <div className='cart__wrapper'>
                    <div className='cart__items'>{content}</div>
                    <div className='cart__info'>
                        <div className='cart__info-main-title'>Cart totals</div>
                        <div className='cart__info-wrapper'>
                            <div className='cart__info-subtotal'>SUBTOTAL</div>
                            <div className='cart__info-descr'>$ {totalPrice}</div>
                        </div>
                        <div className='cart__info-wrapper'>
                            <div className='cart__info-title'>SHIPPING</div>
                            <div className='cart__info-descr'>
                                {orderedGoods.length > 0
                                    ? 'Free Shipping'
                                    : 'Shipping costs will be calculated once you have added new item'}
                            </div>
                        </div>
                        <div className='cart__line'></div>
                        <div className='cart__total-wrapper'>
                            <div className='cart__total'>TOTAl</div>
                            <div className='cart__total'>$ {totalPrice}</div>
                        </div>
                        {orderedGoods.length > 0 ? (
                            <Link to='/cart/checkout'>
                                <button className='btn-cheackout'>PROCEED TO CHECKOUT</button>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
