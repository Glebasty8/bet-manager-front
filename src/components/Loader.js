import React, { Fragment } from 'react';

// Ball icons
import Tennis from '../../static/svg/tennis.svg';
import Baseball from '../../static/svg/baseball.svg';
import Basketball from '../../static/svg/basketball.svg';
import Football from '../../static/svg/football.svg';
import Volleyball from '../../static/svg/volleyball.svg';
import Rugby from '../../static/svg/rugby.svg';

export default function CircularIndeterminate() {

    const randomIndex = Math.floor(Math.random() * 7);
    const loaders = [Tennis, Baseball, Basketball, Football, Volleyball, Rugby];

    return (
        <Fragment>
            <img
                className="loader"
                src={loaders[randomIndex]}
                alt="Ball Loader"
            />
        </Fragment>
    );
}
