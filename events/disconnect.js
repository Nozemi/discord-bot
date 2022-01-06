module.exports = client => {
  console.log(`Disconnected at ${new Date()}`);
  connection.end(function(err) {
    if (err) {
      console.log(chalk.bgRed(`Database Connection Failed To End: ${err}`));
      return;
    }
    console.log(chalk.bgGreen(`Database Connection Ended!`));
    return;
  });
};
