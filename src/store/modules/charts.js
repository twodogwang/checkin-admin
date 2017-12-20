import {
  getCustomer,
  getSomebodyDetail,
  getOrder
} from '@/api/charts.js'

const chartData = {
  state: {
    customerData: {
      xAxis: null,
      yAxis: {
        intention: null,
        waitForTransform: null,
        alredyTransform: null
      }
    },
    somebodyDetail: {
      xAxis: null,
      yAxis: null,
      title: null
    },
    orderData: {
      xAxis: null,
      yAxis: {
        shenpi: null,
        wancheng: null,
        daijieshou: null,
        daizhuanyi: null,
        genjinzhong: null,
        tuidan: null,
        yifangkuan: null,
        zanhuan: null
      }
    }
  },
  getters: {
    customerDataX: state => state.customerData.xAxis,
    customerDataY1: state => state.customerData.yAxis.intention,
    customerDataY2: state => state.customerData.yAxis.waitForTransform,
    customerDataY3: state => state.customerData.yAxis.alredyTransform,
    somebodyDataX: state => state.somebodyDetail.xAxis,
    somebodyDataY: state => state.somebodyDetail.yAxis,
    somebodyTitle: state => state.somebodyDetail.title,
    orderDataX: state => state.orderData.xAxis,
    orderDataY: state => state.orderData.yAxis,
    orderDataY1: state => state.orderData.yAxis.shenpi,
    orderDataY2: state => state.orderData.yAxis.wancheng,
    orderDataY3: state => state.orderData.yAxis.daijieshou,
    orderDataY4: state => state.orderData.yAxis.daizhuanyi,
    orderDataY5: state => state.orderData.yAxis.genjinzhong,
    orderDataY6: state => state.orderData.yAxis.tuidan,
    orderDataY7: state => state.orderData.yAxis.yifangkuan,
    orderDataY8: state => state.orderData.yAxis.zanhuan
  },
  mutations: {
    SETCUSTOMERDATA: (state, data) => {
      state.customerData.xAxis = data.arrX;
      state.customerData.yAxis = {
        intention: data.arrY1,
        waitForTransform: data.arrY2,
        alredyTransform: data.arrY3
      };
    },
    SETSOMEBODYDATA: (state, data) => {
      state.somebodyDetail.xAxis = data.arrX;
      state.somebodyDetail.yAxis = data.arrY;
      state.somebodyDetail.title = data.title;
    },
    SETORDERDATA: (state, data) => {
      state.orderData.xAxis = data.arr1;
      state.orderData.yAxis.shenpi = data.arr2;
      state.orderData.yAxis.wancheng = data.arr3;
      state.orderData.yAxis.daijieshou = data.arr4;
      state.orderData.yAxis.daizhuanyi = data.arr5;
      state.orderData.yAxis.genjinzhong = data.arr6;
      state.orderData.yAxis.tuidan = data.arr7;
      state.orderData.yAxis.yifangkuan = data.arr8;
      state.orderData.yAxis.zanhuan = data.arr9;
    }

  },
  actions: {
    getCustomerData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCustomer().then(result => {
          const arrName = []
          const yixiang = []
          const waifor = []
          const allready = []
          const myarr = []
          const len = result.data.list.length;
          new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
              var Name = result.data.list[i].u_username
              var Num = result.data.list[i].num
              if (arrName.indexOf(Name) > -1) {
                let mylen = arrName.length - 1
                if (result.data.list[i].c_mean === "意向客户") {
                  yixiang[mylen] = Num
                } else if (result.data.list[i].c_mean === "待转移客户") {
                  waifor[mylen] = Num
                } else {
                  allready[mylen] = Num
                }
              } else {
                let mylen = arrName.length
                arrName[mylen] = Name
                if (result.data.list[i].c_mean === "意向客户") {
                  yixiang[mylen] = Num
                  waifor[mylen] = 0
                  allready[mylen] = 0
                } else if (result.data.list[i].c_mean === "待转移客户") {
                  waifor[mylen] = Num
                  allready[mylen] = 0
                  yixiang[mylen] = 0
                } else {
                  allready[mylen] = Num
                  waifor[mylen] = 0
                  yixiang[mylen] = 0
                }
              }
            }
            myarr.push(arrName)
            myarr.push(yixiang)
            myarr.push(waifor)
            myarr.push(allready)
            resolve(myarr)
          }).then(result => {
            commit('SETCUSTOMERDATA', {
              arrX: result[0],
              arrY1: result[1],
              arrY2: result[2],
              arrY3: result[3]
            })
          })
          resolve(result.data.list)
        })
      })
    },
    getSomebodyDetail({
      commit
    }, param) {
      return new Promise((resolve, reject) => {
        getSomebodyDetail(param).then(result => {
          const arrX = [];
          const arrY = [];
          let title = '';
          const length = result.data.list.length;
          for (let index = 0; index < length; index++) {
            arrX.push(result.data.list[index]['time']);
            arrY.push(result.data.list[index]['num']);
          }
          title = result.data.list[0].u_username;
          commit('SETSOMEBODYDATA', {
            arrX,
            arrY,
            title
          })
          resolve(result)
        })
      })
    },
    getOrderData({
      commit
    }, param) {
      return new Promise((resolve, reject) => {
        getOrder().then(result => {
          const length1 = result.data.order1.length;
          const length2 = result.data.order2.length;
          const result1 = result.data.order1;
          const result2 = result.data.order2;
          let arr1 = [];
          let arr2 = []; //审批中
          let arr3 = []; //已完成
          let arr4 = []; //待接收
          let arr5 = []; //待转移
          let arr6 = []; //跟进中
          let arr7 = []; //退单
          let arr8 = []; //已放款
          let arr9 = []; //暂缓
          for (let index = 0; index < length1; index++) {
            if (arr1.indexOf(result1[index].weeks) < 0) {
              arr1.push(result1[index].weeks)
              switch (result1[index].proType) {
                case '审批中':
                  arr2.push(result1[index].num)
                  arr3.push(0)
                  arr4.push(0)
                  arr5.push(0)
                  arr6.push(0)
                  arr7.push(0)
                  arr8.push(0)
                  arr9.push(0)
                  break;
                case '已完成':
                  arr3.push(result1[index].num)
                  arr2.push(0)
                  arr4.push(0)
                  arr5.push(0)
                  arr6.push(0)
                  arr9.push(0)
                  arr7.push(0)
                  arr8.push(0)
                  break;
                case '待接收':
                  arr4.push(result1[index].num)
                  arr2.push(0)
                  arr3.push(0)
                  arr5.push(0)
                  arr6.push(0)
                  arr9.push(0)
                  arr7.push(0)
                  arr8.push(0)
                  break;
                case '待转移':
                  arr5.push(result1[index].num)
                  arr2.push(0)
                  arr3.push(0)
                  arr4.push(0)
                  arr6.push(0)
                  arr7.push(0)
                  arr8.push(0)
                  arr9.push(0)
                  break;
                case '跟进中':
                  arr6.push(result1[index].num)
                  arr2.push(0)
                  arr3.push(0)
                  arr4.push(0)
                  arr5.push(0)
                  arr7.push(0)
                  arr8.push(0)
                  arr9.push(0)
                  break;
                case '退单':
                  arr7.push(result1[index].num)
                  arr2.push(0)
                  arr3.push(0)
                  arr4.push(0)
                  arr5.push(0)
                  arr6.push(0)
                  arr8.push(0)
                  arr9.push(0)
                  break
                case '暂缓':
                  arr9.push(result1[index].num)
                  arr2.push(0)
                  arr3.push(0)
                  arr4.push(0)
                  arr5.push(0)
                  arr6.push(0)
                  arr8.push(0)
                  arr7.push(0)
                  break
              }
            } else {
              var index1 = arr1.indexOf(result1[index].weeks);
              switch (result1[index].proType) {
                case '审批中':
                  arr2[index1] = result1[index].num
                  break;
                case '已完成':
                  arr3[index1] = result1[index].num
                  break;
                case '待接收':
                  arr4[index1] = result1[index].num
                  break;
                case '待转移':
                  arr5[index1] = result1[index].num
                  break;
                case '跟进中':
                  arr6[index1] = result1[index].num
                  break;
                case '退单':
                  arr7[index1] = result1[index].num
                  break
                case '暂缓':
                  arr9[index1] = result1[index].num
                  break
              }
            }
          }
          for (let index = 0; index < length2; index++) {
            if (arr1.indexOf(result2[index].weeks) < 0) {
              arr1.push(result2[index].weeks)
              arr2.push(0)
              arr3.push(0)
              arr4.push(0)
              arr5.push(0)
              arr6.push(0)
              arr7.push(0)
              arr8.push(result2[index].num)
              arr9.push(result2[index].num)
            } else {
              arr8[arr1.indexOf(result2[index].weeks)] = result2[index].num;
            }
          }

          const newlength = arr1.length
          for (var i = 0; i < newlength - 1; i++) {
            for (var j = 0; j < newlength - 1 - i; j++) {
              const arrSplit1 = arr1[j].split("_")
              const arrSplit2 = arr1[j + 1].split("_")
              let year1 = Number(arrSplit1[0])
              let weeks1 = Number(arrSplit1[1])
              let year2 = Number(arrSplit2[0])
              let weeks2 = Number(arrSplit2[1])
              if (year1 == year2) {
                if (weeks1 > weeks2) {
                  var temp1 = arr1[j];
                  arr1[j] = arr1[j + 1];
                  arr1[j + 1] = temp1;
                  var temp2 = arr2[j];
                  arr2[j] = arr2[j + 1];
                  arr2[j + 1] = temp2;
                  var temp3 = arr3[j];
                  arr3[j] = arr3[j + 1];
                  arr3[j + 1] = temp3;
                  var temp4 = arr4[j];
                  arr4[j] = arr4[j + 1];
                  arr4[j + 1] = temp4;
                  var temp5 = arr5[j];
                  arr5[j] = arr5[j + 1];
                  arr5[j + 1] = temp5;
                  var temp6 = arr6[j];
                  arr6[j] = arr6[j + 1];
                  arr6[j + 1] = temp6;
                  var temp6 = arr6[j];
                  arr6[j] = arr6[j + 1];
                  arr6[j + 1] = temp6;
                  var temp7 = arr7[j];
                  arr7[j] = arr7[j + 1];
                  arr7[j + 1] = temp7;
                  var temp8 = arr8[j];
                  arr8[j] = arr8[j + 1];
                  arr8[j + 1] = temp8;
                  var temp9 = arr9[j];
                  arr9[j] = arr9[j + 1];
                  arr9[j + 1] = temp9;
                }
              } else if (year1 > year2) {
                var temp1 = arr1[j];
                arr1[j] = arr1[j + 1];
                arr1[j + 1] = temp1;
                var temp2 = arr2[j];
                arr2[j] = arr2[j + 1];
                arr2[j + 1] = temp2;
                var temp3 = arr3[j];
                arr3[j] = arr3[j + 1];
                arr3[j + 1] = temp3;
                var temp4 = arr4[j];
                arr4[j] = arr4[j + 1];
                arr4[j + 1] = temp4;
                var temp5 = arr5[j];
                arr5[j] = arr5[j + 1];
                arr5[j + 1] = temp5;
                var temp6 = arr6[j];
                arr6[j] = arr6[j + 1];
                arr6[j + 1] = temp6;
                var temp6 = arr6[j];
                arr6[j] = arr6[j + 1];
                arr6[j + 1] = temp6;
                var temp7 = arr7[j];
                arr7[j] = arr7[j + 1];
                arr7[j + 1] = temp7;
                var temp8 = arr8[j];
                arr8[j] = arr8[j + 1];
                arr8[j + 1] = temp8;
                var temp9 = arr9[j];
                arr9[j] = arr9[j + 1];
                arr9[j + 1] = temp9;
              }
            }
          }
          commit('SETORDERDATA', {
            arr1,
            arr2,
            arr3,
            arr4,
            arr5,
            arr6,
            arr7,
            arr8,
            arr9
          })
          resolve(result)
        })
      })
    }
  }
}

export default chartData
