## template
<VBtn @click="openModal">预览</VBtn>
<Modal ref="modal" />

## javascript
```javascript
import Modal from './modal.vue'
import drawerSvg from './form.vue'
const modal = ref()
const openModal = () => {
  modal.value.open({
    formWidth: 854,
    hideDiaName: true,
    hideDiaOk: true,
    slot: shallowRef(drawerSvg),  // 引入表单模板 非必填
    slotData: serverItems.value.filter(c => c.id == expanded.value)[0], // 引入模板模板Data
    fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
      openLoading({
        text: '正在上传更新',
      })
      // 模板的submit 需要暴露 submit 事件
      diaFormRef.submit().finally(() => {
        // 关闭弹窗
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      })
    },
  })
}
```
