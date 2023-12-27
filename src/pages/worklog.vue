<script setup>
const density = inject('density')
const expanded = ref()
let expandedArr = []

let desserts = [
  {
    id: 1,
    content: '[加工] [2/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 1 (执行中)',
    type: '加工',
    status: '执行中',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 2,
    content: '[加工] [1/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 1 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 3,
    content: '[加工] [5/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 2 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 4,
    content: '[加工] [4/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 2 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 5,
    content: '[加工] [3/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 2 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 6,
    content: '[加工] [2/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 2 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 7,
    content: '[加工] [1/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 2 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 8,
    content: '[异常] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3',
    type: '加工',
    status: '异常',
    color: '#EF5350',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 8,
    content: '[警告] 遇到问题请稍后再试',
    type: '校准',
    status: '警告',
    color: '#FFA726',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 9,
    content: '[加工] [10/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 10,
    content: '[加工] [9/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 11,
    content: '[加工] [8/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 12,
    content: '[加工] [7/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 13,
    content: '[加工] [6/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 14,
    content: '[加工] [5/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 15,
    content: '[加工] [4/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 16,
    content: '[加工] [3/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 17,
    content: '[加工] [2/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
  {
    id: 18,
    content: '[加工] [1/10] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 3 (完成)',
    type: '加工',
    status: '完成',
    color: '#689F38',
    time: '2023-12-25 15:00:00',
  },
]

const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const items = desserts

        const paginated = items

        resolve({ items: paginated })
      }, 500)
    })
  },
}

const btnList = inject('btnList')

onMounted(() => {
})


const headers = ref([
  // {
  //   align: 'start',
  //   sortable: false,
  //   key: 'exclusive',
  //   fixed: true,
  //   width: 70,
  // },
  {
    title: '状态',
    align: 'center',
    sortable: false,
    key: 'status',
    width: 100,
  },
  
  {
    title: '内容',
    align: 'start',
    sortable: false,
    key: 'content',
  },
  {
    title: '类型',
    align: 'center',
    sortable: false,
    key: 'type',
    width: 100,
  },
  {
    title: '时间',
    align: 'end',
    sortable: false,
    key: 'time',
    width: 200,
  },
])

const serverItems = ref([])
const loading = ref(true)
function loadItems ({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    loading.value = false
    expanded.value = items[0].id
    btnList.value[1].slotData = serverItems.value.filter(c => c.id == items[0].id)[0]
  })
}
</script>

<template>
  <VDataTableVirtual
    fixed-header
    :headers="headers"
    :items="serverItems"
    :loading="loading"
    loading-text=""
    hover
    height="calc(100vh - 175px)"
    expand-on-click
    :density="density"
    @update:options="loadItems"
    @update:expanded="(newVal) => {
      newVal.map(e => {
        if(!expandedArr.includes(e)) {
          expanded = e
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr.map(e => {
        if(!newVal.includes(e)) {
          expanded = e 
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr = newVal
    }"
  >
    <template #item.exclusive="{ item }">
      <VCheckbox
        :model-value="item.id == expanded"
        readonly
      />
    </template>
    <template #item.status="{ item }">
      <VChip
        label
        :color="item.color"
      >
        {{ item.status }}
      </VChip>
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
