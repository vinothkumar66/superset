"use strict";(globalThis.webpackChunksuperset=globalThis.webpackChunksuperset||[]).push([[6387],{6882:(e,t,r)=>{r.d(t,{UD:()=>u,z1:()=>g});var n=r(41609),o=r.n(n),i=r(15926),s=r.n(i),l=r(55786),c=r(31069),a=r(44818);const u=" : ",d=(e,t)=>`${e}${u}${t}`,f=(e,t)=>e.replace("T00:00:00","")||(t?"-∞":"∞"),p=(e,t="col")=>{const r=e.split(u);return 1===r.length?e:`${f(r[0],!0)} ≤ ${t} < ${f(r[1])}`},g=async(e,t="col",r)=>{let n,i;if(o()(r))n=s().encode_uri(e),i=`/api/v1/time_range/?q=${n}`;else{const t=(0,l.Z)(r).map((t=>({timeRange:e,shift:t})));n=s().encode_uri([{timeRange:e},...t]),i=`/api/v1/time_range/?q=${n}`}try{var g;const e=await c.Z.get({endpoint:i});if(o()(r)){var h,m,v,b;const r=d((null==e||null==(h=e.json)||null==(m=h.result[0])?void 0:m.since)||"",(null==e||null==(v=e.json)||null==(b=v.result[0])?void 0:b.until)||"");return{value:p(r,t)}}const n=null==e||null==(g=e.json)?void 0:g.result.map((e=>d(e.since,e.until)));return{value:n.slice(1).map((e=>((e,t,r="col")=>{const n=e.split(u),o=t.split(u);return`${r}: ${f(n[0],!0)} to ${f(n[1])} vs\n  ${f(o[0],!0)} to ${f(o[1])}`})(n[0],e,t)))}}catch(e){const t=await(0,a.O$)(e);return{error:t.message||t.error||e.statusText}}}},86387:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var n=r(41609),o=r.n(n),i=r(67294),s=r(51995),l=r(21283),c=r(55786),a=r(6882),u=r(11965),d=r(61988),f=r(51776),p=r(89201),g=r(23279),h=r.n(g);const m=e=>{const t=(0,i.useRef)(null),r=(0,i.useRef)(null),[n,o]=(0,i.useState)(!1);return(0,i.useEffect)((()=>{let n;const i=t.current,s=r.current;if(i&&s){const t=Array.from(i.children);n=new ResizeObserver(h()((()=>{t.reduce(((e,t)=>{var r,n;return e+(null!=(r=null==(n=t.firstElementChild)?void 0:n.scrollWidth)?r:0)}),0)+e*Math.max(t.length-1,0)>s.clientWidth?o(!0):o(!1)}),500)),n.observe(document.body),t.forEach((e=>{n.observe(e)}))}return()=>{var e;return null==(e=n)?void 0:e.disconnect()}}),[e]),{isOverflowing:n,symbolContainerRef:t,wrapperRef:r}};var v=r(35944);const b=s.iK.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`,$=s.iK.div`
  ${({theme:e,subheaderFontSize:t})=>`\n    font-weight: ${e.typography.weights.light};\n    display: flex;\n    justify-content: center;\n    font-size: ${t||20}px;\n    flex: 1 1 0px;\n  `}
`,x=s.iK.span`
  ${({theme:e,backgroundColor:t,textColor:r})=>`\n    background-color: ${t};\n    color: ${r};\n    padding: ${e.gridUnit}px ${2*e.gridUnit}px;\n    border-radius: ${2*e.gridUnit}px;\n    margin-right: ${e.gridUnit}px;\n  `}
`;function y(e){const{height:t,width:r,bigNumber:n,prevNumber:g,valueDifference:h,percentDifferenceFormattedString:y,headerFontSize:w,subheaderFontSize:C,comparisonColorEnabled:R,comparisonColorScheme:k,percentDifferenceNumber:z,currentTimeRangeFilter:S,startDateOffset:T,shift:Z}=e,[j,U]=(0,i.useState)("");(0,i.useEffect)((()=>{if(S&&(Z||T)){if(!o()(Z)||T){const e=(0,l.d)(S,(0,c.Z)(Z),T||""),t=(0,a.z1)(S.comparator,S.subject,e||[]);Promise.resolve(t).then((e=>{const t=(0,c.Z)(e.value).flat()[0].split("vs\n");U(t.length>1?t[1].trim():t[0])}))}}else U("")}),[S,Z,T]);const F=(0,s.Fg)(),D=5*F.gridUnit,E=u.iv`
    font-family: ${F.typography.families.sansSerif};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${t}px;
    width: ${r}px;
    overflow: auto;
  `,O=u.iv`
    font-size: ${w||60}px;
    font-weight: ${F.typography.weights.normal};
    text-align: center;
    margin-bottom: ${4*F.gridUnit}px;
  `,_=u.iv`
    color: ${R&&0!==z?z>0?k===p.v.Green?F.colors.success.base:F.colors.error.base:k===p.v.Red?F.colors.success.base:F.colors.error.base:F.colors.grayscale.base};
    margin-left: ${F.gridUnit}px;
  `,B=F.colors.grayscale.light4,K=F.colors.grayscale.base,{backgroundColor:M,textColor:N}=(0,i.useMemo)((()=>{let e=B,t=K;if(R&&0!==z){const r=z>0&&k===p.v.Green||z<0&&k===p.v.Red;e=r?F.colors.success.light2:F.colors.error.light2,t=r?F.colors.success.base:F.colors.error.base}return{backgroundColor:e,textColor:t}}),[F,k,R,z]),X=(0,i.useMemo)((()=>[{symbol:"#",value:g,tooltipText:(0,d.t)("Data for %s",j||"previous range")},{symbol:"△",value:h,tooltipText:(0,d.t)("Value difference between the time periods")},{symbol:"%",value:y,tooltipText:(0,d.t)("Percentage difference between the time periods")}]),[j,g,h,y]),{isOverflowing:q,symbolContainerRef:G,wrapperRef:P}=m(D);return(0,v.tZ)("div",{css:E,ref:P,children:(0,v.BX)(b,{css:q&&u.iv`
            width: fit-content;
            margin: auto;
            align-items: flex-start;
          `,children:[(0,v.BX)("div",{css:O,children:[n,0!==z&&(0,v.tZ)("span",{css:_,children:z>0?"↑":"↓"})]}),(0,v.tZ)("div",{css:[u.iv`
              display: flex;
              justify-content: space-around;
              gap: ${D}px;
              min-width: 0;
              flex-shrink: 1;
            `,q?u.iv`
                  flex-direction: column;
                  align-items: flex-start;
                  width: fit-content;
                `:u.iv`
                  align-items: center;
                  width: 100%;
                `,"",""],ref:G,children:X.map(((e,t)=>(0,v.tZ)($,{subheaderFontSize:C,children:(0,v.BX)(f.u,{id:"tooltip",placement:"top",title:e.tooltipText,children:[(0,v.tZ)(x,{backgroundColor:t>0?M:B,textColor:t>0?N:K,children:e.symbol}),e.value]})},`comparison-symbol-${e.symbol}`)))})]})})}}}]);
//# sourceMappingURL=4cbb1d988174b830d025.chunk.js.map