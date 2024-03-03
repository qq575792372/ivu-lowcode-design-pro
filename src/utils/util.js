import { getUUID, toSnakeCase, cloneDeep } from "@lime-util/util";

/**
 * 通过名称获取生成的id
 * @param {String} name 生成的名称前缀
 * @returns {String} 返回生成的格式为 simple_container_b43b69e96f844fc3
 */
export const getGenerateId = (name) => {
  return toSnakeCase(name) + "_" + getUUID(16);
};
