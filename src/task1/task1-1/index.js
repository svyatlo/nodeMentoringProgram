console.log("Write something you want to reverse:");
process.stdin.on('data', (data) => {
  process.stdout.write(`${data.reverse()}\n`);
})