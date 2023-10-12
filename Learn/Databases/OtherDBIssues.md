# The N+1 query
The N+1 query problem happens when your application code executes N additional query statements to fetch the same data that could have been retrieved in a single query.

Let's say you want to retrieve data from one table based on data from another table.
- On your first database query you get the data from the other table, and then you executed a second database query using this data to get your desired data from the original table. **This approach is flawed**.
- You could instead have done this in one database access, using the `JOIN` clause, that combines the two tables.
- This is the issue we're talking about. You executed two separate database query operations instead of one.


Instead of writing your code such that you have 1 query plus another for each record of that query, it is well-worth the effort to **<u>write your code such that you have 1 query that returns all the data you need</u>**.

# Failure Modes
Several failure modes that can occur in a database
- Read contention
- Write contention
- Thundering herd
- Cascade
- Deadlock
- Corruption
- Hardware failure
- Sofware failure
- Network failure
- Denial of service (DoS) attack

# Profiling Performance
Several ways to profie the perfomance of a database
- Monitor system perfomance
- Use database-specific tools
- Use third-party tools
- Analyze slow queries
- Monitor application perfomance.
- Have a look at the documentation for the database you're using.