https://julialang.org/downloads/

https://juliakorea.github.io/ko/latest/
https://julialang.kr/
https://freshrimpsushi.github.io/categories/%EC%A4%84%EB%A6%AC%EC%95%84/


facebook
https://www.facebook.com/groups/juliakorea
welcome
https://github.com/juliakorea/talks/wiki/Welcome

주석 마크다운
https://docs.julialang.org/en/v1/stdlib/Markdown/#markdown_stdlib

string interpolation
https://docs.julialang.org/en/v1/manual/strings/#string-interpolation

try / catch 로 예외처리하네..
https://docs.julialang.org/en/v1/manual/control-flow/#Exception-Handling

@async가 있구나
https://docs.julialang.org/en/v1/manual/asynchronous-programming/#man-asynchronous

gc언어
https://docs.julialang.org/en/v1/devdocs/gc/


## lib

- [Clang.jl](https://github.com/JuliaInterop/Clang.jl)
- [SimpleDirectMediaLayer.jl](https://github.com/JuliaMultimedia/SimpleDirectMediaLayer.jl)
- https://github.com/dmolina/DaemonMode.jl
  - cli 에서 실행할때 컴파일하면서 1~2초 걸리는데, 미리 데몬을 돌려놓으면 빠르게 실행할 수 있음.


줄리아 배열은 1부터 시작한다(다른언어들(ex c)는 0부터 시작한다)
https://docs.julialang.org/en/v1/devdocs/offset-arrays/

- 변수 이름은 소문자로
- 밑줄 사용을 권장하지 않음(이름을 읽기 어려운 경우 '_'를 사용할 수 있음)
- Types 및 Module의 이름은 대문자로 시작, 카멜 케이스로 표시
- functions 및 macro 이름은 밑줄 없이 소문자로
- 내부에서 "변형"이 일어나는 함수의 이름 끝에 '!'를 붙임


typeof()
typemin()
typemax()
eps - https://en.wikipedia.org/wiki/Machine_epsilon
Literal zero and one
zero()
one()

``` julia
julia> 1/ 0
Inf
# infinity

julia> (1 / 0) * 0
NaN
# not a number
```


``` julia
julia> Inf + Inf
Inf

julia> Inf - Inf
NaN

julia> Inf * Inf
Inf

julia> Inf / Inf
NaN

julia> 0 * Inf
NaN

julia> NaN == NaN
false

julia> NaN != NaN
true

julia> NaN < NaN
false

julia> NaN > NaN
false
```


``` julia
function f(x,y)
    x + y
end

```