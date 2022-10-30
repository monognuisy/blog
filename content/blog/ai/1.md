---
title: Fisher Discriminant Analysis
date: "2022-10-26"
description: "대표적인 classification algorithm인 Fisher Discriminant Analysis(FDA)를 알아보자."
tags: ["AI","Mathematics"]
categories: "AI"
---

혹은 linear discriminant analysis라고 함. \
만일, 두개의 class의 average가 같다면? → average 방법으로 classify 하기 힘듦. \
또한, mean 외의 covariance도 중요함. \
⇒ covariance를 고려하자.

FDA : variance in the projected 1-dim space.

### Remind

각각의 datum ${\bf x}_i$ 를 unit vector ${\bf w}$에 사영하면, 사영된 벡터의 길이 ${\bf w}^T {\bf x}_i$ 를 구할 수 있었다.

⇒ 결국 ${\bf w}$ 라는 직선 위에 있게 됨.

$$
{\rm var}({\bf w}) = \frac{1}{N} \sum _{i = 1}^N ({\bf w}^T {\bf x}_i - \hat{m})^2
$$

where $\hat{m} = \sum {\bf w}^T {\bf x}_i / N$

여기서, 원래의 vector들의 mean을 $\hat{\boldsymbol\mu}$ 라고 하자. 즉,

$$
\hat{\boldsymbol\mu} = \frac{1}{N}\sum {\bf x}_i
$$

이면, $\hat{m}$ 은 다음과 같다.

$$
\hat{m} = {\bf w}^T \hat{\boldsymbol\mu}
$$

따라서,

$$
\begin{align*}
{\rm var}({\bf w}) &= \frac{1}{N} \sum _{i = 1}^N ({\bf w}^T {\bf x}_i - \hat{m})^2
\\
&= \frac{1}{N} \sum _{i = 1}^N ({\bf w}^T {\bf x}_i - {\bf w}^T \hat{\boldsymbol\mu})^2 \\
&= \frac{1}{N} \sum _{i = 1}^N {\bf w}^T({\bf x}_i - \hat{\boldsymbol\mu})({\bf x}_i - \hat{\boldsymbol\mu})^T{\bf w} \\
&= {\bf w}^T \underbrace{\left[\frac{1}{N} \sum _{i = 1}^N ({\bf x}_i - \hat{\boldsymbol\mu})({\bf x}_i - \hat{\boldsymbol\mu})^T\right]}_{\text{this is covariance matrix of original vectors.}} {\bf w} \\ \\
&= {\bf w}^T \Sigma {\bf w}
\end{align*}
$$

여기서 $\Sigma  \in \R^{D \times D}$ 는 공분산행렬을 의미한다.

<figure>
<img src="https://i.imgur.com/TJZQ24N.png" alt="figure 1: example of FDA" style="max-width:100%"/>

<figcaption>figure 1: example of FDA</figcaption>
</figure>

<br>

좌측 그림은, 각 class의 분산이 겹치기 때문에 좋지 못한 classification이지만, 우측의 그림은 서로의 분산이 겹치지 않기에 좋은 classification이다.

Data를 $\{ {\bf x}_i, y_i \}$ 라고 하는 것은 익숙하다. 여기서, $y_i \in \{1,2 \}$ 이다.

$|\{ i  ~|~ y_i = 1 \}| = N_1$ 이라 하고, $|\{ i  ~|~ y_i = 2 \}| = N_2$ 라 하자. 즉, $N = N_1 + N_2$  이다.

비슷하게, class 1의 평균을 $\hat{\boldsymbol\mu}_1$, 공분산을 $\Sigma_1$ 이라 하고, class 2도 비슷하게 진행하자. \
즉,

$$
\Sigma_1  = \frac{1}{N_1} \sum_{\{i  ~|~ y_i = 1 \}} ({\bf x}_i - \hat{\boldsymbol\mu}_1)({\bf x}_i - \hat{\boldsymbol\mu}_1)^T
$$

따라서, 각 class의 **공분산을 최소화**해야 하는 동시에, 각 class의 중심($\hat{\boldsymbol\mu}_1, \hat{\boldsymbol\mu}_2$ ) 가 멀어져야 하므로 **전체의 분산을 최대화**해야 한다.

그러므로, $L({\bf w})$ 를 최대로 하기 위해 식을 구성하면 다음과 같다.

$$
L({\bf w}) = \frac{{\bf w}^T \Sigma {\bf w}}{\left(\dfrac{N_1}{N}\right) {\bf w}^T \Sigma_1 {\bf w} + \left(\dfrac{N_2}{N} \right){\bf w}^T  \Sigma_2 {\bf w}}
$$

당연히, 이는 scalar value를 가진다.

다음과 같이 깔끔한 notation을 정의하자.

$$
\Sigma_{12} = \left(\dfrac{N_1}{N}\right)  \Sigma_1  + \left(\dfrac{N_2}{N}  \right) \Sigma_2
$$

그러면,

$$
L({\bf w}) = \frac{{\bf w}^T \Sigma {\bf w}}{{\bf w}^T \Sigma_{12} {\bf w}}
$$

$$
\frac{{\rm d}L}{{\rm d}{\bf w}} = \frac{2}{({\bf w}^T \Sigma {\bf w})^2} ( \Sigma {\bf w} {\bf w} ^T \Sigma_{12} {\bf w} - \Sigma_{12} {\bf w} {\bf w}^T \Sigma {\bf w} ) = 0
$$

즉,

$$
\Sigma {\bf w} {\bf w} ^T \Sigma_{12} {\bf w} - \Sigma_{12} {\bf w} {\bf w}^T \Sigma {\bf w} = 0
$$

$$
\Sigma {\bf w} - \frac{{\bf w}^T \Sigma {\bf w}}{{\bf w}^T \Sigma_{12} {\bf w}} \Sigma_{12} {\bf w} = 0
$$

⇒ Generalized Eigenvector Problem

따라서, $\Sigma {\bf w} = \lambda \Sigma_{12} {\bf w}$ 를 만족하는 eigenvalue와 eigenvector를 찾으면 된다.

(여기서 $\lambda = L({\bf w})$ 임을 확인할 수 있다. 따라서, max인 eigenvalue를 선택해야함.)
