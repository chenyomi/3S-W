## page页面接收
```javascript
const btnList = inject('btnList')
```
## page页面btnList
```javascript
btnList.value = [{
  name: '新增',
  color: '#42A5F5',
  size: 'large',
  width: 80,
  formWidth: 800,
  slot: shallowRef(clampForm),  
  fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
    openLoading({text: '正在上传更新',})
    diaFormRef.submit().finally(() => {
      close()
      setTimeout(() => {
        closeLoading()
      }, 2000)
    })
  },
}]
```
