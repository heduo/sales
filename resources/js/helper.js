// function formatDate(date) {
//     return (
//         formatDateComponent(date.getMonth() + 1) +
//         "/" +
//         formatDateComponent(date.getDate()) +
//         "/" +
//         date.getFullYear()
//     );
// }

// function formatDateComponent(dateComponent) {
//     return (dateComponent < 10 ? "0" : "") + dateComponent;
// }

// function getLastMonth() {
//     var now = new Date();
//     var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
//     var prevMonthFirstDate = new Date(
//         now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
//         (now.getMonth() - 1 + 12) % 12,
//         1
//     );

//     var startDate = formatDate(prevMonthFirstDate);
//     var endDate = formatDate(prevMonthLastDate);

//     return {
//         startDate,
//         endDate
//     };
// }

// function formatDateForDB(dateStr) {
//     const date = dateStr.split("/");
//     const month = date[0];
//     const day = date[1];
//     const year = date[2];
  
//     return year + "-" + month + "-" + day;
//   }

  export default {
     formatDate: function(date) {
        return (
            this.formatDateComponent(date.getMonth() + 1) +
            "/" +
            this.formatDateComponent(date.getDate()) +
            "/" +
            date.getFullYear()
        );
    },
    
     formatDateComponent: function(dateComponent) {
        return (dateComponent < 10 ? "0" : "") + dateComponent;
    },
    
     getLastMonthRange: function() {
        var now = new Date();
        var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
        var prevMonthFirstDate = new Date(
            now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
            (now.getMonth() - 1 + 12) % 12,
            1
        );
    
        var startDate = this.formatDate(prevMonthFirstDate);
        var endDate = this.formatDate(prevMonthLastDate);
    
        return {
            startDate:startDate,
            endDate:endDate
        };
    },
    
     formatDateForDB : function(dateStr) {
        const date = dateStr.split("/");
        const month = date[0];
        const day = date[1];
        const year = date[2];
      
        return year + "-" + month + "-" + day;
      },


       drawSalesChart: function(category, value, elId) {
        // echarts
        var echarts = require("echarts");
      
        // initialize echarts instance with prepared DOM
        var myChart = echarts.init(document.getElementById(elId));
        // draw chart
        var option = {
          title: {
            text: "Total sales per day",
            subtext: value.length ? "" : "No records",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: category,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: function (val) {
                return val;
              },
            },
          },
          series: [
            {
              data: value,
              type: "line",
            },
          ],
        };
      
        myChart.setOption(option);
      }
  }

