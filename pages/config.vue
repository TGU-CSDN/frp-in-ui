<template>
    <div class="page-title">
        配置中心
    </div>
    <div class="page-content">
        <div class="btns-wrapper">
            <t-button theme="success" @click="openNew" class="refresh-btn">
                新增
            </t-button>
            <t-button @click="refresh" class="refresh-btn">刷新</t-button>
        </div>
        <t-form ref="form" :data="formData" :colon="true">
            <t-form-item label="服务端地址" name="serverAddr">
                <t-input v-model="formData.serverAddr" placeholder="请输入内容" :disabled="true"></t-input>
            </t-form-item>

            <t-form-item label="服务端端口" name="serverPort">
                <t-input v-model="formData.serverPort" placeholder="请输入内容" :disabled="true"></t-input>
            </t-form-item>

            <t-form-item label="验证令牌" name="token">
                <t-input v-model="formData.auth.token" placeholder="请输入内容" type="password" :disabled="true"></t-input>
            </t-form-item>

            <t-table :columns="columns" :data="formData.proxies" row-key="name">
                <template #operation="{ row }">
                    <!-- <t-link theme="primary" hover="color">
                        编辑
                    </t-link> -->
                    <t-link theme="danger" hover="color" @click="delRow(row.name)">
                        删除
                    </t-link>
                </template>
            </t-table>
        </t-form>
        <t-dialog :visible="editShow" header="新建隧道" @confirm="addConfirm" @close="closeEdit">
            <Edit v-if="editShow" type="add" ref="edit" @success="closeEdit"></Edit>
        </t-dialog>
    </div>
</template>
<script setup lang="jsx">
import { render } from 'vue';
import Edit from '../components/config/Edit.vue';
import { DialogPlugin } from 'tdesign-vue-next';
// const fs = require('fs');
const columns = [
    {
        title: '序号',
        cell: (h, { rowIndex }) => {
            return (
                <span>{rowIndex + 1}</span>
            );
        },
    },
    {
        title: '隧道名称',
        colKey: 'name',
    },
    {
        title: '内网IP',
        colKey: 'localIP',
    }, {
        title: '内网端口',
        colKey: 'localPort',
    }, {
        title: '远程端口',
        colKey: 'remotePort',
    }, {
        title: '协议',
        colKey: 'type',
    },
    {
        title: '操作',
        colKey: 'operation',
        slots: { customRender: 'action' },
    },
]
onMounted(async () => {
    refresh();
})
const formData = reactive({
    serverAddr: '',
    serverPort: '',
    remotePort: '',
    auth: {
        token: ''
    },
    proxies: [{
        name: '',
    }]
});
const refresh = (async () => {
    console.log('refresh')
    const res = await $fetch('/api/config/list');
    formData.serverAddr = res.data.serverAddr;
    formData.serverPort = res.data.serverPort;
    formData.remotePort = res.data.remotePort;
    formData.auth.token = res.data.auth.token;
    formData.proxies = res.data.proxies;
    console.log(formData, res)
})

const editShow = ref(false);
const openNew = () => {
    console.log('打开')
    editShow.value = true;
}
const closeEdit = () => {
    editShow.value = false;
    refresh();
}
const currentItem = ref(null);
const edit = ref(null)
const addConfirm = () => {
    console.log('addConfirm', edit);
    edit.value.submit();
}
const delRow = async (name) => {
    const confirmDia = DialogPlugin({
        header: '确认删除',
        body: `确定要删除隧道${name}么?`,
        onConfirm: async ({ e }) => {
            const res = await $fetch(`/api/config/del?name=${name}`, {
                method: 'DELETE',
            });
            if (res.code === 200) {
                refresh();
            }
            if (res.code !== 200) {
                console.log(res.msg);
            }
            confirmDia.hide();
        },
        onClose: ({ e, trigger }) => {
            confirmDia.hide();
        },
    });
}
</script>
<style lang="scss" scoped>
.refresh-btn {
    margin-bottom: 20px;
}

.link-wrapper {
    margin-left: 1rem;
}

.btns-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
</style>
