## template
<VBtn @click="openModal">预览</VBtn>
<Modal ref="modal" />

## javascript
```javascript
import Modal from './modal.vue'
import drawerSvg from './form.vue'
const modal = ref()
const openModal = () => {
  // open 打开弹窗事件
  modal.value.open({
    formWidth: 800,  // 弹窗宽度
    hideDiaName: true, // 隐藏弹窗标题
    hideDiaOk: true, // 隐藏提交按钮
    hideDiaCancel: false, // 隐藏取消按钮
    mark:'intro', // 介绍
    slot: shallowRef(drawerSvg),  // 引入表单模板 非必填
    slotData: serverItems.value.filter(c => c.id == expanded.value)[0], // 引入模板模板Data
    // 弹窗表单提交事件 { close, openLoading, closeLoading, diaFormRef }
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
    // 弹窗触发前 非必传 但是如果开启就需要手动打开弹窗参数
    // 参数{ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }
    before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
        dialog.value = true
    }
  })
}
```
| 属性      	| 介绍     	  | 类型 	 | 默认值 	|
|-----------	|----------	 |------	|--------	|
| formWidth 	| 弹窗宽度 	  | 数字 	 | 300    	|
| hideDiaName | 隐藏弹窗标题| 布尔   | true   	|
| hideDiaOk   | 隐藏提交按钮 |  布尔  | true  	|
