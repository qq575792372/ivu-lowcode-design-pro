import { getUUID, cloneDeep } from "@lime-util/util";

/**
 * 通过名称获取生成的id
 * @param {String} name 生成的名称前缀
 */
export const getGenerateId = (name) => {
  return name + "-" + getUUID(16);
};
