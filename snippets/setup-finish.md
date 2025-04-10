## 使用向导

您可以通过浏览器打开：http://127.0.0.1:8080 访问服务

访问由：`主机IP地址` + `服务端口` 构成

<a-image src="/images/system/setup-finish-001.png" />

<script setup>
import { ref } from 'vue'

const data = ref([{
      label: '默认用户名',
      value: 'ammds',
    }, {
      label: '默认密码',
      value: 'ammds',
    }])
</script>

### 开始享受🥳

<a-descriptions style="margin-top: 20px" :data="data" size="medium" :column="1"/>

<a-typography-text type="secondary">
      如果看不清，请改为亮色模式
</a-typography-text>

<br />