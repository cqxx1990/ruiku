import { LangMenu } from "..";

export default {
  title:"lang-menu",
  component: LangMenu
}

export const LangMenu = ()=>{
  return {
    components:{'lang-menu':"LangMenu"},
    template:`<lang-menu></lang-menu>`,
    data(){
      return {}
    }
  }
}