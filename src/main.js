import Vue from 'vue'
import './styles/styles.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ZenButton from './components/ZenButton'
import ZenBox from './components/ZenBox'
import ZenGrid from './components/ZenGrid'
import ZenFlex from './components/ZenFlex'
import ZenSpinner from './components/ZenSpinner'
import ZenTable from './components/ZenTable/ZenTable'
import ZenFormControl from './components/ZenFormControl/ZenFormControl'
import ZenLabel from './components/ZenFormControl/ZenInputLabel'
import ZenInput from './components/ZenFormControl/ZenInput'
import ZenInputGroup from './components/ZenFormControl/ZenInputGroup'
import ZenInputElement from './components/ZenFormControl/ZenInputElement'
import ZenTextarea from './components/ZenFormControl/ZenTextarea'
import ZenText from './components/ZenText'
import ZenDialog from './components/ZenDialog/ZenDialog'
import ZenDialogHeader from './components/ZenDialog/ZenDialogHeader'
import ZenDialogBody from './components/ZenDialog/ZenDialogBody'
import ZenDialogFooter from './components/ZenDialog/ZenDialogFooter'
import Lorem from './components/Lorem'
import ZenAvatar from './components/ZenAvatar'
import ZenDrawer from './components/ZenDrawer/ZenDrawer'
import ZenDrawerNav from './components/ZenDrawer/ZenDrawerNav'
import ZenDrawerContent from './components/ZenDrawer/ZenDrawerContent'
import ZenAccordion from './components/ZenAccordion/ZenAccordion'
import ZenAccordionHeader from './components/ZenAccordion/ZenAccordionHeader'
import ZenAccordionContent from './components/ZenAccordion/ZenAccordionContent'
import App from './App.vue'

const Components = {
  ZenButton,
  ZenBox,
  ZenGrid,
  ZenFlex,
  ZenFormControl,
  ZenInput,
  ZenInputGroup,
  ZenInputElement,
  ZenSpinner,
  ZenTable,
  ZenLabel,
  ZenTextarea,
  ZenText,
  ZenDialog,
  ZenDialogHeader,
  ZenDialogBody,
  ZenDialogFooter,
  Lorem,
  ZenAvatar,
  ZenDrawer,
  ZenDrawerNav,
  ZenDrawerContent,
  ZenAccordion,
  ZenAccordionHeader,
  ZenAccordionContent,
}

library.add(fas)

Vue.component('v-icon', FontAwesomeIcon)

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
