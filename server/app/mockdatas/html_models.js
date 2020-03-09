module.exports =
{ 'code': 1, 'data': {
  usual: [
    {
      name: 'banner',
      nameCn: '轮播',
      params: {
        itemLimit: 5,
        itemCount: 3,
        common: [
          { key: 'speed', name: '动画时长', type: 'Number', default: 300 },
          { key: 'auto', name: '切换间隔', type: 'Number', default: 4000 },
          { key: 'height', name: '高度', type: 'Number', default: 250 }
        ],
        item: [
          { key: 'img', name: '图片', type: 'image' },
          { key: 'url', name: '目标地址', type: 'target' }
        ]
      },
      img: '/img/grep.png'
    },
    {
      name: 'htmlcard',
      nameCn: '富文本',
      params: {
        itemLimit: 0,
        common: [{ key: 'html', name: '内容', type: 'html', default: '' }]
      },
      img: '/img/grep.png'
    }
  ],
  image: [],
  sku: [],
  other: []
}
}
