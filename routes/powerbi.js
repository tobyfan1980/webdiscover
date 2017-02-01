var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
    console.log(req.query);

    //res.json({embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=7f11e73a-82ad-425e-9fda-684ddcac44c0",
    //    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsInR5cGUiOiJlbWJlZCIsIndjbiI6InRvYnktdGVzdCIsIndpZCI6ImRmNzA4MjUyLTAxNWItNGRhMS1iZGI4LThmYjFlMjk0NmJhZSIsInJpZCI6IjdmMTFlNzNhLTgyYWQtNDI1ZS05ZmRhLTY4NGRkY2FjNDRjMCIsImlzcyI6IlBvd2VyQklTREsiLCJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiZXhwIjoxNDg1ODM2MTc3LCJuYmYiOjE0ODU4MzI1Nzh9.xuz7eI1vOlMC1K3A8CsiG3UhWQbWESGxn_pT_nVADKg"});
    res.json({embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=d4bdb3a6-0f82-4aef-9f15-efe95e0bea1f",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsIndjbiI6InRvYnktdGVzdCIsIndpZCI6ImRmNzA4MjUyLTAxNWItNGRhMS1iZGI4LThmYjFlMjk0NmJhZSIsInJpZCI6ImQ0YmRiM2E2LTBmODItNGFlZi05ZjE1LWVmZTk1ZTBiZWExZiIsImlzcyI6IlBvd2VyQklTREsiLCJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiZXhwIjoxNDg1OTM1Mjg5LCJuYmYiOjE0ODU5MzE2ODl9.jUVgo_1hkGxxP_QlaLEzQUEBOssIE1FgmkudORV3doQ"});

});

module.exports = router;
