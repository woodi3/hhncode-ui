import Vue from 'vue'
import 'quill/dist/quill.snow.css'
import './styles/styles.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vue-select/dist/vue-select.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faExclamationCircle,
  faTimes,
  faPen,
  faTrash,
  faBars,
  faSearch,
  faMinus,
  faBox,
  faPollH,
  faPencilRuler,
  faBookmark,
  faExclamationTriangle,
  faUser,
  faEnvelope,
  faLock,
  faLockOpen,
  faCheckSquare,
  faSquare,
  faCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as farBookmark, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons'
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
import ZenInputHelper from './components/ZenFormControl/ZenInputHelper'
import ZenErrorMessage from './components/ZenErrorMessage'
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
import ZenLink from './components/ZenLink'
import ZenCheckbox from './components/ZenCheckbox'
import ZenAlert from './components/ZenAlert'
import toast from './components/ZenToast'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import vSelect from 'vue-select'

import { 
  ApiService, 
  AdminService, 
  LogService, 
  PostService, 
  TagService, 
  UserService,
  SeriesService, 
  CommentService, 
  ReportService, 
  FeatureService, 
  PrivacyPolicyService, 
  QuoteService, 
  ReceiptService
} from './services'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const Components = {
  ZenButton,
  ZenBox,
  ZenGrid,
  ZenFlex,
  ZenFormControl,
  ZenInput,
  ZenInputGroup,
  ZenInputElement,
  ZenInputHelper,
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
  ZenLink,
  ZenErrorMessage,
  ZenCheckbox,
  ZenAlert,
}

library.add([
  faExclamationCircle,
  faTimes,
  faPen,
  faTrash,
  faBars,
  faSearch,
  faMinus,
  faBox,
  faPollH,
  faPencilRuler,
  faBookmark,
  faExclamationTriangle,
  faUser,
  faEnvelope,
  faLock,
  faLockOpen,
  faCheckSquare,
  faSquare,
  faCheck,
  faPlus
], [
  faTwitter, 
  faInstagram
], [
  farBookmark,
  farSquare,
])

Vue.component('v-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

const api = new ApiService()

Vue.prototype.$adminService = new AdminService(api)
Vue.prototype.$logService = new LogService(api)
Vue.prototype.$postService = new PostService(api)
Vue.prototype.$tagService = new TagService(api)
Vue.prototype.$userService = new UserService(api)
Vue.prototype.$seriesService = new SeriesService(api)
Vue.prototype.$commentService = new CommentService(api)
Vue.prototype.$reportService = new ReportService(api)
Vue.prototype.$featureService = new FeatureService(api)
Vue.prototype.$privacyPolicyService = new PrivacyPolicyService(api)
// Vue.prototype.$musicService = new MusicService(api)
Vue.prototype.$quoteService = new QuoteService(api)
Vue.prototype.$receiptService = new ReceiptService(api)
Vue.prototype.$dayjs = dayjs
Vue.prototype.$toast = toast

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

if (process.env.NODE_ENV === 'development') {
  const VueAxe = require('vue-axe').default
  Vue.use(VueAxe, {
    auto: false,
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
