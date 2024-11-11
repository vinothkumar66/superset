"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[6914],{52630:(e,t,a)=>{t.iB=t.YM=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=l(a(67294)),i=l(a(45697)),s=a(2371);function l(e){return e&&e.__esModule?e:{default:e}}t.YM=function(e){var t=e.itemTypeToComponent,a=e.WrapperComponent,l=void 0===a?"div":a,o=function(e){var a=e.currentPage,i=e.totalPages,o=e.boundaryPagesRange,d=e.siblingPagesRange,u=e.hideEllipsis,g=e.hidePreviousAndNextPageLinks,c=e.hideFirstAndLastPageLinks,h=e.onChange,p=e.disabled,P=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["currentPage","totalPages","boundaryPagesRange","siblingPagesRange","hideEllipsis","hidePreviousAndNextPageLinks","hideFirstAndLastPageLinks","onChange","disabled"]),E=(0,s.getPaginationModel)({currentPage:a,totalPages:i,boundaryPagesRange:o,siblingPagesRange:d,hideEllipsis:u,hidePreviousAndNextPageLinks:g,hideFirstAndLastPageLinks:c}),m=function(e,t,a){return function(i){var s,l,o,d=e[i.type],u=(l=(s=i).value,o=s.isDisabled,function(){!o&&a&&t!==l&&a(l)});return r.default.createElement(d,n({onClick:u},i))}}(t,a,h);return r.default.createElement(l,P,E.map((function(e){return m(n({},e,{isDisabled:!!p}))})))};return o.propTypes={currentPage:i.default.number.isRequired,totalPages:i.default.number.isRequired,boundaryPagesRange:i.default.number,siblingPagesRange:i.default.number,hideEllipsis:i.default.bool,hidePreviousAndNextPageLinks:i.default.bool,hideFirstAndLastPageLinks:i.default.bool,onChange:i.default.func,disabled:i.default.bool},o},t.iB=s.ITEM_TYPES},54070:(e,t,a)=>{a.d(t,{w:()=>l});var n=a(58593),r=a(83379),i=a(61988),s=a(35944);const l=({user:e,date:t})=>{const a=(0,s.tZ)("span",{className:"no-wrap",children:t});if(e){const t=(0,r.Z)(e),l=(0,i.t)("Modified by: %s",t);return(0,s.tZ)(n.u,{title:l,placement:"bottom",children:a})}return a}},27989:(e,t,a)=>{a.d(t,{Z:()=>p});var n=a(67294),r=a(51995),i=a(61988),s=a(35932),l=a(74069),o=a(4715),d=a(34858),u=a(60972),g=a(35944);const c=r.iK.div`
  display: block;
  color: ${({theme:e})=>e.colors.grayscale.base};
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
`,h=r.iK.div`
  padding-bottom: ${({theme:e})=>2*e.gridUnit}px;
  padding-top: ${({theme:e})=>2*e.gridUnit}px;

  & > div {
    margin: ${({theme:e})=>e.gridUnit}px 0;
  }

  &.extra-container {
    padding-top: 8px;
  }

  .confirm-overwrite {
    margin-bottom: ${({theme:e})=>2*e.gridUnit}px;
  }

  .input-container {
    display: flex;
    align-items: center;

    label {
      display: flex;
      margin-right: ${({theme:e})=>2*e.gridUnit}px;
    }

    i {
      margin: 0 ${({theme:e})=>e.gridUnit}px;
    }
  }

  input,
  textarea {
    flex: 1 1 auto;
  }

  textarea {
    height: 160px;
    resize: none;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({theme:e})=>e.colors.grayscale.light1};
  }

  textarea,
  input[type='text'],
  input[type='number'] {
    padding: ${({theme:e})=>1.5*e.gridUnit}px
      ${({theme:e})=>2*e.gridUnit}px;
    border-style: none;
    border: 1px solid ${({theme:e})=>e.colors.grayscale.light2};
    border-radius: ${({theme:e})=>e.gridUnit}px;

    &[name='name'] {
      flex: 0 1 auto;
      width: 40%;
    }

    &[name='sqlalchemy_uri'] {
      margin-right: ${({theme:e})=>3*e.gridUnit}px;
    }
  }
`,p=({resourceName:e,resourceLabel:t,passwordsNeededMessage:a,confirmOverwriteMessage:r,onModelImport:p,show:P,onHide:E,passwordFields:m=[],setPasswordFields:v=(()=>{}),sshTunnelPasswordFields:_=[],setSSHTunnelPasswordFields:f=(()=>{}),sshTunnelPrivateKeyFields:S=[],setSSHTunnelPrivateKeyFields:b=(()=>{}),sshTunnelPrivateKeyPasswordFields:I=[],setSSHTunnelPrivateKeyPasswordFields:y=(()=>{})})=>{const[L,N]=(0,n.useState)(!0),[T,w]=(0,n.useState)({}),[A,R]=(0,n.useState)(!1),[M,x]=(0,n.useState)(!1),[K,k]=(0,n.useState)([]),[F,$]=(0,n.useState)(!1),[Y,Z]=(0,n.useState)(),[O,G]=(0,n.useState)({}),[B,C]=(0,n.useState)({}),[U,X]=(0,n.useState)({}),H=()=>{k([]),v([]),w({}),R(!1),x(!1),$(!1),Z(""),f([]),b([]),y([]),G({}),C({}),X({})},{state:{alreadyExists:D,passwordsNeeded:q,sshPasswordNeeded:V,sshPrivateKeyNeeded:j,sshPrivateKeyPasswordNeeded:W},importResource:z}=(0,d.PW)(e,t,(e=>{Z(e)}));(0,n.useEffect)((()=>{v(q),q.length>0&&$(!1)}),[q,v]),(0,n.useEffect)((()=>{R(D.length>0),D.length>0&&$(!1)}),[D,R]),(0,n.useEffect)((()=>{f(V),V.length>0&&$(!1)}),[V,f]),(0,n.useEffect)((()=>{b(j),j.length>0&&$(!1)}),[j,b]),(0,n.useEffect)((()=>{y(W),W.length>0&&$(!1)}),[W,y]);return L&&P&&N(!1),(0,g.BX)(l.default,{name:"model",className:"import-model-modal",disablePrimaryButton:0===K.length||A&&!M||F,onHandledPrimaryAction:()=>{var e;(null==(e=K[0])?void 0:e.originFileObj)instanceof File&&($(!0),z(K[0].originFileObj,T,O,B,U,M).then((e=>{e&&(H(),p())})))},onHide:()=>{N(!0),E(),H()},primaryButtonName:A?(0,i.t)("Overwrite"):(0,i.t)("Import"),primaryButtonType:A?"danger":"primary",width:"750px",show:P,title:(0,g.tZ)("h4",{children:(0,i.t)("Import %s",t)}),children:[(0,g.tZ)(h,{children:(0,g.tZ)(o.gq,{name:"modelFile",id:"modelFile",accept:".yaml,.json,.yml,.zip",fileList:K,onChange:e=>{k([{...e.file,status:"done"}])},onRemove:e=>(k(K.filter((t=>t.uid!==e.uid))),!1),customRequest:()=>{},disabled:F,children:(0,g.tZ)(s.Z,{loading:F,children:(0,i.t)("Select file")})})}),Y&&(0,g.tZ)(u.Z,{errorMessage:Y,showDbInstallInstructions:m.length>0||_.length>0||S.length>0||I.length>0}),(()=>{if(0===m.length&&0===_.length&&0===S.length&&0===I.length)return null;const e=[...new Set([...m,..._,...S,...I])];return(0,g.BX)(g.HY,{children:[(0,g.tZ)("h5",{children:(0,i.t)("Database passwords")}),(0,g.tZ)(c,{children:a}),e.map((e=>(0,g.BX)(g.HY,{children:[(null==m?void 0:m.indexOf(e))>=0&&(0,g.BX)(h,{children:[(0,g.BX)("div",{className:"control-label",children:[(0,i.t)("%s PASSWORD",e.slice(10)),(0,g.tZ)("span",{className:"required",children:"*"})]}),(0,g.tZ)("input",{name:`password-${e}`,autoComplete:`password-${e}`,type:"password",value:T[e],onChange:t=>w({...T,[e]:t.target.value})})]},`password-for-${e}`),(null==_?void 0:_.indexOf(e))>=0&&(0,g.BX)(h,{children:[(0,g.BX)("div",{className:"control-label",children:[(0,i.t)("%s SSH TUNNEL PASSWORD",e.slice(10)),(0,g.tZ)("span",{className:"required",children:"*"})]}),(0,g.tZ)("input",{name:`ssh_tunnel_password-${e}`,autoComplete:`ssh_tunnel_password-${e}`,type:"password",value:O[e],onChange:t=>G({...O,[e]:t.target.value})})]},`ssh_tunnel_password-for-${e}`),(null==S?void 0:S.indexOf(e))>=0&&(0,g.BX)(h,{children:[(0,g.BX)("div",{className:"control-label",children:[(0,i.t)("%s SSH TUNNEL PRIVATE KEY",e.slice(10)),(0,g.tZ)("span",{className:"required",children:"*"})]}),(0,g.tZ)("textarea",{name:`ssh_tunnel_private_key-${e}`,autoComplete:`ssh_tunnel_private_key-${e}`,value:B[e],onChange:t=>C({...B,[e]:t.target.value})})]},`ssh_tunnel_private_key-for-${e}`),(null==I?void 0:I.indexOf(e))>=0&&(0,g.BX)(h,{children:[(0,g.BX)("div",{className:"control-label",children:[(0,i.t)("%s SSH TUNNEL PRIVATE KEY PASSWORD",e.slice(10)),(0,g.tZ)("span",{className:"required",children:"*"})]}),(0,g.tZ)("input",{name:`ssh_tunnel_private_key_password-${e}`,autoComplete:`ssh_tunnel_private_key_password-${e}`,type:"password",value:U[e],onChange:t=>X({...U,[e]:t.target.value})})]},`ssh_tunnel_private_key_password-for-${e}`)]})))]})})(),A?(0,g.tZ)(g.HY,{children:(0,g.BX)(h,{children:[(0,g.tZ)("div",{className:"confirm-overwrite",children:r}),(0,g.tZ)("div",{className:"control-label",children:(0,i.t)('Type "%s" to confirm',(0,i.t)("OVERWRITE"))}),(0,g.tZ)("input",{id:"overwrite",type:"text",onChange:e=>{var t,a;const n=null!=(t=null==(a=e.currentTarget)?void 0:a.value)?t:"";x(n.toUpperCase()===(0,i.t)("OVERWRITE"))}})]})}):null]})}},25772:(e,t,a)=>{a.d(t,{P:()=>n.Z});var n=a(65477);a(8420)},59723:(e,t,a)=>{var n;a.d(t,{G:()=>n}),function(e){e.PUBLISHED="published",e.DRAFT="draft"}(n||(n={}))},83379:(e,t,a)=>{function n(e){return e?`${e.first_name} ${e.last_name}`:""}a.d(t,{Z:()=>n})},56590:(e,t)=>{t.ITEM_TYPES={PAGE:"PAGE",ELLIPSIS:"ELLIPSIS",FIRST_PAGE_LINK:"FIRST_PAGE_LINK",PREVIOUS_PAGE_LINK:"PREVIOUS_PAGE_LINK",NEXT_PAGE_LINK:"NEXT_PAGE_LINK",LAST_PAGE_LINK:"LAST_PAGE_LINK"},t.ITEM_KEYS={FIRST_ELLIPSIS:-1,SECOND_ELLIPSIS:-2,FIRST_PAGE_LINK:-3,PREVIOUS_PAGE_LINK:-4,NEXT_PAGE_LINK:-5,LAST_PAGE_LINK:-6}},53804:(e,t,a)=>{var n=a(56590);t.createFirstEllipsis=function(e){return{type:n.ITEM_TYPES.ELLIPSIS,key:n.ITEM_KEYS.FIRST_ELLIPSIS,value:e,isActive:!1}},t.createSecondEllipsis=function(e){return{type:n.ITEM_TYPES.ELLIPSIS,key:n.ITEM_KEYS.SECOND_ELLIPSIS,value:e,isActive:!1}},t.createFirstPageLink=function(e){var t=e.currentPage;return{type:n.ITEM_TYPES.FIRST_PAGE_LINK,key:n.ITEM_KEYS.FIRST_PAGE_LINK,value:1,isActive:1===t}},t.createPreviousPageLink=function(e){var t=e.currentPage;return{type:n.ITEM_TYPES.PREVIOUS_PAGE_LINK,key:n.ITEM_KEYS.PREVIOUS_PAGE_LINK,value:Math.max(1,t-1),isActive:1===t}},t.createNextPageLink=function(e){var t=e.currentPage,a=e.totalPages;return{type:n.ITEM_TYPES.NEXT_PAGE_LINK,key:n.ITEM_KEYS.NEXT_PAGE_LINK,value:Math.min(a,t+1),isActive:t===a}},t.createLastPageLink=function(e){var t=e.currentPage,a=e.totalPages;return{type:n.ITEM_TYPES.LAST_PAGE_LINK,key:n.ITEM_KEYS.LAST_PAGE_LINK,value:a,isActive:t===a}},t.createPageFunctionFactory=function(e){var t=e.currentPage;return function(e){return{type:n.ITEM_TYPES.PAGE,key:e,value:e,isActive:e===t}}}},1158:(e,t)=>{t.createRange=function(e,t){for(var a=[],n=e;n<=t;n++)a.push(n);return a}},2371:(e,t,a)=>{var n=a(1158),r=a(53804);t.getPaginationModel=function(e){if(null==e)throw new Error("getPaginationModel(): options object should be a passed");var t=Number(e.totalPages);if(isNaN(t))throw new Error("getPaginationModel(): totalPages should be a number");if(t<0)throw new Error("getPaginationModel(): totalPages shouldn't be a negative number");var a=Number(e.currentPage);if(isNaN(a))throw new Error("getPaginationModel(): currentPage should be a number");if(a<0)throw new Error("getPaginationModel(): currentPage shouldn't be a negative number");if(a>t)throw new Error("getPaginationModel(): currentPage shouldn't be greater than totalPages");var i=null==e.boundaryPagesRange?1:Number(e.boundaryPagesRange);if(isNaN(i))throw new Error("getPaginationModel(): boundaryPagesRange should be a number");if(i<0)throw new Error("getPaginationModel(): boundaryPagesRange shouldn't be a negative number");var s=null==e.siblingPagesRange?1:Number(e.siblingPagesRange);if(isNaN(s))throw new Error("getPaginationModel(): siblingPagesRange should be a number");if(s<0)throw new Error("getPaginationModel(): siblingPagesRange shouldn't be a negative number");var l=Boolean(e.hidePreviousAndNextPageLinks),o=Boolean(e.hideFirstAndLastPageLinks),d=Boolean(e.hideEllipsis),u=d?0:1,g=[],c=r.createPageFunctionFactory(e);if(o||g.push(r.createFirstPageLink(e)),l||g.push(r.createPreviousPageLink(e)),1+2*u+2*s+2*i>=t){var h=n.createRange(1,t).map(c);g.push.apply(g,h)}else{var p=i,P=n.createRange(1,p).map(c),E=t+1-i,m=t,v=n.createRange(E,m).map(c),_=Math.min(Math.max(a-s,p+u+1),E-u-2*s-1),f=_+2*s,S=n.createRange(_,f).map(c);if(g.push.apply(g,P),!d){var b=_-1,I=(b===p+1?c:r.createFirstEllipsis)(b);g.push(I)}if(g.push.apply(g,S),!d){var y=f+1,L=(y===E-1?c:r.createSecondEllipsis)(y);g.push(L)}g.push.apply(g,v)}return l||g.push(r.createNextPageLink(e)),o||g.push(r.createLastPageLink(e)),g};var i=a(56590);t.ITEM_TYPES=i.ITEM_TYPES,t.ITEM_KEYS=i.ITEM_KEYS}}]);
//# sourceMappingURL=d89d711a1f3f4854bf44.chunk.js.map