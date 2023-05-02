## Functional Interfaces

When we pass something to a method, we pass data or logic. 
```java
// we simplify code using method references
nums.forEach(x -> System.out.println(x))
vs
// method reference is a simplified version of the lambda.
nums.forEach(System.out::println)

// There are classes behind the lambda expressions
// how do they work? All are FUNCTIONAL INTERFACES
Predicate< Integer> predicate = x -> x%2==0;
// Predicate: bool valued function of one arg, used to test something. Pass one arg --> return is bool.
// what actually happens in the lambda expression? 
Predicate< Integer> predicate2 = new Predicate<Integer>(){
    @Override
    public boolean test(Integer x){
        return x%2==0
    }
}
// why does this happen behind the scenes? To keep backwards compatibility for earlier versions of Java.

Function< Integer, Integer> squarefunction = x -> x * x;
// Function: accepts one arg and gives a result.

Consumer<Integer> consumer = System.out::println;
// Accepts single input and returns no result / void.

numbers.stream()
.filter(predicate)
.map(squarefunction)
.forEach(consumer);
```

In: `int sum = numbers.stream().reduce(0, integer::sum)`
What is happening in `integer::sum`?
```java
BinaryOperator<Integer> sumBinaryOperator2 = new BinaryOperator<Integer>() {

    @Override
    public Integer apply(Integer t, Integer u) {
        // TODO Auto-generated method stub
        return t+u;
    }
};
```

Some FI's use `apply` or `test`. What are these? 
- Function descriptors, and there is no standard for which one to use. 

### Takeaways
What are functional interfaces? Something that has only one abstract method.
What is an abstract method?
Predicate
Function
Consumer 