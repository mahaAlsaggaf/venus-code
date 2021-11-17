// const express = require("express");
if (process.env.ACCESS_TOKEN != "production") require("dotenv").config();
const https = require("https");
const access_token = process.env.ACCESS_TOKEN;
// const path = require("path");
// if (process.env.ACCESS_TOKEN != "production") require("dotenv").config();

getOrders();
// await getOrders();
// await saveOrder();
// deleteOrders();

async function getOrders() {
  console.log(access_token);
  var options = {
    method: "GET",
    host: "venus-salla-integration.herokuapp.com",
    path: `/api/orders/get-all-orders-details`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-access-token": `${access_token}`,
    },
  };

  var res = await getApiCall(options);
  // console.log(res);
  console.log(res.length);

  for (var i = 0; i < res.length - 1; i++) {
    // console.log(res[i]);
    var id = res[i].id;
    var reference = res[i].reference;
    var InvDate = res[i].InvDate;
    var CustomerName = res[i].CustomerName;
    var Order_status_ID = res[i].Order_status_ID;
    var Order_status = res[i].Order_status;
    var payment_method = res[i].payment_method;
    var AccCode = res[i].AccCode;
    var shipping_Company = res[i].shipping_Company;
    var Order_can_cancel = res[i].Order_can_cancel;
    var TotalAmount = res[i].TotalAmount;
    var TotalVATPerc = res[i].TotalVATPerc;
    var cash_on_delivery = res[i].cash_on_delivery;
    var ItmID = res[i].ItmID;
    var ItmCode = res[i].ItmCode;
    var Itemname = res[i].Itemname;
    var Qty = res[i].Qty;
    var SalPrc = res[i].SalPrc;
    var SalDiscPrc = res[i].SalDiscPrc;
    var TotalLine = res[i].TotalLine;
    var RegDate = res[i].RegDate;
  }
}
async function saveOrder() {}

async function deleteOrders() {
  var options = {
    method: "DELETE",
    host: "venus-salla-integration.herokuapp.com",
    path: `/api/orders/delete-all-orders`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-access-token": `${access_token}`,
    },
  };
  var res = await getApiCall(options);
  console.log(res);
}
async function getApiCall(options) {
  var str = "";
  var response = "failed";
  try {
    var response = new Promise((resolve, reject) => {
      https
        .request(options, function (res) {
          //console.log('STATUS: ' + res.statusCode);
          //console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding("utf8");
          res.on("data", function (chunk) {
            str += chunk;
          });
          res.on("error", function (err) {
            reject(err);
          });
          res.on("end", function () {
            // console.log(str);
            // console.log(str.indexOf("<"));
            // if (str.indexOf("<") == -1) {
            str = JSON.parse(str);
            // } else {
            //   str = "failed this the else";
            // }
            resolve(str);
          });
        })
        .end();
    });
  } catch {
    response = "failed this the catch";
  }
  return await response;
}
