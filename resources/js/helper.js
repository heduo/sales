
  export default {
    /**
     * pad '0' if neccessory, e.g '1/2/2020' => '01/02/2020'
     * @param {string} dateComponent 
     */
     formatDateComponent: function(dateComponent) {
        return (dateComponent < 10 ? "0" : "") + dateComponent;
    },
    
    /**
     * get last month range for default range
     */
     getLastMonthRange: function() {
        var now = new Date();
        var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
        var prevMonthFirstDate = new Date(
            now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
            (now.getMonth() - 1 + 12) % 12,
            1
        );
    
        return {
            startDate:prevMonthFirstDate,
            endDate:prevMonthLastDate
        };
    },
    
    /**
     * format a date obj to 'yyyy-mm-dd' for database use
     *
     * @param {string} dateObj
     */
     dateObjToString : function(dateObj, format='yyyy-mm-dd') {
       
        const month = this.formatDateComponent(dateObj.getMonth() + 1);
        const date =this.formatDateComponent(dateObj.getDate());
        const year = dateObj.getFullYear()

        if (format === 'yyyy-mm-dd') {
          return year + "-" + month + "-" + date;
        }
      },

      /**
       * Draw sales line chart
       * @param {array} category axis x values
       * @param {array} value axis y values
       * @param {string} elId element id
       */
       drawSalesChart: function(category, value, elId) {
        // echarts
        var echarts = require("echarts");
      
        // initialize echarts instance with prepared DOM
        var myChart = echarts.init(document.getElementById(elId));
        // chart option
        var option = {
          title: {
            text: "Total sales per day",
            subtext: value.length ? "" : "No records",
          },
          tooltip: {
            trigger: "axis",
            formatter: '{b} <br/> A$ {c}' // string template: {b} for category name(date), {c} for data value 
          },
          xAxis: {
            type: "category",
            data: category, // category name
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: function (val) {
                return 'A$ ' + val; 
              },
            },
          },
          series: [
            {
              data: value, // data value
              type: "line",
            },
          ],
        };
        
        // draw chart
        myChart.setOption(option);
      }
  }

