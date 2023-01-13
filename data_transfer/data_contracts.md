# Data contracts
## What is a Data Contract?
Data contracts aren’t in-depth legal documents, but a *process* to help data producers and data consumers get on the same page. Data Contracts allow a service to define the entities and application-level events they own, along with their schema and semantics. There is no standardization for contracts because they differ based on data types, types of organizations, etc.

So are Data Contracts just a fancy term for APIs? The short answer is yes. The long answer is that the term Data Contracts is being used to introduce a concept: There must be a formal agreement between data producers and consumers where one did not really exist before.

### Why use them?
Data teams rely on services, often internal, that emit production data that lands the data in the data warehouse and becomes part of different downstream processes. Engineers in charge of these systems are not tasked with maintaining and are **often unaware of these data dependencies**. So when they make an update to their service that results in a schema change, these tightly coupled data systems crash. Or they change to format of the data which makes it unusable for DW's processes.

A data contract that enforces certain formats, constraints and semantic meanings can mitigate such instances. 

data contracts might cover things like:  
- What data is being extracted
- Ingestion type and frequency
- Details of data ownership/ingestion, whether individual or team
- Levels of data access required
- Information relating to security and governance (e.g. anonymization)
- How it impacts any system(s) that ingestion might impact

### How to make?

Once you’ve settled on an interchange format for a data contract, ensuring maximum readability, actually creating one can be as simple as a few lines of text.

### Who owns?
Data consumers tend to be the most motivated participants as data contracts clearly make their lives easier. Data producers such as software engineers may need some convincing to show them how data contracts can benefit the organization and improve data quality without too much additional effort.

### example

```
messages Order {
    required string orderId = 1;
    required string customerId = 2;
    // etc.
}
```


#### References
* https://www.montecarlodata.com/blog-data-contracts-explained/
