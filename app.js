if (process.env.ACCESS_TOKEN != "production") require("dotenv").config();
const https = require("https");
const access_token = process.env.ACCESS_TOKEN;

getOrders();
//saveOrder();

async function getOrders() {
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
  console.log(res);
  for (var i = 0; i < res.length; i++) {
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

    // update SentToVenus to true
    // update SentToVenusDate to now time
    var options = {
      method: "POST",
      host: "venus-salla-integration.herokuapp.com",
      path: `/api/orders/${id}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": `${access_token}`,
      },
    };

    var callback = await apiCall(options);
    // console.log(callback);
  }
}

// will be filled by sultan
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
async function apiCall(options) {
  var str = "";
  var response = "failed";
  try {
    var response = new Promise((resolve, reject) => {
      https
        .request(options, function (res) {
          res.setEncoding("utf8");
          res.on("data", function (chunk) {
            str += chunk;
          });
          res.on("error", function (err) {
            reject(err);
          });
          res.on("end", function () {
            str = JSON.parse(str);
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
