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
    ></date-range-picker>
    <div class="chart-area" id="salesChart"></div>
  </div>
</template>

<script>
// import helper functions
import helper from "../helper";

/**
 * fetch sales data based on date range, then draw new line chart
 * @param {string} startDate 
 * @param {string} endDate 
 */
function fetchSalesData(startDate, endDate) {
   axios
      .get("/sales", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then(function (response) {
        var data = response.data;
        // draw sales line chart with response data
        helper.drawSalesChart(data.category, data.value, "salesChart");
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}

export default {
  data() {
    // get last month date range
    var lastMonthRange = helper.getLastMonthRange();
    var startDate = lastMonthRange.startDate;
    var endDate = lastMonthRange.endDate;

    return {
      dateRange: { startDate, endDate },
      salesChartData: {
        category: null,
        value: null,
      },
    };
  },

  mounted() {
    // send request for sales data based on date range
    var startDate = helper.formatDateForDB(this.dateRange.startDate);
    var endDate = helper.formatDateForDB(this.dateRange.endDate);

    fetchSalesData(startDate, endDate);
  },

  methods: {
    // handle date range update
    updateValues() {
      var startDate = helper.formatDateForDB(helper.formatDate(this.dateRange.startDate));
      var endDate = helper.formatDateForDB(helper.formatDate(this.dateRange.endDate));
      fetchSalesData(startDate, endDate);
    }
   
  },
};
</script>
