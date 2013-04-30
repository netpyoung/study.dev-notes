
backup
=========================================================================

https://github.com/c9s/perlomni.vim


```


 참조.

http://www.perl.or.kr/perlyagi/perl-1-a.html#hello

http://deadfire.hihome.com/perl/perl015.html

 

    #!/usr/local/bin/perl
    # hello.pl
    print "Hello World\n";

 

변수
scalar

 : 앞에 $를 붙이는 변수

 : 숫자, 문자, 스트링, 레퍼런스중 하나를 값으로 가짐.

 
array

: 앞에 @를 붙이는 배열(개별 구성요소는 scalar임으로 $를 앞에 붙여야 함)
$# 를 붙이면 배열의 맨 마지막 요소의 참조번호(index number)를 알 수 있다.

    @arr = ( 1, 2, 3, "Last member" );
    $size = @arr;
    print "$size\n";

 

    @dwarfs = ("Happy", "Sleep", "Grumpy", "Dopey");

    foreach my $i (@dwarfs) {
        print $i;
    }
    print $dwarfs[$#dwarfs];
    print $dwarfs[-1];

 

내장 함수

push, pop : 배열에 끝에서 동작

 

    push @menu, qw(김밥 감자 삼겹살);
    print "[".$menu[0]."]\n";

    print "menu = $next_course\n"
    while $next_course = pop @menu;

    print "[".$menu[0]."]\n";

 

shift, unshift : 배열의 시작에서 동작

 

    unshift @menu, qw(김밥 감자 삼겹살);
    print "[".$menu[0]."]\n";

    print "menu = $next_course\n"
    while $next_course = shift @menu;

    print "[".$menu[0]."]\n";

 

splice : 배열의 원소를 바꿈.
인자 : 수정될 배열, 수정될 곳의 인덱스, 제거될 원소 갯수, 삽입될 원소 리스트
리턴 : 제거된 원소들(리스트)

    @ex_sins = splice @deadly_sins, 3,2, @virtues;

 

배열 슬라이싱(Slicing)

 : 원래 배열의 부분 집합과 같은 역활

 : 연속적이지 않은것 이라도 괜찮다.

    @menu = qw(김밥 감자 삼겹살 고구마);
    print @menu[0,2];
    print "\n";
    print @menu[0..2];
    print "\n";
    print @menu[3, 0, 1];

 
list

 : 괄호안에 일련의 값을 콤마로 구분하여 나열한 것. ==> ( 1, 2, 3, 4, 5)

 : 리스트의 각 원소는 반드시 스칼라이어야 하며, 또다른 리스트여서는 안된다.

@arr1 = ("aa","bb","cc"); // 배열에 리스트값을 할당

($a, $b, $c, $d) = @arr; // 리스트의 각각원소에 배열의 값을 할당. 여기서 $d는 undef가 할당됨.

 

($a, $b, $c) = ("aa", "bb", "cc");

==

($a, $b, $c) = qw( aa bb cc);

 
Hash

: 앞에 %를 붙이는 asassociative array. (개별 구성 요소는 scalar임으로 $)

 : 해쉬에 있는 값을 엑세스 할려면 중괄호( { , } )안에 키를 명시한다.

=> 연산자 : 콤마와 동일하지만, 왼쪽에 있는 식별자를 인용부호(")가 붙는 문자열인 것처럼 여김

    %myHash = ( "apple", 3,
                "pear", 10,
                "banana", 4,
                "monkey", 2 );
    print $myHash{ "banana" }, "\n";
    print $myHash{ "apple" }, "\n";
    $myHash{ "pear" } = 9;
    print $myHash{ "pear" }, "\n";

 

 반복

    %sound = ("고양이" => "야옹",
     "호랑이" => "어흥",
     "참새" => "짹짹");
     
    foreach $key (keys %sound) {
        print $key."\n";
    }
     
    foreach $value (values %sound) {
        print $value."\n";
    }
     
    while ( ($nextkey, $nextval) = each %sound) {
        print $nextkey."-".$nextval."\n";
    }

 

삭제

    %score = (
           "deadfire" => 10,
           "nightmare" => 20,
           "cat" => 100,
        );
    delete($score{"cat"}); #cat에 대한 키-값 쌍을 제거.
    foreach $key (sort keys %score){
       print "$key : $score{$key}\n";
    }
     
    undef( $score{"deadfire"} ); #10점이라는 값 자체를 NULL로 변환 

 

Hash슬라이싱(slicing)

슬라이스의 결과는 리스트이기 때문에 @를 쓴다.

    print $sound{"고양이"}, $sound{"호랑이"}."\n";
    print @sound{"고양이", "호랑이"};

 

 

>>>>>>>>>>>>>>>>>>
Sub Routine

    #인자는 @_로 들어감.
    sub dictionary_order
    {
        @ordered = sort @_;
        return @ordered;
    }

    @sorted1 = dictionary_order("eat", "at", "Joe");
    @sorted2 = &dictionary_order("eat", "at", "Joe");
    print @sorted1;
    print @sorted2;

 

인자 전달 배열 : @_

인자를 넣지않고 &접두사로 함수를 호출하면 @_에 있는 배열이 인자로 넘겨진다.
goto &함수; 이런 식으로 함수를 호출할 수 도 있으며 제어권도 넘겨진다.

    sub printNumbers {
        for($i=0; $i<2; ++$i) {
        print @_[$i];
        }
        goto &printX;
        print "end\n";
    }

    sub printX {
        print "[== printX ==]".@_[$#_];
    }

    &printNumbers(11,22,33,44,55);

 

my : 해당함수안에서만

local : 해당 함수 제어범위 안

global : 전역변수

 

    $sum = 1;
     
    sub a{
        local($sum) = 2;
        b();
    }
    sub b{
        printf "Sum is $sum";
    }
     
    b();
    a();

 

    $sum = 1;
     
    sub a{
        my($sum) = 2;
        b();
    }
    sub b{
        printf "Sum is $sum";
    }
     
    b();
    a();

 

    #long Hellow World
    print <<hello_world;
    a
    b
    c
    d
    e
    f
    ghij
    klmn
    opqrstu
    vwxyz
    hello_world

 

    print "Say yes or no : ";

    $answer = <STDIN>;

    #개행문자를 지워주는 함수chomp
    chomp $answer;

    if( $answer eq 'yes' ) {
        print <<EOY;
    you said $answer.
    i will keep going on.
    EOY
    } else {
        print "You said $answer\n";
    }

 

복수인자 (,)

(')변수 치환 하지않는 문자열

(")변수 치환 하지않는 문자열 : 배열일경우 공백을 하나씩 넣어서 출력

(`)틸드 : 시스템 명령어로 해석

 

    sub listdir {
        %defaults = (aa=>"11", bb=>22, cc=>33);
        %arg = (%defaults, @_);
        return %arg;
    }

    print &listdir(cc=>44, dd=>55);

 

 

Carp모듈.

http://perldoc.perl.org/Carp.html

내장함수인 warn을 사용하는 대신 Crap::crap 서브루틴을 사용하면, 실제로 에러가 감지된 listdir내의 위치 대신, listdir을 호출한 위치에 경고(warning)을 통보하게 된다.

내장함수 caller
[0] 현재의 서브루틴이 호출된 패키지
[1] 현재의 서브루틴을 호출한 코드가 포함되어 있는 파일 이름
[2] 현재의 서브루틴이 호출된 파일의 라인
[3] 서브루틴의 이름
[4] 서브루틴에 인자가 넘겨졌는지의 여부
[5] 서브루틴이 호출된 구문
[6] 서브루틴을 호출한 실제 코드(호출이 eval TEXT문의 일부분일 때만)
[7] 서브루틴이 require이나 use문의 일부분에서 호출되었는지 여부.

ProtoType
서브루틴이 호출될때 인자의 타입과 수를 제한하도록 컴파일러에게 알려주는 일련의 명시자.
$$은 프로토 타입을 의미함
서브루틴을 호출할때 name(args)문법을 사용하지 않아도 되고, &을 붙이거나 서브루틴 레퍼런스를 사용하지 않아도 된다.
객체 메소드가 호출될 때도 역시 사용하지 않아도 된다.

    sub insensitive_less_than ($$) {
        return lc($_[0]) lt lc($_[1]);
    }

    print insensitive_less_than 1,31;


reference N referent
$s 가 스칼라 변수이면 \$s는 그 스칼라 변수에 대한 레퍼런스
\$s가 참조하는 $s를 레퍼런트라 부른다.

    $s = 3;
    $slr_ref = \$s;
    ${\$s}
    $$slr_ref
    ${$slr_ref}

    $arr_ref = \@a;
    $hsh_ref = \%h;
    $sub_ref = \&s;

 

 

화살표 연산자
레퍼런스를 통해 배열이나 해쉬의 원소에 엑세스 할때 사용.
$a[0] = ${$hsh_ref}{"first"}

내장함수 ref
그것이 담고 있는 레퍼런스의 종류를 리턴
리스트에 괄호대신 꺽쇠 괄호를 명시하면 그것이 list가 아닌, anonymous array에 대한 ref가 된다.
$a[0] = $hsh_ref->{"first"}

 

anonymous array

    @table = ((1,2,3),
          (2,4,6),
          (3,6,9),
        );
    #@table = (1,2,3,2,4,6,3,6,9);와 같음.
    $table = [[1,2,3],
          [2,4,6],
          [3,6,9],
        ];
    print $table->[1]->[2];
    print $table->[1][2];

 

anonymous hash

    $behaviour = {
        cat=>{nap=>"lap", eat=>"meat"},
        dog=>{prowl=>"growl", pool=>"drool"},
        mouse=>{nibble=>"kibble"},
    };

    print $behaviour->{cat}->{eat};
    print $behaviour->{cat}{eat};

 

anonymous subrutine

    $sub_ref = sub { print "hellow, $_[0]!\n" };
    $sub_ref->("Kim");

 


서브루틴 인자로 레퍼런스를 명시하여 넣기
@_ 리스트에 다 넣어져 버리기 때문에 이용.

    @ordered = (1,2,3,4,5);
    print join(" ", @ordered), "\n";

    sub insert
    {
        ($arr_ref, $new_val) = @_;
        @{$arr_ref} = sort {$a<=>$b} (@{$arr_ref}, $new_val);
    }

    insert(\@ordered, 3);
    print join(" ", @ordered), "\n";


패키지(package)
package Telephone;
package Tmp;
Telephone::call("test");

package Telephone::Mobile
Telepone의 서브 패키지도 아니고, 안쪽에 위치한 것도 아니다.
(기술적인 면에서 본다면, Telephone의 심볼 테이블 안에 Telephone::Mobile의 심볼 테이블에 해당하는 레퍼런스가 있기는 한다.)

패키지 변수(package variables)
$Other_package::time

렉시컬 변수(Lexical variables)
어느 패키지에도 속하지 않는다.(패키지 명을 붙이면 안됨)
선언된 블록의 물리적 경계나 파일 영역 안에서만 액세스 가능
프로그램이 렉시컬 변수가 선언되었던 코드 블록을 떠나게 될 때마다, 렉시컬 변수는 대체로 없어진다.

use strict
렉시컬 변수와 패키지 변수와의 혼란을 피하기 위해 모든 패키지 변수가 명확한 패키지 이름을 가지도록 요구한다.

레퍼런스 카운팅

    sub make_array_ref
    {
        my @array = @_;
        return \@array;
    }

    $arr_ref = make_array_ref(1,2,3,4,5);
    # $arr_ref = [1,2,3,4,5];
    # reference count를 하나 올린다.
    print $arr_ref->[4];
    # 렉시컬에 해당하는 레퍼런스가 프로그램의 어느 곳에도 존재하지 않을 때까지 렉시컬 변수는 계속 살아남아 있는다.
    $arr_ref = "something else";
    # @array에 해당하는 카운터가 줄어들어 0이됨으로 변수를 파기한다.



localized variables
my와 local의 차이점
my(문법적인 경계)
새로운 렉시컬 변수를 생성한다.
현 블록에서 호출된 서브루틴 내에서는 직접적으로 액세스가 불가능하다.

local(실행의 경계)
현재의 패키지 변수를 임시로 값을 바꾼다
현 블록에서 호출한 서브루틴을 포함하여 어느 곳에서나 이름을 사용하여 액서스가 가능하다.
모듈(module)

모듈 이름은 패키지 이름과도 갖다.
파일 이름을 정할때, 모듈이름을 사용하며, 각각의 ::를 디렉토리 경로 구분자로 바꾸고, .pm을 덧붙인다.
컴파일러는 그 경로와 일치하는 파일을 찾기 위해서, 표준 경로의 리스트와 사용자가 정의한 라이브러리 디렉토리를 뒤지기 시작한다.

모듈셋업하기
1. 표준 라이브러리 디렉토리를 선택한다.
2. perl에게 디렉토리 존재를 알린다.
셸변수 PERL5LIB나, Perl 애플리케이션에 따라 알맞은 리스트에 그 경로를 더한다. 혹은 -I<pathname>이라는 옵션을 주어 Perl을 호출할 수도 있다.
3. 모듈 이름의 맨 마지막 부분을 제외한, 각 부분에 해당하는 서브 디렉토리를 표준 디렉토리에 중첩하여 생성한다.
4. 맨 아레 서브 디렉토리 속에 텍스트 파일을 만든다.
A::B::C::D
A\B\C\D.pm
5. 코드를 그 텍스트 파일에 넣는다.
6. 텍스트 파일의 맨 마지막에, 참으로 계산되도록 하는 문장을 첨가.
1;


use Database::Access::Control 1.20;
use문이 버전 번호를 포함하고 있으면, 모듈이 로딩될 때, 요구된 버전 번호를 가지고 그 모듈의 VERSION 서브루틴이 자동적으로 호출된다.
$VERSION은 패키지 변수이어야 하므로, 앞에다 my를 붙여서는 안된다.
use strict를 정하기 전에 $VERISON을 정해야 $Database::Access::Control::Version과같이 자세한 명시를 피할 수 있다.
혹은 use vars '$VERSION';을 사용하여 use strict 영향을 벗어날 수 도 있다.

import 서브루틴이 호출할때, use된 모듈의 이름이 첫번째 인자로 넘겨지며, use문의 뒷부분에 나타나 있는 인자 리스트가 따라 넘겨진다.
use Database::Access::Control("my.db");
Database::Access::Control::import("Database::Access::Control", "my.db");

자동로딩(autoloading)
존재하지 않는 서브루틴을 요구하였을 경우 대신 AUTOLOAD서브 루틴이 호출되는데,
존재하지 않는 서브루틴에 넘겨질 인자와 함께 호출된다.
그리고 존재하지 않는 서브루틴의 완전한 이름이 패키지 변수 $AUTOLOAD에 자동적으로 할당된다.

    package Robot;

    sub AUTOLOAD {
        print "Sorry $AUTOLOAD isn't defined.\n",
        "(I'll just pretend, shall I?)\n";
    }

    robot_floor();


클로우저(Closure)
- 다른 어느 곳에서도 더 이상 존재하지 않게 된 렉시컬 변수를 사용하여 보존하고 있는 서브루틴.

    my $name = "pyoung";
    sub print_my_name {
        print $name, "\n";
    }
    print_my_name();

    sub print_test_name {
        $name = "test";
        print_my_name();
    }
    print_test_name();



익명 서브루틴과 클로우저

    sub hop_along {
        my ($form, $to, $step) = @_;
        my $next = $form-$step;
        my $closure_ref =
        sub {
            $next += $step;
            return if $next > $to;
            $_[0] = $next;
            return 1;
        };
        return $closure_ref;
    }

    $iterator = hop_along 1, 100, 7;
    while ($iterator->($next)) {
        print $next, " ";
    }
    print "\n";

    $iterator = hop_along -100,10,7;
    while ($iterator->($next)) {
        print $next, " ";
    }

 
타입글로브(Typeglobs)

참조 - http://www.perlmania.or.kr:8949/pmdocs/kys/perltypeglob.html

    $spud = "Wow!";
    @spud = ("idaho", "russet");

    *potato = *spud;

    print "$potato\n";
    print "@spud\n";

어떤 이름 붙은 모든 것에 대한 심볼 테이블 엔트리를 전체를 다 참조 하고 싶다면 typegrobs를 이용할 수 있다.
어떤 타입글로브를 다른 타입글로브로 할당하게 되면, 처음 것의 해당하는 슬롯들이 나중 것의 심볼 테이블 엔트리로 할당되게 된다.

    긴 이름을 가진 변수들에 짧은 이름을 부여하고자 할 때.
    다른 패키지로부터 임포트하고자 할 때.
    선택적으로 할당될 수 도 있다.

    *SOURCE = \$SOURCE1;
    *args = \@ARGV;
    *do_it = sub {print "doin' it\n"};


typegrobs를 가리키는 ref만들기

    $var = 'this is $var';
    %var = (v=>"vary", a=>"active", r=>"rodent");
    sub var { print "this is $var\n" }

    $typegrlob_ref = \*var;

타입글로브 자체를 얻기 위해서, *$typegrob_ref 이렇게 접근해야함.
$var를 얻기 위해선 ${*$typegrob_ref}처럼 달러를 붙여야하고, $*를 어떤 특정변수의 이름으로 여기는 것을 막기위해 중괄호를 사용.
%var ==> %{*$typegrob_ref}
var() ==> &{*$typegrob_ref}()

typeglobs안에 있는 ref에 엑세스하기

    $slr_ref = *var{SCALAR}; # \$var
    $arr_ref = *var{ARRAY};  # \@var
    $hsh_ref = *var{HASH};   # \%var
    $sub_ref = *var{CODE};   # \&var

 
심볼릭 레퍼런스(symbolic reference)

특정 패키지의 심볼 테이블 속에 있는 변수나 서브루틴의 이름을 나타내는 문자열.

 

data란 이름을 이용하여 스칼라변수및 서브루틴에 접근한다.

    package main;
    $data = "i'm data\n";
    sub data { print "hello data\n"; }

    $name = "data";

    print ${$name};
    &{$name}();
    push @{$name}, $next;


패키지명을 포함하여 사용할 수 도 있다.

    $name = "Remote::Sensing::data";
    print ${$name};

    $name = "Lt::Commander::data";
    push @{$name}, $next_gen;
    $name = "data";
    &{"Meta::".$name}();

   
심볼티이블을 참고하기 때문에, 렉시컬 변수를 엑세스 하는데 쓰일 수는 없다.

    package main;
    my $grain = "headache";
    ${"grain"} = "rye";
    print $grain;


타임글로브의 이름이 변수에 저장이 되어 있으면 $symbol_name라는 스칼라 변수에 대입하여

    $symbol_name = "data";

*{data}가 아닌 *{$symbol_name}으로 타입글로브에 엑세스 할 수 있게 된다.

 

심볼릭 레퍼런스의 미묘한 점 때문에 혼란이 일어날 수 있다.
- use strict(자세하게는 use strict "refs")를 사용하여 심볼릭 레퍼런스를 합당하지 않은 것으로 만들고, 진짜 필요할 때는 no strict "refs"를 첨가하여 사용한다.
CPAN(Comprehensive Perl Archive Network)

CPAN Search
http://search.cpan.org/

 
~/pyoung/perl $ perl -MCPAN -e shell
cpan shell -- CPAN exploration and modules installation (v1.9456)
Enter 'h' for help.
h
cpan>
Display Information                                                (ver 1.9456)
 command  argument          description
 a,b,d,m  WORD or /REGEXP/  about authors, bundles, distributions, modules
 i        WORD or /REGEXP/  about any of the above
 ls       AUTHOR or GLOB    about files in the author's directory
    (with WORD being a module, bundle or author name or a distribution
    name of the form AUTHOR/DISTRIBUTION)

Download, Test, Make, Install...
 get      download                     clean    make clean
 make     make (implies get)           look     open subshell in dist directory
 test     make test (implies make)     readme   display these README files
 install  make install (implies test)  perldoc  display POD documentation

Upgrade
 r        WORDs or /REGEXP/ or NONE    report updates for some/matching/all modules
 upgrade  WORDs or /REGEXP/ or NONE    upgrade some/matching/all modules

Pragmas
 force  CMD    try hard to do command  fforce CMD    try harder
 notest CMD    skip testing

Other
 h,?           display this menu       ! perl-code   eval a perl command
 o conf [opt]  set and query options   q             quit the cpan shell
 reload cpan   load CPAN.pm again      reload index  load newer indices
 autobundle    Snapshot                recent        latest CPAN uploads
q
cpan> Lockfile removed.

 

perlmodinstall - 펄 모듈 설치
http://perldoc.perl.org/perlmodinstall.html

 
perldata - 기본 데이터 타입
perlsub - 서브루틴의 기능
perlmod, perlmodlib - 심볼테이블, 타입글로브의 사용법과 perl모듈시스템
perlmodinstall - CPAN에서 모듈을 다운로드하고 설치하는 방법을 설명
perlref, perlreftut - 레퍼런스와 심볼릭 레퍼런스를 다루고 이으며, 이들을 만드는 다양한 방법에 대해 설명
perldsc, perllol - Perl에서 계층 구조를 가지는 데이터 구조를 만들고 사용한 방법에 대해 논함.
perltoot - Perl에서의 객체지향프로그래밍에 대한 간략한 튜토리얼 입문서
perlobj - Perl 객체지향특성에 관한 참고 매뉴얼
perlbot - 특정 버전의 Perl객체지향에 관한 여러 프로그래밍 테크닉
```

3가지 룰

1. 클래스를 만들려면, 패키지를 만들어라.
2. 매소드를 생성하려면, 서브루틴을 작성하라.
3. 객체를 생성하려면, 레퍼런트를 블레스하라.