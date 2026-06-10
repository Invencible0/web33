import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficaProductos({ productos }) {

  const data = {
    labels: productos.map(p => p.nombre),
    datasets: [
      {
        label: "Stock",
        data: productos.map(p => p.stock)
      }
    ]
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "30px auto"
      }}
    >
      <h2>Stock de Productos</h2>

      <Bar data={data} />
    </div>
  );
}

export default GraficaProductos;