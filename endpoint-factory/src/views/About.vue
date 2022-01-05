<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="instructions">
      select a country, input a valid postal code, and hit the "Get Data" button
    </div>
    <div class="inputs">
      <select v-model="country">
        <option value="us">USA</option>
      </select>
      <input v-model="postalCode" />
      <button @click="getData">Get Data</button>
    </div>
    <div>{{ zipcodeEndpoint ? zipcodeEndpoint.is : "" }}</div>
    <div>{{ zipcodeEndpoint ? zipcodeEndpoint.response : "" }}</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import RestEndpoint from "@/utils/base.ts";
export default {
  data: (): { [key: string]: any } => {
    return {
      zipcodeEndpoint: null as RestEndpoint | null,
      axiosInstance: axios.create(),
      country: null,
      postalCode: null,
    };
  },
  mounted(): void {
    this.zipcodeEndpoint = new RestEndpoint(
      "http://api.zippopotam.us/:id/:id",
      { axiosInstance: this.axiosInstance }
    );
  },
  methods: {
    getData(): void {
      this.zipcodeEndpoint?.get([this.country, this.postalCode]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
