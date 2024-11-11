"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[7001],{81788:(e,t,a)=>{a.d(t,{B8:()=>d,TZ:()=>r,mf:()=>l,u7:()=>o});var s=a(31069),n=a(68492);const i=(e,t,a)=>{let s=`api/v1/dashboard/${e}/filter_state`;return t&&(s=s.concat(`/${t}`)),a&&(s=s.concat(`?tab_id=${a}`)),s},r=(e,t,a,r)=>s.Z.put({endpoint:i(e,a,r),jsonPayload:{value:t}}).then((e=>e.json.message)).catch((e=>(n.Z.error(e),null))),o=(e,t,a)=>s.Z.post({endpoint:i(e,void 0,a),jsonPayload:{value:t}}).then((e=>e.json.key)).catch((e=>(n.Z.error(e),null))),d=(e,t)=>s.Z.get({endpoint:i(e,t)}).then((({json:e})=>JSON.parse(e.value))).catch((e=>(n.Z.error(e),null))),l=e=>s.Z.get({endpoint:`/api/v1/dashboard/permalink/${e}`}).then((({json:e})=>e)).catch((e=>(n.Z.error(e),null)))},57001:(e,t,a)=>{a.r(t),a.d(t,{DashboardPage:()=>de,DashboardPageIdContext:()=>ie,default:()=>le});var s=a(67294),n=a(11965),i=a(16550),r=a(51995),o=a(78161),d=a(28062),l=a(61988),c=a(28216),u=a(14114),p=a(38703),h=a(8743),g=a(4305),f=a(50810),b=a(14505),m=a(61337),v=a(27600),y=a(23525),w=a(9467),x=a(81788),E=a(14890),S=a(45697),C=a.n(S),D=a(93185),_=a(14278),$=a(20292),I=a(81255);function j(e){return Object.values(e).reduce(((e,t)=>(t&&t.type===I.dW&&t.meta&&t.meta.chartId&&e.push(t.meta.chartId),e)),[])}var U=a(2275),R=a(3741),F=a(99543),O=a(56967);const T=[I.dW,I.xh,I.t];function k(e){return!Object.values(e).some((({type:e})=>e&&T.includes(e)))}var Z=a(35944);const q={actions:C().shape({addSliceToDashboard:C().func.isRequired,removeSliceFromDashboard:C().func.isRequired,triggerQuery:C().func.isRequired,logEvent:C().func.isRequired,clearDataMaskState:C().func.isRequired}).isRequired,dashboardInfo:U.$X.isRequired,dashboardState:U.DZ.isRequired,slices:C().objectOf(U.Rw).isRequired,activeFilters:C().object.isRequired,chartConfiguration:C().object,datasources:C().object.isRequired,ownDataCharts:C().object.isRequired,layout:C().object.isRequired,impressionId:C().string.isRequired,timeout:C().number,userId:C().string};class L extends s.PureComponent{static onBeforeUnload(e){e?window.addEventListener("beforeunload",L.unload):window.removeEventListener("beforeunload",L.unload)}static unload(){const e=(0,l.t)("You have unsaved changes.");return window.event.returnValue=e,e}constructor(e){var t,a;super(e),this.appliedFilters=null!=(t=e.activeFilters)?t:{},this.appliedOwnDataCharts=null!=(a=e.ownDataCharts)?a:{},this.onVisibilityChange=this.onVisibilityChange.bind(this)}componentDidMount(){const e=(0,$.Z)(),{dashboardState:t,layout:a}=this.props,s={is_soft_navigation:R.Yd.timeOriginOffset>0,is_edit_mode:t.editMode,mount_duration:R.Yd.getTimestamp(),is_empty:k(a),is_published:t.isPublished,bootstrap_data_length:e.length},n=(0,O.Z)();n&&(s.target_id=n),this.props.actions.logEvent(R.Wl,s),"hidden"===document.visibilityState&&(this.visibilityEventData={start_offset:R.Yd.getTimestamp(),ts:(new Date).getTime()}),window.addEventListener("visibilitychange",this.onVisibilityChange),this.applyCharts()}componentDidUpdate(){this.applyCharts()}UNSAFE_componentWillReceiveProps(e){const t=j(this.props.layout),a=j(e.layout);this.props.dashboardInfo.id===e.dashboardInfo.id&&(t.length<a.length?a.filter((e=>-1===t.indexOf(e))).forEach((t=>{return this.props.actions.addSliceToDashboard(t,(a=e.layout,s=t,Object.values(a).find((e=>e&&e.type===I.dW&&e.meta&&e.meta.chartId===s))));var a,s})):t.length>a.length&&t.filter((e=>-1===a.indexOf(e))).forEach((e=>this.props.actions.removeSliceFromDashboard(e))))}applyCharts(){const{hasUnsavedChanges:e,editMode:t}=this.props.dashboardState,{appliedFilters:a,appliedOwnDataCharts:s}=this,{activeFilters:n,ownDataCharts:i,chartConfiguration:r}=this.props;(0,D.cr)(D.TT.DashboardCrossFilters)&&!r||(t||(0,F.JB)(s,i,{ignoreUndefined:!0})&&(0,F.JB)(a,n,{ignoreUndefined:!0})||this.applyFilters(),e?L.onBeforeUnload(!0):L.onBeforeUnload(!1))}componentWillUnmount(){window.removeEventListener("visibilitychange",this.onVisibilityChange),this.props.actions.clearDataMaskState()}onVisibilityChange(){if("hidden"===document.visibilityState)this.visibilityEventData={start_offset:R.Yd.getTimestamp(),ts:(new Date).getTime()};else if("visible"===document.visibilityState){const e=this.visibilityEventData.start_offset;this.props.actions.logEvent(R.Ev,{...this.visibilityEventData,duration:R.Yd.getTimestamp()-e})}}applyFilters(){const{appliedFilters:e}=this,{activeFilters:t,ownDataCharts:a}=this.props,s=Object.keys(t),n=Object.keys(e),i=new Set(s.concat(n)),r=((e,t)=>{const a=Object.keys(e),s=Object.keys(t),n=(i=a,r=s,[...i.filter((e=>!r.includes(e))),...r.filter((e=>!i.includes(e)))]).filter((a=>e[a]||t[a]));var i,r;return new Set([...a,...s]).forEach((a=>{(0,F.JB)(e[a],t[a])||n.push(a)})),[...new Set(n)]})(a,this.appliedOwnDataCharts);[...i].forEach((a=>{if(!s.includes(a)&&n.includes(a))r.push(...e[a].scope);else if(n.includes(a)){if((0,F.JB)(e[a].values,t[a].values,{ignoreUndefined:!0})||r.push(...t[a].scope),!(0,F.JB)(e[a].scope,t[a].scope)){const s=(t[a].scope||[]).concat(e[a].scope||[]);r.push(...s)}}else r.push(...t[a].scope)})),this.refreshCharts([...new Set(r)]),this.appliedFilters=t,this.appliedOwnDataCharts=a}refreshCharts(e){e.forEach((e=>{this.props.actions.triggerQuery(!0,e)}))}render(){return this.context.loading?(0,Z.tZ)(p.Z,{}):this.props.children}}L.contextType=_.Zn,L.propTypes=q,L.defaultProps={timeout:60,userId:""};const P=L;var B=a(52256),M=a(97381),J=a(43399),Q=a(87915),Y=a(74599);const z=(0,c.$j)((function(e){var t,a,s,n;const{datasources:i,sliceEntities:r,dataMask:o,dashboardInfo:d,dashboardState:l,dashboardLayout:c,impressionId:u,nativeFilters:p}=e;return{timeout:null==(t=d.common)||null==(a=t.conf)?void 0:a.SUPERSET_WEBSERVER_TIMEOUT,userId:d.userId,dashboardInfo:d,dashboardState:l,datasources:i,activeFilters:{...(0,J.De)(),...(0,Q.g)({chartConfiguration:null==(s=d.metadata)?void 0:s.chart_configuration,nativeFilters:p.filters,dataMask:o,allSliceIds:l.sliceIds})},chartConfiguration:null==(n=d.metadata)?void 0:n.chart_configuration,ownDataCharts:(0,Q.U)(o,"ownState"),slices:r.slices,layout:c.present,impressionId:u}}),(function(e){return{actions:(0,E.DE)({setDatasources:f.Fy,clearDataMaskState:Y.sh,addSliceToDashboard:w.Pi,removeSliceFromDashboard:w.rL,triggerQuery:B.triggerQuery,logEvent:M.logEvent},e)}}))(P);var N=a(14670),V=a.n(N);const A=e=>n.iv`
  body {
    h1 {
      font-weight: ${e.typography.weights.bold};
      line-height: 1.4;
      font-size: ${e.typography.sizes.xxl}px;
      letter-spacing: -0.2px;
      margin-top: ${3*e.gridUnit}px;
      margin-bottom: ${3*e.gridUnit}px;
    }

    h2 {
      font-weight: ${e.typography.weights.bold};
      line-height: 1.4;
      font-size: ${e.typography.sizes.xl}px;
      margin-top: ${3*e.gridUnit}px;
      margin-bottom: ${2*e.gridUnit}px;
    }

    h3,
    h4,
    h5,
    h6 {
      font-weight: ${e.typography.weights.bold};
      line-height: 1.4;
      font-size: ${e.typography.sizes.l}px;
      letter-spacing: 0.2px;
      margin-top: ${2*e.gridUnit}px;
      margin-bottom: ${e.gridUnit}px;
    }
  }
`,W=e=>n.iv`
  .header-title a {
    margin: ${e.gridUnit/2}px;
    padding: ${e.gridUnit/2}px;
  }
  .header-controls {
    &,
    &:hover {
      margin-top: ${e.gridUnit}px;
    }
  }
`,K=e=>n.iv`
  .filter-card-popover {
    width: 240px;
    padding: 0;
    border-radius: 4px;

    &.ant-popover-placement-bottom {
      padding-top: ${e.gridUnit}px;
    }

    &.ant-popover-placement-left {
      padding-right: ${3*e.gridUnit}px;
    }

    .ant-popover-inner {
      box-shadow: 0 0 8px rgb(0 0 0 / 10%);
    }

    .ant-popover-inner-content {
      padding: ${4*e.gridUnit}px;
    }

    .ant-popover-arrow {
      display: none;
    }
  }

  .filter-card-tooltip {
    &.ant-tooltip-placement-bottom {
      padding-top: 0;
      & .ant-tooltip-arrow {
        top: -13px;
      }
    }
  }
`,X=e=>n.iv`
  .ant-dropdown-menu.chart-context-menu {
    min-width: ${43*e.gridUnit}px;
  }
  .ant-dropdown-menu-submenu.chart-context-submenu {
    max-width: ${60*e.gridUnit}px;
    min-width: ${40*e.gridUnit}px;
  }
`,H=e=>n.iv`
  a,
  .ant-tabs-tabpane,
  .ant-tabs-tab-btn,
  .superset-button,
  .superset-button.ant-dropdown-trigger,
  .header-controls span {
    &:focus-visible {
      box-shadow: 0 0 0 2px ${e.colors.primary.dark1};
      border-radius: ${e.gridUnit/2}px;
      outline: none;
      text-decoration: none;
    }
    &:not(
        .superset-button,
        .ant-menu-item,
        a,
        .fave-unfave-icon,
        .ant-tabs-tabpane,
        .header-controls span
      ) {
      &:focus-visible {
        padding: ${e.gridUnit/2}px;
      }
    }
  }
`;var G=a(78718),ee=a.n(G);const te={},ae=()=>{const e=(0,m.rV)(m.dR.DashboardExploreContext,{});return Object.fromEntries(Object.entries(e).filter((([,e])=>!e.isRedundant)))},se=(e,t)=>{const a=ae();(0,m.LS)(m.dR.DashboardExploreContext,{...a,[e]:t})},ne=({dashboardPageId:e})=>{const t=(0,c.v9)((({dashboardInfo:t,dashboardState:a,nativeFilters:s,dataMask:n})=>{var i,r,o;return{labelColors:(null==(i=t.metadata)?void 0:i.label_colors)||te,sharedLabelColors:(null==(r=t.metadata)?void 0:r.shared_label_colors)||te,colorScheme:null==a?void 0:a.colorScheme,chartConfiguration:(null==(o=t.metadata)?void 0:o.chart_configuration)||te,nativeFilters:Object.entries(s.filters).reduce(((e,[t,a])=>({...e,[t]:ee()(a,["chartsInScope"])})),{}),dataMask:n,dashboardId:t.id,filterBoxFilters:(0,J.De)(),dashboardPageId:e}}),c.wU);return(0,s.useEffect)((()=>(se(e,t),()=>{se(e,{...t,isRedundant:!0})})),[t,e]),null},ie=(0,s.createContext)(""),re=(0,s.lazy)((()=>Promise.all([a.e(1216),a.e(8924),a.e(6658),a.e(1323),a.e(9472),a.e(876),a.e(981),a.e(9484),a.e(8109),a.e(4953),a.e(9820),a.e(3197),a.e(5801),a.e(7317),a.e(1090),a.e(9818),a.e(868),a.e(1006),a.e(4717),a.e(452)]).then(a.bind(a,66583)))),oe=document.title,de=({idOrSlug:e})=>{const t=(0,r.Fg)(),a=(0,c.I0)(),E=(0,i.k6)(),S=(0,s.useMemo)((()=>V().generate()),[]),C=(0,c.v9)((({dashboardInfo:e})=>e&&Object.keys(e).length>0)),{addDangerToast:D}=(0,u.e1)(),{result:_,error:$}=(0,h.QU)(e),{result:I,error:j}=(0,h.Es)(e),{result:U,error:R,status:F}=(0,h.JL)(e),O=(0,s.useRef)(!1),T=$||j,k=Boolean(_&&I),{dashboard_title:q,css:L,metadata:P,id:B=0}=_||{};if((0,s.useEffect)((()=>{const e=()=>{const e=ae();(0,m.LS)(m.dR.DashboardExploreContext,{...e,[S]:{...e[S],isRedundant:!0}})};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}}),[S]),(0,s.useEffect)((()=>{a((0,w.sL)(F))}),[a,F]),(0,s.useEffect)((()=>{B&&async function(){const e=(0,y.eY)(v.KD.permalinkKey),t=(0,y.eY)(v.KD.nativeFiltersKey),s=(0,y.eY)(v.KD.nativeFilters);let n,i=t||{};if(e){const t=await(0,x.mf)(e);t&&({dataMask:i,activeTabs:n}=t.state)}else t&&(i=await(0,x.B8)(B,t));s&&(i=s),k&&(O.current||(O.current=!0),a((0,g.Y)({history:E,dashboard:_,charts:I,activeTabs:n,dataMask:i})))}()}),[k]),(0,s.useEffect)((()=>(q&&(document.title=q),()=>{document.title=oe})),[q]),(0,s.useEffect)((()=>"string"==typeof L?(0,b.Z)(L):()=>{}),[L]),(0,s.useEffect)((()=>{const e=(0,o.ZP)();return e.source=o.Ag.Dashboard,()=>{d.getNamespace(null==P?void 0:P.color_namespace).resetColors(),e.clear()}}),[null==P?void 0:P.color_namespace]),(0,s.useEffect)((()=>{R?D((0,l.t)("Error loading chart datasources. Filters may not work correctly.")):a((0,f.Fy)(U))}),[D,U,R,a]),T)throw T;return k&&C?(0,Z.BX)(Z.HY,{children:[(0,Z.tZ)(n.xB,{styles:[K(t),A(t),X(t),H(t),W(t),"",""]}),(0,Z.tZ)(ne,{dashboardPageId:S}),(0,Z.tZ)(ie.Provider,{value:S,children:(0,Z.tZ)(z,{children:(0,Z.tZ)(re,{})})})]}):(0,Z.tZ)(p.Z,{})},le=de},87915:(e,t,a)=>{a.d(t,{U:()=>s,g:()=>n});const s=(e,t)=>Object.values(e).filter((e=>e[t])).reduce(((e,a)=>({...e,[a.id]:t?a[t]:a})),{}),n=({chartConfiguration:e,nativeFilters:t,dataMask:a,allSliceIds:s})=>{const n={};return Object.values(a).forEach((({id:a,extraFormData:i})=>{var r,o,d,l,c,u;const p=null!=(r=null!=(o=null!=(d=null==t||null==(l=t[a])?void 0:l.chartsInScope)?d:null==e||null==(c=e[a])||null==(u=c.crossFilters)?void 0:u.chartsInScope)?o:s)?r:[];n[a]={scope:p,values:i}})),n}},14505:(e,t,a)=>{function s(e){const t="CssEditor-css",a=document.head||document.getElementsByTagName("head")[0],s=document.querySelector(`.${t}`)||function(e){const t=document.createElement("style");return t.className=e,t.type="text/css",t}(t);return"styleSheet"in s?s.styleSheet.cssText=e:s.innerHTML=e,a.appendChild(s),function(){s.remove()}}a.d(t,{Z:()=>s})},8743:(e,t,a)=>{a.d(t,{schemaEndpoints:()=>S.Kt,CN:()=>s.CN,tableEndpoints:()=>E.QD,$O:()=>g,hb:()=>v,QU:()=>y,Es:()=>w,JL:()=>x,L8:()=>D,Xx:()=>S.Xx,SJ:()=>E.SJ,uY:()=>E.uY,zA:()=>E.zA});var s=a(45673),n=a(42190),i=a(67294),r=a(38325),o=a(10362);const d=o.h.injectEndpoints({endpoints:e=>({catalogs:e.query({providesTags:[{type:"Catalogs",id:"LIST"}],query:({dbId:e,forceRefresh:t})=>({endpoint:`/api/v1/database/${e}/catalogs/`,urlParams:{force:t},transformResponse:({json:e})=>e.result.sort().map((e=>({value:e,label:e,title:e})))}),serializeQueryArgs:({queryArgs:{dbId:e}})=>({dbId:e})})})}),{useLazyCatalogsQuery:l,useCatalogsQuery:c,endpoints:u,util:p}=d,h=[];function g(e){const t=(0,i.useRef)(!1),{dbId:a,onSuccess:s,onError:n}=e||{},[o]=l(),d=c({dbId:a,forceRefresh:!1},{skip:!a}),u=(0,r.Z)(((e,t)=>{null==s||s(e,t)})),p=(0,r.Z)((()=>{null==n||n()})),g=(0,i.useCallback)((()=>{a&&o({dbId:a,forceRefresh:!0}).then((({isSuccess:e,isError:t,data:a})=>{e&&u(a||h,!0),t&&p()}))}),[a,p,u,o]);return(0,i.useEffect)((()=>{if(t.current){const{requestId:e,isSuccess:t,isError:a,isFetching:s,data:n,originalArgs:i}=d;null!=i&&i.forceRefresh||!e||s||(t&&u(n||h,!1),a&&p())}else t.current=!0}),[d,u,p]),{...d,refetch:g}}var f=a(15926);function b({owners:e}){return e?e.map((e=>`${e.first_name} ${e.last_name}`)):null}const m=a.n(f)().encode({columns:["owners.first_name","owners.last_name"],keys:["none"]});function v(e){return(0,n.l6)((0,n.s_)(`/api/v1/chart/${e}?q=${m}`),b)}const y=e=>(0,n.l6)((0,n.s_)(`/api/v1/dashboard/${e}`),(e=>({...e,metadata:e.json_metadata&&JSON.parse(e.json_metadata)||{},position_data:e.position_json&&JSON.parse(e.position_json),owners:e.owners||[]}))),w=e=>(0,n.s_)(`/api/v1/dashboard/${e}/charts`),x=e=>(0,n.s_)(`/api/v1/dashboard/${e}/datasets`);var E=a(23936),S=a(69279);const C=o.h.injectEndpoints({endpoints:e=>({queryValidations:e.query({providesTags:["QueryValidations"],query:({dbId:e,catalog:t,schema:a,sql:s,templateParams:n})=>{let i=n;try{i=JSON.parse(n||"")}catch(e){i=void 0}const r={catalog:t,schema:a,sql:s,...i&&{template_params:i}};return{method:"post",endpoint:`/api/v1/database/${e}/validate_sql/`,headers:{"Content-Type":"application/json"},body:JSON.stringify(r),transformResponse:({json:e})=>e.result}}})})}),{useQueryValidationsQuery:D}=C}}]);
//# sourceMappingURL=ce34a150c8db7741e7c7.chunk.js.map