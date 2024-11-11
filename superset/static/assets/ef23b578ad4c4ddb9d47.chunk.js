"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[1006],{40730:(e,t,i)=>{i.d(t,{Z:()=>Be});var n,r=i(28216),a=i(14890),o=i(52256),s=i(97381),l=i(45697),d=i.n(l),c=i(67294),u=i(61988),h=i(51995),p=i(68492),m=i(93185),g=i(55786),v=i(9531),b=i(38703),f=i(94301),y=i(57368),x=i(3741),Z=i(27600),C=i(23525),S=i(71894);!function(e){e.Explore="explore",e.Dashboard="dashboard"}(n||(n={}));var T,_=i(42190),w=i(50361),M=i.n(w),$=i(18446),E=i.n($),I=i(11865),F=i.n(I),D=i(16355),R=i(11064),N=i(88274),k=i(11965),O=i(90731),U=i(12617),q=i(83862),L=i(4715),B=i(74599),A=i(41814),z=i(69175),j=i(15856),P=i(13322),X=i(9875),H=i(14114),V=i(6412),K=i(37731),Y=i(73727),W=i(74069),G=i(35932),Q=i(57001),J=i(40219),ee=i(99232),te=i(53579),ie=i(29487),ne=i(12515);!function(e){e[e.Chart=0]="Chart",e[e.Table=1]="Table"}(T||(T={}));var re=i(35944);function ae({formData:e,result:t,dataset:i,onContextMenu:n,inContextMenu:r}){const a=(0,c.useMemo)((()=>({onContextMenu:n})),[n]);return(0,re.tZ)("div",{css:k.iv`
        width: 100%;
        height: 100%;
        min-height: 0;
      `,children:(0,re.tZ)(N.Z,{disableErrorBoundary:!0,chartType:e.viz_type,enableNoResults:!0,datasource:i,formData:e,queriesData:t,hooks:a,inContextMenu:r,height:"100%",width:"100%"})})}var oe=i(87183),se=i(54076);const le=(0,h.iK)(L.O5.Item)`
  ${({theme:e,isClickable:t,isHidden:i})=>k.iv`
    cursor: ${t?"pointer":"auto"};
    color: ${e.colors.grayscale.light1};
    transition: color ease-in ${e.transitionTiming}s;
    .ant-breadcrumb > span:last-child > & {
      color: ${e.colors.grayscale.dark1};
    }
    &:hover {
      color: ${t?e.colors.grayscale.dark1:"inherit"};
    }
    visibility: ${i?"hidden":"visible"};
  `}
`;var de=i(5462),ce=i(71262);const ue=h.iK.div`
  ${({theme:e})=>k.iv`
    & .pagination-container {
      bottom: ${4*-e.gridUnit}px;
    }
  `}
`,he="adhoc_filters",pe=({formData:e,closeModal:t})=>{const i=(0,r.I0)(),{addDangerToast:n}=(0,H.e1)(),a=(0,h.Fg)(),[o,l]=(0,c.useState)(""),d=(0,c.useContext)(Q.DashboardPageIdContext),p=(0,c.useCallback)((()=>{i((0,s.logEvent)(x.qL,{slice_id:e.slice_id}))}),[i,e.slice_id]),m=(0,r.v9)((e=>{var t;return(0,U.R)("can_explore","Superset",null==(t=e.user)?void 0:t.roles)})),[g,v]=e.datasource.split("__");(0,c.useEffect)((()=>{(0,J.nv)(Number(g),v,e,0).then((e=>{l(`/explore/?form_data_key=${e}&dashboard_page_id=${d}`)})).catch((()=>{n((0,u.t)("Failed to generate chart edit URL"))}))}),[n,d,g,v,e]);const b=!o||!m;return(0,re.BX)(re.HY,{children:[(0,re.tZ)(G.Z,{buttonStyle:"secondary",buttonSize:"small",onClick:p,disabled:b,tooltip:b?(0,u.t)("You do not have sufficient permissions to edit the chart"):void 0,children:(0,re.tZ)(Y.rU,{css:k.iv`
            &:hover {
              text-decoration: none;
            }
          `,to:o,children:(0,u.t)("Edit chart")})}),(0,re.tZ)(G.Z,{buttonStyle:"primary",buttonSize:"small",onClick:t,css:k.iv`
          margin-left: ${2*a.gridUnit}px;
        `,children:(0,u.t)("Close")})]})};function me({column:e,dataset:t,drillByConfig:i,formData:n,onHideModal:a}){const l=(0,r.I0)(),d=(0,h.Fg)(),{addDangerToast:p}=(0,H.e1)(),[m,v]=(0,c.useState)(!0),[f,y]=(0,c.useState)([{...i,column:e}]);(0,c.useEffect)((()=>{l((0,s.logEvent)(x.zf,{slice_id:n.slice_id}))}),[l,n.slice_id]);const{column:Z,groupbyFieldName:C=i.groupbyFieldName}=f[f.length-1]||{},S=(0,c.useMemo)((()=>(0,g.Z)(n[C]).map((e=>{var i;return null==(i=t.columns)?void 0:i.find((t=>t.column_name===e))})).filter(K.Z)),[t.columns,n,C]),{displayModeToggle:_,drillByDisplayMode:w}=(()=>{const[e,t]=(0,c.useState)(T.Chart);return{displayModeToggle:(0,c.useMemo)((()=>(0,re.tZ)("div",{css:e=>k.iv`
          margin-bottom: ${6*e.gridUnit}px;
          .ant-radio-button-wrapper-checked:not(
              .ant-radio-button-wrapper-disabled
            ):focus-within {
            box-shadow: none;
          }
        `,children:(0,re.BX)(oe.Y.Group,{onChange:({target:{value:e}})=>{t(e)},defaultValue:T.Chart,children:[(0,re.tZ)(oe.Y.Button,{value:T.Chart,children:(0,u.t)("Chart")}),(0,re.tZ)(oe.Y.Button,{value:T.Table,children:(0,u.t)("Table")})]})})),[]),drillByDisplayMode:e}})(),[M,$]=(0,c.useState)(),E=((e,t)=>(0,K.Z)(e)?1===e.length?(0,re.tZ)(ue,{children:(0,re.tZ)(de.T,{colnames:e[0].colnames,coltypes:e[0].coltypes,rowcount:e[0].sql_rowcount,data:e[0].data,dataSize:15,datasourceId:t,isVisible:!0})}):(0,re.tZ)(ce.ZP,{fullWidth:!1,children:e.map(((e,i)=>(0,re.tZ)(ce.ZP.TabPane,{tab:(0,u.t)("Results %s",i+1),children:(0,re.tZ)(ue,{children:(0,re.tZ)(de.T,{colnames:e.colnames,coltypes:e.coltypes,data:e.data,rowcount:e.sql_rowcount,dataSize:15,datasourceId:t,isVisible:!0})})},i)))}):(0,re.tZ)("div",{}))(M,n.datasource),[I,F]=(0,c.useState)(n),[D,R]=(0,c.useState)([...S,e].filter(K.Z)),[N,O]=(0,c.useState)([{groupby:S,filters:i.filters},{groupby:e||[]}]),U=(0,c.useCallback)(((e,t=C)=>Array.isArray(n[t])?[e.column_name]:e.column_name),[n,C]),q=(0,c.useCallback)((e=>e.reduce(((e,t)=>{null!=t&&t.groupbyFieldName&&t.column&&(e.formData[t.groupbyFieldName]=U(t.column,t.groupbyFieldName),e.overridenGroupbyFields.add(t.groupbyFieldName));const i=(null==t?void 0:t.adhocFilterFieldName)||he;return e.formData[i]=[...(0,g.Z)(e[i]),...(0,g.Z)(t.filters).map((e=>(0,ee.f)(e)))],e.overridenAdhocFilterFields.add(i),e}),{formData:{},overridenGroupbyFields:new Set,overridenAdhocFilterFields:new Set})),[U]),B=(0,c.useCallback)((()=>f.reduce(((e,t)=>{const i=t.adhocFilterFieldName||he;return e[i]=[...e[i]||[],...t.filters.map((e=>(0,ee.f)(e)))],e}),{})),[f]),A=((e,t=se.EI)=>(0,c.useMemo)((()=>{const i=t=>t<e.length-1,n=e=>`${(0,g.Z)(e.groupby).map((e=>e.verbose_name||e.column_name)).join(", ")} ${e.filters?`(${e.filters.map((e=>e.formattedVal||e.val)).join(", ")})`:""}`;return(0,re.tZ)(L.O5,{css:e=>k.iv`
          margin: ${2*e.gridUnit}px 0 ${4*e.gridUnit}px;
        `,children:e.map(((e,r)=>{return(0,re.tZ)(le,{isClickable:i(r),isHidden:(a=e,0===(0,g.Z)(a.groupby).length&&0===(0,g.Z)(a.filters).length),onClick:i(r)?()=>t(e,r):se.EI,children:n(e)},r);var a})).filter((e=>!1===e.props.isHidden))})}),[e,t]))(N,(0,c.useCallback)(((e,t)=>{l((0,s.logEvent)(x.TG,{slice_id:n.slice_id})),y((e=>e.slice(0,t))),O((e=>{const i=e.slice(0,t+1);return delete i[i.length-1].filters,i})),R((e=>e.slice(0,t))),F((()=>{if(0===t)return n;const{formData:e,overridenAdhocFilterFields:i}=q(f.slice(0,t)),r={...n,...e};return i.forEach((t=>({...r,[t]:[...n[t],...e[t]]}))),r}))}),[l,f,n,q])),z=(0,c.useMemo)((()=>{let e={...I};Z&&C&&(e[C]=U(Z));const t=B();return Object.keys(t).forEach((i=>{e={...e,[i]:[...(0,g.Z)(n[i]),...t[i]]}})),e.slice_id=0,delete e.slice_name,delete e.dashboards,e}),[I,Z,C,B,U,n]);(0,c.useEffect)((()=>{R((e=>!Z||e.some((e=>e.column_name===Z.column_name))?e:[...e,Z]))}),[Z]);const j=(0,c.useCallback)(((e,t)=>{l((0,s.logEvent)(x.g3,{drill_depth:f.length+1,slice_id:n.slice_id})),F(z),y((i=>[...i,{...t,column:e}])),O((i=>{const n=[...i,{groupby:e}];return n[n.length-2].filters=t.filters,n}))}),[l,f.length,z,n.slice_id]),P=(0,c.useMemo)((()=>({drillBy:{excludedColumns:D,openNewModal:!1}})),[D]),{contextMenu:X,inContextMenu:V,onContextMenu:Y}=((e,t,i,n,r)=>{const a=(0,c.useRef)(null),[o,s]=(0,c.useState)(!1),l=(0,c.useCallback)(((...e)=>{s(!1),null==i||i(...e)}),[i]),d=(0,c.useCallback)((()=>{s(!1)}),[]);return{contextMenu:(0,c.useMemo)((()=>(0,re.tZ)(ye,{ref:a,id:0,formData:t,onSelection:l,onClose:d,displayedItems:n,additionalConfig:r})),[r,0,n,t,d,l]),inContextMenu:o,onContextMenu:(e,t,i)=>{var n;null==(n=a.current)||n.open(e,t,i),s(!0)}}})(0,I,j,be.DrillBy,P),G=(0,r.v9)((e=>{const t=Object.values(e.dashboardLayout.present).find((e=>{var t;return(null==(t=e.meta)?void 0:t.chartId)===n.slice_id}));return(null==t?void 0:t.meta.sliceNameOverride)||(null==t?void 0:t.meta.sliceName)}));(0,c.useEffect)((()=>{if(z){const[e]=(0,ne.hz)(z);v(!0),$(void 0),(0,o.getChartDataRequest)({formData:z}).then((({response:t,json:i})=>(0,o.handleChartDataResponse)(t,i,e))).then((e=>{$(e)})).catch((()=>{p((0,u.t)("Failed to load chart data."))})).finally((()=>{v(!1)}))}}),[p,z]);const{metadataBar:Q}=(0,te.S)({dataset:t});return(0,re.tZ)(W.default,{css:k.iv`
        .ant-modal-footer {
          border-top: none;
        }
      `,show:!0,onHide:null!=a?a:()=>null,title:(0,u.t)("Drill by: %s",G),footer:(0,re.tZ)(pe,{formData:z}),responsive:!0,resizable:!0,resizableConfig:{minHeight:128*d.gridUnit,minWidth:128*d.gridUnit,defaultSize:{width:"auto",height:"80vh"}},draggable:!0,destroyOnClose:!0,maskClosable:!1,children:(0,re.BX)("div",{css:k.iv`
          display: flex;
          flex-direction: column;
          height: 100%;
        `,children:[Q,A,_,m&&(0,re.tZ)(b.Z,{}),!m&&!M&&(0,re.tZ)(ie.Z,{type:"error",message:(0,u.t)("There was an error loading the chart data")}),w===T.Chart&&M&&(0,re.tZ)(ae,{dataset:t,formData:z,result:M,onContextMenu:Y,inContextMenu:V}),w===T.Table&&M&&E,X]})})}var ge=i(46219);const ve=({drillByConfig:e,formData:t,contextMenuY:i=0,submenuIndex:n=0,onSelection:r=(()=>{}),onClick:a=(()=>{}),excludedColumns:o,openNewModal:s=!0,...l})=>{const d=(0,h.Fg)(),{addDangerToast:p}=(0,H.e1)(),[m,v]=(0,c.useState)(!0),[f,y]=(0,c.useState)(""),[x,Z]=(0,c.useState)(),[C,S]=(0,c.useState)([]),[T,_]=(0,c.useState)(!1),[w,M]=(0,c.useState)(),$=(0,c.useCallback)(((t,i)=>{a(t),r(i,e),M(i),s&&_(!0)}),[e,a,r,s]),E=(0,c.useCallback)((()=>{_(!1)}),[]);(0,c.useEffect)((()=>{y("")}),[C.length]);const I=null==e?void 0:e.groupbyFieldName,F=(0,c.useMemo)((()=>{var e;return null==(e=(0,R.Z)().get(t.viz_type))?void 0:e.behaviors.find((e=>e===D.cg.DrillBy))}),[t.viz_type]),N=(e=>{const t={};return(0,g.Z)(null==e?void 0:e.columns).forEach((e=>{t[e.column_name]=e.verbose_name||e.column_name})),(0,g.Z)(null==e?void 0:e.metrics).forEach((e=>{t[e.metric_name]=e.verbose_name||e.metric_name})),t})(x);(0,c.useEffect)((()=>{if(F&&I){const i=t.datasource.split("__")[0];(0,V.e)({endpoint:`/api/v1/dataset/${i}`}).then((({json:{result:i}})=>{Z(i),S((0,g.Z)(i.columns).filter((e=>e.groupby)).filter((i=>{var n,r;return!(0,g.Z)(t[null!=(n=e.groupbyFieldName)?n:""]).includes(i.column_name)&&i.column_name!==t.x_axis&&(null==(r=(0,g.Z)(o))?void 0:r.every((e=>e.column_name!==i.column_name)))})))})).catch((()=>{V.f.delete(`/api/v1/dataset/${i}`),p((0,u.t)("Failed to load dimensions for drill by"))})).finally((()=>{v(!1)}))}}),[p,o,t,null==e?void 0:e.groupbyFieldName,F,I]);const O=(0,c.useCallback)((e=>{var t;e.stopPropagation();const i=null==e||null==(t=e.target)?void 0:t.value;y(i)}),[]),U=(0,c.useMemo)((()=>C.filter((e=>(e.verbose_name||e.column_name).toLowerCase().includes(f.toLowerCase())))),[C,f]),L=(0,c.useMemo)((()=>(0,z.th)(i,U.length||1,n,200,C.length>10?48:0)),[i,U.length,n,C.length]);let B;return F?I||(B=(0,u.t)("Drill by is not available for this data point")):B=(0,u.t)("Drill by is not yet supported for this chart type"),F&&I?(0,re.BX)(re.HY,{children:[(0,re.tZ)(q.Menu.SubMenu,{title:(0,u.t)("Drill by"),popupClassName:"chart-context-submenu",popupOffset:[0,L],...l,children:(0,re.BX)("div",{children:[C.length>10&&(0,re.tZ)(X.II,{prefix:(0,re.tZ)(P.Z.Search,{iconSize:"l",iconColor:d.colors.grayscale.light1}),onChange:O,placeholder:(0,u.t)("Search columns"),value:f,onClick:e=>{e.nativeEvent.stopImmediatePropagation()},allowClear:!0,css:k.iv`
                width: auto;
                max-width: 100%;
                margin: ${2*d.gridUnit}px ${3*d.gridUnit}px;
                box-shadow: none;
              `}),m?(0,re.tZ)("div",{css:k.iv`
                padding: ${3*d.gridUnit}px 0;
              `,children:(0,re.tZ)(b.Z,{position:"inline-centered"})}):U.length?(0,re.tZ)("div",{css:k.iv`
                max-height: ${200}px;
                overflow: auto;
              `,children:U.map((e=>(0,re.tZ)(ge.i,{tooltipText:e.verbose_name||e.column_name,...l,onClick:t=>$(t,e),children:e.verbose_name||e.column_name},`drill-by-item-${e.column_name}`)))}):(0,re.tZ)(q.Menu.Item,{disabled:!0,...l,children:(0,u.t)("No columns found")},"no-drill-by-columns-found")]})},"drill-by-submenu"),T&&(0,re.tZ)(me,{column:w,drillByConfig:e,formData:t,onHideModal:E,dataset:{...x,verbose_map:N}})]}):(0,re.tZ)(q.Menu.Item,{disabled:!0,...l,children:(0,re.BX)("div",{children:[(0,u.t)("Drill by"),(0,re.tZ)(j.j,{title:B})]})},"drill-by-disabled")};var be;!function(e){e[e.CrossFilter=0]="CrossFilter",e[e.DrillToDetail=1]="DrillToDetail",e[e.DrillBy=2]="DrillBy",e[e.All=3]="All"}(be||(be={}));const fe=({id:e,formData:t,onSelection:i,onClose:n,displayedItems:a=be.All,additionalConfig:o},s)=>{var l,d;const p=(0,h.Fg)(),v=(0,r.I0)(),b=(0,r.v9)((e=>{var t;return(0,U.R)("can_explore","Superset",null==(t=e.user)?void 0:t.roles)})),f=(0,r.v9)((e=>{var t;return(0,U.R)("can_write","ExploreFormDataRestApi",null==(t=e.user)?void 0:t.roles)})),y=(0,r.v9)((e=>{var t;return(0,U.R)("can_samples","Datasource",null==(t=e.user)?void 0:t.roles)})),x=(0,r.v9)((e=>{var t;return(0,U.R)("can_drill","Dashboard",null==(t=e.user)?void 0:t.roles)})),Z=(b||x)&&f,C=(b||x)&&y,S=(0,r.v9)((({dashboardInfo:e})=>e.crossFiltersEnabled)),T=e=>a===be.All||(0,g.Z)(a).includes(e),[{filters:_,clientX:w,clientY:M},$]=(0,c.useState)({clientX:0,clientY:0}),[E,I]=(0,c.useState)(!1),F=[],N=(0,m.cr)(m.TT.DrillToDetail)&&C&&T(be.DrillToDetail),P=(0,m.cr)(m.TT.DrillBy)&&Z&&T(be.DrillBy),X=(0,m.cr)(m.TT.DashboardCrossFilters)&&T(be.CrossFilter),H=null==(l=(0,R.Z)().get(t.viz_type))||null==(d=l.behaviors)?void 0:d.includes(D.cg.InteractiveChart);let V=0;if(X&&(V+=1),N&&(V+=2),P&&(V+=1),0===V&&(V=1),X){var K;const t=!H||!S||!(null!=_&&_.crossFilter);let i=null;t?S?H?null!=_&&_.crossFilter||(i=(0,re.tZ)(re.HY,{children:(0,re.tZ)("div",{children:(0,u.t)("You can't apply cross-filter on this data point.")})})):i=(0,re.tZ)(re.HY,{children:(0,re.tZ)("div",{children:(0,u.t)("This visualization type does not support cross-filtering.")})}):i=(0,re.tZ)(re.HY,{children:(0,re.tZ)("div",{children:(0,u.t)("Cross-filtering is not enabled for this dashboard.")})}):i=(0,re.BX)(re.HY,{children:[(0,re.tZ)("div",{children:(0,u.t)("Cross-filter will be applied to all of the charts that use this dataset.")}),(0,re.tZ)("div",{children:(0,u.t)("You can also just click on the chart to apply cross-filter.")})]}),F.push((0,re.BX)(re.HY,{children:[(0,re.tZ)(q.Menu.Item,{disabled:t,onClick:()=>{null!=_&&_.crossFilter&&v((0,B.eG)(e,_.crossFilter.dataMask))},children:null!=_&&null!=(K=_.crossFilter)&&K.isCurrentValueSelected?(0,u.t)("Remove cross-filter"):(0,re.BX)("div",{children:[(0,u.t)("Add cross-filter"),(0,re.tZ)(j.j,{title:i,color:t?void 0:p.colors.grayscale.base})]})},"cross-filtering-menu-item"),V>1&&(0,re.tZ)(q.Menu.Divider,{})]}))}if(N&&F.push((0,re.tZ)(A.p,{chartId:e,formData:t,filters:null==_?void 0:_.drillToDetail,isContextMenu:!0,contextMenuY:M,onSelection:i,submenuIndex:X?2:1,showModal:E,setShowModal:I,...(null==o?void 0:o.drillToDetail)||{}})),P){let e=0;X&&(e+=1),N&&(e+=2),F.push((0,re.tZ)(ve,{drillByConfig:null==_?void 0:_.drillBy,onSelection:i,formData:t,contextMenuY:M,submenuIndex:e,...(null==o?void 0:o.drillBy)||{}}))}const Y=(0,c.useCallback)(((t,i,n)=>{var r;const a=(0,z.$t)(i,V);$({clientX:t,clientY:a,filters:n}),null==(r=document.getElementById(`hidden-span-${e}`))||r.click()}),[e,V]);return(0,c.useImperativeHandle)(s,(()=>({open:Y})),[Y]),O.createPortal((0,re.tZ)(L.Gj,{overlay:(0,re.tZ)(q.Menu,{className:"chart-context-menu",children:F.length?F:(0,re.tZ)(q.Menu.Item,{disabled:!0,children:"No actions"})}),trigger:["click"],onVisibleChange:e=>!e&&n(),children:(0,re.tZ)("span",{id:`hidden-span-${e}`,css:(0,k.iv)({visibility:"hidden",position:"fixed",top:M,left:w,width:1,height:1},"","")})}),document.body)},ye=(0,c.forwardRef)(fe),xe={annotationData:d().object,actions:d().object,chartId:d().number.isRequired,datasource:d().object,initialValues:d().object,formData:d().object.isRequired,latestQueryFormData:d().object,labelColors:d().object,sharedLabelColors:d().object,height:d().number,width:d().number,setControlValue:d().func,vizType:d().string.isRequired,triggerRender:d().bool,chartAlert:d().string,chartStatus:d().string,queriesResponse:d().arrayOf(d().object),triggerQuery:d().bool,chartIsStale:d().bool,addFilter:d().func,setDataMask:d().func,onFilterMenuOpen:d().func,onFilterMenuClose:d().func,ownState:d().object,postTransformProps:d().func,source:d().oneOf([n.Dashboard,n.Explore]),emitCrossFilters:d().bool},Ze={},Ce=[D.cg.InteractiveChart],Se={addFilter:()=>Ze,onFilterMenuOpen:()=>Ze,onFilterMenuClose:()=>Ze,initialValues:Ze,setControlValue(){},triggerRender:!1};class Te extends c.Component{constructor(e){super(e),this.state={showContextMenu:e.source===n.Dashboard&&((0,m.cr)(m.TT.DrillToDetail)||(0,m.cr)(m.TT.DashboardCrossFilters)),inContextMenu:!1,legendState:void 0},this.hasQueryResponseChange=!1,this.contextMenuRef=(0,c.createRef)(),this.handleAddFilter=this.handleAddFilter.bind(this),this.handleRenderSuccess=this.handleRenderSuccess.bind(this),this.handleRenderFailure=this.handleRenderFailure.bind(this),this.handleSetControlValue=this.handleSetControlValue.bind(this),this.handleOnContextMenu=this.handleOnContextMenu.bind(this),this.handleContextMenuSelected=this.handleContextMenuSelected.bind(this),this.handleContextMenuClosed=this.handleContextMenuClosed.bind(this),this.handleLegendStateChanged=this.handleLegendStateChanged.bind(this),this.onContextMenuFallback=this.onContextMenuFallback.bind(this),this.hooks={onAddFilter:this.handleAddFilter,onContextMenu:this.state.showContextMenu?this.handleOnContextMenu:void 0,onError:this.handleRenderFailure,setControlValue:this.handleSetControlValue,onFilterMenuOpen:this.props.onFilterMenuOpen,onFilterMenuClose:this.props.onFilterMenuClose,onLegendStateChanged:this.handleLegendStateChanged,setDataMask:e=>{var t;null==(t=this.props.actions)||t.updateDataMask(this.props.chartId,e)}},this.mutableQueriesResponse=M()(this.props.queriesResponse)}shouldComponentUpdate(e,t){var i,n;return!(!(e.queriesResponse&&["success","rendered"].indexOf(e.chartStatus)>-1)||null!=(i=e.queriesResponse)&&null!=(n=i[0])&&n.error)&&(!E()(this.state,t)||(this.hasQueryResponseChange=e.queriesResponse!==this.props.queriesResponse,this.hasQueryResponseChange&&(this.mutableQueriesResponse=M()(e.queriesResponse)),this.hasQueryResponseChange||!E()(e.datasource,this.props.datasource)||e.annotationData!==this.props.annotationData||e.ownState!==this.props.ownState||e.filterState!==this.props.filterState||e.height!==this.props.height||e.width!==this.props.width||e.triggerRender||e.labelColors!==this.props.labelColors||e.sharedLabelColors!==this.props.sharedLabelColors||e.formData.color_scheme!==this.props.formData.color_scheme||e.formData.stack!==this.props.formData.stack||e.cacheBusterProp!==this.props.cacheBusterProp||e.emitCrossFilters!==this.props.emitCrossFilters))}handleAddFilter(e,t,i=!0,n=!0){this.props.addFilter(e,t,i,n)}handleRenderSuccess(){const{actions:e,chartStatus:t,chartId:i,vizType:n}=this.props;["loading","rendered"].indexOf(t)<0&&e.chartRenderingSucceeded(i),this.hasQueryResponseChange&&e.logEvent(x.aD,{slice_id:i,viz_type:n,start_offset:this.renderStartTime,ts:(new Date).getTime(),duration:x.Yd.getTimestamp()-this.renderStartTime})}handleRenderFailure(e,t){const{actions:i,chartId:n}=this.props;p.Z.warn(e),i.chartRenderingFailed(e.toString(),n,t?t.componentStack:null),this.hasQueryResponseChange&&i.logEvent(x.aD,{slice_id:n,has_err:!0,error_details:e.toString(),start_offset:this.renderStartTime,ts:(new Date).getTime(),duration:x.Yd.getTimestamp()-this.renderStartTime})}handleSetControlValue(...e){const{setControlValue:t}=this.props;t&&t(...e)}handleOnContextMenu(e,t,i){this.contextMenuRef.current.open(e,t,i),this.setState({inContextMenu:!0})}handleContextMenuSelected(){this.setState({inContextMenu:!1})}handleContextMenuClosed(){this.setState({inContextMenu:!1})}handleLegendStateChanged(e){this.setState({legendState:e})}onContextMenuFallback(e){this.state.inContextMenu||(e.preventDefault(),this.handleOnContextMenu(e.clientX,e.clientY))}render(){var e;const{chartAlert:t,chartStatus:i,chartId:r,emitCrossFilters:a}=this.props;if("loading"===i||t||null===i)return null;this.renderStartTime=x.Yd.getTimestamp();const{width:o,height:s,datasource:l,annotationData:d,initialValues:c,ownState:h,filterState:p,chartIsStale:m,formData:g,latestQueryFormData:v,postTransformProps:b}=this.props,y=m&&v?v:g,Z=y.viz_type||this.props.vizType,C=F()(Z),S="table"===Z?`superset-chart-${C}`:C;let T;const _=(0,u.t)("No results were returned for this query"),w=this.props.source===n.Explore?(0,u.t)("Make sure that the controls are configured properly and the datasource contains data for the selected time range"):void 0,M="chart.svg";T=o>300&&s>220?(0,re.tZ)(f.XJ,{title:_,description:w,image:M}):(0,re.tZ)(f.Tc,{title:_,image:M});const $=null!=(e=(0,R.Z)().get(g.viz_type))&&e.behaviors.find((e=>e===D.cg.DrillToDetail))?{inContextMenu:this.state.inContextMenu}:{};return(0,re.BX)(re.HY,{children:[this.state.showContextMenu&&(0,re.tZ)(ye,{ref:this.contextMenuRef,id:r,formData:y,onSelection:this.handleContextMenuSelected,onClose:this.handleContextMenuClosed}),(0,re.tZ)("div",{onContextMenu:this.state.showContextMenu?this.onContextMenuFallback:void 0,children:(0,re.tZ)(N.Z,{disableErrorBoundary:!0,id:`chart-id-${r}`,className:S,chartType:Z,width:o,height:s,annotationData:d,datasource:l,initialValues:c,formData:y,ownState:h,filterState:p,hooks:this.hooks,behaviors:Ce,queriesData:this.mutableQueriesResponse,onRenderSuccess:this.handleRenderSuccess,onRenderFailure:this.handleRenderFailure,noResults:T,postTransformProps:b,emitCrossFilters:a,legendState:this.state.legendState,...$},`${r}`)})]})}}Te.propTypes=xe,Te.defaultProps=Se;const _e=Te;var we=i(8743),Me=i(72875);const $e=({chartId:e,error:t,...i})=>{const{result:n}=(0,we.hb)(e),r=t&&{...t,extra:{...t.extra,owners:n}};return(0,re.tZ)(Me.Z,{...i,error:r})};var Ee=i(75701);const Ie={annotationData:d().object,actions:d().object,chartId:d().number.isRequired,datasource:d().object,dashboardId:d().number,initialValues:d().object,formData:d().object.isRequired,labelColors:d().object,sharedLabelColors:d().object,width:d().number,height:d().number,setControlValue:d().func,timeout:d().number,vizType:d().string.isRequired,triggerRender:d().bool,force:d().bool,isFiltersInitialized:d().bool,chartAlert:d().string,chartStatus:d().string,chartStackTrace:d().string,queriesResponse:d().arrayOf(d().object),triggerQuery:d().bool,chartIsStale:d().bool,errorMessage:d().node,addFilter:d().func,onQuery:d().func,onFilterMenuOpen:d().func,onFilterMenuClose:d().func,ownState:d().object,postTransformProps:d().func,datasetsStatus:d().oneOf(["loading","error","complete"]),isInView:d().bool,emitCrossFilters:d().bool},Fe={},De=(0,u.t)("The dataset associated with this chart no longer exists"),Re={addFilter:()=>Fe,onFilterMenuOpen:()=>Fe,onFilterMenuClose:()=>Fe,initialValues:Fe,setControlValue(){},triggerRender:!1,dashboardId:null,chartStackTrace:null,force:!1,isInView:!0},Ne=h.iK.div`
  min-height: ${e=>e.height}px;
  position: relative;
  text-align: center;

  .chart-tooltip {
    opacity: 0.75;
    font-size: ${({theme:e})=>e.typography.sizes.s}px;
  }

  .slice_container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: ${e=>e.height}px;

    .pivot_table tbody tr {
      font-feature-settings: 'tnum' 1;
    }

    .alert {
      margin: ${({theme:e})=>2*e.gridUnit}px;
    }
  }
`,ke=h.iK.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
`,Oe=h.iK.span`
  display: block;
  margin: ${({theme:e})=>4*e.gridUnit}px auto;
  width: fit-content;
  color: ${({theme:e})=>e.colors.grayscale.base};
`,Ue=h.iK.div`
  font-family: ${({theme:e})=>e.typography.families.monospace};
  word-break: break-word;
  overflow-x: auto;
  white-space: pre-wrap;
`;class qe extends c.PureComponent{constructor(e){super(e),this.handleRenderContainerFailure=this.handleRenderContainerFailure.bind(this)}componentDidMount(){this.props.triggerQuery&&this.runQuery()}componentDidUpdate(){this.props.triggerQuery&&this.runQuery()}runQuery(){this.props.actions.postChartFormData(this.props.formData,Boolean(this.props.force||(0,C.eY)(Z.KD.force)),this.props.timeout,this.props.chartId,this.props.dashboardId,this.props.ownState)}handleRenderContainerFailure(e,t){const{actions:i,chartId:n}=this.props;p.Z.warn(e),i.chartRenderingFailed(e.toString(),n,t?t.componentStack:null),i.logEvent(x.aD,{slice_id:n,has_err:!0,error_details:e.toString(),start_offset:this.renderStartTime,ts:(new Date).getTime(),duration:x.Yd.getTimestamp()-this.renderStartTime})}renderErrorMessage(e){var t;const{chartId:i,chartAlert:r,chartStackTrace:a,datasource:o,dashboardId:s,height:l,datasetsStatus:d}=this.props,c=null==e||null==(t=e.errors)?void 0:t[0],u=r||(null==e?void 0:e.message);return void 0!==r&&r!==De&&o===v.tw&&d!==_.ni.Error?(0,re.tZ)(Ne,{"data-ui-anchor":"chart",className:"chart-container",height:l,children:(0,re.tZ)(b.Z,{})},i):(0,re.tZ)($e,{chartId:i,error:c,subtitle:(0,re.tZ)(Ue,{children:u}),copyText:u,link:e?e.link:null,source:s?n.Dashboard:n.Explore,stackTrace:a},i)}renderSpinner(e){const t=e?(0,u.t)("Waiting on %s",e):(0,u.t)("Waiting on database...");return(0,re.BX)(ke,{children:[(0,re.tZ)(b.Z,{position:"inline-centered"}),(0,re.tZ)(Oe,{children:t})]})}renderChartContainer(){return(0,re.tZ)("div",{className:"slice_container",children:this.props.isInView||!(0,m.cr)(m.TT.DashboardVirtualization)||(0,S.b)()?(0,re.tZ)(_e,{...this.props,source:this.props.dashboardId?"dashboard":"explore"}):(0,re.tZ)(b.Z,{})})}render(){var e;const{height:t,chartAlert:i,chartStatus:n,datasource:r,errorMessage:a,chartIsStale:o,queriesResponse:s=[],width:l}=this.props,d=null==r||null==(e=r.database)?void 0:e.name,c="loading"===n;return this.renderContainerStartTime=x.Yd.getTimestamp(),"failed"===n?s.map((e=>this.renderErrorMessage(e))):a&&0===(0,g.Z)(s).length?(0,re.tZ)(f.XJ,{title:(0,u.t)("Add required control values to preview chart"),description:(0,Ee.J)(!0),image:"chart.svg"}):c||i||a||!o||0!==(0,g.Z)(s).length?(0,re.tZ)(y.Z,{onError:this.handleRenderContainerFailure,showMessage:!1,children:(0,re.tZ)(Ne,{"data-ui-anchor":"chart",className:"chart-container",height:t,width:l,children:c?this.renderSpinner(d):this.renderChartContainer()})}):(0,re.tZ)(f.XJ,{title:(0,u.t)("Your chart is ready to go!"),description:(0,re.BX)("span",{children:[(0,u.t)('Click on "Create chart" button in the control panel on the left to preview a visualization or')," ",(0,re.tZ)("span",{role:"button",tabIndex:0,onClick:this.props.onQuery,children:(0,u.t)("click here")}),"."]}),image:"chart.svg"})}}qe.propTypes=Ie,qe.defaultProps=Re;const Le=qe,Be=(0,r.$j)(null,(function(e){return{actions:(0,a.DE)({...o,updateDataMask:B.eG,logEvent:s.logEvent},e)}}))(Le)},28543:(e,t,i)=>{i.d(t,{Z:()=>s});var n=i(69856),r=i(56565),a=i(61641);const o=[...n.qB].map((e=>n.LT[e].operation));class s{constructor(e){var t;this.expressionType=e.expressionType||a.p.Simple,this.expressionType===a.p.Simple?(this.subject=e.subject,this.operator=null==(t=e.operator)?void 0:t.toUpperCase(),this.operatorId=e.operatorId,this.comparator=e.comparator,[n.d.IsTrue,n.d.IsFalse].indexOf(e.operatorId)>=0&&(this.comparator=e.operatorId===n.d.IsTrue),[n.d.IsNull,n.d.IsNotNull].indexOf(e.operatorId)>=0&&(this.comparator=null),this.clause=e.clause||a.N.Where,this.sqlExpression=null):this.expressionType===a.p.Sql&&(this.sqlExpression="string"==typeof e.sqlExpression?e.sqlExpression:(0,r.c)(e,{useSimple:!0}),this.clause=e.clause,e.operator&&o.indexOf(e.operator)>=0?(this.subject=e.subject,this.operator=e.operator,this.operatorId=e.operatorId):(this.subject=null,this.operator=null),this.comparator=null),this.isExtra=!!e.isExtra,this.isNew=!!e.isNew,this.datasourceWarning=!!e.datasourceWarning,this.filterOptionName=e.filterOptionName||`filter_${Math.random().toString(36).substring(2,15)}_${Math.random().toString(36).substring(2,15)}`}duplicateWith(e){return new s({...this,isNew:!1,...e})}equals(e){return e.expressionType===this.expressionType&&e.sqlExpression===this.sqlExpression&&e.operator===this.operator&&e.operatorId===this.operatorId&&e.comparator===this.comparator&&e.subject===this.subject}isValid(){const e=[n.d.IsNotNull,n.d.IsNull].map((e=>n.LT[e].operation)),t=[n.d.IsTrue,n.d.IsFalse].map((e=>n.LT[e].operation));if(this.expressionType===a.p.Simple){if(e.indexOf(this.operator)>=0)return!(!this.operator||!this.subject);if(t.indexOf(this.operator)>=0)return!(!this.subject||null===this.comparator);if(this.operator&&this.subject&&this.clause)if(Array.isArray(this.comparator)){if(this.comparator.length>0)return!0}else if(null!==this.comparator)return!0}else if(this.expressionType===a.p.Sql)return!(!this.sqlExpression||!this.clause);return!1}getDefaultLabel(){const e=this.translateToSql();return e.length<43?e:`${e.substring(0,40)}...`}getTooltipTitle(){return this.translateToSql()}translateToSql(){return(0,r.c)(this)}}},61890:(e,t,i)=>{i.d(t,{Z:()=>k});var n=i(67294),r=i(45697),a=i.n(r),o=i(31069),s=i(68492),l=i(61988),d=i(55786),c=i(68135),u=i(82342),h=i(17536),p=i(27130),m=i(19113),g=i(69856),v=i(40266),b=i(33334),f=i(13322),y=i(74069),x=i(96055),Z=i(42753),C=i(7848),S=i(35944);function T({adhocFilter:e,options:t,datasource:i,onFilterEdit:n,onRemoveFilter:r,partitionColumn:a,onMoveLabel:o,onDropLabel:s,index:l,sections:d,operators:c}){const{actualTimeRange:u,title:h}=(0,C.w)(e);return(0,S.tZ)(x.Z,{sections:d,operators:c,adhocFilter:e,options:t,datasource:i,onFilterEdit:n,partitionColumn:a,children:(0,S.tZ)(b.yz,{label:null!=u?u:e.getDefaultLabel(),tooltipTitle:null!=h?h:e.getTooltipTitle(),onRemove:r,onMoveLabel:o,onDropLabel:s,index:l,type:Z.g.FilterOption,withCaret:!0,isExtra:e.isExtra})})}var _=i(28543),w=i(61641);const M=a().oneOfType([a().shape({expressionType:a().oneOf([w.p.Simple]).isRequired,clause:a().oneOf([w.N.Having,w.N.Where]).isRequired,subject:a().string.isRequired,comparator:a().oneOfType([a().string,a().arrayOf(a().string)]).isRequired}),a().shape({expressionType:a().oneOf([w.p.Sql]).isRequired,clause:a().oneOf([w.N.Where,w.N.Having]).isRequired,sqlExpression:a().string.isRequired})]);var $=i(72201),E=i(23525);const{warning:I}=y.default,F=a().oneOfType([a().string,h.Z]),D={label:a().oneOfType([a().object,a().string]),name:a().string,sections:a().arrayOf(a().string),operators:a().arrayOf(a().string),onChange:a().func,value:a().arrayOf(M),datasource:a().object,columns:a().arrayOf($.Z),savedMetrics:a().arrayOf(p.Z),selectedMetrics:a().oneOfType([F,a().arrayOf(F)]),isLoading:a().bool,canDelete:a().func};function R(e){return e&&!(e instanceof _.Z)&&e.expressionType}class N extends n.Component{constructor(e){super(e),this.optionsForSelect=this.optionsForSelect.bind(this),this.onRemoveFilter=this.onRemoveFilter.bind(this),this.onNewFilter=this.onNewFilter.bind(this),this.onFilterEdit=this.onFilterEdit.bind(this),this.moveLabel=this.moveLabel.bind(this),this.onChange=this.onChange.bind(this),this.mapOption=this.mapOption.bind(this),this.getMetricExpression=this.getMetricExpression.bind(this),this.removeFilter=this.removeFilter.bind(this);const t=(this.props.value||[]).map((e=>R(e)?new _.Z(e):e));this.optionRenderer=e=>(0,S.tZ)(v.Z,{option:e}),this.valueRenderer=(e,t)=>(0,S.tZ)(T,{index:t,adhocFilter:e,onFilterEdit:this.onFilterEdit,options:this.state.options,sections:this.props.sections,operators:this.props.operators,datasource:this.props.datasource,onRemoveFilter:e=>{e.stopPropagation(),this.onRemoveFilter(t)},onMoveLabel:this.moveLabel,onDropLabel:()=>this.props.onChange(this.state.values),partitionColumn:this.state.partitionColumn},t),this.state={values:t,options:this.optionsForSelect(this.props),partitionColumn:null}}componentDidMount(){const{datasource:e}=this.props;if(e&&"table"===e.type){var t;const i=null==(t=e.database)?void 0:t.id,{datasource_name:n,catalog:r,schema:a,is_sqllab_view:l}=e;!l&&i&&n&&a&&o.Z.get({endpoint:`/api/v1/database/${i}/table_metadata/extra/${(0,E.UK)({name:n,catalog:r,schema:a})}`}).then((({json:e})=>{if(e&&e.partitions){const{partitions:t}=e;t&&t.cols&&1===Object.keys(t.cols).length&&this.setState({partitionColumn:t.cols[0]})}})).catch((e=>{s.Z.error("fetch extra_table_metadata:",e.statusText)}))}}UNSAFE_componentWillReceiveProps(e){this.props.columns!==e.columns&&this.setState({options:this.optionsForSelect(e)}),this.props.value!==e.value&&this.setState({values:(e.value||[]).map((e=>R(e)?new _.Z(e):e))})}removeFilter(e){const t=[...this.state.values];t.splice(e,1),this.setState((e=>({...e,values:t}))),this.props.onChange(t)}onRemoveFilter(e){const{canDelete:t}=this.props,{values:i}=this.state,n=null==t?void 0:t(i[e],i);"string"!=typeof n?this.removeFilter(e):I({title:(0,l.t)("Warning"),content:n})}onNewFilter(e){const t=this.mapOption(e);t&&this.setState((e=>({...e,values:[...e.values,t]})),(()=>{this.props.onChange(this.state.values)}))}onFilterEdit(e){this.props.onChange(this.state.values.map((t=>t.filterOptionName===e.filterOptionName?e:t)))}onChange(e){const t=(e||[]).map((e=>this.mapOption(e))).filter((e=>e));this.props.onChange(t)}getMetricExpression(e){return this.props.savedMetrics.find((t=>t.metric_name===e)).expression}moveLabel(e,t){const{values:i}=this.state,n=[...i];[n[t],n[e]]=[n[e],n[t]],this.setState({values:n})}mapOption(e){return e instanceof _.Z?e:e.saved_metric_name?new _.Z({expressionType:w.p.Sql,subject:this.getMetricExpression(e.saved_metric_name),operator:g.LT[g.d.GreaterThan].operation,comparator:0,clause:w.N.Having}):e.label?new _.Z({expressionType:w.p.Sql,subject:new m.Z(e).translateToSql(),operator:g.LT[g.d.GreaterThan].operation,comparator:0,clause:w.N.Having}):e.column_name?new _.Z({expressionType:w.p.Simple,subject:e.column_name,operator:g.LT[g.d.Equals].operation,comparator:"",clause:w.N.Where,isNew:!0}):null}optionsForSelect(e){return[...e.columns,...(0,d.Z)(e.selectedMetrics).map((e=>e&&("string"==typeof e?{saved_metric_name:e}:new m.Z(e))))].filter((e=>e)).reduce(((e,t)=>(t.saved_metric_name?e.push({...t,filterOptionName:t.saved_metric_name}):t.column_name?e.push({...t,filterOptionName:`_col_${t.column_name}`}):t instanceof m.Z&&e.push({...t,filterOptionName:`_adhocmetric_${t.label}`}),e)),[]).sort(((e,t)=>(e.saved_metric_name||e.column_name||e.label).localeCompare(t.saved_metric_name||t.column_name||t.label)))}addNewFilterPopoverTrigger(e){return(0,S.tZ)(x.Z,{operators:this.props.operators,sections:this.props.sections,adhocFilter:new _.Z({}),datasource:this.props.datasource,options:this.state.options,onFilterEdit:this.onNewFilter,partitionColumn:this.state.partitionColumn,children:e})}render(){const{theme:e}=this.props;return(0,S.BX)("div",{className:"metrics-select",children:[(0,S.BX)(b.gM,{children:[(0,S.tZ)(u.Z,{...this.props}),this.addNewFilterPopoverTrigger((0,S.tZ)(b.IG,{children:(0,S.tZ)(f.Z.PlusLarge,{iconSize:"s",iconColor:e.colors.grayscale.light5})}))]}),(0,S.tZ)(b.yj,{children:this.state.values.length>0?this.state.values.map(((e,t)=>this.valueRenderer(e,t))):this.addNewFilterPopoverTrigger((0,S.BX)(b.SW,{children:[(0,S.tZ)(f.Z.PlusSmall,{iconColor:e.colors.grayscale.light1}),(0,l.t)("Add filter")]}))})]})}}N.propTypes=D,N.defaultProps={name:"",onChange:()=>{},columns:[],savedMetrics:[],selectedMetrics:[]};const k=(0,c.b)(N)},72201:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(45697),r=i.n(n);const a=r().shape({column_name:r().string.isRequired,type:r().string})},19113:(e,t,i)=>{i.d(t,{Z:()=>s,v:()=>r});var n=i(69856);const r={SIMPLE:"SIMPLE",SQL:"SQL"};function a(e){if(e.sqlExpression&&n.Q_.test(e.sqlExpression)){const t=e.sqlExpression.indexOf(")"),i=e.sqlExpression.substring(0,t).lastIndexOf("(");if(t>0&&i>0)return e.sqlExpression.substring(i+1,t)}return null}function o(e){if(e.sqlExpression&&n.Q_.test(e.sqlExpression)){const t=e.sqlExpression.indexOf("(");if(t>0)return e.sqlExpression.substring(0,t)}return null}class s{constructor(e){if(this.expressionType=e.expressionType||r.SIMPLE,this.expressionType===r.SIMPLE){const t=a(e);this.column=e.column||t&&{column_name:t},this.aggregate=e.aggregate||o(e),this.sqlExpression=null}else this.expressionType===r.SQL&&(this.sqlExpression=e.sqlExpression,this.column=null,this.aggregate=null);this.datasourceWarning=!!e.datasourceWarning,this.hasCustomLabel=!(!e.hasCustomLabel||!e.label),this.label=this.hasCustomLabel?e.label:this.getDefaultLabel(),this.optionName=e.optionName||`metric_${Math.random().toString(36).substring(2,15)}_${Math.random().toString(36).substring(2,15)}`}getDefaultLabel(){return this.translateToSql({useVerboseName:!0})}translateToSql(e={useVerboseName:!1,transformCountDistinct:!1}){if(this.expressionType===r.SIMPLE){var t,i;const r=this.aggregate||"",a=e.useVerboseName&&null!=(t=this.column)&&t.verbose_name?`(${this.column.verbose_name})`:null!=(i=this.column)&&i.column_name?`(${this.column.column_name})`:"";return e.transformCountDistinct&&r===n.YY.COUNT_DISTINCT&&/^\(.*\)$/.test(a)?`COUNT(DISTINCT ${a.slice(1,-1)})`:r+a}return this.expressionType===r.SQL?this.sqlExpression:""}duplicateWith(e){return new s({...this,...e})}equals(e){return e.label===this.label&&e.expressionType===this.expressionType&&e.sqlExpression===this.sqlExpression&&e.aggregate===this.aggregate&&(e.column&&e.column.column_name)===(this.column&&this.column.column_name)}isValid(){return this.expressionType===r.SIMPLE?!(!this.column||!this.aggregate):this.expressionType===r.SQL&&!!this.sqlExpression}inferSqlExpressionAggregate(){return o(this)}inferSqlExpressionColumn(){return a(this)}}},40266:(e,t,i)=>{i.d(t,{Z:()=>c});var n=i(45697),r=i.n(n),a=i(34087),o=i(17536),s=i(99963),l=i(35944);const d={option:r().oneOfType([a.Z,r().shape({saved_metric_name:r().string.isRequired}),o.Z]).isRequired};function c({option:e}){return e.saved_metric_name?(0,l.tZ)(s.l,{column:{column_name:e.saved_metric_name,type:"expression"},showType:!0}):e.column_name?(0,l.tZ)(s.l,{column:e,showType:!0}):e.label?(0,l.tZ)(s.l,{column:{column_name:e.label,type:"expression"},showType:!0}):null}c.propTypes=d},17536:(e,t,i)=>{i.d(t,{Z:()=>l});var n=i(45697),r=i.n(n),a=i(69856),o=i(34087),s=i(19113);const l=r().oneOfType([r().shape({expressionType:r().oneOf([s.v.SIMPLE]).isRequired,column:o.Z.isRequired,aggregate:r().oneOf(Object.keys(a.YY)).isRequired,label:r().string.isRequired}),r().shape({expressionType:r().oneOf([s.v.SQL]).isRequired,sqlExpression:r().string.isRequired,label:r().string.isRequired})])},34087:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(45697),r=i.n(n);const a=r().shape({column_name:r().string.isRequired,type:r().string})},27130:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(45697),r=i.n(n);const a=r().shape({metric_name:r().string,verbose_name:r().string,expression:r().string})},96022:(e,t,i)=>{i.d(t,{ZN:()=>j,gT:()=>X});var n=i(67294),r=i(28216),a=i(51995),o=i(11965),s=i(61988),l=i(93185),d=i(13322),c=i(83862),u=i(1304),h=i(35932),p=i(14114),m=i(12515),g=i(56727),v=i(23525),b=i(10222),f=i(21312),y=i(97381),x=i(3741),Z=i(15423),C=i(9875),S=i(43617),T=i(27600),_=i(50909),w=i(35944);const M=(0,a.iK)(_.qi)`
  && {
    margin: 0 0 ${({theme:e})=>e.gridUnit}px;
  }
`,$=({formData:e,addDangerToast:t})=>{const[i,r]=(0,n.useState)("400"),[a,l]=(0,n.useState)("600"),[d,c]=(0,n.useState)(""),[u,h]=(0,n.useState)(""),p=(0,n.useCallback)((e=>{const{value:t,name:i}=e.currentTarget;"width"===i&&l(t),"height"===i&&r(t)}),[]),m=(0,n.useCallback)((()=>{c(""),(0,v.YE)(e).then((e=>{c(e),h("")})).catch((()=>{h((0,s.t)("Error")),t((0,s.t)("Sorry, something went wrong. Try again later."))}))}),[t,e]);(0,n.useEffect)((()=>{m()}),[]);const g=(0,n.useMemo)((()=>{if(!d)return"";const e=`${d}?${T.KD.standalone.name}=1&height=${i}`;return`<iframe\n  width="${a}"\n  height="${i}"\n  seamless\n  frameBorder="0"\n  scrolling="no"\n  src="${e}"\n>\n</iframe>`}),[i,d,a]),b=u||g||(0,s.t)("Generating link, please wait..");return(0,w.BX)("div",{id:"embed-code-popover",children:[(0,w.BX)("div",{css:o.iv`
          display: flex;
          flex-direction: column;
        `,children:[(0,w.tZ)(S.Z,{shouldShowText:!1,text:g,copyNode:(0,w.tZ)(M,{buttonSize:"xsmall",children:(0,w.tZ)("i",{className:"fa fa-clipboard"})})}),(0,w.tZ)(C.Kx,{name:"embedCode",disabled:!g,value:b,rows:"4",readOnly:!0,css:e=>o.iv`
            resize: vertical;
            padding: ${2*e.gridUnit}px;
            font-size: ${e.typography.sizes.s}px;
            border-radius: 4px;
            background-color: ${e.colors.secondary.light5};
          `})]}),(0,w.BX)("div",{css:e=>o.iv`
          display: flex;
          margin-top: ${4*e.gridUnit}px;
          & > div {
            margin-right: ${2*e.gridUnit}px;
          }
          & > div:last-of-type {
            margin-right: 0;
            margin-left: ${2*e.gridUnit}px;
          }
        `,children:[(0,w.BX)("div",{children:[(0,w.tZ)("label",{htmlFor:"embed-height",children:(0,s.t)("Chart height")}),(0,w.tZ)(C.II,{type:"text",defaultValue:i,name:"height",onChange:p})]}),(0,w.BX)("div",{children:[(0,w.tZ)("label",{htmlFor:"embed-width",children:(0,s.t)("Chart width")}),(0,w.tZ)(C.II,{type:"text",defaultValue:a,name:"width",onChange:p,id:"embed-width"})]})]})]})};var E=i(73727);const I=({chartId:e,dashboards:t=[],...i})=>{const r=(0,a.Fg)(),[l,u]=(0,n.useState)(),[h,p]=(0,n.useState)(),m=t.length>10,g=t.filter((e=>!l||e.dashboard_title.toLowerCase().includes(l.toLowerCase()))),v=0===t.length,b=l&&0===g.length,f=e?`?focused_chart=${e}`:"";return(0,w.BX)(w.HY,{children:[m&&(0,w.tZ)(C.II,{allowClear:!0,placeholder:(0,s.t)("Search"),prefix:(0,w.tZ)(d.Z.Search,{iconSize:"l"}),css:o.iv`
            width: ${220}px;
            margin: ${2*r.gridUnit}px ${3*r.gridUnit}px;
          `,value:l,onChange:e=>u(e.currentTarget.value)}),(0,w.BX)("div",{css:o.iv`
          max-height: ${300}px;
          overflow: auto;
        `,children:[g.map((e=>(0,w.tZ)(c.Menu.Item,{onMouseEnter:()=>p(e.id),onMouseLeave:()=>{h===e.id&&p(null)},...i,children:(0,w.tZ)(E.rU,{target:"_blank",rel:"noreferer noopener",to:`/superset/dashboard/${e.id}${f}`,children:(0,w.BX)("div",{css:o.iv`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  max-width: ${220}px;
                `,children:[(0,w.tZ)("div",{css:o.iv`
                    white-space: normal;
                  `,children:e.dashboard_title}),(0,w.tZ)(d.Z.Full,{iconSize:"l",iconColor:r.colors.grayscale.base,css:o.iv`
                    margin-left: ${2*r.gridUnit}px;
                    visibility: ${h===e.id?"visible":"hidden"};
                  `})]})})},String(e.id)))),b&&(0,w.tZ)("div",{css:o.iv`
              margin-left: ${3*r.gridUnit}px;
              margin-bottom: ${r.gridUnit}px;
            `,children:(0,s.t)("No results found")}),v&&(0,w.tZ)(c.Menu.Item,{disabled:!0,css:o.iv`
              min-width: ${220}px;
            `,...i,children:(0,s.t)("None")})]})]})},F="edit_properties",D="export_to_csv",R="export_to_csv_pivoted",N="export_to_json",k="export_to_xlsx",O="download_as_image",U="copy_permalink",q="embed_code",L="share_by_email",B="view_query",A="run_in_sql_lab",z=["pivot_table_v2"],j=a.iK.div`
  ${({theme:e})=>o.iv`
    display: flex;
    align-items: center;

    & svg {
      width: ${3*e.gridUnit}px;
      height: ${3*e.gridUnit}px;
    }

    & span[role='checkbox'] {
      display: inline-flex;
      margin-right: ${e.gridUnit}px;
    }
  `}
`,P=((0,a.iK)(h.Z)`
  ${({theme:e})=>o.iv`
    width: ${8*e.gridUnit}px;
    height: ${8*e.gridUnit}px;
    padding: 0;
    border: 1px solid ${e.colors.primary.dark2};

    &.ant-btn > span.anticon {
      line-height: 0;
      transition: inherit;
    }

    &:hover:not(:focus) > span.anticon {
      color: ${e.colors.primary.light1};
    }
  `}
`,o.iv`
  .ant-dropdown-menu-item > & > .anticon:first-child {
    margin-right: 0;
    vertical-align: 0;
  }
`),X=(e,t,i,o,h,C,S,...T)=>{const _=(0,a.Fg)(),{addDangerToast:M,addSuccessToast:E}=(0,p.e1)(),j=(0,r.I0)(),[X,H]=(0,n.useState)(null),[V,K]=(0,n.useState)(!1),Y=(0,r.v9)((e=>{var t;return null==(t=e.charts)?void 0:t[(0,m.Jp)(e.explore)]})),{datasource:W}=e,G=(0,n.useCallback)((async()=>{try{const t=(0,s.t)("Superset Chart"),i=await(0,v.YE)(e),n=encodeURIComponent((0,s.t)("%s%s","Check out this chart: ",i));window.location.href=`mailto:?Subject=${t}%20&Body=${n}`}catch(e){M((0,s.t)("Sorry, something went wrong. Try again later."))}}),[M,e]),Q=(0,n.useCallback)((()=>t?(0,m.pe)({formData:e,ownState:C,resultType:"full",resultFormat:"csv"}):null),[t,e]),J=(0,n.useCallback)((()=>t?(0,m.pe)({formData:e,resultType:"post_processed",resultFormat:"csv"}):null),[t,e]),ee=(0,n.useCallback)((()=>(0,m.pe)({formData:e,resultType:"results",resultFormat:"json"})),[e]),te=(0,n.useCallback)((()=>(0,m.pe)({formData:e,resultType:"results",resultFormat:"xlsx"})),[e]),ie=(0,n.useCallback)((async()=>{try{if(!e)throw new Error;await(0,b.Z)((()=>(0,v.YE)(e))),E((0,s.t)("Copied to clipboard!"))}catch(e){M((0,s.t)("Sorry, something went wrong. Try again later."))}}),[M,E,e]),ne=(0,n.useCallback)((({key:t,domEvent:n})=>{var r;switch(t){case F:h(),K(!1);break;case D:Q(),K(!1),j((0,y.logEvent)(x.F8,{chartId:null==i?void 0:i.slice_id,chartName:null==i?void 0:i.slice_name}));break;case R:J(),K(!1),j((0,y.logEvent)(x.t4,{chartId:null==i?void 0:i.slice_id,chartName:null==i?void 0:i.slice_name}));break;case N:ee(),K(!1),j((0,y.logEvent)(x.Tl,{chartId:null==i?void 0:i.slice_id,chartName:null==i?void 0:i.slice_name}));break;case k:te(),K(!1),j((0,y.logEvent)(x.BL,{chartId:null==i?void 0:i.slice_id,chartName:null==i?void 0:i.slice_name}));break;case O:(0,g.Z)(".panel-body .chart-container",null!=(r=null==i?void 0:i.slice_name)?r:(0,s.t)("New chart"),!0)(n),K(!1),j((0,y.logEvent)(x.xE,{chartId:null==i?void 0:i.slice_id,chartName:null==i?void 0:i.slice_name}));break;case U:ie(),K(!1);break;case q:K(!1);break;case L:G(),K(!1);break;case B:K(!1);break;case A:o(e,n.metaKey),K(!1)}}),[ie,Q,J,ee,e,o,h,G,null==i?void 0:i.slice_name]);return[(0,n.useMemo)((()=>(0,w.BX)(c.Menu,{onClick:ne,selectable:!1,...T,children:[(0,w.BX)(w.HY,{children:[i&&(0,w.tZ)(c.Menu.Item,{children:(0,s.t)("Edit chart properties")},F),(0,w.tZ)(c.Menu.SubMenu,{title:(0,s.t)("On dashboards"),children:(0,w.tZ)(I,{chartId:null==i?void 0:i.slice_id,dashboards:S})},"dashboards_added_to"),(0,w.tZ)(c.Menu.Divider,{})]}),(0,w.BX)(c.Menu.SubMenu,{title:(0,s.t)("Download"),children:[z.includes(e.viz_type)?(0,w.BX)(w.HY,{children:[(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileOutlined,{css:P}),disabled:!t,children:(0,s.t)("Export to original .CSV")},D),(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileOutlined,{css:P}),disabled:!t,children:(0,s.t)("Export to pivoted .CSV")},R)]}):(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileOutlined,{css:P}),disabled:!t,children:(0,s.t)("Export to .CSV")},D),(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileOutlined,{css:P}),children:(0,s.t)("Export to .JSON")},N),(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileImageOutlined,{css:P}),children:(0,s.t)("Download as image")},O),(0,w.tZ)(c.Menu.Item,{icon:(0,w.tZ)(d.Z.FileOutlined,{css:P}),children:(0,s.t)("Export to Excel")},k)]},"download_submenu"),(0,w.BX)(c.Menu.SubMenu,{title:(0,s.t)("Share"),children:[(0,w.tZ)(c.Menu.Item,{children:(0,s.t)("Copy permalink to clipboard")},U),(0,w.tZ)(c.Menu.Item,{children:(0,s.t)("Share chart by email")},L),(0,l.cr)(l.TT.EmbeddableCharts)?(0,w.tZ)(c.Menu.Item,{children:(0,w.tZ)(u.Z,{triggerNode:(0,w.tZ)("span",{children:(0,s.t)("Embed code")}),modalTitle:(0,s.t)("Embed code"),modalBody:(0,w.tZ)($,{formData:e,addDangerToast:M}),maxWidth:100*_.gridUnit+"px",destroyOnClose:!0,responsive:!0})},q):null]},"share_submenu"),(0,w.tZ)(c.Menu.Divider,{}),X?(0,w.BX)(w.HY,{children:[(0,w.tZ)(c.Menu.SubMenu,{title:(0,s.t)("Manage email report"),children:(0,w.tZ)(f.Z,{chart:Y,setShowReportSubMenu:H,showReportSubMenu:X,setIsDropdownVisible:K,isDropdownVisible:V,useTextMenu:!0})}),(0,w.tZ)(c.Menu.Divider,{})]}):(0,w.tZ)(c.Menu,{children:(0,w.tZ)(f.Z,{chart:Y,setShowReportSubMenu:H,setIsDropdownVisible:K,isDropdownVisible:V,useTextMenu:!0})}),(0,w.tZ)(c.Menu.Item,{children:(0,w.tZ)(u.Z,{triggerNode:(0,w.tZ)("span",{children:(0,s.t)("View query")}),modalTitle:(0,s.t)("View query"),modalBody:(0,w.tZ)(Z.Z,{latestQueryFormData:e}),draggable:!0,resizable:!0,responsive:!0})},B),W&&(0,w.tZ)(c.Menu.Item,{children:(0,s.t)("Run in SQL Lab")},A)]})),[M,t,Y,S,ne,V,e,X,i,_.gridUnit]),V,K]}},33313:(e,t,i)=>{i.d(t,{Z:()=>r});var n=i(44904);const r=["AND","AS","ASC","AVG","BY","CASE","COUNT","CREATE","CROSS","DATABASE","DEFAULT","DELETE","DESC","DISTINCT","DROP","ELSE","END","FOREIGN","FROM","GRANT","GROUP","HAVING","IF","INNER","INSERT","JOIN","KEY","LEFT","LIMIT","MAX","MIN","NATURAL","NOT","NULL","OFFSET","ON","OR","ORDER","OUTER","PRIMARY","REFERENCES","RIGHT","SELECT","SUM","TABLE","THEN","TYPE","UNION","UPDATE","WHEN","WHERE"].concat(["BIGINT","BINARY","BIT","CHAR","DATE","DECIMAL","DOUBLE","FLOAT","INT","INTEGER","MONEY","NUMBER","NUMERIC","REAL","SET","TEXT","TIMESTAMP","VARCHAR"]).map((e=>({meta:"sql",name:e,score:n.Yn,value:e})))},15856:(e,t,i)=>{i.d(t,{j:()=>s});var n=i(11965),r=i(13322),a=i(58593),o=i(35944);const s=({title:e,color:t})=>(0,o.tZ)(a.u,{title:e,placement:"top",children:(0,o.tZ)(r.Z.InfoCircleOutlined,{css:e=>n.iv`
        color: ${t||e.colors.text.label};
        margin-left: ${2*e.gridUnit}px;
        &.anticon {
          font-size: unset;
          .anticon {
            line-height: unset;
            vertical-align: unset;
          }
        }
      `})})},41814:(e,t,i)=>{i.d(t,{p:()=>de});var n=i(41609),r=i.n(n),a=i(67294),o=i(61988),s=i(11965),l=i(32103),d=i(51995),c=i(11064),u=i(16355),h=i(69363),p=i(28216),m=i(83862),g=i(16550),v=i(74069),b=i(35932),f=i(57001),y=i(12617),x=i(88889),Z=i(55786),C=i(99612),S=i(38703),T=i(27600),_=i(35944);const w=function({value:e}){return(0,_.tZ)("span",{children:e?T.Ly:T.gz})},M=function(){return(0,_.tZ)("span",{css:e=>s.iv`
        color: ${e.colors.grayscale.light1};
      `,children:T.Wq})};var $=i(42846),E=i(51115);const I=function({format:e=$.default.DATABASE_DATETIME,value:t}){return t?(0,_.tZ)("span",{children:(0,E.bt)(e).format(t)}):(0,_.tZ)(M,{})};var F=i(94301),D=i(52256),R=i(93197),N=i(87183),k=i(4715),O=i(13322),U=i(99075);const q=function(e){const{headerTitle:t,groupTitle:i,groupOptions:n,value:r,onChange:o}=e,l=(0,d.Fg)(),[c,u]=(0,a.useState)(!1);return(0,_.BX)("div",{css:s.iv`
        display: flex;
        align-items: center;
      `,children:[(0,_.tZ)(U.J,{trigger:"click",visible:c,content:(0,_.BX)("div",{children:[(0,_.tZ)("div",{css:s.iv`
                font-weight: ${l.typography.weights.bold};
                margin-bottom: ${l.gridUnit}px;
              `,children:i}),(0,_.tZ)(N.Y.Group,{value:r,onChange:e=>{o(e.target.value),u(!1)},children:(0,_.tZ)(k.T,{direction:"vertical",children:n.map((e=>(0,_.tZ)(N.Y,{value:e.value,children:e.label},e.value)))})})]}),placement:"bottomLeft",arrowPointAtCenter:!0,children:(0,_.tZ)(O.Z.SettingOutlined,{iconSize:"m",iconColor:l.colors.grayscale.light1,css:s.iv`
            margin-top: 3px; // we need exactly 3px to align the icon
            margin-right: ${l.gridUnit}px;
          `,onClick:()=>u(!0)})}),t]})};var L=i(42190),B=i(53579),A=i(60331),z=i(72813),j=i(89555);function P({filters:e,setFilters:t,totalCount:i,loading:n,onReload:r}){const l=(0,d.Fg)(),c=(0,a.useMemo)((()=>Object.assign({},...e.map((e=>({[(0,z.GA)(e.col)?e.col.label:e.col]:e}))))),[e]),u=(0,a.useCallback)((e=>{const i={...c};delete i[e],t([...Object.values(i)])}),[c,t]),h=(0,a.useMemo)((()=>Object.entries(c).map((([e,{val:t,formattedVal:i}])=>({colName:e,val:null!=i?i:t}))).sort(((e,t)=>e.colName.localeCompare(t.colName)))),[c]);return(0,_.BX)("div",{css:s.iv`
        display: flex;
        justify-content: space-between;
        padding: ${l.gridUnit/2}px 0;
        margin-bottom: ${2*l.gridUnit}px;
      `,children:[(0,_.tZ)("div",{css:s.iv`
          display: flex;
          flex-wrap: wrap;
          margin-bottom: -${4*l.gridUnit}px;
        `,children:h.map((({colName:e,val:t})=>(0,_.BX)(A.Z,{closable:!0,onClose:u.bind(null,e),css:s.iv`
              height: ${6*l.gridUnit}px;
              display: flex;
              align-items: center;
              padding: ${l.gridUnit/2}px ${2*l.gridUnit}px;
              margin-right: ${4*l.gridUnit}px;
              margin-bottom: ${4*l.gridUnit}px;
              line-height: 1.2;
            `,children:[(0,_.tZ)("span",{css:s.iv`
                margin-right: ${l.gridUnit}px;
              `,children:e}),(0,_.tZ)("strong",{children:t})]},e)))}),(0,_.BX)("div",{css:s.iv`
          display: flex;
          align-items: center;
          height: min-content;
        `,children:[(0,_.tZ)(j.Z,{loading:n&&!i,rowcount:i}),(0,_.tZ)(O.Z.ReloadOutlined,{iconColor:l.colors.grayscale.light1,iconSize:"l","aria-label":(0,o.t)("Reload"),role:"button",onClick:r})]})]})}var X=i(57557),H=i.n(X),V=i(65946);const K=50;var Y,W={name:"82a6rk",styles:"flex:1"};function G({children:e}){const{ref:t,height:i}=(0,C.NB)();return(0,_.tZ)("div",{ref:t,css:W,children:(0,a.cloneElement)(e,{height:i})})}function Q({formData:e,initialFilters:t}){var i;const n=(0,d.Fg)(),[r,l]=(0,a.useState)(0),c=(0,a.useRef)(r),[u,h]=(0,a.useState)(t),[m,g]=(0,a.useState)(!1),[v,b]=(0,a.useState)(""),[f,y]=(0,a.useState)(new Map),[C,T]=(0,a.useState)({}),$=(0,p.v9)((e=>e.common.conf.SAMPLES_ROW_LIMIT)),[E,N]=(0,a.useMemo)((()=>e.datasource.split("__")),[e.datasource]),{metadataBar:k,status:O}=(0,B.S)({datasetId:E}),U=(0,a.useMemo)((()=>{const e=f.get(r);return e?(c.current=r,e):f.get(c.current)}),[r,f]),A=(0,a.useMemo)((()=>(null==U?void 0:U.colNames.map(((e,t)=>({key:e,dataIndex:e,title:(null==U?void 0:U.colTypes[t])===x.Z.Temporal?(0,_.tZ)(q,{headerTitle:e,groupTitle:(0,o.t)("Formatting"),groupOptions:[{label:(0,o.t)("Original value"),value:Y.Original},{label:(0,o.t)("Formatted value"),value:Y.Formatted}],value:C[e]===Y.Original?Y.Original:Y.Formatted,onChange:t=>T((i=>({...i,[e]:t})))}):e,render:i=>!0===i||!1===i?(0,_.tZ)(w,{value:i}):null===i?(0,_.tZ)(M,{}):(null==U?void 0:U.colTypes[t])===x.Z.Temporal&&C[e]!==Y.Original&&("number"==typeof i||i instanceof Date)?(0,_.tZ)(I,{value:i}):String(i),width:150}))))||[]),[null==U?void 0:U.colNames,null==U?void 0:U.colTypes,C]),z=(0,a.useMemo)((()=>(null==U?void 0:U.data.map(((e,t)=>null==U?void 0:U.colNames.reduce(((t,i)=>({...t,[i]:e[i]})),{key:t}))))||[]),[null==U?void 0:U.colNames,null==U?void 0:U.data]),j=(0,a.useCallback)((()=>{b(""),y(new Map),l(0)}),[]);(0,a.useEffect)((()=>{b(""),y(new Map),l(0)}),[u]),(0,a.useEffect)((()=>{if(f.has(r)&&[...f.keys()].at(-1)!==r){const e=new Map(f);e.delete(r),y(e.set(r,f.get(r)))}}),[r,f]),(0,a.useEffect)((()=>{if(!v&&!m&&!f.has(r)){var t;g(!0);const i=null!=(t=function(e,t){if(!e)return;const i=(0,V.Z)(e),n=H()(i.extras,"having"),r=[...(0,Z.Z)(i.filters),...(0,Z.Z)(t).map((e=>H()(e,"formattedVal")))];return{granularity:i.granularity,time_range:i.time_range,filters:r,extras:n}}(e,u))?t:{},n=Math.ceil($/K);(0,D.getDatasourceSamples)(N,E,!1,i,K,r+1).then((e=>{y(new Map([...[...f.entries()].slice(1-n),[r,{total:e.total_count,data:e.data,colNames:(0,Z.Z)(e.colnames),colTypes:(0,Z.Z)(e.coltypes)}]])),b("")})).catch((e=>{b(`${e.name}: ${e.message}`)})).finally((()=>{g(!1)}))}}),[$,E,N,u,e,m,r,v,f]);const X=!v&&!f.size||O===L.ni.Loading,W=null==(i=e.allow_render_html)||i;let Q=null;if(v)Q=(0,_.tZ)("pre",{css:s.iv`
          margin-top: ${4*n.gridUnit}px;
        `,children:v});else if(X)Q=(0,_.tZ)(S.Z,{});else if(0===(null==U?void 0:U.total)){const e=(0,o.t)("No rows were returned for this dataset");Q=(0,_.tZ)(F.x3,{image:"document.svg",title:e})}else Q=(0,_.tZ)(G,{children:(0,_.tZ)(R.ZP,{data:z,columns:A,size:R.ex.Small,defaultPageSize:K,recordCount:null==U?void 0:U.total,usePagination:!0,loading:m,onChange:e=>l(e.current?e.current-1:0),resizable:!0,virtualize:!0,allowHTML:W})});return(0,_.BX)(_.HY,{children:[!X&&k,!X&&(0,_.tZ)(P,{filters:u,setFilters:h,totalCount:null==U?void 0:U.total,loading:m,onReload:j}),Q]})}!function(e){e[e.Original=0]="Original",e[e.Formatted=1]="Formatted"}(Y||(Y={}));const J=({canExplore:e,closeModal:t,exploreChart:i})=>{const n=(0,d.Fg)();return(0,_.BX)(_.HY,{children:[(0,_.tZ)(b.Z,{buttonStyle:"secondary",buttonSize:"small",onClick:i,disabled:!e,tooltip:e?void 0:(0,o.t)("You do not have sufficient permissions to edit the chart"),children:(0,o.t)("Edit chart")}),(0,_.tZ)(b.Z,{buttonStyle:"primary",buttonSize:"small",onClick:t,css:s.iv`
          margin-left: ${2*n.gridUnit}px;
        `,children:(0,o.t)("Close")})]})};function ee({chartId:e,formData:t,initialFilters:i,showModal:n,onHideModal:r}){const l=(0,d.Fg)(),c=(0,g.k6)(),u=(0,a.useContext)(f.DashboardPageIdContext),{slice_name:h}=(0,p.v9)((t=>t.sliceEntities.slices[e])),m=(0,p.v9)((e=>{var t;return(0,y.R)("can_explore","Superset",null==(t=e.user)?void 0:t.roles)})),b=(0,a.useMemo)((()=>`/explore/?dashboard_page_id=${u}&slice_id=${e}`),[e,u]),x=(0,a.useCallback)((()=>{c.push(b)}),[b,c]);return(0,_.tZ)(v.default,{show:n,onHide:null!=r?r:()=>null,css:s.iv`
        .ant-modal-body {
          display: flex;
          flex-direction: column;
        }
      `,title:(0,o.t)("Drill to detail: %s",h),footer:(0,_.tZ)(J,{exploreChart:x,canExplore:m}),responsive:!0,resizable:!0,resizableConfig:{minHeight:128*l.gridUnit,minWidth:128*l.gridUnit,defaultSize:{width:"auto",height:"75vh"}},draggable:!0,destroyOnClose:!0,maskClosable:!1,children:(0,_.tZ)(Q,{formData:t,initialFilters:i})})}var te=i(69175),ie=i(15856),ne=i(46219);const re=(0,o.t)("Drill to detail"),ae=(0,o.t)("Drill to detail by"),oe={DATABASE:(0,o.t)("Drill to detail is disabled for this database. Change the database settings to enable it."),NO_AGGREGATIONS:(0,o.t)("Drill to detail is disabled because this chart does not group data by dimension value."),NO_FILTERS:(0,o.t)("Right-click on a dimension value to drill to detail by that value."),NOT_SUPPORTED:(0,o.t)("Drill to detail by value is not yet supported for this chart type.")},se=({children:e,...t})=>(0,_.tZ)(m.Menu.Item,{disabled:!0,...t,children:(0,_.tZ)("div",{css:s.iv`
        white-space: normal;
        max-width: 160px;
      `,children:e})}),le=(0,d.iK)((({children:e,stripHTML:t=!1})=>{const i=t&&"string"==typeof e?(0,l.ZU)(e):e;return(0,_.tZ)("span",{children:i})}))`
  ${({theme:e})=>`\n     font-weight: ${e.typography.weights.bold};\n     color: ${e.colors.primary.base};\n   `}
`,de=({chartId:e,formData:t,filters:i=[],isContextMenu:n=!1,contextMenuY:l=0,onSelection:d=(()=>null),onClick:g=(()=>null),submenuIndex:v=0,showModal:b,setShowModal:f,drillToDetailMenuRef:y,...x})=>{const Z=(0,p.v9)((({datasources:e})=>{var i,n;return null==(i=e[t.datasource])||null==(n=i.database)?void 0:n.disable_drill_to_detail})),[C,S]=(0,a.useState)([]),T=(0,a.useCallback)(((e,t)=>{g(t),d(),S(e),f(!0)}),[g,d]),w=(0,a.useCallback)((()=>{f(!1)}),[]),M=(0,a.useMemo)((()=>{var e;return null==(e=(0,c.Z)().get(t.viz_type))?void 0:e.behaviors.find((e=>e===u.cg.DrillToDetail))}),[t.viz_type]),$=(0,a.useMemo)((()=>{const{metrics:e}=(0,h.Z)(t);return r()(e)}),[t]),E=(0,a.useMemo)((()=>(0,te.th)(l,i.length>1?i.length+1:i.length,v)),[l,i.length,v]);let I,F;Z?(I=oe.DATABASE,F=oe.DATABASE):M?$?(I=oe.NO_AGGREGATIONS,F=oe.NO_AGGREGATIONS):null!=i&&i.length||(F=oe.NO_FILTERS):F=oe.NOT_SUPPORTED;const D=I?(0,s.az)(se,{...x,key:"drill-to-detail-disabled"},re,(0,_.tZ)(ie.j,{title:I})):(0,s.az)(m.Menu.Item,{...x,key:"drill-to-detail",onClick:T.bind(null,[]),ref:y},re),R=F?(0,s.az)(se,{...x,key:"drill-to-detail-by-disabled"},ae,(0,_.tZ)(ie.j,{title:F})):(0,_.tZ)(m.Menu.SubMenu,{...x,popupOffset:[0,E],popupClassName:"chart-context-submenu",title:ae,children:(0,_.BX)("div",{children:[i.map(((e,t)=>(0,s.az)(ne.i,{...x,tooltipText:`${ae} ${e.formattedVal}`,key:`drill-detail-filter-${t}`,onClick:T.bind(null,[e])},`${ae} `,(0,_.tZ)(le,{stripHTML:!0,children:e.formattedVal})))),i.length>1&&(0,s.az)(m.Menu.Item,{...x,key:"drill-detail-filter-all",onClick:T.bind(null,i)},(0,_.BX)("div",{children:[`${ae} `,(0,_.tZ)(le,{stripHTML:!1,children:(0,o.t)("all")})]}))]})});return(0,_.BX)(_.HY,{children:[D,n&&R,(0,_.tZ)(ee,{chartId:e,formData:t,initialFilters:C,showModal:b,onHideModal:w})]})}},46219:(e,t,i)=>{i.d(t,{i:()=>l});var n=i(3297),r=i(11965),a=i(83862),o=i(58593),s=i(35944);const l=({tooltipText:e,children:t,...i})=>{const[l,d]=(0,n.Z)();return(0,s.tZ)(a.Menu.Item,{css:r.iv`
        display: flex;
      `,...i,children:(0,s.tZ)(o.u,{title:d?e:null,children:(0,s.tZ)("div",{ref:l,css:r.iv`
            max-width: 100%;
            ${n.B};
          `,children:t})})})}},69175:(e,t,i)=>{i.d(t,{$t:()=>n,th:()=>r});const n=(e,t,i=Number.MAX_SAFE_INTEGER,n=0)=>{const r=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0),a=Math.min(32*t,i)+32+n;return r-e<a?r-a:e},r=(e,t,i=0,r=Number.MAX_SAFE_INTEGER,a=0)=>{const o=e+4+32*i+4;return n(o,t,r,a)-o}},87253:(e,t,i)=>{i.d(t,{lU:()=>s.lU,zq:()=>s.zq,ZP:()=>o});var n=i(51995),r=i(35944);const a=n.iK.span`
  &,
  & svg {
    vertical-align: top;
  }
`;function o({checked:e,onChange:t,style:i,className:n}){return(0,r.tZ)(a,{style:i,onClick:()=>{t(!e)},role:"checkbox",tabIndex:0,"aria-checked":e,"aria-label":"Checkbox",className:n||"",children:e?(0,r.tZ)(s.lU,{}):(0,r.tZ)(s.zq,{})})}var s=i(13842)},88694:(e,t,i)=>{i.d(t,{$i:()=>p,Lt:()=>h});var n=i(67294),r=i(4715),a=i(51995),o=i(13322),s=i(35944);const l=a.iK.div`
  width: ${({theme:e})=>.75*e.gridUnit}px;
  height: ${({theme:e})=>.75*e.gridUnit}px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.grayscale.light1};

  font-weight: ${({theme:e})=>e.typography.weights.normal};
  display: inline-flex;
  position: relative;

  &:hover {
    background-color: ${({theme:e})=>e.colors.primary.base};

    &::before,
    &::after {
      background-color: ${({theme:e})=>e.colors.primary.base};
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: ' ';
    width: ${({theme:e})=>.75*e.gridUnit}px;
    height: ${({theme:e})=>.75*e.gridUnit}px;
    border-radius: 50%;
    background-color: ${({theme:e})=>e.colors.grayscale.light1};
  }

  &::before {
    top: ${({theme:e})=>e.gridUnit}px;
  }

  &::after {
    bottom: ${({theme:e})=>e.gridUnit}px;
  }
`,d=a.iK.div`
  display: flex;
  align-items: center;
  padding: ${({theme:e})=>2*e.gridUnit}px;
  padding-left: ${({theme:e})=>e.gridUnit}px;
`;var c;!function(e){e.Vertical="vertical",e.Horizontal="horizontal"}(c||(c={}));const u=(e=c.Vertical)=>e===c.Horizontal?(0,s.tZ)(o.Z.MoreHoriz,{iconSize:"xl"}):(0,s.tZ)(l,{}),h=({overlay:e,iconOrientation:t=c.Vertical,...i})=>(0,s.tZ)(r.Gj,{overlay:e,...i,children:(0,s.tZ)(d,{children:u(t)})}),p=e=>{const{children:t,onBlur:i,onKeyDown:a,...o}=e,l=(0,n.cloneElement)(t,{onBlur:i,onKeyDown:a});return(0,s.tZ)(r.Gj,{overlayStyle:e.overlayStyle,...o,children:l})}},1510:(e,t,i)=>{i.d(t,{GW:()=>y,Rz:()=>f,X3:()=>g,on:()=>p,vk:()=>m,zi:()=>h});var n=i(5364),r=i(16355),a=i(93185),o=i(61988),s=i(70400),l=i(81255),d=i(80621),c=i(20292);const u=()=>{var e,t;const i=(0,c.Z)();return(null==i||null==(e=i.common)||null==(t=e.conf)?void 0:t.NATIVE_FILTER_DEFAULT_ROW_LIMIT)||1e3},h=({datasetId:e,dependencies:t={},groupby:i,defaultDataMask:n,controlValues:r,filterType:a,sortMetric:o,adhoc_filters:l,time_range:d,granularity_sqla:c,type:h,dashboardId:p,id:m})=>{var g;const v={};return e&&(v.datasource=`${e}__table`),i&&(v.groupby=[i]),o&&(v.sortMetric=o),{...r,...v,adhoc_filters:null!=l?l:[],extra_filters:[],extra_form_data:t,granularity_sqla:c,metrics:["count"],row_limit:u(),showSearch:!0,defaultValue:null==n||null==(g=n.filterState)?void 0:g.value,time_range:d,url_params:(0,s.Z)("regular"),inView:!0,viz_type:a,type:h,dashboardId:p,native_filter_id:m}};function p(e={},t={}){const i={};return n.Ci.forEach((n=>{const r=[...e[n]||[],...t[n]||[]];r.length&&(i[n]=r)})),n.Ay.forEach((n=>{const r=e[n];void 0!==r&&(i[n]=r);const a=t[n];void 0!==a&&(i[n]=a)})),i}function m(e,t){let i={};return t.forEach((t=>{var n,r;i=p(i,null!=(n=null==(r=e[t])?void 0:r.extraFormData)?n:{})})),i}function g(e){return!e.includes(r.cg.NativeFilter)||(0,a.cr)(a.TT.DashboardCrossFilters)&&e.includes(r.cg.InteractiveChart)}const v=(e,t)=>{var i;return(null==e||null==(i=e[t])?void 0:i.type)===l.gn},b=(e,t,i,n,r,a)=>{var o,s,d,c,u,h;a.has(i)||(a.add(i),(null==e||null==(o=e[i])?void 0:o.type)===l.dW&&t.includes(null==(s=e[i])||null==(d=s.meta)?void 0:d.chartId)&&n.forEach(r.add,r),0===(null==e||null==(c=e[i])||null==(u=c.children)?void 0:u.length)||v(e,i)&&r.has(i)||null==(h=e[i])||h.children.forEach((i=>b(e,t,i,v(e,i)?[...n,i]:n,r,a))))},f=(e,t)=>{const i=e[d._4].children[0],n=i!==d.PV,r=new Set,a=new Set;var o,s;return n?null==(o=e[i])||null==(s=o.children)||s.forEach((i=>b(e,t,i,[i],r,a))):Object.values(e).filter((e=>(null==e?void 0:e.type)===l.gn)).forEach((i=>b(e,t,i.id,[i.id],r,a))),r},y=e=>null==e?"":"string"==typeof e||"number"==typeof e?`${e}`:Array.isArray(e)?e.join(", "):"object"==typeof e?JSON.stringify(e):(0,o.t)("Unknown value")},91914:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(1510),r=i(99543);function a(e){return Object.entries(e).map((([e,t])=>({col:e,op:Array.isArray(t)?"IN":"==",val:t}))).filter((e=>null!==e.val))}var o=i(87915);const s={},l={};function d({chart:e,filters:t,nativeFilters:i,chartConfiguration:d,colorScheme:c,colorNamespace:u,sliceId:h,dataMask:p,extraControls:m,labelColors:g,sharedLabelColors:v,allSliceIds:b}){const f=l[h];if(s[h]===t&&(0,r.JB)(null==f?void 0:f.color_scheme,c,{ignoreUndefined:!0})&&(0,r.JB)(null==f?void 0:f.color_namespace,u,{ignoreUndefined:!0})&&(0,r.JB)(null==f?void 0:f.label_colors,g,{ignoreUndefined:!0})&&(0,r.JB)(null==f?void 0:f.shared_label_colors,v,{ignoreUndefined:!0})&&f&&(0,r.JB)(null==f?void 0:f.dataMask,p,{ignoreUndefined:!0})&&(0,r.JB)(null==f?void 0:f.extraControls,m,{ignoreUndefined:!0}))return f;let y={};const x=(0,o.g)({chartConfiguration:d,dataMask:p,nativeFilters:i,allSliceIds:b}),Z=Object.entries(x).filter((([,{scope:t}])=>t.includes(e.id))).map((([e])=>e));Z.length&&(y={extra_form_data:(0,n.vk)(p,Z)});const C={...e.form_data,label_colors:g,shared_label_colors:v,...c&&{color_scheme:c},extra_filters:a(t),...y,...m};return s[h]=t,l[h]={...C,dataMask:p,extraControls:m},C}},50909:(e,t,i)=>{i.d(t,{C4:()=>R,HS:()=>M,_q:()=>k,m:()=>w,qi:()=>_});var n=i(11965),r=i(23279),a=i.n(r),o=i(67294),s=i(51995),l=i(61988),d=i(51115),c=i(42846),u=i(88889),h=i(32103),p=i(4715),m=i(9875),g=i(27600),v=i(87183),b=i(13322),f=i(35932),y=i(99075),x=i(54076),Z=i(43617),C=i(61587),S=i(35944);const T=(0,s.iK)("span")`
  color: ${({theme:e})=>e.colors.grayscale.light1};
`,_=(0,s.iK)(f.Z)`
  font-size: ${({theme:e})=>e.typography.sizes.s}px;

  // needed to override button's first-of-type margin: 0
  && {
    margin: 0 ${({theme:e})=>2*e.gridUnit}px;
  }

  i {
    padding: 0 ${({theme:e})=>e.gridUnit}px;
  }
`,w=({data:e,columns:t})=>{const i=(0,s.Fg)();return(0,S.tZ)(Z.Z,{text:e&&t?(0,x.Mv)(e,t):"",wrapped:!1,copyNode:(0,S.tZ)(b.Z.CopyOutlined,{iconColor:i.colors.grayscale.base,iconSize:"l","aria-label":(0,l.t)("Copy"),role:"button",css:n.iv`
            &.anticon > * {
              line-height: 0;
            }
          `})})},M=({onChangeHandler:e,shouldFocus:t=!1})=>{const i=(0,o.useRef)(null);(0,o.useEffect)((()=>{i.current&&t&&i.current.focus()}),[]);const r=(0,s.Fg)(),d=a()(e,g.M$);return(0,S.tZ)(m.II,{prefix:(0,S.tZ)(b.Z.Search,{iconColor:r.colors.grayscale.base}),placeholder:(0,l.t)("Search"),onChange:e=>{const t=e.target.value;d(t)},css:n.iv`
        width: 200px;
        margin-right: ${2*r.gridUnit}px;
      `,ref:i})};var $;!function(e){e.Formatted="formatted",e.Original="original"}($||($={}));const E=({onChange:e,value:t})=>(0,S.tZ)(v.Y.Group,{value:t,onChange:e,children:(0,S.BX)(p.T,{direction:"vertical",children:[(0,S.tZ)(v.Y,{value:$.Formatted,children:(0,l.t)("Formatted date")}),(0,S.tZ)(v.Y,{value:$.Original,children:(0,l.t)("Original value")})]})}),I=s.iK.div`
  display: flex;
  flex-direction: column;

  padding: ${({theme:e})=>4*e.gridUnit+"px"};
`,F=s.iK.span`
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
  color: ${({theme:e})=>e.colors.grayscale.base};
  margin-bottom: ${({theme:e})=>2*e.gridUnit}px;
  text-transform: uppercase;
`,D=({columnName:e,onTimeColumnChange:t,datasourceId:i,isOriginalTimeColumn:r})=>{const a=(0,s.Fg)(),d=i=>{t(e,i.target.value)},c=(0,o.useMemo)((()=>i?(0,S.BX)(I,{onClick:e=>e.stopPropagation(),children:[(0,S.tZ)(n.xB,{styles:n.iv`
              .column-formatting-popover .ant-popover-inner-content {
                padding: 0;
              }
            `}),(0,S.tZ)(F,{children:(0,l.t)("Column Formatting")}),(0,S.tZ)(E,{onChange:d,value:r?$.Original:$.Formatted})]}):null),[i,r]);return i?(0,S.BX)("span",{children:[(0,S.tZ)(y.J,{overlayClassName:"column-formatting-popover",trigger:"click",content:c,placement:"bottomLeft",arrowPointAtCenter:!0,children:(0,S.tZ)(b.Z.SettingOutlined,{iconSize:"m",iconColor:a.colors.grayscale.light1,css:(0,n.iv)({marginRight:`${a.gridUnit}px`},"",""),onClick:e=>e.stopPropagation()})}),e]}):(0,S.tZ)("span",{children:e})},R=(e,t)=>{const i=(0,o.useMemo)((()=>{var e;return null!=(e=null==t?void 0:t.map((e=>Object.values(e).map((e=>e?e.toString().toLowerCase():(0,l.t)("N/A"))))))?e:[]}),[t]);return(0,o.useMemo)((()=>null!=t&&t.length?t.filter(((t,n)=>i[n].some((t=>null==t?void 0:t.includes(e.toLowerCase()))))):[]),[t,e,i])},N=(0,d.bt)(c.default.DATABASE_DATETIME),k=(e,t,i,n,r,a,s)=>{const[l,d]=(0,o.useState)((0,C.W)(n)),c=(e,t)=>{if(n)if(t!==$.Original||l.includes(e)){if(t===$.Formatted&&l.includes(e)){const t=(0,C.W)(n);t.splice(t.indexOf(e),1),(0,C.e)(n,t),d(t)}}else{const t=(0,C.W)(n);t.push(e),(0,C.e)(n,t),d(t)}};return(0,o.useEffect)((()=>{r&&d((0,C.W)(n))}),[n,r]),(0,o.useMemo)((()=>e&&null!=i&&i.length?e.filter((e=>Object.keys(i[0]).includes(e))).map(((e,r)=>{const o=null==t?void 0:t[r],d=i[0][e],p=o===u.Z.Temporal?l.indexOf(e):-1,m=l.includes(e);return{id:e||r,accessor:t=>t[e],Header:o===u.Z.Temporal&&"string"!=typeof d?(0,S.tZ)(D,{columnName:e,datasourceId:n,onTimeColumnChange:c,isOriginalTimeColumn:m}):e,Cell:({value:e})=>!0===e?g.Ly:!1===e?g.gz:null===e?(0,S.tZ)(T,{children:g.Wq}):o===u.Z.Temporal&&-1===p&&"number"==typeof e?N(e):"string"==typeof e&&s?(0,h.Ul)(e):String(e),...null==a?void 0:a[e]}})):[]),[e,i,t,n,a,l])}},61587:(e,t,i)=>{i.d(t,{W:()=>a,e:()=>o});var n=i(55786),r=i(61337);const a=e=>{const t=(0,r.rV)(r.dR.ExploreDataTableOriginalFormattedTimeColumns,{});return void 0===e?[]:(0,n.Z)(t[e])},o=(e,t)=>{const i=(0,r.rV)(r.dR.ExploreDataTableOriginalFormattedTimeColumns,{});(0,r.LS)(r.dR.ExploreDataTableOriginalFormattedTimeColumns,{...i,[e]:t})}},66124:(e,t,i)=>{i.d(t,{X:()=>m,c:()=>g});var n=i(4788),r=i.n(n),a=i(67294),o=i(51995),s=i(88889),l=i(11965),d=i(50909),c=i(54076),u=i(61587),h=i(89555),p=i(35944);const m=o.iK.div`
  ${({theme:e})=>`\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: ${2*e.gridUnit}px;\n\n    span {\n      flex-shrink: 0;\n    }\n  `}
`,g=({data:e,datasourceId:t,onInputChange:i,columnNames:n,columnTypes:o,rowcount:g,isLoading:v})=>{const b=(0,u.W)(t),f=r()(n,o).filter((([e,t])=>t===s.Z.Temporal&&e&&!b.includes(e))).map((([e])=>e)),y=(0,a.useMemo)((()=>(0,c.cD)(e,f)),[e,f]);return(0,p.BX)(m,{children:[(0,p.tZ)(d.HS,{onChangeHandler:i,shouldFocus:!0}),(0,p.BX)("div",{css:l.iv`
          display: flex;
          align-items: center;
        `,children:[(0,p.tZ)(h.Z,{rowcount:g,loading:v}),(0,p.tZ)(d.m,{data:y,columns:n})]})]})}},5462:(e,t,i)=>{i.d(t,{T:()=>d});var n=i(67294),r=i(61988),a=i(76962),o=i(50909),s=i(66124),l=i(35944);const d=({data:e,colnames:t,coltypes:i,rowcount:d,datasourceId:c,dataSize:u=50,isVisible:h})=>{const[p,m]=(0,n.useState)(""),g=(0,o._q)(t,i,e,c,h,{},!0),v=(0,o.C4)(p,e);return(0,l.BX)(l.HY,{children:[(0,l.tZ)(s.c,{data:v,columnNames:t,columnTypes:i,rowcount:d,datasourceId:c,onInputChange:e=>m(e),isLoading:!1}),(0,l.tZ)(a.Z,{columns:g,data:v,pageSize:u,noDataText:(0,r.t)("No results"),emptyWrapperType:a.u.Small,className:"table-condensed",isPaginationSticky:!0,showRowCount:!1,small:!0})]})}},21496:(e,t,i)=>{i.d(t,{c9:()=>F,Tg:()=>T});var n,r=i(67294),a=i(51995),o=i(93185),s=i(61988),l=i(13322),d=i(71262),c=i(61337);!function(e){e.Results="results",e.Samples="samples"}(n||(n={}));var u=i(11064),h=i(55786),p=i(44818),m=i(38703),g=i(94301),v=i(52256),b=i(5462),f=i(66124),y=i(35944);const x=a.iK.pre`
  margin-top: ${({theme:e})=>4*e.gridUnit+"px"};
`,Z=new WeakMap,C=({isRequest:e,queryFormData:t,queryForce:i,ownState:n,errorMessage:a,actions:o,isVisible:l,dataSize:d=50})=>{var c;const C=(0,u.Z)().get((null==t?void 0:t.viz_type)||(null==t?void 0:t.vizType)),[S,T]=(0,r.useState)([]),[_,w]=(0,r.useState)(!0),[M,$]=(0,r.useState)(""),E=null!=(c=null==C?void 0:C.queryObjectCount)?c:1;if((0,r.useEffect)((()=>{a||(e&&Z.has(t)&&(T((0,h.Z)(Z.get(t))),$(""),i&&o&&o.setForceQuery(!1),w(!1)),e&&!Z.has(t)&&(w(!0),(0,v.getChartDataRequest)({formData:t,force:i,resultFormat:"json",resultType:"results",ownState:n}).then((({json:e})=>{T((0,h.Z)(e.result)),$(""),Z.set(t,e.result),i&&o&&o.setForceQuery(!1)})).catch((e=>{(0,p.O$)(e).then((({error:e,message:t})=>{$(e||t||(0,s.t)("Sorry, an error occurred"))}))})).finally((()=>{w(!1)}))))}),[t,e]),(0,r.useEffect)((()=>{a&&w(!1)}),[a]),_)return Array(E).fill((0,y.tZ)(m.Z,{}));if(a){const e=(0,s.t)("Run a query to display results");return Array(E).fill((0,y.tZ)(g.x3,{image:"document.svg",title:e}))}if(M){const e=(0,y.BX)(y.HY,{children:[(0,y.tZ)(f.c,{data:[],columnNames:[],columnTypes:[],rowcount:0,datasourceId:t.datasource,onInputChange:()=>{},isLoading:!1}),(0,y.tZ)(x,{children:M})]});return Array(E).fill(e)}if(0===S.length){const e=(0,s.t)("No results were returned for this query");return Array(E).fill((0,y.tZ)(g.x3,{image:"document.svg",title:e}))}return S.slice(0,E).map(((e,i)=>(0,y.tZ)(b.T,{data:e.data,colnames:e.colnames,coltypes:e.coltypes,rowcount:e.rowcount,dataSize:d,datasourceId:t.datasource,isVisible:l},i)))},S=a.iK.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-tabs {
    height: 100%;
  }

  .ant-tabs-content {
    height: 100%;
  }

  .ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
  }

  .table-condensed {
    overflow: auto;
  }
`,T=({isRequest:e,queryFormData:t,queryForce:i,ownState:r,errorMessage:a,actions:o,isVisible:l,dataSize:c=50})=>{const u=C({errorMessage:a,queryFormData:t,queryForce:i,ownState:r,isRequest:e,actions:o,dataSize:c,isVisible:l});if(1===u.length)return(0,y.tZ)(S,{children:u[0]});const h=u.map(((e,t)=>0===t?(0,y.tZ)(d.ZP.TabPane,{tab:(0,s.t)("Results"),children:e},n.Results):(0,y.tZ)(d.ZP.TabPane,{tab:(0,s.t)("Results %s",t+1),children:e},`${n.Results} ${t+1}`)));return(0,y.tZ)(S,{children:(0,y.tZ)(d.ZP,{fullWidth:!1,children:h})})};var _=i(76962),w=i(50909);const M=a.iK.pre`
  margin-top: ${({theme:e})=>4*e.gridUnit+"px"};
`,$=new WeakSet,E=({isRequest:e,datasource:t,queryForce:i,actions:n,dataSize:a=50,isVisible:o})=>{const[l,d]=(0,r.useState)(""),[c,u]=(0,r.useState)([]),[p,b]=(0,r.useState)([]),[x,Z]=(0,r.useState)([]),[C,S]=(0,r.useState)(!1),[T,E]=(0,r.useState)(0),[I,F]=(0,r.useState)(""),D=(0,r.useMemo)((()=>`${t.id}__${t.type}`),[t]);(0,r.useEffect)((()=>{e&&i&&$.delete(t),e&&!$.has(t)&&(S(!0),(0,v.getDatasourceSamples)(t.type,t.id,i,{}).then((e=>{u((0,h.Z)(e.data)),b((0,h.Z)(e.colnames)),Z((0,h.Z)(e.coltypes)),E(e.rowcount),F(""),$.add(t),i&&n&&n.setForceQuery(!1)})).catch((e=>{u([]),b([]),Z([]),F(`${e.name}: ${e.message}`)})).finally((()=>{S(!1)})))}),[t,e,i]);const R=(0,w._q)(p,x,c,D,o,{},!0),N=(0,w.C4)(l,c);if(C)return(0,y.tZ)(m.Z,{});if(I)return(0,y.BX)(y.HY,{children:[(0,y.tZ)(f.c,{data:N,columnNames:p,columnTypes:x,rowcount:T,datasourceId:D,onInputChange:e=>d(e),isLoading:C}),(0,y.tZ)(M,{children:I})]});if(0===c.length){const e=(0,s.t)("No samples were returned for this dataset");return(0,y.tZ)(g.x3,{image:"document.svg",title:e})}return(0,y.BX)(y.HY,{children:[(0,y.tZ)(f.c,{data:N,columnNames:p,columnTypes:x,rowcount:T,datasourceId:D,onInputChange:e=>d(e),isLoading:C}),(0,y.tZ)(_.Z,{columns:R,data:N,pageSize:a,noDataText:(0,s.t)("No results"),emptyWrapperType:_.u.Small,className:"table-condensed",isPaginationSticky:!0,showRowCount:!1,small:!0})]})},I=a.iK.div`
  ${({theme:e})=>`\n    position: relative;\n    background-color: ${e.colors.grayscale.light5};\n    z-index: 5;\n    overflow: hidden;\n\n    .ant-tabs {\n      height: 100%;\n    }\n\n    .ant-tabs-content-holder {\n      height: 100%;\n    }\n\n    .ant-tabs-content {\n      height: 100%;\n    }\n\n    .ant-tabs-tabpane {\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n\n      .table-condensed {\n        height: 100%;\n        overflow: auto;\n        margin-bottom: ${4*e.gridUnit}px;\n\n        .table {\n          margin-bottom: ${2*e.gridUnit}px;\n        }\n      }\n\n      .pagination-container > ul[role='navigation'] {\n        margin-top: 0;\n      }\n    }\n  `}
`,F=({queryFormData:e,datasource:t,queryForce:i,onCollapseChange:u,chartStatus:h,ownState:p,errorMessage:m,actions:g})=>{const v=(0,a.Fg)(),[b,x]=(0,r.useState)(n.Results),[Z,S]=(0,r.useState)({results:!1,samples:!1}),[T,_]=(0,r.useState)(!(0,o.cr)(o.TT.DatapanelClosedByDefault)&&(0,c.rV)(c.dR.IsDatapanelOpen,!1));(0,r.useEffect)((()=>{(0,o.cr)(o.TT.DatapanelClosedByDefault)||(0,c.LS)(c.dR.IsDatapanelOpen,T)}),[T]),(0,r.useEffect)((()=>{T||S({results:!1,samples:!1}),T&&b.startsWith(n.Results)&&h&&"loading"!==h&&S({results:!0,samples:!1}),T&&b===n.Samples&&S({results:!1,samples:!0})}),[T,b,h]);const w=(0,r.useCallback)((e=>{u(e),_(e)}),[u]),M=(0,r.useCallback)(((e,t)=>{T?e===b&&(t.preventDefault(),w(!1)):w(!0),x(e)}),[b,w,T]),$=(0,r.useMemo)((()=>{const e=T?(0,y.tZ)(l.Z.CaretUp,{iconColor:v.colors.grayscale.base,"aria-label":(0,s.t)("Collapse data panel")}):(0,y.tZ)(l.Z.CaretDown,{iconColor:v.colors.grayscale.base,"aria-label":(0,s.t)("Expand data panel")});return(0,y.tZ)(f.X,{children:T?(0,y.tZ)("span",{role:"button",tabIndex:0,onClick:()=>w(!1),children:e}):(0,y.tZ)("span",{role:"button",tabIndex:0,onClick:()=>w(!0),children:e})})}),[w,T,v.colors.grayscale.base]),F=C({errorMessage:m,queryFormData:e,queryForce:i,ownState:p,isRequest:Z.results,actions:g,isVisible:n.Results===b}).map(((e,t)=>0===t?(0,y.tZ)(d.ZP.TabPane,{tab:(0,s.t)("Results"),children:e},n.Results):t>0?(0,y.tZ)(d.ZP.TabPane,{tab:(0,s.t)("Results %s",t+1),children:e},`${n.Results} ${t+1}`):null));return(0,y.tZ)(I,{children:(0,y.BX)(d.ZP,{fullWidth:!1,tabBarExtraContent:$,activeKey:T?b:"",onTabClick:M,children:[F,(0,y.tZ)(d.ZP.TabPane,{tab:(0,s.t)("Samples"),children:(0,y.tZ)(E,{datasource:t,queryForce:i,isRequest:Z.samples,actions:g,isVisible:n.Samples===b})},n.Samples)]})})}},42753:(e,t,i)=>{var n;i.d(t,{g:()=>n}),function(e){e.Column="column",e.ColumnOption="columnOption",e.AdhocColumnOption="adhocColumn",e.Metric="metric",e.MetricOption="metricOption",e.AdhocMetricOption="adhocMetric",e.FilterOption="filterOption"}(n||(n={}))},63325:(e,t,i)=>{i.d(t,{b:()=>n});const n=i(51995).iK.div`
  .edit-popover-resize {
    transform: scaleX(-1);
    float: right;
    margin-top: ${({theme:e})=>4*e.gridUnit}px;
    margin-right: ${({theme:e})=>-2*e.gridUnit}px;
    cursor: nwse-resize;
  }
  .filter-sql-editor {
    border: ${({theme:e})=>e.colors.grayscale.light2} solid thin;
  }
`},89555:(e,t,i)=>{i.d(t,{Z:()=>d});var n=i(61988),r=i(67190),a=i(37921),o=i(58593),s=i(35944);const l=(0,n.t)("The row limit set for the chart was reached. The chart may show partial data.");function d(e){const{rowcount:t=0,limit:i=null,loading:d}=e,c=i&&t>=i,u=c||0===t&&!d?"danger":"default",h=(0,r.JB)()(t),p=(0,s.tZ)(a.Z,{type:u,children:d?(0,n.t)("Loading..."):(0,s.tZ)("span",{children:(0,n.tn)("%s row","%s rows",t,h)})});return c?(0,s.tZ)(o.u,{id:"tt-rowcount-tooltip",title:(0,s.tZ)("span",{children:l}),children:p}):p}},96055:(e,t,i)=>{i.d(t,{Z:()=>G});var n=i(67294),r=i(45697),a=i.n(r),o=i(35932),s=i(51995),l=i(61988),d=i(57368),c=i(71262),u=i(17536),h=i(28543),p=i(4591),m=i(4715),g=i(37731),v=i(31069),b=i(93185),f=i(69856),y=i(40266),x=i(58593),Z=i(9875),C=i(54076),S=i(45211),T=i(23279),_=i.n(T),w=i(55786),M=i(15926),$=i.n(M);const E={parsedAdvancedDataType:"",advancedDataTypeOperatorList:[],errorMessage:""};var I=i(7848),F=i(61314),D=i(61641),R=i(35944);const N=(0,s.iK)(Z.II)`
  margin-bottom: ${({theme:e})=>4*e.gridUnit}px;
`,k=((0,s.iK)(p.Z)`
  &.ant-row.ant-form-item {
    margin: 0;
  }
`,(0,s.iK)(m.Ph)`
  .ant-select-selector::after {
    content: ${({labelText:e})=>e||"\\A0"};
    display: inline-block;
    white-space: nowrap;
    color: ${({theme:e})=>e.colors.grayscale.light1};
    width: max-content;
  }
`),O=e=>{var t,i;const{onSubjectChange:r,onOperatorChange:a,isOperatorRelevant:o,onComparatorChange:s,onDatePickerChange:d}=(e=>{const t=(0,F.Ct)(),i=(t,i)=>{var n;const r=null==(n=e.datasource.columns)?void 0:n.find((e=>e.column_name===i)),a=!!r&&("BOOL"===r.type||"BOOLEAN"===r.type),o=!!r&&("INT"===r.type||"INTEGER"===r.type),s=!!r&&!!r.expression;if(t&&t===f.d.LatestPartition){const{partitionColumn:t}=e;return t&&i&&i===t}return(!t||t!==f.d.TemporalRange)&&(t===f.d.IsTrue||t===f.d.IsFalse?a||o||s:a?t===f.d.IsNull||t===f.d.IsNotNull:e.adhocFilter.clause!==D.N.Having||-1!==f.Ak.indexOf(t))};return{onSubjectChange:n=>{const r=e.options.find((e=>"column_name"in e&&e.column_name===n||"optionName"in e&&e.optionName===n));let a,o="";r&&"column_name"in r?(o=r.column_name,a=D.N.Where):r&&"saved_metric_name"in r?(o=r.saved_metric_name,a=D.N.Having):null!=r&&r.label&&(o=r.label,a=D.N.Having);let{operator:s,operatorId:l,comparator:d}=e.adhocFilter;s=s&&l&&i(l,o)?f.LT[l].operation:null,(0,g.Z)(s)||(s=f.d.In,l=f.d.In,d=void 0),(0,S.x)(n,e.datasource)&&(o=n,s=f.d.TemporalRange,l=f.d.TemporalRange,d=t),e.onChange(e.adhocFilter.duplicateWith({subject:o,clause:a,operator:s,expressionType:D.p.Simple,operatorId:l,comparator:d}))},onOperatorChange:t=>{const i=e.adhocFilter.comparator;let n;n=f.qK.has(t)?Array.isArray(i)?i:[i].filter((e=>e)):Array.isArray(i)?i[0]:i,t!==f.d.IsTrue&&t!==f.d.IsFalse||(n=f.d.IsTrue===t),t&&f.qB.has(t)?e.onChange(e.adhocFilter.duplicateWith({subject:e.adhocFilter.subject,clause:D.N.Where,operatorId:t,operator:f.LT[t].operation,expressionType:D.p.Sql,datasource:e.datasource})):e.onChange(e.adhocFilter.duplicateWith({operatorId:t,operator:f.LT[t].operation,comparator:n,expressionType:D.p.Simple}))},onComparatorChange:t=>{e.onChange(e.adhocFilter.duplicateWith({comparator:t,expressionType:D.p.Simple}))},isOperatorRelevant:i,clearOperator:()=>{e.onChange(e.adhocFilter.duplicateWith({operatorId:void 0,operator:void 0}))},onDatePickerChange:(t,i)=>{e.onChange(e.adhocFilter.duplicateWith({subject:t,operator:f.d.TemporalRange,comparator:i,expressionType:D.p.Simple}))}}})(e),[c,u]=(0,n.useState)([]),[h,p]=(0,n.useState)(e.adhocFilter.comparator),[Z,T]=(0,n.useState)(!1),{advancedDataTypesState:M,subjectAdvancedDataType:O,fetchAdvancedDataTypeValueCallback:U,fetchSubjectAdvancedDataType:q}=(e=>{const[t,i]=(0,n.useState)(E),[r,a]=(0,n.useState)(),o=(0,n.useCallback)(((t,n,r)=>{const a=(0,w.Z)(t);r?_()((()=>{const t=`/api/v1/advanced_data_type/convert?q=${$().encode({type:r,values:a})}`;v.Z.get({endpoint:t}).then((({json:t})=>{i({parsedAdvancedDataType:t.result.display_value,advancedDataTypeOperatorList:t.result.valid_filter_operators,errorMessage:t.result.error_message}),e(!t.result.error_message)})).catch((()=>{i({parsedAdvancedDataType:"",advancedDataTypeOperatorList:n.advancedDataTypeOperatorList,errorMessage:(0,l.t)("Failed to retrieve advanced type")}),e(!1)}))}),600)():i(E)}),[e]);return{advancedDataTypesState:t,subjectAdvancedDataType:r,setAdvancedDataTypesState:i,fetchAdvancedDataTypeValueCallback:o,fetchSubjectAdvancedDataType:e=>{const t=e.options.find((t=>"column_name"in t&&t.column_name===e.adhocFilter.subject||"optionName"in t&&t.optionName===e.adhocFilter.subject));t&&"advanced_data_type"in t?a(t.advanced_data_type):e.validHandler(!0)}}})(e.validHandler),L=(e,t)=>O?o(e,t)&&M.advancedDataTypeOperatorList.includes(e):o(e,t),B=()=>{const e=(()=>{var e;const t=Array.isArray(h)?h.filter((e=>c.includes(e))).length:0;return null!=(e=(null==c?void 0:c.length)-t)?e:0})(),t=(0,l.t)("%s option(s)",e);return e?t:""};let A=e.options;const{subject:z,operator:j,operatorId:P}=e.adhocFilter,X={ariaLabel:(0,l.t)("Select subject"),value:null!=z?z:void 0,onChange:e=>{p(void 0),r(e)},notFoundContent:(0,l.t)("No such column found. To filter on a metric, try the Custom SQL tab."),autoFocus:!z,placeholder:""};X.placeholder=e.adhocFilter.clause===D.N.Where?(0,l.t)("%s column(s)",A.length):(0,l.t)("To filter on a metric, use Custom SQL tab."),A=e.options.filter((e=>"column_name"in e&&e.column_name));const H={placeholder:(0,l.t)("%s operator(s)",(null!=(t=e.operators)?t:f.GS).filter((e=>L(e,z))).length),value:P,onChange:a,autoFocus:!!X.value&&!j,ariaLabel:(0,l.t)("Select operator")},V=!!X.value&&!!H.value,K={allowClear:!0,allowNewOptions:!0,ariaLabel:(0,l.t)("Comparator option"),mode:f.qK.has(P)?"multiple":"single",loading:Z,value:h,onChange:s,notFoundContent:(0,l.t)("Type a value here"),disabled:f.yi.includes(P),placeholder:B(),autoFocus:V},Y=h&&h.length>0&&B(),W=(0,I.v)({columnName:e.adhocFilter.subject,timeRange:e.adhocFilter.operator===f.d.TemporalRange?e.adhocFilter.comparator:void 0,datasource:e.datasource,onChange:d});(0,n.useEffect)((()=>{W||(()=>{const{datasource:t}=e,i=e.adhocFilter.subject,n=e.adhocFilter.clause===D.N.Having;if(i&&t&&t.filter_select&&!n){const e=new AbortController,{signal:n}=e;Z&&e.abort(),T(!0),v.Z.get({signal:n,endpoint:`/api/v1/datasource/${t.type}/${t.id}/column/${i}/values/`}).then((({json:e})=>{u(e.result.map((e=>({value:e,label:(0,C.lo)(e)})))),T(!1)})).catch((()=>{u([]),T(!1)}))}})()}),[e.adhocFilter.subject]),(0,n.useEffect)((()=>{(0,b.cr)(b.TT.EnableAdvancedDataTypes)&&q(e)}),[e.adhocFilter.subject]),(0,n.useEffect)((()=>{(0,b.cr)(b.TT.EnableAdvancedDataTypes)&&U(void 0===h?"":h,M,O)}),[h,O,U]),(0,n.useEffect)((()=>{(0,b.cr)(b.TT.EnableAdvancedDataTypes)&&p(e.adhocFilter.comparator)}),[e.adhocFilter.comparator]);const G=(0,R.tZ)(m.Ph,{css:e=>({marginTop:4*e.gridUnit,marginBottom:4*e.gridUnit}),options:A.map((e=>{return{value:"column_name"in e&&e.column_name||"optionName"in e&&e.optionName||"",label:"saved_metric_name"in e&&e.saved_metric_name||"column_name"in e&&e.column_name||"label"in e&&e.label,key:"id"in e&&e.id||"optionName"in e&&e.optionName||void 0,customLabel:(t=e,(0,R.tZ)(y.Z,{option:t}))};var t})),...X}),Q=(0,R.BX)(R.HY,{children:[(0,R.tZ)(m.Ph,{css:e=>({marginBottom:4*e.gridUnit}),options:(null!=(i=e.operators)?i:f.GS).filter((e=>L(e,z))).map(((e,t)=>({value:e,label:f.LT[e].display,key:e,order:t}))),...H}),f.qK.has(P)||c.length>0?(0,R.tZ)(x.u,{title:M.errorMessage||M.parsedAdvancedDataType,children:(0,R.tZ)(k,{labelText:Y,options:c,...K})}):(0,R.tZ)(x.u,{title:M.errorMessage||M.parsedAdvancedDataType,children:(0,R.tZ)(N,{name:"filter-value",ref:e=>{e&&V&&e.focus()},onChange:e=>{const{value:t}=e.target;p(t),s(t)},value:h,placeholder:(0,l.t)("Filter value (case sensitive)"),disabled:f.yi.includes(P)})})]});return(0,R.BX)(R.HY,{children:[G,null!=W?W:Q]})};var U=i(94670),q=i(33313),L=i(72201);const B={adhocFilter:a().instanceOf(h.Z).isRequired,onChange:a().func.isRequired,options:a().arrayOf(a().oneOfType([L.Z,a().shape({saved_metric_name:a().string.isRequired}),u.Z])).isRequired,height:a().number.isRequired,activeKey:a().string.isRequired},A=(0,s.iK)(m.Ph)`
  ${({theme:e})=>`\n    width: ${30*e.gridUnit}px;\n    marginRight: ${e.gridUnit}px;\n  `}
`;class z extends n.Component{constructor(e){super(e),this.onSqlExpressionChange=this.onSqlExpressionChange.bind(this),this.onSqlExpressionClauseChange=this.onSqlExpressionClauseChange.bind(this),this.handleAceEditorRef=this.handleAceEditorRef.bind(this),this.selectProps={ariaLabel:(0,l.t)("Select column")}}componentDidUpdate(){this.aceEditorRef&&this.aceEditorRef.editor.resize()}onSqlExpressionClauseChange(e){this.props.onChange(this.props.adhocFilter.duplicateWith({clause:e,expressionType:D.p.Sql}))}onSqlExpressionChange(e){this.props.onChange(this.props.adhocFilter.duplicateWith({sqlExpression:e,expressionType:D.p.Sql}))}handleAceEditorRef(e){e&&(this.aceEditorRef=e)}render(){const{adhocFilter:e,height:t,options:i}=this.props,n={placeholder:(0,l.t)("choose WHERE or HAVING..."),value:e.clause,onChange:this.onSqlExpressionClauseChange},r=q.Z.concat(i.map((e=>e.column_name?{name:e.column_name,value:e.column_name,score:50,meta:"option"}:null)).filter(Boolean)),a=Object.keys(D.N).map((e=>({label:e,value:e})));return(0,R.BX)("span",{children:[(0,R.BX)("div",{className:"filter-edit-clause-section",children:[(0,R.tZ)(A,{options:a,...this.selectProps,...n}),(0,R.BX)("span",{className:"filter-edit-clause-info",children:[(0,R.tZ)("strong",{children:"WHERE"})," ",(0,l.t)("Filters by columns"),(0,R.tZ)("br",{}),(0,R.tZ)("strong",{children:"HAVING"})," ",(0,l.t)("Filters by metrics")]})]}),(0,R.tZ)("div",{css:e=>({marginTop:4*e.gridUnit}),children:(0,R.tZ)(U.iO,{ref:this.handleAceEditorRef,keywords:r,height:t-130+"px",onChange:this.onSqlExpressionChange,width:"100%",showGutter:!1,value:e.sqlExpression||e.translateToSql(),editorProps:{$blockScrolling:!0},enableLiveAutocompletion:!0,className:"filter-sql-editor",wrapEnabled:!0})})]})}}z.propTypes=B;const j={adhocFilter:a().instanceOf(h.Z).isRequired,onChange:a().func.isRequired,onClose:a().func.isRequired,onResize:a().func.isRequired,options:a().arrayOf(a().oneOfType([L.Z,a().shape({saved_metric_name:a().string.isRequired}),u.Z])).isRequired,datasource:a().object,partitionColumn:a().string,theme:a().object,sections:a().arrayOf(a().string),operators:a().arrayOf(a().string),requireSave:a().bool},P=s.iK.i`
  margin-left: ${({theme:e})=>2*e.gridUnit}px;
`,X=s.iK.div`
  .adhoc-filter-edit-tabs > .nav-tabs {
    margin-bottom: ${({theme:e})=>2*e.gridUnit}px;

    & > li > a {
      padding: ${({theme:e})=>e.gridUnit}px;
    }
  }

  #filter-edit-popover {
    max-width: none;
  }

  .filter-edit-clause-info {
    font-size: ${({theme:e})=>e.typography.sizes.xs}px;
    padding-left: ${({theme:e})=>e.gridUnit}px;
  }

  .filter-edit-clause-section {
    display: inline-flex;
  }

  .adhoc-filter-simple-column-dropdown {
    margin-top: ${({theme:e})=>5*e.gridUnit}px;
  }
`,H=s.iK.div`
  margin-top: ${({theme:e})=>2*e.gridUnit}px;
`;class V extends n.Component{constructor(e){var t,i;super(e),this.onSave=this.onSave.bind(this),this.onDragDown=this.onDragDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onAdhocFilterChange=this.onAdhocFilterChange.bind(this),this.setSimpleTabIsValid=this.setSimpleTabIsValid.bind(this),this.adjustHeight=this.adjustHeight.bind(this),this.onTabChange=this.onTabChange.bind(this),this.state={adhocFilter:this.props.adhocFilter,width:f.kc,height:f.H7,activeKey:(null==(t=this.props)||null==(i=t.adhocFilter)?void 0:i.expressionType)||"SIMPLE",isSimpleTabValid:!0},this.popoverContentRef=(0,n.createRef)()}componentDidMount(){document.addEventListener("mouseup",this.onMouseUp)}componentWillUnmount(){document.removeEventListener("mouseup",this.onMouseUp),document.removeEventListener("mousemove",this.onMouseMove)}onAdhocFilterChange(e){this.setState({adhocFilter:e})}setSimpleTabIsValid(e){this.setState({isSimpleTabValid:e})}onSave(){this.props.onChange(this.state.adhocFilter),this.props.onClose()}onDragDown(e){this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.dragStartWidth=this.state.width,this.dragStartHeight=this.state.height,document.addEventListener("mousemove",this.onMouseMove)}onMouseMove(e){this.props.onResize(),this.setState({width:Math.max(this.dragStartWidth+(e.clientX-this.dragStartX),f.kc),height:Math.max(this.dragStartHeight+(e.clientY-this.dragStartY),f.H7)})}onMouseUp(){document.removeEventListener("mousemove",this.onMouseMove)}onTabChange(e){this.setState({activeKey:e})}adjustHeight(e){this.setState((t=>({height:t.height+e})))}render(){const{adhocFilter:e,options:t,onChange:i,onClose:n,onResize:r,datasource:a,partitionColumn:s,theme:u,operators:h,requireSave:p,...m}=this.props,{adhocFilter:g}=this.state,v=g.isValid(),b=p||!g.equals(e);return(0,R.BX)(X,{id:"filter-edit-popover",...m,ref:this.popoverContentRef,children:[(0,R.BX)(c.ZP,{id:"adhoc-filter-edit-tabs",defaultActiveKey:g.expressionType,className:"adhoc-filter-edit-tabs",style:{minHeight:this.state.height,width:this.state.width},allowOverflow:!0,onChange:this.onTabChange,children:[(0,R.tZ)(c.ZP.TabPane,{className:"adhoc-filter-edit-tab",tab:(0,l.t)("Simple"),children:(0,R.tZ)(d.Z,{children:(0,R.tZ)(O,{operators:h,adhocFilter:this.state.adhocFilter,onChange:this.onAdhocFilterChange,options:t,datasource:a,onHeightChange:this.adjustHeight,partitionColumn:s,popoverRef:this.popoverContentRef.current,validHandler:this.setSimpleTabIsValid})})},D.p.Simple),(0,R.tZ)(c.ZP.TabPane,{className:"adhoc-filter-edit-tab",tab:(0,l.t)("Custom SQL"),children:(0,R.tZ)(d.Z,{children:(0,R.tZ)(z,{adhocFilter:this.state.adhocFilter,onChange:this.onAdhocFilterChange,options:this.props.options,height:this.state.height,activeKey:this.state.activeKey})})},D.p.Sql)]}),(0,R.BX)(H,{children:[(0,R.tZ)(o.Z,{buttonSize:"small",onClick:this.props.onClose,cta:!0,children:(0,l.t)("Close")}),(0,R.tZ)(o.Z,{disabled:!v||!this.state.isSimpleTabValid||!b,buttonStyle:"primary",buttonSize:"small",className:"m-r-5",onClick:this.onSave,cta:!0,children:(0,l.t)("Save")}),(0,R.tZ)(P,{role:"button","aria-label":"Resize",tabIndex:0,onMouseDown:this.onDragDown,className:"fa fa-expand edit-popover-resize text-muted"})]})]})}}V.propTypes=j;var K=i(63325),Y=i(27845);class W extends n.PureComponent{constructor(e){super(e),this.onPopoverResize=this.onPopoverResize.bind(this),this.closePopover=this.closePopover.bind(this),this.togglePopover=this.togglePopover.bind(this),this.state={popoverVisible:!1}}onPopoverResize(){this.forceUpdate()}closePopover(){this.togglePopover(!1)}togglePopover(e){this.setState({popoverVisible:e})}render(){const{adhocFilter:e,isControlledComponent:t}=this.props,{visible:i,togglePopover:n,closePopover:r}=t?{visible:this.props.visible,togglePopover:this.props.togglePopover,closePopover:this.props.closePopover}:{visible:this.state.popoverVisible,togglePopover:this.togglePopover,closePopover:this.closePopover},a=(0,R.tZ)(K.b,{children:(0,R.tZ)(V,{adhocFilter:e,options:this.props.options,datasource:this.props.datasource,partitionColumn:this.props.partitionColumn,onResize:this.onPopoverResize,onClose:r,sections:this.props.sections,operators:this.props.operators,onChange:this.props.onFilterEdit,requireSave:this.props.requireSave})});return(0,R.tZ)(Y.Z,{trigger:"click",content:a,defaultVisible:i,visible:i,onVisibleChange:n,destroyTooltipOnHide:!0,children:this.props.children})}}const G=W},61641:(e,t,i)=>{var n,r;i.d(t,{N:()=>r,p:()=>n}),function(e){e.Simple="SIMPLE",e.Sql="SQL"}(n||(n={})),function(e){e.Having="HAVING",e.Where="WHERE"}(r||(r={}))},7848:(e,t,i)=>{i.d(t,{v:()=>m,w:()=>l});var n=i(67294),r=i(5364),a=i(6882),o=i(69856),s=i(61641);const l=e=>{const[t,i]=(0,n.useState)({});return(0,n.useEffect)((()=>{e.operator===o.d.TemporalRange&&e.expressionType===s.p.Simple||i({}),e.operator===o.d.TemporalRange&&e.comparator===r.vM&&i({actualTimeRange:`${e.subject} (${r.vM})`,title:r.vM}),e.operator===o.d.TemporalRange&&e.expressionType===s.p.Simple&&e.comparator!==r.vM&&t.title!==e.comparator&&(0,a.z1)(e.comparator,e.subject).then((({value:t,error:n})=>{i(n?{actualTimeRange:`${e.subject} (${e.comparator})`,title:n}:{actualTimeRange:null!=t?t:"",title:e.comparator})}))}),[e]),t};var d=i(61988),c=i(45211),u=i(51137),h=i(82342),p=i(35944);const m=({columnName:e,timeRange:t,datasource:i,onChange:n})=>(0,c.x)(e,i)?(0,p.BX)(p.HY,{children:[(0,p.tZ)(h.Z,{label:(0,d.t)("Time Range")}),(0,p.tZ)(u.Z,{value:t,name:"time_range",onChange:t=>n(e,t),overlayStyle:"Modal"})]}):void 0},56565:(e,t,i)=>{i.d(t,{c:()=>s});var n=i(46306),r=i(69856),a=i(12515);const o={"==":"=","!=":"<>",">":">","<":"<",">=":">=","<=":"<=",IN:"IN","NOT IN":"NOT IN",LIKE:"LIKE",ILIKE:"ILIKE",REGEX:"REGEX","IS NOT NULL":"IS NOT NULL","IS NULL":"IS NULL","IS TRUE":"IS TRUE","IS FALSE":"IS FALSE","LATEST PARTITION":({datasource:e})=>`= '{{ presto.latest_partition('${e.schema}.${e.datasource_name}') }}'`},s=(e,{useSimple:t}={useSimple:!1})=>{if((0,n.Ki)(e)||t){const{subject:t,operator:i}=e,n="comparator"in e?e.comparator:void 0,s=i&&i===r.LT[r.d.LatestPartition].operation?o[i](e):o[i];return(0,a.CB)(t,s,n)}return(0,n.jz)(e)?e.sqlExpression:""}},33334:(e,t,i)=>{i.d(t,{EQ:()=>g,H$:()=>T,IG:()=>w,Ne:()=>f,SW:()=>_,__:()=>v,a7:()=>m,gM:()=>Z,gu:()=>y,yj:()=>C,yz:()=>M});var n=i(67294),r=i(22068),a=i(27034),o=i(51995),s=i(11965),l=i(61988),d=i(9882),c=i(58593),u=i(13322),h=i(99963),p=i(35944);const m=o.iK.div`
  margin-bottom: ${({theme:e})=>e.gridUnit}px;
  :last-child {
    margin-bottom: 0;
  }
`,g=o.iK.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
  height: ${({theme:e})=>6*e.gridUnit}px;
  background-color: ${({theme:e})=>e.colors.grayscale.light3};
  border-radius: 3px;
  cursor: ${({withCaret:e})=>e?"pointer":"default"};
`,v=o.iK.div`
  ${({theme:e})=>`\n    display: flex;\n    width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    align-items: center;\n    white-space: nowrap;\n    padding-left: ${e.gridUnit}px;\n    svg {\n      margin-right: ${e.gridUnit}px;\n    }\n    .type-label {\n      margin-right: ${2*e.gridUnit}px;\n      margin-left: ${e.gridUnit}px;\n      font-weight: ${e.typography.weights.normal};\n      width: auto;\n    }\n    .option-label {\n      display: inline;\n    }\n  `}
`,b=o.iK.span`
  overflow: hidden;
  text-overflow: ellipsis;
`,f=o.iK.div`
  height: 100%;
  border-left: solid 1px ${({theme:e})=>e.colors.grayscale.dark2}0C;
  margin-left: auto;
`,y=o.iK.div`
  height: 100%;
  width: ${({theme:e})=>6*e.gridUnit}px;
  border-right: solid 1px ${({theme:e})=>e.colors.grayscale.dark2}0C;
  cursor: pointer;
`,x=(0,o.iK)(d.V)`
  margin: 0 ${({theme:e})=>e.gridUnit}px;
`,Z=o.iK.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,C=o.iK.div`
  padding: ${({theme:e})=>e.gridUnit}px;
  border: solid 1px ${({theme:e})=>e.colors.grayscale.light2};
  border-radius: ${({theme:e})=>e.gridUnit}px;
`,S=s.F4`
  0% {
    right: 100%;
  }
  50% {
    left: 4px;
  }
  90% {
    right: 4px;
  }
  100% {
    left: 100%;
  }
`,T=o.iK.div`
  ${({theme:e,isLoading:t,canDrop:i,isDragging:n,isOver:r})=>`\n  position: relative;\n  padding: ${e.gridUnit}px;\n  border: ${!t&&n?`dashed 1px ${i?e.colors.info.dark1:e.colors.error.dark1}`:`solid 1px ${t&&n?e.colors.warning.light1:e.colors.grayscale.light2}`};\n  border-radius: ${e.gridUnit}px;\n  &:before,\n  &:after {\n    content: ' ';\n    position: absolute;\n    border-radius: ${e.gridUnit}px;\n  }\n  &:before {\n    display: ${n||t?"block":"none"};\n    background-color: ${i?e.colors.primary.base:e.colors.error.light1};\n    z-index: ${e.zIndex.aboveDashboardCharts};\n    opacity: ${e.opacity.light};\n    top: 1px;\n    right: 1px;\n    bottom: 1px;\n    left: 1px;\n  }\n  &:after {\n    display: ${t||i&&r?"block":"none"};\n    background-color: ${t?e.colors.grayscale.light3:e.colors.primary.base};\n    z-index: ${e.zIndex.dropdown};\n    opacity: ${e.opacity.mediumLight};\n    top: ${-e.gridUnit}px;\n    right: ${-e.gridUnit}px;\n    bottom: ${-e.gridUnit}px;\n    left: ${-e.gridUnit}px;\n    cursor: ${t?"wait":"auto"};\n  }\n  `}

  &:before {
    ${({theme:e,isLoading:t})=>t&&s.iv`
        animation: ${S} 2s ease-in infinite;
        background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
        background-size: 100% ${e.gridUnit/2}px;
        top: auto;
        right: ${e.gridUnit}px;
        left: ${e.gridUnit}px;
        bottom: -${e.gridUnit/2}px;
        height: ${e.gridUnit/2}px;
      `};
  }
`,_=o.iK.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({theme:e})=>6*e.gridUnit}px;
  padding-left: ${({theme:e})=>e.gridUnit}px;
  font-size: ${({theme:e})=>e.typography.sizes.s}px;
  color: ${({theme:e})=>e.colors.grayscale.light1};
  border: dashed 1px ${({theme:e})=>e.colors.grayscale.light2};
  border-radius: ${({theme:e})=>e.gridUnit}px;
  cursor: ${({cancelHover:e})=>e?"inherit":"pointer"};

  :hover {
    background-color: ${({cancelHover:e,theme:t})=>e?"inherit":t.colors.grayscale.light4};
  }

  :active {
    background-color: ${({cancelHover:e,theme:t})=>e?"inherit":t.colors.grayscale.light3};
  }
`,w=o.iK.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({theme:e})=>4*e.gridUnit}px;
  width: ${({theme:e})=>4*e.gridUnit}px;
  padding: 0;
  background-color: ${({theme:e})=>e.colors.primary.dark1};
  border: none;
  border-radius: 2px;

  :disabled {
    cursor: not-allowed;
    background-color: ${({theme:e})=>e.colors.grayscale.light1};
  }
`,M=({label:e,savedMetric:t,adhocMetric:i,onRemove:s,onMoveLabel:d,onDropLabel:Z,withCaret:C,isFunction:S,type:T,index:_,isExtra:w,datasourceWarningMessage:M,tooltipTitle:$,multi:E=!0,...I})=>{const F=(0,o.Fg)(),D=(0,n.useRef)(null),R=(0,n.useRef)(null),N=null==t?void 0:t.metric_name,[,k]=(0,r.L)({accept:T,drop(){E&&(null==Z||Z())},hover(e,t){var i;if(!E)return;if(!D.current)return;const{dragIndex:n}=e,r=_;if(n===r)return;const a=null==(i=D.current)?void 0:i.getBoundingClientRect(),o=(a.bottom-a.top)/2,s=t.getClientOffset(),l=null!=s&&s.y?(null==s?void 0:s.y)-a.top:0;n<r&&l<o||n>r&&l>o||(null==d||d(n,r),e.dragIndex=r)}}),[{isDragging:O},U]=(0,a.c)({item:{type:T,dragIndex:_,value:null!=t&&t.metric_name?t:i},collect:e=>({isDragging:e.isDragging()})});return U(k(D)),(0,p.tZ)(m,{ref:D,children:(0,p.BX)(g,{withCaret:C,...I,children:[(0,p.tZ)(y,{role:"button",onClick:s,children:(0,p.tZ)(u.Z.XSmall,{iconColor:F.colors.grayscale.light1})}),(0,p.BX)(v,{children:[S&&(0,p.tZ)(u.Z.FieldDerived,{}),(()=>{const i=!O&&"string"==typeof e&&$&&e&&$!==e||!O&&R&&R.current&&R.current.scrollWidth>R.current.clientWidth;return t&&N?(0,p.tZ)(h.B,{metric:t,labelRef:R,shouldShowTooltip:!O}):i?(0,p.tZ)(c.u,{title:$||e,children:(0,p.tZ)(b,{ref:R,children:e})}):(0,p.tZ)(b,{ref:R,children:e})})()]}),(!!M||w)&&(0,p.tZ)(x,{icon:"exclamation-triangle",placement:"top",bsStyle:"warning",tooltip:M||(0,l.t)("\n                This filter was inherited from the dashboard's context.\n                It won't be saved when saving the chart.\n              ")}),C&&(0,p.tZ)(f,{children:(0,p.tZ)(u.Z.CaretRight,{iconColor:F.colors.grayscale.light1})})]})})}},85626:(e,t,i)=>{i.d(t,{Z:()=>v});var n=i(51995),r=i(42110),a=i(120),o=i(43617),s=i(50909),l=i(53459),d=i(49889),c=i(33743),u=i(22489),h=i(35944);const p=(0,n.iK)(s.qi)`
  && {
    margin: 0 0 ${({theme:e})=>e.gridUnit}px;
  }
`;r.Z.registerLanguage("markdown",l.Z),r.Z.registerLanguage("html",d.Z),r.Z.registerLanguage("sql",c.Z),r.Z.registerLanguage("json",u.Z);const m=n.iK.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,g=(0,n.iK)(r.Z)`
  flex: 1;
`,v=e=>{const{sql:t,language:i="sql"}=e;return(0,h.BX)(m,{children:[(0,h.tZ)(o.Z,{text:t,shouldShowText:!1,copyNode:(0,h.tZ)(p,{buttonSize:"xsmall",children:(0,h.tZ)("i",{className:"fa fa-clipboard"})})}),(0,h.tZ)(g,{language:i,style:a.Z,children:t})]},t)}},15423:(e,t,i)=>{i.d(t,{Z:()=>p});var n=i(67294),r=i(51995),a=i(55786),o=i(44818),s=i(61988),l=i(38703),d=i(52256),c=i(85626),u=i(35944);const h=r.iK.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,p=e=>{const[t,i]=(0,n.useState)([]),[r,p]=(0,n.useState)(!1),[m,g]=(0,n.useState)(null);return(0,n.useEffect)((()=>{p(!0),(0,d.getChartDataRequest)({formData:e.latestQueryFormData,resultFormat:"json",resultType:"query"}).then((({json:e})=>{i((0,a.Z)(e.result)),p(!1),g(null)})).catch((e=>{(0,o.O$)(e).then((({error:t,message:i})=>{g(t||i||e.statusText||(0,s.t)("Sorry, An error occurred")),p(!1)}))}))}),[JSON.stringify(e.latestQueryFormData)]),r?(0,u.tZ)(l.Z,{}):m?(0,u.tZ)("pre",{children:m}):(0,u.tZ)(h,{children:t.map((e=>e.query?(0,u.tZ)(c.Z,{sql:e.query,language:e.language||void 0}):null))})}},40219:(e,t,i)=>{i.d(t,{BR:()=>s,LW:()=>u,nv:()=>c});var n=i(57557),r=i.n(n),a=i(31069);const o=["url_params"],s=e=>r()(e,o),l=(e,t)=>{let i="api/v1/explore/form_data";return e&&(i=i.concat(`/${e}`)),t&&(i=i.concat(`?tab_id=${t}`)),i},d=(e,t,i,n)=>{const r={datasource_id:e,datasource_type:t,form_data:JSON.stringify(s(i))};return n&&(r.chart_id=n),r},c=(e,t,i,n,r)=>a.Z.post({endpoint:l(void 0,r),jsonPayload:d(e,t,i,n)}).then((e=>e.json.key)),u=(e,t,i,n,r,o)=>a.Z.put({endpoint:l(i,o),jsonPayload:d(e,t,n,r)}).then((e=>e.json.message))},53579:(e,t,i)=>{i.d(t,{S:()=>p});var n=i(67294),r=i(51995),a=i(61988),o=i(11965),s=i(29487),l=i(67697),d=i(32871),c=i(42190),u=i(6412),h=i(35944);const p=({dataset:e,datasetId:t})=>{const i=(0,r.Fg)(),[p,m]=(0,n.useState)(),[g,v]=(0,n.useState)(e?c.ni.Complete:c.ni.Loading);return(0,n.useEffect)((()=>{!e&&t&&(0,u.e)({endpoint:`/api/v1/dataset/${t}`}).then((({json:{result:e}})=>{m(e),v(c.ni.Complete)})).catch((()=>{v(c.ni.Error)}))}),[t,e]),{metadataBar:(0,n.useMemo)((()=>{const t=[],n=e||p;if(n){var r,u;const{changed_on_humanized:e,created_on_humanized:i,description:o,table_name:s,changed_by:l,created_by:c,owners:h}=n,p=(0,a.t)("Not available"),m=`${null!=(r=null==c?void 0:c.first_name)?r:""} ${null!=(u=null==c?void 0:c.last_name)?u:""}`.trim()||p,g=l?`${l.first_name} ${l.last_name}`:p,v=(null==h?void 0:h.length)>0?h.map((e=>`${e.first_name} ${e.last_name}`)):[p];t.push({type:d.p.Table,title:s}),t.push({type:d.p.LastModified,value:e,modifiedBy:g}),t.push({type:d.p.Owner,createdBy:m,owners:v,createdOn:i}),o&&t.push({type:d.p.Description,value:o})}return(0,h.BX)("div",{css:o.iv`
          display: flex;
          margin-bottom: ${4*i.gridUnit}px;
        `,children:[g===c.ni.Complete&&(0,h.tZ)(l.ZP,{items:t,tooltipPlacement:"bottom"}),g===c.ni.Error&&(0,h.tZ)(s.Z,{type:"error",message:(0,a.t)("There was an error loading the dataset metadata")})]})}),[e,p,g,i.gridUnit]),status:g}}},21312:(e,t,i)=>{i.d(t,{x:()=>oe,Z:()=>ce});var n,r,a=i(11965),o=i(41609),s=i.n(o),l=i(67294),d=i(28216),c=i(75049),u=i(51995),h=i(93185),p=i(85716),m=i(61988),g=i(13322),v=i(12441),b=i(83862),f=i(87253),y=i(54076),x=i(88694),Z=i(17198),C=i(44818),S=i(39666),T=i(29487),_=i(98978),w=i(73684),M=i(9875),$=i(14114);!function(e){e.Dashboards="dashboards",e.Charts="charts"}(n||(n={})),function(e){e.Text="TEXT",e.PNG="PNG",e.CSV="CSV"}(r||(r={}));var E=i(34858),I=i(67317),F=i(74069),D=i(35932),R=i(87183),N=i(9433);const k=(0,u.iK)(F.default)`
  .ant-modal-body {
    padding: 0;
  }
`,O=u.iK.div`
  padding: ${({theme:e})=>`${3*e.gridUnit}px ${4*e.gridUnit}px ${2*e.gridUnit}px`};
  label {
    font-size: ${({theme:e})=>e.typography.sizes.s}px;
    color: ${({theme:e})=>e.colors.grayscale.light1};
  }
`,U=u.iK.div`
  border-top: 1px solid ${({theme:e})=>e.colors.grayscale.light2};
  padding: ${({theme:e})=>`${4*e.gridUnit}px ${4*e.gridUnit}px ${6*e.gridUnit}px`};
  .ant-select {
    width: 100%;
  }
  .control-label {
    font-size: ${({theme:e})=>e.typography.sizes.s}px;
    color: ${({theme:e})=>e.colors.grayscale.light1};
  }
`,q=u.iK.span`
  span {
    margin-right: ${({theme:e})=>2*e.gridUnit}px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
`,L=u.iK.div`
  margin-bottom: ${({theme:e})=>7*e.gridUnit}px;

  h4 {
    margin-bottom: ${({theme:e})=>3*e.gridUnit}px;
  }
`,B=(0,u.iK)(N.Bj)`
  margin-bottom: ${({theme:e})=>3*e.gridUnit}px;
  width: ${({theme:e})=>120*e.gridUnit}px;
`,A=u.iK.p`
  color: ${({theme:e})=>e.colors.error.base};
`,z=a.iv`
  margin-bottom: 0;
`,j=(0,u.iK)(D.Z)`
  width: ${({theme:e})=>40*e.gridUnit}px;
`,P=e=>a.iv`
  margin: ${3*e.gridUnit}px 0 ${2*e.gridUnit}px;
`,X=u.iK.div`
  margin: ${({theme:e})=>8*e.gridUnit}px 0
    ${({theme:e})=>4*e.gridUnit}px;
`,H=(0,u.iK)(R.Y)`
  display: block;
  line-height: ${({theme:e})=>8*e.gridUnit}px;
`,V=(0,u.iK)(R.Y.Group)`
  margin-left: ${({theme:e})=>.5*e.gridUnit}px;
`;var K=i(35944);const Y=["pivot_table_v2","table","paired_ttest"],W={crontab:"0 12 * * 1"},G={},Q=(0,$.ZP)((function({onHide:e,show:t=!1,dashboardId:i,chart:n,userId:o,userEmail:s,creationMethod:c,dashboardName:u,chartName:h}){var p;const v=null==n||null==(p=n.sliceFormData)?void 0:p.viz_type,b=!!n,f=b&&v&&Y.includes(v),y=f?r.Text:r.PNG,x=u||h,Z=(0,l.useMemo)((()=>({...W,name:x?(0,m.t)("Weekly Report for %s",x):(0,m.t)("Weekly Report")})),[x]),$=(0,l.useCallback)(((e,t)=>"reset"===t?Z:{...e,...t}),[Z]),[F,D]=(0,l.useReducer)($,Z),[R,N]=(0,l.useState)(),Q=(0,d.I0)(),J=(0,d.v9)((e=>{const t=i?oe.Dashboards:oe.Charts;return(0,E._l)(e,t,i||(null==n?void 0:n.id))||G})),ee=J&&Object.keys(J).length;(0,l.useEffect)((()=>{D(ee?J:"reset")}),[ee,J]);const te=(0,K.BX)(q,{children:[(0,K.tZ)(g.Z.Calendar,{}),(0,K.tZ)("span",{className:"text",children:ee?(0,m.t)("Edit email report"):(0,m.t)("Schedule a new email report")})]}),ie=(0,K.BX)(K.HY,{children:[(0,K.tZ)(j,{onClick:e,children:(0,m.t)("Cancel")},"back"),(0,K.tZ)(j,{buttonStyle:"primary",onClick:async()=>{const t={type:"Report",active:!0,force_screenshot:!1,custom_width:F.custom_width,creation_method:c,dashboard:i,chart:null==n?void 0:n.id,owners:[o],recipients:[{recipient_config_json:{target:s},type:"Email"}],name:F.name,description:F.description,crontab:F.crontab,report_format:F.report_format||y,paper_size:F.paper_size,timezone:F.timezone};D({isSubmitting:!0,error:void 0});try{ee?await Q((0,S.Me)(F.id,t)):await Q((0,S.cq)(t)),e()}catch(e){const{error:t}=await(0,C.O$)(e);D({error:t})}D({isSubmitting:!1})},disabled:!F.name,loading:F.isSubmitting,children:ee?(0,m.t)("Save"):(0,m.t)("Add")},"submit")]}),ne=(0,K.BX)(K.HY,{children:[(0,K.tZ)(X,{children:(0,K.tZ)("h4",{children:(0,m.t)("Message content")})}),(0,K.tZ)("div",{className:"inline-container",children:(0,K.BX)(V,{onChange:e=>{D({report_format:e.target.value})},value:F.report_format||y,children:[f&&(0,K.tZ)(H,{value:r.Text,children:(0,m.t)("Text embedded in email")}),(0,K.tZ)(H,{value:r.PNG,children:(0,m.t)("Image (PNG) embedded in email")}),(0,K.tZ)(H,{value:r.CSV,children:(0,m.t)("Formatted CSV attached in email")})]})})]}),re=(0,K.BX)(I.j5,{children:[(0,K.tZ)("div",{className:"control-label",css:P,children:(0,m.t)("Screenshot width")}),(0,K.tZ)("div",{className:"input-container",children:(0,K.tZ)(M.II,{type:"number",name:"custom_width",value:(null==F?void 0:F.custom_width)||"",placeholder:(0,m.t)("Input custom width in pixels"),onChange:e=>{D({custom_width:parseInt(e.target.value,10)||null})}})})]});return(0,K.BX)(k,{show:t,onHide:e,title:te,footer:ie,width:"432",centered:!0,children:[(0,K.BX)(O,{children:[(0,K.tZ)(w.Z,{id:"name",name:"name",value:F.name||"",placeholder:Z.name,required:!0,validationMethods:{onChange:({target:e})=>D({name:e.value})},label:(0,m.t)("Report Name")}),(0,K.tZ)(w.Z,{id:"description",name:"description",value:(null==F?void 0:F.description)||"",validationMethods:{onChange:({target:e})=>{D({description:e.value})}},label:(0,m.t)("Description"),placeholder:(0,m.t)("Include a description that will be sent with your report"),css:z})]}),(0,K.BX)(U,{children:[(0,K.BX)(L,{children:[(0,K.tZ)("h4",{css:e=>(e=>a.iv`
  margin: ${3*e.gridUnit}px 0;
`)(e),children:(0,m.t)("Schedule")}),(0,K.tZ)("p",{children:(0,m.t)("The report will be sent to your email at")})]}),(0,K.tZ)(B,{clearButton:!1,value:F.crontab||"0 12 * * 1",setValue:e=>{D({crontab:e})},onError:N}),(0,K.tZ)(A,{children:R}),(0,K.tZ)("div",{className:"control-label",css:e=>(e=>a.iv`
  margin: ${3*e.gridUnit}px 0 ${2*e.gridUnit}px;
`)(e),children:(0,m.t)("Timezone")}),(0,K.tZ)(_.Z,{timezone:F.timezone,onTimezoneChange:e=>{D({timezone:e})}}),b&&ne,(!b||!f)&&re]}),F.error&&(0,K.tZ)(T.Z,{type:"error",css:e=>(e=>a.iv`
  border: ${e.colors.error.base} 1px solid;
  padding: ${4*e.gridUnit}px;
  margin: ${4*e.gridUnit}px;
  margin-top: 0;
  color: ${e.colors.error.dark2};
  .ant-alert-message {
    font-size: ${e.typography.sizes.m}px;
    font-weight: bold;
  }
  .ant-alert-description {
    font-size: ${e.typography.sizes.m}px;
    line-height: ${4*e.gridUnit}px;
    .ant-alert-icon {
      margin-right: ${2.5*e.gridUnit}px;
      font-size: ${e.typography.sizes.l}px;
      position: relative;
      top: ${e.gridUnit/4}px;
    }
  }
`)(e),message:ee?(0,m.t)("Failed to update report"):(0,m.t)("Failed to create report"),description:F.error})]})}));var J=i(96022);const ee=(0,c.I)(),te=e=>a.iv`
  color: ${e.colors.error.base};
`,ie=e=>a.iv`
  & .ant-menu-item {
    padding: 5px 12px;
    margin-top: 0px;
    margin-bottom: 4px;
    :hover {
      color: ${e.colors.grayscale.dark1};
    }
  }
  :hover {
    background-color: ${e.colors.secondary.light5};
  }
`,ne=e=>a.iv`
  &:hover {
    color: ${e.colors.grayscale.dark1};
    background-color: ${e.colors.secondary.light5};
  }
`,re=u.iK.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > *:first-child {
    margin-right: ${({theme:e})=>e.gridUnit}px;
  }
`,ae=ee.get("report-modal.dropdown.item.icon");var oe;!function(e){e.Charts="charts",e.Dashboards="dashboards"}(oe||(oe={}));const se={};var le={name:"1e1ncky",styles:"border:none"},de={name:"833hqy",styles:"width:200px"};function ce({dashboardId:e,chart:t,useTextMenu:i=!1,setShowReportSubMenu:n,setIsDropdownVisible:r,isDropdownVisible:o,...c}){const C=(0,d.I0)(),T=(0,d.v9)((i=>{const n=e?oe.Dashboards:oe.Charts;return(0,E._l)(i,n,e||(null==t?void 0:t.id))||se})),_=(null==T?void 0:T.active)||!1,w=(0,d.v9)((e=>e.user)),M=()=>!!(0,h.cr)(h.TT.AlertReports)&&(!(null==w||!w.userId)&&(!!(e||null!=t&&t.id)&&Object.keys(w.roles||[]).map((e=>w.roles[e].filter((e=>"menu_access"===e[0]&&"Manage"===e[1])))).some((e=>e.length>0)))),[$,I]=(0,l.useState)(null),F=(0,u.Fg)(),D=(0,p.D)(e),[R,N]=(0,l.useState)(!1),k=async(e,t)=>{null!=e&&e.id&&C((0,S.M)(e,t))},O=M()&&!!(e&&D!==e||null!=t&&t.id);(0,l.useEffect)((()=>{O&&C((0,S.Aw)({userId:w.userId,filterField:e?"dashboard_id":"chart_id",creationMethod:e?"dashboards":"charts",resourceId:e||(null==t?void 0:t.id)}))}),[]);const U=T&&n&&M();(0,l.useEffect)((()=>{U?n(!0):!T&&n&&n(!1)}),[T]);const q=()=>{r&&(r(!1),N(!0))};return(0,K.tZ)(K.HY,{children:M()&&(0,K.BX)(K.HY,{children:[(0,K.tZ)(Q,{userId:w.userId,show:R,onHide:()=>N(!1),userEmail:w.email,dashboardId:e,chart:t,creationMethod:e?oe.Dashboards:oe.Charts}),i?s()(T)?(0,K.BX)(b.Menu,{selectable:!1,...c,css:ie,children:[(0,K.tZ)(b.Menu.Item,{onClick:q,children:ae?(0,K.BX)(re,{children:[(0,K.tZ)("div",{children:(0,m.t)("Set up an email report")}),(0,K.tZ)(ae,{})]}):(0,m.t)("Set up an email report")}),(0,K.tZ)(b.Menu.Divider,{})]}):o&&(0,K.BX)(b.Menu,{selectable:!1,css:le,children:[(0,K.tZ)(b.Menu.Item,{css:ne,onClick:()=>k(T,!_),children:(0,K.BX)(J.ZN,{children:[(0,K.tZ)(f.ZP,{checked:_,onChange:y.EI}),(0,m.t)("Email reports active")]})}),(0,K.tZ)(b.Menu.Item,{css:ne,onClick:q,children:(0,m.t)("Edit email report")}),(0,K.tZ)(b.Menu.Item,{css:ne,onClick:()=>{r&&(r(!1),I(T))},children:(0,m.t)("Delete email report")})]}):s()(T)?(0,K.tZ)("span",{role:"button",title:(0,m.t)("Schedule email report"),tabIndex:0,className:"action-button action-schedule-report",onClick:()=>N(!0),children:(0,K.tZ)(g.Z.Calendar,{})}):(0,K.tZ)(K.HY,{children:(0,K.tZ)(x.$i,{overlay:(0,K.BX)(b.Menu,{selectable:!1,css:de,children:[(0,K.BX)(b.Menu.Item,{children:[(0,m.t)("Email reports active"),(0,K.tZ)(v.r,{checked:_,onClick:e=>k(T,e),size:"small",css:(0,a.iv)({marginLeft:2*F.gridUnit},"","")})]}),(0,K.tZ)(b.Menu.Item,{onClick:()=>N(!0),children:(0,m.t)("Edit email report")}),(0,K.tZ)(b.Menu.Item,{onClick:()=>I(T),css:te,children:(0,m.t)("Delete email report")})]}),overlayStyle:{zIndex:99,animationDuration:"0s"},trigger:["click"],getPopupContainer:e=>e.closest(".action-button"),children:(0,K.tZ)("span",{role:"button",className:"action-button action-schedule-report",tabIndex:0,children:(0,K.tZ)(g.Z.Calendar,{})})})}),$&&(0,K.tZ)(Z.Z,{description:(0,m.t)("This action will permanently delete %s.",null==$?void 0:$.name),onConfirm:()=>{$&&(async e=>{await C((0,S.MZ)(e)),I(null)})($)},onHide:()=>I(null),open:!0,title:(0,m.t)("Delete Report?")})]})})}},6954:(e,t,i)=>{i.d(t,{z:()=>s});var n=i(67294),r=i(14670),a=i.n(r);const o=new(i(11133).g0)("tab_id_channel");function s(){const[e,t]=(0,n.useState)();return(0,n.useEffect)((()=>{if(!function(){try{return window.localStorage&&window.sessionStorage}catch(e){return!1}}())return void(e||t(a().generate()));const i=()=>{let e;try{e=window.localStorage.getItem("last_tab_id")}catch(e){}const i=String(e?Number.parseInt(e,10)+1:1);try{window.sessionStorage.setItem("tab_id",i),window.localStorage.setItem("last_tab_id",i)}catch(e){}t(i)};let n;try{n=window.sessionStorage.getItem("tab_id")}catch(e){}n?(o.postMessage({type:"REQUESTING_TAB_ID",tabId:n}),t(n)):i(),o.onmessage=t=>{if(t.tabId===e)if("REQUESTING_TAB_ID"===t.type){const e={type:"TAB_ID_DENIED",tabId:t.tabId};o.postMessage(e)}else"TAB_ID_DENIED"===t.type&&i()}}),[e]),e}},6412:(e,t,i)=>{i.d(t,{e:()=>o,f:()=>a});var n=i(31069),r=i(65108);const a=new Map,o=(0,r.g)(n.Z.get,a,(({endpoint:e})=>e||""))},56727:(e,t,i)=>{i.d(t,{Z:()=>u});var n=i(21804),r=i.n(n),a=i(46926),o=i.n(a),s=i(61988),l=i(51995),d=i(72570);const c=(e,t=new Date)=>`${r()(e)}-${t.toISOString().replace(/[: ]/g,"-")}`;function u(e,t,i=!1){return n=>{const r=i?document.querySelector(e):n.currentTarget.closest(e);return r?o().toJpeg(r,{bgcolor:l.K6.colors.grayscale.light4,filter:e=>"string"!=typeof e.className||"mapboxgl-control-container"!==e.className&&!e.className.includes("header-controls")}).then((e=>{const i=document.createElement("a");i.download=`${c(t)}.jpg`,i.href=e,i.click()})).catch((e=>{console.error("Creating image failed",e)})):(0,d.Dz)((0,s.t)("Image download failed, please refresh and try again."))}}},75701:(e,t,i)=>{i.d(t,{J:()=>o});var n=i(61988);const r=(0,n.t)("Create chart"),a=(0,n.t)("Update chart"),o=e=>(0,n.t)("Select values in highlighted field(s) in the control panel. Then run the query by clicking on the %s button.",`"${e?r:a}"`)},99232:(e,t,i)=>{i.d(t,{f:()=>s});var n=i(72813),r=i(61641),a=i(69856),o=i(56565);const s=(e,t=r.N.Where)=>{let i;var s;return i=(0,n.GA)(e.col)?{expressionType:"SQL",clause:t,sqlExpression:(0,o.c)({expressionType:r.p.Simple,subject:`(${e.col.sqlExpression})`,operator:e.op,comparator:"val"in e?e.val:void 0})}:{expressionType:"SIMPLE",clause:t,operator:e.op,operatorId:null==(s=Object.entries(a.LT).find((t=>t[1].operation===e.op)))?void 0:s[0],subject:e.col,comparator:"val"in e?e.val:void 0},e.isExtra&&Object.assign(i,{isExtra:!0,filterOptionName:`filter_${Math.random().toString(36).substring(2,15)}_${Math.random().toString(36).substring(2,15)}`}),i}}}]);
//# sourceMappingURL=ef23b578ad4c4ddb9d47.chunk.js.map