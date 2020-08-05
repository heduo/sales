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

function updateFilters(customerFilters, employeeFilters ) {
   return [
          {
            title: "Employee",
            dataIndex: "employee",
            filters: employeeFilters,
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.employee.indexOf(value) === 0,
            sorter: (a, b) => a.employee > b.employee ? 1 : -1 ,
            sortDirections: ["descend", "ascend"],
          },
          {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price > b.price ? 1 : -1,
             sortDirections: ["descend", "ascend"],
          },
          {
            title: "Customer Name",
            dataIndex: "customer",
            filters: customerFilters,
            onFilter: (value, record) => record.customer.indexOf(value) === 0,
            sorter: (a, b) => a.customer > b.customer ? 1 : -1,
            sortDirections: ["descend", "ascend"],
          },
          {
              title: "Date",
              dataIndex: "date",
              sorter: (a, b) => a.date > b.date ? 1: -1,
              sortDirections: ["descend", "ascend"],
            },
        ];
}

function createDataGrid(startDate, endDate, vm) {
  axios
      .get("/datagrid", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then(function (response) {
        var res = response.data;
        vm.gridData = res.gridData;
        var columns = updateFilters(res.customerFilters, res.employeeFilters);
        vm.columns = columns;
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
      gridData: null,
      columns: null,
      dateRange: { startDate, endDate },
    };
  },

  mounted() {
    var startDate = helper.formatDateForDB(this.dateRange.startDate);
    var endDate = helper.formatDateForDB(this.dateRange.endDate);
    var self = this.$data;
  
    createDataGrid(startDate, endDate, self);
  },

  methods: {
    onChange,
    updateValues() {
      var startDate = helper.formatDateForDB(
        helper.formatDate(this.dateRange.startDate)
      );
      var endDate = helper.formatDateForDB(
        helper.formatDate(this.dateRange.endDate)
      );

      var self = this.$data;
       createDataGrid(startDate, endDate, self);
    },
  },
};
</script>
