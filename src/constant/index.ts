import type { SelectOption } from "naive-ui"

export const availableCities: {
  name: string
  abbr: string
  code: number
}[] = [
  { name: "北京", abbr: "bj", code: 1101 },
  { name: "保定", abbr: "bd", code: 1306 },
  { name: "重庆", abbr: "cq", code: 5001 },
  { name: "成都", abbr: "cd", code: 5101 },
  { name: "长沙", abbr: "cs", code: 4301 },
  { name: "长春", abbr: "cc", code: 2201 },
  { name: "福州", abbr: "fz", code: 3501 },
  { name: "广州", abbr: "gz", code: 4401 },
  { name: "贵阳", abbr: "gy", code: 5201 },
  { name: "杭州", abbr: "hz", code: 3301 },
  { name: "哈尔滨", abbr: "heb", code: 2301 },
  { name: "合肥", abbr: "hf", code: 3401 },
  { name: "济南", abbr: "jn", code: 3701 },
  { name: "昆明", abbr: "km", code: 5301 },
  { name: "廊坊", abbr: "lf", code: 1310 },
  { name: "南京", abbr: "nj", code: 3201 },
  { name: "南昌", abbr: "nc", code: 3601 },
  { name: "青岛", abbr: "qd", code: 3702 },
  { name: "上海", abbr: "sh", code: 3101 },
  { name: "深圳", abbr: "sz", code: 4403 },
  { name: "苏州", abbr: "suzhou", code: 3205 },
  { name: "沈阳", abbr: "sy", code: 2101 },
  { name: "石家庄", abbr: "sjz", code: 1301 },
  { name: "天津", abbr: "tj", code: 1201 },
  { name: "武汉", abbr: "wh", code: 4201 },
  { name: "西安", abbr: "xa", code: 6101 },
  { name: "厦门", abbr: "xm", code: 3502 },
  { name: "郑州", abbr: "zz", code: 4101 },
]

//城市缩写的集合
export const availableCityAbbr: Set<string> = new Set(
  availableCities.map((item) => item.abbr)
)

export const bedroom: SelectOption[] = [
  { label: "1室", value: 1 },
  { label: "2室", value: 2 },
  { label: "3室", value: 3 },
  { label: "4室", value: 4 },
  { label: "5室", value: 5 },
  { label: "6室", value: 6 },
]

export const livingRoom: SelectOption[] = [
  { label: "0厅", value: 0 },
  { label: "1厅", value: 1 },
  { label: "2厅", value: 2 },
  { label: "3厅", value: 3 },
  { label: "4厅", value: 4 },
  { label: "5厅", value: 5 },
]

export const bathroom: SelectOption[] = [
  { label: "0卫", value: 0 },
  { label: "1卫", value: 1 },
  { label: "2卫", value: 2 },
  { label: "3卫", value: 3 },
  { label: "4卫", value: 4 },
  { label: "5卫", value: 5 },
]

export const kitchen: SelectOption[] = [
  { label: "0厨", value: 0 },
  { label: "1厨", value: 1 },
  { label: "2厨", value: 2 },
  { label: "3厨", value: 3 },
  { label: "4厨", value: 4 },
  { label: "5厨", value: 5 },
]

export const tenant: SelectOption[] = [
  { label: "2户", value: 2 },
  { label: "3户", value: 3 },
  { label: "4户", value: 4 },
  { label: "5户", value: 5 },
  { label: "6户", value: 6 },
  { label: "7户", value: 7 },
  { label: "8户", value: 8 },
  { label: "9户", value: 9 },
]
