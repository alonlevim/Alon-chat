import React from 'react';
import image_1 from '../../assets/1.jpg';
import image_2 from '../../assets/2.jpg';
import image_3 from '../../assets/3.jpg';

import classes from './Conversions.module.css';

const conversions = (props) => {
    return <div className={classes.Conversions}>
        <div className={[classes.Item, classes.Online].join(" ")}>
            <div className={classes.Image} style={{backgroundImage: `url(${image_1})`}}></div>
            <div className={classes.Details}>
                <div className={classes.TopDetails}>
                    <h3 className={classes.Name}>Alon Levi</h3>
                    <p className={classes.Time}>9:30 PM</p>
                </div>
                <p className={classes.ShortConversions}>Lorem Ipsum is simply
dummy text of the printing.</p>
            </div>
        </div>

        <div className={classes.Item}>
            <div className={classes.Image} style={{backgroundImage: `url(${image_2})`}}></div>
            <div className={classes.Details}>
                <div className={classes.TopDetails}>
                    <h3 className={classes.Name}>Cristina Artz</h3>
                    <p className={classes.Time}>9:30 PM</p>
                </div>
                <p className={classes.ShortConversions}>Lorem Ipsum is simply
dummy text of the printing.</p>
            </div>
        </div>

        <div className={[classes.Item, classes.Active].join(" ")}>
            <div className={classes.Image} style={{backgroundImage: `url(${image_3})`}}></div>
            <div className={classes.Details}>
                <div className={classes.TopDetails}>
                    <h3 className={classes.Name}>Cristina Artz</h3>
                    <p className={classes.Time}>9:30 PM</p>
                </div>
                <p className={classes.ShortConversions}>Lorem Ipsum is simply
dummy text of the printing.</p>
            </div>
        </div>

    </div>
};

export default conversions;