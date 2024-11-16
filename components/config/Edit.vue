<template>
    <div>
        <t-form>
            <t-form-item v-if="props.type === 'add'" label="隧道名称" >
                <t-input v-model="formData.name" />
            </t-form-item>
            <t-form-item label="内网IP">
                <t-input v-model="formData.localIP" />
            </t-form-item>
            <t-form-item label="内网端口">
                <t-input v-model="formData.localPort" />
            </t-form-item>
            <t-form-item label="远程端口">
                <t-input v-model="formData.remotePort" />
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="jsx">
import { MessagePlugin } from 'tdesign-vue-next';

const props = defineProps({
    currentRow: {
        type: Object,
        default: () => ({
            name: '',
            localIP: '',
            localPort: '',
        }),
    },
    type: {
        type: String,
        default: 'add',
    }
});
const emit = defineEmits(['success']);
onMounted(() => {
    console.log(props.currentRow);
});
const formData = reactive({
    name: '',
    localIP: '',
    localPort: '',
    remotePort: '',
    type: 'tcp',
});

// ref by config.vue
const submit = async () => {
    console.log('addConfirm');
    console.log(formData);
    const res = await $fetch('/api/config/add', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    if(res.code !== 200) {
        MessagePlugin.error(res.msg);
    }
    if(res.code === 200) {
        MessagePlugin.success('新建隧道成功');
        emit('success');
    }
    console.log(res);
    // refs.edit.close();
}

// 暴露到父组件
defineExpose({
    submit,
});
</script>
<style scoped lang='scss'>
</style>
