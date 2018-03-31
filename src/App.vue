<template>
  <div id="app" style="text-align: left; padding: 10vw">
    <div>
      <div class="box">
        <h3>Allow selection of single day</h3>
        <DatePicker
          :singleDaySelection="true"
          />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'components/DatePicker.vue';

export default {
  components: {
    DatePicker
  },
};

</script>

<style>
body,
html {
  font-family: 'roboto-regular';
}

.box {
  width: 100%;
}
</style>
