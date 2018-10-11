import Vue from 'vue'

// data components
import vTable from './data/table'

// form components
import vFormItem from './form/form-item'
import vForm from './form/form'
import vFileUpload from './form/file-upload'
import vInput from './form/input'

// layout components
import vContent from './layout/content'
import vSection from './layout/section'
import vQuerySection from './layout/query-section'

// notice components
import vModal from './notice/modal'

// page components
import vPagination from './page/pagination'

// ui components
import vButton from './ui/button'

Vue.component('v-table', vTable)
// Vue.component('v-editor', vEditor)
Vue.component('v-form-item', vFormItem)
Vue.component('v-form', vForm)
Vue.component('v-file-upload', vFileUpload)
Vue.component('v-input', vInput)
Vue.component('v-content', vContent)
Vue.component('v-section', vSection)
Vue.component('v-query-section', vQuerySection)
Vue.component('v-modal', vModal)
Vue.component('v-pagination', vPagination)
Vue.component('v-button', vButton)
