"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[9320],{1761:function(e,n,t){t.r(n),t.d(n,{default:function(){return E}});var a=t(1151),s=t(7294),l=t(6917);function r(e){const n=Object.assign({h2:"h2",a:"a",span:"span",p:"p",h3:"h3",strong:"strong",br:"br",h4:"h4",ul:"ul",li:"li"},(0,a.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(n.h2,{id:"️-environment",style:{position:"relative"}},s.createElement(n.a,{href:"#%EF%B8%8F-environment","aria-label":"️ environment permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"🖥️ Environment"),"\n",s.createElement(n.p,null,"앞으로 Standard ML(이하 sml) 코드를 수행하기 위해 ",s.createElement(n.a,{href:"https://www.smlnj.org/"},"sml/nj")," 를 사용할 것이다.\n만일, 설치가 어렵거나 불가능하다면 ",s.createElement(n.a,{href:"https://sosml.org/editor"},"온라인 인터프리터"),"를 사용할 수도 있다."),"\n",s.createElement(n.p,null,"python처럼 REPL(Read-Eval-Print-Loop) 을 사용할 수 있어서 편리하다."),"\n",s.createElement(n.h2,{id:"-new-start",style:{position:"relative"}},s.createElement(n.a,{href:"#-new-start","aria-label":" new start permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"🌅 New start!"),"\n",s.createElement(n.p,null,"기존에 C나 Java와 같은 main-stream 언어에 익숙한 사람이라면, sml이라는 언어는 굉장히 이상하게 느껴질 것이다.\n이는, sml이 순수 함수형 언어에 가깝기 때문이다. 즉, 변수는 수정할 수 없고(immutable), 함수는 부작용 없이 first-class로 간주되는 등의 성질을 가지고 있다."),"\n",s.createElement(n.p,null,"이런 사실만 보고 “sml은 뭔가 불편할 것이다!” 라고 생각하는 사람들이 적지 않을 것이다. 그도 그럴것이, 평소에 습관적으로\n변수를 바꿔왔고, 함수에 여러 부작용을 넣어서 사용했기 때문이다. 이는 그런 사람들이 잘못된 것이 아니라, 프로그래밍의 패러다임이 달라서 발생하는\n어색함, 내지는 생경함이라고 생각한다."),"\n",s.createElement(n.p,null,"하지만, 생각보다 sml로 프로그램을 짜면 그 독특한 매력에 빠질 것이다. 기존에는 100줄을 넘어가며 만들던 자료구조를 단 몇십줄에 만들 수도 있고,\n불필요한  ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if-else</code>'}})," 문을 쓰지 않아도 되는 방법이 있어서 가독성이 높아질 수도 있다."),"\n",s.createElement(n.h3,{id:"-the-very-first-sml-program",style:{position:"relative"}},s.createElement(n.a,{href:"#-the-very-first-sml-program","aria-label":" the very first sml program permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"👶🏻 The very first sml program"),"\n",s.createElement(n.p,null,"백문이 불여일code"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml"><span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>       <span class="token comment">(* comment like this *)</span>\n<span class="token keyword">val</span> y <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">30</span><span class="token punctuation">;</span>\n<span class="token keyword">val</span> z <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> y<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">val</span> absZ <span class="token operator">=</span> <span class="token keyword">if</span> z <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token keyword">then</span> <span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">-</span> z<span class="token punctuation">)</span> <span class="token keyword">else</span> z<span class="token punctuation">;</span></code></pre></div>'}}),"\n",s.createElement(n.p,null,"뭐, 첫인상은 여타 언어와 별반 다르지 않다.\n변수를 선언할 때 쓰이는 키워드가 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">val</code>'}}),"이고, C에서의 ternary 연산자 (",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">?:</code>'}}),") 는 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if-then-else</code>'}}),"로 쓴다는 것을 알 수 있다."),"\n",s.createElement(n.p,null,"세미콜론은 REPL 환경에서는 한 줄 한 줄씩 실행되므로 붙여야 하지만, 직접 sml 파일로 저장한 뒤, 컴파일 할 때는 쓰지 않아도 된다.\n앞으로는 파일에 쓰는 것을 가정하므로, 세미콜론을 생략할 것이다."),"\n",s.createElement(n.p,null,"참고로, 코드를 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">first.sml</code>'}}),"이라는 파일에 저장했다면, 이를 (컴파일하고) 실행하는 명령은 다음과 같다."),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml">sml first<span class="token punctuation">.</span>sml</code></pre></div>'}}),"\n",s.createElement(n.p,null,"혹은 REPL에서"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml">use <span class="token string">"first.sml"</span></code></pre></div>'}}),"\n",s.createElement(n.h3,{id:"-deep-dive-into-first-program",style:{position:"relative"}},s.createElement(n.a,{href:"#-deep-dive-into-first-program","aria-label":" deep dive into first program permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"🌊 Deep dive into first program"),"\n",s.createElement(n.p,null,"sml을 비롯한 프로그래밍 언어들은 기본적으로 한 구문을 해석할 때, ",s.createElement(n.strong,null,"syntax"),"와 ",s.createElement(n.strong,null,"semantic"),"을 본다."),"\n",s.createElement(n.p,null,s.createElement(n.strong,null,"Syntax"),"는 우리말로 ‘문법’으로, expression을 쓰는 규칙이다.\n이를테면, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">10 + 20</code>'}}),"은 syntactically 올바른 expression 이지만, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">10 + </code>'}}),"는 그렇지 않다.\n이외에도, 변수의 이름을 붙이는 규칙 등등이 syntax의 예라고 할 수 있다."),"\n",s.createElement(n.p,null,s.createElement(n.strong,null,"Semantic"),"은 크게 두 가지로 나뉘는데, 하나는 ",s.createElement(n.strong,null,"Type checking"),"이고, 또다른 하나는 ",s.createElement(n.strong,null,"Evaluation"),"이다. ",s.createElement(n.br),"\n","즉, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">10 + "hello"</code>'}}),"는 Type checking에서 error가 발생할 것이고, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">10 + x</code>'}}),"는 변수 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">x</code>'}}),"가 정의되지 않았다면,\nevaluation에서 error가 발생할 것이다."),"\n",s.createElement(n.p,null,"SML은 static-type 언어이다. 즉, python 보다는 오히려 C나 C++같이 컴파일 타임에 타입이 결정되는 언어이다. ",s.createElement(n.br),"\n","따라서, type checking은 static environment, evaluation은 dynamic environment를 extend 한다고 생각할 수 있다."),"\n",s.createElement(n.h3,{id:"-what-is-expression-then",style:{position:"relative"}},s.createElement(n.a,{href:"#-what-is-expression-then","aria-label":" what is expression then permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"❓ What is Expression, then?"),"\n",s.createElement(n.p,null,"쉽게 말해서, 값이 될 수 있는 것을 expression이라고 한다. sml의 모든 종류의 expression은\n위에서 소개한 syntax, type checking rules, evaluation rules를 가진다."),"\n",s.createElement(n.h4,{id:"what-about-if-then-else",style:{position:"relative"}},s.createElement(n.a,{href:"#what-about-if-then-else","aria-label":"what about if then else permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"What about ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if-then-else</code>'}}),"?"),"\n",s.createElement(n.p,null,"expression ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e1</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e2</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e3</code>'}})," 에 대해 다음 expression을 보자."),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml"><span class="token keyword">if</span> e1 <span class="token keyword">then</span> e2 <span class="token keyword">else</span> e3</code></pre></div>'}}),"\n",s.createElement(n.p,null,"이 expression을 분석해보자."),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"\n",s.createElement(n.p,null,"Syntax"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">then</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">else</code>'}}),"는 sml의 키워드이고, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e1</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e2</code>'}}),", ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e3</code>'}}),"는 subexpression이다."),"\n"),"\n"),"\n",s.createElement(n.li,null,"\n",s.createElement(n.p,null,"Type-checking"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e1</code>'}}),"은 무조건 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">bool</code>'}})," 이다."),"\n",s.createElement(n.li,null,s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e2</code>'}}),"와 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e3</code>'}}),"는 같은 type을 가진다."),"\n"),"\n"),"\n",s.createElement(n.li,null,"\n",s.createElement(n.p,null,"Evaluation"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"먼저, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e1</code>'}}),"을 값 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">v1</code>'}}),"으로 평가(evaluation)한다."),"\n",s.createElement(n.li,null,"참이면, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e2</code>'}}),"을 값 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">v2</code>'}}),"로 평가하고, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if-then-else</code>'}})," expression 전체를 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">v2</code>'}}),"로 평가한다."),"\n",s.createElement(n.li,null,"거짓이면, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">e3</code>'}}),"을 값 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">v3</code>'}}),"로 평가하고, ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">if-then-else</code>'}})," expression 전체를 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">v3</code>'}}),"로 평가한다."),"\n"),"\n"),"\n"),"\n",s.createElement(n.p,null,"이정도 하면, 앞으로는 스스로 이 규칙들을 적용해볼 수 있을 것이다."),"\n",s.createElement(n.h2,{id:"-functions",style:{position:"relative"}},s.createElement(n.a,{href:"#-functions","aria-label":" functions permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"📝 Functions"),"\n",s.createElement(n.p,null,"함수형 언어에서 가장 중요한 함수를 다뤄보자. 간단하게, 두 정수를 받아 그것들의 합을 반환하는 함수 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">add</code>'}}),"는 다음과 같다."),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml"><span class="token keyword">fun</span> <span class="token function">add</span> <span class="token punctuation">(</span>a<span class="token punctuation">:</span> <span class="token class-name">int</span><span class="token punctuation">,</span> b<span class="token punctuation">:</span> <span class="token class-name">int</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token class-name">int</span> <span class="token operator">=</span> \n  a <span class="token operator">+</span> b</code></pre></div>'}}),"\n",s.createElement(n.p,null,"눈에 띄는 것은 거추장스러운 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">return</code>'}})," 키워드가 없다는 것이다. 이는 수학의 함수에서 굳이 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">return</code>'}}),"이라는 키워드가 필요 없는것과 비슷하다.\n또한, 위와 같이 ",s.createElement(l.DQ,{id:1},"매개변수와 반환값의 타입을 지정해야 하는 것"),"은 static type 언어의 특징을 잘 표현한다."),"\n",s.createElement(n.p,null,"여기서 함수 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">add</code>'}}),"의 type은 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">(int * int) -> int</code>'}})," 로 추론된다. 여기서 ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">*</code>'}}),"를 multiplication으로 생각하는 사람은 없겠지?!\n그냥 두 인자를 받는다는 것을 저렇게 표현한 것이다."),"\n",s.createElement(n.h2,{id:"-others",style:{position:"relative"}},s.createElement(n.a,{href:"#-others","aria-label":" others permalink",className:"anchor-header before"},s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"😀 Others"),"\n",s.createElement(n.p,null,"sml의 연산자는 타 언어와 약간 다른 경우가 있다. 헷갈릴 수 있으니, 잘 알아두자."),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="sml"><pre class="language-sml"><code class="language-sml"><span class="token comment">(* sml code *)</span>              <span class="token comment">(* interpret C-like... *)</span>\n<span class="token keyword">val</span> x <span class="token operator">=</span> <span class="token number">~5</span>                  <span class="token comment">(* int x = -5. not a \'bitwise not\' *)</span>\n\nx <span class="token operator">=</span> <span class="token number">10</span>                      <span class="token comment">(* x == 10 *)</span>\nx <span class="token operator">&lt;</span><span class="token operator">></span> <span class="token number">20</span>                     <span class="token comment">(* x != 20 *)</span>\n\n<span class="token keyword">val</span> y <span class="token operator">=</span> <span class="token string">"hello"</span> <span class="token operator">^</span> <span class="token string">"world"</span>   <span class="token comment">(* string y = concat("hello", "world") *)</span></code></pre></div>'}}))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?s.createElement(n,e,s.createElement(r,e)):r(e)},o=t(1883),p=t(2483),i=t(4842),m=t(2825),u=t(2949),d=t(9425),g=t(5067);const h=e=>{var n;let{data:t,location:a,children:l}=e;const r=t.mdx,c=(null===(n=t.site.siteMetadata)||void 0===n?void 0:n.title)||"Title",{previous:h,next:E}=t,f=r.frontmatter.tags,y=r.frontmatter.sidenotes;return s.createElement(i.Z,{location:a,title:c},s.createElement(m.Z,{title:r.frontmatter.title,description:r.frontmatter.description||r.excerpt}),s.createElement(g.Z,null),s.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},s.createElement("header",null,s.createElement("h1",{itemProp:"headline"},r.frontmatter.title),s.createElement("p",null,r.frontmatter.date),s.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"flex-start",listStyle:"none",padding:0}},f.map((e=>s.createElement("li",{key:e,style:{marginRight:"1rem"}},s.createElement(u.Z,{tagName:e})))))),s.createElement("section",{itemProp:"articleBody"},l),s.createElement("hr",null)),s.createElement(d.Z,{sidenotesRecord:y}),s.createElement("nav",{className:"blog-post-nav"},s.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},s.createElement("li",null,h&&s.createElement(o.Link,{to:h.fields.slug,rel:"prev"},"← ",h.frontmatter.title)),s.createElement("li",null,E&&s.createElement(o.Link,{to:E.fields.slug,rel:"next"},E.frontmatter.title," →")))),s.createElement(p.Z,{repo:"monognuisy/blog",theme:"github-light"}))};function E(e){return s.createElement(h,e,s.createElement(c,e))}},2483:function(e,n,t){var a=t(7294);const s=a.memo((e=>{let{repo:n,theme:t}=e;const s=(0,a.createRef)();return(0,a.useLayoutEffect)((()=>{const e=document.createElement("script"),a={src:"https://utteranc.es/client.js",repo:n,theme:t,"issue-term":"pathname",label:"✨💬 comments ✨",crossOrigin:"anonymous",async:"true"};Object.entries(a).forEach((n=>{let[t,a]=n;e.setAttribute(t,a)})),s.current.appendChild(e)}),[n]),a.createElement("div",{ref:s,className:"utterances-wrapper"})}));s.displayName="Utterances",n.Z=s},9425:function(e,n,t){var a=t(5785),s=t(7294);const l=e=>{let{pos:n,id:t,elements:a,children:l}=e;const{0:r,1:c}=(0,s.useState)(!1),o={top:0,position:"absolute",boxShadow:"rgba(0, 0, 0, 0.01) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",padding:"10px",maxWidth:"300px",width:"100%",borderRadius:"5px",backgroundColor:r?"#eeeeee":"#ffffff"};return s.createElement("div",{style:{...o,top:n},id:"sn-ref-"+(t+1),onMouseEnter:()=>{return e=t,c((()=>!0)),void(a[e].style.backgroundColor="#ffdc5c");var e},onMouseLeave:()=>{return e=t,c((()=>!1)),void(a[e].style.backgroundColor="#fff9db");var e}},s.createElement("span",null,l))},r=e=>e.split("").map((e=>e.charCodeAt(0))).reduce(((e,n)=>e+(10===n||n>>7?1.8:1)),0);n.Z=e=>{let{sidenotesRecord:n}=e;const{0:t,1:c}=(0,s.useState)([]),{0:o,1:p}=(0,s.useState)([]);return(0,s.useEffect)((()=>{null==n||n.forEach((e=>{const n=e.id,t=document.querySelector("#sn-"+n),s=t.getBoundingClientRect().top+window.scrollY;c((n=>[].concat((0,a.Z)(n),[{pos:s,content:e.content}]))),p((e=>[].concat((0,a.Z)(e),[t])))}))}),[]),null==n||n.forEach(((e,n)=>{if(n<t.length-1){const a=t[n].pos,s=t[n+1].pos,l=24*Math.ceil(7.8*r(e.content)/269)-5;console.log(l),console.log(s),a+l>=s&&(t[n+1].pos=a+l+45)}})),s.createElement("div",{className:"sidenotes-wrapper"},t.map(((e,n)=>{const{pos:t,content:a}=e,r="sn-ref-"+(n+1);return s.createElement(l,{id:n,pos:t,key:r,elements:o},a)})))}},5067:function(e,n,t){var a=t(7294);n.Z=()=>a.createElement("div",{className:"toc-wrapper"})},6917:function(e,n,t){t.d(n,{DQ:function(){return r},EK:function(){return s},Uw:function(){return c},y$:function(){return l}});var a=t(7294);const s=e=>{let{language:n="text",children:t}=e;return a.createElement("code",{className:"language-"+n},t)},l=e=>{let{color:n=c,children:t}=e;return a.createElement("span",{style:n},t)},r=e=>{let{id:n,children:t}=e;const{0:s,1:l}=(0,a.useState)(!1),{0:r,1:c}=(0,a.useState)(null);(0,a.useEffect)((()=>{const e="sn-ref-"+n,t=document.querySelector("#"+e);c((()=>t))}),[s]);const o={backgroundColor:s?"#ffdc5c":"#fff9db",padding:"3px",borderRadius:"3px"};return a.createElement("span",{id:"sn-"+n,style:o,onMouseEnter:()=>{l((()=>!0)),r&&(r.style.backgroundColor="#eeeeee")},onMouseLeave:()=>{l((()=>!1)),r&&(r.style.backgroundColor="#ffffff")}},t)},c={backgroundColor:"#aff0ef",padding:"3px",borderRadius:"3px"}},1151:function(e,n,t){t.d(n,{ah:function(){return l}});var a=t(7294);const s=a.createContext({});function l(e){const n=a.useContext(s);return a.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-content-file-path-home-monognuisy-code-blog-content-blog-functional-sml-1-basics-mdx-67cef3c2d966e8921642.js.map