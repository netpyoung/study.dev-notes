Annotation A���� n����
==================================

- Java�� ������̼�(Annotation)�̶� �����ΰ�?
> ������̼��� ������̼ǵ� ��ҵ��� �ൿ���κ��� ���α׷��� ������ �����Ͽ�, �ʿ��ϴٸ� �����Ϸ��� VM�� ��ȣ �������� �ڵ带 �����ϴ�, ���α׷� ��ҿ� ��Ÿ �±׿� ����� ��Ŀ����.

- .java���� .class����
>.java => Parser => Type checker => [Annotation Checker] => Class File writer => .class

## ������̼� ��Ģ
 * @interface + ������̼� �̸�
 * ������̼� �ҽ��ڵ� ������ �޼ҵ� ������ �Ű������� ���� �� ����.
 * ������̼� �ҽ��ڵ� ������ �޼ҵ� ������ clauses�� throw �� �� ����.
 * �޼ҵ��� ��ȯ Ÿ���� primitives, String, Class, enum�� primitives�迭, String�迭, Class�迭, enum�迭 �� �ϳ��̴�.

## �з�
 * marker ; @AnnotationTypeName
 * single-element ; @AnnotationTypeName(single-element)
 * normal, full-value, multi-value ; @AnnotationName(element=value, element=value, ...)

### ���� ������̼�(java.lang.annotation)

#### @Retention
    Retention�� ������̼��� �󸶳� �������� �����Ǵ����� ����, JVM�� ��� ����� ������̼��� �ٷ��� �ϴ����� �����մϴ�.
 * SOURCE : ������̼��� ������ Ÿ�ӽ� �������ٴ� ���� �ǹ��մϴ�. retention��å�� source�� ���ǵǾ� ������, Ŭ���� ������ ������̼��� ������ ���մϴ�.
 * CLASS : ������̼��� ������ Ŭ���� ���Ͽ��� ��Ÿ�� ���̶�� ���� �ǹ��մϴ�. �׷��� ��Ÿ�ӽÿ��� �� ������̼��� �̿����� ���մϴ�.
 * RUNTIME : �̴� ��Ÿ�ӽ� JVM���� ������̼��� �̿��� �����ϴٴ� ���� �ǹ��մϴ�. �̷��� ������̼��� �д� ����� ������ �������ν� ��Ÿ�ӽ� ���𰡸� �� �� �ֽ��ϴ�.

#### @Target
    Target�� ��� ������̼��� ���� �� �ִ����� �����մϴ�. field, method, class�� ���ǵ� ���� ������̼��� ���� �� �ֽ��ϴ�.

 * TYPE : class, interface, enumeration�� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * METHOD : method ���𿡸� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * PARAMETER : parameter ���𿡸� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * PACKAGE : package ���𿡸� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * FIELD : field ���𿡸� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * LOCAL_VARIABLE : ���� ���� ���𿡸� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * CONSTRUCTOR : �����ڿ��� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.
 * ANNOTATION_TYPE : ������̼� Ÿ�Կ��� ������̼��� ������ �� �ִٴ� ���� �ǹ��մϴ�.

#### @Inherited
    �⺻������ ������̼��� ��ӵ��� �ʽ��ϴ�. ���� ����� ���Ѵٸ�, ������̼��� Inherited �ؾ� �մϴ�. Inherited ������̼��� ����� ������̼ǿ� ������ �ϸ�, �̴� Ŭ�������� ȿ���� �ֽ��ϴ�.

#### @Documented
    ������̼��� �⺻���� javadoc �� ������ ���� ���� ����ȭ �Ǵ� ���� ��Ÿ���ϴ�. �̷��� ���´� Ÿ���� ���� �ּ��� �ޱ� ���� ����մϴ�. ������̼��� Ŭ���̾�Ʈ�� ���� ������̼ǵ� ����� ��뿡 ������ ��ġ�� �˴ϴ�. Ÿ���� ���� Documented ������̼��� ���� ���, �� ������̼��� ������̼ǵ� ����� ���� API�� �� �κ��� �˴ϴ�.

#### == java.lang
- @Override
- @Deprecated
- @SuppressWarnings

## ���� :

ex) ����� ������̼ǿ� @Inherited ������̼��� �� ����
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


## ���� :
 - [custom annotations in java] : http://javadata.blogspot.com/2011/02/custom-annotations-in-java.html
 - [java-annotations] : http://bcinews.files.wordpress.com/2010/02/java-annotations.ppt
 - [JSR-250 Common Annotations] : http://jcp.org/aboutJava/communityprocess/mrel/jsr250/index.html
 - [JSR-308 Annotations on Java Types] : http://openjdk.java.net/projects/type-annotations/