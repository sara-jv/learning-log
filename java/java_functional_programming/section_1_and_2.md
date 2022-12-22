# Section 1 + 2 - Functional Programming
This course: https://www.udemy.com/share/102zRM3@Dy-6-QDBHPa5NAevU6555uP8ngjeYYaltXvtuZuPtdvlO2tQ7MXUQf474d_RKdJ5Ug==/
### Traditional approach
```Java
package programming;

import java.util.List;

public class FP01Structured {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<Integer> numbers = List.of(12, 9, 13, 4, 6, 2, 4, 12, 15);
		printAllNumbersInListStructured(numbers);
		printEvenNumbersInListStructured(numbers);

	}

	private static void printAllNumbersInListStructured(List<Integer> numbers) {
//		How to loop?	
		for (int number : numbers) {
			System.out.println(number);
		}
	}

	private static void printEvenNumbersInListStructured(List<Integer> numbers) {
//		How to loop?	
		for (int number : numbers) {
			if (number % 2 == 0) {
				System.out.println(number);
			}
		}
	}
}

```

### Functional approach
``` Java
package programming;

import java.util.List;

public class FP01Functional {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<Integer> numz = List.of(12, 9, 13, 4, 6, 2, 4, 12, 15);
		printAllNumbersInListFunctional(numz);
		printEvenNumbersInListFunctional(numz);
	}

	private static void printAllNumbersInListFunctional(List<Integer> numbers) {
		numbers.stream().forEach(System.out::println);
	}
// no longer needed w/lambda expression
//	private static boolean isEven(int number) {
//		return number%2==0;
//	}

	private static void printEvenNumbersInListFunctional(List<Integer> numbers) {

		numbers.stream()
//				.filter(FP01Functional::isEven) Method Reference which can be replaced by lambda.
				.filter(number -> number % 2 == 0) // Lambda Expression
				.forEach(System.out::println); // println is a static method on System.out, which we can express with a method reference. 
	}

		private static void printSquaresOfEvenNums(List<Integer> numbers) {	
		numbers.stream()
        // Filter - only even
		.filter(num -> num%  2 == 0)
		// mapping expression x -> x*x
		.map(num -> num * num)
		.forEach(System.out::println);
	}
}

```

### Takeaways 
- **Functional programming**: Expresses everything as a function. Functions are pure, should have no side effects and not work on global variables. Works purely on input. 
- **Streams**: Flows of data. A stream is a (potentially) countably infinite sequence. Streams is that they can be processed as lists, but terms of the sequence are only computed when necessary. Streams are sometimes called lazy lists [(source)](https://sites.ualberta.ca/~jhoover/325/CourseNotes/section/Streams.htm). Simply put, streams are wrappers around a data source, allowing us to operate with that data source and making bulk processing convenient and fast [(source)](https://stackify.com/streams-guide-java-8/).
  - Why do we use streams? [Stream Docs](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)
    - *Laziness*:  Until we call a terminal operation on a stream, no work is done. We can build up our processing pipeline over time and only run it at the exact time we want it to.
    - *Statelessness*: FP requires immutable state. State can have severe impacts on safety and performance and might introduce unintended side effects.
    - *Nonereusable*: Being just a dumb pipeline, streams can’t be reused. But they don’t change the original data source — we can always create another stream from the source.
    - *Easy to read*: Less lines are taken up, methods are clear, less boilerlate used. 
    - *Parallelization*: streams support parallel execution. 
  - Why are streams part of functional programming? Usage of streams does not alter state in anyway, allowing us to construct a pure function.
  - Common methods
    - `.stream()`: converts x into a stream, or a seq of elements. ex: `listOfNums.stream()`
    - `.map()`: transforms one object into another by applying the function. ex: `.map(num -> num * num)`, transforms num into its squared value. 
      - capture the result with a `Collector`. Ex: `nums.stream().map(X -> X.length()).collect(Collectors.toList());`
    - `.filter()`: chooses only element that matches condition in filter to be passed through. ex: `.filter(num --> num % 2 == 0)` all even numbers are passed. 
    - `.forEach()`: Consumes an element. Takes an element and does y. 
- **Method Reference**: `current_method::method_function` syntax. 
- **Lambda Expression**: Anonymous function.

