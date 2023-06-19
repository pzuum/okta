/** @usage
 * if you want  to implement instance methods and static methods in a class
 * ```interface MyType {
    instanceMethod();
}```

```interface MyTypeStatic { 
    new(): MyType;
    staticMethod();
}``` 



 * if you want to implement only static methods in a class use the below interface
  interface MyTypeStatic {
    staticMethod();
}

@staticImplements<MyTypeStatic>()
class MyType {
    static staticMethod() {

    }
}

 *
 */


export function staticImplements<T>() {
  return <U extends T>(constructor: U) => { constructor };
}

