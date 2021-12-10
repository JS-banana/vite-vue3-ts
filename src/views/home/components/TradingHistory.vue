<template>
  <div class="tradingHistory">
    <div class="tradingHistory_header">
      <h2 class="font18">栽种记录</h2>
      <p class="rowBC">
        <a-space>
          <span>最近7天栽种植物总量：</span>
          <span class="font14_blue">{{ total }}</span>
        </a-space>
        <span>最近七天</span>
      </p>
    </div>
    <!--  -->
    <a-card
      :bordered="false"
      :loading="loading"
      :body-style="{ padding: 0 }"
      class="tradingHistory_chart"
    >
      <div class="chart-box" ref="chartRef"></div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import type { Ref } from 'vue';
  import echarts from '/@/utils/echarts';
  import { useECharts } from '/@/hooks/useECharts';
  import { useHomeStore } from '/@/store/modules/home';

  const store = useHomeStore();
  const dataSource = computed(() => store.getInfo?.seven_days || []);
  const total = computed(() => store.getInfo?.total_num || 0);

  const props = defineProps({
    loading: Boolean,
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => [props.loading, dataSource.value.length],
    () => {
      if (props.loading) {
        return;
      }

      const data = dataSource.value
        .sort((a, b) => Number(a.time) - Number(b.time))
        .map((n) => ({ ...n, time: `${n.time.substr(4, 2)}-${n.time.substr(6, 2)}` }));

      setOptions({
        grid: {
          left: 0,
          right: 10,
          top: 10,
          bottom: 0,
          containLabel: true,
        },
        tooltip: {
          type: 'axis',
        },
        xAxis: {
          type: 'category',
          data: data.map((n) => n.time),
          axisLabel: {
            rotate: 40,
            margin: 16,
            color: '#999999',
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.map((n) => n.num),
            type: 'line',
            // symbolSize: 0,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(56, 96, 244, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 1)',
                },
              ]),
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
<style lang="less" scoped>
  .tradingHistory {
    background: #ffffff;
    &_chart {
      .chart-box {
        width: 100%;
        height: 180px;
      }
    }
  }
</style>
