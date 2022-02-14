import navbar from "..";

export default {
  title: "navbar",
  component: navbar,
  argTypes: {
    icon: {
      name: "icon",
      description: "返回图标的资源链接",
      control: { type: "text" },
      type: { name: "string", required: false },
      table: {
        type: { summary: "string", required: false },
        defaultValue: { summary: null },
      },
    },
    title: {
      name: "title",
      description: "中间的标题",
      control: { type: "text" },
      type: { name: "string", required: true },
      defaultValue: "",
      table: {
        type: { summary: "string", required: false },
        defaultValue: { summary: "" },
      },
    },
    beforeNaviBack: {
      name: "beforeNaviBack",
      description: "返回按钮的前置钩子",
      type: { name: "function", required: false },
      defaultValue: "null",
      table: {
        type: { summary: "function", required: false },
        defaultValue: { summary: "undefined" },
      },
    },
    disableBack: {
      name: "disableBack",
      description: "是否不显示返回按钮",
      control: { type: "boolean" },
      type: { name: "boolean", required: false },
      defaultValue: false,
      table: {
        type: { summary: "boolean", required: false },
        defaultValue: { summary: false },
      },
    },
  },
};

const _data = {title:"标题"}
export const Navbar = (args,cmpt) => {
  console.log(cmpt,args)
  let keys = Object.keys(args).map(k=>`:${k}='${k}'`).join(" ")
  Object.keys(args).forEach(k=>{
    _data[k]=args[k]
  })
  return {
    components: { navbar },
    template: `<navbar ${keys}></navbar>`,
    data() {
      return _data;
    },
  };
};