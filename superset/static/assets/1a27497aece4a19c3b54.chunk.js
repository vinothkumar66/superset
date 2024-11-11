"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[1090],{6882:(e,t,a)=>{a.d(t,{UD:()=>s,z1:()=>p});var n=a(41609),i=a.n(n),l=a(15926),r=a.n(l),o=a(55786),c=a(31069),d=a(44818);const s=" : ",u=(e,t)=>`${e}${s}${t}`,h=(e,t)=>e.replace("T00:00:00","")||(t?"-∞":"∞"),m=(e,t="col")=>{const a=e.split(s);return 1===a.length?e:`${h(a[0],!0)} ≤ ${t} < ${h(a[1])}`},p=async(e,t="col",a)=>{let n,l;if(i()(a))n=r().encode_uri(e),l=`/api/v1/time_range/?q=${n}`;else{const t=(0,o.Z)(a).map((t=>({timeRange:e,shift:t})));n=r().encode_uri([{timeRange:e},...t]),l=`/api/v1/time_range/?q=${n}`}try{var p;const e=await c.Z.get({endpoint:l});if(i()(a)){var v,g,Z,f;const a=u((null==e||null==(v=e.json)||null==(g=v.result[0])?void 0:g.since)||"",(null==e||null==(Z=e.json)||null==(f=Z.result[0])?void 0:f.until)||"");return{value:m(a,t)}}const n=null==e||null==(p=e.json)?void 0:p.result.map((e=>u(e.since,e.until)));return{value:n.slice(1).map((e=>((e,t,a="col")=>{const n=e.split(s),i=t.split(s);return`${a}: ${h(n[0],!0)} to ${h(n[1])} vs\n  ${h(i[0],!0)} to ${h(i[1])}`})(n[0],e,t)))}}catch(e){const t=await(0,d.O$)(e);return{error:t.message||t.error||e.statusText}}}},62276:(e,t,a)=>{a.d(t,{M:()=>o,S:()=>r});var n=a(60593),i=a(51995);const l=n.Z.RangePicker,r=(0,i.iK)(l)`
  border-radius: ${({theme:e})=>e.gridUnit}px;
`,o=n.Z},99075:(e,t,a)=>{a.d(t,{J:()=>l});var n=a(19181),i=a(35944);const l=e=>(0,i.tZ)(n.Z,{...e})},27845:(e,t,a)=>{a.d(t,{Z:()=>c,j:()=>r});var n=a(67294),i=a(99075),l=a(35944);const r=()=>{var e;return null==(e=document.getElementById("controlSections"))?void 0:e.lastElementChild},o=e=>{var t,a;const n=null==(t=window)?void 0:t.innerHeight,i=null==e||null==(a=e.getBoundingClientRect())?void 0:a.top;return n&&i?i/n:0},c=({getPopupContainer:e,getVisibilityRatio:t=o,visible:a,destroyTooltipOnHide:c=!1,...d})=>{const s=(0,n.useRef)(),[u,h]=(0,n.useState)(void 0===a?d.defaultVisible:a),[m,p]=n.useState("right"),v=(0,n.useCallback)((()=>{const e=t(s.current);p(e<.35&&"rightTop"!==m?"rightTop":e>.65&&"rightBottom"!==m?"rightBottom":"right")}),[t]),g=(0,n.useCallback)((e=>{const t=r();t&&t.style.setProperty("overflow-y",e?"hidden":"auto","important")}),[v]),Z=(0,n.useCallback)((t=>(s.current=t,(null==e?void 0:e(t))||document.body)),[v,e]),f=(0,n.useCallback)((e=>{void 0===e&&g(e),h(!!e),null==d.onVisibleChange||d.onVisibleChange(!!e)}),[d,g]),y=(0,n.useCallback)((e=>{"Escape"===e.key&&(h(!1),null==d.onVisibleChange||d.onVisibleChange(!1))}),[d]);return(0,n.useEffect)((()=>{void 0!==a&&h(!!a)}),[a]),(0,n.useEffect)((()=>{void 0!==u&&g(u)}),[u,g]),(0,n.useEffect)((()=>(u&&document.addEventListener("keydown",y),()=>{document.removeEventListener("keydown",y)})),[y,u]),(0,n.useEffect)((()=>{u&&v()}),[u,v]),(0,l.tZ)(i.J,{...d,visible:u,arrowPointAtCenter:!0,placement:m,onVisibleChange:f,getPopupContainer:Z,destroyTooltipOnHide:c})}},51137:(e,t,a)=>{a.d(t,{Z:()=>K});var n=a(67294),i=a(51995),l=a(11965),r=a(3297),o=a(5364),c=a(6882),d=a(61988),s=a(35932),u=a(82342),h=a(74069),m=a(4715),p=a(13322),v=a(81315),g=a(58593),Z=a(12515),f=a(27600),y=a(54076),b=a(27845),C=a(61314),w=a(87183),E=a(35944);function D(e){let t="Last week";return C.bk.has(e.value)?t=e.value:e.onChange(t),(0,E.BX)(E.HY,{children:[(0,E.tZ)("div",{className:"section-title",children:(0,d.t)("Configure Time Range: Last...")}),(0,E.tZ)(w.Y.Group,{value:t,onChange:t=>e.onChange(t.target.value),children:C.Sm.map((({value:e,label:t})=>(0,E.tZ)(w.Y,{value:e,className:"vertical-radio",children:t},e)))})]})}var $=a(31209);function x({onChange:e,value:t}){return(0,n.useEffect)((()=>{C.LY.has(t)||e($.gT)}),[e,t]),C.LY.has(t)?(0,E.BX)(E.HY,{children:[(0,E.tZ)("div",{className:"section-title",children:(0,d.t)("Configure Time Range: Previous...")}),(0,E.tZ)(w.Y.Group,{value:t,onChange:t=>e(t.target.value),children:C._S.map((({value:e,label:t})=>(0,E.tZ)(w.Y,{value:e,className:"vertical-radio",children:t},e)))})]}):null}function T({onChange:e,value:t}){return(0,n.useEffect)((()=>{C.Zn.has(t)||e($.jk)}),[t]),C.Zn.has(t)?(0,E.BX)(E.HY,{children:[(0,E.tZ)("div",{className:"section-title",children:(0,d.t)("Configure Time Range: Current...")}),(0,E.tZ)(w.Y.Group,{value:t,onChange:t=>{let a=t.target.value;a=a.trim(),""!==a&&e(a)},children:C.x9.map((({value:e,label:t})=>(0,E.tZ)(w.Y,{value:e,className:"vertical-radio",children:t},e)))})]}):null}var M=a(93754),S=a.n(M),X=a(28216),A=a(58146),N=a(9875),k=a(62276),V=a(9882);function L(e){var t;const{customRange:a,matchedFlag:n}=(0,C.c_)(e.value);n||e.onChange((0,C.jK)(a));const{sinceDatetime:i,sinceMode:l,sinceGrain:r,sinceGrainValue:o,untilDatetime:c,untilMode:s,untilGrain:u,untilGrainValue:h,anchorValue:p,anchorMode:g}={...a};function Z(t,n){e.onChange((0,C.jK)({...a,[t]:n}))}function f(t,n){S()(n)&&n>0&&e.onChange((0,C.jK)({...a,[t]:n}))}const y=(0,X.v9)((e=>{var t;return null==e||null==(t=e.common)?void 0:t.locale})),b=null==(t=A.locales[C.ZU[y]])?void 0:t.DatePicker;return(0,E.BX)("div",{children:[(0,E.tZ)("div",{className:"section-title",children:(0,d.t)("Configure custom time range")}),(0,E.BX)(m.X2,{gutter:24,children:[(0,E.BX)(m.JX,{span:12,children:[(0,E.BX)("div",{className:"control-label",children:[(0,d.t)("START (INCLUSIVE)")," ",(0,E.tZ)(V.V,{tooltip:(0,d.t)("Start date included in time range"),placement:"right"})]}),(0,E.tZ)(v.Z,{ariaLabel:(0,d.t)("START (INCLUSIVE)"),options:C._d,value:l,onChange:e=>Z("sinceMode",e)}),"specific"===l&&(0,E.tZ)(m.X2,{children:(0,E.tZ)(k.M,{showTime:!0,defaultValue:(0,C.DL)(i),onChange:e=>Z("sinceDatetime",e.format(C.KZ)),allowClear:!1,locale:b})}),"relative"===l&&(0,E.BX)(m.X2,{gutter:8,children:[(0,E.tZ)(m.JX,{span:11,children:(0,E.tZ)(N.Rn,{placeholder:(0,d.t)("Relative quantity"),value:Math.abs(o),min:1,defaultValue:1,onChange:e=>f("sinceGrainValue",e||1),onStep:e=>f("sinceGrainValue",e||1)})}),(0,E.tZ)(m.JX,{span:13,children:(0,E.tZ)(v.Z,{ariaLabel:(0,d.t)("Relative period"),options:C.kj,value:r,onChange:e=>Z("sinceGrain",e)})})]})]}),(0,E.BX)(m.JX,{span:12,children:[(0,E.BX)("div",{className:"control-label",children:[(0,d.t)("END (EXCLUSIVE)")," ",(0,E.tZ)(V.V,{tooltip:(0,d.t)("End date excluded from time range"),placement:"right"})]}),(0,E.tZ)(v.Z,{ariaLabel:(0,d.t)("END (EXCLUSIVE)"),options:C.hj,value:s,onChange:e=>Z("untilMode",e)}),"specific"===s&&(0,E.tZ)(m.X2,{children:(0,E.tZ)(k.M,{showTime:!0,defaultValue:(0,C.DL)(c),onChange:e=>Z("untilDatetime",e.format(C.KZ)),allowClear:!1,locale:b})}),"relative"===s&&(0,E.BX)(m.X2,{gutter:8,children:[(0,E.tZ)(m.JX,{span:11,children:(0,E.tZ)(N.Rn,{placeholder:(0,d.t)("Relative quantity"),value:h,min:1,defaultValue:1,onChange:e=>f("untilGrainValue",e||1),onStep:e=>f("untilGrainValue",e||1)})}),(0,E.tZ)(m.JX,{span:13,children:(0,E.tZ)(v.Z,{ariaLabel:(0,d.t)("Relative period"),options:C.Ae,value:u,onChange:e=>Z("untilGrain",e)})})]})]})]}),"relative"===l&&"relative"===s&&(0,E.BX)("div",{className:"control-anchor-to",children:[(0,E.tZ)("div",{className:"control-label",children:(0,d.t)("Anchor to")}),(0,E.BX)(m.X2,{align:"middle",children:[(0,E.tZ)(m.JX,{children:(0,E.BX)(w.Y.Group,{onChange:function(t){const n=t.target.value;"now"===n?e.onChange((0,C.jK)({...a,anchorValue:"now",anchorMode:n})):e.onChange((0,C.jK)({...a,anchorValue:C.V7,anchorMode:n}))},defaultValue:"now",value:g,children:[(0,E.tZ)(w.Y,{value:"now",children:(0,d.t)("NOW")},"now"),(0,E.tZ)(w.Y,{value:"specific",children:(0,d.t)("Date/Time")},"specific")]})}),"now"!==g&&(0,E.tZ)(m.JX,{children:(0,E.tZ)(k.M,{showTime:!0,defaultValue:(0,C.DL)(p),onChange:e=>Z("anchorValue",e.format(C.KZ)),allowClear:!1,className:"control-anchor-to-datetime",locale:b})})]})]})]})}const B=(0,E.BX)(E.HY,{children:[(0,E.BX)("div",{children:[(0,E.tZ)("h3",{children:"DATETIME"}),(0,E.tZ)("p",{children:(0,d.t)("Return to specific datetime.")}),(0,E.tZ)("h4",{children:(0,d.t)("Syntax")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:"datetime([string])"})}),(0,E.tZ)("h4",{children:(0,d.t)("Example")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:'datetime("2020-03-01 12:00:00")\ndatetime("now")\ndatetime("last year")'})})]}),(0,E.BX)("div",{children:[(0,E.tZ)("h3",{children:"DATEADD"}),(0,E.tZ)("p",{children:(0,d.t)("Moves the given set of dates by a specified interval.")}),(0,E.tZ)("h4",{children:(0,d.t)("Syntax")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:"dateadd([datetime], [integer], [dateunit])\ndateunit = (year | quarter | month | week | day | hour | minute | second)"})}),(0,E.tZ)("h4",{children:(0,d.t)("Example")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:'dateadd(datetime("today"), -13, day)\ndateadd(datetime("2020-03-01"), 2, day)'})})]}),(0,E.BX)("div",{children:[(0,E.tZ)("h3",{children:"DATETRUNC"}),(0,E.tZ)("p",{children:(0,d.t)("Truncates the specified date to the accuracy specified by the date unit.")}),(0,E.tZ)("h4",{children:(0,d.t)("Syntax")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:"datetrunc([datetime], [dateunit])\ndateunit = (year | quarter | month | week)"})}),(0,E.tZ)("h4",{children:(0,d.t)("Example")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:'datetrunc(datetime("2020-03-01"), week)\ndatetrunc(datetime("2020-03-01"), month)'})})]}),(0,E.BX)("div",{children:[(0,E.tZ)("h3",{children:"LASTDAY"}),(0,E.tZ)("p",{children:(0,d.t)("Get the last date by the date unit.")}),(0,E.tZ)("h4",{children:(0,d.t)("Syntax")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:"lastday([datetime], [dateunit])\ndateunit = (year | month | week)"})}),(0,E.tZ)("h4",{children:(0,d.t)("Example")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:'lastday(datetime("today"), month)'})})]}),(0,E.BX)("div",{children:[(0,E.tZ)("h3",{children:"HOLIDAY"}),(0,E.tZ)("p",{children:(0,d.t)("Get the specify date for the holiday")}),(0,E.tZ)("h4",{children:(0,d.t)("Syntax")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:"holiday([string])\nholiday([holiday string], [datetime])\nholiday([holiday string], [datetime], [country name])"})}),(0,E.tZ)("h4",{children:(0,d.t)("Example")}),(0,E.tZ)("pre",{children:(0,E.tZ)("code",{children:'holiday("new year")\nholiday("christmas", datetime("2019"))\nholiday("christmas", dateadd(datetime("2019"), 1, year))\nholiday("christmas", datetime("2 years ago"))\nholiday("Easter Monday", datetime("2019"), "UK")'})})]})]}),R=e=>{const t=(0,i.Fg)();return(0,E.tZ)(l.ms,{children:({css:a})=>(0,E.tZ)(g.u,{overlayClassName:a`
            .ant-tooltip-content {
              min-width: ${125*t.gridUnit}px;
              max-height: 410px;
              overflow-y: scroll;

              .ant-tooltip-inner {
                max-width: ${125*t.gridUnit}px;
                h3 {
                  font-size: ${t.typography.sizes.m}px;
                  font-weight: ${t.typography.weights.bold};
                }
                h4 {
                  font-size: ${t.typography.sizes.m}px;
                  font-weight: ${t.typography.weights.bold};
                }
                pre {
                  border: none;
                  text-align: left;
                  word-break: break-word;
                  font-size: ${t.typography.sizes.s}px;
                }
              }
            }
          `,...e})})};function I(e){return(0,E.tZ)(R,{title:B,...e})}function Y(e){return e.includes(c.UD)?e:e.startsWith("Last")?[e,""].join(c.UD):e.startsWith("Next")?["",e].join(c.UD):c.UD}function G(e){const t=Y(e.value||""),[a,n]=t.split(c.UD);function i(t,i){"since"===t?e.onChange(`${i}${c.UD}${n}`):e.onChange(`${a}${c.UD}${i}`)}return t!==e.value&&e.onChange(Y(e.value||"")),(0,E.BX)(E.HY,{children:[(0,E.BX)("div",{className:"section-title",children:[(0,d.t)("Configure Advanced Time Range "),(0,E.tZ)(I,{placement:"rightBottom",children:(0,E.tZ)("i",{className:"fa fa-info-circle text-muted"})})]}),(0,E.BX)("div",{className:"control-label",children:[(0,d.t)("START (INCLUSIVE)")," ",(0,E.tZ)(V.V,{tooltip:(0,d.t)("Start date included in time range"),placement:"right"})]}),(0,E.tZ)(N.II,{value:a,onChange:e=>i("since",e.target.value)},"since"),(0,E.BX)("div",{className:"control-label",children:[(0,d.t)("END (EXCLUSIVE)")," ",(0,E.tZ)(V.V,{tooltip:(0,d.t)("End date excluded from time range"),placement:"right"})]}),(0,E.tZ)(N.II,{value:n,onChange:e=>i("until",e.target.value)},"until")]})}const U="#45BED6",_=i.iK.div`
  ${({theme:e,isActive:t,isPlaceholder:a})=>l.iv`
    width: 100%;
    height: ${8*e.gridUnit}px;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    padding: 0 ${3*e.gridUnit}px;

    background-color: ${e.colors.grayscale.light5};

    border: 1px solid
      ${t?U:e.colors.grayscale.light2};
    border-radius: ${e.borderRadius}px;

    cursor: pointer;

    transition: border-color 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
    :hover,
    :focus {
      border-color: ${U};
    }

    .date-label-content {
      color: ${a?e.colors.grayscale.light1:e.colors.grayscale.dark1};
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      flex-shrink: 1;
      white-space: nowrap;
    }

    span[role='img'] {
      margin-left: auto;
      padding-left: ${e.gridUnit}px;

      & > span[role='img'] {
        line-height: 0;
      }
    }
  `}
`,P=(0,n.forwardRef)(((e,t)=>{const a=(0,i.Fg)();return(0,E.BX)(_,{...e,tabIndex:0,children:[(0,E.tZ)("span",{className:"date-label-content",ref:t,children:"string"==typeof e.label?(0,d.t)(e.label):e.label}),(0,E.tZ)(p.Z.CalendarOutlined,{iconSize:"s",iconColor:a.colors.grayscale.base})]})})),j=(0,i.iK)(v.Z)`
  width: 272px;
`,z=i.iK.div`
  ${({theme:e})=>l.iv`
    .ant-row {
      margin-top: 8px;
    }

    .ant-input-number {
      width: 100%;
    }

    .ant-picker {
      padding: 4px 17px 4px;
      border-radius: 4px;
      width: 100%;
    }

    .ant-divider-horizontal {
      margin: 16px 0;
    }

    .control-label {
      font-size: 11px;
      font-weight: ${e.typography.weights.medium};
      color: ${e.colors.grayscale.light2};
      line-height: 16px;
      text-transform: uppercase;
      margin: 8px 0;
    }

    .vertical-radio {
      display: block;
      height: 40px;
      line-height: 40px;
    }

    .section-title {
      font-style: normal;
      font-weight: ${e.typography.weights.bold};
      font-size: 15px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    .control-anchor-to {
      margin-top: 16px;
    }

    .control-anchor-to-datetime {
      width: 217px;
    }

    .footer {
      text-align: right;
    }
  `}
`,F=i.iK.span`
  span {
    margin-right: ${({theme:e})=>2*e.gridUnit}px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
  .error {
    color: ${({theme:e})=>e.colors.error.base};
  }
`,O=(e,t,a)=>e?(0,E.BX)("div",{children:[t&&(0,E.tZ)("strong",{children:t}),a&&(0,E.tZ)("div",{css:e=>l.iv`
            margin-top: ${e.gridUnit}px;
          `,children:a})]}):a||null;function K(e){var t;const{onChange:a,onOpenPopover:l=y.EI,onClosePopover:v=y.EI,overlayStyle:w="Popover",isOverflowingFilterBar:$=!1}=e,M=(0,C.Ct)(),S=null!=(t=e.value)?t:M,[X,A]=(0,n.useState)(S),[N,k]=(0,n.useState)(!1),V=(0,n.useMemo)((()=>(0,C.X0)(S)),[S]),[B,R]=(0,n.useState)(V),[I,Y]=(0,n.useState)(S),[U,_]=(0,n.useState)(S),[K,H]=(0,n.useState)(!1),[q,J]=(0,n.useState)(S),[W,Q]=(0,n.useState)(S),ee=(0,i.Fg)(),[te,ae]=(0,r.Z)();function ne(){_(S),R(V),k(!1),v()}(0,n.useEffect)((()=>{if(S===o.vM)return A(o.vM),Q(null),void H(!0);(0,c.z1)(S).then((({value:e,error:t})=>{t?(J(t||""),H(!1),Q(S||null)):("Common"===V||"Calendar"===V||"Current"===V||"No filter"===V?(A(S),Q(O(ae,S,e))):(A(e||""),Q(O(ae,e,S))),H(!0)),Y(S),J(e||S)}))}),[V,ae,te,S]),(0,Z.bX)((()=>{if(U===o.vM)return J(o.vM),Y(o.vM),void H(!0);I!==U&&(0,c.z1)(U).then((({value:e,error:t})=>{t?(J(t||""),H(!1)):(J(e||""),H(!0)),Y(U)}))}),f.M$,[U]);const ie=()=>{N?ne():(_(S),R(V),k(!0),l())},le=(0,E.BX)(z,{children:[(0,E.tZ)("div",{className:"control-label",children:(0,d.t)("RANGE TYPE")}),(0,E.tZ)(j,{ariaLabel:(0,d.t)("RANGE TYPE"),options:C.un,value:B,onChange:function(e){e===o.vM&&_(o.vM),R(e)}}),"No filter"!==B&&(0,E.tZ)(m.iz,{}),"Common"===B&&(0,E.tZ)(D,{value:U,onChange:_}),"Calendar"===B&&(0,E.tZ)(x,{value:U,onChange:_}),"Current"===B&&(0,E.tZ)(T,{value:U,onChange:_}),"Advanced"===B&&(0,E.tZ)(G,{value:U,onChange:_}),"Custom"===B&&(0,E.tZ)(L,{value:U,onChange:_}),"No filter"===B&&(0,E.tZ)("div",{}),(0,E.tZ)(m.iz,{}),(0,E.BX)("div",{children:[(0,E.tZ)("div",{className:"section-title",children:(0,d.t)("Actual time range")}),K&&(0,E.tZ)("div",{children:"No filter"===q?(0,d.t)("No filter"):q}),!K&&(0,E.BX)(F,{className:"warning",children:[(0,E.tZ)(p.Z.ErrorSolidSmall,{iconColor:ee.colors.error.base}),(0,E.tZ)("span",{className:"text error",children:q})]})]}),(0,E.tZ)(m.iz,{}),(0,E.BX)("div",{className:"footer",children:[(0,E.tZ)(s.Z,{buttonStyle:"secondary",cta:!0,onClick:ne,children:(0,d.t)("CANCEL")},"cancel"),(0,E.tZ)(s.Z,{buttonStyle:"primary",cta:!0,disabled:!K,onClick:function(){a(U),k(!1),v()},children:(0,d.t)("APPLY")},"apply")]})]}),re=(0,E.BX)(F,{children:[(0,E.tZ)(p.Z.EditAlt,{iconColor:ee.colors.grayscale.base}),(0,E.tZ)("span",{className:"text",children:(0,d.t)("Edit time range")})]}),oe=(0,E.tZ)(b.Z,{placement:"right",trigger:"click",content:le,title:re,defaultVisible:N,visible:N,onVisibleChange:ie,overlayStyle:{width:"600px"},getPopupContainer:e=>$?e.parentNode:document.body,destroyTooltipOnHide:!0,children:(0,E.tZ)(g.u,{placement:"top",title:W,getPopupContainer:e=>e.parentElement,children:(0,E.tZ)(P,{label:X,isActive:N,isPlaceholder:X===o.vM,ref:te})})}),ce=(0,E.BX)(E.HY,{children:[(0,E.tZ)(g.u,{placement:"top",title:W,getPopupContainer:e=>e.parentElement,children:(0,E.tZ)(P,{onClick:ie,label:X,isActive:N,isPlaceholder:X===o.vM,ref:te})}),(0,E.tZ)(h.default,{title:re,show:N,onHide:ie,width:"600px",hideFooter:!0,zIndex:1030,children:le})]});return(0,E.BX)(E.HY,{children:[(0,E.tZ)(u.Z,{...e}),"Modal"===w?ce:oe]})}},1090:(e,t,a)=>{a.d(t,{ZP:()=>n.Z});var n=a(51137);a(61314)},31209:(e,t,a)=>{a.d(t,{MZ:()=>i,XZ:()=>c,YA:()=>r,gT:()=>n,iF:()=>d,jk:()=>o,po:()=>l,r:()=>s});const n="previous calendar week",i="previous calendar month",l="previous calendar year",r="Current day",o="Current week",c="Current month",d="Current year",s="Current quarter"},61314:(e,t,a)=>{a.d(t,{_S:()=>u,LY:()=>C,gn:()=>h,Sm:()=>d,bk:()=>b,MI:()=>s,Zn:()=>w,x9:()=>m,ae:()=>p,un:()=>c,ZU:()=>x,V7:()=>$,KZ:()=>E,kj:()=>g,_d:()=>f,Ae:()=>Z,hj:()=>y,c_:()=>Y,jK:()=>G,DL:()=>R,X0:()=>P,Ct:()=>j});var n=a(30381),i=a.n(n),l=a(6882),r=a(61988),o=a(31209);const c=[{value:"Common",label:(0,r.t)("Last")},{value:"Calendar",label:(0,r.t)("Previous")},{value:"Current",label:(0,r.t)("Current")},{value:"Custom",label:(0,r.t)("Custom")},{value:"Advanced",label:(0,r.t)("Advanced")},{value:"No filter",label:(0,r.t)("No filter")}],d=[{value:"Last day",label:(0,r.t)("Last day")},{value:"Last week",label:(0,r.t)("Last week")},{value:"Last month",label:(0,r.t)("Last month")},{value:"Last quarter",label:(0,r.t)("Last quarter")},{value:"Last year",label:(0,r.t)("Last year")}],s=new Set(d.map((({value:e})=>e))),u=[{value:o.gT,label:(0,r.t)("previous calendar week")},{value:o.MZ,label:(0,r.t)("previous calendar month")},{value:o.po,label:(0,r.t)("previous calendar year")}],h=new Set(u.map((({value:e})=>e))),m=[{value:o.YA,label:(0,r.t)("Current day")},{value:o.jk,label:(0,r.t)("Current week")},{value:o.XZ,label:(0,r.t)("Current month")},{value:o.r,label:(0,r.t)("Current quarter")},{value:o.iF,label:(0,r.t)("Current year")}],p=new Set(m.map((({value:e})=>e))),v=[{value:"second",label:e=>(0,r.t)("Seconds %s",e)},{value:"minute",label:e=>(0,r.t)("Minutes %s",e)},{value:"hour",label:e=>(0,r.t)("Hours %s",e)},{value:"day",label:e=>(0,r.t)("Days %s",e)},{value:"week",label:e=>(0,r.t)("Weeks %s",e)},{value:"month",label:e=>(0,r.t)("Months %s",e)},{value:"quarter",label:e=>(0,r.t)("Quarters %s",e)},{value:"year",label:e=>(0,r.t)("Years %s",e)}],g=v.map((e=>({value:e.value,label:e.label((0,r.t)("Before"))}))),Z=v.map((e=>({value:e.value,label:e.label((0,r.t)("After"))}))),f=[{value:"specific",label:(0,r.t)("Specific Date/Time")},{value:"relative",label:(0,r.t)("Relative Date/Time")},{value:"now",label:(0,r.t)("Now")},{value:"today",label:(0,r.t)("Midnight")}],y=f.slice(),b=new Set(["Last day","Last week","Last month","Last quarter","Last year"]),C=new Set([o.gT,o.MZ,o.po]),w=new Set([o.YA,o.jk,o.XZ,o.r,o.iF]),E="YYYY-MM-DD[T]HH:mm:ss",D=i()().utc().startOf("day").subtract(7,"days").format(E),$=i()().utc().startOf("day").format(E),x={en:"en_US",fr:"fr_FR",es:"es_ES",it:"it_IT",zh:"zh_CN",ja:"ja_JP",de:"de_DE",pt:"pt_PT",pt_BR:"pt_BR",ru:"ru_RU",ko:"ko_KR",sk:"sk_SK",sl:"sl_SI",nl:"nl_NL"};var T;!function(e){e.CommonFrame="common-frame",e.ModalOverlay="modal-overlay",e.PopoverOverlay="time-range-trigger",e.NoFilter="no-filter",e.CancelButton="cancel-button",e.ApplyButton="date-filter-control__apply-button"}(T||(T={}));const M=String.raw`\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:(?:[+-]\d\d:\d\d)|Z)?`,S=String.raw`(?:TODAY|NOW)`,X=String.raw`[+-]?[1-9][0-9]*`,A=String.raw`YEAR|QUARTER|MONTH|WEEK|DAY|HOUR|MINUTE|SECOND`,N=RegExp(String.raw`^DATEADD\(DATETIME\("(${M}|${S})"\),\s(${X}),\s(${A})\)$`,"i"),k=RegExp(String.raw`^${M}$|^${S}$`,"i"),V=["now","today"],L={sinceDatetime:D,sinceMode:"relative",sinceGrain:"day",sinceGrainValue:-7,untilDatetime:$,untilMode:"specific",untilGrain:"day",untilGrainValue:7,anchorMode:"now",anchorValue:"now"},B=["specific","today","now"],R=e=>"now"===e?i()().utc().startOf("second"):"today"===e?i()().utc().startOf("day"):i()(e),I=e=>R(e).format(E),Y=e=>{const t=e.split(l.UD);if(2===t.length){const[e,a]=t;if(k.test(e)&&k.test(a)){const t=V.includes(e)?e:"specific",n=V.includes(a)?a:"specific";return{customRange:{...L,sinceDatetime:e,untilDatetime:a,sinceMode:t,untilMode:n},matchedFlag:!0}}const n=e.match(N);if(n&&k.test(a)&&e.includes(a)){const[e,t,i]=n.slice(1),l=V.includes(a)?a:"specific";return{customRange:{...L,sinceGrain:i,sinceGrainValue:parseInt(t,10),sinceDatetime:e,untilDatetime:e,sinceMode:"relative",untilMode:l},matchedFlag:!0}}const i=a.match(N);if(k.test(e)&&i&&a.includes(e)){const[t,a,n]=[...i.slice(1)],l=V.includes(e)?e:"specific";return{customRange:{...L,untilGrain:n,untilGrainValue:parseInt(a,10),sinceDatetime:t,untilDatetime:t,untilMode:"relative",sinceMode:l},matchedFlag:!0}}if(n&&i){const[e,t,a]=[...n.slice(1)],[l,r,o]=[...i.slice(1)];if(e===l)return{customRange:{...L,sinceGrain:a,sinceGrainValue:parseInt(t,10),sinceDatetime:e,untilGrain:o,untilGrainValue:parseInt(r,10),untilDatetime:l,anchorValue:e,sinceMode:"relative",untilMode:"relative",anchorMode:"now"===e?"now":"specific"},matchedFlag:!0}}}return{customRange:L,matchedFlag:!1}},G=e=>{const{sinceDatetime:t,sinceMode:a,sinceGrain:n,sinceGrainValue:i,untilDatetime:l,untilMode:r,untilGrain:o,untilGrainValue:c,anchorValue:d}={...e};if(B.includes(a)&&B.includes(r))return`${"specific"===a?I(t):a} : ${"specific"===r?I(l):r}`;if(B.includes(a)&&"relative"===r){const e="specific"===a?I(t):a;return`${e} : DATEADD(DATETIME("${e}"), ${c}, ${o})`}if("relative"===a&&B.includes(r)){const e="specific"===r?I(l):r;return`DATEADD(DATETIME("${e}"), ${-Math.abs(i)}, ${n}) : ${e}`}return`DATEADD(DATETIME("${d}"), ${-Math.abs(i)}, ${n}) : DATEADD(DATETIME("${d}"), ${c}, ${o})`};var U=a(5364),_=a(28216);const P=e=>s.has(e)?"Common":h.has(e)?"Calendar":p.has(e)?"Current":e===U.vM?"No filter":Y(e).matchedFlag?"Custom":"Advanced";function j(){var e;return null!=(e=(0,_.v9)((e=>{var t,a;return null==e||null==(t=e.common)||null==(a=t.conf)?void 0:a.DEFAULT_TIME_FILTER})))?e:U.vM}}}]);
//# sourceMappingURL=1a27497aece4a19c3b54.chunk.js.map