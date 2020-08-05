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
    <div>
      <a-table :columns="columns" :data-source="gridData" @change="onChange" />
    </div>
  </div>
</template>
<script>

import helper from "../helper";

function onChange(pagination, filters, sorter) {
  // console.log("params", pagination, filters, sorter);
}

export default {
  data() {
     // get last month date range
    var lastMonthRange = helper.getLastMonthRange();
    var startDate = lastMonthRange.startDate;
    var endDate = lastMonthRange.endDate;
    return {
      gridData: null,
      columns: null,
      dateRange: { startDate, endDate },
    };
  },

  mounted() {
    var startDate = helper.formatDateForDB(this.dateRange.startDate);
    var endDate = helper.formatDateForDB(this.dateRange.endDate);
    var self = this.$data;
    axios
      .get("/datagrid", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then(function (response) {
        var res = response.data;
        self.gridData = res.gridData;
        // set columns
        var columns = [
          {
            title: "Employee",
            dataIndex: "employee",
            filters: res.employeeFilters,
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.employee.indexOf(value) === 0,
            sorter: (a, b) => a.employee.length - b.employee.length,
            sortDirections: ["descend"],
          },
          {
            title: "Price",
            dataIndex: "price",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.price - b.price,
          },
          {
            title: "Customer Name",
            dataIndex: "customer",
            filters: res.customerFilters,
            filterMultiple: false,
            onFilter: (value, record) => record.customer.indexOf(value) === 0,
            sorter: (a, b) => a.customer.length - b.customer.length,
            sortDirections: ["descend", "ascend"],
          },
        ];
        self.columns = columns;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },

  methods: {
    onChange,
    updateValues() {},
  },
};
</script>
