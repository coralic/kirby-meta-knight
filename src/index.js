import { kirbyup } from 'kirbyup/plugin'

panel.plugin('coralic/kirby-meta-knight', {
  sections: kirbyup.import('./components/sections/*.vue')
})
