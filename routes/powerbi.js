var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
    console.log(req.query);

   // res.json({embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=7f11e73a-82ad-425e-9fda-684ddcac44c0",
   //     token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsInR5cGUiOiJlbWJlZCIsIndjbiI6InRvYnktdGVzdCIsIndpZCI6ImRmNzA4MjUyLTAxNWItNGRhMS1iZGI4LThmYjFlMjk0NmJhZSIsInJpZCI6ImQ0YmRiM2E2LTBmODItNGFlZi05ZjE1LWVmZTk1ZTBiZWExZiIsImlzcyI6IlBvd2VyQklTREsiLCJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiZXhwIjoxNDg2MDEwMjM2LCJuYmYiOjE0ODYwMDY2MzZ9.WkzSTP1KF19g8lfgTdaUFzHM5soYUSL-jUfWcGgrI_s"});
    //res.json({embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=d4bdb3a6-0f82-4aef-9f15-efe95e0bea1f",
   //    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsInR5cGUiOiJlbWJlZCIsIndjbiI6InRvYnktdGVzdCIsIndpZCI6ImRmNzA4MjUyLTAxNWItNGRhMS1iZGI4LThmYjFlMjk0NmJhZSIsInJpZCI6ImQ0YmRiM2E2LTBmODItNGFlZi05ZjE1LWVmZTk1ZTBiZWExZiIsImlzcyI6IlBvd2VyQklTREsiLCJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiZXhwIjoxNDg2MDEwMDM4LCJuYmYiOjE0ODYwMDY0Mzh9.KIiPC5uWepkxzeEiyzuRt2d4xesvlK1Hqdd8bSCMFLU"});
    res.json({embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=10b7ec38-21e1-4136-95fa-d48f3a6c9758",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsInR5cGUiOiJlbWJlZCIsIndjbiI6InRvYnktdGVzdCIsIndpZCI6ImRmNzA4MjUyLTAxNWItNGRhMS1iZGI4LThmYjFlMjk0NmJhZSIsInJpZCI6IjEwYjdlYzM4LTIxZTEtNDEzNi05NWZhLWQ0OGYzYTZjOTc1OCIsImlzcyI6IlBvd2VyQklTREsiLCJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiZXhwIjoxNDg2MDEyOTcwLCJuYmYiOjE0ODYwMDkzNzB9.eAor-Sbs6h0kYvFo5D4xV4cPMlrm7bFJPBtCq7KepE4"});

});

module.exports = router;
