function callOneService(cb) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        resolve(cb(undefined, 1));
      }, 1000);
    } catch (e) {
      reject(`error in call one service, ${e}`);
    }
  });
}

function callTwoService(cb) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(function () {
        resolve(cb(undefined, 2));
      }, 1500);
    } catch (e) {
      reject(`error in call two service, ${e}`);
    }
  });
}

function remoteMathService(cb) {
  var one, two;
  return new Promise((resolve, reject) => {
    Promise.all([
      callOneService((err, num) => {
        one = num;
      }),
      callTwoService((err, num) => {
        two = num;
      }),
    ])
      .then(() => {
        resolve(cb(undefined, one + two));
      })
      .catch((e) => {
        reject(`error in remote math service, ${e}`);
      });
  });
}

const answerCallback = (err, answer) => {
  if (err) {
    console.log("error ", err);
    return { error: err };
  }
  if (answer !== 3) {
    console.log("wrong answer", answer);
    return { result: "wrong answer", answer };
  } else {
    console.log("correct");
    return { result: "correct" };
  }
};

remoteMathService(answerCallback);

module.exports = { remoteMathService, answerCallback };
