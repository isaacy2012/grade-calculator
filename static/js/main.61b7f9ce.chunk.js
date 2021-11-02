(this["webpackJsonpgrade-calculator"]=this["webpackJsonpgrade-calculator"]||[]).push([[0],{58:function(e,t,n){},59:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var r,i,c,a,o,u=n(2),s=n.n(u),l=n(42),h=n.n(l),b=(n(58),n(4)),d=n(3),j=(n(59),n(31)),f={color:{text:"#000000",headerUnderline:"#000000",contentUnderline:"#E5E5E5",highlight:"#9134ED",utilityText:"#898989",button:"#898989",buttonPressed:"#000000",outline:"#D0D0D0",outlineNone:"#D0D0D0",outlineAccept:"#13783B",outlineReject:"#C51F1F",cardBackground:"#FFFFFF",cardActiveBackground:"#FFFFFF",cardInactiveBackground:"#F2F2F2"}},O=n(23),g=n(12),m=d.b.p(r||(r=Object(b.a)(["\n  text-align: left;\n  margin: 0 5% 30px;\n  @media only screen and (min-width: 768px) {\n    text-align: center;\n    margin-left: 0;\n    margin-right: 0;\n  }\n"]))),v=n(1),x=d.b.div(i||(i=Object(b.a)(["\n  margin-left: 5%;\n  margin-right: 5%;\n"]))),p=d.b.p(c||(c=Object(b.a)(["\n  font-size: 3em;\n  font-weight: 600;\n  line-height: 1.1;\n  text-align: start;\n  padding-top: min(1.0em, 10vw);\n  margin-top: 0;\n  margin-bottom: 0;\n  max-width: 50vw;\n  color: ",";\n  @media only screen and (min-width: 768px) {\n    padding-top: 2em;\n    max-width: 100vw;\n    text-align: center;\n  }\n"])),(function(e){return e.theme.color.text})),S=d.b.div(a||(a=Object(b.a)(["\n  margin-top: 15px;\n  margin-bottom: 30px;\n  width: 25%;\n  height: 5px;\n  background: ",";\n  @media only screen and (min-width: 768px) {\n    width: 50%;\n    margin-left: auto;\n    margin-right: auto;\n  }\n"])),(function(e){return e.theme.color.highlight}));function y(e){return Object(v.jsxs)(x,{children:[Object(v.jsx)(p,{children:e.children}),Object(v.jsx)(S,{})]})}var w,k,C,A,N,E,T,F,P,z=d.b.div(o||(o=Object(b.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  flex: 0.5;\n"]))),R=d.b.div(w||(w=Object(b.a)(["\n    display: flex;\n"]))),q=d.b.div(k||(k=Object(b.a)(["\n    flex: 6;\n"]))),J=d.b.h3(C||(C=Object(b.a)(["\n  text-align: start;\n  flex: 3;\n"]))),L=d.b.h3(A||(A=Object(b.a)(["\n  text-align: start;\n  flex: 2;\n"]))),U=d.b.h3(N||(N=Object(b.a)(["\n  text-align: end;\n  flex: 1;\n"]))),D=d.b.div(E||(E=Object(b.a)(["\n  display: flex;\n  flex-direction: row;\n"]))),I=d.b.div(T||(T=Object(b.a)(["\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 2px;\n  background: ",";\n"])),(function(e){return e.theme.color.headerUnderline})),W=d.b.span(F||(F=Object(b.a)(["\n  font-size: 0.8em;\n  font-weight: normal;\n  color: ",";\n"])),(function(e){return e.theme.color.utilityText}));function B(e){return Object(v.jsxs)(R,{children:[Object(v.jsx)(z,{}),Object(v.jsxs)(q,{children:[Object(v.jsx)(D,{children:e.headers.map((function(t,n){return function(e,t,n,r){return 0===t?Object(v.jsxs)(J,{children:[e,Object(v.jsx)("br",{}),Object(v.jsx)(W,{children:r})]},t):t===n-1?Object(v.jsxs)(U,{children:[e,Object(v.jsx)("br",{}),Object(v.jsx)(W,{children:r})]},t):Object(v.jsxs)(L,{children:[e,Object(v.jsx)("br",{}),Object(v.jsx)(W,{children:r})]},t)}(t,n,e.headers.length,e.hints[n])}))}),Object(v.jsx)(I,{})]}),Object(v.jsx)(z,{})]})}var M=d.b.section(P||(P=Object(b.a)(["\n  margin: auto;\n  width: min(640px, 95vw);\n"])));function G(e){return Object(v.jsxs)(M,{children:[Object(v.jsxs)(R,{children:[Object(v.jsx)(z,{}),Object(v.jsx)(q,{children:e.title}),Object(v.jsx)(z,{})]}),Object(v.jsx)(B,{headers:e.headers,hints:e.hints}),e.children]})}var H=n(14),V=n(13),_=n(9),Y=n(10),$=n(40),X=n(19),K=/^[0-9]+(?:\.[0-9]+)?\/[0-9]+(?:\.[0-9]+)?$/,Q=/^[0-9]+(?:\.[0-9]+)?%$/,Z=/^[0-9]+(?:\.[0-9]+)?$/,ee=function(){function e(t){Object(_.a)(this,e),this.str=void 0,this.str=t}return Object(Y.a)(e,[{key:"toInputString",value:function(){return this.str}},{key:"equals",value:function(e){return this.str===(null===e||void 0===e?void 0:e.str)}}],[{key:"fromString",value:function(e){return K.test(e)?te.fromString(e):ne.fromString(e)}}]),e}(),te=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r,i){var c;return Object(_.a)(this,n),(c=t.call(this,e)).achieved=void 0,c.outOf=void 0,c.achieved=r,c.outOf=i,c}return Object(Y.a)(n,[{key:"calc",value:function(){var e=this.achieved/this.outOf;return isNaN(e)?0:e}},{key:"equals",value:function(e){return e instanceof n&&(Object($.a)(Object(X.a)(n.prototype),"equals",this).call(this,e)&&this.achieved===e.achieved&&this.outOf===e.outOf)}},{key:"toInputString",value:function(){return this.str}},{key:"toString",value:function(){return this.achieved+"/"+this.outOf}}],[{key:"fromString",value:function(e){var t=e.split("/");if(2!==t.length)throw new Error("Invalid FractionScore string");return new n(e,parseFloat(t[0]),parseFloat(t[1]))}}]),n}(ee),ne=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r){var i;return Object(_.a)(this,n),(i=t.call(this,e)).percentage=void 0,i.percentage=r,i}return Object(Y.a)(n,[{key:"calc",value:function(){return this.percentage}},{key:"equals",value:function(e){return e instanceof n&&(Object($.a)(Object(X.a)(n.prototype),"equals",this).call(this,e)&&this.percentage===e.percentage)}},{key:"toString",value:function(){return(100*this.percentage).toString()}}],[{key:"fromString",value:function(e){return Z.test(e)?new n(e,parseFloat(e)/100):Q.test(e)?new n(e,parseFloat(e.substr(0,e.length-1))/100):null}}]),n}(ee),re=n(82);function ie(e){return Q.test(e)?parseFloat(e.substr(0,e.length-1))/100:Z.test(e)?parseFloat(e)/100:NaN}var ce,ae,oe,ue,se,le,he,be,de,je,fe,Oe=function(){function e(t){Object(_.a)(this,e),this.uuid=void 0,this.uuid=t}return Object(Y.a)(e,null,[{key:"fromStrings",value:function(e,t,n,r){var i=ee.fromString(t),c=ie(n);return 0!==e.trim().length&&i&&!isNaN(c)?new me(r,e,i,c,n):new ve(r,e,t,n)}},{key:"ofAdd",value:function(){return new xe(Object(re.a)())}}]),e}(),ge=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(){return Object(_.a)(this,n),t.apply(this,arguments)}return n}(Oe),me=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r,i,c,a){var o;return Object(_.a)(this,n),(o=t.call(this,e)).name=void 0,o.score=void 0,o.weight=void 0,o.weightStr=void 0,o.name=r,o.score=i,o.weight=c,o.weightStr=a,o}return Object(Y.a)(n,[{key:"getNameStr",value:function(){return this.name}},{key:"getScoreStr",value:function(){return this.score.toInputString()}},{key:"getWeightStr",value:function(){return this.weightStr}},{key:"equals",value:function(e){return e instanceof n&&(this.name===e.name&&this.score.equals(e.score)&&this.weight===e.weight)}},{key:"clone",value:function(){return new n(Object(re.a)(),this.name,this.score,this.weight,this.weightStr)}},{key:"toString",value:function(){return"name: "+this.name+", score: "+this.score+", weight: "+this.weight}},{key:"fullJSON",value:function(){return{clazz:"ValidAssignment",name:this.name,scoreStr:this.score.str,weightStr:this.weightStr}}},{key:"templateJSON",value:function(){return{clazz:"ValidAssignment",name:this.name,weightStr:this.weightStr}}}]),n}(ge),ve=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r,i,c){var a;return Object(_.a)(this,n),(a=t.call(this,e)).nameStr=void 0,a.scoreStr=void 0,a.weightStr=void 0,a.nameStr=r,a.scoreStr=i,a.weightStr=c,a}return Object(Y.a)(n,[{key:"getNameStr",value:function(){return this.nameStr}},{key:"getScoreStr",value:function(){return this.scoreStr}},{key:"getWeightStr",value:function(){return this.weightStr}},{key:"clone",value:function(){return new n(Object(re.a)(),this.nameStr,this.scoreStr,this.weightStr)}},{key:"equals",value:function(e){return e instanceof n&&(this.nameStr===e.nameStr&&this.scoreStr===e.scoreStr&&this.weightStr===e.weightStr)}},{key:"fullJSON",value:function(){return{clazz:"StubAssignment",nameStr:this.nameStr,scoreStr:this.scoreStr,weightStr:this.weightStr}}},{key:"templateJSON",value:function(){return{clazz:"StubAssignment",nameStr:this.nameStr,weightStr:this.weightStr}}}]),n}(ge),xe=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(){return Object(_.a)(this,n),t.apply(this,arguments)}return Object(Y.a)(n,[{key:"getNameStr",value:function(){return""}},{key:"getScoreStr",value:function(){return""}},{key:"getWeightStr",value:function(){return""}},{key:"equals",value:function(e){return e instanceof n}},{key:"clone",value:function(){return new n(Object(re.a)())}}]),n}(Oe),pe=d.b.input(ce||(ce=Object(b.a)(["\n  border: none;\n  width: 100%;\n  box-sizing: border-box;\n\n"]))),Se=d.b.button.attrs((function(e){return{fontSize:e.fontSize}}))(ae||(ae=Object(b.a)(["\n  background: none;\n  border: none;\n  text-align: center;\n  font-size: ",";\n  color: ",";\n\n  &:hover {\n    color: ",";\n  }\n"])),(function(e){var t=e.fontSize;return t||"1.3em"}),(function(e){return e.theme.color.button}),(function(e){return e.theme.color.buttonPressed})),ye=d.b.button(oe||(oe=Object(b.a)(["\n  background: none;\n  border: none;\n  font-size: 1.5em;\n  padding-right: 0;\n  width: 2.5rem;\n  color: ",";\n\n  &:hover {\n    color: ",";\n  }\n"])),(function(e){return e.theme.color.button}),(function(e){return e.theme.color.buttonPressed})),we=n(33),ke=d.b.p(ue||(ue=Object(b.a)(["\n  text-align: start;\n  flex: 3;\n"]))),Ce=d.b.p(se||(se=Object(b.a)(["\n  text-align: start;\n  flex: 1.5;\n"]))),Ae=d.b.p(le||(le=Object(b.a)(["\n  text-align: end;\n  flex: 1.5;\n"]))),Ne=d.b.div(he||(he=Object(b.a)(["\n  display: flex;\n  flex-direction: row;\n"]))),Ee=d.b.div(be||(be=Object(b.a)(["\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 1px;\n  background: ",";\n"])),(function(e){return e.theme.color.contentUnderline})),Te=Object(d.b)(pe).attrs((function(e){return{accepted:e.accepted,empty:e.empty,shouldUnderline:e.shouldUnderline}}))(de||(de=Object(b.a)(["\n  font-size: 1em;\n  color: ",";\n  font-weight: ",";\n  width: 100%;\n  text-decoration: ",";\n"])),(function(e){var t=e.empty,n=e.accepted,r=e.theme;return t||n?r.color.text:r.color.outlineReject}),(function(e){var t=e.empty,n=e.accepted;return t||n?"normal":"bold"}),(function(e){var t=e.empty,n=e.shouldUnderline;return t&&n?"underline":"none"})),Fe=Object(d.b)(Te)(je||(je=Object(b.a)(["\n  text-align: right;\n"])));function Pe(e){var t=e.onChange,n=e.assignment,r=e.onClick,i=n.uuid,c=Object(u.useState)(n.getNameStr()),a=Object(g.a)(c,2),o=a[0],s=a[1],l=Object(u.useState)(n.getScoreStr()),h=Object(g.a)(l,2),b=h[0],d=h[1],j=Object(u.useState)(n.getWeightStr()),f=Object(g.a)(j,2),O=f[0],m=f[1];return Object(u.useEffect)((function(){if(void 0===r){var e=Oe.fromStrings(o,b,O,i);t(e)}}),[r,o,b,O,t,i]),Object(v.jsxs)(R,{children:[Object(v.jsx)(z,{children:void 0===e.onClick&&Object(v.jsx)(Se,{fontSize:"1.1em",onClick:e.onDuplicate,children:Object(v.jsx)(we.b,{})})}),Object(v.jsxs)(q,{children:[Object(v.jsxs)(Ne,{onClick:e.onClick,children:[Object(v.jsx)(ke,{children:Object(v.jsx)(Te,{value:o,placeholder:"Title",accepted:""!==o,empty:0===o.length,shouldUnderline:void 0===e.onClick,onChange:function(e){return s(e.target.value)}})}),Object(v.jsx)(Ce,{children:Object(v.jsx)(Te,{value:b,placeholder:"Score Achieved",accepted:null!==ee.fromString(b),empty:0===b.length,shouldUnderline:void 0===e.onClick,onChange:function(e){return d(e.target.value.trim())}})}),Object(v.jsx)(Ae,{children:Object(v.jsx)(Fe,{value:O,placeholder:"Overall Weight",accepted:ie(O)<=1,empty:0===O.length,shouldUnderline:void 0===e.onClick,onChange:function(e){return m(e.target.value.trim())}})})]}),Object(v.jsx)(Ee,{})]}),Object(v.jsx)(z,{children:void 0===e.onClick&&Object(v.jsx)(Se,{onClick:e.onDelete,children:Object(v.jsx)(we.a,{})})})]})}var ze,Re,qe,Je,Le,Ue,De,Ie,We=d.b.section.attrs((function(e){return{top:e.top?e.top:"0",bottom:e.bottom?e.bottom:"0"}}))(fe||(fe=Object(b.a)(["\n  margin-top: ",";\n  margin-bottom: ",";\n  margin-left: auto;\n  margin-right: auto;\n  width: min(550px, 90vw);\n"])),(function(e){return e.top}),(function(e){return e.bottom})),Be=d.b.section.attrs((function(e){return{marginTop:e.marginTop,marginBottom:e.marginBottom}}))(ze||(ze=Object(b.a)(["\n  margin-top: ",";\n  margin-bottom: ",";\n  padding: 1.5rem;\n  border: solid 1px ",";\n  border-radius: 10px;\n"])),(function(e){var t=e.marginTop;return t||void 0}),(function(e){var t=e.marginBottom;return t||void 0}),(function(e){return e.theme.color.outline})),Me=Object(d.b)(Be)(Re||(Re=Object(b.a)(["\n  padding: 0;\n"]))),Ge=d.b.section(qe||(qe=Object(b.a)(["\n  text-align: start;\n  padding: 0 1.5rem 1.5rem;\n"]))),He=Object(d.b)(Be)(Je||(Je=Object(b.a)(["\n  border-radius: 0 0 10px 10px;\n"]))),Ve=d.b.div(Le||(Le=Object(b.a)(["\n  display: flex;\n  flex-direction: row;\n"]))),_e=d.b.button.attrs((function(e){return{active:e.active,index:e.index,length:e.length}}))(Ue||(Ue=Object(b.a)(["\n  margin: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  border: solid 1px ",";\n  border-left: ",";\n  background: ",";\n  flex: 1;\n  border-top-left-radius: ","px;\n  border-top-right-radius: ","px;\n  border-bottom: none;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n"])),(function(e){return e.theme.color.outline}),(function(e){return 0===e.index?"":"none"}),(function(e){var t=e.active,n=e.theme;return t?n.color.cardActiveBackground:n.color.cardInactiveBackground}),(function(e){return 0===e.index?10:0}),(function(e){return e.index===e.length-1?10:0})),Ye=d.b.h3(De||(De=Object(b.a)(["\n  font-size: 1.4em;\n  font-weight: 500;\n"]))),$e=s.a.createContext("");function Xe(e){var t=Object(u.useState)(e.defaultActiveTabName),n=Object(g.a)(t,2),r=n[0],i=n[1];return Object(v.jsxs)(u.Fragment,{children:[Object(v.jsx)(Ve,{children:e.headerNames.map((function(t,n){return Object(v.jsx)(_e,{active:t===r,index:n,length:e.children.length,onClick:function(){return i(t)},children:Object(v.jsx)(Ye,{children:e.headerElements[n]})},t)}))}),Object(v.jsx)($e.Provider,{value:r,children:Object(v.jsx)(He,{children:e.children})})]})}var Ke,Qe,Ze=d.b.section(Ie||(Ie=Object(b.a)(["\n  text-align: start;\n  padding: 0;\n"])));function et(e){var t=Object(u.useContext)($e);return Object(v.jsx)(Ze,{children:e.tabName===t?e.children:null})}var tt,nt,rt,it,ct=d.b.h3.attrs((function(e){return{marginTop:e.marginTop}}))(Ke||(Ke=Object(b.a)(["\n  margin-top: ",";\n  margin-bottom: 0.5em;\n"])),(function(e){var t=e.marginTop;return t||"1.5em"})),at=Object(d.b)(ct)(Qe||(Qe=Object(b.a)(["\n    margin-top: 0;\n"]))),ot=n(34),ut=n.n(ot),st="Hmm... that doesn't seem right -",lt=function(){function e(){Object(_.a)(this,e)}return Object(Y.a)(e,[{key:"nToPercStr",value:function(e){return(100*e).toFixed(2)}}],[{key:"create",value:function(e,t,n){var r=parseFloat(t);if(e.every((function(e){return e instanceof me}))){var i=e.map((function(e){return e.weight})).reduce((function(e,t){return e+t}),0),c=e.reduce((function(e,t){return e+t.score.calc()*t.weight}),0),a=1-i;if(a<0)return new bt(Object(v.jsxs)("span",{children:[st," it looks like you've already completed ",Object(v.jsxs)("b",{children:[(100-100*a).toFixed(2),"%"]})," of the course."]}));if(0===a)return new dt(c);var o=c+a;if(isNaN(r))return new bt(""===t?Object(v.jsx)("span",{children:"Enter your desired percentage above."}):Object(v.jsxs)("span",{children:[st," the threshold ",Object(v.jsx)("b",{children:t})," isn't valid."]}));var u=r/100,s=(u-c)/a,l=s*n;return s<0?new Ot(c):s>1?new jt(s,l,u,o):new ft(s,l,a)}return new bt(Object(v.jsx)("span",{children:"You haven't filled in all the assignments."}))}}]),e}(),ht=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r){var i;return Object(_.a)(this,n),(i=t.call(this)).requiredPercentage=void 0,i.requiredAchieved=void 0,i.requiredPercentage=e,i.requiredAchieved=r,i}return Object(Y.a)(n,[{key:"requiredPercentageStr",value:function(){return this.nToPercStr(this.requiredPercentage)}},{key:"requiredAchievedStr",value:function(){return this.requiredAchieved.toFixed(2)}},{key:"isValid",value:function(){return!0}}]),n}(lt),bt=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e){var r;return Object(_.a)(this,n),(r=t.call(this)).messageElement=void 0,r.messageElement=e,r}return Object(Y.a)(n,[{key:"requiredPercentageStr",value:function(){return"--"}},{key:"requiredAchievedStr",value:function(){return"--"}},{key:"message",value:function(){return null==this.messageElement?null:Object(v.jsx)("p",{children:this.messageElement})}},{key:"isValid",value:function(){return!1}}]),n}(lt),dt=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e){var r;return Object(_.a)(this,n),(r=t.call(this,null)).totalAchieved=void 0,r.totalAchieved=e,r}return Object(Y.a)(n,[{key:"message",value:function(){return Object(v.jsxs)("p",{children:["Congratulations, you have reached ",Object(v.jsxs)("b",{children:[this.nToPercStr(this.totalAchieved),"%"]}),"!"]})}}]),n}(bt),jt=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r,i,c){var a;return Object(_.a)(this,n),(a=t.call(this,e,r)).thresh=void 0,a.theoreticalMaximum=void 0,a.thresh=i,a.theoreticalMaximum=c,a}return Object(Y.a)(n,[{key:"message",value:function(){return Object(v.jsxs)("p",{children:["Unfortunately, you can't reach ",this.nToPercStr(this.thresh),"%.",Object(v.jsx)("br",{}),"The maximum percentage you can achieve is ",Object(v.jsxs)("b",{children:[this.nToPercStr(this.theoreticalMaximum),"%"]}),"."]})}}]),n}(ht),ft=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e,r,i){var c;return Object(_.a)(this,n),(c=t.call(this,e,r)).totalWeightLeft=void 0,c.totalWeightLeft=i,c}return Object(Y.a)(n,[{key:"message",value:function(){return Object(v.jsxs)("p",{children:["Over the remaining ",Object(v.jsxs)("b",{children:[this.nToPercStr(this.totalWeightLeft),"%"]}),", you need at least:"]})}}]),n}(ht),Ot=function(e){Object(H.a)(n,e);var t=Object(V.a)(n);function n(e){var r;return Object(_.a)(this,n),(r=t.call(this,null)).totalAchieved=void 0,r.totalAchieved=e,r}return Object(Y.a)(n,[{key:"message",value:function(){return Object(v.jsxs)("p",{children:["Congratulations, you have already reached ",Object(v.jsxs)("b",{children:[this.nToPercStr(this.totalAchieved),"%"]}),"!"]})}}]),n}(bt),gt=d.b.span.attrs((function(e){return{marginRight:e.marginRight}}))(tt||(tt=Object(b.a)(["\n  margin-right: ",";\n  color: ",";\n  font-weight: 500;\n  font-size: 3rem;\n"])),(function(e){var t=e.marginRight;return t||void 0}),(function(e){return e.theme.color.text})),mt=d.b.span.attrs((function(e){return{enabled:e.enabled}}))(nt||(nt=Object(b.a)(["\n  color: ",";\n"])),(function(e){var t=e.enabled,n=e.theme;return t?n.color.highlight:n.color.utilityText})),vt=d.b.span(rt||(rt=Object(b.a)(["\n  color: ",";\n"])),(function(e){return e.theme.color.utilityText})),xt=d.b.b(it||(it=Object(b.a)(["\n  white-space: pre;\n"])));function pt(e){var t=e.assignments,n=Object(g.a)(e.threshState,2),r=n[0],i=n[1],c=Object(g.a)(e.outOfState,2),a=c[0],o=c[1],s=parseFloat(a),l=lt.create(t,r,isNaN(s)?100:s);return Object(v.jsxs)(u.Fragment,{children:[Object(v.jsx)(at,{children:"Desired Percentage"}),Object(v.jsxs)(vt,{children:[Object(v.jsx)(ut.a,{value:r,maxLength:4,inputStyle:{fontSize:"3rem",fontWeight:500,border:"none"},type:"numeric",placeholder:"--",onChange:function(e){return i(e.target.value.trim())}}),"%"]}),Object(v.jsx)(ct,{children:"Required Result"}),l.message(),l instanceof ft&&Object(v.jsxs)("span",{children:[Object(v.jsx)(gt,{marginRight:"2px",children:Object(v.jsx)(mt,{enabled:l.isValid(),children:l.requiredPercentageStr()})}),Object(v.jsx)(vt,{children:"%"}),Object(v.jsx)(xt,{children:"  or  "}),Object(v.jsxs)(gt,{children:[Object(v.jsx)(mt,{enabled:l.isValid(),children:l.requiredAchievedStr()}),Object(v.jsx)(vt,{children:"/"})]}),Object(v.jsx)(ut.a,{value:a,inputStyle:{fontSize:"3rem",fontWeight:500,border:"none"},maxLength:5,type:"numeric",placeholder:100..toString(),onChange:function(e){return o(e.target.value.trim())}})]})]})}function St(e){return Object(v.jsx)(at,{children:"Coming Soon!"})}var yt=n(22),wt=n(6),kt=n(46);function Ct(e){if(!e.clazz.endsWith("Assignment"))return null;switch(e.clazz){case"ValidAssignment":if(e.hasOwnProperty("scoreStr")){var t=ie(e.weightStr),n=ee.fromString(e.scoreStr);return n&&!isNaN(t)?new me(Object(re.a)(),e.name,n,t,e.weightStr):new ve(Object(re.a)(),e.name,e.scoreStr,e.weightStr)}return new ve(Object(re.a)(),e.name,"",e.weightStr);case"StubAssignment":return new ve(Object(re.a)(),e.nameStr,e.scoreStr?e.scoreStr:"",e.weightStr);default:return null}}var At,Nt,Et,Tt=n(52),Ft=n(36),Pt=n(35),zt=d.b.input(At||(At=Object(b.a)(["\n  flex: 1;\n  border: solid 1px ",";\n  padding: 10px;\n  border-radius: 5px;\n\n  &:focus {\n    border: solid 1px ",";\n    outline: none;\n  }\n"])),(function(e){return e.theme.color.outline}),(function(e){return e.theme.color.text})),Rt=d.b.div(Nt||(Nt=Object(b.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n"]))),qt=d.b.p(Et||(Et=Object(b.a)(["\n  font-weight: bold;\n  margin-top: 0.75em;\n  margin-bottom: 0.5em;\n  color: ",";\n"])),(function(e){return e.theme.color.highlight}));function Jt(e,t,n){var r=new URLSearchParams;return r.append("saved",Object(yt.encode)(JSON.stringify({title:e,assignments:t.filter((function(e){return e instanceof ge})).map((function(e){return n(e)}))}))),"https://"+window.location.host+"/grade-calculator/?"+r.toString()}function Lt(e){var t=e.title,n=e.assignments,r=Object(u.useMemo)((function(){return Jt(t,n,(function(e){return e.fullJSON()}))}),[t,n]),i=Object(u.useMemo)((function(){return Jt(t,n,(function(e){return e.templateJSON()}))}),[t,n]),c=Object(u.useState)(null),a=Object(g.a)(c,2),o=a[0],s=a[1];return Object(v.jsxs)(Ge,{children:[Object(v.jsx)(ct,{marginTop:"0.25em",children:"Share Template with Scores"}),"FULL"===o&&Object(v.jsx)(qt,{children:"Copied!"}),Object(v.jsxs)(Rt,{children:[Object(v.jsx)(zt,{readOnly:!0,value:r}),Object(v.jsx)(Pt.CopyToClipboard,{text:r,onCopy:function(){return s("FULL")},children:Object(v.jsx)(ye,{children:Object(v.jsx)(Ft.a,{})})})]}),Object(v.jsx)(ct,{children:"Share Template"}),"TEMPLATE"===o&&Object(v.jsx)(qt,{children:"Copied!"}),Object(v.jsxs)(Rt,{children:[Object(v.jsx)(zt,{readOnly:!0,value:i}),Object(v.jsx)(Pt.CopyToClipboard,{text:i,onCopy:function(){return s("TEMPLATE")},children:Object(v.jsx)(ye,{children:Object(v.jsx)(Ft.a,{})})})]})]})}var Ut,Dt,It,Wt,Bt,Mt=n(47),Gt=Object(d.b)(pe)(Ut||(Ut=Object(b.a)(["\n  width: 100%;\n  font-size: 2em;\n  font-weight: bold;\n  border: none;\n"]))),Ht=d.b.button(Dt||(Dt=Object(b.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  white-space: pre;\n  font-size: 1.1em;\n  //font-weight: 600;\n  margin: 0;\n  padding: 15px;\n  width: 100%;\n  background: none;\n  border: none;\n  border-radius: 10px;\n\n    // color: ",";\n"])),(function(e){return e.theme.color.outlineReject})),Vt=d.b.a(It||(It=Object(b.a)(["\n    text-decoration: none;\n"]))),_t=[];function Yt(){var e=Object(u.useState)([].concat(_t,[Oe.ofAdd()])),t=Object(g.a)(e,2),n=t[0],r=t[1],i=Object(u.useState)(!1),c=Object(g.a)(i,2),a=c[0],o=c[1],s=Object(u.useState)(""),l=Object(g.a)(s,2),h=l[0],b=l[1],d=Object(u.useState)(""),j=Object(u.useState)(""),f=Object(wt.d)(),x=new URLSearchParams(Object(wt.e)().search).get("saved"),p=Object(u.useCallback)((function(){var e=Object(yt.encode)(JSON.stringify({title:h,assignments:n.slice(0,-1).map((function(e){return e.fullJSON()}))}));if(x&&x!==e){var t=function(e){var t=JSON.parse(e),n=[],r=t.title?t.title:"";if(!t.hasOwnProperty("assignments"))return null;var i,c=Object(kt.a)(t.assignments);try{for(c.s();!(i=c.n()).done;){var a=Ct(i.value);a&&n.push(a)}}catch(o){c.e(o)}finally{c.f()}return{title:r,assignments:n}}(Object(yt.decode)(x));null!==t&&(b(t.title),r([].concat(Object(O.a)(t.assignments),[Oe.ofAdd()])))}}),[n,x,h]);function S(){r((function(e){var t=Object(O.a)(e);return t.push(Oe.ofAdd()),t}))}return Object(u.useEffect)((function(){p()}),[]),Object(Mt.a)({timeout:1e3,onIdle:function(){var e=Object(yt.encode)(JSON.stringify({title:h,assignments:n.filter((function(e){return e instanceof ge})).map((function(e){return e.fullJSON()}))}));if(console.log("saved: "+JSON.stringify({title:h,assignments:n.filter((function(e){return e instanceof ge})).map((function(e){return e.fullJSON()}))})),x!==e){var t=new URLSearchParams;t.append("saved",e),f.replace({search:t.toString()})}},debounce:500}),Object(v.jsxs)(u.Fragment,{children:[Object(v.jsxs)(We,{bottom:"50px",children:[Object(v.jsx)(Vt,{href:"/grade-calculator",children:Object(v.jsx)(y,{children:"Grade Calculator"})}),Object(v.jsxs)(m,{children:["Enter your assignment information, then choose whether you want to reach a ",Object(v.jsx)("b",{children:"percentage"})," or ",Object(v.jsx)("b",{children:"grade"}),"."]})]}),Object(v.jsx)(G,{title:Object(v.jsx)(Gt,{value:h,onChange:function(e){return b(e.target.value)},placeholder:"Title"}),headers:["ASSIGNMENT","SCORE","WEIGHT"],hints:["","% or X/Y","%"],children:n.map((function(e,t){return Object(v.jsx)(Pe,{assignment:e,onChange:function(e){return function(e,t){n[t].equals(e)||r((function(n){var r=Object(O.a)(n);return r[t]=e,r}))}(e,t)},onClick:t===n.length-1?S:void 0,onDuplicate:function(){return function(e){r((function(t){var n=Object(O.a)(t),r=t[e].clone();return n.splice(e,0,r),n}))}(t)},onDelete:function(){return function(e){r((function(t){var n=Object(O.a)(t);return n.splice(e,1),n}))}(t)}},e.uuid)}))}),Object(v.jsx)(We,{top:"20px",children:Object(v.jsxs)(Xe,{defaultActiveTabName:"REACH_PERCENTAGE",headerNames:["REACH_PERCENTAGE","REACH_GRADE"],headerElements:[Object(v.jsxs)("span",{children:["% Reach a ",Object(v.jsx)("b",{children:"percentage"})]}),Object(v.jsxs)("span",{children:["A+ Reach a ",Object(v.jsx)("b",{children:"grade"})]})],children:[Object(v.jsx)(et,{tabName:"REACH_PERCENTAGE",children:Object(v.jsx)(pt,{assignments:n.slice(0,-1),threshState:d,outOfState:j})}),Object(v.jsx)(et,{tabName:"REACH_GRADE",children:Object(v.jsx)(St,{assignments:n.slice(0,-1)})})]})}),Object(v.jsx)(We,{children:Object(v.jsxs)(Me,{marginTop:"20px",children:[Object(v.jsxs)(Ht,{onClick:function(){return o((function(e){return!e}))},children:[Object(v.jsx)(Tt.a,{})," SHARE"]}),a&&Object(v.jsx)(Lt,{title:h,assignments:n.slice(0,-1)})]})})]})}var $t=d.b.p(Wt||(Wt=Object(b.a)(["\n  position: absolute;\n  right: 25px;\n  bottom: 5px;\n"]))),Xt=d.b.footer(Bt||(Bt=Object(b.a)(["\n    height: 80px;\n"])));var Kt=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsxs)(d.a,{theme:f,children:[Object(v.jsx)(j.a,{basename:"/grade-calculator",children:Object(v.jsx)(Yt,{})}),Object(v.jsx)(Xt,{children:Object(v.jsxs)($t,{children:["Made by ",Object(v.jsx)("a",{href:"https://isaacy.dev",children:"Isaac Young"})]})})]})})},Qt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,83)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),c(e),a(e)}))};h.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(Kt,{})}),document.getElementById("root")),Qt()}},[[81,1,2]]]);
//# sourceMappingURL=main.61b7f9ce.chunk.js.map