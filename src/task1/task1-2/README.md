[Return to the main README.md](../../../README.md)

## Task 1.2

### Write a program which should do the following:
- Read the content of **./csv** directory ([Example](http://epa.ms/nodejs19-hw1-ex1)).
- Use the [**csvjson** package](https://github.com/Keyang/node-csvtojson) to convert **csv** file to **json** object.
- Write the **csv** file content to a new **txt** file. Use the [following format](http://epa.ms/nodejs19-hw1-ex2).
- Do not load all the content of the **csv** file into RAM via stream (read/write file content line by line).
- In case of read/write errors, log them in the console.
- The program should be started via **npm script** using **nodemon** (i.e. `npm run task1-2`).

## Evaluation criteria

- Task 1.2 is fulfilled to the full extent; the file is loaded fully into the RAM.
- Task 1.2 is fulfilled to the full extent; the file is not loaded fully in the RAM ([pipeline method](https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback)).

