import type { adminDivResult } from "@/type/admin-div"

//对行政区划数据进行分组
export function groupByPrefix(array: adminDivResult[]): adminDivResult[][] {
    // 创建一个空对象来作为分组结果的容器
    const grouped: { [key: string]: adminDivResult[] } = {}
    // 遍历数组中的每个元素
    array.forEach((item) => {
      // 如果该prefix还不存在于分组对象中，则创建一个新的空数组作为该prefix的值
      if (!grouped[item.pinyin_prefix]) {
        grouped[item.pinyin_prefix] = []
      }
      // 将当前元素添加到对应prefix的数组中
      grouped[item.pinyin_prefix].push(item)
    })
  
    // 获取分组对象的键（即不同的prefix），并进行排序
    const prefixes = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
 
    // 根据排序后的prefix键来构建最终的数组
    const result: adminDivResult[][] = [];
    prefixes.forEach(prefix => {
        result.push(grouped[prefix]);
    });
 
    return result;
  }