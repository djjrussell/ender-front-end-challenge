import React from 'react';

export const PropertyCard = (props) => {

    const {
        data,
        callBack
    } = props;

    const convertToNum = (dollarString) => {
        let temp = dollarString.split('.00')[0];
        temp = temp.replace(/\D/g, '');
        return parseInt(temp);
    }

    return (
        <section className='propertyCard' onClick={() => callBack(data.id)}>
            <article className='propertyName'>
                {data.name}
            </article>
            <hr/>
            <article className='topCardContainer'>
                <div className='propertyAddress'>
                    <div>{data.address1}</div>
                    <div>{data.address2}</div>
                </div>
                <div className='propertyBaseRent float-right'>
                    <div>{data.baseRent}</div>
                </div>
            </article>
            <article className='bottomCardContainer'>
                <span className='footerInfo float-left'>{data.sqft} sqft</span>
                <span
                    className='footerInfo'>${((convertToNum(data.baseRent) / 12) / data.sqft).toFixed(2)} sqft/mo</span>
                <span
                    className='footerInfo float-right'>${(convertToNum(data.baseRent) / data.sqft).toFixed(2)} sqft/yr</span>
            </article>
        </section>
    )
}

export default PropertyCard;