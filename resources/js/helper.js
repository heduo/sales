
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
       * @param {object} data axis x values
       * @param {string} elId element id
       */
       drawSalesChart: function(data, elId) {
        // echarts
        var echarts = require("echarts");
      
        // initialize echarts instance with prepared DOM
        var myChart = echarts.init(document.getElementById(elId));
        // chart option
        var option = {
          title: {
            text: 'Total Sales by Day',
            subtext: data.total ? "Total Amount: AU " + Number(data.total).toLocaleString('en-AU', {
              style: 'currency',
              currency: 'AUD'
            }) : "No records",
            subtextStyle: {
              fontStyle: 'italic',
              color: '#B03A5B'
            }
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              console.log(params);
             // When trigger is 'axis', or when tooltip is triggered by axisPointer, params is the data array of multiple series.
             // https://echarts.apache.org/en/option.html#tooltip.formatter
              return params[0].name + '<br/>'+ 'AU ' + Number(params[0].data).toLocaleString('en-AU', {
                style: 'currency',
                currency: 'AUD'
              });
            }
          },
          xAxis: {
            type: "category",
            data: data.category, // category name
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: function (value) {
                return 'AU ' + Number(value).toLocaleString('en-AU', {
                  style: 'currency',
                  currency: 'AUD'
                });
              }
            },
          },
          series: [
            {
              data: data.value, // data value
              type: "line",
            },
          ],
        };
        
        // draw chart
        myChart.setOption(option);
      }
  }

