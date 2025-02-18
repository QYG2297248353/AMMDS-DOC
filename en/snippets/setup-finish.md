## User Guide

You can access the service by opening your browser and navigating to: http://127.0.0.1:8080

Access is formed by: `Host IP Address` + `Service Port`

<a-image src="/images/system/setup-finish-001.png" />

<script setup>
import { ref } from 'vue'

const data = ref([{
      label: 'Default Username',
      value: 'ammds',
    }, {
      label: 'Default Password',
      value: 'ammds',
    }])
</script>

### Start Enjoying 🥳

<a-descriptions style="margin-top: 20px" :data="data" size="medium" :column="1"/>