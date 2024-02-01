/**
 * 自动加载platform-xx下的配置，并存放到store中
 */
import { usePlatformStore } from "@/store/index";

export default {
  install(app, options) {
    const platformStore = usePlatformStore();
    const platformMap = import.meta.glob("/src/platform*/index.json", { eager: true, import: "default" });
    const platformList = Object.entries(platformMap)
      .map(([path, data]) => {
        return data;
      })
      .sort((a, b) => a.sort - b.sort);
    platformStore.setPlatformList(platformList);
  },
};
