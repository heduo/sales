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

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
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
      gridData: null,
      columns: null,
      dateRange: { startDate, endDate },
    };
  },

  mounted() {
    var startDate = formatDateForDB(this.dateRange.startDate);
    var endDate = formatDateForDB(this.dateRange.endDate);
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
