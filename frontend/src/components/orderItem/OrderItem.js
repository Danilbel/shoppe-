import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchSelectedOrder } from '../userAccount/UserAccountSlice';

import './orderItem.scss';
import Spinner from '../spinner/Spinner';

const OrderItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orders, selectedOrder } = useSelector((state) => state.userAccount);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [id]);

    useEffect(() => {
        const selectedOrder = orders.find((order) => order.id == id);
        dispatch(fetchSelectedOrder(selectedOrder));
    }, [orders]);

    const renderOrderItem = (selectedOrder) => {
        if (Object.keys(selectedOrder).length == 0) return <Spinner />;

        const {
            details: {
                date,
                paymentMethod,
                deliveryOptions,
                deliveryAddress: { fullName, contactsItem, localAddress, regionAddress, country }
            },
            summary: { goods, subTotal, shippingCost, totalPrice }
        } = selectedOrder;

        return (
            <div className='order__wrapper'>
                <div className='order__details'>
                    <h2 className='order__title'>Order Details</h2>
                    <div className='order__details-info'>
                        <div className='order__details-half'>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Order number</span>
                                <span className='order__details-value'>{id}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Payment method</span>
                                <span className='order__details-value'>{paymentMethod}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Order date</span>
                                <span className='order__details-value'>{date}</span>
                            </div>
                        </div>
                        <div className='order__details-half'>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Delivery options</span>
                                <span className='order__details-value'>{deliveryOptions}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Delivery address</span>
                                <div>
                                    <span className='order__details-value'>{fullName}</span>
                                    <span className='order__details-value'>{contactsItem}</span>
                                    <span className='order__details-value'>{localAddress}</span>
                                    <span className='order__details-value'>{regionAddress}</span>
                                    <span className='order__details-value'>{country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='order__summary'>
                    <h2 className='order__title'>Order Summary</h2>
                    <div className='order__summary-wrapper'>
                        <div className='order__summary-header-wrapper'>
                            <span className='order__summary-header'>Product</span>
                            <span className='order__summary-header'>Total</span>
                        </div>
                        {goods.map(({ name, total, quantity }) => (
                            <div className='order__summary-item-wrapper' key={name}>
                                <span className='order__summary-item-name'>
                                    {name} <span className='order__item-quantity'>× {quantity}</span>
                                </span>
                                <span className='order__summary-item-price'>$ {total}</span>
                            </div>
                        ))}

                        <div className='order__summary_calcul'>
                            <span className='order__summary-calcul-name'>Subtotal</span>
                            <span className='order__summary-item-price'>$ {subTotal}</span>
                        </div>
                        <div className='order__summary_calcul'>
                            <span className='order__summary-calcul-name'>Shipping</span>
                            <span className='order__summary-item-price'>
                                {shippingCost === 0 ? 'Free shipping' : shippingCost}
                            </span>
                        </div>
                        <div className='order__summary_footer-wrapper'>
                            <span className='order__summary-footer'>Total</span>
                            <span className='order__summary-footer'>{totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const orderItem = renderOrderItem(selectedOrder);

    return (
        <div className='order'>
            <div className='container'>{orderItem}</div>
        </div>
    );
};

export default OrderItem;
