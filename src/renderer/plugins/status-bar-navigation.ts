import { Plugin } from '@fe/context'
import { getActionHandler } from '@fe/core/action'
import { getKeysLabel } from '@fe/core/command'

export default {
  name: 'status-bar-navigation',
  register: ctx => {
    ctx.statusBar.tapMenus(menus => {
      menus['status-bar-navigation'] = {
        id: 'status-bar-navigation',
        position: 'left',
        title: ctx.i18n.t('status-bar.nav.nav'),
        list: [
          {
            id: 'show-quick-open',
            type: 'normal',
            title: ctx.i18n.t('status-bar.nav.goto'),
            subTitle: getKeysLabel('filter.show-quick-open'),
            onClick: () => getActionHandler('filter.show-quick-open')()
          },
        ]
      }
    })
  }
} as Plugin
