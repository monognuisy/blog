---
title: C에서의 goto
date: "2022-12-11"
description: "과연 정말로 쓰면 안되는 것일까?"
tags: ["System Programming","Programming"]
categories: "System Programming"
---

## 🤔 goto?

많은 C 입문 교재를 보면 goto를 마치 '절대로 쓰면 안되는 것' 이라던지, '한 번이라도 쓰면 큰일이 나는 것' 과 같이 취급한다.
컴퓨터 과학에 지대한 영향을 끼친 에츠허르 다익스트라(Edsger W. Dijkstra) 옹께서 `goto`를 절대로 쓰지 말라고 한 것의 영향이
크다고 생각한다.

그렇다면, 왜 쓰지 말아야 할까?

### 🤦‍♂️ 굳이 쓸 필요가 없다!

다음 두 코드는 완벽히 동일하게 작동한다. 어느 것이 더 깔끔한가?

```c
int sumTo(int N) {
    int res = 0;

    for (int i = 1; i <= N; i++) {
        res += i;
    }

    return res;
}
```

```c
int sumTo(int N) {
    int res = 0;
    int i = 1;

    if (i > N) goto done;

loop:
    res += i;
    i++;
    if (i <= N) goto loop;

done:
    return res;
}
```

당연히 위의 `for` 문이 더 간결하고 깔끔해 보인다. `goto`문을 쓴 코드는 마치 어셈블리어 같다.

```nasm
.sumTo
    pushq   %rbx
    movl    $0, %eax
    movl    $1, %ebx
    cmp     %rdi, %rbx
    jg      .DONE
.LOOP
    addq    %rbx, %rax
    addq    $1, %rbx
    cmp     %rdi, %rbx
    jle     .LOOP
.DONE
    popq    %rbx
    ret
```

(최대한 단순히 logic만 표현하였다.)

이렇게, 굳이 어셈블리어로 쓰기 위한 것이 아닌 이상, goto 문은 대부분 `if`와 같은 조건문과 `while`, `for`과 같은 반복문으로 **대체**될 수 있다.

### 🤮 스파게티 코드?

또한, `goto`를 남용하면 흔히 말하는 **스파게티 코드**가 나올 수 있다. 만드는 법은 어렵지 않다. 다만, 해석하기 힘들 뿐.

```c
#include <stdio.h>

int main() {
    int x = 1, y = 3, z = 4;
    goto L2;

L1:
    if (++x & 1) goto end;

L3:
    z -= 3;
    goto L2;
    y--;

L2:
    x += z++;

    if (z & 1) goto L1;

    goto L3;

end:
    printf("%d, %d, %d\n", x, y, z);
    return 0;
}
```

(이게 바로 예상이 된다면... `goto`를 마음껏 써도 좋다. 물론 혼자만.)

이렇게 `goto`를 쓸데없이 남발하면, 보기도 싫고, 해석하기도 힘들고, 건들기는 더욱 두려운 코드가 만들어진다. \
그럼, 정말로 `goto`는 '절대로 쓰면 안되는 것'일까?

### 👍 다중 반복문의 탈출

의외로, 좋은 사용처가 있다. 바로, **다중 반복문**(nested loop)의 탈출이다. \
이를 위해 간단한 C-like pseudo code를 작성하면 다음과 같다.

```c
// do something...
for (int i = ...) {
    for (int j = ...) {
        for (int k = ...) {
            // nested for문 전체를 break 해버리고 싶음!
            goto out;
        }
    }
}

out:
// nice break. do something...
```

오히려 이런 경우에는 `goto`를 사용하지 않으면 복잡해진다. `goto`를 안쓰면 flag 변수를 만들어서 매번 검사하고 탈출해야 하는데,
반복문이 깊어지면 깊어질수록, 이는 크게 비효율적일 것이다.

```c
// do something...
int flag = 0;
for (int i = ...) {
    for (int j = ...) {
        for (int k = ...) {
            // nested for문 전체를 break 해버리고 싶음!
            flag = 1;
            if (flag) break;
        }
        if (flag) break;
    }
    if (flag) break;
}

// 이 얼마나 비효율적인가!
```

물론, flag 변수가 많이 사용되는 것은 비트마스킹을 통해 어느정도 해결할 수 있다. 그럼에도 불구하고, 저 `if`문은 어쩔 수 없다.

따라서, 다중 반복문에서는 `goto`를 사용하는 것이 가독성이나 확장성 측면에서 좋다고 할 수 있다.

### 🙂 간단한 예외처리

예외처리에서도 `goto`는 많이 사용된다.

```c
// in _cpu_down:

if (st->state > CPUHP_TEARDOWN_CPU) {
    st->target = max((int)target, CPUHP_TEARDOWN_CPU);
    ret = cpuhp_kick_ap_work(cpu);

    if (ret)
        goto out;

    if (st->state > CPUHP_TEARDOWN_CPU)
        goto out;

    st->target = target;
}

ret = cpuhp_down_callbacks(cpu, st, target);
if (ret && st->state < prev_state) {
    if (st->state == CPUHP_TEARDOWN_CPU) {
        cpuhp_reset_state(cpu, st, prev_state);
        __cpuhp_kick_ap(st);
    } else {
        WARN(1, "DEAD callback error for CPU%d", cpu);
    }
}

out:
    cpus_write_unlock();
    lockup_detector_cleanup();
    arch_smt_update();
    cpu_up_down_serialize_trainwrecks(tasks_frozen);
    return ret;
```

<https://github.com/torvalds/linux/blob/master/kernel/cpu.c>

이는 linux kernel의 cpu.c 코드에서 에러 처리를 위하여 `goto`를 사용한 모습이다. \
오류를 발생하는 `ret` 변수는 `_cpu_down` 함수 내에서 할당되고, 처리된다.

따라서, 어떠한 **함수 내에서 예외를 처리할 수 있다면**, `goto`문을 사용하는 것이 확실하고, 깔끔한 방법 중 하나라는 것을 확인할 수 있다.

### 😒 그러면 goto는 어디로든 점프할 수 있나요?

**아니다**. 이것이 `goto`의 한계라고 할 수 있다. `goto`는 일반적으로 한 함수 안에서만 점프할 수 있다. 즉, 다음과 같은 코드는 컴파일 오류를 발생시킨다.

```c
void foo() {
    bar();
L1:               // useless
    return;
}

void bar() {
    goto L1;
    // 이 함수에는 L1이 없는데?
}

int main() {
    foo();
    return 0;
}
```

이렇게 여러 함수를 옮겨다니기 위해서는 non-local jump인 `setjmp`와 `longjmp`를 사용해야만 한다.

즉, `goto`로 예외를 처리하기 위해서는 꼭 그 함수 내에서 (다른 errorful한 함수를 호출하지 않고) 처리할 수 있을 정도로 단순한 예외여야 한다. \
(물론 nonlocal jump를 쓰더라도 메모리 해제 등등 생각해야 할 것이 많다.)

### 결론 및 세줄요약

`goto`는 마냥 나쁜것은 아니다. 대부분의 상황에서는 코드를 지저분하게 만들지만, 특정한 상황에서는 오히려 코드를 보기 좋게 만들 수 있다.
따라서, 적재적소에 쓰면서 코드를 짤 필요가 있다.

1. 웬만해선 `goto`는 `if`나 `for`로 대체될 수 있다.
2. 다중 반복문이나 간단한 예외처리에서는 `goto`가 더 좋을수도?
3. 근데 non-local jump는 안됨.
