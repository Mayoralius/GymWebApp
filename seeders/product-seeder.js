var mongoose = require('mongoose');

var Product = require('../model/product');
var User = require('../model/user');
var Item = require('../model/item');
var Shopping_Cart = require('../model/shopping_cart');
var Order = require('../model/order');
var uri = 'mongodb://localhost/zzotech';
mongoose.Promise = global.Promise;

var products = [
    {
        name: 'Pack DJI FPV Experience',
        description: 'DJI has redefined the drone racing industry with the new Digital FPV System. It delivers lower latency rates within 28 ms, a 4km maximum transmission range, stunning HD 720p/120fps resolution, and, most importantly, an unforgettable FPV flying experience.',
        price: 999.99,
        src: '/images/fpv.png'
    },
    {
        name: 'Sony A7R IV',
        description: 'Virtuoso expression. Sony’s full-frame mirrorless α7R IV reveals ever more overwhelming photographic vision, with expressive prowess once expected only in medium-format cameras, and remarkably high speed in a compact body. See how its enhanced rigidity and connectivity raise your productivity.',
        price: 3999.99,
        src: '/images/a7.png'
    },
    {
        name: 'DJI Inspire 2 Cinema Premium',
        description: 'To meet the highest professional filmmaking standards, the Zenmuse X7 uses an S35 image sensor, offering 6K CinemaDNG RAW and a wide dynamic range of up to 14 stops. The X7 also introduces the DL-Mount, the world\'s first integrated aerial lens mount that allows for switching between four available prime lenses quickly and easily.',
        price: 24397,
        src: '/images/inspire2.png'
    },
    {
        name: 'Blackmagic Pocket',
        description: 'Blackmagic Pocket Cinema Camera is better than a simple video camera because it has professional features allowing you to create the same "look" as Hollywood feature films. The combination of high dynamic range, great low light performance and Blackmagic RAW gives you feature film images with precise skin tones and gorgeous organic colors.',
        price: 2999.99,
        src: '/images/blackmagic.png'
    },
    {
        name: 'Manfrotto 526 Cinema Tripod',
        description: 'The 526 Professional Fluid Video Head directly addresses the heavy-duty, high-end ENG and EFP video market by offering a feature-packed fluid video head that borrows all the combined benefits of our 500 series heads with the ability to support top weight loads over 15lbs.',
        price: 2264.99,
        src: '/images/manfrotto526.png'
    },
    {
        name: 'DJI Mavic 2',
        description: 'Co-engineered in partnership with Hasselblad after two years of tireless research, the Mavic 2 Pro comes equipped with the all-new Hasselblad L1D-20c camera. The L1D-20c possesses Hasselblad’s unique Hasselblad Natural Colour Solution (HNCS) technology, 5 helping users to capture gorgeous 20-megapixel aerial shots in stunning color detail.',
        price: 1499.99,
        src: '/images/mavic.png'
    },
    {
        name: 'Sony 135mm f/1.8 GM',
        description: 'Unsparing application of Sony\'s most advanced optical technologies has produced a large-aperture prime telephoto lens that delivers outstanding corner-to-corner resolution even at F1.8, plus exquisite bokeh that is a hallmark of the G Master series.',
        price: 1999.99,
        src: '/images/sony135.png'
    },
    {
        name: 'DJI Osmo Mobile 3',
        description: 'With a 3-axis gimbal that effectively reduces shaky footage, Osmo Mobile 3 delivers a super-smooth, stabilized image. A lightweight, ultra-responsive design reacts to your movements in real time, letting you focus more on the moment at hand.',
        price: 139.99,
        src: '/images/osmo.png'
    }
];

var db = mongoose.connection;
db.on('connecting', function() {
    console.log('Connecting to ', uri);
});
db.on('connected', function() {
    console.log('Connected to ', uri);
});
db.on('disconnecting', function() {
    console.log('Disconnecting from ', uri);
});
db.on('disconnected', function() {
    console.log('Disconnected from ', uri);
});
db.on('error', function(err) {
    console.error('Error ', err.message);
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(){
        var promises = [];
        products.forEach(product => promises.push(new Product (product).save()));

        return Promise.all(promises)
     })
    .then(function(){
        mongoose.disconnect();
    })
    .catch(function(err){
        console.error('Error', err.message);
    });
module.exports = mongoose.connection;

