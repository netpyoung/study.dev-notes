Annotation A부터 n까지
==================================

- Java의 어노테이션(Annotation)이란 무엇인가?
> 어노테이션은 어노테이션된 요소들의 행동으로부터 프로그램의 행위를 추출하여, 필요하다면 컴파일러나 VM이 상호 의존적인 코드를 생성하는, 프로그램 요소와 메타 태그에 관계된 매커니즘.

- .java부터 .class까지
>.java => Parser => Type checker => [Annotation Checker] => Class File writer => .class

## 어노테이션 규칙
 * @interface + 어노테이션 이름
 * 어노테이션 소스코드 내부의 메소드 선언은 매개변수를 지닐 수 없다.
 * 어노테이션 소스코드 내부의 메소드 선언은 clauses를 throw 할 수 없다.
 * 메소드의 반환 타입은 primitives, String, Class, enum과 primitives배열, String배열, Class배열, enum배열 중 하나이다.

## 분류
 * marker ; @AnnotationTypeName
 * single-element ; @AnnotationTypeName(single-element)
 * normal, full-value, multi-value ; @AnnotationName(element=value, element=value, ...)

### 내장 어노테이션(java.lang.annotation)

#### @Retention
    Retention은 어노테이션이 얼마나 오랫동안 유지되는지에 대해, JVM이 어떻게 사용자 어노테이션을 다루어야 하는지를 서술합니다.
 * SOURCE : 어노테이션이 컴파일 타임시 버려진다는 것을 의미합니다. retention정책이 source로 정의되어 있으면, 클래스 파일은 어노테이션을 지니지 못합니다.
 * CLASS : 어노테이션이 생성된 클래스 파일에서 나타날 것이라는 것을 의미합니다. 그러나 런타임시에는 이 어노테이션을 이용하지 못합니다.
 * RUNTIME : 이는 런타임시 JVM에서 어노테이션의 이용이 가능하다는 것을 의미합니다. 이러한 어노테이션을 읽는 사용자 로직을 가짐으로써 런타임시 무언가를 할 수 있습니다.

#### @Target
    Target은 어디에 어노테이션을 넣을 수 있는지를 서술합니다. field, method, class가 정의된 곳에 어노테이션을 넣을 수 있습니다.

 * TYPE : class, interface, enumeration에 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * METHOD : method 선언에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * PARAMETER : parameter 선언에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * PACKAGE : package 선언에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * FIELD : field 선언에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * LOCAL_VARIABLE : 지역 변수 선언에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * CONSTRUCTOR : 생성자에만 어노테이션을 적용할 수 있다는 것을 의미합니다.
 * ANNOTATION_TYPE : 어노테이션 타입에만 어노테이션을 적용할 수 있다는 것을 의미합니다.

#### @Inherited
    기본적으로 어노테이션은 상속되지 않습니다. 따라서 상속을 원한다면, 어노테이션을 Inherited 해야 합니다. Inherited 어노테이션이 사용자 어노테이션에 놓여야 하며, 이는 클래스에만 효과가 있습니다.

#### @Documented
    어노테이션이 기본으로 javadoc 및 유사한 툴에 의해 문서화 되는 것을 나타냅니다. 이러한 형태는 타입의 선언에 주석을 달기 위해 사용합니다. 어노테이션은 클라이언트에 의해 어노테이션된 요소의 사용에 영향을 미치게 됩니다. 타입의 선언에 Documented 어노테이션을 붙인 경우, 그 어노테이션은 어노테이션된 요소의 공개 API중 한 부분이 됩니다.

#### == java.lang
- @Override
- @Deprecated
- @SuppressWarnings

## 예제 :

ex) 사용자 어노테이션에 @Inherited 어노테이션을 한 예제
[== InheritanceAnnExample.java ==]
```java
package com.kunaal.annotation.inheritance;

import java.lang.annotation.Annotation;

public class InheritanceAnnExample {
  public static void main(String[] args) {
    Annotation[] annotations;

    System.out.println("Annotations available on superclass are as follows:-");
	annotations = SuperClass.class.getAnnotations();
    for(Annotation ann:annotations)
      System.out.println(ann.annotationType().getCanonicalName());
  
    System.out.println("=====================================================================");
	
    System.out.println("Annotations available on subclass are as follows:-");
	annotations = SubClass.class.getAnnotations();
    for(Annotation ann:annotations)
      System.out.println(ann.annotationType().getCanonicalName());
  }
}

@Description(data="SuperClass implementation")
@InheritedDesc(data="Testing inheritance among annotations")
class SuperClass{
  void print(){
    System.out.println("Super class implementation");
  }
}

class SubClass extends SuperClass{
  void print(){
    System.out.println("Sub class implementation");
  }
}
```

[== output ==]
```
Annotations available on superclass are as follows:-
com.kunaal.annotation.inheritance.InheritedDesc
com.kunaal.annotation.inheritance.Description
=====================================================================
Annotations available on subclass are as follows:-
com.kunaal.annotation.inheritance.InheritedDesc
```


## 참고 :
 - [custom annotations in java] : http://javadata.blogspot.com/2011/02/custom-annotations-in-java.html
 - [java-annotations] : http://bcinews.files.wordpress.com/2010/02/java-annotations.ppt
 - [JSR-250 Common Annotations] : http://jcp.org/aboutJava/communityprocess/mrel/jsr250/index.html
 - [JSR-308 Annotations on Java Types] : http://openjdk.java.net/projects/type-annotations/