import React from "react";
import useGlobal from "../store";
import { Chart } from "react-google-charts";

import { setText } from "../i18n/utils";
const PredictionTable = () => {
  const [globalState] = useGlobal();

  const { prediction, intl } = globalState;

  const getText = id => {
    return setText(intl, id);
  };

  const data = [["Mês", "Entradas", "Saídas", "Saldo Final"]];

  prediction.forEach(item => {
    const line = [];

    const obj = JSON.parse(JSON.stringify(item));

    line.push(obj.date);
    delete obj.date;

    obj.entradas += obj.saldoInicial;
    delete obj.saldoInicial;

    Object.keys(obj).forEach(key => {
      line.push(Number(obj[key]));
    });

    data.push(line);
  });

  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="ComboChart"
      loader={<div>{getText("loading")}</div>}
      data={data}
      options={{
        chartArea: { left: 70, top: 30, width: "50%", height: "75%" },
        isStacked: false,
        seriesType: "bars",
        series: { 2: { type: "line" } }
      }}
    />
  );
};

export default PredictionTable;
