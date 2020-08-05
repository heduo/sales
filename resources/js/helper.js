
  export default {
      /**
       *  convert a date object to 'mm/dd/yyyy' date string
       * @param {Object} date date object
       */
     formatDate: function(date) {
        return (
            this.formatDateComponent(date.getMonth() + 1) +
            "/" +
            this.formatDateComponent(date.getDate()) +
            "/" +
            date.getFullYear()
        );
    },
     
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
    
        var startDate = this.formatDate(prevMonthFirstDate);
        var endDate = this.formatDate(prevMonthLastDate);
    
        return {
            startDate:startDate,
            endDate:endDate
        };
    },
    
    /**
     * format a date string 'mm/dd/yyyy' to 'yyyy-mm-dd' for database use
     * 
     * @param {string} dateStr 
     */
     formatDateForDB : function(dateStr) {
        const date = dateStr.split("/");
        const month = date[0];
        const day = date[1];
        const year = date[2];
      
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

