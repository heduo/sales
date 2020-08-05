<template>
  <div class="container">
    <br />
    <div>Please select date range</div>
    <date-range-picker
      ref="picker"
      opens="right"
      format="yyyy-mm-dd"
      v-model="dateRange"
      @update="updateValues"
      @toggle="checkOpen"
    ></date-range-picker>
    <div class="chart-area" id="salesChart">
      <!-- <line-chart :data="salesChartData"></line-chart> -->

    </div>
  </div>
</template>

<script>

function formatDate(date) {
  return (
    formatDateComponent(date.getMonth() + 1) +
    "/" +
    formatDateComponent(date.getDate()) +
    "/" +
    date.getFullYear()
  );
}

function formatDateComponent(dateComponent) {
  return (dateComponent < 10 ? "0" : "") + dateComponent;
}

function formatDateForDB(dateStr) {
  const date = dateStr.split("/");
  const month = date[0];
  const day = date[1];
  const year = date[2];

  return year + "-" + month + "-" + day;
}

function drawSalesChart(category, value, elId) {
       // echarts
      var echarts = require('echarts');

    // initialize echarts instance with prepared DOM
    var myChart = echarts.init(document.getElementById(elId));
    // draw chart
     var  option = {
          title: {
            text:  'Total sales per day',
            subtext: value.length ? '' : 'No records'
    },
         tooltip: {
        trigger: 'axis'
    },
        xAxis: {
            type: 'category',
            data: category
        },
        yAxis: {
            type: 'value',
             axisLabel: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        series: [{
            data:value,
            type: 'line'
        }]
    };

    myChart.setOption(option);
}

export default {
  data() {
    var now = new Date();
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
    var prevMonthFirstDate = new Date(
      now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
      (now.getMonth() - 1 + 12) % 12,
      1
    );

    var startDate = formatDate(prevMonthFirstDate);
    var endDate = formatDate(prevMonthLastDate);

    return {
      dateRange: { startDate, endDate },
     // salesChartData: { "2017-05-13": "2", "2017-05-14": "5"},
     salesChartData: {
         category:null,
         value:null
     },
    };
  },

  mounted() {
    // send request for sales data based on date range
    var startDate = formatDateForDB(this.dateRange.startDate);
    var endDate = formatDateForDB(this.dateRange.endDate);

    var self = this;

    axios
      .get("/sales", {
        params: {
          startDate : startDate,
          endDate: endDate
        },
      })
      .then(function (response) {
         var data =  response.data ;
        drawSalesChart(data.category, data.value, 'salesChart');
       
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

   
  },

  methods: {
    updateValues() {
       
         // send request for sales data based on date range
    var startDate = formatDateForDB(formatDate(this.dateRange.startDate));
    var endDate = formatDateForDB(formatDate(this.dateRange.endDate));

    axios
      .get("/sales", {
        params: {
          startDate : startDate,
          endDate: endDate
        },
      })
      .then(function (response) {
         var data =  response.data ;
        // this.salesChartData.category = data.category;
        // this.salesChartData.value = data.value;
        drawSalesChart(data.category, data.value, 'salesChart');
      })
      .catch(function (error) {
        console.log('error');
      })
      .then(function () {
        // always executed
      });

    },
    checkOpen() {},
  },
};
</script>
