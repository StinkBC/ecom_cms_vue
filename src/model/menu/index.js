
import api from '@api/api_admin'

export async function getMenu () {
  let res = await api.getRoles()

  if (res.code > 0) {
    let roles = res.data
    return tree(roles, [])
  }

  function tree (data, arr) {
    data.forEach((m, index) => {
      arr.push({
        path: m.path,
        name: m.name,
        components: require('@views' + m.component + '.vue'),
        iconCls: m.iconCls,
        redirect: m.redirect,
        hidden: m.hidden,
        id: m.id,
        children: []
      })
      if (m.children.length > 0) {
        let childArr = tree(m.children, [])
        arr[index].children = childArr
      }
    })
    return arr
  }
}
