import {createIntl, createIntlCache} from 'react-intl'
import { flattenMessages } from '../i18n/utils'
import messages from '../i18n/messages'

export const initIntlProvider = () => {

    // This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()
let params = new URLSearchParams(document.location.search.substring(1))
let locale = params.get("lang") || 'pt-BR'

const intl = createIntl({
    locale: locale,
    messages: flattenMessages(messages[locale]) 
  }, cache)

    return intl;
    

}
