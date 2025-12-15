import { Card, CardContent } from "../components/ui/card";
import { useEffect, useState } from "react";
import { getIncidencias } from "../services/incidenciasService";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    proceso: 0,
    resueltas: 0
  });

  const load = async () => {
    const res = await getIncidencias();
    setData(res.data);

    setStats({
      total: res.data.length,
      pendientes: res.data.filter((i) => i.estado === "Abierta").length,
      proceso: res.data.filter((i) => i.estado === "En proceso").length,
      resueltas: res.data.filter((i) => i.estado === "Cerrada").length,
    });
    
  };

  useEffect(() => { load(); }, []);

  const chartData = [
    { name: "Abiertas", value: stats.pendientes },
    { name: "En proceso", value: stats.proceso },
    { name: "Cerradas", value: stats.resueltas },
  ];
  

  const COLORS = ["#f87171", "#60a5fa", "#4ade80"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Tarjetas */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><h2 className="text-lg">Total Incidencias</h2><p className="text-3xl font-bold">{stats.total}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><h2 className="text-lg">Pendientes</h2><p className="text-3xl font-bold">{stats.pendientes}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><h2 className="text-lg">Resueltas</h2><p className="text-3xl font-bold">{stats.resueltas}</p></CardContent></Card>
      </div>

      {/* Gráfica */}
      <Card>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>  
      </Card>
    </div>
  );
}
