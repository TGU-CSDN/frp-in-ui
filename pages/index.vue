<template>
    <div class="page-title">
        仪表盘
    </div>
    <div class="page-content">
        <t-skeleton :loading="loading">
            <div class="status-box">
                <t-icon v-if="!status" name="check-circle" size="50" color="green"></t-icon>
                <t-icon v-else name="error-circle" size="50" color="#d54941"></t-icon>
                <div style="margin-left: 20px;">
                    <div>服务状态：
                        {{ status ? '异常' : '正常' }}</div>
                    <div>
                        更新状态：
                        <span :class="[update === -1 ? 'warning-text' : '']">
                            {{ update === -1 ? '未应用变更' : '已应用最新变更' }}
                        </span>
                    </div>
                </div>
            </div>
        </t-skeleton>
        <div class="btn-wrapper">
            <t-button theme="primary" @click="getStatus">刷新服务状态</t-button>
            <t-button
                theme="success"
                class="btn"
                :disabled="update !== -1"
                @click=restart
            >
                应用变更并重启服务
            </t-button>
        </div>
    </div>
</template>
<script setup>
const getStatus = async () => {
    const res = await $fetch('/api/command/status');
    if (res.code === 200) {
        loading.value = false;
        status.value = res.data?.service;
        update.value = res.data?.update;
    }
}
// 0为正常，1为异常
const status = ref(0);
const update = ref(0);
const loading = ref(true);
const restart = async () => {
    try {
        const res = await $fetch('/api/command/restart');
        if (res.code === 200) {
            MessagePlugin.success('重启并应用成功');
        } else {
            MessagePlugin.warning(res.msg);
        }
        getStatus();
    } catch (err) {
        setTimeout(() => {
            getStatus();
        }, 500);
    }
}
onMounted(() => {
    getStatus();
})
</script>
<style scoped>
.btn {
    margin-left: 20px;
}

.btn-wrapper {
    padding-top: 20px;
}

.status-box {
    display: flex;
    align-items: center;
    height: 120px;
    font-size: 20px;
    line-height: 30px;
    font-weight: 600;
}

.warning-text {
    color: #d54941;
}
</style>
