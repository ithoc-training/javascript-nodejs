import {call, feedOptions} from './client.js';

function post() {

    // given
    let options = feedOptions('POST');
    let data = {
        title: 'Jupiter+' + Math.random(),
        body: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun. Jupiter orbits the Sun at a distance of 5.20 AU (778.5 Gm) with an orbital period of 11.86 years. Jupiter is the third brightest natural object in the Earth\'s night sky after the Moon and Venus, and it has been observed since prehistoric times. It was named after Jupiter, the chief deity of ancient Roman religion.'
    };

    // when
    let returnStatus = call(options, data);

    // then
    if(returnStatus === 'success') {
        console.log('POST success');
    } else {
        console.log('POST failed');
    }

}

post();


