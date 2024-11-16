const ReadToml = {
    async getSourse() {
        const config = useRuntimeConfig(event);
        const { frpPath } = config;
        return readFile(`${frpPath}/frpc.toml`, "utf8");
    }
}
export default ReadToml;