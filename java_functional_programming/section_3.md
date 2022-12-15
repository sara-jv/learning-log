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

- `.reduce()`: performs a reduction on the elements of a stream, using the provided identity value and the accumulation function. 
- `.distinct()`: takes all values that occur only once.
- `.sorted()`: sorts a stream. 
  - Why use? parallelize more gracefully w/o needing additional synchronization - i.e. Allows us to effectively use the multi core processors in our comps.
- **What is paralellization?**: Allows use to effectively use the multi core processors.
- What is jshell?