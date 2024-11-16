<template>
    <t-layout class="layout">
        <t-aside>
            <t-menu
            v-model="value"
                theme="light"
                value="index"
                style="margin-right: 50px"
                height="550px"
                @change="menuChange"
            >
                <template #logo>
                    <img width="100" class="logo" src="/public/logo.svg"
                        alt="logo" />
                </template>
                <t-menu-item value="">
                    <template #icon>
                        <t-icon name="dashboard" />
                    </template>
                    仪表盘
                </t-menu-item>
                <t-menu-item value="config">
                    <template #icon>
                        <t-icon name="server" />
                    </template>
                    配置中心
                </t-menu-item>
            </t-menu>
        </t-aside>
        <t-layout>
            <t-content class="layout-content">
                <slot />
                <t-footer>Copyright @ 2023-{{ new Date().getFullYear() }} TGU CSDN. All Rights Reserved</t-footer>
            </t-content>
        </t-layout>
    </t-layout>
</template>
<script setup>
const route = useRoute();
const router = useRouter();

const menuChange = (val) => {
    console.log(val);
    router.push({ path: `/${val}` });
    value.value = val;
}
const value = ref('');
</script>
<style scoped lang='scss'>
.layout {
    height: 100vh;
}
.layout-content {
    // max-height: calc(100vh);
    overflow-y: auto;
}
</style>
