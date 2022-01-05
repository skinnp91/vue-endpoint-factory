<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="inputs">
      <select v-model="country">
        <option value="us">USA</option>
      </select>
      <input v-model="postalCode" />
      <button @click="getData">Get Data</button>
    </div>
    <div>{{ zipcodeEndpoint ? zipcodeEndpoint.response : '' }}</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import RestEndpointFactory from "@/utils/base.ts";
export default {
  data: () => {
    return {
      zipcodeEndpoint: null as RestEndpointFactory | null,
      axiosInstance: axios.create({}),
      country: null,
      postalCode: null,
    };
  },
  mounted(): void {
    this.zipcodeEndpoint = new RestEndpointFactory(
      "http://api.zippopotam.us/:id/:id",
      { axiosInstance: this.axiosInstance }
    );
  },
  methods: {
    getData() {
      this.zipcodeEndpoint?.get([this.country, this.postalCode]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
