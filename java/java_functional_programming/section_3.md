## Playing with Streams

Calculating the sum of values inside a list. 

``` Java
	private static int addListStructured(List<Integer> numbers) {
		
		int sum = 0;
		for(int number:numbers) {
			sum+=number;
		}		
		return sum;
	}

    // becomes
	private static int addListFunctional(List<Integer> numbers) {
		// stream, then combine into a single result. 
		// add all sequentially w/lambda
		return numbers.stream()
		// taking a list and reduce into 1 result using a method.
		//	.reduce(0, (x,y) -> x+y); --> there is a built in sum method!
            .reduce(0, Integer::sum);
	}
```

Playing w/Jshell:
```bash
❯ jshell
|  Welcome to JShell -- Version 11.0.14
|  For an introduction type: /help intro

jshell> List<Integer> numbers = List.of(12, 9, 13, 4, 6, 2, 4, 12, 15);
numbers ==> [12, 9, 13, 4, 6, 2, 4, 12, 15]

jshell> numbers
numbers ==> [12, 9, 13, 4, 6, 2, 4, 12, 15]

jshell> numbers.stream().reduce(0, (x,y)->x+y)
$4 ==> 77

jshell> numbers.stream().reduce(Integer.MIN_VALUE, (x,y)-> x>y ? x:y)
$10 ==> 15

// square each number then add the sum
jshell> numbers.stream().reduce(0, (x,y) -> x*x + y*y)
$2 ==> -1935093279 //overflow
// first pass = 0^2 + 12^2, = 144
// 2nd, x becomes 144 and y becomes 9, 144*144 + 9*9, not what we want.

// you need to first do the calculation with a map, then reduce into one. 
jshell> numbers.stream().map( x -> x*x).reduce(0, Integer::sum)
$3 ==> 835

// sum all odd numbers
jshell> numbers.stream().filter( x -> x%2==1).reduce(0, Integer::sum)
$5 ==> 37

// print all unique #'s
jshell> numbers.stream().distinct().forEach(System.out::println)
12
9
13
4
6
2
15

// print all numbers sorted
jshell> numbers.stream().sorted().forEach(System.out::println)
2
4
4
6
9
12
12
13


jshell> /exit
|  Goodbye
```

**Creating a custom Comparator**
We want to order by the length of strs:
`courses.stream().sorted.sorted(Comparator.comparing(str -> str.length())).forEach(System.out::println)`

**Collecting Strem Elems to List**

```java
// Square each number in a list and return a list of the new values:
return nums.stream().map(num -> num*num).collect(Collectors.toList());

// Filter even numbers from a list:
return nums.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());

// filter courses and create a list of all the lengths:
return nums.stream().map(X -> X.length()).collect(Collectors.toList());

```

Intermediate operation
- Performed on a stream and return a stream back
- ex: `.filter()`, `.map()`


Terminal operation
- Last operation on a stream, returns void or a specific type.
- ex: `.forEach()`, `.collect()`

### Takeaways
- `.reduce()`: performs a reduction on the elements of a stream, using the provided identity value and the accumulation function. 
- `.distinct()`: takes all values that occur only once.
- `.sorted()`: sorts a stream. 
  - Why use? parallelize more gracefully w/o needing additional synchronization - i.e. Allows us to effectively use the multi core processors in our comps.
- **What is paralellization?**: Allows use to effectively use the multi core processors.
- What is jshell?
- `Comparator.naturalOrder()`:sorted alphabetically / or by ascending values.
  - Example: `courses.stream().sorted.sorted(Comparator.naturalOrder()).forEach(System.out::println)`
- Comparator: A comparison function, which imposes a total ordering on some collection of objects. Comparators can be passed to a sort method (such as Collections.sort or Arrays.sort) to allow precise control over the sort order. Comparators can also be used to control the order of certain data structures (such as sorted sets or sorted maps), or to provide an ordering for collections of objects that don't have a natural ordering.
- Collector: A mutable reduction operation that accumulates input elements into a mutable result container, optionally transforming the accumulated result into a final representation after all input elements have been processed. Reduction operations can be performed either sequentially or in parallel.
- Working with streams = invoke intermidate operations and finish with terminal operation.
