<template>
  <a-card> <h2>其他菜单</h2> </a-card>
  <a-divider class="line" />
  <a-card>
    <a-card>
      <a-space direction="vertical" :size="24">
        <a-alert message="hiddenWrap 属性用于控制容器包裹组件" type="info" />
        <div
          >路由中配置：<pre><code>meta: { title: '关于', hiddenWrap: true }</code>></pre>
        </div>
      </a-space>
    </a-card>
    <a-divider class="line" />
    <a-card>
      <p>这是一个嵌套路由</p>
      <a-button type="primary" @click="$router.push('/app/others/antdv')"
        >Go to 组件预览页面</a-button
      >
    </a-card>
    <a-divider class="line" />
    <a-card title="测试 watch监听 ref定义的响应式数据（基本类型）">
      <a-space direction="vertical" :size="24">
        <a-input v-model:value="str" />
        <a-space>
          <a-button @click="count--">-</a-button>
          <span>count：{{ count }}</span>
          <a-button @click="count++">+</a-button>
        </a-space>
      </a-space>
    </a-card>
    <a-divider class="line" />
    <a-card title="测试 watch监听 reactive定义的响应式数据">
      <a-space direction="vertical" :size="24">
        <a-input v-model:value="state.str" />
        <a-input v-model:value="state.a.b.c" />
        <a-space>
          <a-button @click="state.count--">-</a-button>
          <span>count：{{ state.count }}</span>
          <a-button @click="state.count++">+</a-button>
        </a-space>
      </a-space>
    </a-card>
    <a-divider class="line" />
    <a-card title="测试 watch监听 ref定义的响应式数据（引用类型）">
      <a-space direction="vertical" :size="24">
        <a-input v-model:value="refState.str" />
        <a-input v-model:value="refState.a.b.c" />
        <a-space>
          <a-button @click="refState.count--">-</a-button>
          <span>count：{{ refState.count }}</span>
          <a-button @click="refState.count++">+</a-button>
        </a-space>
      </a-space>
    </a-card>
  </a-card>
</template>
<script setup lang="ts">
  // 测试 watch监听 ref定义的响应式数据（基本类型）
  const count = ref(0);
  const str = ref('abc');

  // 1. 普通写法
  watch(count, (val, old) => console.log({ val, old }));

  // 2. 函数写法
  watch(
    () => count.value,
    (val, old) => console.log({ val, old }),
  );

  // 3. 数组写法
  watch(
    () => [count.value, str.value],
    (val, old) => console.log({ val, old }),
  );

  // 测试 watch监听 reactive定义的响应式数据
  const state = reactive({
    count: 0,
    str: 'abc',
    a: {
      b: {
        c: 'a-b-c',
      },
    },
  });

  // 1. 普通写法
  // 结果：val, old 新旧值相同
  // watch(state, (val, old) => console.log({ val, old }));

  // 2. 函数写法
  // 结果：指定属性变化才会触发
  watch(
    () => state.a.b.c, // 只监听指定的 属性
    (val, old) => console.log({ val, old }),
    // { immediate: true },
  );

  // 3. 数组写法
  watch(
    () => [state.count, state.str],
    (val, old) => console.log({ val, old }),
  );

  // 测试 watch监听 ref定义的响应式数据（引用类型）
  const refState = ref({
    count: 0,
    str: 'abc',
    a: {
      b: {
        c: 'a-b-c',
      },
    },
  });
  // 1. 普通写法
  // watch(refState.value, (val, old) => console.log({ val, old }));
  // 2. 函数写法
  watch(
    () => refState.value.a.b.c,
    (val, old) => console.log({ val, old }),
  );
  // // 3. 数组写法
  // watch(
  //   () => [refState.value.count, refState.value.str],
  //   (val, old) => console.log({ val, old }),
  // );
</script>
