
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
     formatDateForDB : function(dateObj) {

      const month = this.formatDateComponent(dateObj.getMonth() + 1);
      
      const day =this.formatDateComponent(dateObj.getDate());
    
      const year = dateObj.getFullYear()

      
      
        return year + "-" + month + "-" + day;
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
        
        // draw chart
        myChart.setOption(option);
      }
  }

