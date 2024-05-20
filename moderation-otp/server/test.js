const { CargoClient } = require("poro");

async function getMatchSchedule() {
  const cargo = new CargoClient();

  const teams = await cargo.query({
    limit: "10",
    tables: ["MatchScheduleGame=MSG", "MatchSchedule=MS"],
    fields: ["MatchSchedule.DateTime_UTC=date"],
  });
  console.log(teams);
}

getMatchSchedule();
