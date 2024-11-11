"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[7317],{42878:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(67294),l=n(45697),r=n.n(l),i=n(9875),o=n(61988),s=n(68135),d=n(35932),c=n(94670),u=n(1304),h=n(82342),p=n(35944);const m={name:r().string,onChange:r().func,initialValue:r().string,height:r().number,minLines:r().number,maxLines:r().number,offerEditInModal:r().bool,language:r().oneOf([null,"json","html","sql","markdown","javascript"]),aboveEditorSection:r().node,readOnly:r().bool,resize:r().oneOf([null,"block","both","horizontal","inline","none","vertical"]),textAreaStyles:r().object};class v extends a.Component{onControlChange(e){const{value:t}=e.target;this.props.onChange(t)}onAreaEditorChange(e){this.props.onChange(e)}renderEditor(e=!1){const t=e?40:this.props.minLines||12;if(this.props.language){const n={border:`1px solid ${this.props.theme.colors.grayscale.light1}`,minHeight:`${t}em`,width:"auto",...this.props.textAreaStyles};return this.props.resize&&(n.resize=this.props.resize),this.props.readOnly&&(n.backgroundColor="#f2f2f2"),(0,p.tZ)(c.YH,{mode:this.props.language,style:n,minLines:t,maxLines:e?1e3:this.props.maxLines,editorProps:{$blockScrolling:!0},defaultValue:this.props.initialValue,readOnly:this.props.readOnly,...this.props,onChange:this.onAreaEditorChange.bind(this)},this.props.name)}return(0,p.tZ)(i.Kx,{placeholder:(0,o.t)("textarea"),onChange:this.onControlChange.bind(this),defaultValue:this.props.initialValue,disabled:this.props.readOnly,style:{height:this.props.height}})}renderModalBody(){return(0,p.BX)(p.HY,{children:[(0,p.tZ)("div",{children:this.props.aboveEditorSection}),this.renderEditor(!0)]})}render(){const e=(0,p.tZ)(h.Z,{...this.props});return(0,p.BX)("div",{children:[e,this.renderEditor(),this.props.offerEditInModal&&(0,p.tZ)(u.Z,{modalTitle:e,triggerNode:(0,p.BX)(d.Z,{buttonSize:"small",className:"m-t-5",children:[(0,o.t)("Edit")," ",(0,p.tZ)("strong",{children:this.props.language})," ",(0,o.t)("in modal")]}),modalBody:this.renderModalBody(!0),responsive:!0})]})}}v.propTypes=m,v.defaultProps={onChange:()=>{},initialValue:"",height:250,minLines:3,maxLines:10,offerEditInModal:!0,readOnly:!1,resize:null,textAreaStyles:{}};const g=(0,s.b)(v)},9433:(e,t,n)=>{n.d(t,{Bj:()=>d});var a=n(38179),l=n(61988),r=n(51995),i=n(61247),o=n(35944);const s={everyText:(0,l.t)("every"),emptyMonths:(0,l.t)("every month"),emptyMonthDays:(0,l.t)("every day of the month"),emptyMonthDaysShort:(0,l.t)("day of the month"),emptyWeekDays:(0,l.t)("every day of the week"),emptyWeekDaysShort:(0,l.t)("day of the week"),emptyHours:(0,l.t)("every hour"),emptyMinutes:(0,l.t)("every minute"),emptyMinutesForHourPeriod:(0,l.t)("every"),yearOption:(0,l.t)("year"),monthOption:(0,l.t)("month"),weekOption:(0,l.t)("week"),dayOption:(0,l.t)("day"),hourOption:(0,l.t)("hour"),minuteOption:(0,l.t)("minute"),rebootOption:(0,l.t)("reboot"),prefixPeriod:(0,l.t)("Every"),prefixMonths:(0,l.t)("in"),prefixMonthDays:(0,l.t)("on"),prefixWeekDays:(0,l.t)("on"),prefixWeekDaysForMonthAndYearPeriod:(0,l.t)("or"),prefixHours:(0,l.t)("at"),prefixMinutes:(0,l.t)(":"),prefixMinutesForHourPeriod:(0,l.t)("at"),suffixMinutesForHourPeriod:(0,l.t)("minute(s)"),errorInvalidCron:(0,l.t)("Invalid cron expression"),clearButtonText:(0,l.t)("Clear"),weekDays:[(0,l.t)("Sunday"),(0,l.t)("Monday"),(0,l.t)("Tuesday"),(0,l.t)("Wednesday"),(0,l.t)("Thursday"),(0,l.t)("Friday"),(0,l.t)("Saturday")],months:[(0,l.t)("January"),(0,l.t)("February"),(0,l.t)("March"),(0,l.t)("April"),(0,l.t)("May"),(0,l.t)("June"),(0,l.t)("July"),(0,l.t)("August"),(0,l.t)("September"),(0,l.t)("October"),(0,l.t)("November"),(0,l.t)("December")],altWeekDays:[(0,l.t)("SUN"),(0,l.t)("MON"),(0,l.t)("TUE"),(0,l.t)("WED"),(0,l.t)("THU"),(0,l.t)("FRI"),(0,l.t)("SAT")],altMonths:[(0,l.t)("JAN"),(0,l.t)("FEB"),(0,l.t)("MAR"),(0,l.t)("APR"),(0,l.t)("MAY"),(0,l.t)("JUN"),(0,l.t)("JUL"),(0,l.t)("AUG"),(0,l.t)("SEP"),(0,l.t)("OCT"),(0,l.t)("NOV"),(0,l.t)("DEC")]},d=(0,r.iK)((e=>(0,o.tZ)(a.ZP,{getPopupContainer:e=>e.parentElement,children:(0,o.tZ)(i.Z,{locale:s,...e})})))`
  ${({theme:e})=>`\n\n    /* Boilerplate styling for ReactCronPicker imported explicitly in GlobalStyles.tsx */\n\n    /* When year period is selected */\n\n    :has(.react-js-cron-months) {\n      display: grid !important;\n      grid-template-columns: repeat(2, 50%);\n      column-gap: ${e.gridUnit}px;\n      row-gap: ${2*e.gridUnit}px;\n      div:has(.react-js-cron-hours) {\n        grid-column: span 2;\n        display: flex;\n        justify-content: space-between;\n        .react-js-cron-field {\n          width: 50%;\n        }\n      }\n    }\n\n    /* When month period is selected */\n\n    :not(:has(.react-js-cron-months)) {\n      display: grid;\n      grid-template-columns: repeat(2, 50%);\n      column-gap: ${e.gridUnit}px;\n      row-gap: ${2*e.gridUnit}px;\n      .react-js-cron-period {\n        grid-column: span 2;\n      }\n      div:has(.react-js-cron-hours) {\n        grid-column: span 2;\n        display: flex;\n        justify-content: space-between;\n        .react-js-cron-field {\n          width: 50%;\n        }\n      }\n    }\n\n    /* When week period is selected */\n\n    :not(:has(.react-js-cron-month-days)) {\n      .react-js-cron-week-days {\n        grid-column: span 2;\n      }\n    }\n\n    /* For proper alignment of inputs and span elements */\n\n    :not(div:has(.react-js-cron-hours)) {\n      display: flex;\n      flex-wrap: nowrap;\n    }\n\n    div:has(.react-js-cron-hours) {\n      width: 100%;\n    }\n\n    .react-js-cron-minutes > span {\n      padding-left: ${e.gridUnit}px;\n    }\n\n    /* Sizing of select container */\n\n    .react-js-cron-select.ant-select {\n      width: 100%;\n      .ant-select-selector {\n        flex-wrap: nowrap;\n      }\n    }\n\n    .react-js-cron-field {\n      width: 100%;\n      margin-bottom: 0px;\n      > span {\n        margin-left: 0px;\n      }\n    }\n\n    .react-js-cron-custom-select .ant-select-selection-placeholder {\n      flex: auto;\n      border-radius: ${e.gridUnit}px;\n    }\n\n    .react-js-cron-custom-select .ant-select-selection-overflow-item {\n      align-self: center;\n    }\n\n    .react-js-cron-select > div:first-of-type,\n    .react-js-cron-custom-select {\n      border-radius: ${e.gridUnit}px;\n    }\n  `}
`},98978:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(11965),l=n(67294),r=n(80008),i=n.n(r),o=n(61988),s=n(4715),d=n(35944);const c="GMT Standard Time",u="400px",h={"-300-240":["Eastern Standard Time","Eastern Daylight Time"],"-360-300":["Central Standard Time","Central Daylight Time"],"-420-360":["Mountain Standard Time","Mountain Daylight Time"],"-420-420":["Mountain Standard Time - Phoenix","Mountain Standard Time - Phoenix"],"-480-420":["Pacific Standard Time","Pacific Daylight Time"],"-540-480":["Alaska Standard Time","Alaska Daylight Time"],"-600-600":["Hawaii Standard Time","Hawaii Daylight Time"],60120:["Central European Time","Central European Daylight Time"],"00":[c,c],"060":["GMT Standard Time - London","British Summer Time"]},p=i()(),m=i()([2021,1]),v=i()([2021,7]),g=e=>m.tz(e).utcOffset().toString()+v.tz(e).utcOffset().toString(),b=e=>{var t,n;const a=g(e);return(p.tz(e).isDST()?null==(t=h[a])?void 0:t[1]:null==(n=h[a])?void 0:n[0])||e},E=i().tz.countries().map((e=>i().tz.zonesForCountry(e,!0))).flat(),T=[];E.forEach((e=>{T.find((t=>g(t.name)===g(e.name)))||T.push(e)}));const f=T.map((e=>({label:`GMT ${i().tz(p,e.name).format("Z")} (${b(e.name)})`,value:e.name,offsets:g(e.name),timezoneName:e.name}))),_=(e,t)=>i().tz(p,e.timezoneName).utcOffset()-i().tz(p,t.timezoneName).utcOffset();f.sort(_);const N=e=>{var t;return(null==(t=f.find((t=>t.offsets===g(e))))?void 0:t.value)||"Africa/Abidjan"};function y({onTimezoneChange:e,timezone:t,minWidth:n=u}){const r=(0,l.useMemo)((()=>N(t||i().tz.guess())),[t]);return(0,l.useEffect)((()=>{t!==r&&e(r)}),[r,e,t]),(0,d.tZ)(s.Ph,{ariaLabel:(0,o.t)("Timezone selector"),css:(0,a.iv)({minWidth:n},"",""),onChange:t=>e(t),value:r,options:f,sortComparator:_})}},67317:(e,t,n)=>{n.d(t,{j5:()=>J,KL:()=>ae,ZP:()=>re});var a=n(67294),l=n(61988),r=n(11965),i=n(51995),o=n(93185),s=n(31069),d=n(15926),c=n.n(d),u=n(34858),h=n(9875),p=n(12441),m=n(74069),v=n(43700),g=n(98978),b=n(85633),E=n(14114),T=n(4715),f=n(42878),_=n(18451),N=n(9882),y=n(90335),R=n(28216),S=n(35944);function x({timeUnit:e,min:t,name:n,value:l,placeholder:r,onChange:i}){const[o,s]=(0,a.useState)(!1);return(0,S.tZ)("input",{type:"text",min:t,name:n,value:l?`${l}${o?"":` ${e}`}`:"",placeholder:r,onFocus:()=>s(!0),onBlur:()=>s(!1),onChange:i})}var C,Z=n(9433);!function(e){e.Picker="picker",e.Input="input"}(C||(C={}));const O=[{label:(0,l.t)("Recurring (every)"),value:C.Picker},{label:(0,l.t)("CRON Schedule"),value:C.Input}],A=({value:e,onChange:t})=>{const n=(0,i.Fg)(),r=(0,a.useRef)(null),[o,s]=(0,a.useState)(C.Picker),d=(0,a.useCallback)((e=>{var n;t(e),null==(n=r.current)||n.setValue(e)}),[r,t]),c=(0,a.useCallback)((e=>{t(e.target.value)}),[t]),u=(0,a.useCallback)((()=>{var e;t((null==(e=r.current)?void 0:e.input.value)||"")}),[t]),[p,m]=(0,a.useState)();return(0,S.BX)(S.HY,{children:[(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Schedule type"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Schedule type"),placeholder:(0,l.t)("Schedule type"),onChange:e=>{s(e)},value:o,options:O})})]}),(0,S.BX)(J,{className:"styled-input",children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Schedule"),(0,S.tZ)("span",{className:"required",children:"*"})]}),o===C.Input&&(0,S.tZ)(h.II,{type:"text",name:"crontab",ref:r,style:p?{borderColor:n.colors.error.base}:{},placeholder:(0,l.t)("CRON expression"),value:e,onBlur:c,onChange:e=>d(e.target.value),onPressEnter:u}),o===C.Picker&&(0,S.tZ)(Z.Bj,{clearButton:!1,value:e,setValue:d,displayError:o===C.Picker,onError:m})]})]})};var L=n(13322);const I=i.iK.div`
  margin-bottom: 10px;

  .input-container {
    textarea {
      height: auto;
    }

    &.error {
      input {
        border-color: ${({theme:e})=>e.colors.error.base};
      }
    }
  }

  .inline-container {
    margin-bottom: 10px;

    > div {
      margin: 0;
    }

    .delete-button {
      margin-left: 10px;
      padding-top: 3px;
    }
  }
`,w={EMAIL_SUBJECT_NAME:(0,l.t)("Email subject name (optional)"),EMAIL_SUBJECT_ERROR_TEXT:(0,l.t)("Please enter valid text. Spaces alone are not permitted.")},B=({setting:e=null,index:t,onUpdate:n,onRemove:r,onInputChange:o,email_subject:s,defaultSubject:d,setErrorSubject:c})=>{const{method:u,recipients:h,options:p}=e||{},[m,v]=(0,a.useState)(h||""),[g,b]=(0,a.useState)(!1),E=(0,i.Fg)();return e?(h&&m!==h&&v(h),(0,S.BX)(I,{children:[(0,S.tZ)("div",{className:"inline-container",children:(0,S.BX)(J,{children:[(0,S.tZ)("div",{className:"control-label",children:(0,l.t)("Notification Method")}),(0,S.BX)("div",{className:"input-container",children:[(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Delivery method"),onChange:a=>{if(v(""),n){const l={...e,method:a,recipients:""};n(t,l)}},placeholder:(0,l.t)("Select Delivery Method"),options:(p||[]).map((e=>({label:e,value:e}))),value:u}),0!==t&&r?(0,S.tZ)("span",{role:"button",tabIndex:0,className:"delete-button",onClick:()=>r(t),children:(0,S.tZ)(L.Z.Trash,{iconColor:E.colors.grayscale.base})}):null]})]})}),void 0!==u?(0,S.BX)(S.HY,{children:[(0,S.tZ)("div",{className:"inline-container",children:(0,S.tZ)(J,{children:"Email"===u?(0,S.BX)(S.HY,{children:[(0,S.tZ)("div",{className:"control-label",children:w.EMAIL_SUBJECT_NAME}),(0,S.tZ)("div",{className:"input-container "+(g?"error":""),children:(0,S.tZ)("input",{type:"text",name:"email_subject",value:s,placeholder:d,onChange:e=>{const{value:t}=e.target;o&&o(e);const n=t.length>0&&0===t.trim().length;b(n),c&&c(n)}})}),g&&(0,S.tZ)("div",{style:{color:E.colors.error.base,fontSize:3*E.gridUnit},children:w.EMAIL_SUBJECT_ERROR_TEXT})]}):null})}),(0,S.tZ)("div",{className:"inline-container",children:(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("%s recipients",u),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)("textarea",{name:"recipients",value:m,onChange:a=>{const{target:l}=a;if(v(l.value),n){const a={...e,recipients:l.value};n(t,a)}}})}),(0,S.tZ)("div",{className:"helper",children:(0,l.t)('Recipients are separated by "," or ";"')})]})})]}):null]})):null};var X=n(40695);const k=({title:e,subtitle:t,validateCheckStatus:n,testId:a})=>{const r=(0,S.tZ)(X.Z,{});return(0,S.BX)("div",{className:"collapse-panel-header",children:[(0,S.BX)("div",{className:"collapse-panel-title",children:[(0,S.tZ)("span",{children:(0,l.t)(e)}),n?(0,S.tZ)("span",{className:"validation-checkmark",children:r}):(0,S.tZ)("span",{className:"collapse-panel-asterisk",children:" *"})]}),(0,S.tZ)("p",{className:"collapse-panel-subtitle",children:t?(0,l.t)(t):void 0})]})};var j=n(46445);const $=e=>(0,S.tZ)(j.Z.Panel,{css:e=>(e=>r.iv`
  .ant-collapse-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px ${4*e.gridUnit}px;

    .anticon.anticon-right.ant-collapse-arrow {
      padding: 0;
      top: calc(50% - ${6}px);
    }

    .collapse-panel-title {
      font-size: ${4*e.gridUnit}px;
      font-weight: ${e.typography.weights.bold};
      line-height: 130%;
    }

    .collapse-panel-subtitle {
      color: ${e.colors.grayscale.base};
      font-size: ${e.typography.sizes.s}px;
      font-weight: ${e.typography.weights.normal};
      line-height: 150%;
      margin-bottom: 0;
      padding-top: ${e.gridUnit}px;
    }

    .collapse-panel-asterisk {
      color: var(--semantic-error-base, ${e.colors.warning.dark1});
    }
    .validation-checkmark {
      width: ${4*e.gridUnit}px;
      height: ${4*e.gridUnit}px;
      margin-left: ${e.gridUnit}px;
      color: ${e.colors.success.base};
    }
  }
`)(e),...e}),U=i.iK.ul`
  margin-left: ${({theme:e})=>2*e.gridUnit}px;
  padding-inline-start: ${({theme:e})=>3*e.gridUnit}px;
`,P=["pivot_table_v2","table","paired_ttest"],M=["Email"],D="PNG",z="A4",q=[{label:(0,l.t)("< (Smaller than)"),value:"<"},{label:(0,l.t)("> (Larger than)"),value:">"},{label:(0,l.t)("<= (Smaller or equal)"),value:"<="},{label:(0,l.t)(">= (Larger or equal)"),value:">="},{label:(0,l.t)("== (Is equal)"),value:"=="},{label:(0,l.t)("!= (Is not equal)"),value:"!="},{label:(0,l.t)("Not null"),value:"not null"}],F=[{label:(0,l.t)("None"),value:0},{label:(0,l.t)("30 days"),value:30},{label:(0,l.t)("60 days"),value:60},{label:(0,l.t)("90 days"),value:90}],G=[{label:(0,l.t)("Dashboard"),value:"dashboard"},{label:(0,l.t)("Chart"),value:"chart"}],H={pdf:{label:(0,l.t)("Send as PDF"),value:"PDF"},png:{label:(0,l.t)("Send as PNG"),value:"PNG"},csv:{label:(0,l.t)("Send as CSV"),value:"CSV"},txt:{label:(0,l.t)("Send as text"),value:"TEXT"}},W=r.iv`
  margin-bottom: 0;
`,V=(0,i.iK)(m.default)`
  .ant-modal-body {
    height: 720px;
  }

  .control-label {
    margin-top: ${({theme:e})=>e.gridUnit}px;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }

  .inline-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    &.wrap {
      flex-wrap: wrap;
    }

    > div {
      flex: 1 1 auto;
    }
  }
`,K=i.iK.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  .switch-label {
    margin-left: 10px;
  }
`,J=i.iK.div`
  ${({theme:e})=>r.iv`
    flex: 1;
    margin-top: 0px;
    margin-bottom: ${4*e.gridUnit}px;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }

    .helper {
      display: block;
      color: ${e.colors.grayscale.base};
      font-size: ${e.typography.sizes.s}px;
      padding: ${e.gridUnit}px 0;
      text-align: left;
    }

    .required {
      margin-left: ${e.gridUnit/2}px;
      color: ${e.colors.error.base};
    }

    .input-container {
      display: flex;
      align-items: center;

      > div {
        width: 100%;
      }

      label {
        display: flex;
        margin-right: ${2*e.gridUnit}px;
      }

      i {
        margin: 0 ${e.gridUnit}px;
      }
    }

    input,
    textarea {
      flex: 1 1 auto;
    }

    input[disabled] {
      color: ${e.colors.grayscale.base};
    }

    textarea {
      height: 300px;
      resize: none;
    }

    input::placeholder,
    textarea::placeholder {
      color: ${e.colors.grayscale.light1};
    }

    textarea,
    input[type='text'],
    input[type='number'] {
      padding: ${e.gridUnit}px ${2*e.gridUnit}px;
      border-style: none;
      border: 1px solid ${e.colors.grayscale.light2};
      border-radius: ${e.gridUnit}px;

      &[name='description'] {
        flex: 1 1 auto;
      }
    }

    .input-label {
      margin-left: 10px;
    }
  `}
`,Y=(0,i.iK)(T.r4)`
  margin-top: ${({theme:e})=>0*e.gridUnit}px;
`,Q=(0,i.iK)(N.V)`
  margin-left: ${({theme:e})=>e.gridUnit}px;
`,ee=i.iK.div`
  ${({theme:e})=>r.iv`
    color: ${e.colors.primary.dark1};
    cursor: pointer;

    i {
      margin-right: ${2*e.gridUnit}px;
    }

    &.disabled {
      color: ${e.colors.grayscale.light1};
      cursor: default;
    }
  `}
`,te=i.iK.div`
  .inline-container .input-container {
    margin-left: 0;
  }
`,ne=e=>r.iv`
  margin-right: ${3*e.gridUnit}px;
`,ae={GENERAL_TITLE:(0,l.t)("General information"),ALERT_CONDITION_TITLE:(0,l.t)("Alert condition"),ALERT_CONTENTS_TITLE:(0,l.t)("Alert contents"),REPORT_CONTENTS_TITLE:(0,l.t)("Report contents"),SCHEDULE_TITLE:(0,l.t)("Schedule"),NOTIFICATION_TITLE:(0,l.t)("Notification method"),NAME_ERROR_TEXT:(0,l.t)("name"),OWNERS_ERROR_TEXT:(0,l.t)("owners"),CONTENT_ERROR_TEXT:(0,l.t)("content type"),DATABASE_ERROR_TEXT:(0,l.t)("database"),SQL_ERROR_TEXT:(0,l.t)("sql"),ALERT_CONDITION_ERROR_TEXT:(0,l.t)("alert condition"),CRONTAB_ERROR_TEXT:(0,l.t)("crontab"),WORKING_TIMEOUT_ERROR_TEXT:(0,l.t)("working timeout"),RECIPIENTS_ERROR_TEXT:(0,l.t)("recipients"),EMAIL_SUBJECT_ERROR_TEXT:(0,l.t)("email subject"),ERROR_TOOLTIP_MESSAGE:(0,l.t)("Not all required fields are complete. Please provide the following:")},le=({status:e="active",onClick:t})=>"hidden"===e?null:(0,S.BX)(ee,{className:e,onClick:()=>{"disabled"!==e&&t()},children:[(0,S.tZ)("i",{className:"fa fa-plus"})," ","active"===e?(0,l.t)("Add another notification method"):(0,l.t)("Add delivery method")]}),re=(0,E.ZP)((({addDangerToast:e,onAdd:t,onHide:n,show:i,alert:d=null,isReport:m=!1,addSuccessToast:E})=>{var N,C,Z,O,L,I,w,X;const j=(0,R.v9)((e=>e.user)),ee=(0,_.c)(),re=(null==ee?void 0:ee.ALERT_REPORTS_NOTIFICATION_METHODS)||M,[ie,oe]=(0,a.useState)(!0),[se,de]=(0,a.useState)(),[ce,ue]=(0,a.useState)(!0),[he,pe]=(0,a.useState)("dashboard"),[me,ve]=(0,a.useState)(D),[ge,be]=(0,a.useState)(!1),[Ee,Te]=(0,a.useState)(!1),[fe,_e]=(0,a.useState)(!1),[Ne,ye]=(0,a.useState)(z);(0,a.useEffect)((()=>{Te("PNG"===me),"PDF"===me&&_e(!0)}),[me]);const[Re,Se]=(0,a.useState)(!1),[xe,Ce]=(0,a.useState)([]),[Ze,Oe]=(0,a.useState)([]),[Ae,Le]=(0,a.useState)([]),[Ie,we]=(0,a.useState)({[y.bx.General]:{hasErrors:!1,name:ae.GENERAL_TITLE,errors:[]},[y.bx.Content]:{hasErrors:!1,name:m?ae.REPORT_CONTENTS_TITLE:ae.ALERT_CONTENTS_TITLE,errors:[]},[y.bx.Alert]:{hasErrors:!1,name:ae.ALERT_CONDITION_TITLE,errors:[]},[y.bx.Schedule]:{hasErrors:!1,name:ae.SCHEDULE_TITLE,errors:[]},[y.bx.Notification]:{hasErrors:!1,name:ae.NOTIFICATION_TITLE,errors:[]}}),[Be,Xe]=(0,a.useState)(""),ke=(e,t)=>{we((n=>({...n,[e]:{hasErrors:t.length>0,name:n[e].name,errors:t}})))},[je,$e]=(0,a.useState)(""),Ue=m?"report":"alert",Pe=null!==d,Me=(0,o.cr)(o.TT.AlertsAttachReports)||m,[De,ze]=(0,a.useState)("active"),[qe,Fe]=(0,a.useState)([]),[Ge,He]=(0,a.useState)(""),[We,Ve]=(0,a.useState)(!1),{ALERT_REPORTS_DEFAULT_WORKING_TIMEOUT:Ke,ALERT_REPORTS_DEFAULT_CRON_VALUE:Je,ALERT_REPORTS_DEFAULT_RETENTION:Ye}=(0,R.v9)((e=>{var t,n,a,l;const r=null==(t=e.common)?void 0:t.conf;return{ALERT_REPORTS_DEFAULT_WORKING_TIMEOUT:null!=(n=null==r?void 0:r.ALERT_REPORTS_DEFAULT_WORKING_TIMEOUT)?n:3600,ALERT_REPORTS_DEFAULT_CRON_VALUE:null!=(a=null==r?void 0:r.ALERT_REPORTS_DEFAULT_CRON_VALUE)?a:"0 0 * * *",ALERT_REPORTS_DEFAULT_RETENTION:null!=(l=null==r?void 0:r.ALERT_REPORTS_DEFAULT_RETENTION)?l:90}})),Qe={active:!0,creation_method:"alerts_reports",crontab:Je,log_retention:Ye,working_timeout:Ke,name:"",owners:[],recipients:[],sql:"",email_subject:"",validator_config_json:{},validator_type:"",force_screenshot:!1,grace_period:void 0},et=(e,t)=>{const n=[...qe];n[e]=t,qe[e].method!==t.method?(qe[e]=t,Fe(qe.filter(((t,n)=>n<=e))),qe.length-1>e&&ze("active"),void 0!==t.method&&"hidden"!==De&&ze("active")):Fe(n)},tt=e=>{const t=qe.slice();t.splice(e,1),Fe(t),ze("active")},{state:{loading:nt,resource:at,error:lt},fetchResource:rt,createResource:it,updateResource:ot,clearError:st}=(0,u.LE)("report",(0,l.t)("report"),e),dt=(0,a.useRef)(!0);(0,a.useEffect)((()=>()=>{dt.current=!1}),[]);const ct=()=>{st(),ue(!0),n(),dt.current&&(Fe([]),de({...Qe}),ze("active"))},ut=(0,a.useMemo)((()=>(e="",t,n)=>{const a=c().encode({filter:e,page:t,page_size:n});return s.Z.get({endpoint:`/api/v1/report/related/created_by?q=${a}`}).then((e=>({data:e.json.result.map((e=>({value:e.value,label:e.text}))),totalCount:e.json.count})))}),[]),ht=(0,a.useCallback)((e=>{const t=e||(null==se?void 0:se.database);if(!t||t.label)return null;let n;return xe.forEach((e=>{e.value!==t.value&&e.value!==t.id||(n=e)})),n}),[null==se?void 0:se.database,xe]),pt=(e,t)=>{de((n=>({...n,[e]:t})))},mt=(0,a.useMemo)((()=>(e="",t,n)=>{const a=c().encode({filter:e,page:t,page_size:n});return s.Z.get({endpoint:`/api/v1/report/related/database?q=${a}`}).then((e=>{const t=e.json.result.map((e=>({value:e.value,label:e.text})));return Ce(t),{data:t,totalCount:e.json.count}}))}),[]),vt=(null==se?void 0:se.database)&&!se.database.label;(0,a.useEffect)((()=>{vt&&pt("database",ht())}),[vt,ht]);const gt=(0,a.useMemo)((()=>(e="",t,n)=>{const a=c().encode_uri({filter:e,page:t,page_size:n});return s.Z.get({endpoint:`/api/v1/report/related/dashboard?q=${a}`}).then((e=>{const t=e.json.result.map((e=>({value:e.value,label:e.text})));return Oe(t),{data:t,totalCount:e.json.count}}))}),[]),bt=e=>{const t=e||(null==se?void 0:se.dashboard);if(!t||t.label)return null;let n;return Ze.forEach((e=>{e.value!==t.value&&e.value!==t.id||(n=e)})),n},Et=(0,a.useCallback)((e=>{const t=e||(null==se?void 0:se.chart);if(!t||t.label)return null;let n;return Ae.forEach((e=>{e.value!==t.value&&e.value!==t.id||(n=e)})),n}),[Ae,null==se?void 0:se.chart]),Tt=(null==se?void 0:se.chart)&&!(null!=se&&se.chart.label);(0,a.useEffect)((()=>{Tt&&pt("chart",Et())}),[Et,Tt]);const ft=(0,a.useMemo)((()=>(e="",t,n)=>{const a=c().encode_uri({filter:e,page:t,page_size:n});return s.Z.get({endpoint:`/api/v1/report/related/chart?q=${a}`}).then((e=>{const t=e.json.result.map((e=>({value:e.value,label:e.text})));return Le(t),{data:t,totalCount:e.json.count}}))}),[]),_t=e=>{const{target:{type:t,value:n,name:a}}=e,l="number"===t?parseInt(n,10)||null:n;pt(a,l),"name"===a&&St()},Nt=e=>{const{target:t}=e,n=+t.value;pt(t.name,0===n?void 0:n?Math.max(n,1):n)},yt=()=>{(()=>{var e,t;const n=[];null!=se&&null!=(e=se.name)&&e.length||n.push(ae.NAME_ERROR_TEXT),null!=se&&null!=(t=se.owners)&&t.length||n.push(ae.OWNERS_ERROR_TEXT),ke(y.bx.General,n)})(),(()=>{const e=[];"dashboard"===he&&null!=se&&se.dashboard||"chart"===he&&null!=se&&se.chart||e.push(ae.CONTENT_ERROR_TEXT),ke(y.bx.Content,e)})(),m||(()=>{var e,t,n;const a=[];null!=se&&se.database||a.push(ae.DATABASE_ERROR_TEXT),null!=se&&null!=(e=se.sql)&&e.length||a.push(ae.SQL_ERROR_TEXT),(Re||null!=se&&null!=(t=se.validator_config_json)&&t.op)&&(Re||void 0!==(null==se||null==(n=se.validator_config_json)?void 0:n.threshold))||a.push(ae.ALERT_CONDITION_ERROR_TEXT),ke(y.bx.Alert,a)})(),(()=>{var e;const t=[];null!=se&&null!=(e=se.crontab)&&e.length||t.push(ae.CRONTAB_ERROR_TEXT),null!=se&&se.working_timeout||t.push(ae.WORKING_TIMEOUT_ERROR_TEXT),ke(y.bx.Schedule,t)})(),(()=>{const e=(()=>{if(!qe.length)return!1;let e=!1;return qe.forEach((t=>{var n;t.method&&null!=(n=t.recipients)&&n.length&&(e=!0)})),e})()?[]:[ae.RECIPIENTS_ERROR_TEXT];We&&e.push(ae.EMAIL_SUBJECT_ERROR_TEXT),ke(y.bx.Notification,e)})()};(0,a.useEffect)((()=>{if(Pe&&(null==se||!se.id||(null==d?void 0:d.id)!==se.id||ce&&i)){if(null!==(null==d?void 0:d.id)&&!nt&&!lt){const e=d.id||0;rt(e)}}else!Pe&&(!se||se.id||ce&&i)&&(de({...Qe,owners:j?[{value:j.userId,label:`${j.firstName} ${j.lastName}`}]:[]}),Fe([{recipients:"",options:re,method:"Email"}]),ze("active"))}),[d]),(0,a.useEffect)((()=>{if(at){console.log(at,"###############resource#########################");const e=(at.recipients||[]).map((e=>{const t="string"==typeof e.recipient_config_json?JSON.parse(e.recipient_config_json):{};return{method:e.type,recipients:t.target||e.recipient_config_json,options:re}}));Fe(e),ze(e.length===re.length?"hidden":"active"),pe(at.chart?"chart":"dashboard"),ve(at.report_format||D),ye(at.paper_size||z);const t="string"==typeof at.validator_config_json?JSON.parse(at.validator_config_json):at.validator_config_json;Se("not null"===at.validator_type),at.chart&&$e(at.chart.viz_type),be(at.force_screenshot),de({...at,chart:at.chart?Et(at.chart)||{value:at.chart.id,label:at.chart.slice_name}:void 0,dashboard:at.dashboard?bt(at.dashboard)||{value:at.dashboard.id,label:at.dashboard.dashboard_title}:void 0,database:at.database?ht(at.database)||{value:at.database.id,label:at.database.database_name}:void 0,owners:((null==d?void 0:d.owners)||[]).map((e=>({value:e.value||e.id,label:e.label||`${e.first_name} ${e.last_name}`}))),validator_config_json:"not null"===at.validator_type?{op:"not null"}:t})}}),[at]);const Rt=se||{};(0,a.useEffect)((()=>{yt(),St()}),[Rt.name,Rt.owners,Rt.database,Rt.sql,Rt.validator_config_json,Rt.crontab,Rt.working_timeout,Rt.dashboard,Rt.chart,he,qe,Re,We]),(0,a.useEffect)((()=>{(()=>{const e=[y.bx.General,y.bx.Content,m?void 0:y.bx.Alert,y.bx.Schedule,y.bx.Notification].some((e=>e&&Ie[e].hasErrors)),t=e?(e=>{const t=[];return Object.values(e).forEach((e=>{if(e.hasErrors){const n=`${e.name}: `;t.push(n+e.errors.join(", "))}})),(0,S.BX)("div",{children:[ae.ERROR_TOOLTIP_MESSAGE,(0,S.tZ)(U,{children:t.map((e=>(0,S.tZ)("li",{children:e},e)))})]})})(Ie):"";Xe(t),oe(e)})()}),[Ie]),ce&&i&&ue(!1);const St=()=>{var e,t;if("chart"===he)null!=se&&se.name||null!=se&&null!=(e=se.chart)&&e.label?He(`${null==se?void 0:se.name}: ${(null==se||null==(t=se.chart)?void 0:t.label)||""}`):He("");else if("dashboard"===he){var n,a;null!=se&&se.name||null!=se&&null!=(n=se.dashboard)&&n.label?He(`${null==se?void 0:se.name}: ${(null==se||null==(a=se.dashboard)?void 0:a.label)||""}`):He("")}else He("")},xt=e=>{Ve(e)};return(0,S.tZ)(V,{className:"no-content-padding",responsive:!0,disablePrimaryButton:ie,primaryTooltipMessage:Be,onHandledPrimaryAction:()=>{var e,n,a;const r=[];qe.forEach((e=>{e.method&&e.recipients.length&&r.push({recipient_config_json:{target:e.recipients},type:e.method})}));const i="chart"===he&&!m,o={...se,type:m?"Report":"Alert",force_screenshot:i||ge,validator_type:Re?"not null":"operator",validator_config_json:Re?{}:null==se?void 0:se.validator_config_json,chart:"chart"===he?null==se||null==(e=se.chart)?void 0:e.value:null,dashboard:"dashboard"===he?null==se||null==(n=se.dashboard)?void 0:n.value:null,custom_width:Ee?null==se?void 0:se.custom_width:void 0,database:null==se||null==(a=se.database)?void 0:a.value,owners:((null==se?void 0:se.owners)||[]).map((e=>e.value||e.id)),recipients:r,report_format:me||D,paper_size:Ne||z};if(o.recipients&&!o.recipients.length&&delete o.recipients,o.context_markdown="string",Pe){if(null!=se&&se.id){const e=se.id;delete o.id,delete o.created_by,delete o.last_eval_dttm,delete o.last_state,delete o.last_value,delete o.last_value_row_json,ot(e,o).then((e=>{e&&(E((0,l.t)("%s updated",o.type)),t&&t(),ct())}))}}else se&&it(o).then((e=>{e&&(E((0,l.t)("%s updated",o.type)),t&&t(e),ct())}))},onHide:ct,primaryButtonName:Pe?(0,l.t)("Save"):(0,l.t)("Add"),show:i,width:"500px",centered:!0,title:(0,S.tZ)("h4",{children:(()=>{let e;switch(!0){case Pe&&m:e=(0,l.t)("Edit Report");break;case Pe:e=(0,l.t)("Edit Alert");break;case m:e=(0,l.t)("Add Report");break;default:e=(0,l.t)("Add Alert")}return e})()}),children:(0,S.BX)(v.Z,{expandIconPosition:"right",defaultActiveKey:"general",accordion:!0,css:r.iv`
          border: 'none';
        `,children:[(0,S.tZ)($,{header:(0,S.tZ)(k,{title:ae.GENERAL_TITLE,subtitle:(0,l.t)("Set up basic details, such as name and description."),validateCheckStatus:!Ie[y.bx.General].hasErrors,testId:"general-information-panel"}),children:(0,S.BX)("div",{className:"header-section",children:[(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[m?(0,l.t)("Report name"):(0,l.t)("Alert name"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)("input",{type:"text",name:"name",value:se?se.name:"",placeholder:m?(0,l.t)("Enter report name"):(0,l.t)("Enter alert name"),onChange:_t})})]}),(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Owners"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.qb,{ariaLabel:(0,l.t)("Owners"),allowClear:!0,name:"owners",mode:"multiple",placeholder:(0,l.t)("Select owners"),value:(null==se?void 0:se.owners)||[],options:ut,onChange:e=>{pt("owners",e||[])}})})]}),(0,S.BX)(J,{children:[(0,S.tZ)("div",{className:"control-label",children:(0,l.t)("Description")}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)("input",{type:"text",name:"description",value:se&&se.description||"",placeholder:(0,l.t)("Include description to be sent with %s",Ue),onChange:_t})})]}),(0,S.BX)(K,{children:[(0,S.tZ)(p.r,{checked:!!se&&se.active,defaultChecked:!0,onChange:e=>{pt("active",e)}}),(0,S.tZ)("div",{className:"switch-label",children:m?(0,l.t)("Report is active"):(0,l.t)("Alert is active")})]})]})},"general"),!m&&(0,S.BX)($,{header:(0,S.tZ)(k,{title:ae.ALERT_CONDITION_TITLE,subtitle:(0,l.t)("Define the database, SQL query, and triggering conditions for alert."),validateCheckStatus:!Ie[y.bx.Alert].hasErrors,testId:"alert-condition-panel"}),children:[(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Database"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.qb,{ariaLabel:(0,l.t)("Database"),name:"source",placeholder:(0,l.t)("Select database"),value:null!=se&&null!=(N=se.database)&&N.label&&null!=se&&null!=(C=se.database)&&C.value?{value:se.database.value,label:se.database.label}:void 0,options:mt,onChange:e=>{pt("database",e||[])}})})]}),(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("SQL Query"),(0,S.tZ)(Q,{tooltip:(0,l.t)('The result of this query must be a value capable of numeric interpretation e.g. 1, 1.0, or "1" (compatible with Python\'s float() function).')}),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(f.Z,{name:"sql",language:"sql",offerEditInModal:!1,minLines:15,maxLines:15,onChange:e=>{pt("sql",e||"")},readOnly:!1,initialValue:null==at?void 0:at.sql},null==se?void 0:se.id)]}),(0,S.BX)("div",{className:"inline-container wrap",children:[(0,S.BX)(J,{css:W,children:[(0,S.BX)("div",{className:"control-label",css:ne,children:[(0,l.t)("Trigger Alert If..."),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Condition"),onChange:e=>{var t;Se("not null"===e);const n={op:e,threshold:se?null==(t=se.validator_config_json)?void 0:t.threshold:void 0};pt("validator_config_json",n)},placeholder:(0,l.t)("Condition"),value:(null==se||null==(Z=se.validator_config_json)?void 0:Z.op)||void 0,options:q,css:ne})})]}),(0,S.BX)(J,{css:W,children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Value")," ",!Re&&(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)("input",{type:"number",name:"threshold",disabled:Re,value:void 0===(null==se||null==(O=se.validator_config_json)?void 0:O.threshold)||Re?"":se.validator_config_json.threshold,placeholder:(0,l.t)("Value"),onChange:e=>{var t;const{target:n}=e,a={op:se?null==(t=se.validator_config_json)?void 0:t.op:void 0,threshold:n.value};pt("validator_config_json",a)}})})]})]})]},"condition"),(0,S.BX)($,{header:(0,S.tZ)(k,{title:m?ae.REPORT_CONTENTS_TITLE:ae.ALERT_CONTENTS_TITLE,subtitle:(0,l.t)("Customize data source, filters, and layout."),validateCheckStatus:!Ie[y.bx.Content].hasErrors,testId:"contents-panel"}),children:[(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Content type"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Select content type"),onChange:e=>{be(!1),pe(e)},value:he,options:G,placeholder:(0,l.t)("Select content type")})]}),(0,S.tZ)(J,{children:"chart"===he?(0,S.BX)(S.HY,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Select chart"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(T.qb,{ariaLabel:(0,l.t)("Chart"),name:"chart",value:null!=se&&null!=(L=se.chart)&&L.label&&null!=se&&null!=(I=se.chart)&&I.value?{value:se.chart.value,label:se.chart.label}:void 0,options:ft,onChange:e=>{(e=>{s.Z.get({endpoint:`/api/v1/chart/${e.value}`}).then((e=>$e(e.json.result.viz_type)))})(e),pt("chart",e||void 0),pt("dashboard",null)},placeholder:(0,l.t)("Select chart to use")})]}):(0,S.BX)(S.HY,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Select dashboard"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(T.qb,{ariaLabel:(0,l.t)("Dashboard"),name:"dashboard",value:null!=se&&null!=(w=se.dashboard)&&w.label&&null!=se&&null!=(X=se.dashboard)&&X.value?{value:se.dashboard.value,label:se.dashboard.label}:void 0,options:gt,onChange:e=>{pt("dashboard",e||void 0),pt("chart",null)},placeholder:(0,l.t)("Select dashboard to use")})]})}),(0,S.tZ)(J,{css:["PDF","TEXT","CSV"].includes(me)&&W,children:Me&&(0,S.BX)(S.HY,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Content format"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Select format"),onChange:e=>{ve(e),console.log(e,"reportFormat")},value:me,options:"dashboard"===he?["pdf","png"].map((e=>H[e])):P.includes(je)?Object.values(H):["pdf","png","csv"].map((e=>H[e])),placeholder:(0,l.t)("Select format")})]})}),Ee&&(0,S.BX)(J,{css:!m&&"chart"===he&&W,children:[(0,S.tZ)("div",{className:"control-label",children:(0,l.t)("Screenshot width")}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(h.Rn,{type:"number",name:"custom_width",value:(null==se?void 0:se.custom_width)||void 0,min:600,max:2400,placeholder:(0,l.t)("Input custom width in pixels"),onChange:e=>{pt("custom_width",e)}})})]}),fe&&(0,S.BX)(J,{css:!m&&"chart"===he&&W,children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Paper size"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.Ph,{value:Ne,onChange:e=>{pt("paper_size",e),ye(e)},options:[{value:"A4",label:"A4"},{value:"A3",label:"A3"}]})})]}),(m||"dashboard"===he)&&(0,S.tZ)("div",{className:"inline-container",children:(0,S.tZ)(Y,{className:"checkbox",checked:ge,onChange:e=>{be(e.target.checked)},children:(0,l.t)("Ignore cache when generating report")})})]},"contents"),(0,S.BX)($,{header:(0,S.tZ)(k,{title:ae.SCHEDULE_TITLE,subtitle:(0,l.t)("Define delivery schedule, timezone, and frequency settings."),validateCheckStatus:!Ie[y.bx.Schedule].hasErrors,testId:"schedule-panel"}),children:[(0,S.tZ)(A,{value:(null==se?void 0:se.crontab)||"",onChange:e=>pt("crontab",e)}),(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Timezone")," ",(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)(g.Z,{onTimezoneChange:e=>{pt("timezone",e)},timezone:null==se?void 0:se.timezone,minWidth:"100%"})]}),(0,S.BX)(J,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Log retention"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(T.Ph,{ariaLabel:(0,l.t)("Log retention"),placeholder:(0,l.t)("Log retention"),onChange:e=>{pt("log_retention",e)},value:null==se?void 0:se.log_retention,options:F,sortComparator:(0,b.mj)("value")})})]}),(0,S.tZ)(J,{css:W,children:m?(0,S.BX)(S.HY,{children:[(0,S.BX)("div",{className:"control-label",children:[(0,l.t)("Working timeout"),(0,S.tZ)("span",{className:"required",children:"*"})]}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(x,{min:1,name:"working_timeout",value:(null==se?void 0:se.working_timeout)||"",placeholder:(0,l.t)("Time in seconds"),onChange:Nt,timeUnit:(0,l.t)("seconds")})})]}):(0,S.BX)(S.HY,{children:[(0,S.tZ)("div",{className:"control-label",children:(0,l.t)("Grace period")}),(0,S.tZ)("div",{className:"input-container",children:(0,S.tZ)(x,{min:1,name:"grace_period",value:(null==se?void 0:se.grace_period)||"",placeholder:(0,l.t)("Time in seconds"),onChange:Nt,timeUnit:(0,l.t)("seconds")})})]})})]},"schedule"),(0,S.BX)($,{header:(0,S.tZ)(k,{title:ae.NOTIFICATION_TITLE,subtitle:(0,l.t)("Choose notification method and recipients."),validateCheckStatus:!Ie[y.bx.Notification].hasErrors,testId:"notification-method-panel"}),children:[qe.map(((e,t)=>(0,S.tZ)(te,{children:(0,S.tZ)(B,{setting:e,index:t,onUpdate:et,onRemove:tt,onInputChange:_t,email_subject:(null==se?void 0:se.email_subject)||"",defaultSubject:Ge||"",setErrorSubject:xt},`NotificationMethod-${t}`)}))),re.length>qe.length&&(0,S.tZ)(le,{status:De,onClick:()=>{Fe([...qe,{recipients:"",options:re.filter((e=>!qe.reduce(((t,n)=>t||e===n.method),!1)))}]),ze(qe.length===re.length?"hidden":"disabled")}})]},"notification")]})})}))},90335:(e,t,n)=>{var a,l,r;n.d(t,{Z9:()=>a,bx:()=>r,ud:()=>l}),function(e){e.Success="Success",e.Working="Working",e.Error="Error",e.Noop="Not triggered",e.Grace="On Grace"}(a||(a={})),function(e){e.Email="Email",e.Slack="Slack"}(l||(l={})),function(e){e.General="generalSection",e.Content="contentSection",e.Alert="alertConditionSection",e.Schedule="scheduleSection",e.Notification="notificationSection"}(r||(r={}))}}]);
//# sourceMappingURL=3d305b52bb1f47ed3699.chunk.js.map