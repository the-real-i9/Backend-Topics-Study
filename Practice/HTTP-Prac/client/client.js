(async () => {
  try {
    const res = await fetch("http://localhost:3000/", {
      method: "GET",
    });
    const body = await res.text();
    console.log(body);
  } catch (e) {
    console.log({ ...e });
  }
})();
