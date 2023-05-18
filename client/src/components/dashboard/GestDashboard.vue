<template>
    <n-data-table
      pagination-behavior-on-filter="first"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </template>
  
 <script setup>
  import {NDataTable} from 'naive-ui';
</script>

  <script>
  import { defineComponent } from "vue";
  
  const columns = [
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Age",
      key: "age"
    },
    {
      title: "Address",
      key: "address",
      defaultFilterOptionValues: [],
      filterOptions: [
        {
          label: "London",
          value: "London"
        },
        {
          label: "New York",
          value: "New York"
        }
      ],
      filter(value, row) {
        return !!~row.address.indexOf(String(value));
      }
    }
  ];
  
  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: 4,
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park"
    }
  ];
  
  export default defineComponent({
    setup() {
      return {
        data,
        columns,
        pagination: { pageSize: 3 }
      };
    }
  });
  </script>