import mqtt from 'mqtt'

export class mq {
  constructor(options) {
    this.topics = []
    this.mqtt = null
    this.url = ''
    this.options = {
      keepalive: 60,
      clientId: 'mqttjs_' + Math.random().toString(16).substring(2, 8),
      protocolId: 'MQTT',
      protocolVersion: 5,
      clean: true,
      reconnectPeriod: 3500,
      connectTimeout: 30 * 1000,
    }
    this.options = Object.assign(this.options, options)

    this.url = import.meta.env.VITE_API_MQTT + '/mqtt'
    this.mqtt = mqtt.connect(this.url, this.mergeOpt(options, {}))
    this.mqtt.on('connect', function () {
      console.log('连接成功')
    })
    this.mqtt.on('error', err => {
      console.log(err, '----error----')
      this.mqtt.end()
    })
    this.mqtt.on('reconnect', () => {
      console.log('推送连接已断开，正在重新连接...')
    })
    this.old = {}
    this.mqtt.on('message', (topic, message) => {

      if (this.old[topic]) {
        if (this.old[topic] !== message.toString()) {
          const msg = JSON.parse(message.toString())
          this.onChange && this.onChange(topic, msg)
          this.onChangeData && this.onChangeData(topic, msg)
        }

      } else {
        const msg = JSON.parse(message.toString())

        this.onChange && this.onChange(topic, msg)
        this.onChangeData && this.onChangeData(topic, msg)
      }
      this.old[topic] = message.toString()
    })
  }

  mergeOpt(target, source) {
    for (let key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key)) {
        if (Object.prototype.toString.call(source[key]) === '[object Object]') {
          if (Object.prototype.toString.call(target[key]) === '[object Object]') {
            mergeOpt(target[key], source[key])
          } else {
            target[key] = source[key]
          }
        } else {
          target[key] = source[key]
        }
      }
    }

    return target
  }

  // 添加单个订阅
  addSubscribe(topic) {
    if (this.topics.indexOf(topic) == -1) {
      this.topics.push(topic)
      this.mqtt.subscribe(topic, { qos: 0, retain: false }, error => {
        if (!error) {
          console.log(topic + '订阅成功')
        } else {
          console.log('订阅失败')
        }
      })
    }
  }

  // 移除单个订阅
  removeSubscribe(topic) {
    const index = this.topics.findIndex(e => e == topic)
    if (index !== -1) {
      this.topics.splice(index, 1)
      this.mqtt.unsubscribe(topic, error => {
        if (!error) {
          console.log(topic + '取消订阅')
        } else {
          console.log('取消订阅失败')
        }
      })
    }
  }

  // 取消全部订阅
  removeSubscribeAll() {
    this.topics.forEach((e, i) => {
      this.mqtt.unsubscribe(e, error => {
        if (!error) {
          console.log(e + '取消订阅')
        } else {
          console.log('取消订阅失败')
        }
      })
      if (i == this.topics.length - 1) {
        this.topics = []
      }
    })
  }

  // 关闭mqtt服务
  close() {
    this.mqtt.end()
    console.log('连接断开')
  }
}
