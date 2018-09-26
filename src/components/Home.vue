<template>
  <div class="hello">
    <!--Search Input -->
    <b-field label="Search">
      <b-input v-model="searchValue" @input="search()"></b-input>
    </b-field>

    <!--Sorting buttons-->
    <button class="button is-primary" @click="sortFunc('first_name')">First Name Sort <b-icon icon="check" size="is-small" v-show="sort === 'first_name'"/></button>
    <button class="button is-primary" @click="sortFunc('last_name')">Last Name Sort <b-icon icon="check" size="is-small" v-show="sort === 'last_name'"/> </button>
    <button class="button is-primary" @click="sortFunc('email')">Email Sort <b-icon icon="check" size="is-small" v-show="sort === 'email'"/></button>
    <button class="button " v-show="order === 'asc' || order === ''" @click="order = 'desc'">ASC</button>
    <button class="button " v-show="order === 'desc'" @click="order = 'asc'">DESC</button>
    
    <!--Table data-->
    <template v-if="customerData !== null">
      <b-table :data="customerData">
      <template slot-scope="props">
        <b-table-column field="first_name" label="First Name">
          {{props.row.first_name}}
        </b-table-column>
        <b-table-column field="last_name" label="Last Name">
          {{props.row.last_name}}
        </b-table-column>
        <b-table-column field="email" label="Email">
          {{props.row.email}}
        </b-table-column>
        </template>
      </b-table>
    </template>

    <!--Pagination-->
    <b-pagination :total="customerDataAll.length" :current.sync="currentPage" :order="''" :size="'size'" :per-page="10" :simple="false" :rounded="false">
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  },
  data () {
    return {
      searchValue: '',
      currentPage: 1,
      sort: '',
      order: ''
    };
  },
  mounted: function () {
    this.$store.dispatch('loadData', this.queryParams);
  },
  computed: {
    customerData: function () {
      return this.$store.state.customerData;
    },
    customerDataAll: function () {
      if (this.$store.state.customerDataAll !== null) {
        return this.$store.state.customerDataAll;
      } else {
        return 50;
      }
    },
    queryParams: function () {
      return {'page': this.currentPage, 'searchValue': this.searchValue, 'sort': this.sort, 'order': this.order};
    }
  },
  methods: {
    loadData: function (variables) {
      this.$store.dispatch('loadData', variables);
    },
    search: function () {
      this.currentPage = 1;
      this.loadData(this.queryParams);
    },
    sortFunc: function (value) {
      if(this.sort === value) {
        this.sort = '';
      } else {
        this.sort = value;
      }
      this.loadData(this.queryParams);
    }
  },
  watch: {
    currentPage: function () {
      this.loadData(this.queryParams);
    },
    order: function () {
      if(this.sort !== '') {
        this.loadData(this.queryParams);
      }
    }
  }
}
</script>
<style scoped>
.field {
  width: 33.333%;
  padding: 10px;
}
.b-table {
  padding: 10px;
}
.button {
  margin: 10px;
}
.pagination {
  padding: 10px;
}
.icon {
  margin-left: 0px!important;
}
</style>
